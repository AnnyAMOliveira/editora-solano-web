import type { CoursesContent } from "@/types";

/**
 * Content of `/cursos`, transcribed from the Figma frame `Cursos` (443:1335).
 *
 * Same arrangement as `about.ts`, `publish.ts` and `contact.ts`: the sections
 * receive all of it through props and `app/cursos/page.tsx` is the only place
 * that names the source, so moving any of these three blocks behind a CMS is a
 * change here and in that file, nowhere else.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * DESTINATIONS ARE PROVISIONAL. The design draws a "Saiba Mais" button on each
 * card but names no destination for it. Every `href` below therefore points at
 * `/contato`, which is a real route and a sensible default while an offering
 * has no page of its own — it is NOT an editorial decision and must be
 * replaced with the real destinations.
 *
 * They can be swapped for absolute URLs (an enrolment platform, another site)
 * with no other change: `isExternalHref` in `lib/links.ts` reads the URL and
 * `Button` switches to a new-tab anchor on its own.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const COURSES_CONTENT: CoursesContent = {
  hero: {
    eyebrow: "Cursos e materiais",
    title: "Aprenda o método antes de publicar",
    paragraphs: [
      "O mesmo processo que aplicamos nas obras da casa, aberto a quem está escrevendo o primeiro livro.",
    ],
  },

  // Aprovada editorialmente em 27/08/2026.
  coursesEmptyMessage: "Novas formações serão disponibilizadas em breve.",

  courses: [
    {
      id: "escrita-de-memorias",
      category: "Curso",
      title: "Escrita de memórias em 8 semanas",
      description:
        "Do inventário de lembranças ao primeiro capítulo estruturado.",
      availability: "Turmas abertas",
      href: "/contato",
    },
    {
      id: "arquitetura-literaria",
      category: "Curso",
      title: "Arquitetura literária aplicada",
      description:
        "Estrutura, voz e ritmo — o mesmo método que usamos internamente.",
      availability: "Turmas abertas",
      href: "/contato",
    },
    {
      id: "acompanhamento-de-projeto",
      category: "Mentoria",
      title: "Acompanhamento de projeto",
      description:
        "Encontros quinzenais individuais até o original ficar pronto para submissão.",
      availability: "Vagas Limitadas",
      href: "/contato",
    },
  ],

  courseCtaLabel: "Saiba Mais",

  materialsIntro: {
    eyebrow: "Materiais gratuitos",
    title: "Baixe e comece hoje",
    description:
      "Deixe seu e-mail e receba nossos materiais gratuitos.",
  },

  materials: [
    {
      id: "guia-preparar-original",
      title: "Guia: como preparar seu original",
      description:
        "Formatação, extensão e o que a editora espera receber. 18 páginas em PDF.",
    },
    {
      id: "checklist-revisao",
      title: "Checklist de revisão do autor",
      description:
        "O que conferir antes de enviar — os 22 pontos que mais travam um manuscrito.",
    },
    {
      id: "planilha-estrutura-narrativa",
      title: "Planilha de estrutura narrativa",
      description:
        "Modelo de mapa de capítulos usado nas nossas séries históricas.",
    },
  ],
};
