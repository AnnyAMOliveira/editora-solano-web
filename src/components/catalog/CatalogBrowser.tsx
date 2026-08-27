"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { BookCard } from "@/components/books/BookCard";
import { CatalogSearchField } from "@/components/catalog/CatalogSearchField";
import { EmptyState } from "@/components/ui/EmptyState";
import { GenreFilter } from "@/components/catalog/GenreFilter";
import { Reveal } from "@/motion";
import { filterBooks } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Book, CatalogCopy, Genre } from "@/types";

interface CatalogBrowserProps {
  copy: CatalogCopy;
  books: Book[];
  genres: Genre[];
  /**
   * The genre in effect, already validated against the taxonomy by the page.
   * "" means the whole catalogue.
   */
  genreSlug: string;
  className?: string;
}

/**
 * Figma: Catálogo › the toolbar (`521:2511` and `521:2527`) over the book grid
 * (`521:2530`).
 *
 * The grid is five 237px covers on a 33px rhythm — the same measurements the
 * Home's releases row uses, and the same `BookCard`, which is why no card
 * component is added here.
 *
 * ## Where each filter lives
 *
 * **Genre lives in the URL.** The Home links straight to
 * `/catalogo?genero=<slug>`, so that address has to be the real state of the
 * page and not something the client patches after the fact: it must survive a
 * reload, a share and the back button. This component therefore never holds
 * the genre in state — it receives whatever the page read from the query and
 * asks the router for a different one, which re-renders the server component
 * with the new value. One source of truth, so nothing can drift out of sync.
 *
 * **The search does not.** It changes on every keystroke, and writing each of
 * those to the address bar would flood the history and make the back button
 * useless. It is local state, deliberately not shareable.
 *
 * `useTransition` keeps the current results on screen while the router works
 * instead of blanking the grid. Nothing is drawn for the pending state — the
 * design has none — so it is announced through `aria-busy` and nowhere else.
 *
 * ## Motion
 *
 * The grid gets the site's card entrance on first paint and never again.
 * `<Reveal>` reads its children once, on mount, so the cards that arrive from
 * a genre change or from a keystroke simply appear — re-running a cascade on
 * every filter would turn searching into a light show and make the results
 * arrive later than the typing. The same rule is why the toolbar above is not
 * animated at all: it is a control, and a control that fades in is a control
 * that cannot be used yet.
 *
 * ## Filtering here rather than in the data layer
 *
 * The whole catalogue arrives as a prop and is narrowed in the browser. That
 * is right while the catalogue is small: the reader gets an instant answer and
 * no round trip. `lib/data/catalog.ts` records what changes the day it stops
 * being small.
 */
export function CatalogBrowser({
  copy,
  books,
  genres,
  genreSlug,
  className,
}: CatalogBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState("");

  const visibleBooks = useMemo(
    () => filterBooks(books, { genreSlug: genreSlug || undefined, query }),
    [books, genreSlug, query],
  );

  /**
   * Which of the three empty states this is.
   *
   * **An empty catalogue wins over everything.** No filter can explain an
   * absence that exists without it: telling a reader their search found
   * nothing, when the shelf itself is bare, describes an event that did not
   * happen. This is checked against `books` — everything the page received —
   * rather than against the filtered result.
   *
   * Below that, a typed query beats a genre. It is the thing the reader just
   * did, so when a search inside a genre finds nothing, the failure they need
   * explained is the search. Only with the field empty is the genre the reason
   * the grid is bare.
   */
  const emptyMessage =
    books.length === 0
      ? copy.catalogEmptyMessage
      : genreSlug && !query.trim()
        ? copy.genreEmptyMessage
        : copy.searchEmptyMessage;

  function handleGenreChange(slug: string) {
    const href = slug
      ? `${pathname}?genero=${encodeURIComponent(slug)}`
      : pathname;

    // `replace`, not `push`: picking a genre is refining the same view, and a
    // history entry per choice would turn the back button into an undo stack
    // for the filter instead of a way out of the page.
    startTransition(() => router.replace(href, { scroll: false }));
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Figma puts the two controls on one line, at either end of the content
          column. They stack below `sm`, where 502px of field and a 197px
          button cannot share a row. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <CatalogSearchField
          value={query}
          onChange={setQuery}
          placeholder={copy.searchPlaceholder}
          className="w-full sm:max-w-[502px]"
        />

        <GenreFilter
          genres={genres}
          value={genreSlug}
          onChange={handleGenreChange}
          label={copy.genreFilterLabel}
          allLabel={copy.allGenresLabel}
        />
      </div>

      {/* Figma leaves 99px between the toolbar and the first row. */}
      <div className="mt-12 lg:mt-[99px]" aria-busy={isPending || undefined}>
        {visibleBooks.length > 0 ? (
          <Reveal
            as="ul"
            preset="staggerCards"
            className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 xl:grid-cols-5 xl:gap-x-[33px]"
          >
            {visibleBooks.map((book) => (
              <li key={book.id} className="flex">
                <BookCard book={book} />
              </li>
            ))}
          </Reveal>
        ) : (
          /* The section keeps its structure when nothing matches: the heading
             and the toolbar stay, and an editorial line takes the grid's
             place. Both wordings come from `lib/content/catalog.ts`; which one
             applies is decided above. */
          <EmptyState message={emptyMessage} />
        )}
      </div>
    </div>
  );
}
