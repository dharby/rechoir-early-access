/**
 * Fictional demonstration data for the ReChoir Early Access product tour.
 *
 * Every value here is invented sample content used only for visual
 * presentation. It is NOT connected to the ReChoir production database and
 * contains no real member names, emails, choir names, team IDs, attendance
 * records or financial information.
 */

/** Nav items that genuinely exist in the ReChoir app sidebar. */
export type DemoScreenId =
  | "dashboard"
  | "songs"
  | "attendance"
  | "prayer"
  | "chat"
  | "payments";

export interface DemoScreen {
  id: DemoScreenId;
  /** Nav label, matching the real ReChoir sidebar wording. */
  label: string;
  /** Section heading inside the mock. */
  heading: string;
  /** Kicker above the heading. */
  kicker: string;
  /** One-line description of what this screen does, for the caption. */
  blurb: string;
}

export const DEMO_SCREENS: DemoScreen[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    heading: "Your choir at a glance",
    kicker: "Dashboard",
    blurb:
      "Rehearsals, song readiness, attendance and prayer shifts in one view.",
  },
  {
    id: "songs",
    label: "Songs",
    heading: "Readiness by song",
    kicker: "Songs",
    blurb:
      "See which songs the choir has learned and who is still learning them.",
  },
  {
    id: "attendance",
    label: "Attendance",
    heading: "Last 7 rehearsals",
    kicker: "Attendance",
    blurb:
      "Track presence over time instead of scrolling back through chat messages.",
  },
  {
    id: "prayer",
    label: "Prayer",
    heading: "This week's covering",
    kicker: "Prayer chains",
    blurb:
      "Keep prayer requests and chain responsibilities visible to the team.",
  },
  {
    id: "chat",
    label: "Chat",
    heading: "#general",
    kicker: "Team chat",
    blurb:
      "Choir communication that stays with the team instead of living in a personal group chat.",
  },
  {
    id: "payments",
    label: "Payments",
    heading: "Contribution status",
    kicker: "Payments",
    blurb:
      "Track who has paid choir contributions and who still owes.",
  },
];

/** Sidebar labels — the verified ReChoir navigation set. */
export const DEMO_NAV_ITEMS = [
  "Dashboard",
  "Rehearsals",
  "Songs",
  "Attendance",
  "Prayer",
  "Chat",
  "Payments",
  "Members",
] as const;

export const DEMO_REHEARSALS = [
  { title: "Midweek rehearsal", when: "Wed · 6:30 PM", where: "Sanctuary", n: 18 },
  { title: "Sunday warm-up", when: "Sun · 8:00 AM", where: "Choir loft", n: 24 },
  { title: "Easter cantata run-through", when: "Sat · 5:00 PM", where: "Main hall", n: 30 },
] as const;

export const DEMO_SONGS = [
  { title: "How Great Thou Art", key: "G", status: "Ready" },
  { title: "Total Praise", key: "Ab", status: "Learning" },
  { title: "Hallelujah Chorus", key: "C", status: "Ready" },
  { title: "Great Is Thy Faithfulness", key: "D", status: "Not started" },
  { title: "Amazing Grace", key: "F", status: "Ready" },
] as const;

export type SongStatus = (typeof DEMO_SONGS)[number]["status"];

export const DEMO_ATTENDANCE_BARS = [62, 74, 81, 70, 88, 95, 91] as const;

export const DEMO_PRAYER_SHIFTS = [
  { who: "Sis. Amina", when: "Mon 6–7 AM", status: "Filled" },
  { who: "Bro. Kwame", when: "Tue 6–7 AM", status: "Filled" },
  { who: "You", when: "Wed 6–7 AM", status: "Yours" },
  { who: "", when: "Thu 6–7 AM", status: "Open" },
] as const;

export const DEMO_CHAT_MESSAGES = [
  { who: "Director", text: "Call time moved to 5:30. Bring robes.", me: false },
  { who: "Amina", text: "Noted! Practising the bridge tonight.", me: false },
  { who: "You", text: "See everyone Sunday", me: true },
  { who: "Kwame", text: "Bass section ready for the cantata.", me: false },
] as const;

export const DEMO_PAYMENT_ROWS = [
  { who: "Amina O.", status: "Paid" },
  { who: "Kwame A.", status: "Paid" },
  { who: "Joana M.", status: "Due" },
  { who: "Yaw B.", status: "Overdue" },
] as const;
