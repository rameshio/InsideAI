# 08. Free resources

**Files:** `src/app/page.tsx` (section "Good ideas. Ready to use."), styles in `src/styles/home.css` (`.resource-section`, `.resource-shelf`)

## What it shows

A heading block ("Free resources" label, "Good ideas. **Ready to use.**", one line of copy, "Open the resource shelf" link), then the first three resources as full-width rows: a download icon tile, category, large title and an arrow.

## How it works

- Data: `getEntries("resources").slice(0, 3)`. Each row links to `/resources/<slug>`, where the downloadable file and copyable prompt live (see [13](13-article-detail.md)).
- The rows are deliberately a different layout from the card grids above, so the page does not repeat itself.
- On hover the icon and title slide right (a transform, so no layout shift), the row gets a blue gradient wash, and the icon glows.
- `.stagger` makes the rows rise in one by one.

## Editing

Downloadable files live in `public/downloads/`. Resource entries reference them with `download: /downloads/<file>`.
