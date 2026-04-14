

# Phase 1: Homepage, Pricing, Pro & Methodology

Implementing the approved PLAN.md changes for the first four pages, including the mandatory Methodology correction.

---

## 1. Homepage — HeroSection copy update

**File: `src/components/home/HeroSection.tsx`**

- Headline → "AI security intelligence without vendor spin."
- Sub-headline → "Weekly, independent briefings on AI-powered threats, agent failures and stack risks — written for security teams who actually ship."
- Add 4 outcome bullets (using existing `Shield` icon + `text-foreground/80` styling)
- Primary CTA: "Get free threat briefs" → `/newsletter`
- Secondary CTA: "See Pro tools for teams" → `/pro`
- Micro-trust line: "Independent, vendor-neutral analysis. No sponsored rankings. Ever."
- Status badge text stays as-is (LIVE THREAT INTELLIGENCE)

## 2. Homepage — New HowItWorks component

**New file: `src/components/home/HowItWorks.tsx`**

3-column responsive strip using existing `glass-panel`, `cyber-border` design tokens:
- Column 1: "Weekly AI Threat Briefs" — icon: `FileText`
- Column 2: "Stack Matrix" — icon: `Shield`
- Column 3: "Pro Tools" — icon: `Zap`

Each column: icon in a rounded container + title + 1-line description. Grid collapses to single column on mobile (`grid md:grid-cols-3`).

**File: `src/pages/Index.tsx`** — Insert `<HowItWorks />` between `IntelligenceFeed` and `SocialProof`.

## 3. Pricing page — Tier copy & FAQ

**File: `src/pages/Pricing.tsx`**

Update `tiers` array:
- **Free**: description → "Core intelligence for individual practitioners." Features rewritten per spec (full briefs, open Matrix, public blog, basic dashboard). All features marked `included: true` (no X marks — Free is real value).
- **Pro**: description → "Tools and depth for teams running AI in production." Features updated per spec (advanced filters, exports, saved views, readiness, priority intel, streaks, referrals). CTA → "Start Pro"
- **Enterprise**: description → "Dedicated AI threat intelligence for your organisation." Features updated per spec (SSO, private feeds, API, analyst sessions, SLAs).

Add after the tier grid:
- Explicit line: "Core briefs and Stack Matrix entries stay free and open. Pro adds tools, depth and early warnings."
- FAQ section (3 items in `Accordion` component):
  1. "What's free vs Pro?"
  2. "Do you sell rankings or sponsorships?"
  3. "How does billing and cancellation work?"

## 4. Pro page — Copy refinement

**File: `src/pages/Pro.tsx`**

- Ribbon text → "PRO ACCESS · Tools and depth for teams who ship AI"
- Headline → "Same independent intel. More power, more speed."
- Sub-headline → "The briefs and Stack Matrix stay open. Pro adds the tools, depth and early warnings your security team needs to move faster than the next incident."
- CTA → "Start Pro — $33/mo" (annual rate), supporting line → "One avoided incident pays for years of Pro. The upside is asymmetric — in your favour."
- Update `benefits` array descriptions per spec

## 5. Methodology page — Add bulleted sections (mandatory correction)

**File: `src/pages/Methodology.tsx`**

Add three new bulleted sections before "How We Evaluate Tools":

**"What We Cover"** — bullets:
- AI-powered attack techniques and real-world exploit chains
- Prompt injection, jailbreaks, and agent manipulation
- Model supply-chain risks and dependency vulnerabilities
- MLSecOps tooling evaluations and stack architecture reviews

**"How We Source and Vet Intel"** — bullets:
- Primary research: hands-on red-teaming, reverse engineering, and production testing
- Trusted public feeds: CVE databases, vendor advisories, academic pre-prints, MITRE ATLAS
- Practitioner network: verified reports from security engineers in the field
- Every claim cross-referenced against at least two independent sources before publication

**"How We Handle Corrections and Retractions"** — bullets:
- Errors are corrected in-place with a visible correction notice and timestamp
- Material retractions are published as standalone corrections linked from the original
- All corrections logged on the `/corrections` page
- Link to `/corrections`

## 6. ExitIntentModal — Copy alignment

**File: `src/components/ExitIntentModal.tsx`**

- Title → "Before you go — are you briefed on this week's AI threats?"
- Description → updated to match open-intel tone
- CTA → "Get free threat briefs" → navigates to `/newsletter`
- Dismiss text → "I'll catch up later"

## 7. LeadMagnet — CTA update

**File: `src/components/home/LeadMagnet.tsx`**

- Headline → "Get free AI threat briefs"
- Sub-text → emphasise high-signal AI security intel, weekly cadence
- Button → "Get free threat briefs"

---

## Files changed (Phase 1)

| File | Action |
|------|--------|
| `src/components/home/HeroSection.tsx` | Update copy |
| `src/components/home/HowItWorks.tsx` | **New** |
| `src/pages/Index.tsx` | Add HowItWorks import |
| `src/pages/Pricing.tsx` | Update tiers, add FAQ |
| `src/pages/Pro.tsx` | Update copy |
| `src/pages/Methodology.tsx` | Add 3 bulleted sections |
| `src/components/ExitIntentModal.tsx` | Update copy |
| `src/components/home/LeadMagnet.tsx` | Update copy |

## Not touched

- `App.tsx` routing — no changes
- Supabase/Stripe edge functions — no changes
- Auth, ProtectedRoute, useAuth — no changes
- Dashboard, Matrix, BlogArticle — deferred to Phase 2 (after review)

