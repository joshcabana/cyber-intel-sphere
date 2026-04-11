

## Professional QA Polish — Full Implementation Plan

### 1. Fix Build Error (blocking)
The `check-subscription/index.ts` edge function uses `npm:@supabase/supabase-js@2.57.2` which fails in Deno. Change to `https://esm.sh/@supabase/supabase-js@2.49.4` (same pattern as `stripe-webhook`).

### 2. Homepage Updates

**MatrixTeaser.tsx** — Change stats line from `89+ Tools • 12 Categories • CSV/PDF Export` to `18 Tools Live • 12 Categories • CSV/PDF Export (Pro)`.

**HeroSection.tsx** — Change "Trusted by 2,400+ Security Teams" to "Trusted by security teams at scale — growing fast".

**New component: `src/components/home/SocialProof.tsx`** — 4 testimonial cards in a grid with dark card layout and orange accent border. Exact quotes as specified. Placed in Index.tsx between IntelligenceFeed and MatrixTeaser.

### 3. New /about Page

**`src/pages/About.tsx`** — Full about page with the exact copy provided, AGENTS.md 7-rule philosophy summary, and a "View on GitHub" button linking to `https://github.com/joshcabana/cyber-intel-sphere`. Dark theme, consistent styling.

**App.tsx** — Add route `<Route path="/about" element={<About />} />`.

### 4. Matrix Page Updates

**Matrix.tsx** — Add note above the table: "18 tools currently live — 89+ more in active onboarding (updated weekly)". Tool count is already 18 (confirmed from code). No tool data changes.

### 5. Database Schema (3 new tables via migration)

Create tables:
- `briefings` (id uuid, slug text unique, title text, category text, published_at timestamptz, read_time_minutes int, teaser text, content text, author text)
- `tools` (id uuid, name text, category text, rating numeric, pricing text, description text, affiliate_marked boolean default false, url text)
- `saved_briefings` (id uuid, user_id uuid, briefing_id uuid references briefings, saved_at timestamptz default now(), unique(user_id, briefing_id))

RLS: `saved_briefings` — users can CRUD their own rows. `briefings` and `tools` — public SELECT, no public INSERT/UPDATE/DELETE.

### 6. Navigation & Footer

**Navbar.tsx** — Add `{ to: "/about", label: "About" }` to `navLinks` array.

**Footer.tsx** — Add /about link under Intelligence section. Add GitHub link. Keep exact independence disclosure text.

### 7. General Polish
- Add "Last updated: April 12, 2026" to Matrix page header area.
- Ensure orange accents on CRITICAL/HIGH severity badges (already in place via `severityColors` in IntelligenceFeed).

### Files Changed
| File | Action |
|------|--------|
| `supabase/functions/check-subscription/index.ts` | Fix import |
| `src/components/home/MatrixTeaser.tsx` | Update stats |
| `src/components/home/HeroSection.tsx` | Update trust line |
| `src/components/home/SocialProof.tsx` | New component |
| `src/pages/Index.tsx` | Add SocialProof |
| `src/pages/About.tsx` | New page |
| `src/pages/Matrix.tsx` | Add note + timestamp |
| `src/App.tsx` | Add /about route |
| `src/components/layout/Navbar.tsx` | Add About link |
| `src/components/layout/Footer.tsx` | Add About + GitHub links |
| Migration | 3 new tables with RLS |

