import { ABOUT_CONTENT } from "@/lib/content/about";
import type { AboutContent } from "@/types";

/**
 * The seam between `/sobre` and wherever its content lives.
 *
 * Only this module knows the origin: the page awaits it, the sections receive
 * plain props, and none of them import `lib/content/about.ts`. Swapping the
 * source for a CMS is a change to this function's body alone.
 *
 * Already async so the migration never has to reach back into `page.tsx`; the
 * route still prerenders.
 *
 * No sorting. The five principles of "O Método Solano" carry a `number` — but
 * that is the ordinal the design typesets, a label rather than a key, and the
 * content declares the sequence it wants. Ordering by it would impose a rule
 * the data does not state.
 */
export async function getAboutContent(): Promise<AboutContent> {
  return ABOUT_CONTENT;
}
