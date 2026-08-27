import type { SelectOption } from "@/types";

/**
 * Genres the editor accepts through the "Publique com a gente" form.
 *
 * The same list the page already spells out in prose under "O que aceitamos"
 * (`PUBLISH_CONTENT.conditions`), so the form and the promise above it stay in
 * step. It lives in its own file rather than inside `PublishContent` because a
 * taxonomy is not page copy.
 *
 * ## This is NOT the catalogue taxonomy
 *
 * What the publisher accepts is a different question from what it publishes,
 * and the two lists answer to different people: this one to whoever reads the
 * submissions, `genres.ts` to whoever organises the catalogue. They differ
 * today — seven entries here, eight there, with no shared vocabulary — and
 * that divergence is allowed to stand. Neither list is derived from the other,
 * and nothing should be "aligned" between them without an editorial decision.
 *
 * The catalogue filter reads `lib/content/genres.ts`. It never reads this.
 *
 * `value` is the slug an endpoint or CMS would store, `label` what the reader
 * picks. When the list moves behind an API this file is what gets replaced;
 * no component changes.
 */
export const SUBMISSION_GENRE_OPTIONS: SelectOption[] = [
  { label: "Romance", value: "romance" },
  { label: "Memórias", value: "memorias" },
  { label: "Biografia", value: "biografia" },
  { label: "Ensaio", value: "ensaio" },
  { label: "Obras socioambientais", value: "obras-socioambientais" },
  { label: "Psicanálise", value: "psicanalise" },
  {
    label: "Educação e formação profissional",
    value: "educacao-e-formacao-profissional",
  },
];
