import type { BookPageCopy } from "@/types";

/**
 * Institutional copy of `/catalogo/[slug]`, transcribed from the Figma frame
 * `Book - indivdual` (526:2817).
 *
 * Only copy lives here. The book, its authors, its genre and the
 * recommendations are entities and arrive from their own domain modules —
 * `lib/data/books.ts` is what puts them together.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE TECHNICAL SHEET LABELS ARE PROVISIONAL COPY.
 *
 * The frame draws the "Ficha Técnica" panel closed and never opens it, so
 * there is no reference for how its rows are worded or laid out. The five
 * labels below are the plain names of the fields you specified; they must be
 * confirmed editorially, and the row layout is a decision still open.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const BOOK_PAGE_CONTENT: BookPageCopy = {
  catalogLabel: "Catálogo",

  synopsisTitle: "Sinopse",
  technicalSheetTitle: "Ficha Técnica",

  /**
   * The seven rows of the official sheet, in the order editorial fixed them on
   * 27/08/2026. These are no longer the provisional names the previous
   * revision carried — they are the specified list, transcribed.
   *
   * `authors` reads "Autores", plural: a book can be written by more than one
   * person, and the Home has a whole section about exactly that. It was
   * "Autor" for part of a day and was corrected before any title had two.
   */
  technicalSheetLabels: {
    weight: "Peso",
    dimensions: "Dimensões",
    binding: "Encadernação",
    pages: "Número de páginas",
    publisher: "Editora",
    isbn: "ISBN",
    authors: "Autores",
    publicationDate: "Data de publicação",
  },

  sampleLabel: "Ler Amostra",

  /**
   * Specified editorially in the "Padronização comercial" brief, verbatim.
   * Not written here — these are the three labels the publisher named.
   *
   * "Em breve" is the only one that is not an invitation to act; the page
   * renders it as an inert control rather than a link, because there is
   * nowhere for it to go.
   */
  availabilityLabels: {
    available: "Comprar",
    preorder: "Pré-venda",
    "coming-soon": "Em breve",
  },

  recommendationsTitle: "Recomendamos para você",
};
