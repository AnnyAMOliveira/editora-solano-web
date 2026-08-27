import { EpisodeRow } from "@/components/podcast/EpisodeRow";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/motion";
import type { Episode } from "@/types";

interface EpisodesSectionProps {
  title: string;
  year: string;
  episodes: Episode[];
  /** Approved sentence for when nothing is published. */
  emptyMessage: string;
}

/**
 * Figma: Podcast › `Agenda Section` (500:1778) — the list title with the year
 * opposite it, over the episode rows.
 *
 * Header and year reuse `SectionHeading` with its `action` slot, exactly the
 * arrangement the Home's Agenda already uses, so the two lists read as the
 * same object in two places.
 *
 * No pagination: the design draws none, and five rows do not need one. When
 * the archive grows past what a single page should carry, that is a new
 * decision rather than something to guess at now.
 *
 * Heading as a block, then the rows. The play control inside a row is not a
 * group of its own: it arrives with its episode, and an audio control that
 * fades in is a control the reader has to wait for.
 */
export function EpisodesSection({
  title,
  year,
  episodes,
  emptyMessage,
}: EpisodesSectionProps) {
  return (
    <Section ariaLabel={title}>
      <Container>
        <Reveal>
          <SectionHeading
            title={title}
            action={<p className="text-slab-menu text-muted">{year}</p>}
          />
        </Reveal>

        {/* Figma leaves 75px between the header and the first row. */}
        {episodes.length > 0 ? (
          <Reveal as="ul" preset="staggerCards" className="mt-12 lg:mt-[75px]">
            {episodes.map((episode) => (
              <EpisodeRow key={episode.id} episode={episode} />
            ))}
          </Reveal>
        ) : (
          <EmptyState message={emptyMessage} className="mt-12 lg:mt-[75px]" />
        )}
      </Container>
    </Section>
  );
}
