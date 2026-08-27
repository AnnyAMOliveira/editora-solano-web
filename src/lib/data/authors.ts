import { MOCK_AUTHORS } from "@/lib/mocks";
import type { Author } from "@/types";

/**
 * The seam between the app and wherever authors live.
 *
 * A domain module: the Home carousel reads it today, and any future author
 * listing or book page will read the same entity. Already async so the CMS
 * migration never has to reach back into a page; the routes still prerender.
 *
 * No sorting — `Author` carries no ordering field, and the carousel shows the
 * sequence the content declares.
 */
export async function getAuthors(): Promise<Author[]> {
  return MOCK_AUTHORS;
}

/**
 * Resolves `Book.authorIds` into the author records themselves.
 *
 * Order follows the ids as the book declares them, not the order of the
 * source list: a book with two authors names them in the order it means to.
 * Ids with no matching record are dropped rather than surfaced as holes — a
 * book pointing at an author that no longer exists shows the authors it does
 * have, and the page holds.
 *
 * A lookup over the full list is right while the list is nine records long.
 * When authors come from a CMS this becomes a query by id, here and nowhere
 * else.
 */
export async function getAuthorsByIds(ids: string[]): Promise<Author[]> {
  if (ids.length === 0) return [];

  const authors = await getAuthors();

  return ids
    .map((id) => authors.find((author) => author.id === id))
    .filter((author): author is Author => author !== undefined);
}

/**
 * One author by their public slug, or `undefined` when there is none.
 *
 * `undefined` rather than a throw: whether a missing author is a 404, a
 * redirect or an empty state is the route's decision, not this module's.
 */
export async function getAuthorBySlug(
  slug: string,
): Promise<Author | undefined> {
  const authors = await getAuthors();
  return authors.find((author) => author.slug === slug);
}
