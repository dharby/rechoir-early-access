import {
  LayoutDashboard,
  CalendarDays,
  Music2,
  ClipboardCheck,
  HeartHandshake,
  MessageSquare,
  CreditCard,
  Users,
} from "lucide-react";
import { DEMO_NAV_ITEMS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const NAV_ICONS = [
  LayoutDashboard,
  CalendarDays,
  Music2,
  ClipboardCheck,
  HeartHandshake,
  MessageSquare,
  CreditCard,
  Users,
] as const;

/**
 * Miniature of the ReChoir app sidebar, mirroring the real navigation set.
 * Hidden below `sm` so the mock stays legible on narrow phones.
 */
export function MockSidebar({ active }: { active: string }) {
  return (
    <div
      aria-hidden="true"
      className="hidden w-[132px] shrink-0 flex-col gap-1 border-r border-[hsl(var(--landing-border))] pr-3 sm:flex lg:w-[148px]"
    >
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-[hsl(var(--landing-accent))] text-[10px] font-bold text-[hsl(var(--landing-accent-fg))]">
          R
        </span>
        <span className="text-[12px] font-bold tracking-tight text-[hsl(var(--landing-fg))]">
          RECHOIR
        </span>
      </div>

      {DEMO_NAV_ITEMS.map((label, i) => {
        const Icon = NAV_ICONS[i];
        const isActive = label === active;
        return (
          <div
            key={label}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px]",
              isActive
                ? "bg-[hsl(var(--landing-surface))] text-[hsl(var(--landing-fg))]"
                : "text-[hsl(var(--landing-muted))]",
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
