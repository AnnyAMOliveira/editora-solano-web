import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { SocialLinks } from "@/components/blog/SocialLinks";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { cn } from "@/lib/utils";
import type { BlogContent, Post } from "@/types";

interface PostSidebarProps {
  copy: BlogContent;
  /** Recent posts, this one already excluded by the data layer. */
  latest: Post[];
  className?: string;
}

/**
 * Figma: the right column of `Single page` (547:4143) — three blocks stacked
 * in 385px.
 *
 * ## What renders, and what waits
 *
 * **"Nos Siga nas Redes!"** renders whenever `copy.socialLinks` has entries.
 * Four of the five carry official URLs; the X profile has none and renders as
 * an inert glyph rather than a link to nowhere — see `SocialLinks`.
 *
 * **The newsletter** reuses `NewsletterForm`, the same component the Home's
 * community band uses. The frame draws two fields where that form has one; the
 * existing component is used as it stands rather than forked, because a second
 * newsletter form with its own validation is two things to keep in step for a
 * field nobody asked for.
 *
 * **"Últimos Posts"** is three `BlogPostCard`s at the column's width. The same
 * card as the archive, which is why it takes no `variant` — only its container
 * is narrower.
 */
export function PostSidebar({ copy, latest, className }: PostSidebarProps) {
  const hasSocial = copy.socialLinks.length > 0;

  return (
    <aside className={cn("flex flex-col gap-12", className)}>
      {hasSocial ? (
        <section aria-label={copy.socialTitle} className="flex flex-col gap-6">
          <h2 className="text-slab-sub text-center">{copy.socialTitle}</h2>
          <SocialLinks links={copy.socialLinks} />
        </section>
      ) : null}

      {/* Figma: bordered container, 385 × 353, heading centred over the lead
          line and the form. */}
      <section
        aria-label={copy.newsletter.title}
        className="border-muted/20 flex flex-col gap-5 border p-5"
      >
        <h2 className="text-slab-sub text-center">{copy.newsletter.title}</h2>
        <p className="text-body text-muted text-center">
          {copy.newsletter.description}
        </p>
        <NewsletterForm />
      </section>

      {latest.length > 0 ? (
        <section
          aria-label={copy.latestPostsTitle}
          className="flex flex-col gap-6"
        >
          <h2 className="text-slab-sub text-center">{copy.latestPostsTitle}</h2>
          <ul className="flex flex-col pt-px [&>*]:-mt-px">
            {latest.map((post) => (
              <li key={post.id} className="flex">
                <BlogPostCard post={post} readMoreLabel={copy.readMoreLabel} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
