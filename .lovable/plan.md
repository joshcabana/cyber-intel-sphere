

# Fix Brand Name Inconsistency + Improve Crawler-Visible HTML

## Issues Found

### 1. Brand Name Split: "AI Threat Brief" vs "AI Security Brief"
The codebase uses **two different brand names**:

| Name | Where Used |
|------|-----------|
| **AI Threat Brief** | `index.html`, `SEOHead.tsx`, `Footer.tsx`, `Navbar.tsx`, `Login.tsx`, `src/lib/articles.ts`, all page SEO titles |
| **AI Security Brief** | `lib/site.ts`, `lib/articles.ts` (server-side), `lib/page-metadata.mjs`, `lib/status-data.mjs`, assessment headline |

**"AI Threat Brief"** is the dominant name across the frontend (17 files) and matches the domain `aithreatbrief.com`. The `lib/` server-side files still reference the old "AI Security Brief" name.

**Decision:** Standardize everything to **"AI Threat Brief"**.

### 2. Empty HTML Shell for Crawlers
The app is a client-side SPA — `index.html` has `<div id="root"></div>` and a JS bundle. Simple HTTP fetchers (and potentially some search engine crawlers on first pass) see only the static `<title>` and hardcoded meta tags. React Helmet injects SEO tags at runtime, but those only appear after JS executes.

**Mitigation:** Since this is a Vite SPA (no SSR available), the best we can do is:
- Ensure `index.html` has accurate, complete fallback meta tags (title, description, OG, Twitter) so even non-JS crawlers get correct metadata
- Remove the stale `content="Lovable"` author tag
- Fix the truncated description (`"...matrix for pr"` is cut off)
- Point OG image to the project's own `og-default.png` instead of the Google Storage placeholder

---

## Changes

### File 1: `index.html`
- Fix `<title>` to full branded title: `AI Threat Brief — Independent AI Security Intelligence`
- Fix truncated `<meta name="description">` to full text
- Change `<meta name="author">` from `"Lovable"` to `"AI Threat Brief"`
- Update `og:image` and `twitter:image` to `https://aithreatbrief.com/og-default.png`
- Change `twitter:site` from `@Lovable` to `@joshcabana` (or remove)
- Remove TODO comments

### File 2: `lib/site.ts`
- Change `fallbackSiteName` from `'AI Security Brief'` to `'AI Threat Brief'`
- Change assessment headline from `'Founder, AI Security Brief |...'` to `'Founder, AI Threat Brief |...'`

### File 3: `lib/articles.ts` (server-side, in `lib/`)
- Change `BRAND_AUTHOR_NAME` from `'AI Security Brief'` to `'AI Threat Brief'`

### File 4: `lib/page-metadata.mjs`
- Replace 3 occurrences of "AI Security Brief" with "AI Threat Brief" in ogDescription strings

### File 5: `lib/status-data.mjs`
- Change `FALLBACK_SITE_NAME` from `'AI Security Brief'` to `'AI Threat Brief'`

**5 files changed. No new dependencies. No database changes.**

