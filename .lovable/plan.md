

## Add Newsletter Link to Navbar and Footer

### What's already done
- `/tools` page renders correctly with affiliate partner badges and tracked URLs
- `/newsletter` page renders correctly with subscribe form, benefit cards, and stats
- `BlogArticle.tsx` already has a Table of Contents sidebar with IntersectionObserver scroll tracking — no changes needed

### Remaining work

**1. Add "Newsletter" to navbar** (`src/components/layout/Navbar.tsx`)
- Add `{ to: "/newsletter", label: "Newsletter" }` to the `navLinks` array (after "Research" / before "About")

**2. Add "Newsletter" to footer** (`src/components/layout/Footer.tsx`)
- Add a `<Link to="/newsletter">Newsletter</Link>` in the "Intelligence" column (alongside Research, Stack Matrix, Tools)

### Files changed

| File | Change |
|------|--------|
| `src/components/layout/Navbar.tsx` | Add newsletter to `navLinks` array |
| `src/components/layout/Footer.tsx` | Add newsletter link in Intelligence column |

