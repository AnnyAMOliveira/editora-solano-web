import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageNav } from "@/components/ui/PageNav";
import { Reveal } from "@/motion";
import type { BlogContent, Pagination, Post } from "@/types";

interface BlogArchiveSectionProps {
  /** Olho acima do título — "Blog" no arquivo, "Tag" na página de tag. */
  eyebrow: string;
  /** "Escritos da Casa", ou o nome da tag. */
  title: string;
  posts: Post[];
  /** Approved sentence for when the list is empty. */
  emptyMessage: string;
  readMoreLabel: BlogContent["readMoreLabel"];
  /**
   * Navegação entre páginas. Ausente na página de tag, que não pagina — ver a
   * nota no corpo do componente.
   */
  pagination?: {
    state: Pagination;
    basePath: string;
    copy: BlogContent["pagination"];
  };
}

/**
 * Figma: `Blog` (534:3272) — the editorial archive.
 *
 * ## One section, two routes
 *
 * `/blog` and `/blog/tag/[slug]` are the same screen: same grid, same cards,
 * same spacing, same empty state. Only the heading and the list differ, so
 * both arrive as props and there is one component rather than two that would
 * have to be kept in step.
 *
 * ## The grid
 *
 * Three columns of cards that butt against one another, the idiom the genre
 * grid and the communities grid already use. The frame insets the grid to
 * 1296px (x 72) while the page column is 1320 (x 60); the 24px difference is
 * not reproduced, following the rule the earlier pages set — fixed frame
 * offsets give way to padding and flow, so the grid lines up with every other
 * band on the site.
 *
 * Below `lg` it drops to two columns and then to one, which is what the other
 * card grids on the site do. There is no tablet or mobile frame for this page.
 *
 * ## Quantity
 *
 * The frame draws six cards, which is composition and not a limit. The archive
 * pages at nine — three full rows, so no orphan cell except possibly on the
 * last page — and `PageNav` only renders once there is a second page. The tag
 * page passes no `pagination` and lists everything it matches: paging it would
 * cost its static generation, and no tag is near the threshold.
 *
 * ## Motion
 *
 * The eyebrow and the headline arrive together, then the cards cascade. The
 * grid is `<Reveal as="ul">` rather than a wrapper around the list: a `<div>`
 * between a `<ul>` and its `<li>`s is invalid markup, and the negative-margin
 * hairline collapse the grid depends on (`[&>*]:-mt-px`) is written against
 * the list's own children.
 *
 * The card grid on the tag route is the same component and therefore gets the
 * same entrance for free — one of the reasons the two routes share a file.
 *
 * ## The hero has no lead line
 *
 * Every other inner page opens with eyebrow, title and a paragraph. This one
 * opens with two, which is what the frame draws. `PageHeroBlock` is not used
 * because its `paragraphs` field would be permanently empty; the two lines are
 * written out instead.
 */
export function BlogArchiveSection({
  eyebrow,
  title,
  posts,
  emptyMessage,
  readMoreLabel,
  pagination,
}: BlogArchiveSectionProps) {
  const pageLabel = pagination
    ? pagination.copy.pageLabel
        .replace("{current}", String(pagination.state.current))
        .replace("{total}", String(pagination.state.totalPages))
    : "";

  return (
    <section
      aria-label={title}
      className="pt-16 pb-10 md:pb-section lg:pt-[88px]"
    >
      <Container>
        <div className="flex flex-col items-start gap-5">
          <Reveal>
            <p className="text-slab-sub">{eyebrow}</p>
            <h1 className="text-display text-balance">{title}</h1>
          </Reveal>
        </div>

        {/* Figma leaves 60px between the title block and the first card. */}
        {posts.length > 0 ? (
          <Reveal
            as="ul"
            preset="staggerCards"
            className="mt-12 grid grid-cols-1 pt-px pl-px sm:grid-cols-2 lg:mt-15 lg:grid-cols-3 [&>*]:-mt-px [&>*]:-ml-px"
          >
            {posts.map((post) => (
              <li key={post.id} className="flex">
                <BlogPostCard post={post} readMoreLabel={readMoreLabel} />
              </li>
            ))}
          </Reveal>
        ) : (
          <EmptyState message={emptyMessage} className="mt-12 lg:mt-15" />
        )}

        {pagination ? (
          <PageNav
            pagination={pagination.state}
            basePath={pagination.basePath}
            label={pageLabel}
            previousLabel={pagination.copy.previousLabel}
            nextLabel={pagination.copy.nextLabel}
            className="mt-12 justify-center"
          />
        ) : null}
      </Container>
    </section>
  );
}
