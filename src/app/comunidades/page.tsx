import type { Metadata } from "next";

import { CommunitiesSection } from "@/layouts/communities";
import { getCommunitiesContent } from "@/lib/data/communities";

export const metadata: Metadata = {
  title: "Comunidades",
  description:
    "Quatro grupos que se encontram com regularidade em torno dos nossos livros e do ofício de escrever. Nenhum deles exige que você já tenha publicado.",
};

/**
 * Comunidades — Figma frame `508:2331`.
 *
 * A directory of groups: it presents each one and forwards the reader to
 * wherever that group lives, so there is no `/comunidades/[slug]`.
 *
 * This page composes and nothing else. It asks `lib/data/communities.ts` for
 * the content and hands it down — it does not know whether the answer came
 * from a file, a CMS or an API, which is the whole point of that layer. The
 * `await` is what keeps it that way: the day the source becomes a network
 * call, nothing here changes.
 */
export default async function CommunitiesPage() {
  const content = await getCommunitiesContent();

  return (
    <CommunitiesSection
      hero={content.hero}
      communities={content.communities}
      emptyMessage={content.emptyMessage}
      ctaLabel={content.communityCtaLabel}
    />
  );
}
