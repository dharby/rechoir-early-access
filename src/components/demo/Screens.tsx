import { HeartHandshake, Send } from "lucide-react";
import { MockSidebar } from "./MockSidebar";
import {
  DEMO_ATTENDANCE_BARS,
  DEMO_CHAT_MESSAGES,
  DEMO_PAYMENT_ROWS,
  DEMO_PRAYER_SHIFTS,
  DEMO_REHEARSALS,
  DEMO_SONGS,
  type SongStatus,
} from "@/lib/demo-data";
import { cn } from "@/lib/utils";

/** Shared heading block inside each mock screen. */
function ScreenHead({ kicker, heading }: { kicker: string; heading: string }) {
  return (
    <div className="mb-3">
      <div className="text-[11px] text-[hsl(var(--landing-muted))]">{kicker}</div>
      <div className="text-sm font-bold tracking-tight text-[hsl(var(--landing-fg))] sm:text-base">
        {heading}
      </div>
    </div>
  );
}

const ROW =
  "flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2";

const MUTED = "text-[10px] text-[hsl(var(--landing-muted))]";
const STRONG = "text-[12px] font-medium text-[hsl(var(--landing-fg))]";
const ACCENT = "text-[hsl(var(--landing-accent))]";

/* ── Dashboard ─────────────────────────────────────────────────── */

export function DashboardMock() {
  return (
    <div className="flex gap-4">
      <MockSidebar active="Dashboard" />
      <div className="min-w-0 flex-1">
        <ScreenHead kicker="Welcome back, Director" heading="Your choir at a glance" />

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {[
            { label: "Rehearsals", value: "3", hint: "next 14 days" },
            { label: "Songs ready", value: "12/16", hint: "still learning", accent: true },
            { label: "Attendance", value: "91%", hint: "last 4 weeks" },
            { label: "Prayer shifts", value: "7", hint: "this week" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 sm:p-3">
              <div className="text-[9px] uppercase tracking-wider text-[hsl(var(--landing-muted))] sm:text-[10px]">
                {s.label}
              </div>
              <div
                className={cn(
                  "mt-1 text-lg font-bold tracking-tight sm:text-2xl",
                  s.accent ? ACCENT : "text-[hsl(var(--landing-fg))]",
                )}
              >
                {s.value}
              </div>
              <div className="mt-0.5 text-[9px] text-[hsl(var(--landing-muted))] sm:text-[10px]">
                {s.hint}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--landing-muted))] sm:text-[11px]">
          Upcoming
        </div>
        <div className="mt-2 space-y-1.5">
          {DEMO_REHEARSALS.map((r) => (
            <div key={r.title} className={ROW}>
              <div className="min-w-0">
                <div className={cn(STRONG, "truncate")}>{r.title}</div>
                <div className={cn(MUTED, "truncate")}>
                  {r.when} · {r.where}
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-[hsl(var(--landing-muted))]">
                {r.n} going
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Songs ─────────────────────────────────────────────────────── */

const SONG_DOT: Record<SongStatus, string> = {
  Ready: "bg-emerald-400",
  Learning: "bg-pink-400",
  "Not started": "bg-white/30",
};

export function SongsMock() {
  return (
    <div className="flex gap-4">
      <MockSidebar active="Songs" />
      <div className="min-w-0 flex-1">
        <ScreenHead kicker="Songs" heading="Readiness by song" />
        <div className="space-y-1.5">
          {DEMO_SONGS.map((s) => (
            <div key={s.title} className={ROW}>
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white/[0.05] font-mono text-[9px] text-[hsl(var(--landing-muted))]">
                  {s.key}
                </span>
                <span className={cn(STRONG, "truncate")}>{s.title}</span>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-[hsl(var(--landing-muted))]">
                <span
                  aria-hidden="true"
                  className={cn("h-2 w-2 rounded-full", SONG_DOT[s.status])}
                />
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Attendance ────────────────────────────────────────────────── */

export function AttendanceMock() {
  return (
    <div className="flex gap-4">
      <MockSidebar active="Attendance" />
      <div className="min-w-0 flex-1">
        <ScreenHead kicker="Attendance" heading="Last 7 rehearsals" />

        <div className="flex h-28 items-end gap-1.5 sm:h-32 sm:gap-2">
          {DEMO_ATTENDANCE_BARS.map((b, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-full rounded-t-md",
                  i === DEMO_ATTENDANCE_BARS.length - 1
                    ? "bg-[hsl(var(--landing-accent))]"
                    : "bg-white/10",
                )}
                style={{ height: `${b}%` }}
              />
              <span className="text-[9px] text-[hsl(var(--landing-muted))]">W{i + 1}</span>
            </div>
          ))}
        </div>

        <div className={cn(ROW, "mt-3 text-[11px]")}>
          <span className="text-[hsl(var(--landing-muted))]">At-risk members flagged</span>
          <span className={cn("font-semibold", ACCENT)}>3</span>
        </div>
      </div>
    </div>
  );
}

/* ── Prayer ────────────────────────────────────────────────────── */

export function PrayerMock() {
  return (
    <div className="flex gap-4">
      <MockSidebar active="Prayer" />
      <div className="min-w-0 flex-1">
        <ScreenHead kicker="Prayer chains" heading="This week's covering" />
        <div className="space-y-1.5">
          {DEMO_PRAYER_SHIFTS.map((s, i) => (
            <div key={i} className={ROW}>
              <div className="flex min-w-0 items-center gap-2.5">
                <HeartHandshake className="h-4 w-4 shrink-0 text-[hsl(var(--landing-accent))]" />
                <span className={cn(STRONG, "truncate")}>{s.who || "Unassigned"}</span>
                <span className={cn(MUTED, "hidden truncate sm:inline")}>{s.when}</span>
              </div>
              <span
                className={cn(
                  "shrink-0 text-[10px]",
                  s.status === "Open"
                    ? MUTED
                    : s.status === "Yours"
                      ? ACCENT
                      : "text-emerald-400",
                )}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Chat ──────────────────────────────────────────────────────── */

export function ChatMock() {
  return (
    <div className="flex gap-4">
      <MockSidebar active="Chat" />
      <div className="flex min-w-0 flex-1 flex-col">
        <ScreenHead kicker="Team chat" heading="#general" />
        <div className="space-y-2">
          {DEMO_CHAT_MESSAGES.map((m, i) => (
            <div key={i} className={cn("flex", m.me ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-1.5 text-[11px] sm:max-w-[80%]",
                  m.me
                    ? "bg-[hsl(var(--landing-accent))] text-[hsl(var(--landing-accent-fg))]"
                    : "bg-white/[0.06] text-[hsl(var(--landing-fg)/0.8)]",
                )}
              >
                {!m.me && (
                  <span className="mb-0.5 block text-[9px] font-semibold text-[hsl(var(--landing-muted))]">
                    {m.who}
                  </span>
                )}
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2">
          <span className="text-[10px] text-[hsl(var(--landing-muted))]">Message the choir…</span>
          <Send className="ml-auto h-3.5 w-3.5 text-[hsl(var(--landing-accent))]" />
        </div>
      </div>
    </div>
  );
}

/* ── Payments ──────────────────────────────────────────────────── */

const PAYMENT_TONE = {
  Paid: "text-emerald-400",
  Due: "text-amber-300",
  Overdue: "text-rose-400",
} as const;

export function PaymentsMock() {
  return (
    <div className="flex gap-4">
      <MockSidebar active="Payments" />
      <div className="min-w-0 flex-1">
        <ScreenHead kicker="Payments" heading="Contribution status" />
        <div className="space-y-1.5">
          {DEMO_PAYMENT_ROWS.map((r) => (
            <div key={r.who} className={ROW}>
              <span className={cn(STRONG, "truncate")}>{r.who}</span>
              <span className={cn("shrink-0 text-[10px]", PAYMENT_TONE[r.status])}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
