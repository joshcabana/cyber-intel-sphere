

## Environment Setup — Revised Plan

### Important note on Supabase key naming
The auto-generated `src/integrations/supabase/client.ts` uses `VITE_SUPABASE_PUBLISHABLE_KEY` (set automatically by Lovable Cloud). This file cannot be edited. The `.env.example` and runtime check will document both names (`VITE_SUPABASE_PUBLISHABLE_KEY` for the Vite frontend, `SUPABASE_ANON_KEY` for edge functions/backend) and explain they hold the same value.

### File 1: `.env.example` (full rewrite)

Sections with clear comments:

- **Supabase** — `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (auto-set by Lovable Cloud), `SUPABASE_ANON_KEY` (same value, for edge functions), `SUPABASE_SERVICE_ROLE_KEY` (edge functions only, never expose to client)
- **App URL** — Both `VITE_APP_URL=https://aithreatbrief.com` and `NEXT_PUBLIC_APP_URL` (same value; backend scripts use NEXT_PUBLIC_ convention)
- **Stripe** — `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, price IDs
- **Beehiiv** — `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID`, automation IDs
- **Affiliate** — Without VITE_ prefix (`AFFILIATE_NORDVPN`, etc.) since they're used by Node/Bun scripts; note that UI code should add `VITE_AFFILIATE_*` if client-side resolution is needed
- **GitHub Automation** — `GITHUB_TOKEN`
- **Analytics** — Plausible domain, LinkedIn partner/conversion IDs
- **Upstash** — Redis rate limiting vars

### File 2: `README.md` (rewrite)

```
# AI Threat Brief — aithreatbrief.com

Intelligence for the Agentic Era.

## First Time Setup

1. Clone the repo
2. `cp .env.example .env.local`
3. Fill in values (see comments in .env.example)
4. `bun install`
5. `bun run dev`

## Architecture

- **Frontend**: React + Vite + Tailwind (src/)
- **Backend**: Lovable Cloud (Supabase) — edge functions in supabase/functions/
- **Automation**: Node/Bun scripts in scripts/automation/ (GitHub Actions)

## Edge Function Secrets

Secrets like STRIPE_SECRET_KEY and SUPABASE_SERVICE_ROLE_KEY are configured
via Lovable Cloud, not .env. They're available to edge functions at runtime.
```

### File 3: `src/main.tsx` (add env check)

Add a dev-mode console warning before `createRoot` if `VITE_SUPABASE_URL` or `VITE_SUPABASE_PUBLISHABLE_KEY` are missing. Non-blocking — app still renders.

### Files changed
| File | Action |
|------|--------|
| `.env.example` | Full rewrite |
| `README.md` | Full rewrite |
| `src/main.tsx` | Add runtime env check |

