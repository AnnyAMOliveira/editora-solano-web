/**
 * One episode listed on `/podcast` — Figma `Agenda Entry` (500:1839).
 *
 * The page is a directory, not a player: the design draws no scrubber, no
 * pause and no elapsed time, and the hero sends the listener to Spotify. So an
 * episode carries a destination and nothing about playback state.
 *
 * `number` is the editorial numbering as it is typeset ("011"), stored without
 * the `#` — that character is typography, not data, the same choice `Genre`
 * already makes for its "01"…"06".
 *
 * `durationMinutes` is a number rather than the "48 min" the design shows, so
 * the label is a presentation concern and a CMS can send an integer. See
 * `formatDuration` in `lib/format.ts`.
 */
export interface Episode {
  id: string;
  number: string;
  title: string;
  description: string;
  durationMinutes: number;
  /** Where the play control sends the listener: in-app path or absolute URL. */
  href: string;
  /**
   * Publication date, `YYYY-MM-DD`. **The key the featured episode is chosen
   * by** — editorial decided the highlight is always the most recent episode,
   * never a manual pick, so there is no `featuredEpisodeId` anywhere and there
   * should not be one.
   *
   * The format sorts correctly as a string, so `getFeaturedEpisode` builds no
   * `Date` and no timezone can shift which episode wins. Same choice
   * `ScheduledEvent.date` already makes.
   *
   * ## Why it is optional, and why that is temporary
   *
   * **No episode carries a date today.** These are real broadcasts and their
   * real publication dates are not ours to invent — an invented date would not
   * merely be wrong, it would silently decide which episode the page features.
   *
   * So the field is optional and every record omits it, which makes
   * `getFeaturedEpisode` return `undefined` and the rule inert. That is the
   * honest state: the architecture is in place and waiting on one piece of
   * data.
   *
   * **When the real dates arrive this should become required.** An episode
   * without a date is invisible to the rule that picks the highlight, and an
   * optional field lets a new episode be added without one — silently
   * excluded, with nothing failing. Requiring it makes that impossible, the
   * same way `Book.availability` is required.
   *
   * Nothing renders this field. It exists so the data layer can answer the
   * question; which section shows the answer is a separate decision.
   */
  publishedAt?: string;
  /**
   * The episode's own artwork, shown by the hero when this episode is the
   * featured one.
   *
   * Optional, and absent on every episode today. The hero falls back to the
   * programme's image when it is missing, so an episode can become the
   * highlight on the strength of its date alone — publishing must not require
   * an art file that may not exist.
   *
   * Carries its own `alt` rather than deriving one from the title: what is
   * *in* a picture is not what the picture is *called*, and a screen reader
   * that hears the title twice learns nothing about the image.
   */
  cover?: { src: string; alt: string };
}
