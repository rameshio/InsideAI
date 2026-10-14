# Build task: InsideAI frontend (assigned to Antigravity)

> Written by Claude at the owner's request, 2026-10-13. The owner assigned the full frontend build to Antigravity.
> Codex and Claude do **not** edit frontend files unless the owner asks; they review.

You are building the **frontend** of the InsideAI website. You have Google Stitch (MCP) for design exploration and your browser for testing.

## 0. Read first (in this order)

1. `docs/README.md`: the shared rules
2. `docs/00-brief.md`: the owner's goals. **Section 4 "Look", including the scroll-animation clarification, is binding.**
3. `docs/01-research/claude-notes.md` (Parts 3–4), `codex-notes.md`, and your own `antigravity-notes.md`

4. **`docs/04-build/originkit-guide.md`** (added 2026-10-13): the owner's OriginKit design collection. It covers what you may use, how to get the real code, the style filter, and a shortlist. **Use it in Phase A (Stitch) and Phase B.**

Where the notes disagree, this file wins. Where this file and the brief disagree, the brief wins. Ask the owner if still unsure.

## 1. Hard rules

- **Banned visuals** (from the brief): purple/blue glowing gradients, neon/cyan glow, glassmorphism, robot heads, glowing brains, stock neural-network art, generic AI-template layouts, pulsing "live" dots.
- **Wanted:** crafted, tactile, human-designed. Depth, real-looking light, soft contact shadows, objects you could almost touch. Navy and blue from the logo used as **solid material colors**, not glow.
- **Stitch output is a starting point, not the design.** Stitch tends to produce generic AI-site layouts. Throw away anything that breaks the banned list, and restyle what's left by hand.
- **Primary action on every page:** "Subscribe on YouTube" → `https://www.youtube.com/@insideaitoolbox?sub_confirmation=1`. Instagram (`https://www.instagram.com/insideai.vision/`) is second.
- **No newsletter, no email forms, no subscriber counts, no invented stats, no comparison verdicts the owner didn't make.**
- **Mobile first.** Most visitors arrive from an Instagram bio link and see the site in Instagram's in-app browser at about 375px wide.
- Don't edit anything in `docs/` except your own notes file and `docs/04-build/antigravity-build-log.md`.

## 2. Phase A: Design in Stitch, then STOP

Produce in Stitch, for **mobile (375px) and desktop (1440px)**:

- **Home** and **Lesson page**, each in **two directions** so the owner can choose:
  - **A: Light desk.** Warm off-white surface, navy type, navy matte objects, one warm accent (e.g. amber).
  - **B: Dark desk.** Deep navy surface, Shorts covers as warm cream cards on it, no glow or glass.

Save screenshots or exports to `site-design/` (create it). Write a short comparison in `docs/04-build/antigravity-build-log.md`.
**Then stop and wait for the owner to pick A or B.** Don't start Phase B without that choice.

## 3. Phase B: Build (after the owner picks a direction)

### Stack
- **Astro** (static output) + plain CSS (custom properties for colors and spacing) + **GSAP ScrollTrigger** for the hero only. No React unless something truly needs it.
- Project lives in **`R:\InsideAI\site\`**. Keep `docs/` untouched.
- If `R:\InsideAI` isn't a git repository, run `git init` there first, and commit after each finished step with clear messages. Three AIs share this folder, so history matters.
- No deployment, domain, CMS, analytics or YouTube API in this task.

### Pages
| Route | Content |
|---|---|
| `/` | Scroll-animation hero → one-line promise ("AI made simple. Quick tips, useful tools & easy tutorials.") + Subscribe button → featured comparison lesson → "New to AI? Start here" (3 lessons in order) → latest update → latest lessons grid |
| `/learn` | All lessons, filter by topic: **Basics · Tutorials · Comparisons** (one list, not separate sections) |
| `/learn/[slug]` | Lesson page: lite YouTube embed (thumbnail first, iframe loads on tap), title, date, 3-bullet takeaway, optional copyable prompt box, "tools mentioned" links, related lessons, Subscribe + Instagram buttons |
| `/updates` | Reverse-chronological short posts: headline, 2–3 lines, source link, date |
| `/updates/[slug]` | Single update (shareable link) |
| `/about` | What InsideAI is, who it's for, channel links |
| `404` | Friendly, on-brand |

Navigation: **Learn · Updates · About**, plus the YouTube button. Logo links home.

### Content model: keep it exactly like this
Codex will later connect a CMS and a YouTube importer to these files, so the shape matters.

`site/src/content/lessons/<slug>.md`
```yaml
title: string
youtubeId: string
instagramUrl: string        # optional
topic: basics | tutorials | comparisons
publishedAt: YYYY-MM-DD
takeaways: [string, string, string]
prompt: string              # optional, shown in the copy box
tools: [{ name: string, url: string }]   # optional
related: [slug, ...]        # optional
featured: boolean           # optional
```
The body is a short written explanation (80–150 words).

`site/src/content/updates/<slug>.md`
```yaml
title: string
date: YYYY-MM-DD
topic: news | tip
sourceUrl: string           # required when topic is news
relatedLesson: slug         # optional
```
The body is 2–3 lines.

Define both as Astro content collections with schema validation.

**Seed content:** create lesson files for the channel's **8 existing Shorts** (get the titles and video IDs from https://www.youtube.com/@insideaitoolbox/shorts). Write takeaways from the video titles and descriptions only, and mark anything you're unsure of with `TODO(owner)`. Add **3 sample updates** clearly marked as sample text.

### Scroll-animation hero
- **Technique:** pre-rendered image frames drawn to a `<canvas>`, frame chosen by scroll progress (GSAP ScrollTrigger). **Don't** scrub a `<video>` element.
- **Concept (from the brief and Claude's Part 4):** a matte navy "IA" object on a desk in soft studio light. On scroll the camera pushes in, the object opens, and the Shorts covers fan out as physical cards onto the desk, where the page content begins.
- **The real animation doesn't exist yet.** Build the component with **placeholder frames** so the real ones can be swapped in by replacing a folder:
  - `site/public/hero/desktop/0001.webp …` (about 120 frames)
  - `site/public/hero/mobile/0001.webp …` (about 60 frames, smaller)
  - Frame count read from a config value, not hard-coded in several places.
- Scroll length about **1.5–2 screen heights**. The headline is real HTML text over the canvas. The first frame shows immediately; the rest load progressively.
- `prefers-reduced-motion`: show the final frame as a still image, with no scrubbing.
- Mobile hero budget: **≤ 4 MB** of frames.

### Quality bar
- Lighthouse mobile: Performance ≥ 90 on every page except the home hero (≥ 75 there), Accessibility ≥ 95.
- Colour contrast meets WCAG AA. Keyboard navigable. Visible focus states.
- No horizontal scroll at 375px.
- Lesson grids use thumbnails only, never multiple live YouTube iframes.

## 4. Phase C: Self-check and hand back

1. Run the site locally and test it in your browser at 375px and 1440px: every page, the filters, the copy-prompt button, the lite embed and the hero scroll (forward and back).
2. Record in `docs/04-build/antigravity-build-log.md`:
   - what you built, and how to run it (`npm install`, `npm run dev`)
   - screenshots (save them in `site-design/`)
   - Lighthouse scores
   - every `TODO(owner)` and every placeholder that still needs real content
   - anything you deliberately did differently from this file, and why
3. Then stop. Codex and Claude will review before anything else happens.

## Out of scope for this task

CMS and editor, YouTube import automation, deployment, the domain, analytics, the newsletter, the real 3D animation, and logo redesign. Use the existing logo as provided. If you need a cleaner version for the header, make a **placeholder** solid wordmark and flag it in the build log.
