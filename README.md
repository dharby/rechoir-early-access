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

The form has **no backend and no database**. Submitting composes a `mailto:`
draft to `CONTACT_EMAIL` with the answers filled in, and opens the visitor's
own email app so they can review and send it themselves. Nothing is stored.

To switch to a real endpoint, replace the submit handler in
`src/components/site/ApplySection.tsx`.

## Data shown on this site

Every value in the product tour is **fictional sample data** (see
`src/lib/demo-data.ts`). It contains no real choir, member, attendance or
financial information, and the site makes no claims about customers,
statistics or results.

## Brand

Logo is `public/rechoir-icon.png` (the application's splash icon, downscaled to
256px). Wordmark styling follows the splash screen.
