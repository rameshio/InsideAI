# 13. Article and video detail pages

**Route:** `/<collection>/<slug>`, for example `/guides/rag-explained`
**Files:** `src/app/[collection]/[slug]/page.tsx`, `src/components/actions.tsx`, `src/lib/text.ts`, styles in `src/styles/pages.css`

## What it shows

- "Back to <collection>" link
- Category label (plus "Demonstration content" for demos), title, summary
- Byline: avatar, author, published date, reading time, and when present "Updated", "Editorial issue" and "Last reviewed" dates. A "Copy link" button.
- A notice for demo content
- Videos: a player (see below)
- The MDX body, then for updates the "stories" (What happened / Why it matters / What to keep in mind / Source), a "Try this prompt" block, a "Download the resource" button, and "Further reading & sources"
- "Keep exploring." related entries and a compact newsletter box

## How it works

- `generateStaticParams()` pre-renders every published entry at build time. Drafts and unknown slugs return 404.
- `generateMetadata()` sets the title, description, canonical URL and social image.
- **Structured data:** articles get `Article` JSON-LD. Videos get `VideoObject` only when a real YouTube ID exists. The JSON is escaped by `safeJson()` so it cannot break out of the script tag.
- **MDX** is compiled on the server (`next-mdx-remote/rsc` with GitHub-flavoured Markdown). Custom tags:
  - `<Callout>` renders a highlighted aside;
  - `<Prompt>` renders a copyable prompt block. The copy text comes from `textContent(children)` (`src/lib/text.ts`), which walks the MDX elements and joins their text. Before the fix it used `String(children)` and copied "[object Object]" for multi-line prompts.
  - every Markdown link becomes a `TrackedLink`.

### `actions.tsx`

- **`CopyButton`** copies the given text (or the page URL), shows "Copied" for about 2 seconds and then resets. It announces the change politely to screen readers and emits a `copy` analytics event.
- **`TrackedLink`** opens external links in a new tab with `noopener noreferrer` and adds a small arrow only to external and download links. Internal inline links stay plain underlined text inside sentences.
- **`VideoPlayer`** shows a placeholder until the visitor clicks "Load YouTube video". Only then is the privacy-enhanced `youtube-nocookie.com` iframe loaded (no autoplay). Outlines without a video say so honestly. Shorts use a portrait 9:16 frame.

### Analytics hook

All tracking goes through `track(event, label)`, which dispatches a browser `CustomEvent("insideai:analytics")`. No provider is connected. Listen to that event to wire one up.
