# 05. Briefing (latest updates)

**Files:** `src/app/page.tsx` (section "Know what matters."), `src/components/content-card.tsx` (`ContentCard`, `Art`), styles in `src/styles/home.css` (`.briefing-grid`) and `src/styles/base.css` (cards)

## What it shows

The three newest entries from `content/updates/`, as a bento layout: the newest is a large featured card on the left spanning two rows; the next two are stacked on the right. A note underneath says these are demonstration editions, not current news. "All updates" links to `/updates`.

## How it works

- `getEntries("updates")` (see [15](15-content-system.md)) returns published updates, newest first.
- `ContentCard` renders each one as a link to `/updates/<slug>` with: an illustration, category and reading time, title with an arrow, summary, date, and a "Demo content" label when the entry is a demo.
- `featured` adds `.featured-card`, which spans two grid rows and gets a taller illustration and larger title.
- Every card has `data-tilt`, so it tilts in 3D with a cursor spotlight (see [01](01-motion-and-effects.md)). The arrow springs on hover and the border glows.
- The grid has `.stagger`, so the cards rise in one after another with a slight 3D pitch as you scroll to them.

## The illustrations (`Art`)

Each card without a YouTube thumbnail gets a generated network illustration in the logo's style, drawn as SVG on the server:

- four layouts (`orbit`, `cluster`, `flow`, `lattice`) chosen by the card's position;
- 26 seeded points, each joined to its two nearest neighbours;
- one bright "hub" node with a glow;
- a perspective grid floor behind it.

They are deterministic (seeded), cached per variant, and cost no image downloads. On hover the network zooms slightly. If an entry has a real `youtubeId`, the YouTube thumbnail is shown instead.
