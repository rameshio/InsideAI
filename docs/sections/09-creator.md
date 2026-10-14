# 09. Creator (about Ramesh)

**Files:** `src/app/page.tsx` (section "Making AI a little more human."), styles in `src/styles/home.css` (`.creator`)

## What it shows

Left: the full IA logo (`public/brand/insideai-logo-512.png`) in a glowing frame. Right: "Hello, I'm Ramesh.", the headline, a short introduction and a link to `/about`.

## How it works

- The logo frame has `data-tilt`, so it tilts toward the cursor. The image inside drifts vertically as you scroll (scroll-driven `drift` animation, a parallax effect) and zooms slightly on hover.
- Both columns use `.reveal` to rise in on scroll.
- The image uses `next/image` with `sizes`, so phones download a smaller version.

## Editing

Replace the image path to use a portrait photo instead of the logo. Keep it square, or adjust `aspect-ratio` in `.creator-visual`.
