import {
  AgendaBlogSection,
  CoAuthorshipSection,
  CommunitySection,
  GenresSection,
  HeroSection,
  PublishingSection,
  ReleasesSection,
} from "@/layouts/home";
import { getHomePageData } from "@/lib/data/home";

/**
 * Home — the seven sections of the Figma frame, in order.
 *
 * This page composes and nothing else. It asks `lib/data/home.ts` for one
 * answer — the editorial copy plus the six entities the sections list — and
 * hands each section its share. It does not know that the copy comes from a
 * file and the entities from mocks, and it will not need to learn when either
 * comes from a CMS.
 *
 * The sections hold no editorial text of their own any more: every title,
 * eyebrow, description and button label arrives as a prop.
 */
export default async function HomePage() {
  const { content, books, genres, authors, publishingSteps, events, posts } =
    await getHomePageData();

  return (
    // Figma separates the section boxes with 50px of page background; the
    // internal padding of each section is unchanged.
    <div className="flex flex-col gap-10 md:gap-section">
      <HeroSection content={content.hero} />
      <ReleasesSection content={content.releases} books={books} />
      <GenresSection content={content.genres} genres={genres} />
      <CoAuthorshipSection content={content.coAuthorship} authors={authors} />
      <PublishingSection content={content.publishing} steps={publishingSteps} />
      <AgendaBlogSection
        agenda={content.agenda}
        blog={content.blog}
        events={events}
        posts={posts}
      />
      <CommunitySection content={content.community} />
    </div>
  );
}
