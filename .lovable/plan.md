

## Fix: Harden `leads` table RLS policies

### Findings addressed

1. **RLS Policy Always True** — the INSERT policy uses `WITH CHECK (true)`, flagged as overly permissive
2. **No explicit SELECT deny** — no SELECT policy exists, relying on implicit Supabase behavior
3. **No read protection for lead emails** — emails could be exposed if a permissive policy is added later

### Changes

**Single migration** to:

1. **Add explicit deny-all SELECT policy** on `leads` — ensures email addresses are never readable via client SDK (anon or authenticated). Admin access happens via service role in edge functions.

2. **Tighten the INSERT policy** — restrict to only allow inserts where `email` is not null and `source` is not null, rather than a blanket `true`. The policy remains open to anon/authenticated (required for public lead capture) but validates the data shape.

```sql
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
```

### After migration

Mark all three findings as resolved via the security tool.

### Files changed

| File | Action |
|------|--------|
| Migration SQL | Harden leads RLS |
| No code changes needed | Lead capture form already works correctly |

