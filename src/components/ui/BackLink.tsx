"use client";

import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

/** Quanto esperar antes de concluir que o back() não saiu do lugar. */
const RETORNO_MS = 120;

interface BackLinkProps {
  label: string;
  /**
   * Where to go when there is no history to go back to — someone who opened
   * the page from a shared link, a search result or a new tab.
   *
   * A prop rather than a constant: this component has no idea which page it is
   * sitting on, and the page it belongs to does. It is a safety net, not the
   * normal behaviour — the normal behaviour is the browser's own history.
   */
  fallbackHref: string;
  className?: string;
}

/**
 * Figma `Breadcrumb` on the author page (`530:3251`) — a small caret and the
 * word "Voltar", set in `RegularText/p` grey.
 *
 * ## Why history and not a route
 *
 * The author page is reached from two places, the Home's co-authorship
 * carousel and a book page, and "voltar" should mean the place the reader
 * actually came from. A fixed destination would send half of them somewhere
 * they have never been.
 *
 * ## Why a button and not a link
 *
 * It performs an action on the session's history; it does not address a
 * document. A `<a href>` here would offer "open in new tab" on something that
 * cannot be opened in a new tab.
 *
 * ## How the fallback is decided
 *
 * By trying and checking, rather than by predicting. `router.back()` runs
 * first; if the address has not moved a moment later, there was nothing to go
 * back to and the fallback is used.
 *
 * The obvious predictions were tried and do not work. `history.length > 1` is
 * true even in a brand-new tab — the new-tab page counts — so it fires the
 * wrong branch in exactly the case the fallback exists for. `document.referrer`
 * belongs to the document, and after a client-side navigation that is still
 * the page the reader first entered the site on, so it says nothing about
 * where they came from a moment ago. Nothing synchronous distinguishes the two
 * situations reliably; the outcome does.
 *
 * **Residual case:** a reader who opened this URL in a tab that had already
 * visited another site goes back to that site. The browser's history really
 * does have a previous page there, so `back()` succeeds and the check never
 * runs. That is the native behaviour of a back control, and overriding it
 * would mean guessing against the reader's own history.
 */

export function BackLink({ label, fallbackHref, className }: BackLinkProps) {
  const router = useRouter();

  function handleClick() {
    const antes = window.location.href;

    router.back();

    window.setTimeout(() => {
      if (window.location.href === antes) router.push(fallbackHref);
    }, RETORNO_MS);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "text-body text-muted hover:text-ink inline-flex items-center gap-2.5 transition-colors duration-200",
        className,
      )}
    >
      <CaretLeft aria-hidden="true" className="size-3 shrink-0" />
      {label}
    </button>
  );
}
