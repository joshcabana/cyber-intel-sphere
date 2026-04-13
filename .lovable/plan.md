

## Next Top Priorities

Based on the current project state, here are the highest-impact items remaining, in priority order:

---

### Priority 1: Create Stripe Products and Wire Up Real Price IDs (CRITICAL)

**Problem:** The `stripe-checkout` edge function uses `price_data` (lines 74-82), which creates a brand-new Stripe product on every single checkout session. This means duplicate products pile up in Stripe and makes it impossible to track subscriptions by price/product ID. The existing Stripe account has no AI Threat Brief products — only unrelated "Verity Pass" products from another project.

**Fix:**
1. Create two Stripe products/prices using the Stripe tools:
   - "AI Threat Brief Pro Monthly" — $39/mo recurring
   - "AI Threat Brief Pro Annual" — $390/yr recurring
2. Update `stripe-checkout/index.ts` to use the real `price` IDs instead of `price_data`
3. Update `Pricing.tsx` to store the actual `price_` IDs in the tier config
4. Update `check-subscription/index.ts` to map product IDs to tier names

---

### Priority 2: Add Missing Pages to Sitemap (HIGH)

**Problem:** The sitemap was regenerated but is still missing 8 static pages: `/tools`, `/newsletter`, `/assessment`, `/privacy`, `/terms`, `/ai-use`, `/corrections`, `/methodology`. These pages won't be indexed by search engines.

**Fix:** Add all 8 URLs to `public/sitemap.xml`.

---

### Priority 3: Fix `useAuth` Subscription Check Race Condition (HIGH)

**Problem:** In `useAuth.tsx`, `checkSubscription()` calls the edge function but doesn't actually use the response to update local state — it just calls `fetchProfile` afterward, which may read stale DB data if the edge function hasn't finished writing yet. The comment says "Profile will be refreshed after sync" but the timing is not guaranteed.

**Fix:** Chain the calls properly: await `checkSubscription()`, then `fetchProfile()` (already done with `.then()` but the edge function write and the profile read could race). Add a small delay or have `checkSubscription` return the updated tier so the frontend can use it directly.

---

### Priority 4: Add a "Save Brief" Button to Blog Articles (MEDIUM)

**Problem:** The Dashboard shows "Saved Briefs" from the `saved_briefs` table, but there is no UI anywhere to actually save a brief. Users see "No saved briefs yet" with no way to add any.

**Fix:** Add a bookmark/save button to `BlogArticle.tsx` that inserts into the `saved_briefs` table for authenticated users.

---

### Priority 5: Customer Portal for Subscription Management (MEDIUM)

**Problem:** There is no way for Pro subscribers to manage, cancel, or change their subscription. The only subscription-related UI is the checkout flow.

**Fix:** Create a `customer-portal` edge function and add a "Manage Subscription" button to the Dashboard for Pro users.

---

### Technical Details

**Stripe product creation** will use the `create_stripe_product_and_price` tool to create:
- Product: "AI Threat Brief Pro" with two prices ($39/mo, $390/yr)
- The returned `price_` IDs will replace the `price_data` block in `stripe-checkout/index.ts`

**Sitemap** — 8 new `<url>` entries with `priority 0.6` and `changefreq monthly`.

**Files changed:**
| File | Change |
|------|--------|
| `supabase/functions/stripe-checkout/index.ts` | Replace `price_data` with real price IDs |
| `src/pages/Pricing.tsx` | Store actual `price_` IDs |
| `public/sitemap.xml` | Add 8 missing pages |
| `src/hooks/useAuth.tsx` | Fix subscription check timing |
| `src/pages/BlogArticle.tsx` | Add save/bookmark button |
| `supabase/functions/customer-portal/index.ts` | New edge function |
| `src/pages/Dashboard.tsx` | Add "Manage Subscription" button |

