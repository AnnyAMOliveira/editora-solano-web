import { PastEventRow } from "@/components/events/PastEventRow";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { Reveal } from "@/motion";
import type { PastEvent } from "@/types";

interface PastEventsSectionProps {
  title: string;
  events: PastEvent[];
  /** Approved sentence for when nothing has been recorded yet. */
  emptyMessage: string;
}

/**
 * Figma: Agenda › `Section 5` (506:2252) — the tinted band closing the page
 * with what has already happened.
 *
 * Ground and spiral follow the pattern the Home's "Como Publicar" band set:
 * `watermark/20` behind the section, the decoration bleeding off one edge. The
 * crop is this frame's own — 259 × 264, the smallest of the set — and it sits
 * on the right here rather than the left.
 *
 * Heading as a block, then the rows. The spiral is not animated: it is a
 * watermark, and a decoration should not arrive like content.
 */
export function PastEventsSection({
  title,
  events,
  emptyMessage,
}: PastEventsSectionProps) {
  return (
    <Section
      ariaLabel={title}
      className="bg-watermark/20 relative overflow-hidden"
    >
      <SpiralDecoration
        name="events-right"
        className="top-0 right-0 hidden lg:block"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading titleVariant="display" title={title} />
        </Reveal>

        {/* Figma leaves 40px between the heading block and the first row. */}
        {events.length > 0 ? (
          <Reveal as="ul" preset="staggerCards" className="mt-10">
            {events.map((event) => (
              <PastEventRow key={event.id} event={event} />
            ))}
          </Reveal>
        ) : (
          <EmptyState message={emptyMessage} className="mt-10" />
        )}
      </Container>
    </Section>
  );
}
