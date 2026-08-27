import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BookDetailSection } from "@/layouts/book";
import { getBookPageData, getBooks } from "@/lib/data/books";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Prerenders one route per book.
 *
 * `/catalogo` itself is dynamic — it reads `?genero=` — but these are separate
 * routes and there is nothing dynamic about them: a book at a fixed URL. The
 * day books come from a CMS this function becomes a list query and the pages
 * keep prerendering.
 */
export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ slug: book.slug }));
}

/**
 * Title and description come from the book itself.
 *
 * The synopsis is empty on every book today, so `description` falls back to
 * naming the work rather than emitting an empty tag — a composed sentence
 * about a real title, not invented editorial copy.
 */
export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBookPageData(slug);

  if (!data) return { title: "Livro não encontrado" };

  const { book } = data;

  return {
    title: book.title,
    description:
      book.description || `${book.title}, do catálogo da Editora Solano.`,
  };
}

/**
 * Livro — Figma frame `526:2817`.
 *
 * This page composes and nothing else. It asks `lib/data/books.ts` for one
 * answer — the copy, the book, its authors, its main genre and the
 * recommendations — and hands it down. It does not resolve an id, does not
 * know that `authorIds` exists, and does not know whether any of it came from
 * a file, a CMS or an API.
 *
 * A slug with no book is a 404 rather than an empty page: the URL names a work
 * that does not exist, which is exactly what `notFound()` is for.
 */
export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const data = await getBookPageData(slug);

  if (!data) notFound();

  return <BookDetailSection data={data} />;
}
