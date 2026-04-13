

## Fix: Align CI/CD with Lovable's Package Manager

### Problem
The `deploy.yml` workflow expects pnpm + pnpm-lock.yaml, but the repo uses bun + bun.lock. It also references 5 npm scripts that don't exist in package.json.

### Changes

**1. Switch `deploy.yml` from pnpm to bun**
- Replace `pnpm/action-setup` with `oven-sh/setup-bun@v2`
- Replace `actions/setup-node` cache config (remove `cache: 'pnpm'`)
- Replace all `pnpm install --frozen-lockfile` → `bun install --frozen-lockfile`
- Replace all `pnpm run` / `pnpm` script calls → `bun run`
- Replace `pnpm dlx vercel@...` → `bunx vercel@...`

**2. Add missing scripts to `package.json`**
- `typecheck` → `tsc --noEmit`
- `test:unit` → `vitest run`
- `test:smoke` → `node scripts/smoke-test.mjs` (file already exists)
- `verify:status-doc` → `node scripts/verify-status-doc.mjs` (file already exists)
- `check:content` → `node scripts/content-manifest.mjs --check` (file already exists)

**3. Do the same for all other workflow files**
- `article-factory.yml` — switch from pnpm to bun
- `newsletter-compiler.yml`, `performance-logger.yml`, `seo-affiliate.yml`, `weekly-harvest.yml` — check and align if they also use pnpm

### Files changed

| File | Action |
|------|--------|
| `.github/workflows/deploy.yml` | Switch pnpm → bun throughout |
| `package.json` | Add missing script entries |
| `.github/workflows/article-factory.yml` | Switch pnpm → bun |
| Other workflow files | Audit and align if needed |

### Technical notes
- `oven-sh/setup-bun@v2` is the standard GitHub Action for bun
- `bun install --frozen-lockfile` works with `bun.lock`
- The `cache` option on `actions/setup-node` should be removed (bun handles its own caching, or use `oven-sh/setup-bun` cache)
- All referenced scripts (`smoke-test.mjs`, `verify-status-doc.mjs`, `content-manifest.mjs`) already exist in the repo — they just need package.json entries

