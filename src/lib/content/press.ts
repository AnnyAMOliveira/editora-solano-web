import type { PressContent } from "@/types";

/**
 * Content of `/imprensa`, transcribed from the Figma frame `Imprensa`
 * (519:1826).
 *
 * Same arrangement as the other inner pages: `PressSection` receives all of it
 * through props and `app/imprensa/page.tsx` is the only place that names the
 * source, so moving either list behind a CMS is a change here and in
 * `lib/data/press.ts`, nowhere else.
 *
 * ## Two labels are corrected against the frame
 *
 * The design writes "Acessoria" and "Midia Kit". Both are typos in public
 * institutional labels, so they are set here as "Assessoria" and "Mídia Kit".
 * This is not a design decision — the layout, the type and the hierarchy are
 * the frame's.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * DESTINATIONS ARE PROVISIONAL. The frame names no URL for any media
 * appearance and no file for any kit item. Every `href` below points at
 * `/contato`, which is a real route and keeps the page navigable — it is NOT
 * an editorial decision and must be replaced with the real links and files.
 *
 * They can be swapped for absolute URLs (an outlet's article, a CDN asset,
 * anywhere) with no other change: `isExternalHref` in `lib/links.ts` reads the
 * URL and the rows switch to new-tab anchors on their own.
 *
 * The e-mail is the exception: `imprensa@editorasolano.com.br` is written in
 * the design and is the page's one real address.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * ## The two empty-state messages are provisional copy
 *
 * `CLAUDE.md` classifies empty-state text as institutional — the publisher
 * speaking — and forbids inventing it. The two strings below were supplied by
 * the developer as temporary wording and are marked as such: they must be
 * confirmed editorially before this page is published.
 *
 * ## The entries are demonstration data
 *
 * `mentions` and `mediaKit` are administrable entities. What is written here
 * is the placeholder content the frame repeats, kept verbatim rather than
 * invented, and it must not reach a public build.
 */
export const PRESS_CONTENT: PressContent = {
  hero: {
    eyebrow: "Imprensa",
    title: "Para quem vai contar sobre a gente",
    paragraphs: [
      "Materiais oficiais, clipping e contato direto com a assessoria. Entrevistas com autores mediante agendamento.",
    ],
  },

  contact: {
    // Figma writes "Acessoria"; corrected — see the note above.
    label: "Assessoria",
    email: "imprensa@editorasolano.com.br",
    note: "Retorno em até 2 dias úteis",
  },

  mentionsTitle: "Na Mídia",
  mentionsYear: "2026",
  // Approved editorially on 27/08/2026.
  mentionsEmptyMessage: "Ainda não há aparições na mídia cadastradas.",

  // TEMPORARY DATA — the three placeholder rows of the frame. Only the dates
  // are spread out: three identical "Maio de 2026" rows would hide any bug in
  // `formatLongMonthYear`.
  mentions: [
    {
      id: "mention-2026-05",
      outlet: "Folha de Londrina",
      kind: "Reportagem",
      title: "Título da Reportagem, Podcast ou afins",
      publishedAt: "2026-05-12",
      href: "/contato",
    },
    {
      id: "mention-2026-03",
      outlet: "Folha de Londrina",
      kind: "Reportagem",
      title: "Título da Reportagem, Podcast ou afins",
      publishedAt: "2026-03-04",
      href: "/contato",
    },
    {
      id: "mention-2026-02",
      outlet: "Folha de Londrina",
      kind: "Reportagem",
      title: "Título da Reportagem, Podcast ou afins",
      publishedAt: "2026-02-19",
      href: "/contato",
    },
  ],

  // Figma writes "Midia Kit"; corrected — see the note above.
  mediaKitTitle: "Mídia Kit",
  mediaKitYear: "2026",
  // Approved editorially on 27/08/2026.
  mediaKitEmptyMessage:
    "Novos materiais de imprensa serão disponibilizados em breve.",

  // TEMPORARY DATA — the four items of the frame, with the design's own
  // descriptions. The "↓" of each title is typography and lives in
  // `MediaKitItem`, not here.
  mediaKit: [
    {
      id: "kit-marca",
      title: "Logotipo e marca",
      description: "SVG e PNG, versões preta, branca e monocromática.",
      href: "/contato",
      order: 1,
    },
    {
      id: "kit-capas",
      title: "Capas em alta resolução",
      description: "Todo o catálogo em 300 dpi, prontas para impressão.",
      href: "/contato",
      order: 2,
    },
    {
      id: "kit-release",
      title: "Release institucional",
      description: "Texto de apresentação da editora e do Método Solano.",
      href: "/contato",
      order: 3,
    },
    {
      id: "kit-fotos",
      title: "Fotos de autores",
      description: "Retratos com crédito obrigatório do fotógrafo.",
      href: "/contato",
      order: 4,
    },
  ],
};
