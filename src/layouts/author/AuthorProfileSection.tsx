import { AuthorProfileHero } from "@/components/authors/AuthorProfileHero";
import { BookCard } from "@/components/books/BookCard";
import { BackLink } from "@/components/ui/BackLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { Reveal } from "@/motion";
import type { AuthorPageData } from "@/types";

interface AuthorProfileSectionProps {
  data: AuthorPageData;
}

/**
 * Figma: `autor` (530:3246) — the whole page.
 *
 * A back control, the author centred on the page, then what they wrote in the
 * catalogue's own grid.
 *
 * The books band is not rendered when the author has none: there is no message
 * for that case and inventing one would put words in the publisher's mouth. An
 * author with no titles simply ends after the biography. With the current
 * mapping — one book each for the first five records — that is four of the
 * nine authors.
 *
 * The back control falls back to the Home. It is a safety net for a tab opened
 * straight onto this URL, not the normal path: the normal path is the reader's
 * own history, which is what "voltar" means when they came from the Home's
 * carousel or from a book.
 *
 * ## Motion
 *
 * The portrait, the name and the biography are the group, in that order — the
 * page is one person being introduced, and the order is the introduction. They
 * are the three top-level children of `AuthorProfileHero`, so the group is
 * placed there rather than here; see that component.
 *
 * The back control is left out, for the reason the book page leaves out its
 * breadcrumb: it is the way out, and the way out should never be pending.
 */
export function AuthorProfileSection({ data }: AuthorProfileSectionProps) {
  const { copy, author, books } = data;

  return (
    <section
      aria-label={author.name}
      className="relative overflow-hidden pt-9 pb-10 md:pb-section"
    >
      <SpiralDecoration
        name="hero-right"
        className="top-0 right-0 hidden lg:block"
      />

      <Container className="relative">
        <BackLink label={copy.backLabel} fallbackHref="/" />

        {/* Figma leaves 61px between the back control and the portrait. */}
        <AuthorProfileHero author={author} className="mt-12 lg:mt-[61px]" />

        {books.length > 0 ? (
          /* Figma leaves 73px between the biography and the heading. */
          <div className="mt-16 lg:mt-[73px]">
            <Reveal>
              <SectionHeading titleVariant="display" title={copy.booksTitle} />
            </Reveal>

            {/* Figma leaves 50px between the heading and the first cover. */}
            <Reveal
              as="ul"
              preset="staggerCards"
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:mt-[50px] xl:grid-cols-5 xl:gap-x-[33px]"
            >
              {books.map((book) => (
                <li key={book.id} className="flex">
                  <BookCard book={book} />
                </li>
              ))}
            </Reveal>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
