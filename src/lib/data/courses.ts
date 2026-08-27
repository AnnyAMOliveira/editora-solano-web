import { COURSES_CONTENT } from "@/lib/content/courses";
import type { CoursesContent } from "@/types";

/**
 * The seam between `/cursos` and wherever its content lives.
 *
 * This is the only module in the app that knows the origin. The page awaits
 * it, the sections and the cards receive plain props, and none of them import
 * `lib/content/courses.ts`. Replacing the source with a CMS or an API is
 * therefore a change to this function's body and nothing else.
 *
 * It is already async for the same reason `getCommunitiesContent` is: a CMS
 * query returns a promise, and awaiting a value that is currently immediate
 * costs nothing while keeping the future edit contained to this file. The
 * route still prerenders.
 *
 * No sorting here. Unlike communities, courses carry no `order` field — the
 * design fixes three offerings in the sequence the content declares, and
 * inventing an ordering key the data does not have would be guessing at a
 * rule nobody set. When the list becomes administered and needs reordering,
 * this is where that sort belongs.
 *
 * A CMS returning Portuguese keys, or a different shape, would be translated
 * into the internal types right here — the mapping layer `CLAUDE.md` asks for.
 */
export async function getCoursesContent(): Promise<CoursesContent> {
  return COURSES_CONTENT;
}
