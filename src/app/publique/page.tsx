import type { Metadata } from "next";

import { PublishSection } from "@/layouts/publish";
import {
  getPublishContent,
  getSubmissionGenreOptions,
} from "@/lib/data/publish";

export const metadata: Metadata = {
  title: "Publique com a gente",
  description:
    "Manuscrito pronto, rascunho, pesquisa ou só uma história que você conta há anos: envie do jeito que estiver. Lemos tudo e respondemos em até 30 dias.",
};

/**
 * Publique com a gente — Figma frame `433:827`.
 *
 * This page composes and nothing else. It asks `lib/data/publish.ts` for both
 * of its sources — the institutional copy and the genre taxonomy, which stay
 * apart because either may move behind a CMS without the other — and hands
 * them down. It does not know where either answer came from.
 *
 * The two are fetched together rather than one after the other: today both
 * resolve immediately, but the day they become network calls this is what
 * keeps them from waterfalling.
 *
 * The form's payload is separate again: `SubmissionForm` holds it as a
 * `SubmissionDraft`, ready for whatever endpoint receives it.
 */
export default async function PublishPage() {
  const [content, genreOptions] = await Promise.all([
    getPublishContent(),
    getSubmissionGenreOptions(),
  ]);

  return <PublishSection content={content} genreOptions={genreOptions} />;
}
