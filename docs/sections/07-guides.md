# 07. Guides

**Files:** `src/app/page.tsx` (section "Go from curious to capable."), styles in `src/styles/home.css` (`.guide-home-grid`, `.guide-feature`, `.document-art`, `.guide-list`)

## What it shows

- **Left:** a feature card for the RAG guide ("Your documents. Better AI answers.") with a book icon, a short description, an "Explore RAG" link, and a small tilted "document" illustration showing documents, then retrieval, then a grounded answer.
- **Right:** a numbered list (01, 02, 03 ...) of every other guide with category, title and summary.

## How it works

- The feature card links to `/guides/rag-explained` (hard-coded on purpose as the flagship guide). It has `data-tilt`; the document illustration is pushed forward in 3D (`translateZ`) and lifts and straightens on hover, so it appears to float above the card.
- The list is `getEntries("guides")` minus `rag-explained`, rendered as rows with `.stagger` reveal, a hover tint, and springing arrows.

## Editing

To feature a different guide, change the `href` and copy of `.guide-feature` and the slug filtered out of the list in `page.tsx`.
