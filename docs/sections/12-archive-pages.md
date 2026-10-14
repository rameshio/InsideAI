# 12. Collection archive pages

**Route:** `/updates`, `/videos`, `/guides`, `/resources`
**Files:** `src/app/[collection]/page.tsx`, styles in `src/styles/pages.css`

## What it shows

1. A heading per collection (for example "A clearer signal." for updates) with a one-line description.
2. On `/videos` only (with no search or filter active): a featured episode banner.
3. A search bar (pill input with a Search button).
4. Category filter chips ("All updates", "Models", "Tools" ...). The active chip is solid blue.
5. A result count ("3 entries for 'rag'") and "Newest first".
6. A grid of `ContentCard`s (illustrated for updates and videos, text-only for guides and resources), or an empty state with a "Clear search & filters" button.
7. "Load more" when there are more than 6 per page, then a compact newsletter box.

## How it works

- **The URL is the state.** `?q=`, `?category=` and `?page=` are read from `searchParams`, so every view is shareable and works without JavaScript. Unknown collection names return a 404.
- `filterEntries()` matches the query against title, summary and tags, and the category exactly.
- Pagination is cumulative: page N shows the first `N * 6` results.
- **Search** uses `next/form` (`<Form action="/updates">`). In the browser it submits as a client-side navigation (no full reload). Without JavaScript it is a normal GET form.
- **Filters, search and "Load more" keep your scroll position** (`scroll={false}`) instead of jumping to the top of the page.
- **Animated results.** The results are wrapped in `<ViewTransition key={q|category}>`. When the query or category changes, the key changes, so the old results fade out and the new ones rise in (`results` class in `motion.css`). "Load more" keeps the same key, so new cards are added without a crossfade.
- Each filter chip has `aria-current="page"` when active.

## Editing

Collection titles and descriptions are in the `descriptions` object at the top of the file. Categories per collection are in `collectionCategories` in `src/lib/content.ts`. The page size (6) is in `shown = filtered.slice(0, page * 6)`.
