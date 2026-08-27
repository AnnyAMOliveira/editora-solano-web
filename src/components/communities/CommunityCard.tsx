import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Community } from "@/types";

interface CommunityCardProps {
  community: Community;
  /** CTA wording — page copy, so it arrives from the content layer. */
  ctaLabel: string;
  className?: string;
}

/**
 * Figma `Card-gender` on Comunidades (660 × 261, node 508:2340): a two-up line
 * of cadence and status, then the group's name, one line about it and the way
 * in.
 *
 * It shares a shell with `CourseCard` — the same hairline, 20px padding, 20px
 * gaps and drop shadow — and stays a separate component all the same. The top
 * line here carries two facts pushed apart rather than one label; the CTA is
 * outlined and sits left rather than filled and centred; and there is no
 * closing block, because the status the course card puts at the bottom lives
 * up top in this one. Folding them together would mean three props that
 * rearrange the layout instead of parameterising it.
 *
 * The design centres the stack and its four descriptions all run to one line,
 * so the buttons align by coincidence. Administered copy will not be so tidy,
 * so the CTA is pushed down with `mt-auto` and the row keeps a common baseline
 * whatever the description does.
 *
 * Only the button is interactive; the card is not a link, which would nest an
 * anchor inside an anchor.
 */
export function CommunityCard({
  community,
  ctaLabel,
  className,
}: CommunityCardProps) {
  return (
    <article
      className={cn(
        "border-muted/20 shadow-card flex h-full w-full flex-col gap-5 border p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-slab-menu text-muted">{community.schedule}</p>
        <p className="text-slab-menu text-muted shrink-0 text-right">
          {community.status}
        </p>
      </div>

      <h3 className="text-slab-h2 text-balance">{community.title}</h3>

      <p className="text-body">{community.description}</p>

      {/* Four cards carry the same wording, so the group is named for screen
          readers — otherwise a list of links reads as "Entrar no Grupo" four
          times over. `relative` keeps that `sr-only` note positioned inside the
          button rather than against a distant ancestor. */}
      <Button
        href={community.href}
        variant="outline"
        className="relative mt-auto self-start"
      >
        {ctaLabel}
        <span className="sr-only">{`: ${community.title}`}</span>
      </Button>
    </article>
  );
}
