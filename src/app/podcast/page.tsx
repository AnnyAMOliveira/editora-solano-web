import type { Metadata } from "next";

import { EpisodesSection, PodcastHeroSection } from "@/layouts/podcast";
import { getFeaturedEpisode, getPodcastContent } from "@/lib/data/podcast";

export const metadata: Metadata = {
  title: "Podcast — Antes do Livro",
  description:
    "Conversas sobre o que acontece antes de um livro existir: a escuta, a pesquisa, as escolhas de forma. Novos episódios a cada quinze dias.",
};

/**
 * Podcast — Figma frame `498:1428`.
 *
 * A directory of episodes, not a player: each row links out to wherever the
 * episode is hosted, so there is no `/podcast/[slug]` and nothing on this page
 * holds playback state.
 *
 * This page composes and nothing else. It asks `lib/data/podcast.ts` for the
 * content and hands it down — it does not know whether the answer came from a
 * file, a CMS or an API. The `await` is what keeps it that way: the day the
 * source becomes a network call, nothing here changes.
 */
export default async function PodcastPage() {
  // The hero shows the most recently published episode. The page does not pick
  // it — `getFeaturedEpisode` does, so publishing an episode is the only action
  // that changes what this band says. Today it answers `undefined`, because no
  // episode carries a `publishedAt`, and the hero falls back to the
  // programme's own presentation.
  const [content, featuredEpisode] = await Promise.all([
    getPodcastContent(),
    getFeaturedEpisode(),
  ]);

  return (
    <>
      <PodcastHeroSection hero={content.hero} featuredEpisode={featuredEpisode} />

      <EpisodesSection
        title={content.episodesTitle}
        year={content.episodesYear}
        episodes={content.episodes}
        emptyMessage={content.episodesEmptyMessage}
      />
    </>
  );
}
