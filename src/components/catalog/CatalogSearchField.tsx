"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useId } from "react";

import { cn } from "@/lib/utils";

interface CatalogSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

/**
 * Figma `input/with button` (502 × 33, node 521:2511): the magnifier, then the
 * placeholder, inside a 6px-cornered box.
 *
 * Two details are the frame's and not the form pages': the border is solid
 * `muted` rather than the `muted/20` every field on Publique and Contato uses,
 * and the right padding is 56px — room the design reserves and leaves empty.
 * Both are reproduced as drawn, which is why this does not go through
 * `fieldSkin`: matching that helper would quietly restyle the field.
 *
 * The magnifier is Phosphor's `MagnifyingGlass`, the same glyph the frame
 * exports and the same package `SelectField` already takes `CaretDown` from —
 * no new asset is involved.
 *
 * There is no visible label: the design draws none, so the placeholder doubles
 * as the accessible name through `aria-label`. A placeholder alone would leave
 * the field unnamed once text is typed into it.
 *
 * `type="search"` rather than `text` — it is what the control is, and it gives
 * mobile keyboards the right action key. The browser's own clear button is
 * suppressed: it is drawn by the platform, carries none of the palette, and
 * the design has no counterpart for it.
 */
export function CatalogSearchField({
  value,
  onChange,
  placeholder,
  className,
}: CatalogSearchFieldProps) {
  const inputId = useId();

  return (
    <div
      className={cn(
        "border-muted flex items-center gap-2.5 rounded-md border py-2 pr-14 pl-3",
        "focus-within:border-ink transition-colors duration-200",
        className,
      )}
    >
      <MagnifyingGlass
        aria-hidden="true"
        className="text-muted size-[11px] shrink-0"
      />

      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="text-field placeholder:text-muted w-full bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden"
      />
    </div>
  );
}
