

# Full Quality Assurance Audit — AI Threat Brief

## Project Overview

AI Threat Brief is a cybersecurity intelligence platform (React 18 + Vite + Tailwind + Lovable Cloud) at **aithreatbrief.com**. It delivers AI threat briefings, a security tools matrix, and a Pro subscription tier via Stripe.

**Current state:** The live frontend (articles, pricing, tools, auth) is functional. The previous remediation round fixed `rel="sponsored"` logic and deleted the orphaned `TimedScarcityModal`. Security scans pass clean. However, a significant branding issue remains.

---

## Critical Finding: "Josh Cabana" Not Fully Removed

The user explicitly requested removal of all references to "Josh Cabana." While the **frontend React code** (`src/`) was cleaned, **124 references remain across 9 files** in non-src code:

| # | File | Instances | Impact |
|---|------|-----------|--------|
| 1 | `index.html` line 23 | `@joshcabana` in twitter:site meta tag | **Visible to crawlers and social previews** |
| 2 | `content-manifest.json` | 16 author objects with `"Josh Cabana"` | Used by automation scripts to generate future articles |
| 3 | `scripts/article-trust.mjs` line 9 | `CANONICAL_AUTHOR` hardcoded | Future articles would carry the old name |
| 4 | `scripts/automation/prompt-builders.mjs` lines 39, 43 | AI prompt instructs to use "Josh Cabana" as byline | Future auto-generated articles would use the old name |
| 5 | `lib/site.ts` line 112 | `xUrl: 'https://twitter.com/joshcabana'` | Referenced by automation scripts |
| 6 | `scripts/generate-status.mjs` line 60 | `'joshcabana/ai-security-brief'` fallback repo | Non-critical — GitHub repo identifier |
| 7 | `scripts/check-monday-pipeline.mjs` line 15 | Same repo fallback | Non-critical |
| 8 | `scripts/get-vercel-preview-url.mjs` line 7 | Same repo fallback | Non-critical |
| 9 | `STATUS.md` lines 28-30 | Git merge history references | Non-critical — historical record |

---

## Console Warning

A React warning fires on every page load:
> "Function components cannot be given refs" in `DialogContent` → `DialogPortal`

This is a known Radix UI / React 18 compatibility warning (not a bug). `DialogPortal` is a function component that doesn't accept refs. It does not affect functionality. No fix needed unless upgrading to Radix UI v2.

---

## Plan (ordered by severity)

### Step 1 — Fix `index.html` twitter:site meta (user-facing, SEO-critical)
Change `<meta name="twitter:site" content="@joshcabana" />` to `<meta name="twitter:site" content="@aithreatbrief" />` (or remove the tag if no official Twitter handle exists).

### Step 2 — Update `content-manifest.json` author objects
Replace all 16 instances of `"name": "Josh Cabana"` with `"name": "AI Threat Brief Research"` and `"role": "Editor & Publisher"` with `"role": "Editorial Team"`.

### Step 3 — Update `scripts/article-trust.mjs` CANONICAL_AUTHOR
Change line 9 from `name: 'Josh Cabana'` to `name: 'AI Threat Brief Research'` and role to `'Editorial Team'`.

### Step 4 — Update `scripts/automation/prompt-builders.mjs`
Replace the AI prompt instructions (lines 39, 43) to use "AI Threat Brief Research" as the author name instead of "Josh Cabana".

### Step 5 — Update `lib/site.ts` founder config
Replace or remove the `founder.xUrl` reference to `joshcabana`. Either point to the brand's Twitter or remove the field.

### Step 6 — Clean up repo fallbacks (low priority)
Update `joshcabana/ai-security-brief` references in `scripts/generate-status.mjs`, `scripts/check-monday-pipeline.mjs`, and `scripts/get-vercel-preview-url.mjs`. These are GitHub repo identifiers — the correct value depends on the actual GitHub org/repo name. If the repo hasn't been transferred, these can stay as-is.

### Step 7 — Clean up `STATUS.md` merge history
Remove the `joshcabana/` branch references from the merge history, or replace with anonymized entries.

### Step 8 — Run security scan
Re-run the security scan after changes to confirm no regressions.

---

## Items Already Verified as Clean

- `rel="sponsored"` logic in `ToolCard.tsx` — correctly conditional on `isAffiliate`
- `rel="sponsored"` logic in `BlogArticle.tsx` — correctly checks `AFFILIATE_HOST_ALLOWLIST`
- `TimedScarcityModal.tsx` — already deleted (search returns zero matches)
- RLS policies — all tables properly protected; linter clean
- Pricing page — renders correctly; FAQ JSON-LD present
- Mobile responsiveness — verified in prior walkthrough
- Frontend branding — all `src/` files use "AI Threat Brief Research"

---

## Runbook for Items Beyond Automated Control

**GitHub repo rename:** The fallback values `joshcabana/ai-security-brief` in scripts reference the GitHub repository slug. If you want to fully remove this name:
1. Go to GitHub → Settings → Repository name → Rename
2. Update `GITHUB_REPOSITORY` in your GitHub Actions secrets/env
3. The fallback strings in scripts will then never trigger (they only fire when `GITHUB_REPOSITORY` env var is unset)

**Twitter handle:** Decide whether `@aithreatbrief` is the correct brand handle for the `twitter:site` meta tag. If no brand handle exists, remove the tag entirely.

---

## Summary

| Category | Status |
|----------|--------|
| Frontend code | Clean |
| Database & RLS | Clean |
| Security scan | Clean |
| SEO meta tags | **1 fix needed** (twitter:site) |
| Automation scripts | **4 files need name removal** |
| Content manifest | **16 author entries need update** |
| Dead code | Clean |

**Total: 8 files to update, 0 new dependencies, 0 database changes.**

