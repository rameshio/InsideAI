# Inside AI

A local-first editorial website for Ramesh Badugu’s AI education and news channel. Next.js App Router, TypeScript, Tailwind CSS, server-rendered MDX, and validated file-based content. No external accounts are needed to run the site.

## Run locally

Requires Node.js 20.9 or newer (built with Node 24).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open the URL printed by Next.js. The default is http://localhost:3000. On PowerShell use `Copy-Item .env.example .env.local` instead of `cp` if preferred.

```sh
npm run lint
npm run typecheck
npm test
npx tsx scripts/smoke.ts
npm run build
npm start
```

## Configure the brand

`src/config/site.ts` is the single configuration entry point for branding, creator, socials, site URL, contact email, and newsletter consent. Set the environment values in `.env.local`. The YouTube URL and contact email intentionally start empty. Instagram is `insideai.vision`. Public configuration changes require rebuilding a production deployment.

The brand identity is the owner's glowing "IA" logo (`public/brand/`). The homepage hero renders it live as an interactive 3D network on a canvas, and card illustrations are generated SVG networks in the same style. No reference photos or third-party assets were copied. Demonstration articles are explicitly labeled. Video entries are episode outlines without fabricated video IDs or playback.

A section-by-section explanation of the code (design system, motion, every homepage section, inner pages, content system, SEO) is in [docs/sections/](docs/sections/README.md).

## Publishing

See [PUBLISHING.md](PUBLISHING.md) for metadata, templates, review workflow, relationships, and CMS migration. Content is stored in `content/{updates,videos,guides,resources}`. Downloads are real files in `public/downloads`.

```sh
npm run content:new -- guides my-new-guide
npm run content:validate
```

The command creates a draft. Validation also runs before production builds. MDX is executable code: only trusted editors should author it. Never compile untrusted submissions.

## Newsletter: Brevo double opt-in

The server adapter in `src/lib/newsletter.ts` uses Brevo’s double opt-in API. The browser never sees provider keys. Missing configuration returns HTTP 503 and an honest unavailable message.

1. Create a Brevo account and a dedicated list.
2. Create and activate a double opt-in confirmation template using Brevo’s DOI link variable. Follow [Brevo’s DOI API documentation](https://developers.brevo.com/reference/create-doi-contact).
3. Set `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`, and `BREVO_REDIRECT_URL` (an HTTPS confirmation destination).
4. Restart locally or rebuild/redeploy. Test with your own address and verify that no newsletter is sent before confirmation.
5. Confirm that the template, consent copy, unsubscribe handling, and privacy text match your actual use.

Confirmed existing list members receive the same neutral response as new subscribers; another confirmation is not sent. New addresses get a confirmation request. Invalid input, provider rejection, timeouts, and missing credentials return errors, never simulated success. Provider errors do not expose credentials or email addresses.

Spam defenses: consent validation, same-origin checks, a honeypot, minimum interaction time, bounded request size, and a bounded per-process rate limiter. For production behind a proxy, ensure only the hosting platform can set `x-forwarded-for` and preserve the request origin. Configure a shared edge/distributed rate limit for multiple server instances; the in-memory limit resets on restart. Add a challenge service through a server-side verification adapter if abuse warrants it.

## Search, SEO, and analytics

Archives use GET search forms and URL-based category filters. Search matches title, summary, and tags. Newest-first results support load more at six entries per page. Empty states offer a reset. Article text is rendered on the server.

Configured canonical URLs, unique metadata, generated Open Graph image, RSS at `/rss.xml`, `/sitemap.xml`, `/robots.txt`, Article schema, and VideoObject schema (only when a real video ID exists) are included. A configured YouTube video loads its privacy-enhanced player only after a click, without autoplay.

The browser dispatches `insideai:analytics` custom events with `{ event, label }`. Hook your analytics provider to that event. Signup labels contain no email; search text and form values are not sent. Review consent requirements before connecting a provider.

## Deploy later

Public deployment is intentionally not performed. Deploy on a host with Node-compatible Next.js server support (for example Vercel or a Node container); static export will not support search and the newsletter API. Use `npm ci`, `npm run build`, then `npm start` where appropriate. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain, public social/contact values, and server-side Brevo secrets in the hosting environment. Rebuild when public config changes.

Before launch, replace demo video outlines with recordings, review sources and dates, add a contact address, and finish `/privacy` (currently labeled sample legal text). Configure production rate limits and test DOI with real credentials. Use the production domain in canonicals and verify sitemap/RSS and social previews.

## Later additions

Keep first-version attention on useful content and the channel. CMS editing can replace the content adapter; automated research should create drafts only, with human source review. Community features and sponsorships can follow once there is real demand. Sponsorship content should have clear disclosure. Optional YouTube API syncing can populate a staging draft from your configured channel ID; do not infer channel IDs from the creator name.

## Reference and versions

Verification includes unit tests and an HTTP smoke script covering every page and download, draft 404s, feed exclusion, combined search, and newsletter errors. Start the dev server before `npx tsx scripts/smoke.ts`; set `TEST_BASE_URL` to test another port. Provider behavior is tested with mocked HTTP responses; real delivery requires configured Brevo credentials. Runtime dependency audit is clean. The current Next ESLint development dependency chain has five npm advisories rooted in `braces`; no patched registry version was available during implementation. Review upstream updates before launch rather than accepting npm’s unrelated framework downgrade suggestion.

The reference’s navigation, briefing archive, video section, and creator/footer progression informed the architecture. Branding, prose, and visuals are original. Versions were verified against the official [Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation), [Tailwind Next.js guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs), and npm registry: Next 16.4.0, React 19.3.0, Tailwind 4.3.3. Exact resolved dependencies are in `package-lock.json`.
