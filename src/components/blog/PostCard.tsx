import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  className?: string;
}

/**
 * Figma `Blog-card` (680 wide): tag, title and excerpt over a bottom hairline,
 * 20px of vertical padding. The Home's blog column, and nothing else.
 *
 * Not the same card as `BlogPostCard`, which the archive and the post sidebar
 * use: that one is a boxed card of 432 with a date and an action. Four of the
 * five characteristics differ, so they are two components rather than one with
 * a `variant`.
 *
 * ## The whole card is the link
 *
 * It used to be static — the component took an optional `href` and the Home
 * never passed one, so the Home's blog cards were the only cards on the site a
 * reader could not click. `/blog/[slug]` now exists and the card leads there,
 * which is the rule already fixed for `BookCard`: a card is an element of
 * discovery and navigation.
 *
 * `href` is gone rather than made required. A card whose destination is
 * optional invites exactly the mistake that was made here, and there is only
 * one place a post card can lead.
 *
 * The Home renders this outside a carousel, so there is no drag to swallow the
 * click.
 */
export function PostCard({ post, className }: PostCardProps) {
  // The frame prints one tag; a post may carry several, and the first is the
  // one editorial put first.
  const [tag] = post.contentTags;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "border-muted/20 hover:text-mata flex w-full flex-col items-start gap-2.5 border-b py-5 transition-colors duration-200",
        className,
      )}
    >
      {tag ? <p className="text-slab-menu text-muted">{tag}</p> : null}
      <h3 className="text-slab-sub text-balance">{post.title}</h3>
      <p className="text-body">{post.excerpt}</p>
    </Link>
  );
}
