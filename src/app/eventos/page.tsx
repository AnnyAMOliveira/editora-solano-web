import type { Metadata } from "next";

import { PastEventsSection, UpcomingEventsSection } from "@/layouts/events";
import { getEventsContent } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Eventos — Agenda 2026",
  description:
    "Lançamentos, clubes de leitura, oficinas e feiras. Tudo com entrada gratuita, salvo indicação em contrário.",
};

/**
 * Eventos — Figma frame `Agenda` (504:1873).
 *
 * An agenda in two states: what is coming, each row with a way in, and what
 * has already happened, listed without an action. There is no per-event route
 * — the CTA forwards to wherever sign-up lives.
 *
 * This page composes and nothing else. It asks `lib/data/events.ts` for the
 * content and hands it down — it does not know whether the answer came from a
 * file, a CMS or an API, nor that the upcoming list arrives already sorted by
 * date. The `await` is what keeps it that way: the day the source becomes a
 * network call, nothing here changes.
 */
export default async function EventsPage() {
  const content = await getEventsContent();

  return (
    <>
      <UpcomingEventsSection
        hero={content.hero}
        events={content.upcoming}
        emptyMessage={content.upcomingEmptyMessage}
        ctaLabel={content.eventCtaLabel}
      />

      <PastEventsSection
        title={content.pastTitle}
        events={content.past}
        emptyMessage={content.pastEmptyMessage}
      />
    </>
  );
}
