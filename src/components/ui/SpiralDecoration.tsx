import Image from "next/image";

import { cn } from "@/lib/utils";

/** The watermark spiral groups exported from the Figma `Decoration` frames. */
const DECORATIONS = {
  "hero-left": { src: "/assets/decorations/spiral-hero-left.svg", width: 319, height: 495 },
  "hero-right": { src: "/assets/decorations/spiral-hero-right.svg", width: 372, height: 330 },
  publishing: { src: "/assets/decorations/spiral-publishing.svg", width: 336, height: 302 },
  "about-right": { src: "/assets/decorations/spiral-about-right.svg", width: 448, height: 388 },
  "about-left": { src: "/assets/decorations/spiral-about-left.svg", width: 393, height: 486 },
  "contact-left": { src: "/assets/decorations/spiral-contact-left.svg", width: 393, height: 477 },
  "events-right": { src: "/assets/decorations/spiral-events-right.svg", width: 259, height: 264 },
} as const;

export type SpiralDecorationName = keyof typeof DECORATIONS;

interface SpiralDecorationProps {
  name: SpiralDecorationName;
  /** Absolute positioning is supplied by the consuming section. */
  className?: string;
}

/**
 * Purely decorative watermark. Hidden from assistive technology and from
 * pointer events; the section that places it owns its position.
 */
export function SpiralDecoration({ name, className }: SpiralDecorationProps) {
  const decoration = DECORATIONS[name];

  return (
    <Image
      src={decoration.src}
      alt=""
      aria-hidden="true"
      width={decoration.width}
      height={decoration.height}
      className={cn("pointer-events-none absolute select-none", className)}
    />
  );
}
