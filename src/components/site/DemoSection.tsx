import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MockFrame } from "@/components/demo/MockFrame";
import {
  AttendanceMock,
  ChatMock,
  DashboardMock,
  PaymentsMock,
  PrayerMock,
  SongsMock,
} from "@/components/demo/Screens";
import { DEMO_SCREENS, type DemoScreenId } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const SCREEN_MAP: Record<DemoScreenId, () => React.JSX.Element> = {
  dashboard: DashboardMock,
  songs: SongsMock,
  attendance: AttendanceMock,
  prayer: PrayerMock,
  chat: ChatMock,
  payments: PaymentsMock,
};

export function DemoSection() {
  const [active, setActive] = useState<DemoScreenId>("dashboard");
  const Active = SCREEN_MAP[active];
  const current = DEMO_SCREENS.find((s) => s.id === active)!;

  return (
    <section id="product" className="scroll-mt-20 py-20 sm:py-24 lg:py-28">
      <Container wide>
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">See ReChoir in action</p>
            <h2 className="section-heading mt-5">Look around before you apply</h2>
            <p className="section-sub">
              These are real ReChoir screens, running on sample data. Nothing here
              needs an account, and no choir&apos;s information is shown.
            </p>
          </div>
        </Reveal>

        {/* Screen switcher */}
        <Reveal delay={60}>
          <div
            role="tablist"
            aria-label="ReChoir product screens"
            className="mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {DEMO_SCREENS.map((screen) => {
              const selected = screen.id === active;
              return (
                <button
                  key={screen.id}
                  role="tab"
                  id={`tab-${screen.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${screen.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(screen.id)}
                  onKeyDown={(e) => {
                    const i = DEMO_SCREENS.findIndex((s) => s.id === active);
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      setActive(DEMO_SCREENS[(i + 1) % DEMO_SCREENS.length].id);
                    }
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      setActive(
                        DEMO_SCREENS[(i - 1 + DEMO_SCREENS.length) % DEMO_SCREENS.length].id,
                      );
                    }
                  }}
                  className={cn(
                    "min-h-[44px] shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                    selected
                      ? "border-[hsl(var(--landing-accent))] bg-[hsl(var(--landing-accent)/0.12)] text-[hsl(var(--landing-fg))]"
                      : "border-[hsl(var(--landing-border))] text-[hsl(var(--landing-muted))] hover:border-[hsl(var(--landing-accent)/0.45)] hover:text-[hsl(var(--landing-fg))]",
                  )}
                >
                  {screen.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-4">
            <MockFrame>
              <div
                role="tabpanel"
                id={`panel-${active}`}
                aria-labelledby={`tab-${active}`}
                tabIndex={0}
                className="rounded-lg focus-visible:outline-none"
              >
                <Active />
              </div>
            </MockFrame>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-4 text-center text-sm text-[hsl(var(--landing-muted))]">
            {current.blurb}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
