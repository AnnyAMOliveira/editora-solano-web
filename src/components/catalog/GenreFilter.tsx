"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { cn } from "@/lib/utils";
import type { Genre } from "@/types";

interface GenreFilterProps {
  genres: Genre[];
  /** The selected `Genre.slug`, or "" for the whole catalogue. */
  value: string;
  onChange: (slug: string) => void;
  /** Resting label, shown while no genre is chosen — "Navegar por Gênero". */
  label: string;
  /** Label of the option that clears the filter. */
  allLabel: string;
  className?: string;
}

/**
 * Figma `Botão icon` on Catálogo (197 × 44, node 521:2527): an ink-bordered
 * button carrying the label in grey with a 24px `CaretDown` beside it.
 *
 * ## Why this is not `SelectField`
 *
 * `SelectField` is a form control: it comes wrapped in `FieldShell` with a
 * visible label, an error message, a required marker and a hidden input that
 * carries its value into a form payload. This is none of those — it is a
 * toolbar control that filters a list in place, and it is drawn as a button,
 * not as a field. Bolting the filter onto `SelectField` would mean adding
 * modes to a component that a finished page depends on.
 *
 * The cost is honest and worth naming: the listbox keyboard behaviour below is
 * the same pattern `SelectField` implements. The right fix is a shared
 * `ui/Listbox` primitive that both compose, which is a refactor of Publique's
 * form and belongs to a task that has licence to touch it.
 *
 * ## Behaviour
 *
 * The trigger is a `combobox`, the list a real `listbox`, and focus moves into
 * the list while it is open and returns to the button when it closes — the
 * ARIA pattern, and the same one `SelectField` follows.
 *
 * The design draws only the resting state. Once a genre is picked the button
 * shows it in ink instead of the grey placeholder, which is what tells the
 * reader a filter is on; the open list, the highlighted row and the row in
 * effect reuse `paper`, `shadow-card`, `watermark/20` and `mata` exactly as
 * `SelectField` established them. No new token is introduced.
 *
 * The button starts at the frame's 197px and is allowed to grow to 320 before
 * truncating: the widest genre name is far longer than the resting label, and
 * fixing the width at 197 would clip most of the taxonomy.
 */
export function GenreFilter({
  genres,
  value,
  onChange,
  label,
  allLabel,
  className,
}: GenreFilterProps) {
  const buttonId = useId();
  const listId = useId();
  const optionPrefix = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /** The clear-the-filter row is an option like any other, with an empty slug. */
  const options = [
    { value: "", label: allLabel },
    ...genres.map((genre) => ({ value: genre.slug, label: genre.title })),
  ];

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex > 0 ? options[selectedIndex] : undefined;
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

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) close(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
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
        // Swallowed rather than followed: the list is about to unmount, and
        // letting the browser move on from a disappearing element drops focus
        // to the body. Closing puts it back on the button instead.
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        id={buttonId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleButtonKeyDown}
        className="border-ink text-slab-menu hover:bg-ink/5 flex w-full items-center justify-between gap-2.5 border p-2.5 text-left transition-colors duration-200 sm:w-auto sm:min-w-[197px]"
      >
        <span
          className={cn(
            "truncate sm:max-w-[240px]",
            selected ? "text-ink" : "text-muted",
          )}
        >
          {selected ? selected.label : label}
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
          className="border-muted/20 bg-paper shadow-card absolute top-[calc(100%+4px)] right-0 z-20 max-h-72 w-full min-w-full overflow-y-auto rounded-md border py-1 focus-visible:outline-none sm:w-max sm:max-w-[320px]"
        >
          {options.map((option, index) => (
            <li
              key={option.value || "all"}
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
  );
}
