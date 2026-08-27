import { useEffect, useLayoutEffect, useRef } from "react";

import { createReveal, type RevealOptions } from "./animations";
import { gsap } from "./gsap";

/**
 * `useLayoutEffect` is the correct hook here: the tween's start state has to be
 * written before the browser paints, or a group that is about to rise is drawn
 * once in its final position first. React logs a warning when a client
 * component that uses it is prerendered, because effects never run on the
 * server — so the server pass gets `useEffect`, which is the standard swap and
 * behaves identically (it also never runs there).
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Binds a group of elements to an entrance and cleans up after itself.
 *
 * Returns a ref for the group's element. Every **direct child** of that
 * element is animated; the element itself is not.
 *
 * ## The content is never waiting on this hook
 *
 * There is no pre-hidden state and no attribute the CSS keys off. The page the
 * server sends is already finished, and everything this hook does is additive.
 * If it never runs, nothing is missing.
 *
 * What that costs, and where it is paid, is documented in {@link createReveal}:
 * a group the reader can already see is moved but never faded, so it stays
 * legible through its own entrance.
 *
 * ## Reduced motion
 *
 * `gsap.matchMedia` is what enforces it, and it enforces it by never creating
 * the tween at all rather than by creating one and shortening it. The media
 * query is live: a reader who turns the preference on mid-session has the
 * tweens reverted under them, and one who turns it off gets them from the next
 * group onwards.
 *
 * Since nothing is hidden up front, reduced motion needs no second mechanism —
 * with the preference set the page simply is what the server sent.
 *
 * ## What is animated, and when
 *
 * The children are read once, on mount. Anything added later — the catalogue
 * re-rendering after a filter, a page of results replacing another — appears
 * without an entrance. That is deliberate: re-animating a grid on every
 * keystroke is the failure mode this system exists to avoid.
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const scopeRef = useRef<T>(null);

  // Captured once. `useRef` keeps its first argument and ignores later ones,
  // which is exactly the semantics wanted here: the effect runs on mount and
  // never again, so the options that matter are the ones it was mounted with.
  // It also keeps a caller's fresh object literal — which is every caller —
  // from being a reason to re-run anything.
  const optionsRef = useRef(options);

  useIsomorphicLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const items = Array.from(scope.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );

    let media: ReturnType<typeof gsap.matchMedia> | undefined;

    // `gsap.context` collects every tween and ScrollTrigger created inside it,
    // so one `revert()` on unmount undoes all of them. Without it, a
    // ScrollTrigger outlives the element it was watching.
    const context = gsap.context(() => {
      media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        createReveal(items, optionsRef.current);
      });
    }, scope);

    return () => {
      media?.revert();
      context.revert();
    };
  }, []);

  return scopeRef;
}
