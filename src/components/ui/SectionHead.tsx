import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
  /** Right-hand slot, e.g. a small note or badge. */
  aside?: ReactNode;
}

/** Consistent eyebrow + heading + sub-heading block for landing sections. */
export function SectionHead({ eyebrow, title, sub, className, aside }: SectionHeadProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-heading mt-5">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}
