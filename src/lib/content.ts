import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { z } from "zod";
export const kinds = ["updates", "videos", "guides", "resources"] as const;
export type Kind = (typeof kinds)[number];
export const categories = [
  "Models",
  "Tools",
  "Agents",
  "Research",
  "Industry",
] as const;
export const collectionCategories = {
  updates: categories,
  videos: ["Shorts", "Explainers", "Comparisons", "Tutorials"],
  guides: ["Fundamentals", "Comparisons", "Tutorials"],
  resources: ["Prompts", "Checklists", "Workflows"],
} satisfies Record<Kind, readonly string[]>;
const date = z
  .string()
  .refine(
    (v) =>
      /^\d{4}-\d{2}-\d{2}$/.test(v) &&
      !Number.isNaN(Date.parse(v)) &&
      new Date(v).toISOString().slice(0, 10) === v,
    "Use a real YYYY-MM-DD date",
  );
const url = z.url().refine((v) => /^https?:\/\//.test(v), "Use HTTP(S) URLs");
const story = z
  .object({
    headline: z.string().min(1),
    happened: z.string().min(1),
    matters: z.string().min(1),
    limitations: z.string().min(1),
    sourceName: z.string().min(1),
    sourceUrl: url,
    image: z
      .string()
      .regex(/^\/images\/[a-z0-9-]+\.(webp|png|jpg|svg)$/)
      .optional(),
    caption: z.string().optional(),
    attribution: z.string().optional(),
  })
  .refine(
    (s) => !s.image || (!!s.caption && !!s.attribution),
    "Images require caption and attribution",
  );
export const schema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  published: date,
  publishedAt: z.iso.datetime().optional(),
  updated: date.optional(),
  issueDate: date.optional(),
  lastReviewed: date.optional(),
  author: z.string().min(1),
  draft: z.boolean(),
  demo: z.boolean(),
  featured: z.boolean().default(false),
  category: z.string(),
  tags: z.array(z.string()).min(1),
  readingTime: z.number().int().positive(),
  related: z
    .array(z.string().regex(/^(updates|videos|guides|resources)\/[a-z0-9-]+$/))
    .default([]),
  stories: z.array(story).optional(),
  youtubeId: z
    .string()
    .regex(/^[A-Za-z0-9_-]{11}$/)
    .optional(),
  format: z
    .enum(["Shorts", "Explainers", "Comparisons", "Tutorials"])
    .optional(),
  duration: z.string().optional(),
  prompt: z.string().optional(),
  download: z
    .string()
    .regex(/^\/downloads\/[a-z0-9-]+\.(txt|md|pdf|csv)$/)
    .optional(),
  sources: z.array(z.object({ name: z.string(), url })).default([]),
});
export type Entry = z.infer<typeof schema> & { kind: Kind; body: string };
export function readAll(root = path.join(process.cwd(), "content")): Entry[] {
  const entries: Entry[] = [];
  for (const kind of kinds) {
    const dir = path.join(/* turbopackIgnore: true */ root, kind);
    if (!fs.existsSync(/* turbopackIgnore: true */ dir)) continue;
    for (const name of fs
      .readdirSync(/* turbopackIgnore: true */ dir)
      .filter((n) => n.endsWith(".mdx"))) {
      const raw = fs.readFileSync(
        /* turbopackIgnore: true */ path.join(
          /* turbopackIgnore: true */ dir,
          name,
        ),
        "utf8",
      );
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (!match) throw new Error(`Missing frontmatter: ${name}`);
      const data = parse(match[1]);
      const content = match[2];
      const meta = schema.parse(data);
      if (
        !(collectionCategories[kind] as readonly string[]).includes(
          meta.category,
        )
      )
        throw new Error(`Unknown ${kind} category: ${meta.category}`);
      if (name !== `${meta.slug}.mdx`)
        throw new Error(`Filename must match slug: ${name}`);
      if (
        kind === "updates" &&
        (!categories.includes(meta.category as (typeof categories)[number]) ||
          !meta.stories?.length)
      )
        throw new Error(`Invalid update stories/category: ${name}`);
      if (kind === "videos" && (!meta.format || meta.category !== meta.format))
        throw new Error(`Video needs matching format/category: ${name}`);
      if (kind === "videos" && !meta.draft && !meta.demo && !meta.youtubeId)
        throw new Error(`Published videos need a real YouTube ID: ${name}`);
      if (kind === "guides" && !meta.lastReviewed)
        throw new Error(`Guide needs lastReviewed: ${name}`);
      if (meta.publishedAt && meta.publishedAt.slice(0, 10) !== meta.published)
        throw new Error(
          `Publication timestamp must match publication date (UTC): ${name}`,
        );
      if (meta.updated && meta.updated < meta.published)
        throw new Error(`Updated precedes publication: ${name}`);
      if (!meta.draft && meta.published > new Date().toISOString().slice(0, 10))
        throw new Error(`Future publication must be draft: ${name}`);
      if (
        meta.download &&
        !fs.existsSync(path.join(process.cwd(), "public", meta.download))
      )
        throw new Error(`Missing download: ${meta.download}`);
      for (const s of meta.stories || [])
        if (
          s.image &&
          !fs.existsSync(path.join(process.cwd(), "public", s.image))
        )
          throw new Error(`Missing story image: ${s.image}`);
      entries.push({ ...meta, kind, body: content });
    }
  }
  const ids = entries.map((e) => `${e.kind}/${e.slug}`);
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate slugs");
  for (const e of entries)
    for (const ref of e.related) {
      const target = entries.find((t) => `${t.kind}/${t.slug}` === ref);
      if (!target) throw new Error(`Broken relationship: ${ref}`);
      if (!e.draft && target.draft)
        throw new Error(`Public content links to draft: ${ref}`);
    }
  return entries;
}
export function allContent() {
  return readAll()
    .filter((e) => !e.draft)
    .sort(
      (a, b) =>
        (b.publishedAt || b.published).localeCompare(
          a.publishedAt || a.published,
        ) || a.slug.localeCompare(b.slug),
    );
}
export function getEntries(kind: Kind) {
  return allContent().filter((e) => e.kind === kind);
}
export function getEntry(kind: Kind, slug: string) {
  return getEntries(kind).find((e) => e.slug === slug);
}
export function filterEntries(
  entries: Entry[],
  query: string,
  category: string,
) {
  const q = query.trim().toLowerCase();
  return entries.filter(
    (e) =>
      (!category || e.category === category) &&
      (!q ||
        [e.title, e.summary, ...e.tags].join(" ").toLowerCase().includes(q)),
  );
}
export function relatedEntries(entry: Entry) {
  return allContent().filter((e) =>
    entry.related.includes(`${e.kind}/${e.slug}`),
  );
}
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
