

# Full Quality Assurance Audit Report — AI Threat Brief

## 1. Project Overview

**Domain:** aithreatbrief.com
**Purpose:** Independent AI cybersecurity intelligence platform — threat briefings, tool reviews, security matrix, pro subscriptions, newsletter, and consulting lead generation.
**Stack:** React 18 + Vite 5 + Tailwind CSS + shadcn/ui, Lovable Cloud (Supabase) backend, Stripe subscriptions, GitHub Actions automation.
**Current state:** 18 routes, 10+ published articles (5 hardcoded + 16 imported), 4 edge functions, 7 database tables with RLS.

---

## 2. Audit Findings

### CRITICAL — Must Fix

**C1. Missing `STRIPE_WEBHOOK_SECRET` — webhook signature verification is bypassed**
In `supabase/functions/stripe-webhook/index.ts` (lines 18-28), if `STRIPE_WEBHOOK_SECRET` is not set, the function falls back to `JSON.parse(body)` — accepting any payload without signature verification. This means anyone can POST fabricated Stripe events to upgrade/downgrade arbitrary users.
- **Status:** The secret is not listed in the configured secrets.
- **Fix:** Add `STRIPE_WEBHOOK_SECRET` via the secrets tool, then remove the `else` fallback so unsigned events are rejected.

**C2. Stripe checkout uses mismatched API versions**
- `stripe-checkout/index.ts` uses Stripe SDK `@17.7.0` with apiVersion `2025-04-30.basil`
- `check-subscription/index.ts` uses Stripe SDK `@18.5.0` with apiVersion `2025-08-27.basil`
- `stripe-webhook/index.ts` uses Stripe SDK `@17.7.0` with apiVersion `2025-04-30.basil`
- **Risk:** Type mismatches, deprecated fields, and inconsistent behavior across functions.
- **Fix:** Standardize all three functions on the same Stripe SDK version and API version.

**C3. `check-subscription` uses deprecated `serve` import**
`check-subscription/index.ts` line 1: `import { serve } from "https://deno.land/std@0.190.0/http/server.ts"` — this is the legacy Deno serve pattern. The other two functions use the modern `Deno.serve()`. While it works, it's an inconsistency that should be aligned.

**C4. `stripe-checkout` uses `getClaims` which may not exist**
Line 28: `await supabase.auth.getClaims(token)` — this method does not exist in `@supabase/supabase-js@2.49.4`. The correct method is `supabase.auth.getUser(token)`. This would cause the checkout to fail for all users with a runtime error.
- **Fix:** Replace `getClaims` with `getUser`, extract `user.id` from the result.

### HIGH — Should Fix

**H1. Sitemap is missing new pages**
`public/sitemap.xml` is missing: `/tools`, `/newsletter`, `/assessment`, `/privacy`, `/terms`, `/ai-use`, `/corrections`, `/methodology`. These pages won't appear in search engine indexes.
- **Fix:** Add all 8 missing routes to sitemap.xml.

**H2. Assessment page uses wrong email domain**
`src/pages/Assessment.tsx` line 46: `contactEmail = "hello@aisecuritybrief.com"` — the domain used everywhere else is `aithreatbrief.com`. This is likely an incorrect email address.
- **Fix:** Change to `hello@aithreatbrief.com` or the correct contact address.

**H3. Newsletter page uses `<a>` instead of `<Link>` for article links**
`src/pages/Newsletter.tsx` line 183: `<a href={/blog/${a.slug}}>` — this causes a full page reload instead of client-side navigation. Should use React Router `<Link to={...}>`.

**H4. `og-default.png` does not exist**
`SEOHead.tsx` references `https://aithreatbrief.com/og-default.png` but no such file exists in `public/`. All pages will show a broken Open Graph image when shared on social media.
- **Fix:** Create and add an `og-default.png` (1200x630px) to `public/`.

**H5. Login page "Terms & Privacy Policy" text is not linked**
Line 101 of `Login.tsx`: `"By signing in you agree to our Terms & Privacy Policy."` — this is plain text, not linked to `/terms` or `/privacy`. The legal pages exist now; the text should link to them.

**H6. `hero-bg.jpg` import may fail on some builds**
`HeroSection.tsx` imports `@/assets/hero-bg.jpg`. While the file exists, this is the only asset import in the entire project. If the image is large, it could significantly increase bundle size. Verify it's optimized.

### MEDIUM — Recommended

**M1. Duplicate/redundant tables: `saved_briefings` vs `saved_briefs`**
The database has both `saved_briefings` (references `briefing_id` UUID) and `saved_briefs` (stores title + slug as text). The Dashboard queries `saved_briefs`. The `saved_briefings` table appears unused. This creates confusion and wasted RLS policies.
- **Fix:** Remove `saved_briefings` if not used, or consolidate.

**M2. The `briefings` table appears unused by the frontend**
All article data comes from hardcoded arrays in `src/lib/articles.ts` and `src/lib/imported-articles.ts`. The `briefings` database table with its RLS policies is not queried anywhere in the frontend code. It may be leftover from an earlier iteration.

**M3. The `tools` database table appears unused**
Matrix/Tools pages use hardcoded data from `src/pages/Matrix.tsx` and `src/components/tools/toolData.ts`. The `tools` DB table is not queried.

**M4. `BRAND_AUTHOR_NAME` is "AI Security Brief" but the site is "AI Threat Brief"**
`src/lib/articles.ts` line 36: `BRAND_AUTHOR_NAME = "AI Security Brief"` — inconsistent with the actual brand name.

**M5. Navbar active state only highlights exact path matches**
Line 42 of `Navbar.tsx`: `location.pathname === link.to` — this means `/blog/some-article` won't highlight the "Research" nav item. Should use `startsWith` for nested routes like `/blog/`.

### LOW — Nice to Have

**L1. `ToolCard` external links missing `sponsored` rel attribute**
Affiliate partner links in `ToolCard.tsx` use `rel="noopener noreferrer"` but should also include `sponsored` per Google's guidelines for affiliate links. The `BlogArticle.tsx` `MarkdownRenderer` already does this correctly.

**L2. SocialProof testimonials have no attribution verification**
The testimonials on the homepage ("CISO, Fortune-500 FinTech", etc.) could create trust issues if these are fabricated. Unable to verify from available data.

**L3. `affiliate-url-policy.mjs` used by Node scripts is disconnected from `src/lib/affiliate-links.ts`**
Two separate affiliate systems exist: one for the build-time/Node scripts (`lib/affiliate-links.ts` + `lib/affiliate-url-policy.mjs`) and one for the browser runtime (`src/lib/affiliate-links.ts`). They could drift out of sync.

---

## 3. Security Posture Summary

| Area | Status |
|------|--------|
| RLS on all tables | ✅ Enabled with appropriate policies |
| Leads table write-only | ✅ `INSERT` for anon+authenticated, `SELECT` returns false |
| Profile self-service limited | ✅ Users cannot modify subscription fields |
| Rate limiting on lead capture | ✅ Server-side IP-based in edge function |
| Webhook signature verification | ⛔ Falls back to unverified if secret missing |
| Auth method | ✅ OTP magic link (no anonymous signups) |
| CORS headers | ⚠️ Wildcard `*` on all edge functions (acceptable for public APIs) |
| DB linter | ✅ No issues found |

---

## 4. Implementation Plan (Priority Order)

| # | Fix | Files | Effort |
|---|-----|-------|--------|
| 1 | Fix `getClaims` → `getUser` in stripe-checkout | `supabase/functions/stripe-checkout/index.ts` | 5 min |
| 2 | Add `STRIPE_WEBHOOK_SECRET` + remove unsigned fallback | `supabase/functions/stripe-webhook/index.ts` + add secret | 10 min |
| 3 | Standardize Stripe SDK versions across all 3 functions | 3 edge function files | 10 min |
| 4 | Add missing pages to sitemap.xml | `public/sitemap.xml` | 5 min |
| 5 | Fix Assessment contact email domain | `src/pages/Assessment.tsx` | 1 min |
| 6 | Fix Newsletter `<a>` → `<Link>` | `src/pages/Newsletter.tsx` | 2 min |
| 7 | Link Terms & Privacy in Login page | `src/pages/Login.tsx` | 2 min |
| 8 | Create placeholder `og-default.png` | `public/og-default.png` | 5 min |
| 9 | Fix `BRAND_AUTHOR_NAME` | `src/lib/articles.ts` | 1 min |
| 10 | Add `sponsored` rel to ToolCard affiliate links | `src/components/tools/ToolCard.tsx` | 1 min |
| 11 | Fix navbar active state for nested routes | `src/components/layout/Navbar.tsx` | 3 min |
| 12 | Modernize `check-subscription` to use `Deno.serve` | `supabase/functions/check-subscription/index.ts` | 5 min |

---

## 5. Runbook — Items Requiring Your Action

**R1. STRIPE_WEBHOOK_SECRET**
You must configure the Stripe webhook signing secret. Get it from your Stripe Dashboard → Developers → Webhooks → select your endpoint → Signing secret. I will prompt you to enter it via the secrets tool.

**R2. OG Image**
You should provide a branded 1200x630px Open Graph image (`og-default.png`). If you don't have one, I can generate a placeholder using your brand colors (dark navy + cyan).

**R3. Verify contact email**
Confirm whether the Assessment page contact should be `hello@aithreatbrief.com` or another address.

**R4. Testimonial verification**
Confirm whether the SocialProof testimonials are from real customers or placeholders. If placeholders, they should be marked as such or removed before production.

---

## 6. What Is Working Correctly

- All 18 routes render and are properly registered
- Authentication flow (magic link OTP) is functional
- Lead capture with rate limiting works end-to-end
- Affiliate link resolution works across Tools, Matrix, and article body content
- Blog articles render with TOC, share buttons, and paywall gating
- RLS policies are properly scoped across all 7 tables
- Footer and navbar link to all pages correctly
- Database trigger for profile creation on signup is active
- Referral cookie system is functional
- Article category filtering works on the Blog page

