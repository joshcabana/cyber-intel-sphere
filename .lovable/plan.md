

## Step 5 — Wire Up Remaining Hardcoded Data & Lead Capture

### Current state

Steps 1-4 are complete. Three components still use hardcoded placeholder data, and the lead magnet form is a no-op.

### Problem areas

1. **Dashboard "Latest Briefings"** (lines 125-145 in `Dashboard.tsx`) — three hardcoded items instead of real articles
2. **LeadMagnet email form** — `handleSubmit` just sets local state; emails are lost
3. **MatrixTeaser** — hardcoded `previewTools` array duplicates data already in `Matrix.tsx`

### Changes

**1. Dashboard: replace hardcoded briefings with real articles**
- Import `getAllArticles()` from `src/lib/articles.ts`
- Render the latest 3 articles with real titles, severity badges, dates, and links to `/blog/{slug}`

**2. Lead capture: create `leads` table and wire up the form**
- Create a `leads` table via migration: `id`, `email`, `source` (default `'checklist'`), `created_at`
- RLS policy: allow anonymous inserts (public lead capture), no select/update/delete for anon
- Update `LeadMagnet.tsx` to insert into `leads` table on submit with error handling and toast feedback

**3. MatrixTeaser: pull top tools dynamically**
- Import the `tools` array from `Matrix.tsx` (export it as a named export)
- Sort by rating descending, take top 4 — eliminates the duplicate hardcoded list

### Files changed

| File | Action |
|------|--------|
| `src/pages/Dashboard.tsx` | Replace hardcoded briefings with `getAllArticles().slice(0,3)` |
| `src/components/home/LeadMagnet.tsx` | Wire form to insert into `leads` table |
| `src/components/home/MatrixTeaser.tsx` | Import tools from Matrix, sort by rating |
| `src/pages/Matrix.tsx` | Export `tools` array as named export |
| Migration | Create `leads` table with anonymous insert RLS |

### Technical details

**`leads` table schema:**
```sql
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL DEFAULT 'checklist',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

**Dashboard briefings** will use `getAllArticles().slice(0, 3)` with `<Link>` wrapping each card, replacing the static array. Relative dates will use a simple helper (`formatRelativeDate`).

**MatrixTeaser** will import `tools` from Matrix.tsx (add `export` keyword), then `.sort((a,b) => b.rating - a.rating).slice(0,4)`.

