import { CATALOG_GENRES } from "@/lib/content/genres";
import type { Genre } from "@/types";

/**
 * The seam between the app and wherever the catalogue genres live.
 *
 * A domain module: the Home grid reads it today and `/catalogo` will read it
 * next, both to draw its filter and to resolve the `?genero=<slug>` the Home
 * links to. Already async so the CMS migration never has to reach back into a
 * page; the routes still prerender.
 *
 * The source is `lib/content/genres.ts` rather than `lib/mocks/`: the eight
 * genres are the publisher's official taxonomy, not demonstration data.
 *
 * No sorting. `Genre.number` is the "01"…"08" the design typesets — editorial
 * ordering already reflected in the content's sequence, and a label rather
 * than a key. Sorting by it would impose a rule the data does not state.
 *
 * Not to be confused with `getSubmissionGenreOptions` in `lib/data/publish.ts`:
 * that one is the list of genres the editor accepts through the submission
 * form, a different taxonomy that happens to share a word.
 */
export async function getGenres(): Promise<Genre[]> {
  return CATALOG_GENRES;
}
