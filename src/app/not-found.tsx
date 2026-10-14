import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap not-found">
      <span className="eyebrow">404 / Outside the frame</span>
      <h1>This page isn’t here.</h1>
      <p>It may have moved, or it may still be an unpublished draft.</p>
      <Link className="button" href="/">
        Back to Inside AI →
      </Link>
    </div>
  );
}
