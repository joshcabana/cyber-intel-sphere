

# Comprehensive Site Remediation Plan

Based on the Opus 4.6 audit, verified against the actual codebase. Items are grouped by priority and scoped to what can be done within this Vite + React SPA architecture.

---

## Verified Issues (Confirmed in Code)

| # | Issue | File(s) | Confirmed |
|---|-------|---------|-----------|
| 1 | `severityColors` duplicated 4x | Blog, BlogArticle, Dashboard, IntelligenceFeed | Yes |
| 2 | Streak never resets (adds `daysSince/7`, never zeroes) | useAuth.tsx:79-93 | Yes |
| 3 | NotFound page wrong theme, no Navbar/Footer, uses `<a>` | NotFound.tsx | Yes |
| 4 | Hero CTA links to `/pro` (protected route) | HeroSection.tsx:62 | Yes |
| 5 | Dashboard readiness "72/100" hardcoded | Dashboard.tsx:~170 | Yes |
| 6 | Newsletter "Daily intelligence" contradicts weekly | Newsletter.tsx:27 | Yes |
| 7 | No favicon in index.html | index.html | Yes |
| 8 | Font loaded via blocking `@import` | index.css:5 | Yes |
| 9 | `generateArticleSchema` / `generateFAQSchema` exist but unused | lib/seo.ts, BlogArticle.tsx, Pricing.tsx | Yes |
| 10 | No React error boundaries | App.tsx | Yes |
| 11 | No lazy loading of routes | App.tsx | Yes |

## Rejected / Not Applicable

- **"No robots.txt or sitemap.xml"** — Both exist: `public/robots.txt` and `public/sitemap.xml` + generation script. Auditor missed them.
- **"Add SSR/SSG"** — Architecture constraint (Vite SPA). Not actionable here. Pre-rendering could be explored later.
- **"Social login"** — Deferred; not a bug.

---

## Implementation Plan

### Batch 1: Bug Fixes (Critical)

**1. Fix streak logic** (`src/hooks/useAuth.tsx`)
- If `daysSince > 14`, reset streak to 1 (missed a week)
- If `7 <= daysSince <= 14`, increment by 1
- If `daysSince < 7`, do nothing

**2. Fix Hero CTA** (`src/components/home/HeroSection.tsx`)
- Change `/pro` link to `/pricing`

**3. Fix Newsletter copy** (`src/pages/Newsletter.tsx`)
- Change "Daily intelligence" to "Weekly intelligence" on line 27

**4. Fix Dashboard readiness** (`src/pages/Dashboard.tsx`)
- Replace hardcoded "72/100" with "—" and text "Not assessed"
- Keep the "Take assessment" link

### Batch 2: Code Quality

**5. Extract `severityColors`** → new file `src/lib/constants.ts`
- Export the map, import in all 4 files

**6. Fix NotFound page** (`src/pages/NotFound.tsx`)
- Add Navbar + Footer, use dark theme (`bg-background`), use `<Link>` from react-router

**7. Add favicon** (`index.html`)
- Add `<link rel="icon" href="/placeholder.svg">` (use existing placeholder until user provides a real one)

### Batch 3: Performance & SEO

**8. Move font loading** from `@import` in CSS to `<link rel="preload">` in `index.html`
- Add `font-display=swap` parameter (already present in the Google Fonts URL)

**9. Wire up JSON-LD schemas**
- `BlogArticle.tsx`: Use `generateArticleSchema` from `lib/seo.ts`, inject via `<Helmet>`
- `Pricing.tsx`: Use `generateFAQSchema` for the FAQ section

**10. Add lazy loading for routes** (`App.tsx`)
- Lazy-load: Assessment, Methodology, Privacy, Terms, AIUse, Corrections, Newsletter, Tools
- Wrap in `<Suspense>` with a minimal loading fallback

**11. Add React ErrorBoundary** 
- Create `src/components/ErrorBoundary.tsx`
- Wrap `<Routes>` in App.tsx

---

## Files Modified

| File | Changes |
|------|---------|
| `src/lib/constants.ts` | New — shared `severityColors` |
| `src/hooks/useAuth.tsx` | Fix streak reset logic |
| `src/components/home/HeroSection.tsx` | CTA `/pro` → `/pricing` |
| `src/pages/Newsletter.tsx` | "Daily" → "Weekly" |
| `src/pages/Dashboard.tsx` | Readiness "—" + import constants |
| `src/pages/NotFound.tsx` | Full redesign with site chrome |
| `src/pages/Blog.tsx` | Import shared severityColors |
| `src/pages/BlogArticle.tsx` | Import shared severityColors + add JSON-LD |
| `src/components/home/IntelligenceFeed.tsx` | Import shared severityColors |
| `src/pages/Pricing.tsx` | Add FAQ JSON-LD |
| `src/App.tsx` | Lazy routes + ErrorBoundary |
| `src/components/ErrorBoundary.tsx` | New |
| `index.html` | Favicon + font preload |
| `src/index.css` | Remove `@import` font line |

## Not Touched

- Supabase tables, edge functions, auth — no changes
- Article content / Matrix data — no changes
- Stripe integration — no changes

