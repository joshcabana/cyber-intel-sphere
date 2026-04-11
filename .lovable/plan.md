

## Update Affiliate Links with Real Tracking URLs

Update `src/lib/affiliate-links.ts` to replace placeholder `?ref=aithreatbrief` URLs with the real affiliate tracking URLs provided.

### Changes

**Single file: `src/lib/affiliate-links.ts`**

Update the `defaults` record:

| Code | URL | Notes |
|------|-----|-------|
| `nordvpn` | `https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143381&url_id=902` | Live |
| `protonvpn` | `https://go.getproton.me/aff_c?url_id=471` | Live |
| `proton` | `https://go.getproton.me/aff_c?url_id=471` | Same as ProtonVPN |
| `purevpn` | `https://www.purevpn.com/order-now.php?affiliate_id=49384204` | Live |
| `surfshark` | `""` (empty string — not yet live) | Keep entry, no URL |
| `incogni` | `""` (empty string — not yet live) | Keep entry, no URL |

Add new entries:
- `proton-mail` → `https://go.getproton.me/aff_c?url_id=921`
- `1password` → empty (pending)
- `malwarebytes` → empty (pending)

For entries with empty URLs, the resolver will return `null` so `[AFFILIATE:surfshark]` gracefully falls back to plain text until the URL is added.

Remove placeholder coupon codes from entries that don't have confirmed coupons. Keep the `AITHREAT` coupon on NordVPN since it was in the original spec.

No other files need changes — the resolver, articles, and Matrix already import from this file.

