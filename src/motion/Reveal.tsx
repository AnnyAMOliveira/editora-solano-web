"use client";

import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { MotionPresetName } from "./presets";
import { useReveal } from "./use-reveal";

interface RevealProps {
  children: ReactNode;
  /** Defaults to `fadeUp`. */
  preset?: MotionPresetName;
  /** Overrides the preset's rhythm. `0` plays the group as one block. */
  stagger?: number;
  /** Holds the group back, in seconds. For a column that should follow another. */
  delay?: number;
  /**
   * Renders the group *as* this element instead of wrapping the children in
   * one. Pass the element the markup already had — `ul`, `ol` — along with its
   * classes. See "Two shapes" below.
   */
  as?: ElementType;
  className?: string;
}

/**
 * The single component the rest of the site uses to animate anything.
 *
 * It reveals its **direct children**, one after another, and does nothing else.
 * There is no per-element wrapper, no `data-` attribute to sprinkle through the
 * markup, and no timeline written at the call site — a section asks for an
 * entrance in one line and the motion layer owns what that means.
 *
 * ```tsx
 * <Reveal preset="staggerCards">
 *   {genres.map((genre) => <GenreCard key={genre.id} genre={genre} />)}
 * </Reveal>
 * ```
 *
 * ## Nothing is hidden waiting for this to run
 *
 * The page the server sends is complete and visible. This adds an entrance on
 * top of it and never gates content behind one — with scripting off, with the
 * bundle failed, or for a crawler, every section reads exactly as written.
 * {@link createReveal} documents how that is kept true above the fold.
 *
 * ## Server Components stay server components
 *
 * This is the only client boundary the motion system adds. Children arrive as
 * a prop, already rendered on the server, so wrapping a grid of `BookCard`s
 * does not pull `BookCard` — or the data it was given — into the client bundle.
 * Pages and layouts remain Server Components throughout.
 *
 * ## Two shapes, because layout must not move
 *
 * The requirement is that adding an entrance changes nothing about how the
 * page is laid out. A wrapper `<div>` around the cards of a grid would become
 * the grid's only cell, so:
 *
 * - **Default** — renders a `<div class="contents">`. `display: contents`
 *   removes the box while keeping the DOM node, so the children go on being
 *   flex items, grid cells or block siblings of whatever contains them, and
 *   this component still has an element to hold the ref. Nesting two of these
 *   is safe: neither generates a box, so the children still reach the grid.
 *
 * - **`as`** — renders that element *instead of* the one the markup had, with
 *   the same classes. This is for `<ul>` and `<ol>`, where a `<div>` between
 *   the list and its items is invalid HTML and costs the list its semantics,
 *   and for any container styled with `[&>*]:` — a transparent wrapper would
 *   leave that selector matching the wrapper instead of the cards.
 *
 * ## `data-reveal`
 *
 * A marker, carrying the preset name so devtools shows what a group is doing.
 * Nothing reads it — no CSS, no JavaScript. It exists to make the system
 * visible to whoever inspects the page.
 */
export function Reveal({
  children,
  preset = "fadeUp",
  stagger,
  delay,
  as,
  className,
}: RevealProps) {
  const scope = useReveal<HTMLElement>({ preset, stagger, delay });

  const Tag: ElementType = as ?? "div";
  const isTransparentWrapper = as === undefined;

  return (
    <Tag
      ref={scope}
      data-reveal={preset}
      className={isTransparentWrapper ? cn("contents", className) : className}
    >
      {children}
    </Tag>
  );
}
