import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { ArrowRightIcon } from "@/components/ui/ArrowRightIcon";
import { isExternalHref } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Figma maps to two components and their variants:
 *  - `Botão` (359:447)              → "solid" (ink, hover mata) and the
 *                                     Section 5 "terra" fill
 *  - `Botão icon` / Padrão (367:926) → "outline"
 *  - `Botão icon` / Variante 2       → "link" (areia underline, terra on hover)
 *
 * `outline` and `link` take their color from the surrounding text, so the same
 * variant works on the light page and on the dark ink bands.
 *
 * ## The August 2026 update
 *
 * Both components were rebound in the design library and this file follows:
 *
 * - **Type dropped from `Slab/Menu` (14, SemiBold) to `Slab/small` (12,
 *   Medium).** Every label on the site got smaller and lighter at once.
 * - **The filled and outlined boxes gained a 4px corner.** `rounded` is
 *   Tailwind's own 4px, so it needs no token — the same call `SelectField`
 *   makes for the 6px of the form fields. `link` has no box and so no corner.
 *
 * `terra` and `mata` are project variants of the same box rather than separate
 * Figma components; they take the corner too, because a squared secondary
 * button beside a rounded primary one would read as a bug.
 *
 * **One thing from the update is deliberately not implemented.** The library's
 * new "Hover" state for `link` sets the label to `--neutral/white` over a
 * terra underline. On the artboard, which is the light page background, that
 * text is invisible — and the only place `link` is used is a light page. It is
 * an authoring slip of the same kind as "Acessoria" and "Midia Kit", so the
 * hover keeps the terra underline the state also specifies and leaves the
 * label alone.
 */
export type ButtonVariant = "solid" | "terra" | "mata" | "outline" | "link";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Appends the arrow drawn in the Figma `Botão icon` component. */
  hasIcon?: boolean;
  /**
   * A glyph before the label — the `BookOpenText` of "Ler Amostra" on the book
   * page (`527:3158`).
   *
   * A slot rather than a named icon: the button should not know which glyphs
   * exist, and the trailing arrow is the only one the design uses often enough
   * to be built in. Pass an already-sized element; it is rendered as-is and
   * hidden from assistive technology, since the label beside it says the same
   * thing.
   */
  icon?: ReactNode;
  className?: string;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
}

interface ButtonAsButton
  extends BaseProps,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "disabled"> {
  href?: undefined;
}

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const BASE =
  "text-slab-small inline-flex items-center justify-center gap-2.5 whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  // Figma: Botão — bg neutral/ink, hover Brand/color-brand-mata, corner 4px
  solid: "bg-ink text-bg rounded p-2.5 hover:bg-mata",
  // Figma: Section 5 secondary fill. Hover reuses the mata state defined on Botão.
  terra: "bg-terra text-bg rounded p-2.5 hover:bg-mata",
  // Figma: Section7 "Assinar". No hover was designed, and this button sits on
  // the ink band — swapping the fill to any darker token would make it vanish,
  // so the hover lifts the same green instead.
  mata: "bg-mata text-bg rounded p-2.5 hover:brightness-125",
  // Figma: Botão icon / Padrão. No hover was designed — a 5% wash of the
  // current color keeps it discreet and works on both tones.
  outline: "border border-current rounded p-2.5 hover:bg-current/5",
  // Figma: Botão icon / Variante 2 — areia underline, terra underline on hover.
  link: "border-b border-areia py-[5px] hover:border-terra",
};

export function Button(props: ButtonProps) {
  const { children, variant = "solid", hasIcon = false, icon, className } = props;

  const content = (
    <>
      {icon ? (
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {hasIcon ? <ArrowRightIcon /> : null}
    </>
  );

  const classes = cn(BASE, VARIANTS[variant], className);

  if (props.href !== undefined) {
    // A destination that leaves the app gets a plain anchor: `next/link` would
    // try to prefetch and client-navigate a route that is not ours. The new tab
    // is announced to screen readers, which otherwise get no warning.
    //
    // `relative` is not cosmetic: the note below is `sr-only`, which is
    // `position: absolute`. Without a positioned anchor it resolves against a
    // far-away containing block, escapes any scroller it sits in — the book
    // carousel on the Home, for one — and drags the document's scroll width
    // out with it.
    if (isExternalHref(props.href)) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("relative", classes)}
        >
          {content}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
