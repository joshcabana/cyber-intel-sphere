

# Site Remediation Plan — Opus Review Response

Based on the comprehensive 36-URL review, mapped to confirmed codebase issues. Grouped into three implementation batches.

---

## What's Already Fixed (from prior work)

- Newsletter "Daily" -> "Weekly" copy (line 27) — **already done**
- Dashboard readiness "72/100" -> "—" — **already done**
- Hero CTA `/pro` -> `/pricing` — **already done**
- `severityColors` extracted to shared constants — **already done**
- ErrorBoundary added — **already done**
- Lazy route loading added — **already done**
- Favicon added — **already done**
- Font preloading — **already done**

---

## Batch 1: Trust, Disclosure & Copy Fixes (Quick Wins)

**1. Privacy Policy — add missing third-party services** (`src/pages/Privacy.tsx`)
- Add Stripe, Vercel, and Supabase/Lovable Cloud to the third-party services list (currently only Beehiiv and GitHub)

**2. Assessment page — link to `/pricing` instead of `/pro`** (`src/pages/Assessment.tsx`)
- Line 79: Change `Link to="/pro"` to `Link to="/pricing"` (same protected-route issue as the hero CTA)

**3. Methodology page — link to `/pricing` instead of `/pro`** (`src/pages/Methodology.tsx`)
- Line 71: Change `Link to="/pro"` to `Link to="/pricing"`

**4. Footer — link to `/pricing` instead of `/pro`** (`src/components/layout/Footer.tsx`)
- Line 38: Change Pro Access link from `/pro` to `/pricing`

**5. About page — add founder credentials block** (`src/pages/About.tsx`)
- Add a short "Who's behind it" section after the editorial philosophy with Josh Cabana's relevant background and role

**6. Matrix page — add "How we rate" expandable block** (`src/pages/Matrix.tsx`)
- Add a collapsible section above the table explaining the rating methodology (deployment friction, false positives, architecture)
- Link to `/methodology` for full details

**7. Newsletter page — use dynamic article count** (`src/pages/Newsletter.tsx`)
- Currently shows `articleCount` from `importedArticles.length` — verify this matches actual total from `getAllArticles()` and use that instead for consistency

---

## Batch 2: Modal Fatigue & Conversion UX

**8. Remove TimedScarcityModal from homepage** (`src/pages/Index.tsx`)
- Remove the `TimedScarcityModal` import and component — keep only ScarcityBanner (persistent, non-intrusive) and ExitIntentModal (one-time, intent-based)

**9. Enterprise CTA — add mailto link instead of toast** (`src/pages/Pricing.tsx`)
- Line 93: Replace `toast.info(...)` with `window.location.href = "mailto:sales@aithreatbrief.com?subject=Enterprise%20Inquiry"`

**10. Login page — add context line** (`src/pages/Login.tsx`)
- Add a brief value statement below the heading: "Free access to briefings, Stack Matrix, and your saved intelligence."

---

## Batch 3: Content Architecture & Navigation

**11. Blog archive — add intro explaining content types** (`src/pages/Blog.tsx`)
- Add a one-line note below the description distinguishing briefings, guides, and comparisons

**12. Matrix — add "Last reviewed" date per-tool** (`src/pages/Matrix.tsx`)
- Add a `lastReviewed` field to the Tool type and display it in the table (can be a shared date initially like "April 2026")

**13. Corrections page — add "last reviewed" timestamp** (`src/pages/Corrections.tsx`)
- Check current state and add a "Log last reviewed: [date]" line so the empty log feels maintained

---

## Files Modified

| File | Change |
|------|--------|
| `src/pages/Privacy.tsx` | Add Stripe, Vercel, Lovable Cloud to third-party list |
| `src/pages/Assessment.tsx` | `/pro` -> `/pricing` link |
| `src/pages/Methodology.tsx` | `/pro` -> `/pricing` link |
| `src/components/layout/Footer.tsx` | `/pro` -> `/pricing` link |
| `src/pages/About.tsx` | Add founder credentials section |
| `src/pages/Matrix.tsx` | Add "How we rate" collapsible + per-tool review date |
| `src/pages/Newsletter.tsx` | Use `getAllArticles().length` for accurate count |
| `src/pages/Index.tsx` | Remove TimedScarcityModal |
| `src/pages/Pricing.tsx` | Enterprise CTA -> mailto instead of toast |
| `src/pages/Login.tsx` | Add context line below heading |
| `src/pages/Blog.tsx` | Add content-type intro line |
| `src/pages/Corrections.tsx` | Add "last reviewed" date |

## Not Touched
- Supabase, edge functions, auth, Stripe integration
- Article content or imported articles data
- TimedScarcityModal component file itself (just removed from Index)

