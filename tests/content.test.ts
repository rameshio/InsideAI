import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  allContent,
  readAll,
  getEntry,
  getEntries,
  filterEntries,
  relatedEntries,
  schema,
} from "../src/lib/content";
test("drafts are absent from the public content layer and detail lookup", () => {
  assert(readAll().some((e) => e.draft));
  assert(allContent().every((e) => !e.draft));
  assert.equal(getEntry("updates", "unverified-news-draft"), undefined);
});
test("search checks titles, summaries and tags, categories are composed with query", () => {
  const entries = getEntries("updates");
  assert(filterEntries(entries, "fluent", "Models").length === 1);
  assert(filterEntries(entries, "critical eye", "Models").length === 1);
  assert(filterEntries(entries, "beginners", "").length === entries.length);
  assert.equal(filterEntries(entries, "fluent", "Research").length, 0);
  assert.equal(filterEntries(entries, "no-match", "").length, 0);
});
test("relationships resolve to public entries", () => {
  for (const e of allContent()) {
    assert.equal(relatedEntries(e).length, e.related.length);
  }
});
test("invalid dates and unsafe URLs are rejected", () => {
  const e = readAll()[0];
  assert(!schema.safeParse({ ...e, published: "2026-02-30" }).success);
  assert(
    !schema.safeParse({
      ...e,
      sources: [{ name: "Unsafe", url: "javascript:alert(1)" }],
    }).success,
  );
});
test("broken references fail validation", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "insideai-test-"));
  fs.mkdirSync(path.join(dir, "resources"));
  const e = { ...getEntries("resources")[0], related: ["guides/missing"] };
  fs.writeFileSync(
    path.join(dir, "resources", `${e.slug}.mdx`),
    `---\n${JSON.stringify(e)}\n---\nBody`,
  );
  try {
    assert.throws(() => readAll(dir), /Broken relationship/);
  } finally {
    fs.rmSync(dir, { recursive: true });
  }
});
