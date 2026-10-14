# 01. Motion and effects

**Files:** `src/components/motion/effects.tsx`, `src/app/template.tsx`, `src/styles/motion.css`, parts of `src/styles/base.css`

Every animation has a job: to draw attention to the right thing, to acknowledge a click, or to show that something changed. All of it switches off for visitors who set "reduce motion" in their operating system.

## 1. Smooth scrolling (Lenis)

`effects.tsx` creates one `Lenis` instance when the site loads. It turns mouse-wheel scrolling into smooth, inertial scrolling (`duration: 1.15`). Touch devices keep their native scrolling. `anchors: true` makes in-page `#links` glide too. When the route changes, `lenis.resize()` re-measures the new page height. Lenis is skipped entirely under reduced motion. The small CSS block it needs (`html.lenis ...`) is at the top of `base.css`.

## 2. 3D tilt and spotlight cards

Any element with the `data-tilt` attribute (content cards, the featured video, the RAG guide card, the creator logo, the featured video on /videos) tilts toward the mouse:

- `effects.tsx` listens to `pointermove` once on the whole document (event delegation, so new pages need no setup), finds the closest `[data-tilt]`, and on the next animation frame writes four CSS variables: `--tilt-x`, `--tilt-y` (max 7 degrees) and `--spot-x`, `--spot-y` (cursor position in %).
- `base.css` turns those into `transform: perspective(1100px) rotateX() rotateY()`, plus a `::before` radial gradient that follows the cursor like a spotlight.
- While tilting, the element carries `data-tilting`, which shortens the transition so it tracks the cursor. On leave it eases back over 0.7s.
- Only real mice trigger it (`pointerType === "mouse"`), so touch scrolling is never hijacked.

## 3. Click ripple on buttons

On `pointerdown` over `.button`, `.small-button` or `.chip`, `effects.tsx` stores the press point in `--ripple-x/--ripple-y` and adds `.is-rippling`. The `::after` circle in `base.css` expands from that point (`@keyframes ripple`). Buttons also lift on hover, spring their arrow icon, and press down to `scale(0.97)` on click.

## 4. Scroll-driven animations (pure CSS)

`motion.css` uses CSS `animation-timeline`, so the browser runs these on scroll without any JavaScript scroll listener:

| Effect | Selector | Timeline |
|---|---|---|
| Progress bar along the top edge | `.scroll-progress` | `scroll(root)` |
| Header turns solid after 160px | `.site-header` | `scroll(root)`, range `0 160px` |
| Hero text drifts up and dims as it leaves | `.hero-copy` | `view()`, exit range |
| Section headings and panels rise in | `.reveal` | `view()`, `entry 0% cover 28%` |
| Grid items rise in with a 3D pitch, one after another | `.stagger > *` | `view()`, ranges offset per child |
| Creator logo parallax | `.creator-visual img` | `view()` |

They are wrapped in `@supports (animation-timeline: ...)`. Browsers without support (currently Firefox) just show the content normally. The reveal animations animate `translate`, `rotate` and `scale` (individual transform properties) so they never fight with the hover tilt, which uses `transform`.

## 5. Page transitions

`src/app/template.tsx` wraps every page in React's `<ViewTransition enter="page" exit="page">`. A template re-mounts on each navigation (a layout does not), so the old page plays `page-out` (fade, lift, blur, 220ms) and the new one plays `page-in` (rise and un-blur, 560ms). The header has `view-transition-name: site-header` and is excluded from the animation, so it stays perfectly still as an anchor.

On archive pages, the results grid has its own keyed `<ViewTransition>` (`results` class), so changing a filter or search crossfades just the results. Details are in [12](12-archive-pages.md).

Browsers without the View Transitions API simply swap pages instantly.

## 6. Load-in animations

The hero copy, page headings and article headings fade up from a slight blur in sequence (`@keyframes hero-in`, staggered `animation-delay`). The hero canvas scales in (`stage-in`).

## Reduced motion

`@media (prefers-reduced-motion: reduce)` in `motion.css` cuts every animation and transition to ~0, stops the marquee, removes tilt, and disables view-transition animations. `effects.tsx` skips Lenis and tilt, and the hero canvas draws one still frame.
