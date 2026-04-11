

## Add Enterprise Tools to Matrix and Make Links Clickable

### Current State
- `src/lib/affiliate-links.ts` — all VPN/privacy affiliate URLs are already correct and live
- `src/pages/Matrix.tsx` — has 18 tools across 8 categories; missing enterprise/B2B tools

### Changes

**File 1: `src/lib/affiliate-links.ts`**
Add new entries to the `defaults` record:
- `vanta` → `https://vanta.com/?ref=aithreatbrief`
- `drata` → `https://drata.com/?ref=aithreatbrief`
- `1password-business` → empty (pending)
- `crowdstrike` → `https://crowdstrike.com/?ref=aithreatbrief`
- `wiz` → `https://wiz.io/?ref=aithreatbrief`
- `auth0` → `https://auth0.com/?ref=aithreatbrief`

**File 2: `src/pages/Matrix.tsx`**
Add 8 new tool entries to the `tools` array with proper categories:

| Tool | Category | Pricing | Affiliate Code |
|------|----------|---------|----------------|
| Vanta | Compliance | Enterprise | `vanta` |
| Drata | Compliance | Enterprise | `drata` |
| 1Password Business | Identity & Auth | Enterprise | `1password-business` |
| CrowdStrike | Endpoint & XDR | Enterprise | `crowdstrike` |
| Wiz | Cloud Security | Enterprise | `wiz` |
| Auth0 / Okta | Identity & Auth | Freemium | `auth0` |
| Protect AI | LLM Security | already present | — |
| Lakera Guard | AI Firewall | already present | — |

Protect AI and Lakera are already in the Matrix, so only 6 new rows are added.

Also: make tool names clickable — wrap each name in an `<a>` tag that resolves the affiliate link via `getAffiliate(tool.affiliate)` and opens in a new tab. Tools without a live affiliate link remain plain text.

### What stays unchanged
- All Pro gating on exports/filters
- Dark premium UI with cyan accents
- Runtime `[AFFILIATE:CODE]` resolver logic
- All existing 18 tools and their data

### Technical Detail
- Import `getAffiliate` from `@/lib/affiliate-links` in Matrix.tsx
- In the table row, conditionally wrap tool name in `<a href={affiliateUrl} target="_blank" rel="noopener noreferrer">` when a live URL exists
- Categories list auto-derives from tool data, so new categories appear automatically

