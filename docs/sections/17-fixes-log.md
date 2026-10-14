# 17. Errors found and fixed

The Codex build passed typecheck, lint, its 11 unit tests and the smoke test, and logged no console errors. These problems only showed up when the site was actually used or read closely.

## Bugs

| # | Problem | Where | Fix |
|---|---|---|---|
| 1 | **"Load more" and category filters jumped to the top of the page** on every click, losing your place. | `src/app/[collection]/page.tsx` | `scroll={false}` on the filter chips, "Load more" and the search form. |
| 2 | **Search did a full page reload** (plain HTML `<form>`). | same | Switched to `next/form`, which does a client-side navigation and still works without JavaScript. |
| 3 | **`<Prompt>` copy button could copy "[object Object]".** It used `String(children)`, and MDX wraps multi-line prompts in `<p>` elements. | `src/app/[collection]/[slug]/page.tsx` | New `textContent()` helper (`src/lib/text.ts`) walks the elements and joins their text. Covered by a unit test. |
| 4 | **Every inline link in articles got an arrow icon and `display: inline-flex`**, which broke line wrapping inside sentences. | `TrackedLink` in `actions.tsx`, `.prose a` CSS | Arrow only on external and download links. Inline links are normal underlined text. |
| 5 | **Mobile menu stayed open** after browser back/forward, and could not be closed with Escape or an outside click. | `mobile-menu.tsx` | Closes on any route change, on Escape (focus returns to the button), and on an outside click. |
| 6 | **No "you are here" state in the navigation.** | header | `NavLinks` sets `aria-current="page"`, styled as a highlighted pill. |
| 7 | **Newsletter inputs could get duplicate HTML ids** (`email-true` / `email-false`) if two forms of the same size appeared on one page. | `newsletter-form.tsx` | `useId()` gives each form a unique id. Added `autoComplete="email"`. |
| 8 | **"Copied" never reset** on copy buttons. | `CopyButton` | Resets after about 2 seconds. The label is announced to screen readers. |
| 9 | **Much text was 8-10px** (labels, metadata, footer), below comfortable reading size, and some grey text had low contrast. | `globals.css` | New type scale with a 12px minimum. All text colors were checked against the background (WCAG AA). |
| 10 | Footer YouTube link had no `target`/`rel`, and two other external links used `rel="noreferrer"` only. | `site-shell.tsx`, about, contact | Consistent `target="_blank" rel="noopener noreferrer"`. |
| 11 | Buttons inside forms had no explicit `type`. | search form, newsletter, copy, video | Explicit `type="submit"` / `type="button"`. |

## Found in the post-redesign code review (all fixed)

| Problem | Fix |
|---|---|
| Search box kept old text after "Clear search & filters" or back/forward | `key={q}` on the search input |
| Global `:focus-visible { border-radius }` squared off pill buttons and cards on keyboard focus | removed; outlines follow each element's own radius |
| A delayed tilt frame could re-tilt a card the pointer had already left | the frame bails out if the pointer moved on |
| Smooth-scroll inertia could continue after clicking a link | Lenis `stopInertiaOnNavigate: true` |
| Newsletter button's fixed `aria-label` hid the "Sending…" state from screen readers | label removed (visible text is the name) |
| `aria-label` on a plain div (marquee) | `role="region"` |
| Home page title read "Inside AI: … \| Inside AI" | absolute title on the home page |
| Footer logo was preloaded like an above-the-fold image | `preload` only for the header logo |
| `compact` newsletter variant had no styles | added `.newsletter.compact` |
| Hero logo flashed at full size in the top-left on refresh (before the script placed it) | fallback image, backdrop word and hint stay hidden until the first layout pass sets `data-laid` |

## Redesign changes (summary)

- Brand moved from violet to the logo's electric blue. The logo is used in the header, footer, About page, creator section, favicon, Apple icon and the social share image.
- The hero is now a live 3D rendering of the logo network ([03](03-hero-3d-constellation.md)).
- Smooth scrolling, 3D tilt cards, click ripples, scroll-driven reveals, page transitions ([01](01-motion-and-effects.md)).
- The 1,860-line single stylesheet was split into six focused files with design tokens ([00](00-design-system.md)).
- Fonts changed from Arial/Georgia to self-hosted Geist and Geist Mono.

## Verification

- `npm run typecheck`, `npm run lint`: clean
- `npm test`: 14/14 pass (3 new tests: `textContent`, logo mesh, seeded random)
- `npm run build`: passes, all 29 routes generated
- `npx tsx scripts/smoke.ts`: 31 page/file checks, one H1 per page, search, drafts, feeds and API errors all pass
- Checked in the browser at desktop, 800px and 375px widths: no horizontal overflow, no console errors, menu, filters and navigation work.
