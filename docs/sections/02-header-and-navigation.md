# 02. Header and navigation

**Files:** `src/components/site-shell.tsx` (`Header`, `Wordmark`), `src/components/nav-links.tsx`, `src/components/mobile-menu.tsx`, styles in `src/styles/base.css` and `src/styles/responsive.css`

## What it shows

A sticky glass bar with the bare IA constellation mark and "Inside**AI**" wordmark on the left, the five section links in the middle, and the "Get AI Updates" button on the right. Under 860px the links and button are replaced by a "Menu" pill.

## How it works

- **`Wordmark`** renders `public/brand/insideai-mark-wide.png` (your logo, tightly cropped, transparent, no tile) next to the text, brightened slightly so the thin lines read at 46px. On hover it grows a little and glows. It is reused in the footer at a larger size.
- **`Header`** is a Server Component. It is `position: sticky` with a backdrop blur. A scroll-driven animation in `motion.css` makes it more opaque and adds a bottom border after the first 160px of scrolling. It carries `view-transition-name: site-header`, so it stays still while pages transition underneath it.
- **`NavLinks`** (client component) reads the current path with `usePathname()` and marks the active section with `aria-current="page"`. Screen readers announce it, and CSS styles it as a highlighted pill. `/guides/rag-explained` counts as being inside "Guides".
- **`MobileMenu`** is built on a native `<details>` element, so it opens even before JavaScript loads. Once hydrated it also closes:
  - after any navigation, including browser back/forward (watches `usePathname()`),
  - on `Escape` (focus returns to the Menu button),
  - on a click outside the menu.

  The three-line icon morphs into an X when open, and the panel springs in (`@keyframes menu-in`).
- A **skip link** ("Skip to content", in `layout.tsx`) appears on first Tab press for keyboard users.

## Editing

- Change the menu items in `NAV_ITEMS` in `nav-links.tsx`. The mobile menu adds "Newsletter" to the same list.
- Change the mobile breakpoint in `responsive.css` (`@media (max-width: 860px)`).
