import { isExternalHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { MediaKitAsset } from "@/types";

interface MediaKitItemProps {
  asset: MediaKitAsset;
  className?: string;
}

/**
 * Figma `Timeline Entry` on Imprensa (572 × 85, node 519:2206): the file's
 * name with a downward arrow, then one line about what it contains, over a
 * bottom hairline.
 *
 * It shares the shell measurements of `TimelineItem` (`px-2.5 py-3.5`, 10px
 * gap, `border-muted/20`) and is deliberately not that component: the title
 * here is a link with a glyph and the description is grey, which is a
 * different row, not a variant. `ContactChannel` set this precedent on
 * Contato.
 *
 * The arrow is typography — U+2193 sits inside the text layer in Figma — so it
 * is appended here rather than stored on the entity, the way `EpisodeRow`
 * appends the "#" to an episode number. It is `aria-hidden` because what it
 * means is said in words by the `sr-only` note instead.
 *
 * No `download` attribute: the file may be served from a CDN or a CMS, where
 * `download` is silently ignored across origins, so the browser or the hosting
 * platform decides whether the file opens or is saved. A plain anchor behaves
 * identically wherever the file lives.
 *
 * `w-[458px]` in the frame is a fixed measure of that file, not a layout rule;
 * the row runs the full column width here and wraps.
 */
export function MediaKitItem({ asset, className }: MediaKitItemProps) {
  const isExternal = isExternalHref(asset.href);

  return (
    <li
      className={cn(
        "border-muted/20 flex w-full flex-col gap-2.5 border-b px-2.5 py-3.5",
        className,
      )}
    >
      <h3 className="text-slab-sub text-balance">
        <a
          href={asset.href}
          {...(isExternal
            ? { target: "_blank" as const, rel: "noopener noreferrer" }
            : {})}
          className="hover:text-terra relative underline-offset-4 transition-colors duration-200 hover:underline"
        >
          {asset.title}
          <span aria-hidden="true"> ↓</span>
          <span className="sr-only">
            {" (baixar arquivo"}
            {isExternal ? ", abre em nova aba" : ""}
            {")"}
          </span>
        </a>
      </h3>

      <p className="text-body text-muted">{asset.description}</p>
    </li>
  );
}
