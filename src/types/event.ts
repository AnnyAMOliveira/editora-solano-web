/**
 * Agenda entry. Proposed from the Figma frames rather than the briefing.
 *
 * This is the shape the Home's preview row needs: when it happens, what it is
 * called and one line about it. `/eventos` renders the same entity in two
 * other densities — see {@link ScheduledEvent} and {@link PastEvent}.
 */
export interface AgendaEvent {
  id: string;
  title: string;
  description: string;
  /** Calendar day, `YYYY-MM-DD`. The clock time lives apart, on `ScheduledEvent`. */
  date: string;
}

/**
 * An upcoming event as the `/eventos` agenda draws it (Figma `504:2148`): the
 * day in large type over month and time, then category, title, description and
 * where it happens, with a CTA at the far edge.
 *
 * `time` is a plain `HH:mm` string rather than part of an ISO timestamp. Two
 * reasons: an event's start is a wall-clock time in Londrina, not an instant,
 * so a timezone would only distort it; and formatting a timestamp on both the
 * server and the client is a known source of hydration mismatches. The pair
 * (`date`, `time`) is unambiguous and formats identically everywhere.
 *
 * It is optional because the design already admits unsettled details — the
 * sample rows read "Livraria a confirmar" — so a date with no hour yet is a
 * state the page has to survive.
 */
export interface ScheduledEvent extends AgendaEvent {
  /** "Lançamento", "Clube de leitura"… — the tag above the title. */
  category: string;
  /** 24-hour wall clock, `HH:mm`. Typeset as "19h30". */
  time?: string;
  /** "Londrina/PR · Livraria a confirmar". */
  location: string;
  /** Where the CTA sends the reader: in-app path or absolute URL. */
  href: string;
}

/**
 * A past event, listed under "Já Aconteceu".
 *
 * A domain alias of {@link AgendaEvent}, the arrangement `PublishingStep` and
 * `CourseMaterial` already use. The design shows only the month and the
 * description for these, but `title` stays in the data: it is what the entry
 * *is*, a CMS will carry it regardless, and dropping it would make the record
 * lossy for the sake of one layout.
 */
export type PastEvent = AgendaEvent;
