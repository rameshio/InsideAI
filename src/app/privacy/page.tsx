import { metadata } from "@/lib/seo";
import { site } from "@/config/site";
export const generateMetadata = () =>
  metadata(
    "Privacy",
    "Sample privacy information for Inside AI; review before launch.",
    "/privacy",
  );
export default function Page() {
  return (
    <div className="wrap">
      <div className="support-page">
        <header className="page-heading">
          <span className="eyebrow">Privacy / Draft for review</span>
          <h1>Your information matters.</h1>
        </header>
        <aside className="callout">
          Sample legal text — review and adapt this page before public launch.
          This is not a completed legal policy.
        </aside>
        <div className="prose">
          <h2>Newsletter information</h2>
          <p>
            If you subscribe when the newsletter is connected, your email
            address is sent to Brevo to request a confirmation email and manage
            the subscription. You can unsubscribe through newsletter emails. The
            site does not store a separate mailing list.
          </p>
          <h2>Spam prevention and hosting</h2>
          <p>
            The server uses temporary in-memory attempt counts keyed by network
            address to limit automated submissions. Hosting providers may
            maintain request logs. Configure retention and access settings
            before launch.
          </p>
          <h2>Video players and external links</h2>
          <p>
            YouTube players are loaded only after you choose to load a video.
            This connects to YouTube, whose privacy terms apply. External source
            and social links connect you to the respective websites.
          </p>
          <h2>Analytics</h2>
          <p>
            No analytics service is connected by default. The site emits browser
            events for signup, video, resource, copy, and source actions. These
            events contain an action label, not an email address. Review any
            analytics integration and consent requirements before enabling it.
          </p>
          <h2>Requests and contact</h2>
          <p>
            {site.contactEmail
              ? `Send privacy requests to ${site.contactEmail}.`
              : "A privacy contact address, controller details, applicable jurisdiction, and retention policy must be added before launch."}
          </p>
        </div>
      </div>
    </div>
  );
}
