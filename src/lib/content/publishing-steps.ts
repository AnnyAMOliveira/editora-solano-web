import type { PublishingStep } from "@/types";

/**
 * The five stages of the publisher's editorial process — the "Como Publicar"
 * timeline on the Home, transcribed from the Figma frame `392:672`.
 *
 * ## Why this is not in `lib/mocks/`
 *
 * It used to be, and that was a misfiling. This is the real process the
 * publisher describes to authors: approved institutional copy, confirmed
 * editorially. `lib/mocks/` exists to be deleted when the CMS lands, and this
 * text survives that migration — only its origin would change.
 *
 * Same move the catalogue taxonomy already made, and the same criterion:
 * approved editorial definition does not belong in `mocks/`, even before a CMS
 * exists.
 *
 * `number` is the "01"…"05" typeset in the row's left column — editorial
 * ordering, stored rather than derived from array position. It is a label and
 * not a key, which is why `lib/data/publishing-steps.ts` does not sort by it.
 */
export const PUBLISHING_STEPS: PublishingStep[] = [
  {
    id: "step-1",
    number: "01",
    title: "Escuta inicial",
    description:
      "Uma conversa sem compromisso para entender o que existe e o que quer existir.",
  },
  {
    id: "step-2",
    number: "02",
    title: "Pesquisa e apuração",
    description:
      "Levantamento de fontes, entrevistas e documentos que dão chão ao texto.",
  },
  {
    id: "step-3",
    number: "03",
    title: "Arquitetura literária",
    description:
      "Estrutura, voz e ritmo definidos junto com você antes da primeira linha.",
  },
  {
    id: "step-4",
    number: "04",
    title: "Trabalho editorial",
    description:
      "Edição, revisão, projeto gráfico e capa por uma equipe multidisciplinar.",
  },
  {
    id: "step-5",
    number: "05",
    title: "Publicação e vida do livro",
    description:
      "Registro, impressão, distribuição e lançamento junto da comunidade.",
  },
];
