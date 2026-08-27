import type { Book } from "@/types";

/**
 * TEMPORARY — see src/lib/mocks/README.md
 *
 * The `genreSlugs` below are a PROVISIONAL classification. The titles are the
 * real ones the Figma frame lists, but nobody has filed them against the
 * official taxonomy yet — the mapping here was derived from each book's
 * `category` label and needs editorial confirmation before it is trusted.
 *
 * Every slug matches a `Genre.slug` in `lib/content/genres.ts`. "Zé Doca"
 * deliberately carries two, so the multi-genre case is exercised before the
 * catalogue filter is written rather than discovered by it.
 *
 * `authorIds` points each book at one of the placeholder author records. The
 * mapping is arbitrary: the nine authors in `mocks/authors.ts` are all "Nome
 * do autor", so no mapping is more correct than another. It exists so the
 * relation is exercised end to end.
 *
 * `gallery` repeats each book's own cover three times, which is exactly what
 * the Figma frame does — the same image in all four slots. It is there to
 * exercise the gallery, not to claim the edition has four photographs.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * TEMPORÁRIO — VALIDAÇÃO VISUAL (26/08/2026). REMOVER ANTES DE PUBLICAR.
 *
 * `description`, `technicalSheet`, `sampleUrl` and `links` were filled in ONLY
 * so the book page could be validated on screen. None of it is content.
 *
 * - The synopsis is the frame's own lorem, transcribed rather than written.
 * - **The ISBNs are deliberately impossible** — `000-0-0000-0000-N`. An ISBN
 *   is a real-world identifier, and a plausible-looking fake one is worse than
 *   no data: it can be copied, searched and quoted. This pattern cannot be
 *   taken for real.
 * - `dimensions`, `binding` and `pages` are invented descriptions of real
 *   editions. "Brochura" is what the previous `format` string said, carried
 *   into the field the sheet gained for it — not a new claim about how these
 *   five books are bound.
 *
 *   **`weight` and `publicationDate` are left empty on purpose (27/08/2026).**
 *   The sheet gained both when it was rebuilt to the official fields, and
 *   neither has a source: no weight was ever recorded, and the previous model
 *   held only a year, which is not a date. Filling them would mean inventing
 *   two new facts about real editions rather than carrying forward ones
 *   already marked as fake. `TechnicalSheet` simply omits both rows.
 *
 *   **There is no `authors` on the sheet.** The author row is drawn from
 *   `authorIds`, resolved — so it says "Nome do autor" here because
 *   `mocks/authors.ts` does, and correcting a name there corrects it in every
 *   place the page prints it.
 * - `sampleUrl` and `links` exist on ALL FIVE and point at `/contato`, under
 *   the project's provisional-destination policy — **no store URL has been
 *   invented**. They are there to validate the two buttons of the title
 *   block, including the leading-icon slot.
 *
 *   All five carry the same shape on purpose (27/08/2026): the book page's
 *   commercial contract is only exercised if every record can draw it. With
 *   the buttons on one title and absent on four, four of the five pages went
 *   unvalidated and any regression in `PurchaseAction` would show up on a
 *   single URL. The uniformity is a testing decision, not a claim that these
 *   five books are on sale at the same store.
 *
 *   **`label: "Amazon"` is a placeholder retailer name, not a commercial
 *   fact.** It is the shape a real record has; nothing here says the editora
 *   sells at Amazon. The button's own wording comes from
 *   `lib/content/book.ts`, keyed by `availability` — the data cannot change
 *   what the reader is offered, only where the offer leads.
 * ════════════════════════════════════════════════════════════════════════════
 *
 * ════════════════════════════════════════════════════════════════════════════
 * TEMPORÁRIO — `availability` NÃO FOI CONFIRMADO EDITORIALMENTE.
 *
 * Os cinco livros estão marcados como `"available"` porque é a leitura honesta
 * dos dados atuais: o catálogo os apresenta como títulos publicados. Isso é uma
 * inferência, não uma decisão da editora — a mesma situação de `genreSlugs`
 * acima.
 *
 * O status comercial de cada título precisa ser confirmado por quem responde
 * pelo catálogo. É a única informação desta lista que descreve um fato do
 * mundo real que nem o código nem o Figma conhecem.
 *
 * Enquanto quatro dos cinco não tiverem URL de loja, eles não mostram botão
 * nenhum — o campo diz que estão à venda, mas não existe destino. A correção é
 * preencher `links`, não mudar componente.
 * ════════════════════════════════════════════════════════════════════════════
 */
export const MOCK_BOOKS: Book[] = [
  {
    id: "book-1",
    slug: "o-menino-da-seca",
    cover: "/assets/books/o-menino-da-seca.jpg",
    title: "O Menino da Seca",
    author: "Solano",
    authorIds: ["author-1"],
    description:
      "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
    category: "Romance",
    genreSlugs: ["romances-historicos"],
    series: "",
    gallery: [
      "/assets/books/o-menino-da-seca.jpg",
      "/assets/books/o-menino-da-seca.jpg",
      "/assets/books/o-menino-da-seca.jpg",
    ],
    technicalSheet: {
      weight: "",
      dimensions: "14 × 21 cm",
      binding: "Brochura",
      pages: 248,
      publisher: "Editora Solano",
      isbn: "000-0-0000-0000-1",
      publicationDate: "",
    },
    // TEMPORÁRIO — classificação comercial não confirmada. Ver cabeçalho.
    availability: "available",
    // TEMPORÁRIO — validação visual. Destino provisório, não é URL de loja.
    sampleUrl: "/contato",
    links: [{ label: "Amazon", url: "/contato" }],
  },
  {
    id: "book-2",
    slug: "o-sertao-das-aguas",
    cover: "/assets/books/o-sertao-das-aguas.jpg",
    title: "O Sertão das Águas",
    author: "Solano",
    authorIds: ["author-2"],
    description:
      "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
    category: "Romance",
    genreSlugs: ["romances-historicos"],
    series: "",
    gallery: [
      "/assets/books/o-sertao-das-aguas.jpg",
      "/assets/books/o-sertao-das-aguas.jpg",
      "/assets/books/o-sertao-das-aguas.jpg",
    ],
    technicalSheet: {
      weight: "",
      dimensions: "14 × 21 cm",
      binding: "Brochura",
      pages: 312,
      publisher: "Editora Solano",
      isbn: "000-0-0000-0000-2",
      publicationDate: "",
    },
    // TEMPORÁRIO — classificação comercial não confirmada. Ver cabeçalho.
    availability: "available",
    // TEMPORÁRIO — validação visual. Destino provisório, não é URL de loja.
    sampleUrl: "/contato",
    links: [{ label: "Amazon", url: "/contato" }],
  },
  {
    id: "book-3",
    slug: "o-menino-dos-pinheirais",
    cover: "/assets/books/o-menino-dos-pinheirais.jpg",
    title: "O Menino dos Pinheirais",
    author: "Solano",
    authorIds: ["author-3"],
    description:
      "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
    category: "Romance",
    genreSlugs: ["romances-historicos"],
    series: "",
    gallery: [
      "/assets/books/o-menino-dos-pinheirais.jpg",
      "/assets/books/o-menino-dos-pinheirais.jpg",
      "/assets/books/o-menino-dos-pinheirais.jpg",
    ],
    technicalSheet: {
      weight: "",
      dimensions: "14 × 21 cm",
      binding: "Brochura",
      pages: 196,
      publisher: "Editora Solano",
      isbn: "000-0-0000-0000-3",
      publicationDate: "",
    },
    // TEMPORÁRIO — classificação comercial não confirmada. Ver cabeçalho.
    availability: "available",
    // TEMPORÁRIO — validação visual. Destino provisório, não é URL de loja.
    sampleUrl: "/contato",
    links: [{ label: "Amazon", url: "/contato" }],
  },
  {
    id: "book-4",
    slug: "freud-antes-de-freud",
    cover: "/assets/books/freud-antes-de-freud.jpg",
    title: "Freud Antes de Freud: a Escuta que Começa no Corpo",
    author: "Editora Solano",
    authorIds: ["author-4"],
    description:
      "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
    category: "Psicanálise",
    genreSlugs: ["psicologia-e-desenvolvimento-humano"],
    series: "",
    gallery: [
      "/assets/books/freud-antes-de-freud.jpg",
      "/assets/books/freud-antes-de-freud.jpg",
      "/assets/books/freud-antes-de-freud.jpg",
    ],
    technicalSheet: {
      weight: "",
      dimensions: "14 × 21 cm",
      binding: "Brochura",
      pages: 224,
      publisher: "Editora Solano",
      isbn: "000-0-0000-0000-4",
      publicationDate: "",
    },
    // TEMPORÁRIO — classificação comercial não confirmada. Ver cabeçalho.
    availability: "available",
    // TEMPORÁRIO — validação visual. Destino provisório, não é URL de loja.
    sampleUrl: "/contato",
    links: [{ label: "Amazon", url: "/contato" }],
  },
  {
    id: "book-5",
    slug: "ze-doca",
    cover: "/assets/books/ze-doca.jpg",
    title: "Zé Doca",
    author: "Editora Solano",
    authorIds: ["author-5"],
    description:
      "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
    category: "Memória e território",
    genreSlugs: ["biografias-e-memorias", "historia-e-cultura"],
    series: "",
    gallery: [
      "/assets/books/ze-doca.jpg",
      "/assets/books/ze-doca.jpg",
      "/assets/books/ze-doca.jpg",
    ],
    technicalSheet: {
      weight: "",
      dimensions: "14 × 21 cm",
      binding: "Brochura",
      pages: 168,
      publisher: "Editora Solano",
      isbn: "000-0-0000-0000-5",
      publicationDate: "",
    },
    // TEMPORÁRIO — classificação comercial não confirmada. Ver cabeçalho.
    availability: "available",
    // TEMPORÁRIO — validação visual. Destino provisório, não é URL de loja.
    sampleUrl: "/contato",
    links: [{ label: "Amazon", url: "/contato" }],
  },
];
