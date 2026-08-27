import type { AuthorPageCopy } from "@/types";

/**
 * Institutional copy of `/autores/[slug]`, transcribed from the Figma frame
 * `autor` (530:3246).
 *
 * Two strings, and that is the whole page's fixed text — everything else is
 * the author themselves. `lib/data/authors.ts` is what puts the two together.
 */
export const AUTHOR_PAGE_CONTENT: AuthorPageCopy = {
  backLabel: "Voltar",
  booksTitle: "Desse Autor",
};
