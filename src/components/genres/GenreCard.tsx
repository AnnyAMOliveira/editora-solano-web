import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Genre } from "@/types";

interface GenreCardProps {
  genre: Genre;
  /** Renders the card as a link. Without it the card is static. */
  href?: string;
  className?: string;
}

/**
 * Figma `Card-gender` (366 × 181): hairline border, 20px padding, 20px gaps,
 * drop shadow. The index stays left-aligned while the title and the description
 * are centered — the base component is left-aligned, but every instance placed
 * on the Home centers those two.
 *
 * The `card-1` variant (ink background, light text) is the hover state.
 */
export function GenreCard({ genre, href, className }: GenreCardProps) {
  const content = (
    <>
      <p className="text-slab-menu text-muted w-full">{genre.number}</p>
      <h3 className="text-slab-h2 w-full text-center">{genre.title}</h3>
      <p className="text-body w-full text-center">{genre.description}</p>
    </>
  );

  const classes = cn(
    "flex h-full w-full flex-col items-start gap-5 border border-muted/20 p-5 shadow-card transition-colors duration-200",
    href && "hover:bg-ink hover:text-bg",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <article className={classes}>{content}</article>;
}
