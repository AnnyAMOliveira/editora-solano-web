import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/ArrowRightIcon";
import { formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";

interface BlogPostCardProps {
  post: Post;
  /** The card's action label, from `lib/content/blog.ts`. */
  readMoreLabel: string;
  className?: string;
}

/**
 * Figma `Blog Card` (537:3628) — the card of the blog archive and of the
 * sidebar column on a post page.
 *
 * A boxed card: hairline border, `shadow-card`, 21px of padding, and four rows
 * — metadata, title, excerpt, action. Width is fluid: the archive gives it a
 * third of the grid (432 in the frame) and the sidebar 385, and only the text
 * column changes.
 *
 * ## Not a variant of `PostCard`
 *
 * `PostCard` is the Home's row: 680 wide, a bottom hairline instead of a box,
 * no date and no action. Four of its five characteristics differ from this
 * one, so a shared component with a `variant` prop would be two layouts
 * wearing one name.
 *
 * ## The whole card is the link
 *
 * There is no separate button, so "Ler Completo" is not an anchor — an anchor
 * inside an anchor is invalid HTML. It renders as the affordance the frame
 * draws, and the card around it carries the destination. Same call `BookCard`
 * makes.
 *
 * ## Hover is `GenreCard`'s, not its own
 *
 * The frame draws no hover for this card, and what shipped here — a border
 * that darkened a notch — was a second hover language in a project that
 * already had one. It now uses `GenreCard`'s: ink ground, light text, the
 * same `transition-colors duration-200`. Nothing moves and nothing scales;
 * `shadow-card` stays put, exactly as it does on the genre card.
 *
 * Two children carry their own colour and so survive the inversion. The
 * metadata line keeps `text-muted`, which is what `GenreCard`'s index does on
 * the same ground. The action does not: terra on ink is too dark to read as a
 * state, and areia is the palette's mark for that ground — the call
 * `PressContactCard` already documents.
 *
 * ## The excerpt is clamped to three lines
 *
 * The frame reserves exactly three lines for it, and that is what keeps a row
 * of cards the same height — the reason the 200-character rule exists at all.
 * But the frame's own sample is 144 characters and fills those three lines, so
 * a full 200 needs four or five. The clamp is the visual protection the rule
 * asks for: the text is stored whole and shown truncated, and a row never
 * breaks because one editor wrote to the limit.
 */
export function BlogPostCard({
  post,
  readMoreLabel,
  className,
}: BlogPostCardProps) {
  // The frame prints one tag, and a post may carry several. The first is the
  // one editorial put first.
  const [tag] = post.contentTags;
  const date = formatShortDate(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        // Figma: border `overlay/neutral/20`, `shadow`, padding 20, gap 20.
        // Sem fundo próprio — o card é transparente sobre a página até o hover.
        "border-muted/20 shadow-card hover:bg-ink hover:text-bg group flex w-full flex-col gap-5 border p-5 transition-colors duration-200",
        className,
      )}
    >
      {/* Tag and date share one line, as the frame draws them; the dash is
          typography, not data. Either half may be missing. */}
      <p className="text-slab-menu text-muted">
        {[tag, date].filter(Boolean).join(" - ")}
      </p>

      <h3 className="text-slab-h2 text-balance">{post.title}</h3>

      <p className="text-body line-clamp-3">{post.excerpt}</p>

      {/* Pushed to the bottom so the action sits on one line across a row of
          cards whose titles wrap differently. */}
      <span className="text-slab-menu text-terra group-hover:text-areia mt-auto flex items-center justify-end gap-1">
        {readMoreLabel}
        <ArrowRightIcon />
      </span>
    </Link>
  );
}
