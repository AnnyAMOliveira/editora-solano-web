/**
 * One appearance of the publisher in an external outlet — Figma
 * `Agenda Entries` (519:2150) inside "Na Mídia".
 *
 * The section is a directory of links out: it names where the piece ran, what
 * kind of piece it was and when, then sends the reader to the outlet. So there
 * is a `href` and no slug, no body, no per-mention route.
 *
 * `outlet` and `kind` are separate fields rather than the single line the
 * design typesets ("Folha de Londrina · Reportagem"). The "·" is typography,
 * not data — the same choice `Episode` makes for its "#" — and a CMS will hold
 * the outlet on its own the moment anyone wants to filter or count by it.
 *
 * `publishedAt` is an ISO date, not the "Maio de 2026" label. The label is
 * produced by `formatLongMonthYear` in `lib/format.ts`, which keeps the format
 * a presentation concern and lets the data layer sort by it.
 */
export interface MediaMention {
  id: string;
  /** "Folha de Londrina" — the outlet alone, without the kind. */
  outlet: string;
  /** "Reportagem", "Entrevista", "Podcast" — the label after the "·". */
  kind: string;
  title: string;
  /** Publication date, `YYYY-MM-DD`. Typeset as "Maio de 2026". */
  publishedAt: string;
  /** The piece at the outlet. `isExternalHref` decides how the link behaves. */
  href: string;
}

/**
 * One file offered in the "Mídia Kit" list — Figma `Timeline Entry`
 * (519:2206).
 *
 * `href` is where the file lives and nothing more: no `download` attribute is
 * applied to it, so the browser or the hosting platform decides whether the
 * file opens or is saved. That also means the field takes a CDN URL, a CMS
 * asset URL or a path under `/public` without any of them needing a different
 * shape.
 *
 * The "↓" the design draws after each title is typography and is deliberately
 * NOT stored here — `MediaKitItem` appends it, the way `EpisodeRow` appends
 * the "#" to an episode number.
 *
 * No `fileSize` or `fileFormat`: the design shows neither, and the formats are
 * spoken in the description's prose. A field the page does not render is
 * maintenance surface without a return.
 */
export interface MediaKitAsset {
  id: string;
  title: string;
  description: string;
  /** Where the file lives: absolute URL or a path served by the app. */
  href: string;
  /**
   * Display position, ascending. Owned by whoever administers the kit, which
   * is why it is data rather than array position: a CMS reorders by changing
   * this number, not by rewriting a file. Sorting happens in
   * `lib/data/press.ts`, so no component ever reads this field.
   */
  order: number;
}

/**
 * The ink card at the top of the right column: the single press channel.
 *
 * Institutional, not an administrable entity — it is one approved address that
 * changes when the publisher decides it changes, the same standing as
 * {@link import("./contact").OfficeInfo} on Contato.
 *
 * `email` is stored bare, without the `mailto:` scheme; `PressContactCard`
 * composes the URL. Keeping the scheme out of the content means the address
 * is typeset from the same string that is linked, so the two can never drift.
 */
export interface PressContact {
  /** "Assessoria" — the label above the address. */
  label: string;
  email: string;
  /** "Retorno em até 2 dias úteis". */
  note: string;
}
