import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small label above the title ("COAUTORIA", "Como Publicar", "Carta mensal"). */
  eyebrow?: ReactNode;
  /**
   * Replaces the eyebrow's default type and color classes outright — Section 4
   * sets it in ink, Section 5 in grey at Slab/h2. It replaces rather than
   * appends because two competing color or size utilities on one element
   * resolve by CSS order, not by the order they appear in the class string.
   */
  eyebrowClassName?: string;
  title: ReactNode;
  /** Figma uses Playfair (`display`) for editorial titles and the slab face elsewhere. */
  titleVariant?: "slab" | "display";
  description?: ReactNode;
  align?: "left" | "center";
  /** Right-hand slot: the "Ver Catálogo Completo" button, the agenda year, etc. */
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  eyebrowClassName,
  title,
  titleVariant = "slab",
  description,
  align = "left",
  action,
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCentered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            eyebrowClassName ?? "text-slab-sub text-muted",
            isCentered && "text-center",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <div
        className={cn(
          "flex w-full gap-4",
          isCentered
            ? "flex-col items-center"
            : "flex-col items-start sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <h2
          className={cn(
            titleVariant === "display" ? "text-h2" : "text-slab-h2",
            "text-balance",
          )}
        >
          {title}
        </h2>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      {description ? (
        <div className={cn("text-body-lg max-w-[80ch]", isCentered && "mx-auto")}>
          {description}
        </div>
      ) : null}
    </div>
  );
}
