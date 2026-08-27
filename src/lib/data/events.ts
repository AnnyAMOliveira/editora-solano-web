import { EVENTS_CONTENT } from "@/lib/content/events";
import type {
  AgendaEvent,
  EventsContent,
  PastEvent,
  ScheduledEvent,
} from "@/types";

/**
 * The seam between the app and wherever the agenda lives.
 *
 * ## One origin, three readings
 *
 * `lib/content/events.ts` is the only source. The Home's agenda preview and
 * the `/eventos` page read the same records through the functions below, so a
 * date corrected in one place is corrected everywhere.
 *
 * That was not always true: the Home used to read a separate list in
 * `lib/mocks/events.ts` — different entries, different type — and the two
 * agendas disagreed on screen. The mock file is gone; nothing duplicates these
 * records now.
 *
 * All three are already async so the CMS migration never has to reach back
 * into a page; the routes still prerender.
 */

/**
 * What is coming, soonest first.
 *
 * `date` is `YYYY-MM-DD`, which sorts correctly as a string, so no `Date` is
 * constructed and no timezone can shift the result. The copy is deliberate:
 * `sort` mutates in place, and the source constant must not be reordered as a
 * side effect of rendering.
 */
export async function getUpcomingEvents(): Promise<ScheduledEvent[]> {
  return [...EVENTS_CONTENT.upcoming].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

/**
 * What has already happened.
 *
 * Deliberately NOT sorted. "Já Aconteceu" would conventionally run newest
 * first, but the content currently reads oldest first and the design gives no
 * clue either way — every sample row is labelled "MAR 2026". Imposing a
 * direction here would change what is on screen, which is a decision to be
 * made rather than guessed.
 */
export async function getPastEvents(): Promise<PastEvent[]> {
  return EVENTS_CONTENT.past;
}

/**
 * The slice the Home previews — the next few events, in the same order the
 * agenda page shows them.
 *
 * Returns `AgendaEvent`, the narrower shape: the Home's row draws a date, a
 * title and one line, and has no use for the category, the hour, the place or
 * the sign-up link that `ScheduledEvent` carries. `ScheduledEvent` extends
 * `AgendaEvent`, so these are the same objects seen through a smaller
 * contract, not copies.
 *
 * The default of four is what the Figma Home draws. It is an argument rather
 * than a constant so the Home decides how much of the agenda it wants without
 * this module knowing anything about that page.
 */
export async function getFeaturedEvents(limit = 4): Promise<AgendaEvent[]> {
  const upcoming = await getUpcomingEvents();
  return upcoming.slice(0, limit);
}

/**
 * Everything `/eventos` renders: the institutional copy plus the two lists.
 *
 * A composition over the two functions above rather than a fourth reading of
 * the content, so the page and the Home cannot drift apart in ordering.
 */
export async function getEventsContent(): Promise<EventsContent> {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  const {
    hero,
    upcomingEmptyMessage,
    eventCtaLabel,
    pastTitle,
    pastEmptyMessage,
  } = EVENTS_CONTENT;

  return {
    hero,
    upcoming,
    upcomingEmptyMessage,
    eventCtaLabel,
    pastTitle,
    past,
    pastEmptyMessage,
  };
}
