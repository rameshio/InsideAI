import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import {
  kinds,
  Kind,
  getEntry,
  allContent,
  relatedEntries,
  formatDate,
} from "@/lib/content";
import { metadata, safeJson } from "@/lib/seo";
import { textContent } from "@/lib/text";
import { site } from "@/config/site";
import { CopyButton, TrackedLink, VideoPlayer } from "@/components/actions";
import { ContentCard } from "@/components/content-card";
import { Newsletter } from "@/components/newsletter";
export function generateStaticParams() {
  return allContent().map((e) => ({ collection: e.kind, slug: e.slug }));
}
async function resolve(params: Promise<{ collection: string; slug: string }>) {
  const { collection, slug } = await params;
  if (!kinds.includes(collection as Kind)) notFound();
  const e = getEntry(collection as Kind, slug);
  if (!e) notFound();
  return e;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const e = await resolve(params);
  return metadata(e.title, e.summary, `/${e.kind}/${e.slug}`);
}
export default async function Detail({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const e = await resolve(params);
  const related = relatedEntries(e);
  const structured =
    e.kind === "videos"
      ? e.youtubeId
        ? {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: e.title,
            description: e.summary,
            uploadDate: e.publishedAt || e.published,
            thumbnailUrl: `https://i.ytimg.com/vi/${e.youtubeId}/hqdefault.jpg`,
            embedUrl: `https://www.youtube-nocookie.com/embed/${e.youtubeId}`,
          }
        : null
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: e.title,
          description: e.summary,
          datePublished: e.publishedAt || e.published,
          dateModified: e.updated || e.publishedAt || e.published,
          author: { "@type": "Person", name: e.author },
          image: `${site.url}/opengraph-image`,
          mainEntityOfPage: `${site.url}/${e.kind}/${e.slug}`,
        };
  return (
    <div className="wrap detail">
      {structured && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(structured) }}
        />
      )}
      <article className="reading">
        <Link className="back-link" href={`/${e.kind}`}>
          <ArrowLeft size={16} />
          Back to {e.kind}
        </Link>
        <header className="article-heading">
          <span className="eyebrow">
            {e.category}
            {e.demo ? " / Demonstration content" : ""}
          </span>
          <h1>{e.title}</h1>
          <p className="dek">{e.summary}</p>
          <div className="byline">
            <span className="avatar">RB</span>
            <div>
              <b>{e.author}</b>
              <span>
                Published {formatDate(e.published)} · {e.readingTime} min read
              </span>
              {e.updated && <span>Updated {formatDate(e.updated)}</span>}
              {e.issueDate && (
                <span>Editorial issue: {formatDate(e.issueDate)}</span>
              )}
              {e.lastReviewed && (
                <span>Last reviewed {formatDate(e.lastReviewed)}</span>
              )}
            </div>
            <CopyButton label="Copy link" />
          </div>
        </header>
        {e.demo && (
          <aside className="callout">
            {e.kind === "videos"
              ? "Demo episode outline. No recorded video is attached yet."
              : "An original evergreen demonstration of the Inside AI format. This is not a current news report."}
          </aside>
        )}
        {e.kind === "videos" && (
          <VideoPlayer
            id={e.youtubeId}
            title={e.title}
            portrait={e.format === "Shorts"}
          />
        )}
        <div className="prose">
          <MDXRemote
            source={e.body}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            components={{
              a: ({ href, children }) => (
                <TrackedLink href={href || "#"} event="source">
                  {children}
                </TrackedLink>
              ),
              Callout: ({ children }) => (
                <aside className="callout">{children}</aside>
              ),
              Prompt: ({ children }) => (
                <div className="prompt-block">
                  <pre>{children}</pre>
                  <CopyButton text={textContent(children).trim()} />
                </div>
              ),
            }}
          />
          {e.stories?.map((story, i) => (
            <section className="story" key={story.headline}>
              <span className="story-number">
                STORY {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{story.headline}</h2>
              {story.image && (
                <figure>
                  <Image
                    src={story.image}
                    alt={story.caption || story.headline}
                    width={1200}
                    height={675}
                    sizes="(max-width: 760px) 100vw, 770px"
                  />
                  <figcaption>
                    {story.caption} · {story.attribution}
                  </figcaption>
                </figure>
              )}
              <h3>What happened</h3>
              <p>{story.happened}</p>
              <h3>Why it matters</h3>
              <p>{story.matters}</p>
              <h3>What to keep in mind</h3>
              <p>{story.limitations}</p>
              <TrackedLink href={story.sourceUrl} event="source">
                Source: {story.sourceName}
              </TrackedLink>
            </section>
          ))}
          {e.prompt && (
            <div className="prompt-block">
              <span className="eyebrow">Try this prompt</span>
              <pre>{e.prompt}</pre>
              <CopyButton text={e.prompt} />
            </div>
          )}
          {e.download && (
            <TrackedLink
              className="button"
              href={e.download}
              download
              event="resource"
            >
              Download the resource
            </TrackedLink>
          )}
          {!!e.sources.length && (
            <section className="sources">
              <h2>Further reading & sources</h2>
              {e.sources.map((s) => (
                <TrackedLink key={s.url} href={s.url} event="source">
                  {s.name}
                </TrackedLink>
              ))}
            </section>
          )}
        </div>
      </article>
      {!!related.length && (
        <section className="related">
          <div className="section-heading">
            <h2>Keep exploring.</h2>
          </div>
          <div className="archive-grid">
            {related.map((entry) => (
              <ContentCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
      )}
      <Newsletter compact />
    </div>
  );
}
