/**
 * One reading group listed on `/comunidades` — Figma `Card-gender` (508:2340).
 *
 * The page is a directory: it presents a group and sends the reader to
 * wherever that group lives. So there is a `href` and no slug, no body, no
 * per-community route.
 *
 * `href` is deliberately generic. Today these point at WhatsApp groups, but
 * nothing in the type or the components says so — a Telegram invite, a Discord
 * server or an in-app route all pass through the same field, and
 * `isExternalHref` decides how the link behaves.
 *
 * No `image`: none of the four cards in the design carries one.
 */
export interface Community {
  id: string;
  /** "Mensal · online" — cadence and format, as the design writes them. */
  schedule: string;
  /** "ABERTO", "LISTA DE ESPERA", "POR CONVITE" — stored as typeset. */
  status: string;
  title: string;
  description: string;
  /** Where the CTA sends the reader: absolute URL or in-app path. */
  href: string;
  /**
   * Display position, ascending. Owned by whoever administers the list, which
   * is why it is data rather than array position: a CMS reorders by changing
   * this number, not by rewriting a file. Sorting happens in
   * `lib/data/communities.ts`, so no component ever reads this field.
   */
  order: number;
}
