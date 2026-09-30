/**
 * Landing page copy.
 *
 * Every feature listed here corresponds to a screen that genuinely exists in
 * the ReChoir application. Nothing is described that the product does not do.
 * Keep this file free of invented statistics, testimonials or endorsements.
 */

import {
  LayoutDashboard,
  CalendarDays,
  Music2,
  ClipboardCheck,
  HeartHandshake,
  MessageSquare,
  Wallet,
  Users,
  ListChecks,
  Bell,
} from "lucide-react";
import { BETA_TRIAL_DAYS, LAUNCH_PRICE_LABEL } from "@/lib/site-config";

export interface Feature {
  icon: typeof LayoutDashboard;
  title: string;
  body: string;
}

/** Features backed by verified ReChoir screens. */
export const FEATURES: Feature[] = [
  {
    icon: LayoutDashboard,
    title: "One dashboard",
    body: "Rehearsals, song readiness, attendance and prayer shifts in a single view, so you stop assembling updates from different places.",
  },
  {
    icon: CalendarDays,
    title: "Rehearsal planning",
    body: "Schedule and track rehearsals with attendance recorded per session, instead of digging back through messages.",
  },
  {
    icon: Music2,
    title: "Song readiness",
    body: "See which songs are ready, which are being learned, and which have not started — per song, across the whole choir.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance records",
    body: "Presence over time, with members who have dropped off flagged so you can check in on them.",
  },
  {
    icon: HeartHandshake,
    title: "Prayer chains",
    body: "Organise prayer requests and shift covering so responsibilities are visible to the team and gaps are obvious.",
  },
  {
    icon: MessageSquare,
    title: "Team chat",
    body: "Choir communication that lives with the team, not in a personal group chat that only some people can reach.",
  },
  {
    icon: Wallet,
    title: "Contribution tracking",
    body: "Record and track who has paid and who still owes. ReChoir records status; it does not move money.",
  },
  {
    icon: Users,
    title: "Member management",
    body: "Keep your choir's members and their details organised, including voice section and contact information.",
  },
  {
    icon: ListChecks,
    title: "Checklists",
    body: "Turn recurring duties into shared checklists so preparation is visible before the day itself.",
  },
  {
    icon: Bell,
    title: "Notifications",
    body: "Keep the team aligned on changes without relying on everyone watching a busy chat.",
  },
];

export interface Step {
  title: string;
  body: string;
}

export const HOW_IT_WORKS: Step[] = [
  {
    title: "Explore ReChoir",
    body: "Browse the screens above on sample data. No account, no sign-up, nothing to install.",
  },
  {
    title: "Request Early Access",
    body: "Tell us a little about your choir and what you want to solve. We review every request by hand.",
  },
  {
    title: `Test the beta free for ${BETA_TRIAL_DAYS} days`,
    body: `Accepted choirs get free access to the beta for ${BETA_TRIAL_DAYS} days, before ReChoir goes live fully. Tell us what works and what does not, and that shapes what gets built next.`,
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "What is ReChoir?",
    a: "ReChoir is a web app that brings the everyday administrative work of running a choir into one organised space — rehearsals, songs, attendance, prayer chains, chat, contributions and members.",
  },
  {
    q: "What does Early Access include?",
    a: `Selected choirs test the ReChoir beta completely free for ${BETA_TRIAL_DAYS} days. That is a full access trial before ReChoir goes live fully — not a limited demo. There is no card, no payment details, and no automatic charge when the trial ends.`,
  },
  {
    q: "Who is Early Access for?",
    a: "Choir team leads who currently run a choir's information across scattered spreadsheets, notebooks and group chats. We are inviting a limited number of choirs at a time, and we onboard each one personally.",
  },
  {
    q: "Is it free?",
    a: `Yes. The ${BETA_TRIAL_DAYS}-day beta trial is free. We are collecting feedback during it, so there is nothing to pay and no card details required.`,
  },
  {
    q: "How much will ReChoir cost?",
    a: `We are planning a launch price of ${LAUNCH_PRICE_LABEL} Naira per month, and that is what the application form asks you to react to. Nothing is charged now — the ${BETA_TRIAL_DAYS}-day beta trial comes first, and we will be in touch about pricing and continued access before anything is billed.`,
  },
  {
    q: "What happens to my data?",
    a: "This website has no database and stores nothing. When you submit an application it simply opens your own email app with the form filled in, so you can see exactly what you are sending before you send it. Once you are accepted, your choir's data lives in your own ReChoir team space, and you can ask us to delete it.",
  },
  {
    q: "What happens after the trial?",
    a: "You tell us what worked and what did not. That feedback directly shapes what gets built next. We will be in touch about pricing and continued access once the trial period ends.",
  },
  {
    q: "Do I need a credit card?",
    a: "No. Early Access does not require a card or any payment information at any point.",
  },
  {
    q: "Can I try it now?",
    a: "You can explore the screens on this page as much as you like — they run on sample data and need no account. Actually using ReChoir with your own choir requires an accepted Early Access request, because we onboard each choir personally.",
  },
];
