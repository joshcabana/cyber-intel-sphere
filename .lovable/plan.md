

## Fix: Make CI Pipeline Pass for Vite SPA

### Root cause

The CI pipeline (`deploy.yml`) was inherited from a Next.js project but this is a Vite React SPA. Three of the six verify steps will fail:

1. **`check:content`** — `content-manifest.mjs` imports `gray-matter` (not installed) and reads markdown from `blog/` and `reviews/` directories (both empty — only `.gitkeep`). It will produce a manifest with 0 articles vs the existing `content-manifest.json` with 16 articles. Always fails.

2. **`test:smoke`** — 597 lines of tests for a Next.js app: expects SSR HTML, `/api/subscribe` routes, pnpm, Beehiiv mock servers, Upstash rate limiting, security headers, etc. None of this exists in the Vite SPA. Always fails.

3. **`verify:status-doc`** — Fixed in previous commit (STATUS.md now exists).

Steps that should pass: `lint`, `typecheck`, `test:unit`, `build`.

### Changes

**1. Replace `smoke-test.mjs` with a Vite SPA smoke test**

A minimal script that:
- Runs `vite build` (already done by prior step, so just checks `dist/` exists)
- Reads `dist/index.html` and asserts it contains the app mount point
- Verifies key static assets exist (`dist/assets/`)
- Optionally starts `vite preview` and checks the homepage returns 200

**2. Replace `check:content` with a simpler check**

Since the markdown source files don't live in this repo (articles are defined in `src/lib/imported-articles.ts` and `content-manifest.json`), replace the gray-matter-based check with a validation that `content-manifest.json` is valid JSON with the expected shape (has `articles` array, each with required fields like `slug`, `title`, `date`).

**3. Update `deploy.yml` verify step order**

Move the build step before smoke tests so the smoke test can inspect `dist/`. The current order already does this.

### Files changed

| File | Action |
|------|--------|
| `scripts/smoke-test.mjs` | Rewrite — Vite SPA smoke test (check dist/, preview server 200) |
| `scripts/content-manifest.mjs` | Rewrite `--check` mode — validate JSON shape instead of rebuilding from markdown |
| `package.json` | No changes needed (scripts already defined) |

### Smoke test outline

```text
1. Assert dist/index.html exists (build already ran)
2. Assert dist/index.html contains <div id="root">
3. Assert dist/assets/ has .js and .css files
4. Start `vite preview` on a free port
5. Fetch / → assert 200
6. Fetch /login → assert 200 (SPA fallback)
7. Stop server
```

### Content check outline

```text
1. Read content-manifest.json
2. Assert it has articles array
3. Assert each article has slug, title, date, category
4. Assert articleCount matches articles.length
5. Print "Content manifest is valid."
```

### Risk
- Low — replaces scripts that always fail with ones that match the actual app
- No changes to the app code itself

