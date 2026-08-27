import type { EventsContent } from "@/types";

/**
 * Content of `/eventos`, transcribed from the Figma frame `Agenda` (504:1873).
 *
 * Same arrangement as the other inner pages: the sections receive all of it
 * through props and `app/eventos/page.tsx` is the only place that names the
 * source, so moving either list behind a CMS is a change here and in that
 * file, nowhere else.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * DESTINATIONS ARE PROVISIONAL. The design draws a "Quero Participar" button
 * on every upcoming row but names no destination for it. Every `href` below
 * points at `/contato`, which is a real route and a reasonable default while
 * an event has no sign-up page — it is NOT an editorial decision and must be
 * replaced with the real links.
 *
 * They can be swapped for absolute URLs (Sympla, Eventbrite, anywhere) with no
 * other change: `isExternalHref` in `lib/links.ts` reads the URL and `Button`
 * switches to a new-tab anchor on its own.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * The four upcoming rows and the four past rows are the placeholders the frame
 * repeats, kept verbatim rather than invented. Only the dates are spread out,
 * because four identical "14 ABR" rows would hide any bug in the date
 * formatting.
 */
export const EVENTS_CONTENT: EventsContent = {
  hero: {
    eyebrow: "Eventos",
    title: "Agenda 2026",
    paragraphs: [
      "Lançamentos, clubes de leitura, oficinas e feiras. Tudo com entrada gratuita, salvo indicação em contrário.",
    ],
  },

  upcoming: [
    {
      id: "event-2026-04-14",
      category: "Lançamento",
      title: "Lançamento — O Menino dos Pinheirais",
      description:
        "Leitura de trechos pelo autor, conversa aberta e sessão de autógrafos.",
      date: "2026-04-14",
      time: "19:30",
      location: "Londrina/PR · Livraria a confirmar",
      href: "/contato",
    },
    {
      id: "event-2026-05-09",
      category: "Lançamento",
      title: "Lançamento — O Menino dos Pinheirais",
      description:
        "Leitura de trechos pelo autor, conversa aberta e sessão de autógrafos.",
      date: "2026-05-09",
      time: "19:30",
      location: "Londrina/PR · Livraria a confirmar",
      href: "/contato",
    },
    {
      id: "event-2026-08-22",
      category: "Lançamento",
      title: "Lançamento — O Menino dos Pinheirais",
      description:
        "Leitura de trechos pelo autor, conversa aberta e sessão de autógrafos.",
      date: "2026-08-22",
      time: "19:30",
      location: "Londrina/PR · Livraria a confirmar",
      href: "/contato",
    },
    {
      id: "event-2026-11-07",
      category: "Lançamento",
      title: "Lançamento — O Menino dos Pinheirais",
      description:
        "Leitura de trechos pelo autor, conversa aberta e sessão de autógrafos.",
      date: "2026-11-07",
      time: "19:30",
      location: "Londrina/PR · Livraria a confirmar",
      href: "/contato",
    },
  ],

  // Aprovada editorialmente em 27/08/2026.
  upcomingEmptyMessage: "Nenhum evento agendado no momento.",

  eventCtaLabel: "Quero Participar",

  pastTitle: "Já Aconteceu",
  // Aprovada editorialmente em 27/08/2026.
  pastEmptyMessage: "Registros de eventos anteriores serão apresentados em breve.",

  /**
   * The design gives past rows no title — only the month and the description —
   * so `title` here is a neutral placeholder in the same spirit as the Figma's
   * own "Evento Titulo". It is carried because the field is what the entry is,
   * and a CMS will have the real one; inventing plausible-sounding names would
   * put editorial copy in the repository that nobody wrote.
   */
  past: [
    {
      id: "past-2026-03-04",
      title: "Evento passado",
      description:
        "Descrição Breve no máximo 100 palavras sobre o evento passado.",
      date: "2026-03-04",
    },
    {
      id: "past-2026-03-11",
      title: "Evento passado",
      description:
        "Descrição Breve no máximo 100 palavras sobre o evento passado.",
      date: "2026-03-11",
    },
    {
      id: "past-2026-03-19",
      title: "Evento passado",
      description:
        "Descrição Breve no máximo 100 palavras sobre o evento passado.",
      date: "2026-03-19",
    },
    {
      id: "past-2026-03-26",
      title: "Evento passado",
      description:
        "Descrição Breve no máximo 100 palavras sobre o evento passado.",
      date: "2026-03-26",
    },
  ],
};
