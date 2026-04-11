
-- Drop the existing overly permissive UPDATE policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create restricted UPDATE policy that prevents users from changing sensitive fields
CREATE POLICY "Users can update their own profile safely"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND subscription_tier IS NOT DISTINCT FROM (SELECT p.subscription_tier FROM public.profiles p WHERE p.user_id = auth.uid())
  AND subscription_status IS NOT DISTINCT FROM (SELECT p.subscription_status FROM public.profiles p WHERE p.user_id = auth.uid())
  AND stripe_customer_id IS NOT DISTINCT FROM (SELECT p.stripe_customer_id FROM public.profiles p WHERE p.user_id = auth.uid())
);

-- Allow referred users to also view their referral records
CREATE POLICY "Referred users can view their referrals"
ON public.referrals
FOR SELECT
USING (auth.uid() = referred_id);
