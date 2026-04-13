

## Add Rate Limiting to Lead Capture Form

### Approach
Create a backend function that handles lead submission with server-side rate limiting (IP-based, 3 submissions per minute). The form will call this function instead of inserting directly into the `leads` table.

### Changes

**1. Create edge function `supabase/functions/submit-lead/index.ts`**
- Accept `{ email, source }` in POST body
- Validate input with Zod (email format, source not empty)
- Rate limit by IP: use an in-memory Map with sliding window (3 requests per 60s per IP)
- Insert into `leads` table using service role client
- Return 429 if rate limited, 400 if invalid, 201 on success

**2. Update `src/components/home/LeadMagnet.tsx`**
- Replace direct `supabase.from("leads").insert(...)` with `supabase.functions.invoke("submit-lead", { body: { email, source } })`
- Handle 429 response with a "Too many attempts" toast message

### Files changed

| File | Action |
|------|--------|
| `supabase/functions/submit-lead/index.ts` | Create — rate-limited lead submission endpoint |
| `src/components/home/LeadMagnet.tsx` | Update — call edge function instead of direct insert |

