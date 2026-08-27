import type { Metadata } from "next";

import { ContactSection } from "@/layouts/contact";
import { getContactContent } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Cada assunto tem um endereço próprio — originais, imprensa e comercial — assim sua mensagem chega direto em quem pode responder.",
};

/**
 * Contato — Figma frame `440:1003`.
 *
 * This page composes and nothing else. It asks `lib/data/contact.ts` for the
 * content and hands it down — it does not know whether the answer came from a
 * file, a CMS or an API. The `await` is what keeps it that way: the day the
 * source becomes a network call, nothing here changes.
 */
export default async function ContactPage() {
  const content = await getContactContent();

  return <ContactSection content={content} />;
}
