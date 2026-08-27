import { PlayIcon } from "@/components/ui/PlayIcon";
import { formatDuration } from "@/lib/format";
import { isExternalHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { Episode } from "@/types";

interface EpisodeRowProps {
  episode: Episode;
  className?: string;
}

/**
 * Figma `Agenda Entry` on Podcast (1319 × 97, node 500:1839): the episode
 * number in a fixed 42px column, then title and description, with the running
 * time and the play control pushed to the far edge, over a bottom hairline.
 *
 * It looks like the Home's `AgendaEntry` and is deliberately not the same
 * component: that row is a date and an event, this one is a number, an episode,
 * a length and an action. The shared appearance is a coincidence of the design
 * language, not a shared concept, and merging them would make the agenda carry
 * a play control it has no use for.
 *
 * Below `sm` the number moves above the text — the behaviour the agenda row
 * already established — and the time and play control drop to a line of their
 * own, right-aligned, instead of squeezing beside a narrow title.
 */
export function EpisodeRow({ episode, className }: EpisodeRowProps) {
  return (
    <li
      className={cn(
        "border-muted/20 flex w-full flex-col gap-4 border-b py-5",
        "sm:flex-row sm:items-start sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-[18px]">
        <p className="text-slab-menu text-muted shrink-0 sm:w-[42px]">
          {`#${episode.number}`}
        </p>

        <div className="flex flex-col items-start gap-2.5">
          <h3 className="text-slab-sub text-balance">{episode.title}</h3>
          <p className="text-body">{episode.description}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2.5">
        <p className="text-slab-menu text-muted">
          {formatDuration(episode.durationMinutes)}
        </p>

        <PlayLink episode={episode} />
      </div>
    </li>
  );
}

/**
 * The 54px disc: `mata` ground, `areia` mark — both straight from the palette,
 * so no asset is involved.
 *
 * The design draws only the resting state. Hover swaps the ground to `ink`,
 * the one token dark enough to read as a press without inventing a colour, and
 * focus falls through to the global `:focus-visible` ring.
 *
 * There is no player: this is a link to wherever the episode lives. External
 * destinations open in a new tab, which the note announces — and that note is
 * `sr-only`, hence `relative` on the anchor, or it would position against a
 * far-off ancestor and drag the page's scroll width with it.
 */
function PlayLink({ episode }: { episode: Episode }) {
  const isExternal = isExternalHref(episode.href);

  return (
    <a
      href={episode.href}
      {...(isExternal
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {})}
      className="bg-mata text-areia hover:bg-ink relative inline-flex size-[54px] shrink-0 items-center justify-center rounded-full transition-colors duration-200"
    >
      <PlayIcon />
      <span className="sr-only">
        {`Ouvir episódio #${episode.number}: ${episode.title}`}
        {isExternal ? " (abre em nova aba)" : ""}
      </span>
    </a>
  );
}
