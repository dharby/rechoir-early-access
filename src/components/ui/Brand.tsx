import { cn } from "@/lib/utils";

interface BrandProps {
  className?: string;
  /** Icon + wordmark size. `sm` for the header, `md` for the footer. */
  size?: "sm" | "md";
  /** Renders the "Early Access" sub-label underneath the wordmark. */
  showTagline?: boolean;
}

const SIZES = {
  sm: { icon: "h-8 w-8", word: "text-[15px]", track: "tracking-[0.02em]" },
  md: { icon: "h-10 w-10", word: "text-lg", track: "tracking-[0.06em]" },
} as const;

/**
 * ReChoir brand lockup, matching the app's splash screen (`/rechoir-icon.png`
 * plus the "RECHOIR" wordmark). The icon is served from `public/` at 256px,
 * which is comfortably above the 2x requirement for its largest rendered size.
 */
export function Brand({ className, size = "sm", showTagline = false }: BrandProps) {
  const s = SIZES[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/rechoir-icon.png"
        alt=""
        width={96}
        height={96}
        decoding="async"
        className={cn("shrink-0 object-contain", s.icon)}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-extrabold uppercase text-transparent",
            "bg-gradient-to-r from-white via-[#E9D5FF] to-[#B65CFF]",
            "bg-clip-text",
            s.word,
            s.track,
          )}
        >
          ReChoir
        </span>
        {showTagline && (
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[hsl(var(--landing-accent))]">
            Early Access
          </span>
        )}
      </span>
    </span>
  );
}
