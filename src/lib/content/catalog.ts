import type { CatalogCopy } from "@/types";

/**
 * Institutional copy of `/catalogo`, transcribed from the Figma frame
 * `Catálogo` (521:2250).
 *
 * Only copy lives here. The books and the genres are entities and arrive from
 * their own domain modules — `lib/data/catalog.ts` is what puts the three
 * together, so a CMS can take over either list without this file moving.
 *
 * The design writes the search placeholder as "Busque por Titulo". Corrected
 * here to "Busque por Título": it is a public label and the project does not
 * reproduce typos from the frame.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE TWO EMPTY-STATE MESSAGES ARE APPROVED COPY (27/08/2026).
 *
 * `searchEmptyMessage` and `genreEmptyMessage` have no counterpart in the
 * frame — it draws only the resting dropdown and never an empty grid — so they
 * were written as provisional placeholders and marked for review. **Editorial
 * has since approved them as written.** They are the publisher's words now and
 * are treated like any other approved text in this file: they stay here, they
 * do not belong to the CMS, and they are not a pending item.
 *
 * `allGenresLabel` is still provisional and still needs review.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * ## Why the empty state is two strings and not one
 *
 * The two situations are different events and a single sentence got one of
 * them wrong. Someone who typed a title and found nothing performed an action
 * that failed. Someone who arrived from the Home by clicking a genre performed
 * no search at all — telling them their "busca" came up empty describes
 * something they never did, and it is the more common of the two paths today,
 * since half the taxonomy has no books yet.
 */
export const CATALOG_CONTENT: CatalogCopy = {
  hero: {
    eyebrow: "Catálogo",
    title: "Todos os Livros",
    // The frame gives the catalogue no lead line.
    paragraphs: [],
  },

  searchPlaceholder: "Busque por Título",
  genreFilterLabel: "Navegar por Gênero",

  // TEMPORARY COPY — pending editorial confirmation.
  allGenresLabel: "Todos os gêneros",

  // Approved editorially on 27/08/2026.
  searchEmptyMessage: "Nenhum livro encontrado para esta busca.",

  // Approved editorially on 27/08/2026.
  genreEmptyMessage: "Nenhum livro disponível neste gênero no momento.",

  // Approved editorially on 27/08/2026.
  catalogEmptyMessage: "Nenhum livro disponível no momento.",
};
