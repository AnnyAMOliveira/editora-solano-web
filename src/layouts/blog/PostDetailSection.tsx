import Image from "next/image";
import Link from "next/link";

import { PostBody } from "@/components/blog/PostBody";
import { PostSidebar } from "@/components/blog/PostSidebar";
import { Container } from "@/components/ui/Container";
import { formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toTagSlug } from "@/lib/tags";
import { MOTION_COLUMN_DELAY, MOTION_HERO_DELAY, Reveal } from "@/motion";
import type { PostPageData } from "@/types";

interface PostDetailSectionProps {
  data: PostPageData;
}

/**
 * Figma: `Single page` (537:3686) — one publication.
 *
 * A full-bleed cover with the title block laid over its foot, then the article
 * column beside the sidebar: 857 and 385 in the frame, which is the 1320
 * content column with the gap the design leaves between them. They stack below
 * `lg`, article first.
 *
 * ## What the frame draws and this does not
 *
 * The metadata row under the title reads "By nome do autor — 2 minute read —
 * 1.6K views — 1.2K shares".
 *
 * **The view and share counters are not implemented, and should not be.** They
 * are analytics: there is no field for them on `Post`, no source for them in
 * the project, and no way to produce one without a measurement backend. A
 * number invented for them would be a false statistic printed beside a real
 * text — the same class of error as a plausible fake ISBN, and worse, because
 * a reader has no way to tell.
 *
 * **Reading time is not implemented either**, for a different reason: it is
 * derivable from `content` rather than fabricated, so it could be computed
 * honestly. It is left out because the frame pairs it with the two counters in
 * one row, and rebuilding a third of that row invents a composition the design
 * never drew. It is a small addition the day the row is specified without them.
 *
 * So the row carries the author and the date. **The date is an addition**: the
 * frame does not draw one anywhere on this page, which for a dated archive
 * reads as an omission rather than a decision — a reader who arrives from a
 * search result has no way to tell whether they are reading something from
 * last week or from 2021. Flagged in the inventory.
 *
 * ## The tags
 *
 * The frame does not draw them on this page either, and the navigation the
 * brief describes — publication → related editorial tags — has to happen
 * somewhere. They sit at the foot of the article column, after the body, which
 * is where a reader looks once they have finished rather than before they have
 * begun. Also flagged.
 *
 * ## Motion
 *
 * Cover, then title block, then the article beside the sidebar — the order the
 * page is read in. The cover is `fadeIn` for the reason the book page gives:
 * a surface that size should not travel.
 *
 * The title block is a hero and behaves like one — two beats, the headline
 * then the byline and lead. See the note at the block itself.
 *
 * The sidebar is one group and not three. It is a column of asides — social,
 * newsletter, recent posts — and cascading them would give secondary material
 * more entrance than the article it sits next to.
 *
 * ## The cover
 *
 * Renders only when `coverImage` has a value, and it has none on any post
 * today. Without it the page opens on the title block against the page ground
 * — no placeholder, no grey rectangle standing in for a photograph.
 */
export function PostDetailSection({ data }: PostDetailSectionProps) {
  const { copy, post, authors, latest } = data;
  const hasCover = post.coverImage !== "";

  return (
    <article aria-label={post.title} className="pb-10 md:pb-section">
      <Container>
        {/* Figma stacks the title block over the foot of the cover; without a
            cover it simply opens the page. */}
        <div
          className={cn(
            "relative overflow-hidden",
            hasCover ? "pt-16" : "pt-16 lg:pt-[88px]",
          )}
        >
          {hasCover ? (
            <Reveal preset="fadeIn">
              <div className="relative aspect-[1322/743] w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 1440px) 1320px, 100vw"
                  className="object-cover"
                />
                {/* Figma lays a dark wash over the image so the title holds
                  against any photograph. */}
                <div
                  aria-hidden="true"
                  className="from-ink/80 absolute inset-0 bg-gradient-to-t via-transparent"
                />
              </div>
            </Reveal>
          ) : null}

          {/* The title block is this page's hero, so it arrives in the two
              beats every hero on the site uses: the headline, then what sits
              under it. Two transparent groups inside the block rather than one
              around it — the block's own element carries the positioning that
              lays the title over the foot of the cover. */}
          <div
            className={cn(
              "flex flex-col items-start gap-4",
              hasCover
                ? "text-bg absolute right-0 bottom-0 left-0 p-6 lg:p-10"
                : "",
            )}
          >
            <Reveal preset="heroReveal">
              <h1 className="text-display text-balance">{post.title}</h1>
            </Reveal>

            <Reveal preset="heroReveal" delay={MOTION_HERO_DELAY}>
              {post.excerpt ? (
                <p className="text-body-lg max-w-[74ch]">{post.excerpt}</p>
              ) : null}

              {/* Figma: author, then a hairline separator, then the next item.
                  Os nomes vêm da relação resolvida, não de texto no post — a
                  vírgula é tipografia, a mesma escolha do bloco de título do
                  livro. Sem autoria registrada, a assinatura não renderiza. */}
              <div className="text-slab-menu flex flex-wrap items-center gap-4">
                {authors.length > 0 ? (
                  <>
                    <span>
                      {copy.byLabel} {authors.map((a) => a.name).join(", ")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="bg-current/40 h-px w-5"
                    />
                  </>
                ) : null}
                <span>{formatShortDate(post.publishedAt)}</span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Figma: 857 of article beside 385 of sidebar, inside the 1320. */}
        <div className="mt-12 grid gap-12 lg:mt-[74px] lg:grid-cols-[minmax(0,857px)_minmax(0,385px)] lg:justify-between lg:gap-x-[139px]">
          <Reveal as="div" className="flex flex-col gap-12">
            <PostBody blocks={post.content} />

            {post.contentTags.length > 0 ? (
              <div className="border-muted/20 flex flex-wrap items-center gap-2.5 border-t pt-6">
                {post.contentTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${toTagSlug(tag)}`}
                    className="text-slab-small border-muted/20 hover:border-terra hover:text-terra rounded border px-2.5 py-1.5 transition-colors duration-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={MOTION_COLUMN_DELAY}>
            <PostSidebar copy={copy} latest={latest} />
          </Reveal>
        </div>
      </Container>
    </article>
  );
}
