

## Architecture Conflict: Next.js vs Vite (React SPA)

Your old repo (`joshcabana/security-brief`) is a **Next.js** project. This Lovable project is a **React + Vite SPA** (client-side only). The two architectures are fundamentally incompatible in several critical areas:

### What cannot be directly imported

| Old repo file | Why it won't work in Vite |
|---|---|
| `lib/articles.ts` | Uses `fs.readFile`, `path.join(process.cwd())`, `unstable_cache` from Next.js, `gray-matter`, `remark`, `sanitize-html` — all Node.js server-side APIs unavailable in a browser |
| `lib/affiliate-url-policy.mjs` | Imports `./url-safety.mjs` (another server-side module); uses Node URL parsing |
| `lib/article-trust.ts` | Server-side trust verification system |
| `blog/*.md`, `reviews/*.md` | 16 markdown files read from disk at build/request time — Vite SPA has no filesystem access |
| `.github/workflows/` | 6 YAML files — these are GitHub-only automation, not app code. They can only work after you connect this Lovable project to GitHub |

### What CAN be done

**File 1 — `src/lib/affiliate-links.ts`**: Already has all your real tracking URLs and the runtime `[AFFILIATE:CODE]` resolver. It's functionally equivalent to your old `lib/affiliate-links.ts` but adapted for Vite (uses `import.meta.env` instead of `process.env`). No changes needed — it's already correct.

**File 2 — `src/lib/affiliate-url-policy.ts`** (new): Port the host allowlist validation from your old `.mjs` file to a TypeScript module that runs client-side. This adds security validation to ensure affiliate URLs only resolve to approved domains.

**File 3 — Content as static data**: Your 16 blog articles + reviews can be embedded as static JSON data in `src/lib/articles.ts` (similar to what's already there with 5 articles), OR stored in the database and fetched at runtime. The old file-system approach (`fs.readdir` + `gray-matter`) simply cannot work in a browser.

**File 4 — GitHub workflows**: These are added to `.github/workflows/` in the repo. They'll only function once you connect Lovable to GitHub and push. They don't affect the app itself.

### Proposed plan

1. **Add `src/lib/affiliate-url-policy.ts`** — Port the host allowlist from your old `affiliate-url-policy.mjs` to TypeScript. Wire it into `getAffiliate()` so resolved URLs are validated against approved domains.

2. **Expand `src/lib/articles.ts`** — Add all 16 articles from your old `blog/` and `reviews/` directories as static data entries (same pattern as existing 5 articles). Include frontmatter fields: `author`, `section`, `monetization`, `primarySources`, `featured`, `metaTitle`, `metaDescription`, `keywords`, `reviewedBy`, `reviewedAt`. Add `parseArticleSource`-equivalent validation helpers (assert functions) adapted for client-side use. Add paywall logic (`[beehiiv:paywall]` token splitting).

3. **Add `.github/workflows/` files** — Copy all 6 workflow files (`article-factory.yml`, `deploy.yml`, `newsletter-compiler.yml`, `performance-logger.yml`, `seo-affiliate.yml`, `weekly-harvest.yml`). These become active only after GitHub connection.

4. **Add `content-manifest.json`** to project root — The 1011-line manifest from your old repo, used by the workflows.

5. **Create placeholder directories** — `blog/`, `reviews/`, `harvests/`, `drafts/` as empty directories with `.gitkeep` files, so the workflow scripts have their expected paths when run via GitHub Actions.

6. **Leave untouched** — Matrix page, Supabase config, Stripe integration, dashboard, paywalls, premium UI.

### Important limitation

The old `articles.ts` ran on a Node.js server and dynamically loaded markdown from disk. In this Vite SPA, articles must either be hardcoded in the source or fetched from a database. To get the full dynamic content pipeline working (where you drop a `.md` file and it auto-publishes), you would need to store articles in the database and have the GitHub workflows push content there via an API endpoint. That's a separate, larger piece of work.

### Technical detail

- `affiliate-url-policy.ts` will export `AFFILIATE_HOST_ALLOWLIST` and `normalizeApprovedAffiliateUrl()` adapted for browser `URL` API
- All assert helpers (`assertString`, `assertSlug`, `assertDateString`, etc.) will be ported as pure functions
- Paywall logic: `body.split('[beehiiv:paywall]')[0]` for free content extraction
- `replaceAffiliateTokens` pattern from old repo (`[label](AFFILIATE:CODE)` + bare `[AFFILIATE:CODE]`) will be merged into the existing `resolveAffiliateLinks`

