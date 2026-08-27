import type { PublishContent } from "@/types";

/**
 * Institutional copy of `/publique`, transcribed from the Figma frame
 * `Publique com a gente` (433:827).
 *
 * Same arrangement as `about.ts`: the sections receive all of it through props
 * and `app/publique/page.tsx` is the only place that names the source, so
 * moving it behind a CMS later is a change in those two files and nowhere else.
 */
export const PUBLISH_CONTENT: PublishContent = {
  hero: {
    eyebrow: "Envio de originais",
    title: "Publique seu livro com a gente",
    paragraphs: [
      "Manuscrito pronto, rascunho, pesquisa ou só uma história que você conta há anos: envie do jeito que estiver. Lemos tudo e respondemos em até 30 dias.",
    ],
  },
  conditions: [
    {
      id: "o-que-aceitamos",
      title: "O que aceitamos",
      description:
        "Romance, memórias, biografia, ensaio, obras socioambientais, psicanálise, educação e formação profissional.",
    },
    {
      id: "nao-precisa-estar-pronto",
      title: "Não precisa estar pronto",
      description:
        "Rascunhos, pesquisas e projetos em ideia também são bem-vindos.",
    },
    {
      id: "prazo-de-resposta",
      title: "Prazo de resposta",
      description:
        "Até 30 dias corridos, com um parecer de leitura — mesmo quando a resposta é não.",
    },
    {
      id: "sigilo",
      title: "Sigilo",
      description:
        "Todo material recebido é tratado de forma confidencial pela equipe editorial.",
    },
  ],
  formTitle: "Formulário",
};
