import { BookOpenText } from "@phosphor-icons/react/dist/ssr";

import { AuthorBio } from "@/components/books/AuthorBio";
import { BookCard } from "@/components/books/BookCard";
import { BookGallery } from "@/components/books/BookGallery";
import {
  PurchaseAction,
  hasPurchaseAction,
} from "@/components/books/PurchaseAction";
import { TechnicalSheet } from "@/components/books/TechnicalSheet";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GenreTag } from "@/components/ui/GenreTag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { MOTION_COLUMN_DELAY, Reveal } from "@/motion";
import type { BookPageData } from "@/types";

interface BookDetailSectionProps {
  data: BookPageData;
}

/**
 * Figma: `Book - indivdual` (526:2817) — the whole page.
 *
 * Three bands stacked in one section: the book itself in two columns, the
 * author across the full width, then the recommendations grid.
 *
 * ## The two columns
 *
 * Gallery on the left, everything textual on the right — 528 and 682 in the
 * frame, which is the 1320 content column with the 40px of air the design puts
 * between them. They stack below `lg`, gallery first, which is the order the
 * page reads in.
 *
 * ## What may be missing
 *
 * Almost everything on this page is optional in the data, and the frame draws
 * only the full case. Each block is therefore conditional: no genre, no tag
 * and one crumb fewer; no sample URL, no "Ler Amostra"; no buy link, no buy
 * button; no synopsis, no synopsis panel; no author, no author band; no
 * recommendations, no band. On the current placeholder data most of these are
 * absent, so the page renders considerably lighter than the frame.
 *
 * The one thing that is never conditional is the technical sheet panel: the
 * design shows it closed, and a reader who opens it learning that nothing is
 * recorded is different from the panel not existing.
 *
 * ## Buttons
 *
 * "Ler Amostra" is the outline variant with the `BookOpenText` glyph the frame
 * draws before its label, passed through the button's `icon` slot. It depends
 * only on `sampleUrl`.
 *
 * The commercial button beside it is {@link PurchaseAction}, which owns the
 * rule that turns `Book.availability` into one of "Comprar", "Pré-venda" or
 * "Em breve" — the frame draws only the first of the three. The row's wrapper
 * asks {@link hasPurchaseAction} instead of re-deriving that rule, so an empty
 * flex row never contributes its padding to a book with no action.
 *
 * ## Motion
 *
 * The cover is `fadeIn` and the column beside it `fadeUp`, held back a
 * fraction: the object arrives, then what is said about it. The cover does not
 * travel because it is the largest single element on the page, and any rise on
 * that surface is the difference between an entrance and a slide.
 *
 * The breadcrumb is left out. It is navigation, it sits at the top of the
 * viewport on every load, and animating it delays the one control a reader who
 * arrived at the wrong book is looking for.
 */
export function BookDetailSection({ data }: BookDetailSectionProps) {
  const { copy, book, authors, mainGenre, recommendations } = data;
  const showsPurchaseAction = hasPurchaseAction(book.availability, book.links);

  return (
    <section
      aria-label={book.title}
      className="relative overflow-hidden pt-10 pb-10 md:pb-section lg:pt-[35px]"
    >
      <SpiralDecoration
        name="hero-right"
        className="top-0 right-0 hidden lg:block"
      />

      <Container className="relative">
        <Breadcrumb
          items={[
            { label: copy.catalogLabel, href: "/catalogo" },
            ...(mainGenre
              ? [
                  {
                    label: mainGenre.title,
                    href: `/catalogo?genero=${mainGenre.slug}`,
                  },
                ]
              : []),
            { label: book.title },
          ]}
        />

        {/* Figma leaves 113px between the breadcrumb and the cover. */}
        <div className="mt-12 grid gap-10 lg:mt-[113px] lg:grid-cols-[minmax(0,528px)_minmax(0,682px)] lg:gap-x-7">
          <Reveal preset="fadeIn">
            <BookGallery
              cover={book.cover}
              gallery={book.gallery}
              title={book.title}
            />
          </Reveal>

          <div className="flex flex-col items-start">
            <Reveal delay={MOTION_COLUMN_DELAY}>
              {mainGenre ? <GenreTag label={mainGenre.title} /> : null}

              {/* Figma: 33px from the tag to the title. */}
              <div className="border-muted/20 mt-6 flex w-full flex-col items-start gap-3 border-b pb-2.5 lg:mt-[33px]">
                <h1 className="text-h2">{book.title}</h1>

                {authors.length > 0 ? (
                  <p className="text-body">
                    {authors.map((author) => author.name).join(", ")}
                  </p>
                ) : null}

                {book.sampleUrl || showsPurchaseAction ? (
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {book.sampleUrl ? (
                      <Button
                        href={book.sampleUrl}
                        variant="outline"
                        icon={<BookOpenText className="size-3.5" />}
                      >
                        {copy.sampleLabel}
                      </Button>
                    ) : null}

                    <PurchaseAction
                      availability={book.availability}
                      links={book.links}
                      labels={copy.availabilityLabels}
                    />
                  </div>
                ) : null}
              </div>

              {book.description ? (
                <Accordion
                  title={copy.synopsisTitle}
                  defaultOpen
                  className="w-full"
                >
                  <p className="text-body text-muted">{book.description}</p>
                </Accordion>
              ) : null}

              <Accordion title={copy.technicalSheetTitle} className="w-full">
                <TechnicalSheet
                  sheet={book.technicalSheet}
                  authors={authors}
                  labels={copy.technicalSheetLabels}
                />
              </Accordion>
            </Reveal>
          </div>
        </div>

        {authors.length > 0 ? (
          /* Figma leaves 65px between the two columns and the author band. */
          <div className="mt-16 flex flex-col gap-12 lg:mt-[65px]">
            <Reveal>
              {authors.map((author) => (
                <AuthorBio key={author.id} author={author} />
              ))}
            </Reveal>
          </div>
        ) : null}

        {recommendations.length > 0 ? (
          /* Figma leaves 46px before the recommendations heading. */
          <div className="mt-16 lg:mt-[46px]">
            <Reveal>
              <SectionHeading
                titleVariant="display"
                title={copy.recommendationsTitle}
              />
            </Reveal>

            {/* Figma leaves 92px between the heading and the first cover. */}
            <Reveal
              as="ul"
              preset="staggerCards"
              className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:mt-[92px] xl:grid-cols-5 xl:gap-x-[33px]"
            >
              {recommendations.map((recommended) => (
                <li key={recommended.id} className="flex">
                  <BookCard book={recommended} />
                </li>
              ))}
            </Reveal>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
