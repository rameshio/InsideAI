# Inside AI: code guide by section

One file per section of the site. Each explains what the section shows, which files render it, how the code works, and what to edit when you want to change it.

| # | Section | File |
|---|---|---|
| 00 | Design system (colors, type, radius, CSS file map) | [00-design-system.md](00-design-system.md) |
| 01 | Motion and effects (smooth scroll, 3D tilt, ripples, scroll reveals, page transitions) | [01-motion-and-effects.md](01-motion-and-effects.md) |
| 02 | Header and navigation | [02-header-and-navigation.md](02-header-and-navigation.md) |
| 03 | Hero: the space liquid-sculpture (logo made of particles, starfield) | [03-hero-3d-constellation.md](03-hero-3d-constellation.md) |
| 04 | Topic marquee | [04-topic-marquee.md](04-topic-marquee.md) |
| 05 | Briefing (latest updates) | [05-briefing-updates.md](05-briefing-updates.md) |
| 06 | Watch (videos and shorts) | [06-watch-videos.md](06-watch-videos.md) |
| 07 | Guides | [07-guides.md](07-guides.md) |
| 08 | Free resources | [08-resources.md](08-resources.md) |
| 09 | Creator (about Ramesh) | [09-creator.md](09-creator.md) |
| 10 | Newsletter (form, API route, Brevo adapter) | [10-newsletter.md](10-newsletter.md) |
| 11 | Footer | [11-footer.md](11-footer.md) |
| 12 | Collection archive pages (/updates, /videos, /guides, /resources) | [12-archive-pages.md](12-archive-pages.md) |
| 13 | Article / video detail pages | [13-article-detail.md](13-article-detail.md) |
| 14 | Support pages (about, contact, privacy, newsletter, 404) | [14-support-pages.md](14-support-pages.md) |
| 15 | Content system (MDX files, schema, validation, scripts) | [15-content-system.md](15-content-system.md) |
| 16 | SEO, feeds, icons and social image | [16-seo-feeds-icons.md](16-seo-feeds-icons.md) |
| 17 | Errors found and fixed in the review | [17-fixes-log.md](17-fixes-log.md) |

## Stack at a glance

- **Next.js 16.4 App Router** with React 19.3 Server Components. Pages are rendered on the server; only small "leaf" components that need the browser are client components (`"use client"`).
- **Content** lives in `content/**/*.mdx` and is validated with Zod at build time (`src/lib/content.ts`).
- **Styling** is plain CSS with design tokens, split into `src/styles/*.css` and pulled in by `src/app/globals.css` (Tailwind v4 is loaded for its CSS reset).
- **Motion** uses native browser features first: CSS scroll-driven animations, the View Transitions API through React's `<ViewTransition>`, plus [Lenis](https://github.com/darkroomengineering/lenis) for smooth wheel scrolling and a hand-written canvas renderer for the 3D logo.

## Folder map

```
src/
  app/                    routes (one folder per URL)
    layout.tsx            html shell: fonts, header, footer, effects
    template.tsx          page-transition wrapper (re-mounts per navigation)
    page.tsx              homepage (sections 03-10)
    [collection]/         archive pages + [slug] detail pages
    api/newsletter/       POST endpoint for the signup form
    about, contact, newsletter, privacy, not-found
    sitemap.ts, robots.ts, rss.xml/, opengraph-image.tsx, icon.png, apple-icon.png
  components/
    ui/liquid-sculpture-hero.tsx  21st.dev WebGL particle hero (shadcn-style ui folder)
    space-hero.tsx             homepage hero: space scene + sculpture
    motion/starfield.tsx       star canvas behind the hero
    motion/constellation.tsx   previous canvas hero (unused, kept for reference)
    motion/effects.tsx         smooth scroll, tilt, ripple (site-wide)
    site-shell.tsx             Header, Footer, Wordmark
    nav-links.tsx, mobile-menu.tsx
    content-card.tsx           ContentCard + Art (network illustrations)
    actions.tsx                CopyButton, TrackedLink, VideoPlayer
    newsletter.tsx, newsletter-form.tsx
  lib/
    content.ts      read + validate MDX content
    logo-mesh.ts    geometry of the IA logo network
    newsletter.ts   Brevo double opt-in + rate limiter
    seo.ts          page metadata helper, safe JSON-LD
    text.ts         React children to plain text
  styles/           tokens, base, home, pages, responsive, motion
public/brand/       the logo (original webp + generated PNGs)
```

## Run it

```bash
npm run dev
```

Quality checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and with the dev server running `npx tsx scripts/smoke.ts`.
