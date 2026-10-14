# 16. SEO, feeds, icons and the social image

**Files:** `src/lib/seo.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/rss.xml/route.ts`, `src/app/opengraph-image.tsx`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/brand/`

| Piece | What it does |
|---|---|
| `layout.tsx` `metadata` | Site-wide defaults: title template "%s \| Inside AI", description, Open Graph and Twitter card type. `viewport` sets the browser theme color and dark color scheme. |
| `seo.ts` `metadata()` | Per-page title, description, canonical URL and Open Graph image. `safeJson()` escapes JSON-LD. |
| `sitemap.ts` | `/sitemap.xml`: static pages plus every published entry with its last-modified date. |
| `robots.ts` | `/robots.txt`: allow all except `/api/`, links the sitemap. |
| `rss.xml/route.ts` | `/rss.xml`: an RSS 2.0 feed of updates with XML escaping. Drafts are excluded. |
| `opengraph-image.tsx` | Generates the 1200x630 share image at build time: headline, tagline and your logo on a navy glow. |
| `icon.png` / `apple-icon.png` | Favicon (64px) and home-screen icon (180px), cropped from your logo. Next.js wires them into `<head>` automatically. |

## Brand files (`public/brand/`)

| File | Use |
|---|---|
| `insideai-logo.webp` | the full mark on pure black (1254px) |
| `insideai-logo-512.png` | square crop: creator section, About page, social image |
| `insideai-mark-wide.png` | the bare mark, tight crop, transparent (147x120): header and footer wordmark |
| `insideai-mark-96.png` | tight square crop on black (spare small icon) |
| `insideai-logo-cutout.webp` | the network only, transparent background: the particle sculpture in the hero |
| `hero-sky.webp`, `hero-sky-1100.webp` | the homepage hero sky (stars with a blue nebula), full and phone sizes |

`src/app/icon.png` (64px) and `src/app/apple-icon.png` (180px) are the browser-tab and home-screen icons.

All of them are built from two source files in `design/source/` (the logo and the sky, both made by the owner with Gemini) by one script:

```bash
node scripts/build-brand-assets.mjs
```

The script crops the mark to its glow (ignoring the faint JPEG noise and a bright 1px frame in the source), keys the black background into real transparency, and re-places the mark on clean pure black for the opaque sizes. To change the logo or sky, replace the file in `design/source/` and run it again.

`next.config.ts` includes `public/brand/*` in output file tracing so the social image can read the logo on the server.

Set `NEXT_PUBLIC_SITE_URL` to the real domain before deploying. Canonical URLs, the sitemap, RSS and social previews all use it.
