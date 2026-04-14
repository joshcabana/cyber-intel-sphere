

# Remaining Brand Inconsistencies

There are **three categories** of stale "AI Security Brief" references still in the codebase:

---

## Category 1: Email addresses — `hello@aisecuritybrief.com`

These use the old domain and should be updated to match the canonical brand (either `hello@aithreatbrief.com` or whatever the active mailbox is — needs your confirmation).

| File | Line | Current |
|------|------|---------|
| `src/pages/Corrections.tsx` | 29 | `hello@aisecuritybrief.com` (×2, text + href) |
| `src/pages/AIUse.tsx` | 50 | `hello@aisecuritybrief.com` (×2, text + href) |
| `scripts/verify-production.mjs` | 20 | `ASSESSMENT_CONTACT_EMAIL = 'hello@aisecuritybrief.com'` |

## Category 2: Scripts still using "AI Security Brief" in prose / prompts / output

| File | What |
|------|------|
| `scripts/article-trust.mjs` line 4 | `BRAND_AUTHOR_NAME = 'AI Security Brief'` |
| `scripts/automation/prompt-builders.mjs` lines 31, 43, 107, 158 | LLM system prompts say "AI Security Brief" |
| `scripts/automation/run-performance-logger.mjs` line 143 | Markdown header `# AI Security Brief — Performance Log` |
| `scripts/verify-live.mjs` line 513 | Checks homepage for `'AI Security Brief'` — **this will break** since homepage now says "AI Threat Brief" |
| `scripts/generate-linkedin-document-teaser.py` lines 2, 56, 188, 189 | PDF title/author/body text |

## Category 3: Repo/slug references — `ai-security-brief`

These are GitHub repo names, Vercel project slugs, user-agent strings, and config paths. They're functional identifiers rather than user-facing brand, but worth noting:

| File | What |
|------|------|
| `scripts/get-vercel-preview-url.mjs` | `DEFAULT_REPO`, `DEFAULT_PROJECT_NAME` = `'ai-security-brief'` |
| `scripts/generate-status.mjs` | `repository` fallback, `vercel_fallback` URL |
| `scripts/check-monday-pipeline.mjs` | `DEFAULT_REPO` |
| `scripts/automation/github.mjs` | User-Agent header |
| `scripts/automation/feeds.mjs` | User-Agent header |
| `scripts/verify-ops.mjs` | Console banners, env hint |
| `scripts/replace-affiliate-links.mjs` | `~/.ai-security-brief/` config directory path |
| `scripts/generate-linkedin-document-teaser.py` | Output path `marketing/assets/ai-security-brief-pro-launch-teaser.pdf` |
| `lib/site.ts` lines 106-107 | Beehiiv URLs: `aisec.beehiiv.com` (these are external service URLs — only change if a new Beehiiv publication exists) |

## Category 4: Verify-live script will **fail** (URGENT)

`scripts/verify-live.mjs` line 513 checks `body.includes('AI Security Brief')`. Since we just standardized the homepage to "AI Threat Brief", this smoke test will now **always fail** on the next deploy. This needs an immediate fix.

---

## Proposed Changes

### Must-fix (7 files)
1. **`scripts/verify-live.mjs`** — Change check string to `'AI Threat Brief'` (prevents broken CI)
2. **`scripts/article-trust.mjs`** — Update `BRAND_AUTHOR_NAME`
3. **`scripts/automation/prompt-builders.mjs`** — Replace 4 occurrences in LLM prompts
4. **`scripts/automation/run-performance-logger.mjs`** — Update markdown header
5. **`scripts/generate-linkedin-document-teaser.py`** — Update PDF metadata and body text
6. **`src/pages/Corrections.tsx`** — Update email to `hello@aithreatbrief.com`
7. **`src/pages/AIUse.tsx`** — Update email to `hello@aithreatbrief.com`

### Should-fix (1 file)
8. **`scripts/verify-production.mjs`** — Update `ASSESSMENT_CONTACT_EMAIL`

### Defer (repo slugs, external service URLs)
- GitHub repo name, Vercel project slug, Beehiiv URLs, config directory paths — these are infrastructure identifiers. Renaming them would require coordinated changes in GitHub, Vercel, and Beehiiv settings. Flag for a future cleanup but don't change now.

**8 files changed. No database changes. No new dependencies.**

