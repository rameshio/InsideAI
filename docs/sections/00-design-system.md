# 00. Design system

**Files:** `src/styles/tokens.css`, `src/styles/base.css`, `src/app/globals.css`, `src/app/layout.tsx` (fonts)

## Direction

The visual language comes straight from the logo: a glowing, electric-blue network of connected points on deep navy. The whole site uses that one accent color on a near-black, deep-space background, so the logo and the interface read as one brand. The site is intentionally dark-only (`color-scheme: dark`), because the logo is a light-emitting mark.

## Tokens (`src/styles/tokens.css`)

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#010104` | page background |
| `--bg-raised`, `--surface`, `--surface-2` | navy steps | cards, panels, inputs |
| `--line`, `--line-strong` | translucent blue | hairlines and borders |
| `--ink`, `--ink-2`, `--ink-3` | near-white to muted blue-grey | headings, body, secondary text (all pass WCAG AA on `--bg`) |
| `--accent` | `#3db8ff` | the single brand accent (from the logo) |
| `--accent-2`, `--accent-deep` | lighter / deeper blue | gradients and highlights |
| `--accent-ink` | `#021122` | text on accent buttons |
| `--glow`, `--glow-soft` | translucent accent | glows and focus halos |
| `--radius-card` 18px, `--radius-sm` 12px, `--radius-pill` | | the only three corner radii |
| `--ease-out`, `--ease-in`, `--ease-spring` | cubic-beziers | all motion timing |
| `--text-xs` (12px) | | smallest text anywhere on the site |
| `--z-*` | | the z-index scale (backdrop, header, menu, progress bar, skip link) |

**Radius rule:** cards and panels use 18px, inputs and small tiles 12px, every button and chip is a full pill.

## Typography

`src/app/layout.tsx` loads two families through `next/font/google` (self-hosted at build time, no runtime Google request): **Syne** as `--font-display` for headings (`h1`–`h3`), the hero headline, the "InsideAI" wordmark and small uppercase labels (`.eyebrow`, `.tag`, card meta, guide/story numbers); and **Manrope** as `--font-sans` for all body text. `--font-mono` in `tokens.css` is a system monospace stack used only for code (`.prose code`, prompt blocks), so no third web font is loaded.

## CSS file map

`src/app/globals.css` only imports the files below, in this order:

| File | Contains |
|---|---|
| `tokens.css` | variables above |
| `base.css` | element resets, layout `.wrap`, backdrop, header, buttons, ripple, 3D tilt, content cards, card art, section headings, newsletter box, footer |
| `home.css` | homepage-only sections: marquee, briefing bento, watch, guides, resources, creator |
| `space-hero.css` | the space hero: near-black sky, sculpture restyle |
| `pages.css` | archive, article detail, support pages, 404 |
| `responsive.css` | the 1000px / 860px / 760px breakpoints. Every multi-column layout collapses to one column at 760px |
| `motion.css` | scroll-driven animations, view transitions, reduced-motion overrides (see [01](01-motion-and-effects.md)) |

## Shared building blocks

- `.button` (primary gradient pill), `.button-ghost` (outlined pill), `.small-button`, `.chip` (filter pill), `.text-link` (arrow link).
- `.eyebrow` small mono label. Used sparingly: the hero, the resources section and the newsletter box only.
- `.tag` small mono label inside cards.
- `.accent-word` puts a word in the accent color with a soft glow ("Stay **inside.**").
- `.backdrop` is a fixed layer behind the page: a cool glow at the top plus a faint dot grid that fades out.

## How to change things

- Change the brand color: edit `--accent`, `--accent-2`, `--accent-deep`, `--glow` in `tokens.css`. The canvas hero has its own `ACCENT` constant in `src/components/motion/constellation.tsx`; keep them in sync.
- Change fonts: swap the two imports in `layout.tsx` (`--font-display` and `--font-sans`).
