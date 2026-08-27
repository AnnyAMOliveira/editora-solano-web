import type { Metadata } from "next";

import { BlogArchiveSection } from "@/layouts/blog";
import { getBlogArchiveData } from "@/lib/data/posts";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Blog — Escritos da Casa",
  description:
    "O arquivo editorial da Editora Solano: bastidores do processo, entrevistas e o que acontece antes de um livro existir.",
};

/**
 * Blog — Figma frame `534:3272`.
 *
 * The editorial archive. It composes and nothing else: it asks
 * `lib/data/posts.ts` for the copy, the page of posts and where that page sits,
 * then hands all three down.
 *
 * ## Why the page number is in the address
 *
 * `?page=2` survives a reload, a share and the back button, and a reader can
 * open the next page in a new tab. Local state gives none of that. It is the
 * same call `/catalogo` already makes for its genre filter, and it costs this
 * route its static generation for the same reason — reading the query means
 * rendering on demand.
 *
 * The data layer normalises the number, so a hand-typed `?page=99` lands on the
 * last real page rather than on an empty grid that would read as an archive
 * with nothing in it.
 */
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const { copy, posts, pagination } = await getBlogArchiveData(Number(page));

  return (
    <BlogArchiveSection
      eyebrow={copy.hero.eyebrow}
      title={copy.hero.title}
      posts={posts}
      emptyMessage={copy.emptyMessage}
      readMoreLabel={copy.readMoreLabel}
      pagination={{
        state: pagination,
        basePath: "/blog",
        copy: copy.pagination,
      }}
    />
  );
}
