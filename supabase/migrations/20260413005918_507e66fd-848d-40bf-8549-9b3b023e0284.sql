
-- 1. Deny all reads via client
CREATE POLICY "No public read on leads"
  ON public.leads FOR SELECT
  USING (false);

-- 2. Drop the overly permissive insert policy
DROP POLICY "Anyone can submit a lead" ON public.leads;

-- 3. Re-create with basic validation
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND source IS NOT NULL
    AND char_length(email) BETWEEN 5 AND 320
  );
