import { Newsletter } from "@/components/newsletter";
import { metadata } from "@/lib/seo";
export const generateMetadata = () =>
  metadata(
    "Get AI Updates",
    "Useful AI updates and practical ideas delivered by email.",
    "/newsletter",
  );
export default function Page() {
  return (
    <div className="wrap">
      <div className="support-page">
        <header className="page-heading">
          <span className="eyebrow">The Inside AI newsletter</span>
          <h1>
            A little clarity.
            <br />A lot less noise.
          </h1>
          <p>
            Thoughtful AI updates, ideas you can try, and explanations that make
            things click.
          </p>
        </header>
        <Newsletter />
        <div className="prose">
          <h2>What to expect</h2>
          <p>
            Context behind the headlines, practical guides, and useful
            resources. The newsletter is being set up; the form will tell you
            honestly when subscriptions become available.
          </p>
          <p>
            When connected, you’ll confirm your address by email before joining.
            Unsubscribe whenever you like.
          </p>
        </div>
      </div>
    </div>
  );
}
