import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorProfileSection } from "@/layouts/author";
import { getAuthorPageData } from "@/lib/data/author-page";
import { getAuthors } from "@/lib/data/authors";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Prerenders one route per author. The day authors come from a CMS this
 * becomes a list query and the pages keep prerendering.
 */
export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

/**
 * Title and description come from the author.
 *
 * `shortDescription` is the natural description — it is the one-line
 * presentation the page itself shows. When it is empty the tag falls back to
 * naming the person rather than emitting nothing.
 */
export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAuthorPageData(slug);

  if (!data) return { title: "Autor não encontrado" };

  const { author } = data;

  return {
    title: author.name,
    description:
      author.shortDescription || `${author.name}, autor da Editora Solano.`,
  };
}

/**
 * Autor — Figma frame `530:3246`.
 *
 * This page composes and nothing else. It asks `lib/data/author-page.ts` for
 * one answer — the copy, the author and the books they wrote — and hands it
 * down. It does not resolve an id and does not know that `Book.authorIds`
 * exists.
 *
 * A slug with no author is a 404: the URL names a person who is not in the
 * catalogue.
 */
export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const data = await getAuthorPageData(slug);

  if (!data) notFound();

  return <AuthorProfileSection data={data} />;
}
