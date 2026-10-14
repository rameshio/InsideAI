# 10. Newsletter

**Files:** `src/components/newsletter.tsx`, `src/components/newsletter-form.tsx`, `src/app/api/newsletter/route.ts`, `src/lib/newsletter.ts`, styles in `src/styles/base.css` (`.newsletter`, `.email-row`, `.consent`)

## What it shows

A glowing panel ("Keep up. Without the noise.") with an email field and "Get AI Updates" button in one pill, a consent checkbox, and a status line. It appears at the bottom of the homepage (full size), on archive and detail pages (`compact`), and on `/newsletter`.

## How it works, step by step

1. **`Newsletter`** (server) checks `configured()`, which is true only when all four Brevo environment variables are set, and passes `enabled` to the form.
2. **`NewsletterForm`** (client):
   - gives its email input a unique id with `useId()`, so two forms on one page never clash;
   - records when the form was rendered (`started`) for a minimum-time spam check;
   - includes a hidden honeypot field (`website`) that humans never fill;
   - on submit, POSTs JSON to `/api/newsletter`, shows "Sending..." and disables the button, then shows the server's message in a `role="status"` live region;
   - fires an `insideai:analytics` event (`signup`) on success. No email is included.
3. **`POST /api/newsletter`** (`route.ts`) rejects, in order: requests from another origin (403), bodies over 4KB (413), more than 5 attempts per IP in 10 minutes (429), invalid JSON (400), a failed Zod schema check (400), a filled honeypot, or a submit faster than 1.5s (400). Then it calls `subscribe()`.
4. **`subscribe()`** (`lib/newsletter.ts`) talks to Brevo's double opt-in API with an 8-second timeout:
   - not configured: 503 with an honest "not available yet" message;
   - already a confirmed member: a neutral success message (no duplicate email, and nothing that reveals membership);
   - otherwise: requests the confirmation email. Provider errors return 502 without leaking keys or addresses.
5. **`rateLimited()`** is an in-memory map (max 10,000 keys) that resets on restart. Use a shared store for multi-instance hosting.

## Setup

Set `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID` and `BREVO_REDIRECT_URL` (HTTPS) in `.env.local` or the hosting environment. See the main `README.md`.
