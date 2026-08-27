import type { AboutContent } from "@/types";

/**
 * Institutional copy of the About page, transcribed from the Figma frame
 * `Sobre` (433:827).
 *
 * It lives here rather than in `src/lib/mocks/` on purpose: those files are
 * placeholders waiting for the CMS, while this is the real text the design
 * ships with, and it is not assumed that a CMS will ever own it. What matters
 * architecturally is the same either way — the sections receive it through
 * props and `app/sobre/page.tsx` is the only place that names the source, so
 * moving it behind a CMS or an API later is a change in those two files and
 * nowhere else.
 */
export const ABOUT_CONTENT: AboutContent = {
  hero: {
    eyebrow: "Sobre a editora",
    title: "Livros feitos no ritmo de quem cultiva",
    paragraphs: [
      "A Editora Solano publica literatura, pensamento e legado: romances, séries históricas, biografias, memórias, ensaios, obras socioambientais, livros de arte, psicanálise, educação e formação profissional.",
      "Trabalhamos com escritores e também com pessoas que carregam histórias, pesquisas ou conhecimentos relevantes — e que ainda não sabem que têm um livro. Acompanhamos cada projeto da escuta inicial à publicação.",
    ],
  },
  method: {
    title: "O Método Solano",
    description:
      "Cinco forças que trabalham juntas em cada obra: sensibilidade humana, pesquisa profunda, arquitetura literária, trabalho editorial multidisciplinar e uso crítico da inteligência artificial — sempre a serviço da voz do autor, nunca no lugar dela.",
    principles: [
      {
        id: "sensibilidade-humana",
        number: "01",
        title: "Sensibilidade humana",
        description:
          "Começamos escutando a pessoa, não o arquivo. O livro nasce dessa escuta.",
      },
      {
        id: "pesquisa-profunda",
        number: "02",
        title: "Pesquisa profunda",
        description:
          "Fontes, arquivos e campo: nada entra no texto sem sustentação.",
      },
      {
        id: "arquitetura-literaria",
        number: "03",
        title: "Arquitetura literária",
        description: "Estrutura e voz desenhadas sob medida para cada obra.",
      },
      {
        id: "equipe-multidisciplinar",
        number: "04",
        title: "Equipe multidisciplinar",
        description:
          "Editores, revisores, designers e especialistas trabalhando no mesmo projeto.",
      },
      {
        id: "ia-com-uso-critico",
        number: "05",
        title: "IA com uso crítico",
        description:
          "Tecnologia como ferramenta de apoio — a autoria continua sendo sua.",
      },
    ],
  },
};
