# OriginKit: how to use it on the InsideAI site

> Written by Claude, 2026-10-13, after reviewing the collection the owner supplied.
> Applies to Antigravity's frontend build. It adds to `antigravity-frontend-prompt.md`; it doesn't replace it.

## What we actually have

The collection is at `references/originkit/`. Open `references/originkit/index.html` in a browser to browse it with search and filters.

- **739 entries:** 658 components, 58 sections, 23 templates.
- **Preview images and documentation only. There is NO source code** (0 exports). You can't build from these files directly.
- The collection is a **private reference**. Its license forbids redistributing it, so `references/` is listed in `.gitignore`.
  Never commit it, copy it into `site/`, or publish it.

## How to get a component's real code (the only allowed ways)

1. **OriginKit MCP server** (`mcp.originkit.dev`), using an API key from the **owner's** OriginKit account (Settings → API Integration).
   Components only; sections are not served over MCP.
2. **CLI:** `npx originkit login` (the owner signs in through the browser), then `npx originkit add <name>`. Use `--dry-run` first.
3. Copying from originkit.dev while signed in.

**The owner must create the account and sign in. The AI must never create the account, enter passwords, or handle the API key itself.**
Ask the owner to paste the key into the MCP configuration.

### Licensing and budget limits
- Using components in our own site is allowed, with no attribution required.
  **Not** allowed: putting them in templates or starter kits, redistributing them, or rebuilding paid components by imitating their previews.
- **Free tier only** (the brief's budget). The free tier covers part of the catalog and has daily copy limits.
  If a component turns out to be paid, skip it and pick another. Don't recreate it from its preview image.

## Technical fit with our stack

- OriginKit components are **React (.tsx)**. Our site is Astro, so add `@astrojs/react` and use each component as an **island**
  (`client:visible`, so its JavaScript loads only when it scrolls into view). Everything else stays plain Astro + CSS.
- **Sections** require React/Next.js **and Tailwind**, and come only through the CLI. Treat sections as **visual references only**.
  Don't add Tailwind to the project just to install one. If a section is worth it, ask the owner first.
- **Maximum 3 OriginKit components on the whole site.** None on lesson or update pages except a lightweight one, such as a text or button effect.
- Every component must still pass the quality bar in the build spec: mobile Lighthouse, `prefers-reduced-motion`, and no horizontal scroll at 375px.
- Our **scroll-scrubbed hero stays our own** canvas + GSAP component. No OriginKit item does frame-by-frame image sequences.

## The style filter: most of this kit breaks the brief

Most of the catalog is dark WebGL effects: glowing orbs, neon, wireframe globes, a brain made of particles, purple and blue gradients.
That's exactly the banned list in `00-brief.md`. **Use OriginKit for interaction patterns, then restyle every color to the InsideAI palette.**
Never use a component's default dark or neon styling unchanged.

**Avoid entirely:** almost all of the "Background" category (222 entries), and every hero with an orb, globe, brain, wireframe, black hole or neon glow
(for example Hero 12, 19, 22, 25, 28).

## Shortlist (Claude's picks, checked against the preview images)

All of these show as free-with-sign-in in the collection's catalog. Confirm on originkit.dev, because the catalog was captured without an account.

| Use on our site | OriginKit item | Why |
|---|---|---|
| **Hero direction reference** (after the scroll animation, or as its end frame) | **Hero 03** (light) and **Hero 13** (dark) | Photos floating in 3D perspective on a calm background. Closest thing in the kit to "Shorts covers as cards on a desk". Pick whichever matches the owner's light or dark desk choice. |
| Hero reference | **Hero 36** | Tactile 3D cards on a light surface with real-looking light and shadow. That's the brief's "objects you could almost touch". |
| Hero or about-page reference | Hero 06, Hero 15, Hero 37 | Light pages with scattered real images or objects. Calm and human, not "AI-template". |
| **Shorts / latest-lessons showcase** | **Stacked Carousel** or **Swipe Stack** | Shorts covers as a physical stack of cards. Swipe Stack suits phones. |
| Lessons grid alternative | Spotlight Frames, Flip Gallery | Video thumbnails that expand on focus |
| **The one-line promise under the hero** | **Scroll Text Highlight** (or Scroll Text Reveal) | Text that lights up word by word as you scroll, continuing the scroll story without heavy graphics |
| Small accent (optional) | Mechanical Flip (text), Shine Card | Use only if it still looks tactile after restyling. Skip it if it looks flashy. |

Preview images for each item are in `references/originkit/assets/components/` and `references/originkit/assets/templates/`.
The `catalog/catalog.csv` file maps names to their originkit.dev page.

## What to record in the build log

For every OriginKit item used: its name, its URL, how it was obtained (MCP, CLI or copy), confirmation that it's on the free tier,
what you restyled, and its weight (JavaScript size).
