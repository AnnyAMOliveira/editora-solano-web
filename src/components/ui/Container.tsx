import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Page gutter. Figma: 1440px frame with 60px side padding, giving a 1320px
 * content column. The gutter steps down on smaller viewports; the content cap
 * stays fixed so proportions hold.
 */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-gutter", className)}>
      {children}
    </Tag>
  );
}
