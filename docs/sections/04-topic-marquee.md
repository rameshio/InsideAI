# 04. Topic marquee

**Files:** `src/app/page.tsx` (`TOPICS` list and markup), styles in `src/styles/home.css`

## What it shows

A band under the hero with large topic words (Models, Tools, Agents, Research, Prompts, Workflows, What's next) scrolling sideways forever. Every second word is drawn as an outline, and the words are separated by glowing nodes that echo the logo.

## How it works

- The list is rendered twice inside `.marquee-track`. The second copy is `aria-hidden`, so screen readers read the topics once.
- `@keyframes marquee` moves the track by `-50%`, exactly one copy's width, so the loop is seamless.
- Hovering pauses it (`animation-play-state: paused`).
- The edges fade out with a `mask-image` gradient.
- Under reduced motion it stops and becomes a horizontally scrollable strip.

This is the only marquee on the site, used to show breadth of topics at a glance.

## Editing

Change the words in the `TOPICS` array at the top of `src/app/page.tsx`. Change the speed with the `40s` duration in `.marquee-track`.
