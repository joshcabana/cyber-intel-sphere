

## Scavenge Report: Old Repo → Current Project

### What the old repo has

The old repo (`security-brief`) is a Next.js 15 app with ~25 routes, 20+ components, 16 blog articles (markdown), 4 reviews, and a full GitHub Actions automation pipeline. The current Lovable project already has the blog content (ported into `src/lib/imported-articles.ts`), the automation scripts, and the core page structure (Index, Blog, BlogArticle, Matrix, Pricing, Pro, About, Dashboard, Login, Referral).

### What's worth scavenging

Ranked by impact and effort:

**1. Legal pages — Privacy, Terms, AI Use Policy, Corrections (HIGH value, LOW effort)**
The current footer has dead text links for "Privacy Policy", "Terms of Service", and "Independence Policy" that go nowhere. The old repo has fully written content for all four. These are essential for a live publication with affiliate links and newsletter subscriptions.

**2. Tools Directory page (HIGH value, MEDIUM effort)**
The old repo has a rich `/tools` page with categorized security tools (VPNs, password managers, encrypted email, endpoint/cloud security, compliance). It resolves affiliate links at runtime. The current project has `lib/affiliate-links.ts` and `src/lib/affiliate-links.ts` but no Tools page to display them. This is a monetization surface.

**3. Article Table of Contents component (MEDIUM value, LOW effort)**
`ArticleTOC.tsx` — a floating sidebar TOC that parses h2/h3 headings, highlights the active section on scroll via IntersectionObserver, and provides smooth-scroll links. Significantly improves the reading experience on long-form articles (most are 2000+ words).

**4. Share Buttons component (MEDIUM value, LOW effort)**
Social sharing for X and LinkedIn plus native Web Share API. Easy to port — just swap Next.js `Link` for React Router and remove `'use client'` directive.

**5. Assessment / Consulting page (MEDIUM value, MEDIUM effort)**
A lead-gen landing page for the "AI Agent Security Readiness Review" — a paid consulting offer with deliverables, pricing, fit signals, and a contact form. Good revenue page if the consulting service is active.

**6. Methodology page (LOW-MEDIUM value, LOW effort)**
Editorial credibility page explaining how tools are evaluated, affiliate transparency, and research independence. The About page partially covers this but the old repo's version is more detailed.

**7. AccountabilityBox component (LOW value, LOW effort)**
Shows human review status on each article (reviewer name, date, or "pending review" warning). Supports the editorial trust positioning.

**8. SearchBar component (LOW value, LOW effort)**
Basic search UI for filtering blog articles. The old repo version is purely cosmetic (no actual search logic), so this would need real implementation.

### What's NOT worth porting

- **Next.js API routes** (`app/api/`) — already replaced by Supabase edge functions
- **RSS feed** (`app/feed.xml/`) — can be added later, low priority
- **Middleware** (`middleware.ts`) — Next.js auth middleware, not applicable
- **Server components / SSR patterns** — incompatible with Vite SPA
- **`lib/beehiiv-api.mjs`** — already exists in current project
- **Blog markdown files** — already imported into `imported-articles.ts`

### Recommended implementation plan

| Priority | Item | Files created/modified |
|----------|------|----------------------|
| 1 | Privacy Policy page | `src/pages/Privacy.tsx`, update `App.tsx` route, update `Footer.tsx` links |
| 2 | Terms of Service page | `src/pages/Terms.tsx`, update `App.tsx` route |
| 3 | AI Use Policy page | `src/pages/AIUse.tsx`, update `App.tsx` route |
| 4 | Corrections page | `src/pages/Corrections.tsx`, update `App.tsx` route |
| 5 | Tools Directory page | `src/pages/Tools.tsx`, update `App.tsx` route, update `Navbar.tsx` |
| 6 | Article TOC component | `src/components/blog/ArticleTOC.tsx`, update `BlogArticle.tsx` |
| 7 | Share Buttons component | `src/components/blog/ShareButtons.tsx`, update `BlogArticle.tsx` |
| 8 | Assessment page | `src/pages/Assessment.tsx`, update `App.tsx` route |

All content will be adapted from the old repo's pages, converted from Next.js server components to React client components with React Router, and styled using the existing Tailwind design system.

### Estimated scope

8 new/modified page components, 2 new UI components, route additions in `App.tsx`, and footer link updates. No database changes needed.

