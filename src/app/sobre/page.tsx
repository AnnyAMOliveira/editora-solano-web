import type { Metadata } from "next";

import { AboutHeroSection, MethodSection } from "@/layouts/about";
import { getAboutContent } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A Editora Solano publica literatura, pensamento e legado. Trabalhamos com escritores e com pessoas que carregam histórias, pesquisas ou conhecimentos relevantes, acompanhando cada projeto da escuta inicial à publicação.",
};

/**
 * Sobre — Figma frame `433:827`.
 *
 * Two blocks: the opening editorial column and "O Método Solano". The frame
 * ends there and goes straight to the footer, with no closing call to action.
 *
 * This page composes and nothing else. It asks `lib/data/about.ts` for the
 * content and hands it down — it does not know whether the answer came from a
 * file, a CMS or an API. The `await` is what keeps it that way: the day the
 * source becomes a network call, nothing here changes.
 */
export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <AboutHeroSection hero={content.hero} />
      <MethodSection method={content.method} />
    </>
  );
}
