# 15. Content system

**Files:** `content/**/*.mdx`, `src/lib/content.ts`, `scripts/validate-content.ts`, `scripts/new-content.ts`, `tests/content.test.ts`, `PUBLISHING.md`

## Where content lives

```
content/
  updates/    news-style editions with "stories"
  videos/     episode pages (format: Shorts | Explainers | Comparisons | Tutorials)
  guides/     evergreen explainers (need lastReviewed)
  resources/  prompts, checklists, workflows (often with a download)
  templates/  starting points copied by `npm run content:new`
```

Each file is MDX: YAML frontmatter between `---` lines, then Markdown with optional `<Callout>` and `<Prompt>` tags.

## `src/lib/content.ts`

- **`schema`** (Zod) defines every frontmatter field: slug, title, summary, dates (real `YYYY-MM-DD`), author, `draft`, `demo`, `featured`, category, tags, reading time, related entries, stories, YouTube ID (11 characters), format, prompt, download path and sources (HTTP/HTTPS only).
- **`readAll()`** reads every file and enforces rules beyond the schema: category valid for the collection, filename matches slug, updates need stories, videos need a matching format, published videos need a real YouTube ID unless they are demos, guides need `lastReviewed`, no future-dated published entries, downloads and images must exist in `public/`, slugs are unique, and `related` links must point to existing, non-draft entries. Any violation throws, which fails the build.
- **`allContent()`** returns non-draft entries, newest first. `getEntries(kind)`, `getEntry(kind, slug)`, `filterEntries()`, `relatedEntries()` and `formatDate()` build on it.

## Scripts

- `npm run content:new -- guides my-new-guide` creates a draft from the template.
- `npm run content:validate` validates everything. It also runs automatically before `npm run build`.

## Safety note

MDX can execute code. Only trusted editors should write content. Never compile untrusted submissions.
