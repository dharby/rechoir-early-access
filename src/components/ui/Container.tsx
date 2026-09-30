import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Wider track for the product demo frame. */
  wide?: boolean;
}

/** Horizontal page gutter + centred track. Padding comes from `.container-page`. */
export function Container({ children, className, wide = false }: ContainerProps) {
  return (
    <div className={cn("container-page", wide && "max-w-[1240px]", className)}>
      {children}
    </div>
  );
}
