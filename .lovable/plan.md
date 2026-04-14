

# Final Remediation — Remaining Issues to 100%

Everything from the two audit rounds has been addressed except these items. Grouped by effort.

---

## Quick Fixes (5 items)

**1. ToolCard — `rel="sponsored"` on non-affiliate links**
`src/components/tools/ToolCard.tsx` line 35 uses `rel="noopener noreferrer sponsored"` for ALL tool links, including Mullvad, Bitwarden, SimpleLogin, CrowdStrike, and Malwarebytes which are NOT affiliate partners. `rel="sponsored"` is an SEO signal that tells Google "this is a paid link" — using it on non-affiliate links is incorrect and could hurt the site's link equity.

Fix: Add an `isAffiliate` boolean to the `Tool` interface. In `toolData.ts`, set it `true` only for tools with the "Affiliate partner" badge. In `ToolCard.tsx`, conditionally use `rel="noopener noreferrer sponsored"` for affiliates and `rel="noopener noreferrer"` for non-affiliates.

**2. BlogArticle MarkdownRenderer — same issue**
`src/pages/BlogArticle.tsx` line 66 marks ALL external links in article markdown as `rel="sponsored"`. Most outbound links in articles are to source material (NIST, vendor advisories, research papers), not affiliate links.

Fix: Only add `sponsored` when the link URL matches a known affiliate domain from the affiliate allowlist in `affiliate-url-policy.ts`.

**3. Delete orphaned `TimedScarcityModal` component**
`src/components/TimedScarcityModal.tsx` is no longer imported anywhere. Remove the dead file.

**4. Delete duplicate root-level `lib/` files**
The project has both `lib/` (root) and `src/lib/` with overlapping files: `affiliate-links.ts`, `articles.ts`, `seo.ts`, `article-trust.ts`. The root `lib/` files are used by Node/Bun automation scripts (not the Vite app). This is not a bug per se, but `lib/site.ts` references `process.env.NEXT_PUBLIC_*` variables — leftover from a Next.js origin. No action needed for the Vite app, but worth noting. Skip this unless the user wants cleanup.

**5. FAQ JSON-LD on Pricing page — verify it renders**
The `generateFAQSchema` import exists and the schema is generated, but confirm the `<script type="application/ld+json">` tag is actually injected into the page DOM (it was added in a prior batch).

---

## Medium Fixes (2 items)

**6. Pricing page — Free tier shows `$0/mo` on both toggle states**
Currently line 185: `${annual ? Math.round((tier.price.annual || 0) / 12) : tier.price.monthly}` renders `$0` for Free. Line 187 checks `tier.price.monthly > 0` to decide whether to show `/mo`. This works correctly — Free shows just `$0` with no `/mo`. Confirmed working, no fix needed.

**7. Security scan**
Run a security scan to verify no RLS gaps or exposed data exist before declaring 100% done.

---

## Implementation Summary

| # | File | Change |
|---|------|--------|
| 1 | `src/components/tools/ToolCard.tsx` | Add `isAffiliate` prop, conditional `rel` |
| 2 | `src/components/tools/toolData.ts` | Add `isAffiliate: true` to affiliate tools |
| 3 | `src/pages/BlogArticle.tsx` | Only add `sponsored` for affiliate domains |
| 4 | `src/components/TimedScarcityModal.tsx` | Delete file |
| 5 | Security scan | Run and verify |

Total: 4 file changes + 1 deletion + 1 security check. No new dependencies. No database changes.

