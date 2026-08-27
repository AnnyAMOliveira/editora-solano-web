import { Button } from "@/components/ui/Button";
import { formatDayNumber, formatMonthAndTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ScheduledEvent } from "@/types";

interface EventRowProps {
  event: ScheduledEvent;
  /** CTA wording — page copy, so it arrives from the content layer. */
  ctaLabel: string;
  className?: string;
}

/**
 * Figma `Agenda Entry` on the agenda page (1319 × 148, node 504:2148): the day
 * in Playfair over month and time in a 72px centred column, then category,
 * title, description and place, with the sign-up CTA at the far edge.
 *
 * Deliberately not the Home's `AgendaEntry`. That row is a preview — a `DD/MM`
 * label in a 42px column, a title and a line of description. This one is the
 * full record, five slots and an action, with a date block built from a
 * different type scale. Same entity, two densities; folding them together
 * would mean a component that is mostly branches.
 *
 * Below `sm` the three parts stack in reading order — when, what, then the
 * way in — which is the ladder the agenda row on the Home already set.
 */
export function EventRow({ event, ctaLabel, className }: EventRowProps) {
  return (
    <li
      className={cn(
        "border-muted/20 flex w-full flex-col gap-4 border-b py-5",
        "sm:flex-row sm:items-center sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-[18px]">
        <p className="flex shrink-0 flex-row items-baseline gap-2 sm:w-[72px] sm:flex-col sm:items-center sm:gap-[11px]">
          <time dateTime={event.date} className="text-h2">
            {formatDayNumber(event.date)}
          </time>
          <span className="text-slab-small text-muted">
            {formatMonthAndTime(event.date, event.time)}
          </span>
        </p>

        <div className="flex flex-col items-start gap-2.5">
          <p className="text-slab-small text-muted">{event.category}</p>
          <h3 className="text-slab-sub text-balance">{event.title}</h3>
          <p className="text-body">{event.description}</p>
          <p className="text-slab-small text-muted">{event.location}</p>
        </div>
      </div>

      {/* Four rows carry the same wording, so the event is named for screen
          readers — otherwise a list of links reads as "Quero Participar" four
          times over. `relative` keeps that `sr-only` note positioned inside the
          button instead of against a distant ancestor. */}
      <Button
        href={event.href}
        variant="outline"
        className="relative self-start sm:self-auto"
      >
        {ctaLabel}
        <span className="sr-only">{`: ${event.title}`}</span>
      </Button>
    </li>
  );
}
