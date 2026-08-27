import type { Book } from "@/types";

/**
 * Strips accents and case so "titulo" finds "Título".
 *
 * Readers type without accents far more often than the catalogue is written
 * without them, and a search that misses "sertao" for "Sertão" reads as broken
 * rather than as strict.
 */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export interface CatalogFilters {
  /** A `Genre.slug`, or `undefined` for the whole catalogue. */
  genreSlug?: string;
  /** What the reader typed in the search field. */
  query?: string;
}

/**
 * Applies the two filters the catalogue draws: genre and title.
 *
 * Genre is matched against `Book.genreSlugs`, never against `Book.category`.
 * The category is a display label editorial rewrites at will; the slug is the
 * key the taxonomy and the URL agree on. A book filed under several genres
 * matches each of them.
 *
 * The search covers the title only — that is what the placeholder promises
 * ("Busque por Título"), and widening it silently to authors or descriptions
 * would make the field do more than it says.
 *
 * A pure function on purpose: it holds the one rule on this page that is worth
 * reading without a component around it, and it is what moves into the data
 * layer the day filtering has to happen server-side.
 */
export function filterBooks(books: Book[], filters: CatalogFilters): Book[] {
  const { genreSlug } = filters;
  const query = normalize(filters.query ?? "");

  return books.filter((book) => {
    const matchesGenre = !genreSlug || book.genreSlugs.includes(genreSlug);
    const matchesQuery = !query || normalize(book.title).includes(query);

    return matchesGenre && matchesQuery;
  });
}
