import { PODCAST_CONTENT } from "@/lib/content/podcast";
import type { Episode, PodcastContent } from "@/types";

/**
 * The seam between `/podcast` and wherever its content lives.
 *
 * Only this module knows the origin: the page awaits it, the sections and
 * `EpisodeRow` receive plain props, and none of them import
 * `lib/content/podcast.ts`. Swapping the source for a CMS is a change to this
 * function's body and nothing else.
 *
 * Already async so that the migration never has to reach back into
 * `page.tsx`; the route still prerenders.
 *
 * No sorting. Episodes carry no ordering field — the design lists them newest
 * first and `number` is a label, not a key, so ordering by it would impose a
 * rule the data does not state (and would break the day an episode is
 * numbered out of sequence, or renumbered). The content declares the order it
 * wants. When a CMS starts returning episodes by publication date, that sort
 * belongs here.
 */
export async function getPodcastContent(): Promise<PodcastContent> {
  return PODCAST_CONTENT;
}

/**
 * The episode to feature — **always the most recently published one**.
 *
 * ## The rule, and where it lives
 *
 * Editorial decided the highlight is never a manual pick. There is therefore
 * no `featuredEpisodeId` in `PodcastContent`, and adding one later would be
 * reintroducing exactly the decision that was ruled out: a field somebody has
 * to remember to update every fortnight, silently stale when they do not.
 *
 * Deriving it here rather than in a section is what makes that work. Publishing
 * an episode is the whole operation — the highlight follows from the data, no
 * second action, nothing to forget. It is also the seam a CMS replaces: a
 * query ordered by date, limit one, and no caller notices.
 *
 * ## Why it returns `undefined` today
 *
 * `Episode.publishedAt` is optional and **no episode carries one** — the real
 * dates of five real broadcasts are not ours to invent, and an invented date
 * would not merely be wrong, it would silently decide which episode the site
 * features.
 *
 * So the rule is implemented and inert. The moment real dates land in
 * `lib/content/podcast.ts`, this starts answering with no change here. Until
 * then any caller must handle `undefined`, which is the same shape it will
 * have on a podcast whose archive is genuinely empty.
 *
 * ## Ordering
 *
 * `YYYY-MM-DD` compares correctly as a string, so no `Date` is constructed and
 * no timezone can shift the result. Episodes without a date are dropped rather
 * than treated as oldest: a missing date is unknown, not early, and letting
 * one win the comparison by accident is how a placeholder ends up on the page.
 * `number` is deliberately not a tiebreaker — it is a typeset label ("011"),
 * not a key, and two episodes sharing a publication date is an editorial
 * question rather than something to resolve by string comparison.
 *
 * Nothing renders this yet. No section on `/podcast` shows a featured episode:
 * the hero presents the programme, not an episode. Where the highlight
 * appears, and what it replaces, is a design decision that has not been made.
 */
export async function getFeaturedEpisode(): Promise<Episode | undefined> {
  const { episodes } = await getPodcastContent();

  return episodes.reduce<Episode | undefined>((latest, episode) => {
    if (!episode.publishedAt) return latest;
    if (!latest?.publishedAt) return episode;

    return episode.publishedAt > latest.publishedAt ? episode : latest;
  }, undefined);
}
