import { GenreCard } from "@/components/genres/GenreCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/motion";
import type { Genre, HomeContent } from "@/types";

interface GenresSectionProps {
  content: HomeContent["genres"];
  genres: Genre[];
}

/**
 * Figma: Home › Section 3 (`368:1000`).
 *
 * Header over a 3 × 2 grid of 366 × 181 cards, centered in a 1098px column.
 * The cards butt against each other with a single hairline between them, so
 * each cell is pulled back by 1px to collapse the doubled borders.
 *
 * Every card links to the catalogue filtered by its own genre, which is also
 * what turns on the `card-1` hover state (ink ground, light text) — `GenreCard`
 * ties that state to `href` so a static card never looks clickable. Do not
 * drop the prop to "clean up": it would silently take the hover with it.
 *
 * The destination is built from `genre.slug`, never from the title: the slug is
 * the navigation key the catalogue resolves, and titles are display strings
 * editorial can rewrite. It is composed here rather than stored on the entity
 * because where a genre leads is this page's concern, while what a genre *is*
 * belongs to `lib/content/genres.ts`.
 *
 * ## Motion
 *
 * Two levels, not three: the heading arrives as one block, then the cards
 * cascade. The brief asks for a title/description/cards hierarchy and this is
 * it — a heading whose title and lead line come apart from each other reads as
 * an interface assembling itself, which is the opposite of the intent.
 *
 * `<Reveal as="div">` *is* the grid rather than a wrapper around it, and that
 * matters beyond tidiness here: the grid carries `[&>*]:-mt-px`, so a
 * `display: contents` wrapper between the grid and the cards would leave that
 * selector matching the wrapper — which has no box to pull back — instead of
 * the cards, and the doubled hairlines would return.
 */
export function GenresSection({ content, genres }: GenresSectionProps) {
  return (
    <Section ariaLabel="Navegue por gênero">
      <Container>
        <Reveal>
          <SectionHeading
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <Reveal
          as="div"
          preset="staggerCards"
          className="mx-auto mt-12 grid max-w-[1098px] grid-cols-1 pt-px pl-px sm:grid-cols-2 lg:grid-cols-3 [&>*]:-mt-px [&>*]:-ml-px"
        >
          {genres.map((genre) => (
            <GenreCard
              key={genre.id}
              genre={genre}
              href={`/catalogo?genero=${genre.slug}`}
            />
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
