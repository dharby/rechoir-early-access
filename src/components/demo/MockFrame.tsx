import { cn } from "@/lib/utils";

/**
 * Browser-chrome wrapper for the product mock.
 *
 * `label` is a neutral placeholder, not the production ReChoir URL, so the
 * Early Access site never surfaces the live application address.
 */
export function MockFrame({
  children,
  label = "ReChoir — product preview",
  className,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[hsl(var(--landing-border))] bg-[hsl(var(--landing-surface))] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.65)] sm:rounded-[24px]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[hsl(var(--landing-border))] bg-[hsl(var(--landing-surface)/0.5)] px-4 py-2.5">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--landing-border))]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--landing-border))]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--landing-border))]" />
        <span className="ml-3 truncate text-[11px] font-medium tracking-wide text-[hsl(var(--landing-muted))]">
          {label}
        </span>
        <span className="ml-auto hidden rounded-full border border-[hsl(var(--landing-border))] px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--landing-muted))] sm:inline">
          Demo data
        </span>
      </div>
      <div className="p-3 sm:p-5">{children}</div>
    </div>
  );
}
