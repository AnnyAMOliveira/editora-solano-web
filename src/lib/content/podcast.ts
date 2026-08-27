import type { PodcastContent } from "@/types";

/**
 * Content of `/podcast`, transcribed from the Figma frame `Podcast` (498:1428).
 *
 * Same arrangement as the other inner pages: the sections receive all of it
 * through props and `app/podcast/page.tsx` is the only place that names the
 * source, so moving the episode list behind a CMS is a change here and in that
 * file, nowhere else.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * DESTINATIONS ARE PROVISIONAL. The design draws a play control on every row
 * and a "Ouça Agora no Spotify" button in the hero, but names no URL for
 * either. Every `href` below points at `/contato`, which is a real route and
 * keeps the page navigable — it is NOT an editorial decision and must be
 * replaced with the real episode links.
 *
 * They can be swapped for absolute URLs (Spotify, Apple Podcasts, anywhere)
 * with no other change: `isExternalHref` in `lib/links.ts` reads the URL and
 * the play control switches to a new-tab anchor on its own.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Only the first episode carries the copy the design writes out; the other
 * four are the placeholder rows Figma repeats, kept verbatim so the list is
 * not invented content.
 */
export const PODCAST_CONTENT: PodcastContent = {
  hero: {
    eyebrow: "Podcast",
    title: "Antes do Livro",
    description:
      "Conversas sobre o que acontece antes de um livro existir: a escuta, a pesquisa, as escolhas de forma. Novos episódios a cada quinze dias.",
    cover: {
      src: "/assets/podcast/antes-do-livro.png",
      alt: "Capa do podcast Antes do Livro: retrato de Chico Mendes sobre fundo verde, com o título do episódio.",
    },
    cta: {
      label: "Ouça Agora no Spotify",
      href: "/contato",
    },
  },

  episodesTitle: "Episódios",
  episodesYear: "2026",
  // Aprovada editorialmente em 27/08/2026.
  episodesEmptyMessage: "Novos episódios serão disponibilizados em breve.",

  episodes: [
    {
      id: "ep-011",
      number: "011",
      title: "O que é escutar um autor",
      description:
        "Como nasce um livro antes de existir uma única linha escrita.",
      durationMinutes: 48,
      href: "/contato",
    },
    {
      id: "ep-010",
      number: "010",
      title: "Nome do Episodio",
      description: "Um texto suscinto, máximo de 100 palavras sobre o ep.",
      durationMinutes: 48,
      href: "/contato",
    },
    {
      id: "ep-009",
      number: "009",
      title: "Nome do Episodio",
      description: "Um texto suscinto, máximo de 100 palavras sobre o ep.",
      durationMinutes: 48,
      href: "/contato",
    },
    {
      id: "ep-008",
      number: "008",
      title: "Nome do Episodio",
      description: "Um texto suscinto, máximo de 100 palavras sobre o ep.",
      durationMinutes: 48,
      href: "/contato",
    },
    {
      id: "ep-007",
      number: "007",
      title: "Nome do Episodio",
      description: "Um texto suscinto, máximo de 100 palavras sobre o ep.",
      durationMinutes: 48,
      href: "/contato",
    },
  ],
};
