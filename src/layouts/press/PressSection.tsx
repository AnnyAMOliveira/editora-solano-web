import { MediaKitItem } from "@/components/press/MediaKitItem";
import { MediaMentionRow } from "@/components/press/MediaMentionRow";
import { PressContactCard } from "@/components/press/PressContactCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeroBlock } from "@/components/ui/PageHeroBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/motion";
import type { PressContent } from "@/types";

interface PressSectionProps {
  /** Both lists arrive already sorted by `lib/data/press.ts`. */
  content: PressContent;
}

/**
 * Figma: Imprensa › `Section1` (519:1829).
 *
 * Two columns that do not talk to each other — 693 and 572 with 55 between
 * them, which is the project's 1320 content column. The frame runs them
 * independently: the ink card starts 54px below the hero's eyebrow and the
 * Mídia Kit heading sits well above "Na Mídia". That offset is the design, so
 * the columns are two separate flex stacks rather than the 2 × 2 grid the
 * Contato page uses, which would pull the second row of both columns onto one
 * baseline.
 *
 * ## How the mobile order is obtained without duplicating anything
 *
 * Stacked, the page must read hero → assessoria → Na Mídia → Mídia Kit, which
 * interleaves the two columns. The two wrappers are therefore `display:
 * contents` below `lg`: they generate no box, the four blocks become direct
 * children of the single-column grid, and `order` puts them in reading order.
 * From `lg` up the wrappers become flex columns again and the same `order`
 * values are already in sequence within each one, so they change nothing.
 *
 * ## Empty states
 *
 * Neither list disappears when it is empty: the heading, the year and the
 * spacing stay, and an editorial line takes the list's place — the rule
 * `CLAUDE.md` sets for administrable sections inside an institutional page.
 * Both messages come from `lib/content/press.ts`, not from here.
 *
 * ## Motion
 *
 * The hero cascade comes from `PageHeroBlock`. Each heading, the assessoria
 * card and each list is its own group, so the four blocks arrive in the order
 * the reader meets them rather than as one column following another.
 *
 * The `<Reveal>` around the assessoria card nests inside the `display:
 * contents` wrapper described above. That is safe precisely because neither
 * generates a box: below `lg` the card is still a direct grid item, so its
 * `order-2` still places it between the hero and "Na Mídia".
 *
 * The mídia kit fades rather than cascading — the same call `MaterialsSection`
 * makes for the same reason. These are download rows, an inventory read as one
 * thing, not cards to browse.
 */
export function PressSection({ content }: PressSectionProps) {
  return (
    <section
      aria-label="Imprensa"
      className="pt-16 pb-10 md:pb-section lg:pt-[88px]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,693px)_minmax(0,572px)] lg:items-start lg:gap-x-[55px]">
          <div className="contents lg:flex lg:flex-col">
            <PageHeroBlock hero={content.hero} className="order-1" />

            {/* Figma leaves 78px between the lead line and the heading. */}
            <section
              aria-label={content.mentionsTitle}
              className="order-3 mt-12 lg:mt-[78px]"
            >
              <Reveal>
                <SectionHeading
                  title={content.mentionsTitle}
                  action={
                    <p className="text-slab-menu text-muted">
                      {content.mentionsYear}
                    </p>
                  }
                />
              </Reveal>

              {/* Figma leaves 50px between the heading and the first row. */}
              <div className="mt-8 lg:mt-[50px]">
                {content.mentions.length > 0 ? (
                  <Reveal as="ul" preset="staggerCards">
                    {content.mentions.map((mention) => (
                      <MediaMentionRow key={mention.id} mention={mention} />
                    ))}
                  </Reveal>
                ) : (
                  <EmptyState message={content.mentionsEmptyMessage} />
                )}
              </div>
            </section>
          </div>

          <div className="contents lg:flex lg:flex-col">
            {/* Figma starts the right column 54px below the left one. */}
            <Reveal>
              <PressContactCard
                contact={content.contact}
                className="order-2 mt-10 lg:mt-[54px]"
              />
            </Reveal>

            {/* Figma leaves 41px between the card and the heading. */}
            <section
              aria-label={content.mediaKitTitle}
              className="order-4 mt-12 lg:mt-[41px]"
            >
              <Reveal>
                <SectionHeading
                  title={content.mediaKitTitle}
                  action={
                    <p className="text-slab-menu text-muted">
                      {content.mediaKitYear}
                    </p>
                  }
                />
              </Reveal>

              {/* Figma leaves 35px between the heading and the first row. */}
              <div className="mt-8 lg:mt-[35px]">
                {content.mediaKit.length > 0 ? (
                  <Reveal as="ul" preset="fadeIn">
                    {content.mediaKit.map((asset) => (
                      <MediaKitItem key={asset.id} asset={asset} />
                    ))}
                  </Reveal>
                ) : (
                  <EmptyState message={content.mediaKitEmptyMessage} />
                )}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
