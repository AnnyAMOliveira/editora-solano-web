import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArchiveSection } from "@/layouts/blog";
import { getContentTags, getTagPageData } from "@/lib/data/posts";
import { toTagSlug } from "@/lib/tags";

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Prerenders one route per tag in use.
 *
 * The vocabulary is derived from the posts — there is no `Tag` entity — so
 * this list is exactly the set of tags something is filed under. A tag that
 * stops being used stops having a page, which is the correct behaviour for a
 * derived taxonomy and the thing to revisit if tags ever gain records of their
 * own.
 */
export async function generateStaticParams() {
  const tags = await getContentTags();
  return tags.map((tag) => ({ slug: toTagSlug(tag) }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTagPageData(slug);

  if (!data) return { title: "Tag não encontrada" };

  return { title: `${data.tag} — Blog` };
}

/**
 * The archive filtered by one editorial tag.
 *
 * Reuses `BlogArchiveSection` whole: same grid, same cards, same spacing, same
 * empty state. Only the heading and the list change, which is what the brief
 * asks for and what keeps the two screens from drifting apart.
 *
 * `notFound()` for a slug no post uses — that is a wrong address. A tag that
 * exists but currently matches nothing is a different case and renders the
 * empty state instead; it is unreachable while tags are derived from posts,
 * and becomes reachable the day a CMS lets a tag outlive its last post.
 */
export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const data = await getTagPageData(slug);

  if (!data) notFound();

  return (
    <BlogArchiveSection
      eyebrow={data.copy.tagEyebrow}
      title={data.tag}
      posts={data.posts}
      emptyMessage={data.copy.tagEmptyMessage}
      readMoreLabel={data.copy.readMoreLabel}
    />
  );
}
