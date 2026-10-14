"use client";
import { useEffect, useState } from "react";
import { Copy, Check, Play, ArrowUpRight } from "lucide-react";

const COPY_FEEDBACK_MS = 2200;
const isExternal = (href: string) => /^https?:\/\//.test(href);

export function track(event: string, label: string) {
  window.dispatchEvent(
    new CustomEvent("insideai:analytics", { detail: { event, label } }),
  );
}

export function CopyButton({
  text,
  label = "Copy prompt",
}: {
  text?: string;
  label?: string;
}) {
  const [state, setState] = useState("");

  // Return to the idle label after a moment so the button can be reused.
  useEffect(() => {
    if (!state) return;
    const id = setTimeout(() => setState(""), COPY_FEEDBACK_MS);
    return () => clearTimeout(id);
  }, [state]);

  return (
    <button
      type="button"
      className="small-button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text || window.location.href);
          setState("Copied");
          track("copy", label);
        } catch {
          setState("Copy unavailable");
        }
      }}
    >
      {state === "Copied" ? <Check size={15} /> : <Copy size={15} />}{" "}
      <span aria-live="polite">{state || label}</span>
    </button>
  );
}

export function TrackedLink({
  href,
  event,
  children,
  download,
  className,
}: {
  href: string;
  event: string;
  children: React.ReactNode;
  download?: boolean;
  className?: string;
}) {
  const external = !download && isExternal(href);
  return (
    <a
      href={href}
      className={className}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => track(event, href)}
    >
      {children}
      {(external || download) && (
        <ArrowUpRight className="link-arrow" size={15} />
      )}
    </a>
  );
}

export function VideoPlayer({
  id,
  title,
  portrait,
}: {
  id?: string;
  title: string;
  portrait: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`player ${portrait ? "portrait" : ""}`}>
      {id && loaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=0`}
          title={title}
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="player-placeholder">
          <span className="play-disc static">
            <Play fill="currentColor" size={26} />
          </span>
          <h2>{title}</h2>
          {id ? (
            <button
              type="button"
              className="button"
              onClick={() => {
                setLoaded(true);
                track("video", id);
              }}
            >
              Load YouTube video
            </button>
          ) : (
            <p>Video outline. Recording coming next.</p>
          )}
          <span>
            {id
              ? "Loading the player connects to YouTube."
              : "A demonstration of the Inside AI video format."}
          </span>
        </div>
      )}
    </div>
  );
}
