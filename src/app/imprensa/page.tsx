import type { Metadata } from "next";

import { PressSection } from "@/layouts/press";
import { getPressContent } from "@/lib/data/press";

export const metadata: Metadata = {
  title: "Imprensa",
  description:
    "Materiais oficiais, clipping e contato direto com a assessoria. Entrevistas com autores mediante agendamento.",
};

/**
 * Imprensa — Figma frame `519:1826`.
 *
 * A hybrid page: institutional copy (the hero, the two headings, the press
 * contact) beside two administrable directories (appearances in the media,
 * the media kit's files). Neither directory has a route of its own — both send
 * the reader out, one to an outlet, the other to a file.
 *
 * This page composes and nothing else. It asks `lib/data/press.ts` for the
 * content and hands it down — it does not know whether the answer came from a
 * file, a CMS or an API, nor that both lists arrive already sorted. The
 * `await` is what keeps it that way: the day the source becomes a network
 * call, nothing here changes.
 */
export default async function PressPage() {
  const content = await getPressContent();

  return <PressSection content={content} />;
}
