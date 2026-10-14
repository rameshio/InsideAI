# 14. Support pages

**Files:** `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/privacy/page.tsx`, `src/app/newsletter/page.tsx`, `src/app/not-found.tsx`, styles in `src/styles/pages.css` (`.support-page`, `.not-found`)

All share the `.support-page` layout: a centered 780px column with a page heading and `.prose` body text.

| Page | What it contains |
|---|---|
| `/about` | "AI is for the curious." Introduces Ramesh with the IA logo tile, the mission ("Understand. Explore. Build."), the editorial promise (sources, limitations, labelled demos) and a Follow on Instagram button. |
| `/contact` | Instagram link. Shows `NEXT_PUBLIC_CONTACT_EMAIL` when set, otherwise a notice that email is not added yet. Guidance for sending corrections. |
| `/privacy` | Clearly marked **sample text to review before launch**: newsletter data (Brevo), rate limiting, YouTube loading, analytics events, and contact. |
| `/newsletter` | The full-size signup form plus "What to expect". |
| 404 (`not-found.tsx`) | "This page isn't here." with a button back home. Also shown for drafts and unknown slugs. |

Each page exports `generateMetadata()` through the `metadata()` helper in `src/lib/seo.ts`, so every page has a unique title, description and canonical URL.
