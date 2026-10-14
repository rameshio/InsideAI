import fs from "node:fs";
import path from "node:path";
import { kinds, Kind } from "../src/lib/content";
const [kind, slug] = process.argv.slice(2);
if (
  !kinds.includes(kind as Kind) ||
  !slug ||
  !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
) {
  console.error(
    "Usage: npm run content:new -- guides your-slug (updates, videos, guides, resources)",
  );
  process.exit(1);
}
const target = path.join("content", kind, `${slug}.mdx`);
if (fs.existsSync(target)) throw new Error("This slug already exists.");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(
  target,
  fs
    .readFileSync(path.join("content", "templates", `${kind}.mdx`), "utf8")
    .replaceAll("ENTRY_SLUG", slug)
    .replaceAll("ENTRY_DATE", new Date().toISOString().slice(0, 10)),
);
console.log(`Created draft: ${target}`);
