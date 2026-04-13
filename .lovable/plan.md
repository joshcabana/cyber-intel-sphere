

## Scavenge Report: `ai-security-brief` (older repo) vs Current Project

### Summary

This repo is an earlier fork of the same project. Most content (blog articles, legal pages, tools, assessment, methodology) was already ported from the newer `security-brief` repo. The blog articles are the same 14 articles (the current project actually has 2 additional: `best-llm-firewall-2026` and `preventing-prompt-injection-attacks`).

Three items are worth scavenging:

### 1. Newsletter Landing Page (HIGH value, MEDIUM effort)

The old repo has a dedicated `/newsletter` page that does not exist in the current project. It includes:
- Hero section with subscribe form
- 6 benefit cards (curated briefings, tool reviews, threat actor analysis, low-noise, practical context, editor reviewed)
- Stats row (article count, editorial tracks, cadence, price)
- Recent articles preview grid
- Bottom CTA with second subscribe form

This is a key conversion page for the newsletter funnel. Currently the homepage has a lead magnet but there is no standalone newsletter page to link to from social, email signatures, etc.

### 2. Tools Page: Wire Up Affiliate Links (HIGH value, LOW effort)

The current `Tools.tsx` uses hardcoded static URLs (e.g. `https://nordvpn.com`). The old repo resolves affiliate URLs at runtime via `affiliateKeys` arrays and `getAffiliateUrlByPriority()`. The current project already has `src/lib/affiliate-links.ts` with `getAffiliate()` containing all the tracking URLs (NordVPN, ProtonVPN, Surfshark, Incogni, etc.) but the Tools page doesn't use them. This means affiliate partner tools currently link to non-tracked URLs, losing attribution.

### 3. Tools Page: JSON-LD Structured Data (LOW value, LOW effort)

The old repo generates `ItemList` schema.org JSON-LD for the tools page, which helps with rich search results. Easy to add.

### NOT worth porting

- **Blog articles** — same 14 articles, current project has 2 more
- **Legal/trust pages** — already ported from `security-brief`
- **NewsletterForm component** — uses Next.js `/api/subscribe` route; current project already has LeadMagnet with edge function
- **HARO templates** — marketing ops doc, not app code
- **Tests** — written for Next.js app, not applicable
- **ShieldLogo** — current project already uses lucide Shield icon
- **Performance logs** — operational data, not code

### Implementation Plan

| Priority | Item | Files |
|----------|------|-------|
| 1 | Wire up affiliate links on Tools page | `src/pages/Tools.tsx` — add `affiliateKeys` to tool data, resolve via `getAffiliate()` from existing `src/lib/affiliate-links.ts` |
| 2 | Create Newsletter landing page | `src/pages/Newsletter.tsx`, add route in `App.tsx`, add nav link |
| 3 | Add JSON-LD to Tools page | `src/pages/Tools.tsx` — add script tag with structured data |

### Technical Details

**Affiliate link wiring**: Replace hardcoded `url` strings on affiliate-partner tools with a lookup: `getAffiliate("nordvpn")?.url ?? "https://nordvpn.com"`. Non-affiliate tools (Mullvad, Bitwarden, etc.) keep their direct URLs. This ensures clicks on NordVPN go to `go.nordvpn.net/aff_c?aff_id=143381` instead of plain `nordvpn.com`.

**Newsletter page**: Port the content and layout from the old repo's `app/newsletter/page.tsx`, adapting to React Router and the existing design system. Reuse the existing `LeadMagnet` component or the lead submission edge function for the subscribe form. Show article stats from `importedArticles`.

