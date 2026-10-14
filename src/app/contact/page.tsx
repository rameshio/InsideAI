import { site } from "@/config/site";
import { metadata } from "@/lib/seo";
export const generateMetadata = () =>
  metadata(
    "Contact",
    "Questions, corrections, and ideas for Inside AI.",
    "/contact",
  );
export default function Page() {
  return (
    <div className="wrap">
      <div className="support-page">
        <header className="page-heading">
          <span className="eyebrow">Start a conversation</span>
          <h1>What’s on your mind?</h1>
          <p>
            Have a topic suggestion, a question, or a correction? I’d like to
            hear it.
          </p>
        </header>
        <div className="prose">
          <h2>Connect with Ramesh</h2>
          <p>
            Find Inside AI on Instagram at{" "}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              @{site.instagramHandle}
            </a>
            .
          </p>
          {site.contactEmail ? (
            <p>
              Email{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          ) : (
            <aside className="callout">
              A contact email has not been added yet. Please use Instagram in
              the meantime.
            </aside>
          )}
          <h2>Corrections</h2>
          <p>
            Please include the article title, the statement you’re referring to,
            and a source that explains the issue. Clear corrections help make
            this a more useful resource for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
