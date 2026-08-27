import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The bordered box every field in the Figma form shares: 6px corner, hairline
 * border on the page background, 8px of vertical padding and 12px on the left.
 *
 * Right padding is left to the caller — the design gives the text fields 56px
 * (room reserved for an affordance that was never drawn) and the select 16px,
 * because there the caret occupies that space for real.
 */
export function fieldSkin(error?: string | null) {
  return cn(
    "w-full rounded-md border bg-transparent py-2 pl-3",
    error ? "border-terra" : "border-muted/20",
  );
}

interface FieldShellProps {
  label: string;
  /** `id` of the control the label points at. */
  controlId: string;
  /** `id` the control references through `aria-describedby` when it errors. */
  errorId: string;
  error?: string | null;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Label, control and error message stacked 6px apart — the `input` frame of
 * the Figma form, minus the control itself.
 *
 * Extracted from `FormField` when the genre field became a dropdown: the two
 * now differ only in what sits between the label and the message, so the
 * wrapper is shared instead of duplicated. Nothing about the resting design
 * changed in the process.
 */
export function FieldShell({
  label,
  controlId,
  errorId,
  error,
  required = false,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <label htmlFor={controlId} className="text-slab-menu">
        {label}
        {/* The control's own `required` is what assistive tech announces; the
            asterisk is the visual counterpart, so it is hidden from the tree
            to avoid the label being read twice over. */}
        {required ? (
          <span className="text-muted" aria-hidden="true">
            {" *"}
          </span>
        ) : null}
      </label>

      {children}

      {error ? (
        <p id={errorId} className="text-body-sm text-terra">
          {error}
        </p>
      ) : null}
    </div>
  );
}
