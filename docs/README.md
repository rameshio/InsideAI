# How we work in this folder

Three AI assistants share this folder: **Claude**, **Codex**, and **Antigravity**.
The owner of the channel makes every final decision.

## Rules for every AI

1. **Read first:** `docs/00-brief.md` is the source of truth. Read it before doing anything.
2. **Write only to your own file** in `docs/01-research/` (`claude-notes.md`, `codex-notes.md`, `antigravity-notes.md`).
   Never edit another AI's file. If you disagree with it, say so in your own file.
3. **The build has started (2026-10-13), and only Antigravity builds the frontend.** See `03-decisions.md` #2–3.
   - **Antigravity** owns `site/` and `site-design/` and follows `docs/04-build/antigravity-frontend-prompt.md`.
   - **Codex and Claude** don't edit `site/` or `site-design/` unless the owner asks. They review when Antigravity reports back in `docs/04-build/antigravity-build-log.md`.
4. **Cite what you saw:** when you mention a reference website, include its URL and what you actually observed there.
5. **Be specific and opinionated.** Give a recommendation and say why. Don't just list options.
6. `02-plan.md` and `03-decisions.md` are edited only when the owner asks.
7. **`references/` is private** (OriginKit collection, git-ignored). Never commit, copy into `site/`, or publish it. Rules: `docs/04-build/originkit-guide.md`.

## Phases

| Phase | File(s) | Status |
|---|---|---|
| 0. Brief | `00-brief.md` | Done (owner answers in, 2026-10-13) |
| 1. Research (each AI separately) | `01-research/*.md` | Done (all three) |
| 2. Cross-review (each AI reads the other two) | bottom of each `01-research/*.md` | Claude done; Codex + Antigravity pending |
| 3. Merged plan | `02-plan.md` | Skipped; the build spec in `04-build/antigravity-frontend-prompt.md` is the working plan |
| 4. Decisions | `03-decisions.md` | In progress |
| 5. Frontend build (Antigravity) | `04-build/`, `site/`, `site-design/` | Phase A (Stitch designs), then stop for owner's pick of light or dark desk |
| 6. Review (Codex + Claude) | own notes files | After Antigravity's build log is in |
