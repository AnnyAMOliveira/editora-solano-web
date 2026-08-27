"use client";

import { useId, useRef } from "react";

import { cn } from "@/lib/utils";

/** Extensions the design names in the field copy ("Pdf ou Docx"). */
export const ACCEPTED_UPLOAD_EXTENSIONS = [".pdf", ".docx"] as const;

/** `accept` attribute value — extensions plus the matching MIME types. */
export const ACCEPTED_UPLOAD_TYPES = [
  ".pdf",
  ".docx",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",");

/** True when the file name ends in one of the accepted extensions. */
export function hasAcceptedExtension(file: File) {
  const name = file.name.toLowerCase();
  return ACCEPTED_UPLOAD_EXTENSIONS.some((extension) => name.endsWith(extension));
}

interface FileUploadProps {
  /**
   * Accessible name only. The design gives this field no visible label — the
   * copy inside the dashed box is what the reader sees — so it is exposed
   * through `aria-label` instead of a rendered `<label>` element.
   */
  label: string;
  name: string;
  file: File | null;
  onChange: (file: File | null) => void;
  /** Idle copy — Figma: "Anexar arquivo original . Pdf ou Docx". */
  placeholder: string;
  error?: string | null;
  className?: string;
}

/**
 * Figma `upload` (583 × 98): a dashed box on the page background, centred copy.
 *
 * The native input is visually hidden rather than replaced, so the control
 * stays keyboard reachable and the browser's own file dialog is what opens.
 * Drag and drop was left out on purpose — it is not in the design and was not
 * part of this step.
 *
 * Only the format is checked here. There is deliberately no size rule: the
 * real limit belongs to whatever endpoint receives the file.
 */
export function FileUpload({
  label,
  name,
  file,
  onChange,
  placeholder,
  error,
  className,
}: FileUploadProps) {
  const inputId = useId();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "bg-bg flex h-[98px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed px-3 text-center transition-colors duration-200",
          error ? "border-terra" : "border-muted/20 hover:border-muted/40",
        )}
      >
        {file ? (
          <>
            <span className="text-field text-ink max-w-full truncate px-2">
              {file.name}
            </span>
            <span className="text-body-sm text-muted">
              Clique para trocar o arquivo
            </span>
          </>
        ) : (
          <span className="text-field text-muted">{placeholder}</span>
        )}
      </label>

      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        accept={ACCEPTED_UPLOAD_TYPES}
        aria-label={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="sr-only"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />

      {file ? (
        <button
          type="button"
          className="text-body-sm text-muted hover:text-ink self-start underline underline-offset-4 transition-colors duration-200"
          onClick={() => {
            onChange(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
        >
          Remover arquivo
        </button>
      ) : null}

      {error ? (
        <p id={errorId} className="text-body-sm text-terra">
          {error}
        </p>
      ) : null}
    </div>
  );
}
