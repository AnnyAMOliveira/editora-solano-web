import { cn } from "@/lib/utils";
import { MOTION_HERO_DELAY, Reveal } from "@/motion";
import type { PageHero } from "@/types";

interface PageHeroBlockProps {
  hero: PageHero;
  className?: string;
  /** Publique caps the headline at the 639px the design sets. */
  titleClassName?: string;
}

/**
 * The opening editorial block of an inner page: eyebrow, display headline and
 * the lead paragraphs, 20px apart — the arrangement Figma repeats on Sobre,
 * Publique and Contato.
 *
 * No bottom rule here: only Sobre draws one, and it belongs to that page's
 * layout rather than to this block.
 *
 * ## The hero arrives in two beats
 *
 * What names the page — eyebrow and headline — then what explains it. Both
 * beats are `heroReveal`, whose stagger is zero, so the elements inside a beat
 * move together: an eyebrow that arrives before its own headline reads as an
 * interface assembling itself, which is the one thing the art direction rules
 * out.
 *
 * Putting the `<Reveal>` inside the component rather than around it is what
 * makes that true of every page at once: seven routes use this block, and a
 * wrapper at each call site would animate the block as a single unit and drift
 * apart over time.
 *
 * It reaches Publique and Contato too, which were not in the brief for the
 * round that added it. That is consistency rather than scope: a page hero is a
 * page hero, and these are above the fold like all the others, so the entrance
 * is translate-only and never hides a word of them.
 */
export function PageHeroBlock({
  hero,
  className,
  titleClassName,
}: PageHeroBlockProps) {
  return (
    <div className={cn("flex flex-col items-start gap-5", className)}>
      <Reveal preset="heroReveal">
        <p className="text-slab-sub">{hero.eyebrow}</p>

        <h1 className={cn("text-display", titleClassName)}>{hero.title}</h1>
      </Reveal>

      <Reveal preset="heroReveal" delay={MOTION_HERO_DELAY}>
        {hero.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-body-lg">
            {paragraph}
          </p>
        ))}
      </Reveal>
    </div>
  );
}
