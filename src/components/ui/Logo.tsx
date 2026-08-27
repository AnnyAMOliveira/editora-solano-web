import Image from "next/image";

import { cn } from "@/lib/utils";
import { SITE_INFO } from "@/lib/navigation";

interface LogoProps {
  className?: string;
  /** Figma renders the wordmark at 176 × 42 in the header and the footer. */
  width?: number;
}

const INTRINSIC_WIDTH = 176;
const INTRINSIC_HEIGHT = 42;

/**
 * The wordmark exported from Figma, used as-is. Do not redraw or recolor it.
 */
export function Logo({ className, width = INTRINSIC_WIDTH }: LogoProps) {
  const height = Math.round((width / INTRINSIC_WIDTH) * INTRINSIC_HEIGHT);

  return (
    <Image
      src="/assets/logo/editora-solano.svg"
      alt={SITE_INFO.name}
      width={width}
      height={height}
      priority
      className={cn("h-auto", className)}
    />
  );
}
