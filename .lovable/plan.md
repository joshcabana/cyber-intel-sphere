

## Step 4 — Homepage & Remaining UI Polish

### Verified ✓
- Blog page: Real articles rendering with category filters, severity badges, PRO locks
- Article detail: Full markdown body, author, date, back link all working
- SEO: Dynamic page titles confirmed (e.g. "Critical: RAG Pipeline Injection... | AI Threat Brief")

### What to tackle next

The **homepage** is the next high-impact fix. The `IntelligenceFeed.tsx` component still uses **hardcoded placeholder articles** (lines 6-70) identical to the old Blog placeholders we just replaced. Visitors land on the homepage first, so this needs to pull from real data.

Additionally, several pages are missing SEO head tags, and the `Pro.tsx` page lacks them too.

### Changes

**1. Connect `IntelligenceFeed.tsx` to real article data**
- Replace the hardcoded `articles` array with `getAllArticles().slice(0, 5)` from `src/lib/articles.ts`
- Keep the existing horizontal-scroll card layout and styling intact

**2. Add SEO head to remaining pages**
- `Pro.tsx` — add SEOHead with Pro-specific title/description
- `Login.tsx` — add SEOHead
- `Dashboard.tsx` — add SEOHead
- `NotFound.tsx` — add SEOHead with noindex

**3. Connect `MatrixTeaser.tsx` preview to real Matrix data** (optional, low effort)
- Pull the top 4 tools from the `tools` array in Matrix.tsx instead of a separate hardcoded list

### Files changed

| File | Action |
|------|--------|
| `src/components/home/IntelligenceFeed.tsx` | Use real article data |
| `src/pages/Pro.tsx` | Add SEOHead |
| `src/pages/Login.tsx` | Add SEOHead |
| `src/pages/Dashboard.tsx` | Add SEOHead |
| `src/pages/NotFound.tsx` | Add SEOHead |

