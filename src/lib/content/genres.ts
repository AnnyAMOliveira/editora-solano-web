import type { Genre } from "@/types";

/**
 * The publisher's official catalogue taxonomy — the eight genres the Home
 * presents under "Navegue por gênero" and the vocabulary `/catalogo` filters
 * by.
 *
 * Transcribed from the Figma frame Home › Section 3 (`368:1000`, card grid
 * `383:1245`), which the editorial team updated to eight cards.
 *
 * ## Why this is not in `lib/mocks/`
 *
 * It used to be. It is not demonstration data any more: this list is an
 * approved editorial definition and it is about to become the spine of the
 * catalogue's navigation. `lib/mocks/` exists to be deleted when the CMS
 * lands; this list survives that migration — only its origin changes.
 *
 * ## `slug` is a contract
 *
 * The slug is the navigation key. It travels in the public URL
 * (`/catalogo?genero=<slug>`) and it is what joins a genre to the books filed
 * under it. **Genres are never matched by title:** titles are display strings
 * that editorial can rewrite, and a link that depends on wording breaks the
 * day someone fixes a capital letter. Changing a slug breaks every shared or
 * indexed link to that filter, so treat these values as fixed.
 *
 * `id` stays separate from `slug` on purpose: it is the record key a CMS will
 * supply on its own terms, while the slug is the public one this project owns.
 *
 * ## Not to be confused with the submission list
 *
 * `submission-genres.ts` holds what the publisher accepts through the
 * "Publique com a gente" form. That is a different taxonomy — what is accepted
 * is not the same question as what is published — and the two are kept apart
 * deliberately. Neither is derived from the other.
 *
 * `number` is the "01"…"08" typeset in the card corner: editorial ordering,
 * stored rather than derived from array position.
 */
export const CATALOG_GENRES: Genre[] = [
  {
    id: "genre-romances-historicos",
    slug: "romances-historicos",
    number: "01",
    title: "Romances Históricos",
    description:
      "Narrativas que unem personagens, épocas e acontecimentos reais em histórias de transformação.",
  },
  {
    id: "genre-biografias-e-memorias",
    slug: "biografias-e-memorias",
    number: "02",
    title: "Biografias e Memórias",
    description:
      "Histórias reais de vida, trajetórias e experiências que atravessam gerações.",
  },
  {
    id: "genre-infantojuvenil-e-aventuras",
    slug: "infantojuvenil-e-aventuras",
    number: "03",
    title: "Infantojuvenil e Aventuras",
    description:
      "Livros para jovens leitores com fantasia, descobertas, mistérios e grandes jornadas.",
  },
  {
    id: "genre-psicologia-e-desenvolvimento-humano",
    slug: "psicologia-e-desenvolvimento-humano",
    number: "04",
    title: "Psicologia e Desenvolvimento Humano",
    description:
      "Obras sobre mente, comportamento, autoconhecimento e relações humanas.",
  },
  {
    id: "genre-natureza-e-meio-ambiente",
    slug: "natureza-e-meio-ambiente",
    number: "05",
    title: "Natureza e Meio Ambiente",
    description:
      "Ciência, ecologia e histórias inspiradas na relação entre humanidade e planeta.",
  },
  {
    id: "genre-historia-e-cultura",
    slug: "historia-e-cultura",
    number: "06",
    title: "História e Cultura",
    description:
      "Pesquisas e narrativas que resgatam personagens, sociedades e acontecimentos.",
  },
  {
    id: "genre-arte-e-filosofia",
    slug: "arte-e-filosofia",
    number: "07",
    title: "Arte e Filosofia",
    description: "Obras que exploram criação, pensamento e expressão humana.",
  },
  {
    id: "genre-educacao-carreira-e-empreendedorismo",
    slug: "educacao-carreira-e-empreendedorismo",
    number: "08",
    title: "Educação, Carreira e Empreendedorismo",
    description: "Conhecimento aplicado para transformar ideias em prática.",
  },
];
