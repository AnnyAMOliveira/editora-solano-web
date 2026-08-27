/**
 * Motion tokens and the presets built from them.
 *
 * This file is data: no GSAP import, no DOM, no React. It is the motion half
 * of the design system, and it exists for the same reason the colour tokens
 * do — so that "how far things travel" and "how long they take" are decided
 * once instead of being retyped at every call site.
 *
 * ## There is no motion spec in Figma
 *
 * The file carries no timing, easing or travel values, so these are not
 * transcribed from it — they are the smallest set that produces the brief's
 * "editorial, elegante, contemplativo". Anything that would read as an
 * application effect is deliberately out of scope: no scale, no rotation, no
 * blur, no parallax, no looping. The whole vocabulary is opacity and a short
 * vertical travel.
 *
 * ## The art direction, in one sentence
 *
 * **Nothing should look like it arrived; it should look like it was already
 * there and is being uncovered.** Every number below follows from that. The
 * travel is short enough that the eye reads a settle rather than a slide, the
 * durations are long enough that no element snaps into place, and the stagger
 * is always a small fraction of the duration so a group overlaps into one wave
 * instead of firing as a sequence of separate events.
 *
 * That ratio is the thing to protect when tuning. A stagger above roughly a
 * fifth of the duration stops reading as a wave and starts reading as an
 * interface assembling itself.
 */

/**
 * Vertical travel of an entrance, in pixels.
 *
 * Deliberately small. The earlier 24 was already restrained, and still read as
 * movement one notices — at this duration the eye follows the travel instead of
 * the content. Under 16 the rise stops being legible as motion at all, so this
 * is the floor rather than a preference.
 *
 * Cards travel 2px further than text: a card is a larger object, and the same
 * distance across a bigger surface reads as less.
 *
 * `hero` is the shortest of the three, and the only one where that is the
 * point rather than a compromise. A page's opening block is the largest type
 * on the site; at 16px the headline visibly slides, and a headline that slides
 * is a headline being placed. At 12px over a full second it settles instead —
 * the reader registers that something resolved without being able to say what
 * moved.
 */
export const MOTION_DISTANCE = {
  hero: 12,
  text: 16,
  cards: 18,
} as const;

/**
 * Durations, in seconds.
 *
 * Long by interface standards and deliberately so — this is the main lever
 * between "landing page" and "editorial". A 0.6s entrance is brisk and
 * competent; it is also what every commercial template does.
 *
 * `cards` is the quickest of the three because a grid plays many of them at
 * once: the group is on screen far longer than any single card, so each card
 * can afford to settle sooner.
 *
 * `slow` stays the slowest, for the largest surfaces — a cover, a full-width
 * band — where the same speed over a bigger area reads as abrupt. `heroReveal`
 * shares it rather than declaring a second token with the same number: a hero
 * and a cover want one second for the same reason, and if that reason is ever
 * retuned they should move together.
 */
export const MOTION_DURATION = {
  base: 0.9,
  cards: 0.75,
  slow: 1,
} as const;

/**
 * The one easing curve of the system.
 *
 * `power3.out` leaves at speed and spends most of its time arriving. Against
 * `power2.out` the difference is the last third: the element decelerates for
 * longer and comes to rest instead of stopping, which is the whole distinction
 * between something being placed and something settling.
 *
 * ## Where the other half of the system lives
 *
 * `globals.css` holds the tokens CSS drives — `--ease-editorial` (this curve,
 * as a cubic-bezier) and `--duration-hover`, both used by the book-cover
 * hover. The entrance timings stay here because GSAP plays them, and a token
 * no stylesheet reads goes stale unnoticed. Keep the two files in step: a
 * hover and an entrance on the same card should not read as two products.
 */
export const MOTION_EASE = "power3.out";

/**
 * Delay between one element of a group and the next, in seconds.
 *
 * Every one of these is a small fraction of its preset's duration, which is
 * what makes a group overlap into a single movement.
 *
 * `cards` is the loosest — a grid is the one place where a visible cascade is
 * wanted, because it is what turns nine separate arrivals into one sweep
 * across the page. `text` is tighter: lines of copy that separate from each
 * other read as an interface assembling itself. `soft` is tighter still, for
 * inventories that should arrive as one object.
 *
 * `heroReveal` takes none of them. Its stagger is zero, declared at the preset
 * rather than here — a token for "no rhythm" would be a token for nothing.
 */
export const MOTION_STAGGER = {
  text: 0.08,
  cards: 0.12,
  soft: 0.05,
} as const;

/**
 * How long the secondary half of a hero waits for the primary.
 *
 * A hero is one composition, not a queue of elements. It arrives in two
 * beats — the block that names the page, then the block that explains it —
 * and this is the pause between them. Long enough that the eye lands on the
 * headline and stays there for a moment; short enough that the second beat
 * begins while the first is still moving, so the two never read as separate
 * events.
 *
 * A third of `heroReveal`'s duration. The ratio is what matters: raise the
 * duration and this should follow, or the pause turns into a gap.
 */
export const MOTION_HERO_DELAY = 0.35;

/**
 * How long a second column waits for the first.
 *
 * Not the hero pause, and deliberately a different number. This is the book
 * page's information column following its cover, and the post's sidebar
 * following its article — blocks that sit beside something rather than under
 * it, animated with `fadeUp` rather than `heroReveal`. They keep the shorter
 * beat because their preset is shorter.
 */
export const MOTION_COLUMN_DELAY = 0.2;

/**
 * The shape every preset takes: the state an element is set to before it is
 * revealed, the state it animates to, and the group's default rhythm.
 *
 * Typed structurally rather than as `gsap.TweenVars` so this file stays free
 * of the animation library — a preset is a description, not a tween.
 */
export interface MotionPreset {
  readonly from: { readonly opacity: number; readonly y?: number };
  readonly to: {
    readonly opacity: number;
    readonly y?: number;
    readonly duration: number;
    readonly ease: string;
  };
  /** Default stagger for the group; a call site may override it. */
  readonly stagger: number;
}

/**
 * The four presets.
 *
 * - **heroReveal** — the opening block of a page, and nothing else. The
 *   shortest travel over the longest duration, with no stagger at all.
 * - **fadeUp** — sections, titles, editorial blocks. Opacity and 16px of rise
 *   over nearly a second.
 * - **fadeIn** — images, carousels and inventories. Opacity only, and slower:
 *   a cover that also travels draws attention to the movement instead of to
 *   itself.
 * - **staggerCards** — grids and lists. Slightly more travel than text,
 *   slightly quicker per card, and a looser rhythm so the group reads as one
 *   sweep.
 */
export const MOTION_PRESETS = {
  /**
   * A hero is one composition being uncovered, not a set of elements being
   * assembled — so this is the one preset whose stagger is zero rather than
   * small. Everything inside a beat moves at once. An eyebrow that arrives
   * before its own headline is the single most reliable way to make a page
   * look like an interface booting up, and no value of stagger above zero
   * avoids it entirely.
   *
   * The two beats of a hero are therefore two `<Reveal>` groups, separated by
   * {@link MOTION_HERO_DELAY} — never one group with a rhythm.
   *
   * Above the fold, which is where every hero is, the system's own rule
   * strips the opacity channel (see `createReveal`): the block rises its 12px
   * and is legible for all of it. The `opacity` declared here is what a hero
   * would get if one ever sat below the fold.
   */
  heroReveal: {
    from: { opacity: 0, y: MOTION_DISTANCE.hero },
    to: {
      opacity: 1,
      y: 0,
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASE,
    },
    stagger: 0,
  },

  fadeUp: {
    from: { opacity: 0, y: MOTION_DISTANCE.text },
    to: {
      opacity: 1,
      y: 0,
      duration: MOTION_DURATION.base,
      ease: MOTION_EASE,
    },
    stagger: MOTION_STAGGER.text,
  },

  fadeIn: {
    from: { opacity: 0 },
    to: {
      opacity: 1,
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASE,
    },
    stagger: MOTION_STAGGER.soft,
  },

  staggerCards: {
    from: { opacity: 0, y: MOTION_DISTANCE.cards },
    to: {
      opacity: 1,
      y: 0,
      duration: MOTION_DURATION.cards,
      ease: MOTION_EASE,
    },
    stagger: MOTION_STAGGER.cards,
  },
} as const satisfies Record<string, MotionPreset>;

export type MotionPresetName = keyof typeof MOTION_PRESETS;
