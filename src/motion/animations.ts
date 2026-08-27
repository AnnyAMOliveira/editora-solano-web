import { gsap } from "./gsap";
import { MOTION_PRESETS, type MotionPresetName } from "./presets";

/**
 * The entrance functions. One today — everything on the site is a variation of
 * "a group of elements arrives" — and this is where a second would go.
 *
 * Nothing here knows about React. It takes elements and builds tweens, which
 * is what makes it testable and what keeps the hook next door small.
 */

/**
 * Where the group's first element has to reach before an off-screen group
 * plays.
 *
 * 85% of the viewport height means the reveal starts as the block enters the
 * lower third of the screen, so the movement has finished by the time the
 * reader's eye arrives. A trigger at the very edge produces content that
 * animates behind the fold and is already still when it is seen — the cost of
 * the animation without the effect.
 */
const REVEAL_START = "top 85%";

/** Vars handed to GSAP. Loose by necessity: the shape depends on the preset. */
type RevealVars = Record<string, unknown>;

export interface RevealOptions {
  /** Defaults to `fadeUp`. */
  preset?: MotionPresetName;
  /** Overrides the preset's rhythm. `0` plays the group as one. */
  stagger?: number;
  /** Holds the group back, in seconds. For a second column following a first. */
  delay?: number;
}

/** Is any part of this element inside the viewport right now? */
function isOnScreen(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/**
 * The same preset with its opacity channel removed — see {@link createReveal}.
 */
function withoutOpacity(vars: Readonly<Record<string, unknown>>): RevealVars {
  const rest: RevealVars = { ...vars };
  delete rest.opacity;
  return rest;
}

/**
 * Reveals `items` once.
 *
 * ## Nothing the reader can already see is ever hidden
 *
 * This is the rule the whole file is built around, and it is why there is no
 * CSS that hides anything any more. The server's HTML is the finished page:
 * if this function never runs — script disabled, bundle failed, a crawler
 * reading the markup — every section is visible and complete. An entrance is
 * an enhancement, never the thing that makes content exist.
 *
 * That splits the work in two, by where the group is when the page mounts:
 *
 * - **Off screen** — the reader has not seen it, so hiding it costs nothing.
 *   It gets the preset as written, held by a ScrollTrigger until it comes into
 *   view.
 *
 * - **On screen** — the hero, and anything else above the fold. The preset is
 *   used *without its opacity channel*: the group still makes its short rise,
 *   but it is legible at every frame of it. It plays immediately, with no
 *   trigger, because it is already where a trigger would fire.
 *
 * This is not a fourth preset. It is the same three presets with one channel
 * omitted, which is why `fadeIn` — opacity and nothing else — simply does not
 * animate above the fold. There is nothing left of it once the rule is applied,
 * and a cover that is already on screen has nothing to arrive from.
 *
 * The measurement happens once, at mount. A group that was off screen then
 * keeps its trigger even if the reader scrolls to it before it fires.
 *
 * ## One ScrollTrigger per group, not per element
 *
 * An off-screen group hangs off a single trigger — its first element — so a row
 * of five cards costs one trigger, not five, and the cascade stays in the order
 * they were written rather than being re-shuffled by each card's own position.
 *
 * ScrollTrigger drives every instance on the page from one shared scroll
 * listener, so the count is a bookkeeping cost and not a listener cost. Groups
 * that play on load create no trigger at all.
 *
 * ## `once`
 *
 * An entrance is an entrance. Replaying it on every scroll past is the
 * "animação constante" the brief rules out, and it makes a page impossible to
 * scroll back through. The trigger kills itself after firing.
 *
 * ## `clearProps`
 *
 * When the tween finishes it removes the inline `opacity` and `transform` it
 * wrote, so the element goes back to being styled purely by its classes. This
 * is what keeps the GSAP entrance and the CSS hover on a book card from
 * fighting over the same `transform`.
 */
export function createReveal(
  items: HTMLElement[],
  options: RevealOptions = {},
): void {
  if (items.length === 0) return;

  const preset = MOTION_PRESETS[options.preset ?? "fadeUp"];
  const onScreen = isOnScreen(items[0]);

  const from: RevealVars = onScreen
    ? withoutOpacity(preset.from)
    : { ...preset.from };

  // Nothing survived the rule — an opacity-only preset on a visible group.
  if (Object.keys(from).length === 0) return;

  const to: RevealVars = onScreen
    ? withoutOpacity(preset.to)
    : { ...preset.to };

  gsap.set(items, from);

  gsap.to(items, {
    ...to,
    delay: options.delay ?? 0,
    stagger: options.stagger ?? preset.stagger,
    clearProps: "opacity,transform",
    ...(onScreen
      ? {}
      : {
          scrollTrigger: {
            trigger: items[0],
            start: REVEAL_START,
            once: true,
          },
        }),
  });
}
