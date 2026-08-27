import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmphasisProps {
  children: ReactNode;
  className?: string;
}

/**
 * The italic highlight inside the editorial headlines — "vira *semente*",
 * "*por várias mãos*", "do primeiro *alô*". Figma sets these in Playfair
 * Display italic, Brand/color-brand-mata; the family is inherited from the
 * surrounding heading utility.
 */
export function Emphasis({ children, className }: EmphasisProps) {
  return (
    <em className={cn("text-mata font-medium italic", className)}>{children}</em>
  );
}
