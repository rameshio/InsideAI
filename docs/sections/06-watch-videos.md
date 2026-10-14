# 06. Watch (videos and shorts)

**Files:** `src/app/page.tsx` (section "Big ideas. Clear explanations."), `src/components/content-card.tsx` (`Art`), styles in `src/styles/home.css` (`.watch-section` and following)

## What it shows

A tinted full-width band with:

- **Left:** a large featured episode card (`.featured-video`): a network illustration filling the card, a play button, the format label ("Explainers / Demo outline"), the title and "Explore the episode".
- **Right:** "A little AI. A little quicker." with up to three Shorts as rows: a small illustrated thumbnail with a play icon, the label, the title and an arrow.

## How it works

- `featuredVideo` is the first video marked `featured: true`, else the first "Explainers" video, else the newest video.
- `shorts` are videos whose `format` is `"Shorts"` (max 3).
- The featured card has `data-tilt` (3D tilt and spotlight) and `.reveal` (rises in on scroll). A gradient at the bottom keeps the title readable over the art.
- The shorts list has `.stagger`; each row highlights on hover and its arrow springs up and to the right.
- Video entries without a real YouTube ID are labelled "Demo outline", so nothing pretends to be a real recording.

## Editing

Mark a video as featured by adding `featured: true` to its MDX frontmatter in `content/videos/`.
