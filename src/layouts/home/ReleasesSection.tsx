import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/motion";
import type { Book, HomeContent } from "@/types";

interface ReleasesSectionProps {
  content: HomeContent["releases"];
  books: Book[];
}

/**
 * Figma: Home › Section2 (`362:903`).
 *
 * Ink band. Five 237px covers on a 33px rhythm — exactly the 1320 content
 * column at desktop, so the carousel arrows stay hidden there and only appear
 * once the row starts to overflow.
 *
 * ## Motion
 *
 * The heading arrives, then the row. The row is one `fadeIn` and not a
 * cascade: a carousel is already partly off-screen, so staggering it would
 * animate covers nobody can see and land mid-way through the ones they can.
 * Stagger belongs to grids and lists, where every card is on screen at once.
 */
export function ReleasesSection({ content, books }: ReleasesSectionProps) {
  return (
    <Section tone="dark" ariaLabel="Lançamentos">
      <Container>
        <Reveal>
          <SectionHeading
            title={content.title}
            action={
              <Button href={content.cta.href} variant="outline" hasIcon>
                {content.cta.label}
              </Button>
            }
          />
        </Reveal>

        {books.length > 0 ? (
          <Reveal preset="fadeIn">
            <Carousel
              ariaLabel="Lançamentos"
              trackClassName="gap-[33px]"
              slideClassName="w-[160px] sm:w-[200px] xl:w-[237px]"
              arrowsAlign="end"
              className="mt-[74px]"
            >
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </Carousel>
          </Reveal>
        ) : (
          /* `tone="dark"`: this band paints `text-bg`, and the light-mode grey
             would nearly vanish against ink. */
          <EmptyState
            message={content.emptyMessage}
            tone="dark"
            className="mt-[74px]"
          />
        )}
      </Container>
    </Section>
  );
}
