import Image from "next/image";

import { cn } from "@/lib/utils";
import { MOTION_HERO_DELAY, Reveal } from "@/motion";
import type { Author } from "@/types";

interface AuthorProfileHeroProps {
  author: Author;
  className?: string;
}

/**
 * Figma: the opening of the author page (`530:3246` › Section1) — a 160px
 * round portrait centred on the page, the name below it, a short line under
 * that, and the biography across a 1200px measure.
 *
 * ## Not `AuthorBio`
 *
 * The book page's author block is the same four fields in a different
 * composition: a 91px portrait on the left, name and line beside it, the
 * biography full width underneath. This one is centred and twice the portrait.
 * Making one component do both would mean adding an alignment mode to a
 * component a finished page already depends on, and the project's rule is that
 * a different composition gets its own component rather than a variant.
 *
 * ## The 1200px biography
 *
 * Wider than the ~80ch the rest of the project uses for running text, and
 * deliberately so: it is what the frame draws. Centred prose at that measure
 * reads as a statement rather than as an article, which is the intent here.
 *
 * The portrait is desaturated. The frame applies `mix-blend-luminosity`, the
 * same treatment the co-authorship carousel gives its portraits; `grayscale`
 * reproduces it without depending on what sits behind the image, which is what
 * a blend mode would.
 */
export function AuthorProfileHero({
  author,
  className,
}: AuthorProfileHeroProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {/* Two beats, not four arrivals: the portrait with the name, then what
          is said about them. One person being introduced, not a profile being
          assembled. */}
      <Reveal preset="heroReveal">
        <div className="relative size-[160px] shrink-0 overflow-hidden rounded-full">
          <Image
            src={author.portrait}
            alt={`Retrato de ${author.name}`}
            fill
            sizes="160px"
            priority
            className="object-cover grayscale"
          />
        </div>

        {/* Figma leaves 28px between the portrait and the name. */}
        <h1 className="text-slab-sub mt-7">{author.name}</h1>
      </Reveal>

      <Reveal preset="heroReveal" delay={MOTION_HERO_DELAY}>
        {author.shortDescription ? (
          <p className="text-body text-muted mt-3">{author.shortDescription}</p>
        ) : null}

        {author.bio ? (
          /* Figma leaves 39px between the short line and the biography. */
          <p className="text-body text-muted mt-10 max-w-[1200px]">
            {author.bio}
          </p>
        ) : null}
      </Reveal>
    </div>
  );
}
