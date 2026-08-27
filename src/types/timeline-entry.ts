/**
 * A single row of the Figma `Timeline Entry` component: an ordinal, a title and
 * a short description, rendered over a hairline.
 *
 * The design reuses this row in two unrelated contexts — the publishing process
 * on the Home and the five principles of "O Método Solano" on the About page —
 * so the type is named after the visual pattern rather than after either
 * domain. `PublishingStep` remains as a domain alias.
 */
export interface TimelineEntry {
  id: string;
  /**
   * Ordinal as it is typeset in the design ("01" … "05"), not a number.
   * Omitted on Publique, where the same row is used without ordinals.
   */
  number?: string;
  title: string;
  description: string;
}
