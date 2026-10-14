import assert from "node:assert/strict";
import { allContent, kinds } from "../src/lib/content";
async function main() {
  const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
  const paths = [
    "/",
    ...kinds.map((k) => `/${k}`),
    "/about",
    "/contact",
    "/privacy",
    "/newsletter",
    "/sitemap.xml",
    "/rss.xml",
    "/robots.txt",
    "/opengraph-image",
    ...allContent().map((e) => `/${e.kind}/${e.slug}`),
    ...allContent()
      .filter((e) => e.download)
      .map((e) => e.download!),
  ];
  for (const path of paths) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    if (res.headers.get("Content-Type")?.includes("text/html")) {
      const html = await res.text();
      assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `One H1: ${path}`);
      assert(
        !html.includes("Unverified News — Editorial Draft"),
        `Draft leaked: ${path}`,
      );
    }
  }
  for (const path of ["/sitemap.xml", "/rss.xml"])
    assert(
      !(await (await fetch(base + path)).text()).includes(
        "unverified-news-draft",
      ),
    );
  assert.equal(
    (await fetch(base + "/updates/unverified-news-draft")).status,
    404,
  );
  const searched = (
    await (await fetch(base + "/updates?q=fluent&category=Models")).text()
  ).replace(/<!--[\s\S]*?-->/g, "");
  assert(searched.includes("1 entry"));
  assert(!searched.includes("Your Documents, in the Loop"));
  assert(
    (await (await fetch(base + "/resources?q=no-match")).text()).includes(
      "No matches yet.",
    ),
  );
  const post = (body: unknown, origin = base) =>
    fetch(base + "/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin,
        "x-forwarded-for": "127.0.0.2",
      },
      body: JSON.stringify(body),
    });
  assert.equal(
    (await post({ email: "bad", consent: true, started: Date.now() - 5000 }))
      .status,
    400,
  );
  assert.equal(
    (
      await post({
        email: "test@example.com",
        consent: true,
        website: "spam",
        started: Date.now() - 5000,
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await post(
        {
          email: "test@example.com",
          consent: true,
          started: Date.now() - 5000,
        },
        "https://wrong.example",
      )
    ).status,
    403,
  );
  if (!process.env.BREVO_API_KEY) {
    const unavailable = await post({
      email: "test@example.com",
      consent: true,
      started: Date.now() - 5000,
    });
    assert.equal(unavailable.status, 503);
    assert((await unavailable.json()).message.includes("not available"));
  }
  console.log(
    `Passed ${paths.length} page/file checks, metadata H1 checks, search, drafts, feeds, and API errors.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
