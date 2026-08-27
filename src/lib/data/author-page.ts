import { AUTHOR_PAGE_CONTENT } from "@/lib/content/author";
import { getAuthorBySlug } from "@/lib/data/authors";
import { getBooksByAuthor } from "@/lib/data/books";
import type { AuthorPageData } from "@/types";

/**
 * Everything `/autores/[slug]` renders, in one answer: the copy, the author,
 * and what they wrote.
 *
 * ## Why this is its own module
 *
 * It composes across two domains, and putting it inside either one would close
 * a cycle: `lib/data/books.ts` already imports `lib/data/authors.ts` to resolve
 * a book's authors, so having `authors.ts` import `books.ts` back would make
 * the two mutually dependent. `lib/data/home.ts` set the precedent — a
 * composition that spans domains gets its own file, and the domain modules
 * stay leaves.
 *
 * The page never learns that `authorIds` exists: it receives the author and
 * the books already resolved, which is what lets a CMS answer the join
 * natively later without any component changing.
 *
 * Returns `undefined` when the slug matches no author, so the route can call
 * `notFound()`.
 */
export async function getAuthorPageData(
  slug: string,
): Promise<AuthorPageData | undefined> {
  const author = await getAuthorBySlug(slug);
  if (!author) return undefined;

  const books = await getBooksByAuthor(author.id);

  return { copy: AUTHOR_PAGE_CONTENT, author, books };
}
