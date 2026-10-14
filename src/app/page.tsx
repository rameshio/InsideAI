import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, BookOpen, Download } from "lucide-react";
import { getEntries } from "@/lib/content";
import { metadata } from "@/lib/seo";
import { ContentCard, Art } from "@/components/content-card";
import { Newsletter } from "@/components/newsletter";
import { SpaceHero } from "@/components/space-hero";
import { site } from "@/config/site";

export const generateMetadata = () => ({
  ...metadata(
    "Inside AI: A clearer view of what’s next",
    site.description,
    "/",
  ),
  // Absolute, so the layout\'s "%s | Inside AI" template doesn\'t repeat the brand.
  title: { absolute: "Inside AI: A clearer view of what’s next" },
});

const TOPICS = [
  "Models",
  "Tools",
  "Agents",
  "Research",
  "Prompts",
  "Workflows",
  "What’s next",
];

function SectionTitle({
  title,
  href,
  link,
}: {
  title: string;
  href: string;
  link: string;
}) {
  return (
    <div className="section-heading reveal">
      <h2>{title}</h2>
      <Link className="text-link" href={href}>
        {link}
        <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}

export default function Home() {
  const updates = getEntries("updates");
  const guides = getEntries("guides");
  const videos = getEntries("videos");
  const resources = getEntries("resources");
  const featuredVideo =
    videos.find((e) => e.featured) ||
    videos.find((e) => e.format === "Explainers") ||
    videos[0];
  const shorts = videos.filter((e) => e.format === "Shorts").slice(0, 3);

  return (
    <>
      <SpaceHero />

      <div className="topic-marquee" role="region" aria-label="Topics covered">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {TOPICS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <section className="section wrap">
        <SectionTitle
          title="Know what matters."
          href="/updates"
          link="All updates"
        />
        <div className="briefing-grid stagger">
          {updates.slice(0, 3).map((e, i) => (
            <ContentCard
              key={e.slug}
              entry={e}
              index={i}
              visual
              featured={i === 0}
            />
          ))}
        </div>
        <p className="section-note">
          An early look at Inside AI. These evergreen editions are demonstration
          content, not current news.
        </p>
      </section>

      <section className="watch-section">
        <div className="wrap section">
          <SectionTitle
            title="Big ideas. Clear explanations."
            href="/videos"
            link="Explore videos"
          />
          <div className="watch-grid">
            <Link
              href={featuredVideo ? `/videos/${featuredVideo.slug}` : "/videos"}
              className="featured-video reveal"
              data-tilt
            >
              <Art variant={2} video />
              <div className="video-overlay">
                <span className="tag">
                  {featuredVideo?.format || "Inside AI"} /{" "}
                  {featuredVideo?.demo ? "Demo outline" : "Featured episode"}
                </span>
                <h3>{featuredVideo?.title || "New episodes coming next."}</h3>
                <span className="text-link">
                  Explore the episode
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </Link>
            <div className="shorts stagger">
              <div className="shorts-heading">
                <Play size={16} />
                <span>A little AI. A little quicker.</span>
              </div>
              {shorts.map((e, i) => (
                <Link
                  className="short-row"
                  key={e.slug}
                  href={`/videos/${e.slug}`}
                >
                  <div className="short-thumbnail">
                    <Art variant={i + 1} />
                    <Play size={18} />
                  </div>
                  <div>
                    <span className="tag">
                      {e.format} / {e.demo ? "Demo outline" : "Episode"}
                    </span>
                    <h3>{e.title}</h3>
                  </div>
                  <ArrowUpRight className="row-arrow" size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <SectionTitle
          title="Go from curious to capable."
          href="/guides"
          link="All guides"
        />
        <div className="guide-home-grid">
          <Link
            className="guide-feature reveal"
            href="/guides/rag-explained"
            data-tilt
          >
            <BookOpen size={26} />
            <span className="tag">The practical guide / Demo</span>
            <h3>
              Your documents.
              <br />
              Better AI answers.
            </h3>
            <p>
              Understand retrieval-augmented generation, one step at a time.
            </p>
            <span className="text-link">
              Explore RAG
              <ArrowUpRight size={18} />
            </span>
            <div className="document-art" aria-hidden="true">
              <span>Your documents</span>
              <div className="doc-lines">
                <i />
                <i />
                <i />
              </div>
              <span>Retrieval</span>
              <b>A grounded answer</b>
            </div>
          </Link>
          <div className="guide-list stagger">
            {guides
              .filter((e) => e.slug !== "rag-explained")
              .map((e, i) => (
                <Link key={e.slug} href={`/guides/${e.slug}`}>
                  <span className="guide-number">0{i + 1}</span>
                  <div>
                    <span className="tag">{e.category}</span>
                    <h3>{e.title}</h3>
                    <p>{e.summary}</p>
                  </div>
                  <ArrowUpRight className="row-arrow" size={20} />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="resource-section wrap">
        <div className="resource-intro reveal">
          <span className="eyebrow">Free resources</span>
          <h2>
            Good ideas. <span className="accent-word">Ready to use.</span>
          </h2>
          <p>
            Prompts, checklists, and small workflows. Free to take. Built to be
            useful.
          </p>
          <Link className="text-link" href="/resources">
            Open the resource shelf
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="resource-shelf stagger">
          {resources.slice(0, 3).map((e) => (
            <Link key={e.slug} href={`/resources/${e.slug}`}>
              <span className="resource-icon">
                <Download size={22} />
              </span>
              <span className="resource-title">
                <span className="tag">{e.category}</span>
                <h3>{e.title}</h3>
              </span>
              <ArrowUpRight className="row-arrow" size={22} />
            </Link>
          ))}
        </div>
      </section>

      <section className="creator wrap">
        <div className="creator-visual reveal" data-tilt aria-hidden="true">
          <Image
            src="/brand/insideai-logo-512.png"
            alt=""
            width={512}
            height={512}
            sizes="(max-width: 760px) 80vw, 420px"
          />
        </div>
        <div className="reveal">
          <p className="kicker">Hello, I’m Ramesh.</p>
          <h2>Making AI a little more human.</h2>
          <p>
            I’m Ramesh Badugu, the creator behind Inside AI. This is a space for
            clear explanations, thoughtful updates, and practical ways to use
            AI, wherever you’re starting from.
          </p>
          <Link className="text-link" href="/about">
            Get to know Inside AI
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <div className="wrap reveal">
        <Newsletter />
      </div>
    </>
  );
}
