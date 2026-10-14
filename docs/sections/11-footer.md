# 11. Footer

**Files:** `src/components/site-shell.tsx` (`Footer`), styles in `src/styles/base.css` (`.footer` and following)

## What it shows

The logo and wordmark with "Less hype. More understanding.", then three link columns:

- **Explore:** Updates, Videos, Guides, Resources
- **Connect:** Instagram, YouTube (only when `NEXT_PUBLIC_YOUTUBE_URL` is set), Newsletter, Contact
- **Inside AI:** About Ramesh, Privacy, RSS feed

The bottom row has the copyright year and "Made for the curious."

## How it works

- Server-rendered. The year comes from `new Date()` at build/render time.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Social URLs come from `src/config/site.ts`, the single place for brand settings.
- On phones the columns wrap and the bottom row stacks.
