import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { Container } from "@/components/ui/Container";
import { PageHeroBlock } from "@/components/ui/PageHeroBlock";
import type { CatalogContent } from "@/types";

interface CatalogSectionProps {
  content: CatalogContent;
  /** Genre in effect, already validated against the taxonomy by the page. */
  genreSlug: string;
}

/**
 * Figma: Catálogo › `Section1` (521:2253) — the editorial opening over the
 * toolbar and the grid.
 *
 * A thin layer on purpose. The hero is the block every inner page uses, and
 * everything below it is one interactive unit, so this file's whole job is the
 * page's vertical rhythm and the split between what the server renders and
 * what the browser takes over.
 *
 * The hero is capped at the 693px the frame gives its container rather than
 * running the full 1320 column: "Todos os Livros" is meant to sit on one line
 * under the eyebrow, not stretch across the page.
 */
export function CatalogSection({ content, genreSlug }: CatalogSectionProps) {
  const { books, genres, ...copy } = content;

  return (
    <section
      aria-label="Catálogo"
      className="pt-16 pb-10 md:pb-section lg:pt-[88px]"
    >
      <Container>
        <PageHeroBlock hero={content.hero} className="max-w-[693px]" />

        {/* Figma leaves 58px between the headline and the toolbar. */}
        <CatalogBrowser
          copy={copy}
          books={books}
          genres={genres}
          genreSlug={genreSlug}
          className="mt-10 lg:mt-[58px]"
        />
      </Container>
    </section>
  );
}
