# Decisions

> The owner's final calls. One row per decision, newest at the bottom.

| # | Date | Decision | Why | Suggested by |
|---|---|---|---|---|
| 1 | 2026-10-13 | "3D" means a scroll-driven animation: frames play in sync with scrolling (homepage hero) | Owner's intended look | Owner |
| 2 | 2026-10-13 | **Build has started.** Antigravity builds the full frontend (using Google Stitch MCP for design), following `docs/04-build/antigravity-frontend-prompt.md` | Owner's assignment | Owner |
| 3 | 2026-10-13 | Codex and Claude don't edit frontend files (`site/`, `site-design/`) unless the owner asks; they review Antigravity's work when it reports back | Avoid three AIs editing the same files | Owner |
| 4 | 2026-10-13 | Use the owner's **OriginKit** collection for the frontend: preview catalog at `references/originkit/` (git-ignored, never published); real code only via the owner's own OriginKit account (MCP/CLI), free tier, max 3 components; rules in `docs/04-build/originkit-guide.md` | Owner supplied the design collection | Owner |
