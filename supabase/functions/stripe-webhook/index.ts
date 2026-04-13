import Stripe from 'https://esm.sh/stripe@18.5.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2025-08-27.basil' })

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
  if (!webhookSecret || !signature) {
    console.error('Missing STRIPE_WEBHOOK_SECRET or stripe-signature header')
    return new Response(JSON.stringify({ error: 'Webhook not configured' }), { status: 500 })
  }

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 })
  }

  const adminClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId
        if (!userId) {
          console.error('No userId in subscription metadata')
          break
        }
        const priceType = subscription.metadata?.priceType || 'pro_monthly'
        const status = subscription.status === 'active' || subscription.status === 'trialing' ? 'active' : 'inactive'

        await adminClient
          .from('profiles')
          .update({
            subscription_tier: priceType,
            subscription_status: status,
          })
          .eq('user_id', userId)

        console.log(`Updated profile for ${userId}: tier=${priceType}, status=${status}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId
        if (!userId) break

        await adminClient
          .from('profiles')
          .update({
            subscription_tier: 'free',
            subscription_status: 'inactive',
          })
          .eq('user_id', userId)

        console.log(`Downgraded profile for ${userId} to free`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Webhook processing error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
