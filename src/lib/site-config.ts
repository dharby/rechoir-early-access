/**
 * Landing page configuration.
 *
 * Central place for anything that changes between "not live yet" and "live".
 * Keeping it here means the form logic never has to be rewritten to open
 * Early Access — set APPLICATIONS_OPEN to true and wire the submit handler.
 */

/**
 * Whether the Early Access application form accepts submissions.
 *
 * The form composes a `mailto:` draft addressed to CONTACT_EMAIL, so it works
 * with no server. Set this to `false` while you would rather the form stay
 * closed, and the page says so plainly rather than appearing to accept an
 * application it is silently discarding.
 */
export const APPLICATIONS_OPEN = true;

/** Public contact address for ReChoir. */
export const CONTACT_EMAIL = "ekwubiridaberechi@yahoo.com" as const;

/**
 * Length of the free beta trial offered to Early Access members, in days.
 * Referenced by the hero, the How It Works steps, the FAQ and the application
 * form so the promise can never drift between those sections.
 */
export const BETA_TRIAL_DAYS = 14;

/** Planned launch price, used in the pricing-interest question. */
export const LAUNCH_PRICE_NGN = 5_000;

/** Formatted launch price, e.g. "5,000". */
export const LAUNCH_PRICE_LABEL = LAUNCH_PRICE_NGN.toLocaleString("en-NG");

/** Year shown in the footer copyright. */
export const COPYRIGHT_YEAR = new Date().getFullYear();
