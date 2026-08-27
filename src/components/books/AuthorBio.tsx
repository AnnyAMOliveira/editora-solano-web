import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Author } from "@/types";

interface AuthorBioProps {
  author: Author;
  className?: string;
}

/**
 * Figma `Author Info Section` (`528:3245`): a 91px round portrait beside the
 * name and the short line, then the long biography across the full width.
 *
 * The portrait is desaturated — the frame applies `mix-blend-luminosity`,
 * which is the same treatment the co-authorship carousel gives its portraits.
 * `grayscale` reproduces it without depending on what sits behind the image,
 * which is what a blend mode would.
 *
 * `bio` is optional in practice: no biography has been written for any author,
 * and the block renders the header alone rather than an empty paragraph.
 *
 * The name links to the author's own page — the second way in, beside the
 * Home's carousel. Only the name is a link: the portrait beside it would be a
 * second control to the same place, and the biography is text to read, not to
 * click.
 */
export function AuthorBio({ author, className }: AuthorBioProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center gap-4">
        <div className="relative size-[91px] shrink-0 overflow-hidden rounded-full">
          <Image
            src={author.portrait}
            alt={`Retrato de ${author.name}`}
            fill
            sizes="91px"
            className="object-cover grayscale"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-slab-sub">
            <Link
              href={`/autores/${author.slug}`}
              className="hover:text-terra underline-offset-4 transition-colors duration-200 hover:underline"
            >
              {author.name}
            </Link>
          </p>
          <p className="text-body text-muted">{author.genre}</p>
        </div>
      </div>

      {author.bio ? <p className="text-body text-muted">{author.bio}</p> : null}
    </div>
  );
}
