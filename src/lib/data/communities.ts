import { COMMUNITIES_CONTENT } from "@/lib/content/communities";
import type { CommunitiesContent } from "@/types";

/**
 * The seam between `/comunidades` and wherever its content lives.
 *
 * This is the only module in the app that knows the origin. The page awaits
 * it, the sections and the card receive plain props, and none of them import
 * `lib/content/communities.ts`. Replacing the source with a CMS or an API is
 * therefore a change to this function's body and nothing else.
 *
 * ## Why it is already async
 *
 * A CMS query returns a promise. Declaring this synchronous today would mean
 * the page consumes it synchronously, and the migration would have to reach
 * back into `page.tsx`. Awaiting a value that is currently immediate costs
 * nothing — the route still prerenders — and keeps the future edit contained.
 *
 * ## Why the sort lives here
 *
 * `order` is a property of the data, not of the layout. Sorting here means the
 * card never learns the field exists, and an administrator reordering the list
 * changes a number rather than a file's line order. The copy is deliberate:
 * `sort` mutates in place, and the source constant must not be reordered as a
 * side effect of rendering.
 *
 * ## Where a mapping layer would go
 *
 * If a CMS returns Portuguese keys, or dates as objects, or status as an enum
 * id, the translation into the internal English types belongs in this function
 * — the arrangement `CLAUDE.md` asks for. Components stay unaware.
 */
export async function getCommunitiesContent(): Promise<CommunitiesContent> {
  const { communities, ...rest } = COMMUNITIES_CONTENT;

  return {
    ...rest,
    communities: [...communities].sort((a, b) => a.order - b.order),
  };
}
