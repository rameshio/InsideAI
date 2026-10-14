import { readAll } from "../src/lib/content";
try {
  const entries = readAll();
  console.log(
    `Validated ${entries.length} entries (${entries.filter((e) => e.draft).length} drafts).`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
