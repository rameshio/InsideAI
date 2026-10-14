# 03. Hero: the space liquid-sculpture

**Files:**
- `src/components/space-hero.tsx`: the section. Composes the sky layers and the sculpture with Inside AI copy and settings.
- `src/components/ui/liquid-sculpture-hero.tsx`: the liquid particle hero from 21st.dev (by guglielmogiannattasio.it), copied in.
- `src/components/motion/starfield.tsx`: the star canvas.
- `src/styles/space-hero.css`: the near-black sky and restyling of the sculpture hero to the site.
- `public/brand/insideai-logo-cutout.webp`: the logo with a transparent background, which the particles are sampled from.
- `public/brand/hero-sky.webp` (+ `hero-sky-1100.webp` for phones): the sky photo. Both images come from `design/source/` via `scripts/build-brand-assets.mjs` (see [16](16-seo-feeds-icons.md)).

## What it shows

A full-screen deep-space scene on near-pure black. Its sky continues up behind the glass header and fades into the page at the bottom.

1. **The logo as a sculpture made of about 100,000 particles.** On load the particles fly together into the IA mark. Moving the cursor through it turns that area into liquid star dust that swirls, streaks and catches the light. It settles back into the crisp logo when you stop. On touch screens a tap or drag does the same.
2. **Sky photo.** A dense star field with a blue nebula on the right, slowly zooming and drifting (60-second cycle). A soft dark band along the bottom keeps the copy readable over the nebula.
3. **Animated starfield** on top of the photo, kept sparse because the photo already holds the dense stars. Up to 600 stars in natural colours (white, warm amber, pale gold, blue-white) on three depth layers twinkle, drift slowly sideways and shift with the pointer and with scrolling (nearer stars move more). A handful of bright stars carry a soft glow halo, and a rare shooting star crosses.
4. **Copy.** A small label, "AI moves fast. Stay **Inside.**", one line of text, and the "Get AI Updates" / "Start exploring" buttons. A faint giant "InsideAI" sits behind the logo, and a "Move through the stars" cue appears until the first interaction.

## How the sculpture works (`liquid-sculpture-hero.tsx`)

- **Particles from pixels.** The image is drawn to a hidden canvas on a grid (1000 wide, 640 on low-power devices). Every grid cell that has visible material becomes one particle with its home position and colour. Our cut-out has real transparency, so particles are chosen by alpha.
- **The GPU does the physics (WebGL2).** Particle positions and velocities live in floating-point textures. Each frame a shader pushes particles away from and around the cursor, adds swirling curl-noise turbulence and a "wake" from cursor motion, and pulls them elastically home.
- **Image and particles cross-fade.** At rest the crisp image is drawn. Where the material is disturbed the image fades out and the particles fade in by exactly the same amount, so there is no seam.
- **It goes to sleep.** When nothing has moved for about 270 frames it stops simulating. It also pauses off screen and in hidden tabs, and frees the GPU context on unmount.
- **Fallbacks.** Without WebGL2 the static image is shown. Under reduced motion the intro and ambient drift are off and the effect is softer.

### Local changes to the 21st.dev code

1. Restored two `\n` escapes that were lost when the code was pasted (`"Form that\nanswers back."` and `split("\n")`). As pasted, the file would not compile.
2. Internal CTA links (`/newsletter`, `/guides`) render through `next/link`, so they keep the site's page transitions instead of reloading the page.
3. Two patterns that React 19's lint rules reject were replaced with the recommended ones: syncing the `theme` prop now adjusts state during render, and the "latest props" refs are updated in `useLayoutEffect` instead of during render.

## How the space layer works

- `space-hero.tsx` stacks a `.space-sky` layer (a near-black gradient, the `.space-photo` image with `srcset`, the `Starfield` canvas and a bottom scrim) behind the sculpture hero. The photo is the page's largest image, so it loads with `fetchpriority="high"`; under reduced motion its drift is off. Earlier versions also had blue nebula blurs and a planet horizon; they were removed to match the reference clip. The hero's background is made transparent, so the stars show through the WebGL canvas.
- `starfield.tsx`: seeded star positions (stable across resizes), up to 600 stars by screen area plus 4 to 10 haloed bright stars (the halo is one pre-rendered glow sprite drawn scaled), drawn with Canvas 2D. A smoothed pointer gives parallax, the scroll position shifts layers, and shooting stars appear at random 6 to 14 second intervals. It pauses off screen, caps the pixel ratio at 2, and draws one still frame under reduced motion.
- The hero copy fades up on load and drifts up and dims as you scroll away (scroll-driven CSS, see [01](01-motion-and-effects.md)).
- The primary button uses the site's gradient pill style and click ripple.

## Settings you can tune (props in `space-hero.tsx`)

| Prop | Effect |
|---|---|
| `strength`, `radius` | how hard and how wide the cursor disturbs the logo |
| `liquid`, `turbulence`, `particleSpread` | how fluid and swirly the disturbed material is |
| `dotSize`, `particleDensity` | particle size and count |
| `intro` | fly-together animation on load |
| `ambient`, `ambientIntensity` | gentle constant flow at rest |
| `sculptureScale`, `sculptureX`, `sculptureY` | logo size and position |
| `backdropText` | the giant faint word ("" to hide) |
| `src` (+ `darkSrc`, `mobileSrc`, `mobileDarkSrc`) | the sculpture image. Any transparent PNG/WebP works, for example a planet or astronaut render. Images from another domain must allow CORS. |

In `starfield.tsx`: `STAR_DENSITY`, `MAX_STARS`, `PALETTE` (colours and how often each appears), `BRIGHT_AREA` / `BRIGHT_MIN` / `BRIGHT_MAX` (haloed stars), `POINTER_PARALLAX`, `SCROLL_PARALLAX`, `DRIFT`, `SHOOT_MIN_MS` / `SHOOT_MAX_MS`.

## The `components/ui` folder and shadcn

`src/components/ui/` is the folder shadcn/ui and 21st.dev components expect (`@/components/ui/...`). The CLIs install into it, and copied snippets import from that path. Keeping third-party UI building blocks there separates them from the site's own components and makes later `npx shadcn add ...` installs land in the right place.

The project has TypeScript and Tailwind v4 but is **not** initialised for shadcn (no `components.json`). This component does not need shadcn. If you add shadcn components later:

```bash
npx shadcn@latest init
```

Run it on a branch and review the diff before merging. Init adds its own CSS variables to `src/app/globals.css`, including `--accent`, which this site already uses for its brand blue. Rename one of them so the colours don't clash.

## Previous hero

The earlier canvas "constellation" hero is still in `src/components/motion/constellation.tsx` (with `src/lib/logo-mesh.ts`), no longer used on the page. To switch back, replace `<SpaceHero />` in `src/app/page.tsx` with the old hero markup from git history.
