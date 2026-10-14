import Link from "next/link";
import Image from "next/image";
import { metadata } from "@/lib/seo";
import { site } from "@/config/site";
export const generateMetadata = () =>
  metadata(
    "About Inside AI",
    "Meet Ramesh Badugu and the idea behind Inside AI.",
    "/about",
  );
export default function Page() {
  return (
    <div className="wrap">
      <div className="support-page">
        <header className="page-heading">
          <span className="eyebrow">The person behind the perspective</span>
          <h1>AI is for the curious.</h1>
          <p>I’m Ramesh Badugu. Welcome to Inside AI.</p>
        </header>
        <Image
          className="brand-avatar"
          src="/brand/insideai-logo-512.png"
          alt=""
          width={512}
          height={512}
          sizes="140px"
        />
        <div className="prose">
          <h2>Understand. Explore. Build.</h2>
          <p>
            Inside AI connects clear explanations, useful tools, practical
            guides, and video lessons. It’s built for beginners, students,
            creators, and developers who want to understand AI and use it
            thoughtfully.
          </p>
          <p>
            You don’t need to know every technical term to start. You do need a
            willingness to ask questions, try things, and check the answers.
          </p>
          <h2>Our editorial promise</h2>
          <p>
            We separate what happened from why it matters. We link to original
            sources, call out limitations, and keep review dates visible for
            content about changing products. Demonstrations are labeled, and
            unverified announcements stay in drafts.
          </p>
          <h2>A brand in the making</h2>
          <p>
            This first edition includes original evergreen demonstrations and
            planned video outlines. As the channel grows, this will become a
            connected home for its published work.
          </p>
        </div>
        <div className="support-links">
          <a
            className="button"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow @{site.instagramHandle} ↗
          </a>
          <Link className="text-link" href="/guides">
            Start with a guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
