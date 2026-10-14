"use client";
import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { track } from "./actions";
export function NewsletterForm({
  compact = false,
  enabled = false,
}: {
  compact?: boolean;
  enabled?: boolean;
}) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [started] = useState(() => Date.now());
  // Unique per instance, so two forms on one page never share an id.
  const emailId = useId();
  return (
    <section className={`newsletter ${compact ? "compact" : ""}`}>
      <div>
        <span className="eyebrow">A little clarity in your inbox</span>
        <h2>Keep up. Without the noise.</h2>
        <p>
          Useful AI updates, clear explanations, and something you can actually
          try.
        </p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setStatus("");
          const data = new FormData(e.currentTarget);
          try {
            const res = await fetch("/api/newsletter", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.get("email"),
                consent: data.get("consent") === "on",
                website: data.get("website"),
                started,
              }),
            });
            const body = await res.json();
            setStatus(body.message);
            if (res.ok) track("signup", "newsletter");
          } catch {
            setStatus("Could not connect. Please try again.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <label className="sr-only" htmlFor={emailId}>
          Email address
        </label>
        <div className="email-row">
          <input
            id={emailId}
            autoComplete="email"
            name="email"
            type="email"
            placeholder="Your email address"
            required
            maxLength={254}
          />
          <button type="submit" className="chip" disabled={busy}>
            {busy ? (
              "Sending…"
            ) : (
              <>
                <span>Get AI Updates</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
        <div className="trap" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="consent">
          <input type="checkbox" name="consent" required />
          {site.newsletter.consent}
        </label>
        <p className="form-status" role="status">
          {status ||
            (enabled
              ? "Confirm your email to join. Unsubscribe at any time."
              : "Newsletter setup is in progress. Subscriptions are unavailable until connected.")}
        </p>
      </form>
    </section>
  );
}
