import { CommunityCard } from "@/components/communities/CommunityCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeroBlock } from "@/components/ui/PageHeroBlock";
import { Reveal } from "@/motion";
import type { Community, PageHero } from "@/types";

interface CommunitiesSectionProps {
  hero: PageHero;
  /** Already ordered by `lib/data/communities.ts`; this layer only renders. */
  communities: Community[];
  /** Approved sentence for when no group is open. */
  emptyMessage: string;
  ctaLabel: string;
}

/**
 * Figma: Comunidades › `Section1` (508:2334) — the editorial opening over the
 * grid of groups.
 *
 * The cards butt against one another rather than sitting apart: the design
 * places them at x 0/660 and y 0/263, so neighbouring hairlines overlap into a
 * single rule. That is the arrangement the Home's genre grid already uses, and
 * the same negative-margin trick reproduces it — a leading 1px of padding on
 * the grid, and every cell pulled back over its neighbour.
 *
 * Four cards fill two rows evenly at both one and two columns, so unlike the
 * courses grid there is never an orphan on the last row.
 *
 * The hero cascade comes from `PageHeroBlock`; the grid cascades as cards.
 * `<Reveal as="ul">` *is* the grid rather than a wrapper inside it, because the
 * hairline collapse is written as `[&>*]:-mt-px` — a transparent wrapper would
 * leave that selector matching the wrapper, which has no box to pull back, and
 * the doubled borders would return. Hover on the cards is untouched.
 */
export function CommunitiesSection({
  hero,
  communities,
  emptyMessage,
  ctaLabel,
}: CommunitiesSectionProps) {
  return (
    <section
      aria-label="Comunidades"
      className="pt-16 pb-10 md:pb-section lg:pt-[88px]"
    >
      <Container>
        <PageHeroBlock hero={hero} />

        {/* Figma leaves 68px between the lead line and the grid. */}
        {communities.length > 0 ? (
          <Reveal
            as="ul"
            preset="staggerCards"
            className="mt-12 grid grid-cols-1 pt-px pl-px sm:grid-cols-2 lg:mt-16 [&>*]:-mt-px [&>*]:-ml-px"
          >
            {communities.map((community) => (
              <li key={community.id} className="flex">
                <CommunityCard community={community} ctaLabel={ctaLabel} />
              </li>
            ))}
          </Reveal>
        ) : (
          <EmptyState message={emptyMessage} className="mt-12 lg:mt-16" />
        )}
      </Container>
    </section>
  );
}
