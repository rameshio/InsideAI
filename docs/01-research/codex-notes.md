# Research: Codex

> Author: Codex. Other AIs: read only; respond in your own file.

> Researched 2026-10-13. Planning recommendations only; the owner makes every decision.
> Read docs/README.md, docs/00-brief.md, and Claude's current notes. No project setup, installation, or code changes.

## Reference sites

I visited the six sites below with web retrieval and inspected each desktop homepage in a browser. These observations describe the pages shown during this session, not a mobile usability audit, performance test, or verification of their marketing claims. “Steal” means borrow a design principle, not copy assets or wording.

### 1. Future Tools — strongest structural reference; wrong visual direction

**URL:** https://futuretools.io/

- **Observed:** Matt Wolfe's site combines AI news, ranked tools, YouTube videos, commentary, and a newsletter. The desktop hero is dark, with purple/blue accents and a glowing network shaped like a brain. News items link to external sources; the tool ranking distinguishes community picks from Matt's picks.
- **What it does well:** Connects a creator's videos to useful supporting content. Curator identity gives the directory a point of view.
- **What to steal:** A small “tools featured in our videos” collection and clear links between a video, its topic, and its tools. Put attribution on news summaries.
- **What to avoid:** The glowing brain, gradients, extensive directory, rankings, and community voting. The hero directly conflicts with InsideAI's brief; directory maintenance exceeds a solo creator's time budget.
- **Verdict:** Borrow the relationships between content, not the appearance or scale.

### 2. The Rundown AI — best reference for a short daily promise

**URL:** https://www.therundown.ai/

- **Observed:** A large centered headline promises learning in five minutes a day. The dark hero has a prominent email form and company logos. Below it are separate newsletter, dated news, guide, and tool sections, followed by training offers.
- **What it does well:** States the audience benefit immediately and separates time-sensitive reporting from practical education. News previews explain an implication rather than displaying only a headline.
- **What to steal:** A compact update format: what changed, why it matters, and what the reader can do. Clear dates and a “View all updates” link.
- **What to avoid:** Making email signup the main action when our goal is channel growth; broad coverage of tech and robotics; paid-training navigation; company-logo proof without an appropriate basis.
- **Verdict:** Best editorial format reference for Updates, but InsideAI should send interested readers toward relevant videos.

### 3. Ali Abdaal — best reference for approachable creator identity

**URL:** https://aliabdaal.com/

- **Observed:** A warm off-white hero combines a portrait, large serif heading, yellow shape, and blue hand-drawn accents. Navigation and content distinguish resources by format and topic. Videos, articles, creator background, products, and newsletter signup coexist. A large event promotion overlay appeared during inspection.
- **What it does well:** Feels personal and editorial. Visitors can find useful material without understanding the creator's entire business.
- **What to steal:** Warm neutral surfaces, generous spacing, topic-based discovery, and a short explanation of who makes the content. Reuse existing cover artwork as a coherent card system.
- **What to avoid:** Promotional overlays, numerous business offers, and newsletter buttons labeled with audience counts that could confuse our YouTube subscription action.
- **Verdict:** Strongest starting point for tone and readability; add InsideAI's navy accents and tactile objects rather than copying the portrait-led hero.

### 4. Colin & Samir — best reference for a distinctive, tangible brand

**URL:** https://www.colinandsamir.com/

- **Observed:** The opening fills the desktop view with a playful studio photograph: furniture, books, older computers, and the two creators. A dark rounded promotion card overlays it with a bright yellow accent. Further sections link to shows, creator education, newsletter, and Discord.
- **What it does well:** The real environment makes the brand memorable and human. Multiple shows remain connected to their creators.
- **What to steal:** Art direction involving tangible objects, purposeful lighting, and one distinctive composition. Make InsideAI's 3D feel like photographed objects on a desk.
- **What to avoid:** A full-screen opening that pushes actual content below the fold; extra community destinations; building a comparable photography production burden.
- **Verdict:** Useful inspiration for physicality. It is a photographic reference, not evidence that this site uses 3D rendering.

### 5. Learn Prompting — best reference for a beginner learning path

**URL:** https://learnprompting.org/

- **Observed:** A spacious white homepage uses green accents, a large animated headline, and a clear free-learning action. Navigation exposes beginner/intermediate/advanced courses, documentation, vocabulary, workshops, and business offerings.
- **What it does well:** Gives learners an entry point and separates levels of difficulty. Documentation and vocabulary support conceptual learning.
- **What to steal:** A “Start here” sequence of three to five existing Shorts, simple topic labels, and brief definitions inline. Use the owner's actual fundamentals: generative AI, hallucinations, reasoning, RAG, and agents.
- **What to avoid:** Certification language, course accounts, elaborate menus, and a moving headline that makes the core promise harder to read.
- **Verdict:** Borrow learning order and clarity; InsideAI is a quick learning channel, not a course platform.

### 6. Hugging Face Learn — best reference for a visual topic library

**URL:** https://huggingface.co/learn

- **Observed:** The page displays large illustrated course cards in a two-column desktop grid, with titles and short explanations. Topics include LLMs, agents, robotics, audio, diffusion, and computer vision. The captured view used a dark theme and distinctive illustrated characters.
- **What it does well:** Repeated card structure makes different subjects easy to scan; artwork helps distinguish topics.
- **What to steal:** Consistent thumbnail proportions, readable titles, a one-line learning outcome, and a small library organized by subject.
- **What to avoid:** Developer terminology in beginner navigation, oversized cards for every 45-second video, platform-wide menus, and unrelated illustration styles.
- **Verdict:** A useful library reference, not a model for homepage messaging.

**Access limitations:** I also tried DeepLearning.AI's The Batch and AllAboutAI; retrieval returned 403 errors. Ben's Bites and One Useful Thing returned no readable page body. They are excluded from the six evaluated references. InsideAI channel details here come from the supplied brief; I did not independently re-audit the channels.

## Patterns

The most useful references have these things in common:

1. **A clear promise before a catalog.** InsideAI already has one: “AI made simple. Quick tips, useful tools & easy tutorials.” Keep it visible instead of writing a grand claim about the future of AI.
2. **Fresh content and durable content have different homes.** Recent updates earn repeat visits; a topic library helps people find an explanation months later.
3. **A curator or author provides trust.** Say who is behind InsideAI, cite sources, and distinguish a tested tip from a vendor announcement. Do not substitute invented metrics or borrowed company logos.
4. **Consistent cards do most of the design work.** Titles, thumbnails, dates, topic labels, and one-line outcomes matter more than decorative animation.
5. **The primary action matches the business goal.** Most commercial references push email or courses. InsideAI should prioritize “Watch on YouTube,” then a clearly labeled “Subscribe on YouTube”; Instagram is a secondary destination.

### My proposed visual direction

Use a warm off-white reading surface, dark navy typography and framing, and restrained blue accents matched to the actual logo once supplied. Keep light editorial covers readable instead of darkening them to match the banner. Use one crafted 3D still in the hero and perhaps three reusable topic objects: a small book or stacked cards for Basics, a physical tool/control object for Tutorials, and a calendar tile for Updates. Give them believable materials, a common light source, soft contact shadows, and consistent scale.

This is my design proposal, not a pattern observed across all six sites. None establishes that 3D is necessary for conversion. Start with optimized still images; live WebGL, scroll-controlled cameras, floating robots, and perpetual motion add complexity without helping the daily publishing goal. A visually rich hero must still leave a useful video or beginner entry point visible early on mobile. Do not redesign the logo during this phase.

## Recommended sitemap for InsideAI, and why

**Primary navigation: Learn · Updates · About, with a YouTube action.** Home is reached through the logo. Keep launch navigation small.

| Page | Content | Why it earns a place |
|---|---|---|
| Home | Brief promise; featured comparison or useful Short; three-item beginner path; latest update; latest videos | Gives a first-time visitor something useful immediately and a route to the channels |
| Learn | All videos with filters for AI Basics, Tool Tutorials, and Comparisons | One complete archive without several nearly empty sections |
| Individual lesson | One prominent video, original short explanation, an example or prompt where relevant, cited links, related lessons, channel actions | Gives every published video a stable website address and extra value |
| Updates | Reverse chronological headline + 2–3 lines + source + optional related lesson | Supports repeat visits without overwhelming evergreen material |
| Individual update | Stable shareable address containing the same complete short post | Allows linking to an update; no obligation to expand it into an article |
| About | InsideAI's purpose, audience, creator attribution at the owner's comfort level, channel links, contact route | Establishes identity and sets expectations |
| Footer privacy information | Actual use of embedded platforms and any analytics or forms chosen later | Explains how the site operates without adding a prominent navigation item |

Suggested example lesson addresses: /learn/why-ai-hallucinates and /learn/chatgpt-vs-claude-vs-gemini. These are proposed routes, not created files or pages. Topic filters should refer to the same lesson records; avoid separate competing copies under /videos and /learn.

**Do not launch a broad Tools directory, separate glossary, newsletter, or standalone Compare destination.** Link tools from their relevant lessons. Promote Comparisons as a library filter and a homepage feature. If the owner later publishes several substantial comparisons, a dedicated landing page can collect the same records without changing their addresses.

**Where I differ from Claude:**

- I agree with the evergreen library. I would combine its “Tools” idea with Tool Tutorials inside Learn rather than create another content maintenance obligation.
- The comparison's approximately 1.1K views are a useful signal, but one example does not establish causality. Packaging, age, distribution, and topic could explain the difference. Give comparisons prominence now; validate with more videos before making them a major section.
- “Google can't index a 60-second Short” is too categorical. Google can index videos, including third-party embeds when requirements are met. Original text adds usefulness; indexing and traffic remain uncertain. See [Google's video SEO guidance](https://developers.google.com/search/docs/appearance/video).
- I would not immediately replace both social bio links with the site. First ensure the homepage sends visitors toward the channels with little friction; test that route rather than assuming an extra click grows subscribers.

## How to publish a daily update with the least effort

### Launch workflow: a short form, not an article editor

Recommend a customized **Sanity Studio browser editor** with two content types: Update and Lesson. The public website needs no user accounts; a private owner editing login is a separate requirement.

The Update form should require only a headline, 2–3 lines, and a topic. A source URL is required for news; a tip can link to a relevant lesson or original documentation. Set the date automatically, allow corrections, and keep an optional lesson link. Do not require an image, SEO description, separate teaser, or daily artwork: derive previews from the text and reuse topic styling.

Daily routine, targeting 5–10 minutes:

1. Pick one genuinely useful item from your existing research. On quiet days publish an evergreen tip rather than forced news.
2. Spend about two minutes checking the original announcement or documentation. If a claim needs more research, defer it; the time budget is not a reason to publish an unchecked claim.
3. Write about 40–80 words: what changed or the tip, why it helps, and one limitation or action. This is an editorial target, not a mandatory field limit.
4. Preview and publish. A publication webhook triggers a static rebuild; check the live post once the deployment finishes. This is not instant publication, and the publishing UI should distinguish saved content from a successful site deployment.

Use a default share image rather than produce new assets. Reuse your own script text for lessons: an original 80–150-word explanation and one example is usually sufficient for these short videos. The initial archive backfill is a separate one-time effort; do not disguise it as part of the daily five-minute routine.

The proposed publication link is supported by [Sanity webhooks](https://www.sanity.io/docs/content-lake/webhooks) and [Cloudflare Pages deploy hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/). Filter triggers to publication changes, not every keystroke or imported draft; treat the deploy-hook URL as a secret. A failed build should leave the previous deployment live, with a clear way for the owner to retry.

### YouTube automation: import once, review briefly

Start with pasting a YouTube URL into the Lesson editor. After manual publishing works, add **a daily importer that creates missing lesson drafts**. This removes repetitive copying while preserving the owner's judgment.

- Resolve the channel's stable ID and uploads playlist once using [channels.list](https://developers.google.com/youtube/v3/docs/channels/list). Use the uploads playlist, not repeated broad search queries.
- Read new items with [playlistItems.list](https://developers.google.com/youtube/v3/docs/playlistItems/list); use [videos.list](https://developers.google.com/youtube/v3/docs/videos/list) for duration and publication/embedding checks. Paginate for the initial backfill.
- Match records by YouTube video ID. Import title, ID, thumbnail reference, publication time, and description into a draft. Keep imported fields separate from owner-written explanation and corrections so later synchronization cannot overwrite them.
- Do not classify Shorts solely by duration. The [video resource](https://developers.google.com/youtube/v3/docs/videos) has no straightforward public isShort flag. While this is a Shorts-only channel, import uploads and have the owner confirm the format; if that changes, use an owner-maintained playlist or explicit selection.
- The owner chooses a topic, adds or reuses an explanation, and publishes. Automation supplies metadata; it does not invent a reviewed article or a daily news opinion.
- For the same video on Instagram, add the Reel link to the existing lesson. Do not create duplicate lesson pages. For Instagram-only videos, create a manual record and link to the Reel initially; do not depend on Instagram scraping or assume a token-free import exists.

Proposed scheduler: GitHub Actions once daily, away from the top of the hour, with manual retry. Run it on a standard Linux runner and within included usage. [GitHub's billing rules](https://docs.github.com/en/billing/concepts/product-billing/github-actions) distinguish public and private repository allowances. [Scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule) can be delayed or dropped; inactive public repositories can lose scheduling after 60 days. A manual URL-paste path must remain usable.

Cache imported metadata in the CMS, not in a request from every visitor. Keep the YouTube API key and limited CMS write credential in automation secrets. Preserve the archive on a transient API failure; verify a genuinely removed/private video before hiding its player. Keep its explanation and mark playback unavailable when appropriate. This automation is a future recommendation, not something set up in this research phase.

## Recommended tech stack + hosting

**Recommendation: Astro static pages + Sanity Free + Cloudflare Pages Free, with source in GitHub.** Use ordinary CSS and minimal browser JavaScript. This is a content site with a small editor, not a full-stack application.

| Component | Recommendation and reason | Honest trade-off |
|---|---|---|
| Public site | Astro with pages generated from CMS content; [official Sanity integration reference](https://docs.astro.build/en/guides/cms/sanity/) | Initial integration and later maintenance need technical help; static publishing waits for a build |
| Owner editor | Sanity Studio with narrow Update and Lesson forms | A separate service/login and provider dependence; structured content still needs exports |
| Hosting | Cloudflare Pages Free, using static output and publication hooks | Free limits can change; build failures need attention; this does not provide a general database or video streaming service |
| Media | YouTube hosting and embedding; existing covers and a few optimized 3D stills | Platform deletion, private videos, embed restrictions, and third-party loading remain dependencies |
| Search | Topic filters at launch; add local static search when the library merits it | Avoid paying for search or building it before there is enough content |
| Automation | Optional daily GitHub Actions importer after manual launch workflow works | API setup, secrets, quotas, and occasional scheduler failures add real maintenance |

At research time, [Sanity pricing](https://www.sanity.io/pricing) offers a free plan with public datasets; private datasets and scheduled drafts are listed under Growth. Keep confidential material outside it, and do not promise free native scheduled publishing. [Sanity's plan documentation](https://www.sanity.io/docs/platform-management/plans-and-payments) describes hard resource caps on Free. Use it for public-facing text and modest images, not video uploads or unbounded AI features. Plan regular exports using the [dataset export tooling](https://www.sanity.io/docs/cli-reference/cli-datasets), plus an occasional restore check.

[Cloudflare Pages Free limits](https://developers.cloudflare.com/pages/platform/limits/) currently include 500 builds per month, 20,000 site files, and a 25 MiB maximum per asset. Around one publication a day, occasional corrections, and rebuilding only when imports are published should fit comfortably at this scale. These are usage estimates, not an unlimited-service promise. Recheck free terms before implementation; do not enable paid services or overage billing merely to make an optional feature work.

Why this choice over the obvious alternatives:

- **Plain Markdown in Git:** simpler infrastructure and easy portability, but asking the owner to edit files and deploy for every update conflicts with the desired routine. Keep it as an export format, not the main editor.
- **Decap CMS:** a credible free, Git-backed alternative. However, its [GitHub backend documentation](https://decapcms.org/docs/github-backend/) requires an authentication arrangement and repository push access. That extra setup/ownership is a reason I prefer Sanity here, not a claim that Decap cannot work.
- **Self-hosted WordPress or Ghost:** appropriate editorial products, but operating a server and updates is unnecessary for this brief. Free hosted products may constrain domain/design choices; I have not priced every plan and would not assume a suitable free tier.
- **Next.js plus an application database:** introduces runtime and data responsibilities without a current requirement for accounts, comments, purchases, or personalized features. Reconsider if the product scope changes.

**Free is a cash budget, not zero work.** Accounts, a one-time custom build, a modest archive backfill, backups, and occasional troubleshooting are still needed. Before accepting the eventual implementation, the owner should be able to publish a test update from their usual device within five minutes without opening a terminal. If the CMS fails that usability test, fix the editor before adding automation or visual effects.

### Domain recommendation

First investigate **insideaitoolbox.com**: it matches the YouTube handle and describes useful content. Fallback candidates: **learninsideai.com** and **insideaiguide.com**. They are naming suggestions; availability, trademark conflicts, registration cost, and renewal cost have not been checked. The short InsideAI name alone should not be assumed available.

Use the free host subdomain until the owner approves a domain. Target the brief's approximately $10–15/year for a non-premium .com, but obtain an actual first-year and renewal quote before purchase. Avoid choosing an expensive .ai extension just to signal the topic. [Cloudflare Registrar](https://developers.cloudflare.com/registrar/) is worth checking for at-cost registration; it requires Cloudflare nameservers. No registrar or domain account was created.

## Risks and open questions for the owner

### Risks worth designing around

- **Channel-growth friction:** the site adds a step between social discovery and subscription. Keep obvious channel actions on every lesson and measure outbound clicks before routing all bio traffic through it. A click is not proof of a new subscriber.
- **Daily cadence becoming a burden:** one thoughtful tip beats an obligatory headline. Call the area Updates and show dates; avoid promising an uninterrupted daily streak publicly.
- **Thin duplicate pages:** imported titles and descriptions alone are not a search strategy. Add the owner's explanation and an example. Google traffic is a potential benefit, not a six-month forecast.
- **A “permanent” archive is not permanent video storage:** stable website records can outlive an embed, but YouTube deletion can remove playback. Keep original masters in the owner's normal backup process; this proposal does not create a paid video archive.
- **3D obscuring content:** custom art can consume more effort than the entire site. Reuse a small object family, keep text as text, and prioritize mobile reading and accessible contrast. Mobile behavior still needs testing during the build.
- **Embed cost and indexing trade-off:** archive grids should use thumbnails rather than dozens of players. On an individual lesson, a click-to-load player improves initial loading/privacy but may reduce Google's video discovery; decide that trade-off explicitly using the cited Google guidance. Maintain a direct platform link and describe actual third-party behavior in privacy information.
- **Outdated advice:** date comparisons and label when claims were checked. Link to official sources for changing limits/prices; review popular comparison pages periodically rather than declaring a tool universally best.
- **Service and maintenance dependence:** CMS caps, a failed webhook, an inactive importer, or lost account access can disrupt publishing. Preserve static deployment recovery, content exports, a manual publishing path, and owner control of all accounts.

### Questions that materially affect the plan

1. Will you normally post from a phone or a computer? Default recommendation: a simple browser form; verify it on your actual device.
2. Should About name/show you or remain a channel identity? Either works; avoid inventing a persona or requiring a portrait.
3. Can you supply the official logo and existing covers for later design review? Exact colors and artwork consistency are unverified beyond the brief's description.
4. Are all videos cross-posted to both platforms, or will Instagram have exclusive material? Default: one lesson per underlying video, with both links when available.
5. Are you comfortable owning GitHub, Sanity, and Cloudflare accounts and getting occasional maintenance help? The recommendation depends on that trade-off.
6. Can your scripts be reused as lesson summaries, and how many older videos need backfilling? This controls initial editorial work more than the daily-post feature does.
7. Is domain registration the only allowed expense, separate from free-only hosting/tools? No purchase is implied by these suggestions.

**My preferred decision for discussion:** a small, approachable learning hub that points people to the channels; short sourced updates; a unified video library; a few tactile 3D stills; and a deliberately narrow publishing form. Do not turn a 1.2K-subscriber channel into a news company, course platform, or comprehensive tool directory before the audience demands it.

## Cross-review

> Added 2026-10-13 after reading Claude's and Antigravity's notes. Recommendations remain proposals for the owner; no build or setup is authorized.
> Review limitation: Claude's file currently contains its channel analysis and draft sitemap, but its reference-site research is still marked "Pending." I reviewed the content actually present rather than assuming a completed second research report.

### What they got right that I missed

- **Antigravity: reuse a video's diagram as a companion asset.** I proposed short explanations and examples, but missed the value of letting someone examine an existing RAG diagram or comparison graphic at their own pace. Make that an optional lesson attachment, with descriptive text. Reuse an existing asset; do not require a new infographic for every Short.
- **Antigravity: test social apps' embedded browsers explicitly.** I called for mobile testing, but did not name Instagram's in-app browser. Test a representative lesson from an actual bio link: navigation, player behavior, copy-prompt interaction, and the transition to YouTube. This is more useful than judging only a desktop preview.
- **Antigravity: a dark frame with warm content surfaces is a coherent alternative.** My warm reading surface with navy accents could be developed further using its desk-and-paper idea. That gives the banner and covers a shared physical context. Raycast is an additional tactile-design reference it identifies; I have not independently inspected Raycast and would treat it as a reference to verify, not a validated specification.
- **Antigravity: ask about future long-form videos now.** I implicitly designed around Shorts. A lesson record should support the actual video aspect ratio and duration so a later landscape tutorial does not require rebuilding the archive.
- **Claude: ground the organization in the banner's existing promise.** Its channel analysis remains the strongest reminder that AI Basics, Tool Tutorials, and AI Updates already describe the brand. My navigation proposal should preserve those recognizable labels in filters and beginner paths, rather than introduce an unrelated taxonomy.

### Where I disagree, and why

1. **Newsletter-first design does not match the first-six-month goal.** Antigravity puts email capture in the hero, navigation, and mobile sticky bar. That adds a second publishing channel, subscriber management, and competing actions. Recommend no newsletter at launch. Use explicit YouTube and Instagram actions; revisit email only when there is a clear reader need and a sustainable delivery plan. The channel's approximately 1.2K YouTube subscribers must not be presented beside an email form as if they were newsletter subscribers.
2. **Four content destinations are too much at this size.** Antigravity's Learn, Comparisons, Toolbox, and Daily Pulse would divide a small archive and imply several ongoing editorial obligations. Claude's dedicated Compare proposal has the same issue. Keep Learn, Updates, and About; put Basics, Tutorials, and Comparisons inside Learn. A small set of tool links can appear on lessons without becoming a directory.
3. **One comparison outperforming other videos is a signal, not a format verdict.** Both peers give comparisons substantial weight. Feature the successful comparison, then test more examples. Views are not normalized for age, exposure, or packaging; they do not yet justify organizing the whole homepage around comparisons or calling them the audience's established preference.
4. **The homepage proposal needs less repetition.** A hero pulse, comparison showcase, toolbox shelf, video vault, and starter paths create a long launch page. Put the beginner entry point earlier and use four useful blocks: promise plus featured video, Start Here, latest update, and latest lessons. On mobile, favor a visible short list or grid over making every section a sideways rail; swiping can hide choices and complicate keyboard access.
5. **Detailed visual values are proposals until verified.** Antigravity supplies exact fonts, hex colors, audience percentages, embed payload sizes, and price examples. Its file does not show the measurement or source for many of those details. I would not carry them into the agreed plan as established facts. Match the official logo later, test actual mobile performance, and verify renewal prices. The claim that over 80% of this audience arrives on phones is an assumption without supplied analytics.
6. **Do not adopt the sample technical claims as publishable copy.** The proposed comparison uses specific older model names; the RAG sketch says vector databases make retrieval instant. Those are placeholders requiring editorial review, not safe defaults. Use dated, task-specific comparisons; explain RAG without implying every implementation uses a vector database or guarantees latency. The player also cannot promise 4K independent of source quality and playback conditions.
7. **A free importer still has dependencies.** Antigravity's "100% free and never expires" description of YouTube RSS/API is too absolute. My recommendation remains metadata imports into drafts, API quota awareness, a retry path, and manual URL entry. Avoid making permanent-availability claims about third-party services. Its Instagram token-expiry claim also needs checking against the particular account and API before becoming a requirement.
8. **Search traffic is not automatic.** Claude's Short-indexing statement and Antigravity's "traffic magnet" language overpromise the benefit. Useful summaries, accessible video pages, and source links are worthwhile; indexing and ranking are not guaranteed. [Google's video guidance](https://developers.google.com/search/docs/appearance/video) allows third-party embeds but sets eligibility requirements. Use thumbnail cards on archive pages, and make an explicit speed-versus-video-discovery decision for individual watch pages.
9. **Choose one practical editor rather than leave publishing unresolved.** Antigravity correctly spots friction but suggests Markdown, Keystatic, or Notion without settling the operational trade-off. I still recommend a narrowly configured Sanity editor with Astro and static Cloudflare Pages hosting, subject to the owner testing it on their usual device. A public site without accounts can still have an authenticated owner editor. Importing video metadata is secondary to proving the daily form works.

### My top 3 recommendations now, after seeing everything

1. **Launch a small learning hub that grows the channels.** Home, Learn, Updates, and About; one stable lesson per underlying video; topic filters instead of separate Tools and Compare sections. Start Here stays prominent. Feature the successful comparison, but keep channel actions ahead of newsletter capture. Optional diagrams and copyable prompts should help the viewer do something the Short alone cannot.
2. **Prove the five-minute publishing routine before adding automation.** Use Astro + Sanity Free + Cloudflare Pages Free as the proposed baseline. Require only a headline, a short explanation, a topic, and a source when appropriate. Reuse existing scripts and artwork. Accept the editor only after the owner can publish and verify a post from their usual device without a terminal; then add daily YouTube draft imports with a manual fallback. No automated news-writing or Instagram scraping is needed.
3. **Combine warm editorial content with restrained tactile navy framing, and evaluate it on mobile.** Adopt Antigravity's physical desk/paper idea as a direction to explore, while retaining my light reading surfaces and a few reusable 3D stills. Avoid glowing network art, glass-heavy UI, perpetual live badges, and expensive interactive 3D. When design work is authorized, compare a predominantly light treatment with a restrained dark-frame treatment using the same real covers, and test the selected direction in Instagram's browser as well as an ordinary phone browser.

### Amendment: the owner means scroll-driven animation by “3D website”

> Added 2026-10-13 after re-reading the updated brief and Claude's Part 4. This supersedes my earlier recommendation to use only static hero art. Planning only: no animation, assets, code, or project have been created.

**Updated recommendation:** one short pre-rendered animation in the homepage hero, controlled directly by scroll position in both directions. Keep the small sitemap and daily editor recommendations. Static images become the loading/accessibility fallback, not the default expression of the owner's requested experience.

#### Technique: image sequence on a canvas, with native scrolling

I agree with Claude's image-sequence approach. Produce a single animation master and export its frames, initially using WebP. Draw the selected frame on a 2D canvas; map progress through the hero's scroll range to a frame index. The same position must select the same frame regardless of scroll direction. Moving back rewinds; stopping freezes it; a fast swipe jumps to the corresponding available frame rather than forcing every intermediate frame to play. This creates the requested video-like effect without live browser 3D.

Use GSAP ScrollTrigger for section progress and lifecycle handling, and requestAnimationFrame to coalesce drawing work. Use a direct progress mapping with no animation easing or delayed catch-up. GSAP documents direct versus smoothed scrubbing, and its current pricing page says the library is free. Keep normal touch, wheel, and keyboard scrolling; skip Lenis, scroll snapping, and custom scroll interception at launch. These are implementation recommendations, not dependencies installed in this folder. Sources: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [GSAP pricing](https://gsap.com/pricing/), [animation-frame scheduling](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), and [2D canvas context](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext).

I would not use ordinary compressed MP4 seeking as the baseline for exact frame selection. Changing a video's currentTime requests a seek, not a synchronous draw of a known image; codec, keyframe spacing, and device decoding affect the result. An optimized video may use less bandwidth and can be benchmarked later if the image sequence exceeds budget. Claude's claim that every frame must be a keyframe is too absolute, and its Apple implementation claim is not independently verified here. We should choose based on our scene and device measurements, not a presumed universal industry recipe. [Media seeking reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime).

#### Placement: a short homepage introduction, never a content gate

- **Homepage hero only at launch.** No repeating animation on Updates, lesson pages, or the publishing interface. Direct lesson visitors get the explanation and video immediately.
- **Keep the tagline, channel action, and a “Skip to videos” link visible from the first screen.** Use real HTML text and links over or beside the scene. The canvas is decorative; essential information must not exist only inside its pixels.
- **Starting scroll budget:** about one viewport-height of additional scroll on phones, up to two on desktop, subject to usability testing. Distinguish the travel distance from the hero's own height; a viewport-height sticky stage plus one viewport of travel occupies roughly two viewport-heights in the document. Avoid accidentally turning “two screens” into a much longer opening.
- **Exit into Start Here and the featured comparison.** Latest updates follow. Cards in the film are visual motifs, not the only interactive navigation. A direct skip must work even before any sequence frames load.
- Keep the rendered cards generic or based on a small stable set of approved covers. Showing every newest video inside a baked animation would require re-rendering it whenever content changes, defeating the daily time budget.

#### Phones and Instagram's in-app browser: transfer size is only half the budget

Claude's 120 frames at 60 KB each is approximately 7.2 MB of compressed transfer; it is an example, not a measured production asset. Decoded memory can be much larger. At four bytes per pixel, 60 decoded 960 × 540 frames occupy roughly **119 MiB** before canvas buffers, browser overhead, or other page content. “Serve fewer frames” therefore needs an explicit cache strategy as well as smaller files.

Proposed initial targets, to validate with the actual render:

- A separately framed portrait/mobile export of roughly **48–72 frames**, around **640 × 800** as a starting resolution, with the full phone sequence targeting **2–3 MB or less**. Desktop can start around 90–120 frames at a suitable landscape size. These are design budgets, not measured guarantees; simplify the motion or background if compression damages quality.
- Show an ordinary responsive poster immediately, targeting approximately 100 KB or less. Fetch only the selected device variant. Do not make readable content wait for all frames or preload the desktop sequence on a phone.
- Prioritize a coarse set of frames across the whole motion, then fill gaps around current progress. Keep a bounded decoded cache, initially around 8–12 frames, rather than decoding everything at once. Favor the nearest available frame when a target is missing; keep the page scrollable. Explicitly release evicted bitmap resources where that API is used. [ImageBitmap resource disposal](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap/close).
- Cap canvas pixel density, initially at 1–1.5 on phones; do not multiply dimensions by every high device-pixel ratio. Avoid concurrent hero loading and multiple YouTube players. Stop drawing when the hero is out of view or the page is hidden.
- Use a stable section height that does not jump when browser chrome expands/collapses. Check safe-area spacing, portrait/landscape changes, restored scroll position, and repeated backward swipes. A portrait composition needs intentional framing, not just a center crop of a desktop shot.
- Respect reduced-motion preferences: show a representative final still, omit the extended sticky scroll range, and do not download the sequence. Provide an explicit still-view choice as well; use that fallback for load/decode failure or unsuitable performance. Reduced-data signals may help where supported but must not be assumed present in every in-app browser. [Reduced-motion preference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

**Acceptance checks when implementation is authorized:** test on a real mid-range Android phone and an iPhone, both in ordinary browsers and Instagram's actual in-app browser, on a cold load with constrained connectivity. Verify forward/backward tracking, fast jumps, skip, restored navigation, and reduced-motion behavior. Aim for responsive 30-fps-or-better drawing during typical movement, but prioritize uninterrupted native scrolling over forcing a frame rate. Reject blank frames, tab reloads from memory pressure, obstructed channel buttons, and a mandatory loading screen. A desktop preview or simulated mobile viewport cannot establish Instagram compatibility. No such performance or device testing has occurred in this planning phase.

#### Production: deliberately animated physical objects, not generative morphing

Claude's “go inside AI” concept fits. My preferred treatment is a matte navy toolbox or enclosure on a warm studio surface; it opens mechanically, revealing three physical cards representing Basics, Tutorials, and Updates. A restrained camera move reveals their depth, then they settle into the layout's visual language. Use the IA mark only in a form the owner approves; no logo alteration is implied. Avoid flying through a brain, a glowing tunnel, or an unsupported metaphor for how AI literally works.

**Recommend modeling and keyframing one simple shot in Blender, using local rendering within the free-tool budget.** The owner or a collaborator still needs to supply time and skill; free software does not make asset production effortless. Hiring an artist is outside the current budget, and paid render farms or generative-video credits should not be treated as required tools.

To achieve the intended human-crafted appearance:

1. Use modeled geometry, fixed UVs, approved logo/cover textures, and consistent materials. Keep object edges, lettering, proportions, and shadows stable through every frame.
2. Establish one soft studio light direction, believable contact shadows, matte navy material, warm paper, subtle bevels, and restrained surface variation. Keep the background simple enough to compress cleanly.
3. Animate opening, card separation, and settling with deliberate keyframes. Avoid morphing, elastic material changes, frantic camera moves, and heavy motion blur: each frame must also look convincing when the reader stops scrolling.
4. Compose and review first/middle/final stills and a low-resolution motion preview, including the portrait view. One approved still is useful but insufficient to detect temporal flicker, geometry drift, or an awkward reverse movement.
5. Preserve the editable scene, textures, rendered master, and export settings for consistent future revisions. A single controlled scene should produce both device variants.

I would not choose AI image-to-video as the default production route. A well-designed starting still cannot guarantee stable geometry, text, lighting, or materials across generated frames, and scroll reversal makes those defects conspicuous. Generative output could be exploratory reference if later requested; final art should be judged by frame consistency and physical craft, not by a blanket promise that a tool can eliminate an “AI-generated” appearance.

**What changes in my top three recommendations:** the third now calls for a short, reversible homepage image sequence with tactile studio art and a deliberate mobile memory budget. The first two still stand: a small channel-oriented learning hub and a proven five-minute publishing form. The animation is a separate one-time production task, but it adds real ongoing browser/performance maintenance; “made once” should not be read as “maintenance-free.”

## Review of the build spec

> Reviewed 2026-10-13: docs/README.md, docs/03-decisions.md, docs/04-build/antigravity-frontend-prompt.md, and the current brief. This is a specification review, not a review of implemented frontend files. Antigravity owns site/ and site-design/. No CMS, importer, frontend, or schema changes were made.

**Overall:** the small sitemap, Astro static output, fixed lesson/update shapes, draft-oriented future importer, and homepage-only frame sequence are compatible with the plan. Phase A's owner choice remains the gate before Phase B. The content shape in section 3 is the integration contract; my earlier Sanity recommendation is still a proposal, not an approved CMS decision.

### Content model and future integration

1. **Define the published-content boundary before connecting a CMS.** The specified collections have no draft/status field, while the future importer should create drafts. If imports are written straight into site/src/content/lessons/, unfinished pages can enter routes, grids, and sitemaps. Recommendation: keep drafts in the CMS or a separate staging store, outside published collections. Export only owner-approved published records into the exact specified Markdown shape. Do not add an undeclared status field to frontend files. Until export/publishing behavior is agreed, imports must not write into the live collections.

2. **Pick one content authority and one delivery mechanism.** The spec says Codex will connect the CMS/importer “to these files,” but does not say whether CMS publication generates Markdown or Astro will eventually read directly from the CMS. Recommendation: preserve Markdown as the frontend boundary and use a future publish/export step to materialize approved CMS records before the static build. Put CMS-specific IDs, import state, and approval state outside this frontmatter. After cutover, editorial changes should happen in the editor rather than competing manual edits to generated files. Define export failure and unpublish behavior before automating deployment; a temporary fetch failure must never be interpreted as an empty catalog. No exporter or deployment is authorized by this review.

3. **Use youtubeId for identity; freeze the filename slug for URLs.** The slug is implicit in the filename and also appears in related and relatedLesson. Recommendation: map a YouTube video ID to one existing lesson before creating anything; make duplicate IDs an error. A changed YouTube title should not rename a published Markdown file or break related links. Keep a stable CMS identity-to-slug mapping outside the public schema. If the owner deliberately renames a route later, update references and create a redirect through an agreed migration, not an importer side effect.

4. **Separate imported metadata from editorial content.** The API can supply a title, ID, description, and publication metadata; it cannot responsibly supply three approved takeaways, the topic, or an 80–150-word explanation automatically. Recommendation: importer drafts retain raw metadata separately; the owner approves the public fields. Refreshing metadata must not overwrite the body, takeaways, prompt, tools, related, featured, or a curated title. Existing completed lesson content must survive repeated imports unchanged unless an explicit editorial update is requested.

5. **Make date meaning and ordering explicit.** Recommendation: publishedAt means the video's original public publication date, not the website import date. Update date means the owner's publication date for that update. Normalize exports to quoted YYYY-MM-DD values and document how YouTube timestamps become dates; I recommend UTC for source video dates and America/Chicago for owner updates. Use a deterministic slug tie-breaker for same-date records. Do not add an unsupported timestamp just to create ordering. If precise multiple-updates-per-day ordering becomes important, that requires a future contract decision.

6. **Collection schemas alone are not the whole validation contract.** Require exactly three non-empty takeaways, valid topic values, real booleans, and valid dates. Validate youtubeId structure without treating syntax as proof that a video exists or embeds. Restrict public tool/source links to HTTP(S), and check an optional instagramUrl points to Instagram. Enforce sourceUrl for news. Omitted tools/related become empty lists in rendering; omitted featured means false. Missing prompt or Instagram links must not produce empty buttons. Check that related and relatedLesson resolve to published lessons; catch duplicates and self-references. A reference to a draft must not generate a dead public link. Keep these checks within the declared shape.

7. **Featured selection and beginner order need a rule.** featured does not define which lesson wins if several are true, and the model has no starter-path ordering field. Recommendation for the frontend: at most one featured lesson, with a clearly documented fallback when none is set; a small explicit ordered list of three existing slugs in one frontend configuration for Start Here. Do not duplicate lesson records or overload related to encode a curriculum. Later CMS control of homepage ordering can be agreed separately; Codex must not independently change frontend configuration.

8. **Instagram-only lessons are not supported by this contract.** youtubeId is required. That is fine for the current YouTube archive, but it is not a general video-platform model. For launch, cross-link a Reel on its corresponding YouTube lesson. If Instagram-exclusive material must have lesson pages later, ask the owner to approve a contract extension then; do not invent YouTube IDs or silently make the field optional.

9. **Optional reusable diagrams were discussed but are not in frontmatter.** Recommendation: if needed, place an existing approved diagram in the Markdown body with descriptive alternative text. Do not add a new diagram field or require extra artwork for every lesson. The importer should preserve these authored body assets.

### Seed content and review readiness

- **Title/description-only takeaways need a clear editorial gate.** The requirement to seed all eight lessons is understandable, but metadata may not support three factual claims or a full explanation. Use TODO(owner) where evidence is insufficient, never invented prompts or verdicts. The build log should identify each unresolved item by lesson slug. Seed files are prototype content, not automatically approved publishing material.
- **Sample updates need visible labels and a release gate.** Mark them as samples in the rendered title/body, not just YAML comments. They can exercise the local templates, but must be removed or replaced before public release. Do not invent a news source URL to pass validation; fictional samples can use topic tip with explicit sample wording.
- **Unavailable channel IDs must remain a reported blocker.** Antigravity should not derive video IDs from the eight titles in the brief. If the channel cannot be accessed, the log should list the missing verified IDs and the unfinished records. Placeholder IDs must not masquerade as real lessons or produce apparently functional watch links.
- **The reviewed contract should be documented in the handoff.** Ask the build log to state actual collection definitions, slug handling, date handling, selection rules, and seed/placeholder coverage. Codex can then map the CMS/importer to observed behavior rather than rely on an assumed implementation. This is a future handoff request in these notes, not a message sent to Antigravity.

### Hero and testing ambiguities

- **Headline placement conflicts within section 3.** The page table puts the promise and subscription action after the hero, while the hero subsection says its headline overlays the canvas. Recommendation: promise and Subscribe are visible in the initial screen, with a persistent Skip to videos link; the animation must not be a gate to either action.
- **“1.5–2 screen heights” needs to mean scroll travel or total section height.** State the distinction in the build log and measure it at 375px. A sticky hero can otherwise make the introduction longer than intended. Reduced-motion and still fallback should collapse the extra scroll distance, not leave empty screens.
- **The 4 MB transfer budget does not bound decoded memory.** Use a device-specific export, bounded decoded-frame cache, capped rendering resolution, and drawing only while needed. Fetch the mobile sequence only on phones. Frame replacement needs one configuration source covering count, filenames, dimensions/variant, and poster/final-frame behavior. A missing frame should preserve the last valid frame or poster; it must never block native scrolling.
- **Placeholder performance is provisional.** Small repeated placeholder frames can pass Lighthouse while real detailed frames do not. Report scores with the tested asset set, and re-test transfer, decoding, memory, and scroll tracking when real artwork replaces it. First-frame display should have a normal image fallback; it cannot depend on a successful canvas initialization.
- **A desktop browser at 375px is not an Instagram-browser test.** Phase C's viewport checks are useful but do not prove actual phone behavior. Before public release, test on an iPhone and a mid-range Android phone, including Instagram's in-app browser, cold loading, fast scroll/reverse, orientation change, copy prompt, skip, and platform links. Record actual device coverage and any untested cases rather than treating a simulated width as equivalent.

### Shared-folder ownership and document consistency

The brief still lists building as out of scope, while the newer owner instruction, README, and decisions explicitly authorize Antigravity's frontend build. I follow that newer authorization; the brief's visual and product goals remain binding. README also still labels Codex's cross-review pending although it is already appended. These are owner-maintained status inconsistencies, not reasons to stop authorized work, and I have not edited them.

Because git is initialized at the shared root, Antigravity's commit steps should stage only its intended frontend/design work and authorized build log, not all concurrent research edits. Codex's later CMS assignment still needs an explicit write boundary: preserving the content contract does not itself authorize editing site/ today.

**Highest-priority clarifications before CMS/importer work:** (1) draft/published export boundary, (2) stable ID/slug mapping and editorial-field ownership, and (3) exact date/reference/featured-selection validation. The frontend can proceed through its authorized design phase while these recommendations await the owner's decisions.
