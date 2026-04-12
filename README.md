# AI Threat Brief — aithreatbrief.com

**Intelligence for the Agentic Era.**

AI Threat Brief delivers daily cybersecurity intelligence — threat briefings, tool reviews, and a curated security matrix — built for security professionals navigating the AI-driven landscape.

---

## First Time Setup

```bash
# 1. Clone the repo
git clone <repo-url> && cd ai-threat-brief

# 2. Create your local environment file
cp .env.example .env.local

# 3. Fill in the values (see comments in .env.example for where to find each key)

# 4. Install dependencies
bun install

# 5. Start the dev server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## Architecture

| Layer | Stack | Location |
|-------|-------|----------|
| **Frontend** | React 18 + Vite + Tailwind CSS + shadcn/ui | `src/` |
| **Backend** | Lovable Cloud (Supabase) — Edge Functions | `supabase/functions/` |
| **Automation** | Node / Bun scripts triggered by GitHub Actions | `scripts/automation/` |

### Key directories

```
src/
  components/   — UI components (home, layout, ui)
  pages/        — Route pages (Index, Blog, Matrix, Dashboard, etc.)
  hooks/        — Custom React hooks (auth, toast)
  lib/          — Shared utilities (articles, affiliates, SEO)

supabase/
  functions/    — Edge functions (Stripe checkout, webhooks, subscription checks)
  config.toml   — Supabase project configuration

scripts/
  automation/   — Article factory, newsletter compiler, weekly harvest, etc.

lib/            — Shared Node/Bun utilities (affiliate links, analytics, security)
```

---

## Environment Variables

All variables are documented in `.env.example` with inline comments showing where to obtain each value.

**Two naming conventions coexist** because the repo runs both a Vite frontend and Node/Bun automation scripts:

| Prefix | Used by | Example |
|--------|---------|---------|
| `VITE_` | Vite frontend (exposed to browser) | `VITE_SUPABASE_URL` |
| `NEXT_PUBLIC_` | Node/Bun automation scripts | `NEXT_PUBLIC_APP_URL` |
| *(none)* | Edge functions & backend scripts | `STRIPE_SECRET_KEY` |

### Edge Function Secrets

Secrets like `STRIPE_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are configured as **runtime secrets** via Lovable Cloud — they are **not** read from `.env`. They're injected automatically into edge functions at runtime.

---

## Scripts

```bash
# Run the dev server
bun run dev

# Build for production
bun run build

# Run tests
bun run test

# Automation (typically run via GitHub Actions)
bun run scripts/automation/run-article-factory.mjs
bun run scripts/automation/run-newsletter-compiler.mjs
bun run scripts/automation/run-weekly-harvest.mjs
```

---

## License

Proprietary — All rights reserved.
