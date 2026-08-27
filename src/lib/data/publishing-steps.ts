import { PUBLISHING_STEPS } from "@/lib/content/publishing-steps";
import type { PublishingStep } from "@/types";

/**
 * The seam between the app and wherever the publishing timeline lives.
 *
 * The source is `lib/content/publishing-steps.ts` rather than `lib/mocks/`:
 * the five stages are the publisher's real process, approved editorially, not
 * demonstration data.
 *
 * Already async so the CMS migration never has to reach back into a page; the
 * route still prerenders.
 *
 * No sorting. `PublishingStep` is an alias of `TimelineEntry`, whose `number`
 * is the ordinal the design typesets — a label, not a key. The content
 * declares the sequence.
 */
export async function getPublishingSteps(): Promise<PublishingStep[]> {
  return PUBLISHING_STEPS;
}
