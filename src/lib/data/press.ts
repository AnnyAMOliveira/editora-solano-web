import { PRESS_CONTENT } from "@/lib/content/press";
import type { PressContent } from "@/types";

/**
 * The seam between `/imprensa` and wherever its content lives.
 *
 * Only this module knows the origin: the page awaits it, `PressSection` and
 * the three row components receive plain props, and none of them import
 * `lib/content/press.ts`. Swapping either list for a CMS is a change to this
 * function's body alone.
 *
 * Already async so the migration never has to reach back into `page.tsx`; the
 * route still prerenders.
 *
 * ## Sorting
 *
 * Both lists are sorted here rather than in the content, because ordering is a
 * property of the data and not of the layout — the rows never learn that
 * either field exists.
 *
 * Media appearances run newest first, the order a clipping is read in.
 * `publishedAt` is `YYYY-MM-DD`, which sorts correctly as a string, so no
 * `Date` is constructed and no timezone can shift the result.
 *
 * Kit files follow their own `order`, so an administrator reorders the list by
 * changing a number instead of rewriting a file. Both copies are deliberate:
 * `sort` mutates in place, and the source constant must not be reordered as a
 * side effect of rendering.
 *
 * ## Where a mapping layer would go
 *
 * If a CMS returns Portuguese keys, or the outlet and the kind glued into one
 * string, or a file as an asset object rather than a URL, the translation into
 * the internal English types belongs in this function — the arrangement
 * `CLAUDE.md` asks for. Components stay unaware.
 */
export async function getPressContent(): Promise<PressContent> {
  const { mentions, mediaKit, ...rest } = PRESS_CONTENT;

  return {
    ...rest,
    mentions: [...mentions].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    ),
    mediaKit: [...mediaKit].sort((a, b) => a.order - b.order),
  };
}
