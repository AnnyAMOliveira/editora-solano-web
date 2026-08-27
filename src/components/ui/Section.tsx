import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  /** `dark` paints the ink band used by "Lançamentos" and "Comunidade". */
  tone?: "light" | "dark";
  className?: string;
  id?: string;
  ariaLabel?: string;
}

/**
 * Section band. Figma stacks the Home sections with 50px of internal top/bottom
 * padding and 50px of page background between them, so the dark bands read as
 * separate blocks rather than full-bleed neighbours.
 */
export function Section({
  children,
  tone = "light",
  className,
  id,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "py-10 md:py-section",
        tone === "dark" && "bg-ink text-bg",
        className,
      )}
    >
      {children}
    </section>
  );
}
