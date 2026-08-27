"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useId, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AccordionProps {
  title: string;
  children: ReactNode;
  /** Open on first render. The book page opens the synopsis and closes the sheet. */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Figma: the "Sinopse" and "Ficha Técnica" panels of the book page
 * (`526:3142` and `526:3143`) — a `Slab/sub` heading with a caret at the far
 * edge, the body 22px below it, over a bottom hairline.
 *
 * A disclosure, not a tab set and not an accordion group: each panel opens and
 * closes on its own, and opening one does not close the other. That is what
 * the frame shows — the synopsis open with its caret up, the sheet closed with
 * its caret down, both at once.
 *
 * The button carries `aria-expanded` and points at the region it controls, so
 * the state is announced rather than only drawn. The content is unmounted when
 * closed rather than hidden: there is no open/close animation in the design,
 * and keeping collapsed text in the tree would put it in the tab order and in
 * the page's find-in-page results while invisible.
 *
 * The caret is Phosphor's `CaretDown`, the same glyph `SelectField` and
 * `GenreFilter` already use, rotated when open.
 */
export function Accordion({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={cn("border-muted/20 border-b py-4", className)}>
      <h2>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="hover:text-terra flex w-full items-center justify-between gap-4 text-left transition-colors duration-200"
        >
          <span className="text-slab-sub">{title}</span>
          <CaretDown
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </h2>

      {isOpen ? (
        /* Figma leaves 22px between the header and the body. */
        <div id={panelId} role="region" aria-labelledby={buttonId} className="mt-[22px]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
