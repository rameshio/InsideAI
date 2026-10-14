import { ViewTransition } from "react";
import Link from "next/link";
import Form from "next/form";
import { notFound } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import {
  kinds,
  Kind,
  getEntries,
  filterEntries,
  collectionCategories,
} from "@/lib/content";
import { metadata } from "@/lib/seo";
import { ContentCard, Art } from "@/components/content-card";
import { Newsletter } from "@/components/newsletter";
const descriptions: Record<Kind, { title: string; summary: string }> = {
  updates: {
    title: "A clearer signal.",
    summary:
      "Context, implications, and the questions worth asking. Explore the Inside AI editorial archive.",
  },
  videos: {
    title: "Watch. Understand. Try.",
    summary:
      "Big ideas explained simply, quick lessons, and practical walkthroughs. Initial episodes are clearly labeled video outlines.",
  },
  guides: {
    title: "From curious to capable.",
    summary:
      "Understand the fundamentals, compare your options, and build something useful.",
  },
  resources: {
    title: "Your next step, made easier.",
    summary:
      "Useful prompts, thoughtful checklists, and practical workflows. Free to copy and download.",
  },
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!kinds.includes(collection as Kind)) return {};
  const d = descriptions[collection as Kind];
  return metadata(
    collection[0].toUpperCase() + collection.slice(1),
    d.summary,
    `/${collection}`,
  );
}
export default async function Archive({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { collection } = await params;
  if (!kinds.includes(collection as Kind)) notFound();
  const kind = collection as Kind;
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const category = typeof sp.category === "string" ? sp.category : "";
  const requestedPage = Number(sp.page);
  const page = Number.isFinite(requestedPage)
    ? Math.max(1, Math.floor(requestedPage))
    : 1;
  const all = getEntries(kind);
  const featured =
    all.find((e) => e.featured) || all.find((e) => e.format === "Explainers");
  const filtered = filterEntries(all, q, category);
  const shown = filtered.slice(0, page * 6);
  const filters = collectionCategories[kind];
  const href = (c: string, p = 1) =>
    `/${kind}?${new URLSearchParams({ ...(q ? { q } : {}), ...(c ? { category: c } : {}), ...(p > 1 ? { page: String(p) } : {}) })}`;
  return (
    <div className="wrap archive">
      <header className="page-heading">
        <span className="eyebrow">Inside AI / {kind}</span>
        <h1>{descriptions[kind].title}</h1>
        <p>{descriptions[kind].summary}</p>
      </header>
      {kind === "videos" && featured && !q && !category && (
        <Link
          className="library-feature reveal"
          href={`/videos/${featured.slug}`}
          data-tilt
        >
          <Art variant={2} video />
          <div>
            <span className="tag">
              Featured {featured.demo ? "demo outline" : "video"} /{" "}
              {featured.format}
            </span>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <span className="text-link">Explore the episode →</span>
          </div>
        </Link>
      )}
      <Form className="search-form" action={`/${kind}`} scroll={false}>
        <Search size={19} />
        <label className="sr-only" htmlFor="search">
          Search {kind}
        </label>
        <input
          key={q}
          id="search"
          name="q"
          defaultValue={q}
          placeholder={`Search ${kind}, topics, and tags…`}
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button type="submit" className="small-button">
          Search
          <ArrowRight size={15} />
        </button>
      </Form>
      <nav className="filters" aria-label="Category filters">
        <Link
          aria-current={!category ? "page" : undefined}
          className={`chip ${!category ? "active" : ""}`}
          href={href("")}
          scroll={false}
        >
          All {kind}
        </Link>
        {filters.map((c) => (
          <Link
            key={c}
            aria-current={category === c ? "page" : undefined}
            className={`chip ${category === c ? "active" : ""}`}
            href={href(c)}
            scroll={false}
          >
            {c}
          </Link>
        ))}
      </nav>
      <div className="archive-count">
        <span>
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          {q && ` for “${q}”`}
        </span>
        <span>Newest first ↓</span>
      </div>
      <ViewTransition
        key={`${q}|${category}`}
        enter="results"
        exit="results"
        default="none"
      >
        {shown.length ? (
          <div className="archive-grid">
            {shown.map((e, i) => (
              <ContentCard
                key={e.slug}
                entry={e}
                index={i}
                visual={kind === "updates" || kind === "videos"}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={32} />
            <h2>No matches yet.</h2>
            <p>
              Try another topic or clear the filters to explore the collection.
            </p>
            <Link className="button" href={`/${kind}`}>
              Clear search & filters
            </Link>
          </div>
        )}
      </ViewTransition>
      {shown.length < filtered.length && (
        <Link
          className="button load-more"
          href={href(category, page + 1)}
          scroll={false}
        >
          Load more
        </Link>
      )}
      <Newsletter compact />
    </div>
  );
}
