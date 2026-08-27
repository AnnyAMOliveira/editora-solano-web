"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { FieldShell, fieldSkin } from "@/components/ui/FieldShell";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types";

interface SelectFieldProps {
  label: string;
  name: string;
  /** The `value` of the selected option, or "" while nothing is chosen. */
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Shown in `muted` until an option is picked. */
  placeholder?: string;
  required?: boolean;
  error?: string | null;
  className?: string;
}

/**
 * Figma: the `Gênero` field of Publique › `Section 5` (`440:749`) — the same
 * bordered box as the text fields, with a 24px `CaretDown` on the right and
 * 16px of padding instead of 56px, which is what makes it 40px tall where the
 * others are 33px. The caret is Phosphor's `CaretDown` at `fill`: the exported
 * asset is that exact glyph, so the icon package the project already depends
 * on is used rather than a new file.
 *
 * A native `select` was not an option: its open list is drawn by the operating
 * system and cannot carry the palette. So the trigger is a button and the list
 * a real `listbox`, which is also what lets the open and selected states be
 * built from tokens the design system already has — `paper` over the page, the
 * card shadow, `watermark/20` for the highlighted row and `mata` for the one in
 * effect. The design draws no open state; these are the closest existing
 * values, not new ones.
 *
 * Focus moves into the list while it is open and returns to the button when it
 * closes, which is the ARIA listbox pattern. The hidden input keeps the chosen
 * value inside the native form payload.
 */
export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  error,
  className,
}: SelectFieldProps) {
  const buttonId = useId();
  const listId = useId();
  const errorId = useId();
  const optionPrefix = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const optionId = (index: number) => `${optionPrefix}-${index}`;

  function open(index?: number) {
    setActiveIndex(index ?? (selectedIndex >= 0 ? selectedIndex : 0));
    setIsOpen(true);
  }

  function close(restoreFocus = true) {
    setIsOpen(false);
    setActiveIndex(-1);
    if (restoreFocus) buttonRef.current?.focus();
  }

  function commit(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    close();
  }

  // Focus follows the list so the keyboard reaches it; `close` hands it back.
  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  // A pointer landing anywhere else dismisses the list without stealing focus.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) close(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  // Keeps the highlighted row visible once the list is long enough to scroll.
  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    // Enter and Space already reach `onClick` through the button's own
    // behaviour, so only the arrows need handling here.
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    open(event.key === "ArrowUp" ? options.length - 1 : undefined);
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        commit(activeIndex);
        break;
      case "Escape":
      case "Tab":
        // Tab is swallowed rather than followed: the list is about to unmount,
        // and letting the browser move on from a disappearing element drops
        // focus to the body. Closing puts it back on the button instead.
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  }

  return (
    <FieldShell
      label={label}
      controlId={buttonId}
      errorId={errorId}
      error={error}
      required={required}
      className={className}
    >
      <div ref={containerRef} className="relative w-full">
        <button
          ref={buttonRef}
          type="button"
          id={buttonId}
          // `combobox` rather than the implicit `button`: it is the role that
          // carries `aria-expanded` together with `aria-required` and
          // `aria-invalid`, which a plain button does not support.
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onClick={() => (isOpen ? close() : open())}
          onKeyDown={handleButtonKeyDown}
          className={cn(
            fieldSkin(error),
            "text-field flex items-center justify-between gap-2 pr-4 text-left",
          )}
        >
          <span className={cn("truncate", selected ? "text-ink" : "text-muted")}>
            {selected ? selected.label : placeholder}
          </span>
          <CaretDown
            weight="fill"
            aria-hidden="true"
            className={cn(
              "text-muted size-6 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {/* Carries the choice into the native payload; the React state in
            `SubmissionDraft` is what an endpoint will actually read. */}
        <input type="hidden" name={name} value={value} />

        {isOpen ? (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label}
            aria-activedescendant={
              activeIndex >= 0 ? optionId(activeIndex) : undefined
            }
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
            className="border-muted/20 bg-paper shadow-card absolute inset-x-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-md border py-1 focus-visible:outline-none"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={optionId(index)}
                data-index={index}
                role="option"
                aria-selected={option.value === value}
                // Keeps focus on the list: without this the press blurs it and
                // the click never lands on an option.
                onPointerDown={(event) => event.preventDefault()}
                onPointerEnter={() => setActiveIndex(index)}
                onClick={() => commit(index)}
                className={cn(
                  "text-field cursor-pointer px-3 py-2 transition-colors duration-150",
                  index === activeIndex && "bg-watermark/20",
                  option.value === value ? "text-mata" : "text-ink",
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </FieldShell>
  );
}
