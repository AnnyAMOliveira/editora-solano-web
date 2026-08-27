import type { TimelineEntry } from "./timeline-entry";

/**
 * One offering on the Cursos page — Figma `Card-gender` (443:1637).
 *
 * The page is a directory, not a catalogue: it names an offering and sends the
 * reader to wherever it lives. So there is a `href` and no slug, no body, no
 * per-course route. `href` may be an in-app path or an absolute URL to another
 * site; `isExternalHref` in `lib/links.ts` is what tells them apart, which is
 * why no `isExternal` field is stored alongside it.
 *
 * No `image`: none of the three cards in the design carries one.
 */
export interface Course {
  id: string;
  /** The tag above the title — "Curso", "Mentoria". */
  category: string;
  title: string;
  description: string;
  /** The line above the CTA — "Turmas abertas", "Vagas Limitadas". */
  availability: string;
  /** Where the CTA points: in-app path or absolute URL. */
  href: string;
}

/**
 * A free download offered in the "Materiais gratuitos" band.
 *
 * Kept as a domain alias of {@link TimelineEntry}, the same arrangement
 * `PublishingStep` uses: the design draws these with the `Timeline Entry`
 * component, without the ordinal. They are not links — the copy beside them
 * says the three arrive by e-mail once the form is sent.
 */
export type CourseMaterial = TimelineEntry;
