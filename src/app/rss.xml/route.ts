import { getEntries } from "@/lib/content";
import { site } from "@/config/site";
const xml = (v: string) =>
  v.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Inside AI</title><link>${xml(site.url)}</link><description>${xml(site.description)}</description>${getEntries(
      "updates",
    )
      .map(
        (e) =>
          `<item><title>${xml(e.title)}</title><link>${xml(`${site.url}/updates/${e.slug}`)}</link><guid>${xml(`${site.url}/updates/${e.slug}`)}</guid><description>${xml(e.summary)}</description><pubDate>${new Date(`${e.published}T12:00:00Z`).toUTCString()}</pubDate></item>`,
      )
      .join("")}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
