const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}
import Stripe from 'https://esm.sh/stripe@18.5.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2025-08-27.basil' })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const token = authHeader.replace('Bearer ', '')
    const { data: userData, error: userError } = await supabase.auth.getUser(token)
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }
    const userId = userData.user.id

    const { priceType } = await req.json()
    if (!priceType || !['pro_monthly', 'pro_yearly'].includes(priceType)) {
      return new Response(JSON.stringify({ error: 'Invalid price type' }), { status: 400, headers: corsHeaders })
    }

    // Get or create profile
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const { data: profile } = await adminClient
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('user_id', userId)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email || undefined,
        metadata: { userId },
      })
      customerId = customer.id
      await adminClient
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('user_id', userId)
    }

    const priceConfig: Record<string, { amount: number; interval: string }> = {
      pro_monthly: { amount: 3900, interval: 'month' },
      pro_yearly: { amount: 39000, interval: 'year' },
    }
    const config = priceConfig[priceType]

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: config.amount,
          recurring: { interval: config.interval as 'month' | 'year' },
          product_data: {
            name: `AI Threat Brief Pro (${priceType === 'pro_monthly' ? 'Monthly' : 'Annual'})`,
            description: 'Full intelligence access for security professionals',
          },
        },
        quantity: 1,
      }],
      subscription_data: {
        metadata: { userId, priceType },
      },
      success_url: `${req.headers.get('origin')}/dashboard?checkout=success`,
      cancel_url: `${req.headers.get('origin')}/pricing?checkout=cancelled`,
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Checkout error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
