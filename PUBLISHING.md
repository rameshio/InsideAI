# Inside AI publishing guide

## Workflow

Research → draft update/guide → create video → add video and resources → review → publish.

Research primary sources. Record the event date separately from the date you publish. Distinguish verified facts from implications and uncertainty. Do not publish unchecked announcements, pricing, product limits, or benchmarks.

## Create an entry

```sh
npm run content:new -- updates my-editorial-issue
npm run content:new -- guides my-practical-guide
npm run content:new -- videos my-video
npm run content:new -- resources my-resource
```

Templates live in `content/templates`. Entries use YAML frontmatter (JSON is also supported) followed by MDX. The filename must match `slug`. Drafts are excluded from all public queries, detail routes, related content, RSS, sitemap, and generated static routes. Local previews do not expose drafts either; review draft text in your editor or a separate authenticated CMS preview in the future.

## Required metadata

Every entry: `slug`, `title`, `summary`, `published`, `author`, `draft`, `demo`, `category`, `tags`, `readingTime`. Use real `YYYY-MM-DD` dates in quotes. `related` is an array of identifiers such as `guides/rag-explained`. Slugs are unique within a collection and must be lowercase with hyphens. No invalid URLs, missing files, or broken relationships are accepted.

- **Updates:** category is exactly Models, Tools, Agents, Research, or Industry. `stories` must contain at least one item, each with `headline`, `happened`, `matters`, `limitations`, `sourceName`, `sourceUrl`. `issueDate` is optional and separate from publication; `updated` is optional. An optional story image uses a local `/images/...` path and requires caption and attribution.
- **Videos:** `format` and `category` must match: Shorts, Explainers, Comparisons, or Tutorials. Optional `youtubeId` is the real 11-character ID; optional `duration` is display text. Use the actual upload date in `published`. Without an ID, the page honestly shows an outline. With one, it offers click-to-load playback. Portrait Shorts and landscape videos are supported.
- **Guides:** require `lastReviewed`. Use Fundamentals, Comparisons, or Tutorials consistently. Explain limitations and update review dates when product instructions change.
- **Resources:** use Prompts, Checklists, or Workflows. Optional `prompt` renders a working copy button; optional `download` references a real file under `public/downloads`. Explain use and limitations in the body.

`sources` may contain `{name, url}` entries. A public entry cannot link to a draft. Validation fails for future publication dates unless the entry is still a draft. Issue dates do not overwrite publication dates. Avoid dates in titles unless they match the editorial issue you describe.

Optional `publishedAt` is an actual UTC ISO timestamp, such as `2026-10-13T15:30:00Z`, and must match the UTC `published` date. If omitted, structured data uses the date without inventing a publication time. Optional `featured: true` selects the featured video. Category lists are centralized in `src/lib/content.ts`; extend them deliberately to keep the taxonomy consistent.

## MDX formatting

The page generates the H1, summary, author, and metadata. Start body headings with `##`. Use ordinary Markdown lists, GFM comparison tables, and fenced code blocks. `<Callout>Useful caveat</Callout>` renders a reading callout. `<Prompt>Plain text prompt</Prompt>` adds a copy action. Alternatively, put a multiline prompt in frontmatter using YAML `|`.

Do not put secrets in content. MDX is trusted source code, not a user submission format. Raw JSX should be reviewed carefully. Keep animations out of article bodies.

## Review and publish

1. Verify each source URL, dates, and stated limitations.
2. Check factual claims and examples. Remove sample placeholders.
3. Add relationships to the relevant guide, video, and resource.
4. Add any downloadable files, then test the download and copy actions.
5. Set `demo: false` only for real editorial work. Set `draft: false` only after review.
6. Run `npm run content:validate`, `npm test`, and `npm run build`.
7. Review the page on desktop and mobile. Publish through your hosting workflow when authorized.

Changing files requires a production rebuild. There is no custom admin dashboard.

## CMS migration

`src/lib/content.ts` owns validation, retrieval, public filtering, search, and relationships. Replace the filesystem read behind that access layer with a CMS fetch, preserve the same schemas and draft rules, and keep pages independent of the CMS SDK. Add authentication for editing and preview. Only trusted editors should supply MDX; rich text is safer for broader contributor access. Add on-demand revalidation after a verified publish webhook if the hosting setup supports it.

## Optional YouTube syncing

Use a server-only YouTube Data API key and a manually configured channel ID. Fetch official video IDs, titles, thumbnails, upload timestamps, and durations into draft metadata. Keep written summaries, sources, and guide/resource relationships under editorial review. Account for quotas and sync failures. Do not overwrite manually edited content or publish automatically.
