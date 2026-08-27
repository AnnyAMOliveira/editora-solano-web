import type { Author } from "@/types";

/**
 * TEMPORARY — see src/lib/mocks/README.md
 *
 * Names and areas are the placeholders used by the Figma frame; the frame
 * writes "Nome do autor" nine times over.
 *
 * `slug` is authored rather than derived, and deliberately reads as a
 * placeholder: with nine records all called "Nome do autor", a slug built from
 * the name would collide nine ways. `autor-1` is ugly in a public URL and is
 * meant to be — it should be replaced the moment real names arrive, and
 * changing it later breaks every link already shared.
 *
 * ## TEMPORÁRIO — validação visual (26/08/2026)
 *
 * `shortDescription` and `bio` carry the frame's own lorem so the author page
 * could be validated on screen. Neither is content: a biography is an account
 * of a real person's life and is not ours to invent. Both must be replaced
 * before publication.
 *
 * `name`, `genre` and `portrait` are untouched — they already carry the
 * frame's placeholders, so nothing here changes what the Home's carousel
 * shows.
 */
export const MOCK_AUTHORS: Author[] = Array.from({ length: 9 }, (_, index) => ({
  id: `author-${index + 1}`,
  slug: `autor-${index + 1}`,
  name: "Nome do autor",
  // TEMPORÁRIO — validação visual.
  shortDescription: "Forem ipsum dolor sit amet, consectetur elit.",
  genre: "Socioambiental",
  portrait: `/assets/authors/author-${index + 1}.jpg`,
  // TEMPORÁRIO — validação visual.
  bio: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
}));
