import type { PageHero } from "./page-content";
import type { TimelineEntry } from "./timeline-entry";

/**
 * Opening block of the About page.
 *
 * Alias of {@link PageHero}: Publique and Contato open with the same eyebrow +
 * display headline + lead paragraphs structure, so the shape moved to
 * `page-content.ts` and each page keeps a name of its own.
 */
export type AboutHero = PageHero;

/** "O Método Solano": editorial column on the left, five principles on the right. */
export interface AboutMethod {
  title: string;
  description: string;
  principles: TimelineEntry[];
}

export interface AboutContent {
  hero: AboutHero;
  method: AboutMethod;
}
