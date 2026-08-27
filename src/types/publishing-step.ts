import type { TimelineEntry } from "./timeline-entry";

/**
 * Step of the editorial process timeline (Home, "Como Publicar").
 * Not part of the original briefing — proposed from the Figma frame.
 *
 * Kept as a domain-specific alias of {@link TimelineEntry}: the About page
 * renders the same row for content that is not a process step, so the shape
 * itself lives in `timeline-entry.ts`.
 */
export type PublishingStep = TimelineEntry;
