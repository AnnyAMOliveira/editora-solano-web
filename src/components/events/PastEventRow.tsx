import { formatMonthYear } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PastEvent } from "@/types";

interface PastEventRowProps {
  event: PastEvent;
  className?: string;
}

/**
 * Figma `Agenda Entry` inside "Já Aconteceu" (1319 × 61, node 506:2298): the
 * month and year in the same 72px column the upcoming rows use, then one line
 * about what happened.
 *
 * The design shows no title and no action here — an event that already
 * happened has nothing to sign up for — so the row renders neither. The title
 * stays in the data all the same; see `PastEvent`.
 *
 * It keeps the 72px column and the 18px gap of the upcoming row on purpose:
 * the two lists sit on the same page and should read as one ruled column,
 * even though one of them carries far more.
 */
export function PastEventRow({ event, className }: PastEventRowProps) {
  return (
    <li
      className={cn(
        "border-muted/20 flex w-full items-center gap-[18px] border-b py-5",
        className,
      )}
    >
      <p className="text-slab-small text-muted shrink-0 sm:w-[72px] sm:text-center">
        <time dateTime={event.date}>{formatMonthYear(event.date)}</time>
      </p>

      <p className="text-body">{event.description}</p>
    </li>
  );
}
