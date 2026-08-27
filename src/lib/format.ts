/**
 * Formats an ISO date as the `DD/MM` label the agenda uses (`00/00` in the
 * design). Parsed in UTC so the label never shifts by a day depending on the
 * viewer's timezone.
 */
export function formatDayMonth(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");

  return `${day}/${month}`;
}

/**
 * Formats an episode length as the "48 min" label the podcast list uses.
 *
 * Minutes only, because that is the unit the design shows and the one the
 * editor thinks in. If episodes ever run past the hour and the design asks for
 * "1 h 12", this is the single place that changes.
 */
export function formatDuration(minutes: number): string {
  return `${minutes} min`;
}

/**
 * Month abbreviations as the agenda typesets them.
 *
 * Hardcoded rather than read from `toLocaleDateString`: the runtime locale is
 * not guaranteed to match between the server render and the browser, and a
 * month name that differs across the two is a hydration mismatch. This array
 * gives the same answer everywhere.
 */
const MONTHS_ABBR = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
] as const;

/** Reads `YYYY-MM-DD` positionally — no `Date`, so no timezone to shift it. */
function parseDayParts(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  const monthIndex = Number(month) - 1;

  return {
    year,
    day,
    monthAbbr: MONTHS_ABBR[monthIndex] ?? "",
    isValid: Boolean(year && day) && monthIndex >= 0 && monthIndex < 12,
  };
}

/** The large day number of an agenda row — "14" from `2026-04-14`. */
export function formatDayNumber(isoDate: string): string {
  const { day, isValid } = parseDayParts(isoDate);
  return isValid ? String(Number(day)) : "";
}

/**
 * The line under the day: "ABR · 19h30", or just "ABR" when the hour is not
 * settled yet.
 */
export function formatMonthAndTime(isoDate: string, time?: string): string {
  const { monthAbbr, isValid } = parseDayParts(isoDate);
  if (!isValid) return "";

  const hour = time ? time.replace(":", "h") : "";
  return hour ? `${monthAbbr} · ${hour}` : monthAbbr;
}

/** How a past event is dated — "MAR 2026" from `2026-03-18`. */
export function formatMonthYear(isoDate: string): string {
  const { monthAbbr, year, isValid } = parseDayParts(isoDate);
  return isValid ? `${monthAbbr} ${year}` : "";
}

/**
 * Month names as the press list typesets them.
 *
 * Hardcoded for the same reason as `MONTHS_ABBR` above: `toLocaleDateString`
 * depends on a runtime locale that is not guaranteed to match between the
 * server render and the browser, and a month name that differs across the two
 * is a hydration mismatch.
 */
const MONTHS_LONG = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
] as const;

/**
 * How a media appearance is dated — "Maio de 2026" from `2026-05-12`.
 *
 * Distinct from `formatMonthYear`, which produces the agenda's "MAI 2026":
 * the press list is set in running type rather than in a date column, and the
 * design spells the month out.
 */
export function formatLongMonthYear(isoDate: string): string {
  const { year, isValid } = parseDayParts(isoDate);
  if (!isValid) return "";

  const monthIndex = Number(isoDate.split("-")[1]) - 1;
  const month = MONTHS_LONG[monthIndex];

  return month ? `${month} de ${year}` : "";
}

/**
 * A post's publication date as the blog card prints it — "15/03/2026".
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE FORMAT IS PROVISIONAL. The frame writes only "data de publicação" and
 * never a real date, so there is no reference for how it is set. Numeric was
 * chosen because the card puts it beside a tag on one shared line, where a
 * spelled month ("15 de março de 2026") would crowd out the tag.
 *
 * `formatLongMonthYear` — the press list's "Maio de 2026" — is the obvious
 * alternative and needs an editorial call.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Read positionally like the agenda formatters, so no `Date` is built and no
 * timezone can shift the day.
 */
export function formatShortDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return "";

  return `${day}/${month}/${year}`;
}
