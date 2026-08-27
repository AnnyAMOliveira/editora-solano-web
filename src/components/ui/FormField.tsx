"use client";

import { useId } from "react";

import { FieldShell, fieldSkin } from "@/components/ui/FieldShell";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  /** Renders the 98px-tall `textarea` variant of the Figma field. */
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  /** Message shown under the field; also flips the field into its error skin. */
  error?: string | null;
  autoComplete?: string;
  className?: string;
}

/**
 * Figma `input` (583 wide): a Slab/Menu label over a bordered field, 6px apart.
 *
 * The design draws only the resting state — no focus, error or filled skin — so
 * the error treatment here is the one already established by `NewsletterForm`:
 * the message is announced through `aria-describedby`, and the border shifts to
 * `terra`, which is the palette's existing warning-ish tone. Nothing new was
 * invented for it.
 *
 * The label, the error message and the border come from `FieldShell`, shared
 * with `SelectField`. The 56px of right padding is this component's own and
 * comes straight from the design (the field reserves room for an affordance
 * that was never drawn).
 */
export function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  multiline = false,
  placeholder,
  required = false,
  error,
  autoComplete,
  className,
}: FormFieldProps) {
  const fieldId = useId();
  const errorId = useId();

  const fieldClasses = cn(
    fieldSkin(error),
    "text-field pr-14",
    "placeholder:text-muted focus-visible:outline-offset-0",
  );

  const shared = {
    id: fieldId,
    name,
    value,
    placeholder,
    required,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(event.target.value),
  };

  return (
    <FieldShell
      label={label}
      controlId={fieldId}
      errorId={errorId}
      error={error}
      required={required}
      className={className}
    >
      {multiline ? (
        <textarea {...shared} rows={4} className={cn(fieldClasses, "h-[98px] resize-y")} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} className={fieldClasses} />
      )}
    </FieldShell>
  );
}
