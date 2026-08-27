import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/types";

interface TimelineItemProps {
  entry: TimelineEntry;
  className?: string;
}

/**
 * Figma `Timeline Entry` (536 wide): the entry number in a narrow left column,
 * then title and description, over a bottom hairline.
 *
 * Shared by the Home ("Como Publicar"), the About page ("O Método Solano") and
 * the Publique conditions, which is why it lives in `ui/` rather than under a
 * single domain folder.
 *
 * The number column is optional: Publique uses the same row without ordinals,
 * and dropping the column there also drops its 24px gap, exactly as in Figma.
 */
export function TimelineItem({ entry, className }: TimelineItemProps) {
  return (
    <li
      className={cn(
        "flex w-full border-b border-muted/20 px-2.5 py-3.5",
        entry.number ? "gap-6" : undefined,
        className,
      )}
    >
      {entry.number ? (
        <p className="text-slab-menu text-muted w-[17px] shrink-0">
          {entry.number}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-2.5">
        <h3 className="text-slab-sub text-balance">{entry.title}</h3>
        <p className="text-body">{entry.description}</p>
      </div>
    </li>
  );
}
