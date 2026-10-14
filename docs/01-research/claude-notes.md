# Research: Claude

> Author: Claude. Other AIs: read only; respond in your own file.

## Part 1: Channel analysis (done 2026-10-13)

1. **The channel teaches more than it reports news.** A plain daily feed would bury the evergreen videos.
   Proposal: a **Learn** library where each Short gets its own page with the video, a short written explanation,
   key terms, and related topics. Google can't index a 60-second Short, but it can index that page, so search becomes a third traffic source.
2. **Comparisons are the strongest format** (1.1K views vs under 100 for everything else).
   Proposal: a dedicated **Compare** section ("X vs Y", "best AI for ___").
3. **The banner's three topics map directly to the navigation:** Basics → Learn, Tutorials → Tools, Updates → Daily feed.
4. **The website should become the hub.** Instagram currently links to YouTube; both bios should eventually link to the site.
5. **Brand conflict to resolve:** a dark, techy banner vs light, editorial Shorts covers.

### Draft sitemap (for discussion)

- **Home:** today's update, latest Shorts, a "start here" path for beginners
- **Updates:** short daily posts
- **Learn:** explainers grouped by topic
- **Compare:** AI tool comparisons
- **About + Subscribe**

## Part 2: Reference websites

**Not done as a separate pass.** Codex and Antigravity already covered nine distinct sites between them
(FutureTools, The Rundown AI, Ali Abdaal, Colin & Samir, Learn Prompting, Hugging Face Learn, Fireship, 3Blue1Brown, Raycast, Every).
Adding more would have added little, so I spent the time checking the claims the plan depends on (see Part 3).

## Part 3: Cross-review of codex-notes.md and antigravity-notes.md

> Written 2026-10-13 after reading both files in full.

### What they got right that I missed

**Codex**
- **It corrected me on Google.** I wrote "Google can't index a 60-second Short." That's too strong: Google can index embedded videos. The real point stands (the written page adds text Google can rank), but the traffic is a maybe, not a promise. I withdraw the categorical version.
- **One viral comparison is one data point.** 1.1K vs about 80 views is a signal, not proof. A standalone Compare section on top of 8 videos would sit nearly empty. I now agree: **Comparisons should be a filter inside Learn plus a homepage feature**, not a separate section.
- **Fresh and evergreen content need separate homes:** Updates for fresh, Learn for evergreen. That's cleaner than my five-item sitemap.
- **The publishing workflow is concrete and honest:** a narrow form, sources required for news, a YouTube importer that only creates *drafts*, matching on video ID, no "isShort" flag in the API, and a manual fallback. It also gives a usable acceptance test: *the owner can publish from their usual device in under 5 minutes without a terminal.* That should be the gate for the whole build.
- **Domain:** `insideaitoolbox.com` matches the YouTube handle and is a .com, so it's likely to fit the $10–15/year budget. Good first pick.

**Antigravity**
- **The "cards on a desk" idea.** Light Shorts covers on cream cards, sitting on a darker surface, turns the brand conflict into a physical metaphor: index cards on a desk. It's the only proposal that gives the 3D a *reason* to exist instead of being decoration.
- **Fireship-style companion pages with a copyable prompt box.** That suits the prompt-trick videos and is something a Short can't do.
- **Instagram's in-app browser is the real first screen.** Most first visits will come from a bio link on a phone, so design mobile first.
- **Lite YouTube embeds:** thumbnail first, player loads on tap. Necessary for speed on mobile.
- **Instagram's API is fragile:** don't automate Reels, link them by hand. Agreed.
- **3Blue1Brown-style learning tracks** keep the explainers from getting buried.

### Where I disagree, and why

**With Antigravity**
1. **The newsletter as the main action is wrong for this brief.** The goal for the first 6 months is YouTube and Instagram subscribers. A hero email form plus a sticky "Get Daily Drops" bar competes with the actual goal and adds a second daily obligation, writing the email.
2. **"Join 1,200+ subscribers learning AI daily" next to an email form is misleading.** Those are YouTube subscribers, not newsletter readers. Don't ship numbers that imply something untrue.
3. **The sample comparison table contains made-up verdicts and outdated model names** ("Best for Writing: Claude 3.5 Sonnet"). Any comparison on the site must come from the owner's own video and be dated. Otherwise it goes stale and puts words in the owner's mouth.
4. **The palette drifts back into the banned look.** A dark obsidian canvas, glass borders, electric-cyan "live" dots and a pulsing status badge are the standard AI-site kit the owner ruled out. Keep the desk metaphor and drop the glow and glass.
5. **Too much structure for 8 videos:** four nav sections, a filterable Toolbox, three header buttons, three mobile carousels and a sticky bar. Horizontal carousels also hide content; most people never swipe past the second card.
6. **Domain suggestions:** `.tools` and `.vision` usually renew well above $10–15/year. Check renewal prices; Codex's .com is the safer choice.
7. **Unsourced specifics:** "80% of your audience is on mobile", exact hex codes and fonts for other sites. The direction is plausible, but treat these as estimates, not facts.
8. **Raycast as the 3D gold standard is only partly confirmed.** When I opened raycast.com today, the first screen was a dark product mockup; I didn't see the keycap renders described. Raycast is still a fair example of crafted, non-cliché tech 3D, but we should save actual reference images before using it as the visual target. Raycast itself also leans dark and glowy, so borrow the *object craft*, not the page style.
9. **A diagram or infographic for every video** is a real extra production task. Make it optional, used only when the video had a diagram worth pausing on.

**With Codex**
1. **The logo can't stay off-limits.** The brief bans "stock neural network art" and "glowing" effects, and the current logo is a glowing neural-network "IA". That isn't a full redesign, but the site needs a **solid, non-glowing variant** of the same mark and colors, or the logo in the header contradicts the whole visual direction. Flag this to the owner now, not after the build.
2. **The stack has many moving parts for a 2–3-line post:** GitHub, Sanity, Cloudflare Pages, deploy webhooks, and later the YouTube API and GitHub Actions. I'm not against Sanity, but the choice should be settled by the 5-minute phone test, comparing Sanity with a Git-backed editor like Keystatic or Decap, rather than decided upfront.
3. **Too cautious on bio links.** With 3 Instagram followers, pointing the Instagram bio at the site costs almost nothing, and the link can be changed back in seconds. Keep YouTube pointing at YouTube.
4. **Length.** The analysis is solid, but the owner needs decisions. The merged plan should be one page.

### Something none of us said clearly enough

**The website won't be the main growth engine in the first 6 months. The videos will.** YouTube no longer makes links in Shorts descriptions and comments clickable, so Shorts send very little traffic directly to a website. The site's realistic jobs are:
(a) a better link-in-bio page than a bare channel link,
(b) a permanent, searchable home for each explainer, which may bring slow Google traffic, and
(c) turning every visitor into a subscriber.

That argues for a **small site launched quickly**, not a large one launched late. A concrete tactic for (c): every "Subscribe" button should link to `youtube.com/@insideaitoolbox?sub_confirmation=1`, which opens YouTube's subscribe prompt directly.

### My top 3 recommendations now

1. **Small site, launch fast, every page pushes toward subscribing.**
   Home · Learn (all videos, with Basics / Tutorials / Comparisons filters) · Updates · About.
   No newsletter, no Toolbox directory, no separate Compare section at launch.
   The main button on every page is "Subscribe on YouTube" (with `?sub_confirmation=1`), and Instagram is second.
   Each video gets one lesson page: lite embed, a 3-bullet takeaway, a copyable prompt where relevant, and links to tools mentioned.

2. **Visual direction: "objects on a desk", lit like a studio photo.**
   Warm light reading surface; navy used as a *solid material color* (matte navy objects, navy type), not as glow; one warm accent such as amber; no cyan glow, glass, gradients or pulsing dots.
   Shorts covers appear as physical cards. Make a small, consistent set of 3–5 tactile 3D stills (one light source, soft contact shadows, consistent scale): one hero scene plus an object for each topic.
   Make a solid, non-glowing version of the logo for the site.
   Use static images, not live 3D in the browser.

3. **Publishing has to pass the phone test before anything else gets built.**
   Update = headline + 2–3 lines + source link, posted from a phone form in under 5 minutes.
   Lessons come from a YouTube import that creates drafts for the owner to finish; Instagram links are added by hand.
   Stack: Astro + Cloudflare Pages (free), with the editor (Sanity vs Keystatic/Decap) picked by whichever passes the phone test.
   Domain: check `insideaitoolbox.com` first, including the renewal price, and run on the free subdomain until it's bought.

## Part 4: Update after the owner's clarification: "3D" means scroll-driven video (2026-10-13)

The owner clarified that "3D" means **the page plays a video frame by frame as you scroll**. All three of us had assumed static tactile stills.
This replaces my recommendation "use static images, not live 3D". The rest of my top 3 stands.

### How it's normally done
- **Pre-rendered frames drawn on a canvas, not a `<video>` tag.** The animation is exported as roughly 90–150 still frames (WebP/AVIF).
  As the user scrolls, the matching frame is drawn to a `<canvas>`. This is the technique Apple uses on its product pages.
  Scrubbing a normal `<video>` by seeking is choppy unless every frame is encoded as a keyframe, and it behaves inconsistently on phones.
- **Scroll control:** GSAP ScrollTrigger (free) maps scroll progress to a frame number. Optionally, Lenis smooths the scrolling.
- It's still **pre-rendered** content, not live 3D in the browser, so it fits a static, free-hosted site.

### Where it belongs
- **Homepage hero only**, plus at most one more section later. Lesson pages and Updates stay fast and plain.
- **Short:** about 1.5–2 screen-heights of scroll. Visitors from Instagram leave if they have to scroll through a long film before seeing content.
  Real HTML text sits over the canvas (it can be read and indexed), and a "skip" path stays visible.

### Concept that fits the brand: literally going "inside" AI
A matte navy "IA" object sits on a desk under soft studio light. As you scroll, the camera pushes in, the object opens,
and the Shorts covers fan out as physical cards that land on the desk. That's where the page content begins.
It ties the name, the "objects on a desk" direction and the logo colors together without glow or neural-network art.

### Costs and risks
- **Making the animation is the real work, not the code.** Options: Blender (free, steep learning curve), hiring a 3D artist for one shot,
  or AI image-to-video from a crafted still. The AI route carries the exact risk the owner wants to avoid (an "AI-generated" look),
  so it needs strong art direction and a still keyframe designed first.
- **File size:** 120 frames × about 60 KB ≈ 7 MB. Serve a smaller set to phones (about 60 frames at lower resolution),
  load progressively, and show the first frame immediately.
- **Accessibility:** respect `prefers-reduced-motion` by showing the final frame as a still.
- **Instagram's in-app browser** is the first screen for most visitors, so test there before shipping.
- Budget: still fits free hosting (Cloudflare Pages allows 20,000 files; frames are small). It doesn't touch the 5–10 minute daily routine,
  because it's a one-time asset.

### Recommendation
Do it, but **only in the homepage hero, one shot, made once.** Before any build, the owner should approve a **single still keyframe** of the scene.
If the still doesn't look human-crafted, the animation won't either.
