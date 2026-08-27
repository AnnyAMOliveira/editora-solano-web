import { CATALOG_CONTENT } from "@/lib/content/catalog";
import { getBooks } from "@/lib/data/books";
import { getGenres } from "@/lib/data/genres";
import type { CatalogContent } from "@/types";

/**
 * The seam between `/catalogo` and wherever its content lives.
 *
 * A composition module, like `lib/data/home.ts`: it does not own an origin of
 * its own. The copy comes from `lib/content/catalog.ts`, the books and the
 * genres from the two domain modules the Home already reads, so nothing here
 * duplicates a source and a CMS can take over each of the three separately.
 *
 * The two entity calls run together rather than in sequence. Today each
 * resolves immediately, so it changes nothing; the day they become network
 * calls it is the difference between one round trip and two.
 *
 * ## No filtering here
 *
 * This returns the whole catalogue. Filtering by genre and by title is
 * interaction — the reader changes it without leaving the page — so it belongs
 * to the browsing component, with the predicate itself in `lib/catalog.ts`
 * where it can be read on its own.
 *
 * That stops being true the day the catalogue is large enough that shipping it
 * whole is wasteful, or the day a CMS can filter server-side more cheaply than
 * we can in the browser. At that point this function grows arguments and the
 * work moves here — which is exactly why the component receives a plain list
 * and never learns where it came from.
 *
 * ## No sorting
 *
 * `Book` carries no ordering field and the design states no order. Imposing
 * one here would be inventing a rule the data does not declare. See
 * `lib/data/books.ts`, which makes the same call for the same reason.
 */
export async function getCatalogContent(): Promise<CatalogContent> {
  const [books, genres] = await Promise.all([getBooks(), getGenres()]);

  return { ...CATALOG_CONTENT, books, genres };
}
