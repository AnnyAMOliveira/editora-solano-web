import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Author } from "@/types";

interface AuthorCardProps {
  author: Author;
  className?: string;
}

/**
 * Figma `Author Info` (176 wide): a circular portrait with the `luminosity`
 * blend mode — that blend is what desaturates the photographs in the design —
 * then the name and the genre.
 *
 * The whole card is the link to `/autores/[slug]`, the same call `BookCard`
 * makes: a reader who clicks a portrait wants the person, and there is nothing
 * else inside to click.
 *
 * Inside the Home's carousel this is safe — `Carousel` swallows the click when
 * the pointer travelled far enough to count as a drag, so dragging the row
 * never navigates.
 *
 * The label under the name is still `genre` and not `shortDescription`. The
 * design draws a short tag here and a sentence on the author page; whether the
 * two should become one field is an editorial decision, not a refactor.
 */
export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <Link
      href={`/autores/${author.slug}`}
      className={cn("flex w-full flex-col items-center gap-3.5", className)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full mix-blend-luminosity">
        <Image
          src={author.portrait}
          alt={author.name}
          fill
          sizes="176px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center gap-[3px] text-center">
        <h3 className="text-slab-menu">{author.name}</h3>
        <p className="text-body-sm text-muted">{author.genre}</p>
      </div>
    </Link>
  );
}
