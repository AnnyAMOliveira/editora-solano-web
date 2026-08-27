import type { ContactContent } from "@/types";

/**
 * Institutional copy of `/contato`, transcribed from the Figma frame `Contato`
 * (440:1003). Same arrangement as `about.ts` and `publish.ts`.
 *
 * ## Three channels, all real
 *
 * The frame draws a fourth row — a WhatsApp number, typeset as the placeholder
 * `(43) 0000-0000`. **It was removed on 27/08/2026: the publisher has no
 * telephone service.** The row was not waiting on a number to be filled in;
 * the channel does not exist, so no amount of data would have made it true.
 *
 * This is a divergence from the Figma frame, and a deliberate one. A contact
 * page listing a way to reach someone that nobody answers is worse than a
 * shorter list — the reader who tries it is not merely unhelped, they are
 * misled. Do not restore the row from the design without a real number and an
 * editorial decision behind it.
 *
 * Every channel below is an approved address with a working `href`.
 */
export const CONTACT_CONTENT: ContactContent = {
  hero: {
    eyebrow: "Contato",
    title: "Fale com a editora",
    paragraphs: [
      "Cada assunto tem um endereço próprio — assim sua mensagem chega direto em quem pode responder",
    ],
  },
  office: {
    label: "Sede",
    address: "Av. Arthur Thomas, 100 Rodocentro — Londrina/PR",
    details: "CEP 86065-000 · Visitas com hora marcada",
    legal: "Editora Solano Inova Simples (I.S.) · CNPJ 67.276.660/0001-70",
  },
  channels: [
    {
      id: "originais",
      title: "Envio de originais",
      value: "originais@editorasolano.com.br",
      note: "Resposta em até 30 dias",
      href: "mailto:originais@editorasolano.com.br",
    },
    {
      id: "imprensa",
      title: "Imprensa",
      value: "imprensa@editorasolano.com.br",
      note: "Kit de imprensa e entrevistas",
      href: "mailto:imprensa@editorasolano.com.br",
    },
    {
      id: "comercial",
      title: "Comercial e livrarias",
      value: "comercial@editorasolano.com.br",
      note: "Pedidos e distribuição",
      href: "mailto:comercial@editorasolano.com.br",
    },
  ],
  formTitle: "Mande uma mensagem",
};
