import type { Metadata } from "next";

import { CatalogSection } from "@/layouts/catalog";
import { getCatalogContent } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Todos os livros da Editora Solano, por gênero: romances históricos, biografias e memórias, infantojuvenil, psicologia, natureza, história, arte e educação.",
};

interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Catálogo — Figma frame `521:2250`.
 *
 * This page composes and nothing else. It asks `lib/data/catalog.ts` for the
 * copy and the two entities and hands them down — it does not know whether the
 * answer came from a file, a CMS or an API.
 *
 * ## Why this route is dynamic while every other one is static
 *
 * The genre filter is part of the address: the Home links to
 * `/catalogo?genero=<slug>`, so that URL has to be a real page — server
 * rendered, shareable and crawlable — rather than a blank grid that a script
 * fills in after it loads. Reading `searchParams` is what buys that, and it is
 * what opts the route out of prerendering. It is the only route in the project
 * where the address carries state, so it is the only one that pays for it.
 *
 * ## Unknown genres fall back to the whole catalogue
 *
 * A slug that is not in the taxonomy — a typo, a stale link, a genre that was
 * renamed — shows everything instead of an empty grid. An empty result would
 * assert that the genre exists and simply has no books, which is a different
 * and false statement.
 */
export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const [content, params] = await Promise.all([
    getCatalogContent(),
    searchParams,
  ]);

  const requested = params.genero;
  const candidate = Array.isArray(requested) ? requested[0] : requested;
  const genreSlug = content.genres.some((genre) => genre.slug === candidate)
    ? (candidate as string)
    : "";

  return <CatalogSection content={content} genreSlug={genreSlug} />;
}
