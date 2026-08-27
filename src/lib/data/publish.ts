import { SUBMISSION_GENRE_OPTIONS } from "@/lib/content/submission-genres";
import { PUBLISH_CONTENT } from "@/lib/content/publish";
import type { PublishContent, SelectOption } from "@/types";

/**
 * The seam between `/publique` and wherever its content lives.
 *
 * Only this module knows the origin: the page awaits these, `PublishSection`
 * and `SubmissionForm` receive plain props, and none of them import
 * `lib/content/*`. Swapping either source for a CMS is a change here alone.
 *
 * Two functions rather than one, because the page has two sources that are not
 * the same kind of thing. The institutional copy is page content; the genre
 * list is a taxonomy of its own. Keeping them apart is the arrangement the
 * content layer already chose, and it means either can move behind a CMS
 * without dragging the other along.
 *
 * These are the genres the publisher *accepts*, which is not the catalogue
 * taxonomy — that one lives in `lib/content/genres.ts` and is served by
 * `getGenres`. The two lists are deliberately unrelated.
 *
 * Both are already async so the migration never has to reach back into
 * `page.tsx`; the route still prerenders.
 *
 * Neither sorts: the copy is a fixed structure, and the genres are declared in
 * the order the page's own "O que aceitamos" list states them.
 */
export async function getPublishContent(): Promise<PublishContent> {
  return PUBLISH_CONTENT;
}

export async function getSubmissionGenreOptions(): Promise<SelectOption[]> {
  return SUBMISSION_GENRE_OPTIONS;
}
