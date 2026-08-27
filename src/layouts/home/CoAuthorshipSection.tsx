import { AuthorCard } from "@/components/authors/AuthorCard";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Emphasis } from "@/components/ui/Emphasis";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/motion";
import type { Author, HomeContent } from "@/types";

interface CoAuthorshipSectionProps {
  content: HomeContent["coAuthorship"];
  authors: Author[];
}

/**
 * Figma: Home › Section 4 (`383:1246`).
 *
 * Centered header over a carousel of 176px portraits that intentionally bleeds
 * past the right edge of the content column — the track is pulled out to the
 * viewport edge so the last portrait is cut, as designed. Arrows are centered
 * to follow the centered composition.
 *
 * The portraits arrive as one `fadeIn`, the treatment every carousel on the
 * site gets — see `ReleasesSection` for why a track is never staggered.
 */
export function CoAuthorshipSection({
  content,
  authors,
}: CoAuthorshipSectionProps) {
  return (
    <Section ariaLabel="Coautoria">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={content.eyebrow}
            eyebrowClassName="text-slab-sub text-ink"
            titleVariant="display"
            title={
              <>
                {content.title.before}
                <Emphasis>{content.title.emphasis}</Emphasis>
              </>
            }
            description={content.description}
          />
        </Reveal>

        {authors.length > 0 ? (
          <Reveal preset="fadeIn">
            <Carousel
              ariaLabel="Autores"
              trackClassName="gap-[30px]"
              slideClassName="w-[120px] sm:w-[150px] xl:w-[176px]"
              arrowsAlign="center"
              className="mt-[74px] -mr-6 md:-mr-10 xl:-mr-gutter"
              arrowsClassName="mr-6 md:mr-10 xl:mr-gutter"
            >
              {authors.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </Carousel>
          </Reveal>
        ) : (
          /* The heading block keeps its centred composition, so the sentence is
             centred with it rather than sitting left under centred type. */
          <EmptyState message={content.emptyMessage} className="mt-[74px] text-center" />
        )}
      </Container>
    </Section>
  );
}
