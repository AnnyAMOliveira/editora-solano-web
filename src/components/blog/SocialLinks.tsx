import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

/**
 * The glyph for each platform.
 *
 * A `Record` over the union rather than a lookup that can miss: adding a
 * platform to `SocialLink["id"]` is a type error here until it has an icon, so
 * a new network cannot ship as a blank space.
 *
 * The icons come from `@phosphor-icons/react`, the pack the project already
 * uses — nothing is hand-drawn and no external image is fetched. The `ssr`
 * entry point is the one the rest of the project imports from: these render on
 * the server and never need to become client components.
 */
const ICONS: Record<SocialLink["id"], Icon> = {
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  linkedin: LinkedinLogo,
  facebook: FacebookLogo,
  x: XLogo,
};

/**
 * Figma: the "Nos Siga nas Redes!" row of the post sidebar (547:4027) — 28px
 * glyphs on a 14px rhythm.
 *
 * ## A network without a URL is not a link
 *
 * `href` is optional on `SocialLink`, and every entry currently has one — the
 * X profile was the last outstanding destination and arrived on 27/08/2026,
 * filled in `lib/content/blog.ts` without a line changing here, which is the
 * whole point of the branch below.
 *
 * The branch stays. An entry without `href` renders as plain content — no
 * anchor, no hover, not in the tab order — instead of pointing somewhere
 * invented. A dead link costs the reader a click and tells them nothing; an
 * inert glyph at least says the network exists. It is not hidden either: the
 * space is held until a destination exists for it.
 *
 * Destinations leave the site, so each one gets a plain anchor with
 * `target="_blank"` and the new-tab note screen readers otherwise never hear —
 * the same treatment `Button` gives an external href.
 */
export function SocialLinks({ links, className }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center justify-center gap-3.5", className)}>
      {links.map((link) => {
        const Glyph = ICONS[link.id];

        return (
          <li key={link.id} className="flex">
            {link.href ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terra relative transition-colors duration-200"
              >
                <Glyph className="size-7" weight="fill" />
                <span className="sr-only">
                  {link.label} (abre em nova aba)
                </span>
              </a>
            ) : (
              /* Sem destino: renderiza o glifo e o nome para leitores de tela,
                 sem âncora e fora da ordem de tabulação. */
              <span className="text-muted">
                <Glyph className="size-7" weight="fill" />
                <span className="sr-only">{link.label}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
