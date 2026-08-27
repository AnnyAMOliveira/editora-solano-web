import type { FooterColumn, NavItem } from "@/types";

/** Main navigation — the ten items defined in the Figma `Menu` component. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Eventos", href: "/eventos" },
  { label: "Imprensa", href: "/imprensa" },
  { label: "Podcast", href: "/podcast" },
  { label: "Comunidades", href: "/comunidades" },
  { label: "Blog", href: "/blog" },
  { label: "Cursos", href: "/cursos" },
  { label: "Contato", href: "/contato" },
];

/** Header call to action, present in both the desktop bar and the mobile menu. */
export const HEADER_CTA: NavItem = {
  label: "Publique seu livro",
  href: "/publique",
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Editora",
    links: [
      { label: "Catálogo", href: "/catalogo" },
      { label: "Imprensa", href: "/imprensa" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Conteúdo",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
      { label: "Eventos", href: "/eventos" },
      { label: "Comunidades", href: "/comunidades" },
    ],
  },
  {
    title: "Autores",
    links: [
      { label: "Envio de Originais", href: "/publique" },
      { label: "Cursos e Materiais", href: "/cursos" },
      { label: "Método Solano", href: "/sobre" },
    ],
  },
];

/**
 * Institutional data rendered in the top bar and the footer.
 *
 * `copyrightYear` is declared here rather than read from the clock. Every page
 * is prerendered, so `new Date().getFullYear()` in a component resolves once
 * at build time and then sits there being wrong from the next 1 January
 * onwards — a bug that never throws and that nobody notices until a reader
 * does. As data it is one line to update, and a CMS can own it later.
 */
export const SITE_INFO = {
  name: "Editora Solano",
  copyrightYear: "2026",
  tagline: "Aqui a palavra vira semente",
  topBarTagline: "LITERATURA . PENSAMENTO . LEGADO",
  topBarNote: "Recebos originais o ano todo",
  legalName: "Editora Solano Inova Simples (I.S.)",
  registration: "CNPJ 67.276.660/0001-70",
  addressLine: "Av. Arthur Thomas, 100 — Rodocentro",
  cityLine: "Londrina/PR · CEP 86065-000",
} as const;
