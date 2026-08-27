import { BOOK_PAGE_CONTENT } from "@/lib/content/book";
import { getAuthorsByIds } from "@/lib/data/authors";
import { getGenres } from "@/lib/data/genres";
import { MOCK_BOOKS } from "@/lib/mocks";
import type { Book, BookPageData } from "@/types";

/**
 * The seam between the app and wherever books live.
 *
 * A domain module rather than a page one: the Home shows a row of releases,
 * `/catalogo` lists them all and `/catalogo/[slug]` shows one. All of them
 * come through here, so the day books come from a CMS there is a single place
 * to change and no page notices.
 *
 * Already async so that migration never has to reach back into a page; the
 * routes still prerender.
 *
 * No sorting. `Book` carries no ordering field, and the row on the Home is a
 * curated selection whose sequence the content declares. A catalogue will
 * likely want its own ordering — that belongs here too, as arguments to this
 * function or as siblings of it, not in a component.
 */
export async function getBooks(): Promise<Book[]> {
  return MOCK_BOOKS;
}

/**
 * One book by its public slug, or `undefined` when there is none.
 *
 * `undefined` rather than a throw: whether a missing book is a 404, a redirect
 * or an empty state is the route's decision, not this module's.
 */
export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  const books = await getBooks();
  return books.find((book) => book.slug === slug);
}

/**
 * Books to recommend beside a given one.
 *
 * ## How they are chosen
 *
 * By shared main genre — the first entry of `genreSlugs`, which is the same
 * one the breadcrumb shows. A book is a candidate if that slug appears
 * anywhere in its own `genreSlugs`, so a title filed under several genres is
 * reachable from each of them.
 *
 * There is deliberately no `relatedBookIds` field yet. Curated recommendations
 * are an editorial job, and inventing one book's affinity for another is not
 * something code should decide. Shared genre is the honest automatic answer
 * until someone curates; when they do, this function reads the new field and
 * the page does not change.
 *
 * ## What it does not do
 *
 * No padding. If the genre has no other book the result is empty and the band
 * renders nothing — filling the gap with unrelated titles would be presenting
 * a recommendation the publisher never made. With five books and eight genres
 * this is the common case today, not the exception.
 */
export async function getRecommendedBooks(
  book: Book,
  limit = 5,
): Promise<Book[]> {
  const [mainGenreSlug] = book.genreSlugs;
  if (!mainGenreSlug) return [];

  const books = await getBooks();

  return books
    .filter(
      (candidate) =>
        candidate.id !== book.id &&
        candidate.genreSlugs.includes(mainGenreSlug),
    )
    .slice(0, limit);
}

/**
 * Everything `/catalogo/[slug]` renders, in one answer.
 *
 * A composition module, like `lib/data/home.ts`: the copy comes from
 * `lib/content/book.ts`, the book and its recommendations from this file, the
 * authors from `lib/data/authors.ts` and the genre from `lib/data/genres.ts`.
 * Nothing here owns a new origin.
 *
 * **The page receives entities, never ids.** Resolving `authorIds` and the
 * genre slug is join work, and joins belong to the data layer — that is what
 * lets a CMS answer them natively later without any component learning that
 * ids ever existed.
 *
 * The three lookups run together rather than in sequence. Today each resolves
 * immediately; the day they become network calls it is one round trip instead
 * of three.
 *
 * Returns `undefined` when the slug matches no book, so the route can call
 * `notFound()`.
 */
export async function getBookPageData(
  slug: string,
): Promise<BookPageData | undefined> {
  const book = await getBookBySlug(slug);
  if (!book) return undefined;

  const [authors, genres, recommendations] = await Promise.all([
    getAuthorsByIds(book.authorIds),
    getGenres(),
    getRecommendedBooks(book),
  ]);

  // The breadcrumb shows the FIRST genre. A book can sit in several, and the
  // trail has room for one — taking the first makes the choice editorial
  // (reorder the array to change it) instead of alphabetical or accidental.
  const [mainGenreSlug] = book.genreSlugs;
  const mainGenre = genres.find((genre) => genre.slug === mainGenreSlug);

  return {
    copy: BOOK_PAGE_CONTENT,
    book,
    authors,
    mainGenre,
    recommendations,
  };
}

/**
 * Everything a given author wrote.
 *
 * The inverse reading of `Book.authorIds`. It lives here rather than in
 * `lib/data/authors.ts` because it answers with books, and this module is the
 * one that knows where books come from — the same call `getRecommendedBooks`
 * makes.
 *
 * Order follows the catalogue's own, which is what the content declares. No
 * sorting is imposed: `Book` carries no ordering field, and putting one
 * author's bibliography in a different sequence from the catalogue would be a
 * rule nobody stated.
 *
 * A scan of the full list is right while the catalogue is five records long.
 * When books come from a CMS this becomes a query by relation, here and
 * nowhere else.
 */
export async function getBooksByAuthor(authorId: string): Promise<Book[]> {
  const books = await getBooks();
  return books.filter((book) => book.authorIds.includes(authorId));
}
