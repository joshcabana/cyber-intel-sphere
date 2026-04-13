

## What's been completed so far

1. **Environment Setup** — `.env.example`, `README.md`, runtime env check in `main.tsx` (done)
2. **Vite Compatibility** — Verified clean, no fixes needed (done)
3. **Core UI** — Homepage, Blog, Matrix, Dashboard, Pricing, About, Login pages (done)
4. **Auth** — Magic link OTP via Supabase, AuthProvider, ProtectedRoute (done)
5. **Stripe** — Edge functions for checkout & webhooks, Pricing page (done)
6. **Affiliate system** — Full resolver with 30+ entries in `src/lib/affiliate-links.ts` (done)
7. **Content** — Imported articles with full markdown bodies, BlogArticle renderer (done)
8. **Referral system** — Cookie-based referral tracking, Dashboard display (done)

## Recommended next step: Step 3 — Content Pipeline Integration

The Blog page currently uses **hardcoded placeholder articles** (5 static entries in `Blog.tsx`), completely disconnected from the rich imported article library in `src/lib/imported-articles.ts` (which has full bodies, authors, takeaways, etc.). This is the highest-impact fix — it makes the site look real.

### Changes

**1. Connect Blog listing to the real article data**
- Update `src/pages/Blog.tsx` to import from `src/lib/articles.ts` (which already aggregates `importedArticles`) instead of using hardcoded placeholder data
- Render real titles, dates, categories, excerpts, severity badges, and Pro locks
- Add category filtering (the data already has categories like "AI Threats", "Privacy", "VPN")

**2. Add SEO metadata per page**
- Create a lightweight `useDocumentTitle` hook or use `document.title` in each page's `useEffect`
- Set proper `<title>` and `<meta description>` for Index, Blog, Matrix, About, Pricing pages
- Add Open Graph tags via a small `Helmet`-style component (react-helmet-async) for social sharing with aithreatbrief.com branding

**3. Generate a sitemap and update robots.txt**
- Create a build-time script that outputs `public/sitemap.xml` from the article slugs in `imported-articles.ts`
- Update `public/robots.txt` to reference `https://aithreatbrief.com/sitemap.xml`

### Files changed

| File | Action |
|------|--------|
| `src/pages/Blog.tsx` | Rewrite to use real article data |
| `src/components/SEOHead.tsx` | New — reusable meta/OG tag component |
| `src/pages/Index.tsx` | Add SEO head |
| `src/pages/About.tsx` | Add SEO head |
| `src/pages/Matrix.tsx` | Add SEO head |
| `src/pages/Pricing.tsx` | Add SEO head |
| `src/pages/BlogArticle.tsx` | Add dynamic SEO head per article |
| `public/robots.txt` | Update sitemap URL |
| `scripts/generate-sitemap.mjs` | New — build-time sitemap generator |
| `package.json` | Add react-helmet-async dependency |

### Why this is the right next step

- The Blog page is the most visible broken piece — visitors see placeholder content instead of real articles
- SEO/OG tags are essential before promoting the domain
- The sitemap enables Google indexing immediately after DNS propagation
- All the data already exists in `imported-articles.ts` — this is wiring, not content creation

