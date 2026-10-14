import { ViewTransition } from "react";

/**
 * Templates remount on every navigation (layouts persist), so wrapping the
 * page here lets React's <ViewTransition> play an exit animation on the old
 * page and an enter animation on the new one. The "page" classes are styled
 * in globals.css. Browsers without the View Transitions API swap instantly.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div className="page-shell">{children}</div>
    </ViewTransition>
  );
}
