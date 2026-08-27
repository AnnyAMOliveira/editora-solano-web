import type { HomeContent } from "@/types";

/**
 * Editorial copy of the Home, transcribed from the Figma frame `357:485`.
 *
 * Every string here used to sit inside the section components in
 * `layouts/home/`, where nobody but a developer could change it. Moving it out
 * is what the `CLAUDE.md` rule asks for — components render what they receive
 * and hold no editorial text of their own.
 *
 * This is the design's real copy, not placeholder: it is treated the same way
 * as `about.ts`, `publish.ts` and `contact.ts`. The entities the Home lists —
 * books, authors, posts, events, genres, publishing steps — are not here; they
 * come from their own domain modules and are still mocks.
 *
 * Two things stay out on purpose. `SITE_INFO` remains in `lib/navigation.ts`,
 * where the header and footer already read it, and the genre cards' `/catalogo`
 * href stays at its call site, where the reasoning for not linking per-genre is
 * documented.
 */
export const HOME_CONTENT: HomeContent = {
  hero: {
    eyebrowLocation: "Londrina, PR",
    title: {
      before: "Aqui a palavra vira ",
      emphasis: "semente",
    },
    description:
      "Somos uma editora onde literatura, arte e ecologia falam a mesma língua. Cada livro é lapidado à mão, no ritmo de quem cultiva.",
    primaryCta: { label: "Publique Seu Livro", href: "/publique" },
    secondaryCta: { label: "Ver o Catálogo", href: "/catalogo" },
    method: {
      label: "O MÉTODO SOLANO",
      description:
        "Escuta inicial, pesquisa profunda, arquitetura literária e trabalho editorial multidisciplinar. Acompanhamos cada projeto do primeiro esboço ao livro na mão do leitor.",
      cta: { label: "Conheça o Método", href: "/sobre" },
    },
  },

  releases: {
    title: "Lançamentos",
    cta: { label: "Ver Catálogo Completo", href: "/catalogo" },
    emptyMessage: "Novos lançamentos serão apresentados em breve.",
  },

  genres: {
    title: "Navegue por gênero",
    description:
      "Explore nossos livros por gênero e encontre histórias, conhecimentos e reflexões que atravessam diferentes universos da literatura, da ciência, da arte e do desenvolvimento humano.",
  },

  coAuthorship: {
    eyebrow: "COAUTORIA",
    title: {
      before: "Livros escritos ",
      emphasis: "por várias mãos",
    },
    description:
      "Quem tem a história caminha ao lado de quem domina o ofício da escrita. A voz é do autor; a arquitetura do texto é nossa.",
    emptyMessage: "Novos autores e colaboradores serão apresentados em breve.",
  },

  publishing: {
    eyebrow: "Como Publicar",
    title: {
      before: "Do primeiro ",
      emphasis: "alô",
      after: " ao livro pronto",
    },
    description:
      "Você não precisa ser escritor. Precisa ter algo que merece durar — uma história, uma pesquisa, um ofício. O resto caminhamos junto.",
    primaryCta: { label: "Nos Fale Sobre sua Ideia", href: "/publique" },
    secondaryCta: { label: "Envie seu original", href: "/publique" },
  },

  agenda: {
    title: "Agenda",
    year: "2026",
    emptyMessage: "Nenhum evento agendado no momento.",
  },

  blog: {
    title: "No Blog",
    cta: { label: "Todos os Textos", href: "/blog" },
    emptyMessage: "Novos textos e conteúdos serão publicados em breve.",
  },

  community: {
    eyebrow: "Comunidade de leitores",
    title: "Ler junto é outra coisa",
    description:
      "Encontros mensais de leitura, conversas com autores e acesso antecipado aos capítulos em construção. Entrada gratuita.",
    newsletter: {
      label: "Carta mensal",
      description:
        "Bastidores do processo editorial, lançamentos e chamadas abertas para originais.",
    },
  },
};
