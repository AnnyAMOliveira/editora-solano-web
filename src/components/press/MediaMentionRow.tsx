import { formatLongMonthYear } from "@/lib/format";
import { isExternalHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { MediaMention } from "@/types";

interface MediaMentionRowProps {
  mention: MediaMention;
  className?: string;
}

/**
 * Figma `Agenda Entries` on Imprensa (693 × 92, node 519:2150): the outlet and
 * the kind of piece on one line with the date opposite them, then the title,
 * over a bottom hairline.
 *
 * Unlike every other list row in the project this one carries no horizontal
 * padding — the frame sets the entries flush with the column edge (px 0),
 * while the Mídia Kit rows beside them are inset by 10. The two lists are
 * deliberately not uniformised.
 *
 * Only the title is a link. The design draws no arrow, no underline and no
 * hover on this row, so making the whole row clickable would invent an
 * affordance; the title alone keeps the click target where the reader is
 * already looking. Hover follows `ContactChannel` — terra plus an underline —
 * so the two link idioms on the page read as one.
 *
 * The row is a plain anchor rather than a `next/link`: these destinations
 * leave the app once the real URLs arrive, and a client-side navigation to an
 * outlet's article would be wrong. `EpisodeRow` makes the same call.
 *
 * Below `sm` the date drops under the outlet instead of being squeezed against
 * it at the far edge of a narrow column.
 */
export function MediaMentionRow({ mention, className }: MediaMentionRowProps) {
  const isExternal = isExternalHref(mention.href);

  return (
    <li
      className={cn(
        "border-muted/20 flex w-full flex-col gap-2.5 border-b py-5",
        className,
      )}
    >
      <div className="text-slab-small text-muted flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <p>{`${mention.outlet} · ${mention.kind}`}</p>

        <p className="shrink-0 sm:text-right">
          <time dateTime={mention.publishedAt}>
            {formatLongMonthYear(mention.publishedAt)}
          </time>
        </p>
      </div>

      <h3 className="text-slab-sub text-balance">
        <a
          href={mention.href}
          {...(isExternal
            ? { target: "_blank" as const, rel: "noopener noreferrer" }
            : {})}
          className="hover:text-terra relative underline-offset-4 transition-colors duration-200 hover:underline"
        >
          {mention.title}
          {isExternal ? (
            <span className="sr-only"> (abre em nova aba)</span>
          ) : null}
        </a>
      </h3>
    </li>
  );
}
