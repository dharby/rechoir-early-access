# ReChoir — Early Access

Public marketing site for ReChoir Early Access: rehearsals, songs, attendance,
prayer chains, chat and contributions in one organised space for church choirs.

This is a **standalone static site**. It is completely separate from the ReChoir
application — no shared code, no shared database, no shared credentials.

## Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS 3 · lucide-react

## Commands

```bash
npm install
npm run dev        # start dev server
npm run build      # typecheck + production build
npm run typecheck  # tsc only
npm run lint       # oxlint
npm run preview    # serve the production build
```

## Project layout

```
src/
  components/
    demo/      Product-tour screen mocks (Dashboard, Songs, Attendance, …)
    site/      Landing page sections
    ui/        Shared primitives (Reveal, Container, Brand, SectionHead)
  lib/
    content.ts       Marketing copy + feature/FAQ data
    demo-data.ts     Fictional sample data for the product tour
    site-config.ts   Contact email, trial length, launch price, form gate
    utils.ts         cn() class-name helper
  index.css   Design tokens + component classes
api/
  subscribe.ts  EmailOctopus newsletter endpoint (server-side, holds the key)
```

## Content and configuration

Three files drive everything you are likely to want to change:

- **`src/lib/site-config.ts`** — contact email, `BETA_TRIAL_DAYS`,
  `LAUNCH_PRICE_NGN`, and the `APPLICATIONS_OPEN` switch. The 14-day trial
  promise and the Naira price are single constants read by the hero, FAQ,
  How It Works, the form and the OG image, so they cannot drift apart.
- **`src/lib/content.ts`** — all landing copy, features and FAQs.
- **`src/lib/demo-data.ts`** — the sample data behind the product tour.

## The application form

The Early Access form has **no backend and no database**. Submitting composes a
`mailto:` draft to `CONTACT_EMAIL` with the answers filled in, and opens the
visitor's own email app so they can review and send it themselves. Nothing is
stored.

To switch to a real endpoint, replace the submit handler in
`src/components/site/ApplySection.tsx`.

## Newsletter (EmailOctopus)

The newsletter **is** a real subscription — it posts to a serverless function
at `api/subscribe.ts`, which adds the subscriber to your EmailOctopus list.

**Why a function and not a direct call:** the EmailOctopus API key is an
account-wide credential that can read and modify every list. This repository is
public, so a key placed in the client bundle would be readable by anyone. The
browser posts the address to `/api/subscribe`, and the function attaches the
secret on the server. The key lives only in the deployment environment.

### Setup

1. In EmailOctopus, copy your API key (Account → API keys) and the list id of
   the audience you want to add to.
2. Set both as environment variables — in the Vercel dashboard for a live
   deployment, or in `.env.local` (gitignored) for local testing. See
   `.env.example` for the names.

```
EMAILOCTOPUS_API_KEY=
EMAILOCTOPUS_LIST_ID=
```

Without them the endpoint returns a clear "not configured yet" error and the
form shows that, rather than pretending to subscribe someone.

### Notes

- Subscribers are added with `status: "pending"`, so EmailOctopus sends a
  **double opt-in** confirmation email. The success copy reflects this — it asks
  the visitor to check their inbox rather than claiming they are already on the
  list.
- A hidden honeypot field filters naive bots, and the endpoint rejects
  non-POST requests, malformed bodies, oversized payloads and invalid addresses.
- Re-subscribing an existing address is treated as success, not an error.

## Data shown on this site

Every value in the product tour is **fictional sample data** (see
`src/lib/demo-data.ts`). It contains no real choir, member, attendance or
financial information, and the site makes no claims about customers,
statistics or results.

## Brand

Logo is `public/rechoir-icon.png` (the application's splash icon, downscaled to
256px). Wordmark styling follows the splash screen.
