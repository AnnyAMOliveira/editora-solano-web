import { formatDayMonth } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AgendaEvent } from "@/types";

interface AgendaEntryProps {
  event: AgendaEvent;
  className?: string;
}

/**
 * Figma `Agenda - Card` (527 wide): the `DD/MM` date in a fixed 42px column,
 * then title and description, over a bottom hairline.
 *
 * The date column drops above the text below `sm`, where 42px plus an 18px gap
 * would leave the title too narrow to read.
 */
export function AgendaEntry({ event, className }: AgendaEntryProps) {
  return (
    <article
      className={cn(
        "flex w-full flex-col gap-2 border-b border-muted/20 py-5 sm:flex-row sm:items-start sm:gap-[18px]",
        className,
      )}
    >
      <p className="text-slab-menu text-muted shrink-0 sm:w-[42px]">
        <time dateTime={event.date}>{formatDayMonth(event.date)}</time>
      </p>

      <div className="flex flex-col items-start gap-2.5">
        <h3 className="text-slab-sub text-balance">{event.title}</h3>
        <p className="text-body">{event.description}</p>
      </div>
    </article>
  );
}
