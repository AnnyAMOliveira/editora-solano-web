import type { CommunitiesContent } from "@/types";

/**
 * TEMPORARY SOURCE for `/comunidades`, transcribed from the Figma frame
 * `Comunidades` (508:2331).
 *
 * This file is development scaffolding, not the destination. Everything here
 * is meant to be administered — names, descriptions, status, links and the
 * order they appear in — so it is expected to move behind a CMS or an admin.
 *
 * Nothing imports it except `lib/data/communities.ts`. That module is the only
 * place in the app that knows where this content comes from, which is what
 * makes the swap a one-file change: the page, the sections and the card never
 * learn the origin. Do not import this constant anywhere else — doing so
 * re-couples the interface to the file and defeats the arrangement.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * DESTINATIONS ARE PROVISIONAL. The design draws an "Entrar no Grupo" button
 * on every card but names no destination. Every `href` below points at
 * `/contato`, a real route that keeps the page navigable — it is NOT an
 * editorial decision and must be replaced with the real invitations. No
 * invented WhatsApp link stands in for them.
 *
 * `href` is generic on purpose: an absolute URL to any platform works, and
 * `isExternalHref` in `lib/links.ts` turns it into a new-tab anchor by itself.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * ## The hero does not count the groups (27/08/2026)
 *
 * It used to open "**Quatro** grupos que se encontram com regularidade…", and
 * the Figma frame still does. The count came out because the list below it is
 * administrable: with no group open the page read "Quatro grupos…" directly
 * above "Novas comunidades serão abertas em breve." — institutional copy
 * contradicting the state of the very list it introduces.
 *
 * Editorial rewrote the line rather than trimming the number, and the new
 * wording is stronger for it: "Comunidades de troca e aprendizado…" says what
 * the groups are *for*, which no count ever did.
 *
 * **The rule: institutional copy must not state the size of an administrable
 * list.** A number written in prose is a fact frozen at writing time about
 * data that changes without it. Nothing in the code can notice when the two
 * diverge, and the contradiction surfaces only on a reader's screen.
 *
 * `courses.ts` carried the same problem ("receba os três materiais") and was
 * corrected in the same round.
 */
export const COMMUNITIES_CONTENT: CommunitiesContent = {
  hero: {
    eyebrow: "Comunidades",
    title: "Ler junto é outra coisa",
    paragraphs: [
      "Comunidades de troca e aprendizado em torno dos nossos livros e do ofício de escrever. Nenhuma delas exige que você já tenha publicado.",
    ],
  },

  // Aprovada editorialmente em 27/08/2026.
  emptyMessage: "Novas comunidades serão abertas em breve.",

  communityCtaLabel: "Entrar no Grupo",

  communities: [
    {
      id: "clube-de-leitura-solano",
      schedule: "Mensal · online",
      status: "ABERTO",
      title: "Clube de leitura Solano",
      description:
        "Um livro do catálogo por mês, com a presença de quem o escreveu.",
      href: "/contato",
      order: 1,
    },
    {
      id: "oficina-de-memorias",
      schedule: "Trimestral · presencial",
      status: "LISTA DE ESPERA",
      title: "Oficina de memórias",
      description:
        "Grupo pequeno, exercícios de escrita e leitura em voz alta.",
      href: "/contato",
      order: 2,
    },
    {
      id: "circulo-de-autores",
      schedule: "Quinzenal · online",
      status: "POR CONVITE",
      title: "Círculo de autores",
      description:
        "Espaço fechado para autores da casa trocarem projetos em andamento.",
      href: "/contato",
      order: 3,
    },
    {
      id: "leitura-socioambiental",
      schedule: "Mensal · híbrido",
      status: "ABERTO",
      title: "Leitura socioambiental",
      description:
        "Ecologia, agricultura e território a partir das obras da coleção.",
      href: "/contato",
      order: 4,
    },
  ],
};
