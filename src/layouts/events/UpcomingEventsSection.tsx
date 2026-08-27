import { EventRow } from "@/components/events/EventRow";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeroBlock } from "@/components/ui/PageHeroBlock";
import { Reveal } from "@/motion";
import type { PageHero, ScheduledEvent } from "@/types";

interface UpcomingEventsSectionProps {
  hero: PageHero;
  events: ScheduledEvent[];
  /** Approved sentence for when nothing is scheduled. */
  emptyMessage: string;
  ctaLabel: string;
}

/**
 * Figma: Agenda › `Section1` (504:1876) — the editorial opening over the list
 * of what is coming.
 *
 * The hero text is capped at the 919px the design gives its container rather
 * than running the full 1320 content column; the lead line is meant to break
 * after two lines, not stretch across the page.
 *
 * The hero cascade comes from `PageHeroBlock` itself. Here the list is the
 * group: one entrance for the rows, none for the controls inside them — an
 * event's call to action arrives with its row, not on its own.
 */
export function UpcomingEventsSection({
  hero,
  events,
  emptyMessage,
  ctaLabel,
}: UpcomingEventsSectionProps) {
  return (
    <section
      aria-label="Próximos eventos"
      className="pt-16 pb-10 md:pb-section lg:pt-[88px]"
    >
      <Container>
        <PageHeroBlock hero={hero} className="max-w-[919px]" />

        {/* Figma leaves 94px between the lead line and the first row. */}
        {events.length > 0 ? (
          <Reveal as="ul" preset="staggerCards" className="mt-12 lg:mt-24">
            {events.map((event) => (
              <EventRow key={event.id} event={event} ctaLabel={ctaLabel} />
            ))}
          </Reveal>
        ) : (
          <EmptyState message={emptyMessage} className="mt-12 lg:mt-24" />
        )}
      </Container>
    </section>
  );
}
