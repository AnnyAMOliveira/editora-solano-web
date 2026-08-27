/**
 * A person who writes for the publisher.
 *
 * Born as the co-authorship carousel entry on the Home (proposed from the
 * Figma frame, not from the briefing), then the author block on
 * `/catalogo/[slug]`, and now the subject of `/autores/[slug]`.
 *
 * The link between an author and their books is `Book.authorIds`, held on the
 * book side: a book always knows who wrote it, while an author's bibliography
 * is a query. `getBooksByAuthor` in `lib/data/books.ts` answers it.
 */
export interface Author {
  id: string;
  /**
   * The public URL segment: `/autores/<slug>`. Treat as a contract.
   *
   * **Authored, never derived from the name.** Two authors can share a name,
   * a name can be edited without the address changing, and the current
   * placeholder records are all called "Nome do autor" — deriving would
   * collide nine ways.
   */
  slug: string;
  name: string;
  /**
   * The line under the name on the author page — a short presentation, not a
   * biography.
   */
  shortDescription: string;
  /**
   * The short label under the name on the Home's carousel card —
   * "Socioambiental".
   *
   * **Legacy.** It predates {@link Author.shortDescription} and still feeds
   * `AuthorCard`, which is why it survives. New work should use
   * `shortDescription`; whether the card should switch to it is an editorial
   * decision, not a refactor.
   */
  genre: string;
  portrait: string;
  /**
   * The long paragraph on the author page and on the book page's author block.
   *
   * May be empty: no real biography has been written. The blocks render
   * without it rather than leaving a gap.
   */
  bio: string;
}
