import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostDetailSection } from "@/layouts/blog";
import { getPostPageData, getPosts } from "@/lib/data/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Prerenders one route per post. Becomes a list query the day posts come from
 * a CMS, and the pages keep prerendering.
 */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Title and description come from the post itself.
 *
 * `excerpt` is the summary the editor already wrote for the card, so it is the
 * honest description — nothing is composed here that the post does not say.
 *
 * **No keyword tags are emitted.** `Post.contentTags` organises the archive
 * for readers; SEO keywords are a different concern with a different audience,
 * and `<meta name="keywords">` has been ignored by search engines for years.
 * Mixing the two would put editorial vocabulary into a technical slot that
 * does nothing with it.
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostPageData(slug);

  if (!data) return { title: "Publicação não encontrada" };

  return {
    title: data.post.title,
    description: data.post.excerpt || undefined,
  };
}

/**
 * One publication — Figma frame `Single page` (537:3686).
 *
 * Composes and nothing else. `notFound()` rather than an empty state: a slug
 * that matches no post is a wrong address, not a page with nothing in it.
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getPostPageData(slug);

  if (!data) notFound();

  return <PostDetailSection data={data} />;
}
