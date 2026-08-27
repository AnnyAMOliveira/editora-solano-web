import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PanelProps {
  children: ReactNode;
  /**
   * `light` is the tinted card holding the forms on Publique and Contato;
   * `ink` is the "Sede" card at the top of the Contato column.
   */
  tone?: "light" | "ink";
  className?: string;
  as?: ElementType;
}

/**
 * Rounded card used by both form pages. Figma gives all three instances the
 * same 10px corner (`--radius-panel`) and a 29px inset — rounded here to the
 * 28px of `p-7` so the padding comes from the scale instead of a loose value.
 */
export function Panel({
  children,
  tone = "light",
  className,
  as: Tag = "div",
}: PanelProps) {
  return (
    <Tag
      className={cn(
        "rounded-panel p-6 md:p-7",
        tone === "light" ? "bg-watermark/20" : "bg-ink text-paper",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
