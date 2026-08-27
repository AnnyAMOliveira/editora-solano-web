"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

import { ArrowRightIcon } from "@/components/ui/ArrowRightIcon";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode;
  /** Required: the control group is announced with this label. */
  ariaLabel: string;
  /** Applied to each slide wrapper — set the slide width here. */
  slideClassName?: string;
  /** Gap between slides, as a Tailwind class on the track. */
  trackClassName?: string;
  className?: string;
  /**
   * Horizontal placement of the arrow group, which always sits below the track
   * so it never covers a cover or any other content.
   */
  arrowsAlign?: "start" | "center" | "end";
  arrowsClassName?: string;
}

const ARROWS_ALIGN: Record<NonNullable<CarouselProps["arrowsAlign"]>, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

/** Distance in px a pointer must travel before it counts as a drag, not a click. */
const DRAG_THRESHOLD = 5;

/**
 * Fraction of one slide that has to be out of view before the arrows appear.
 *
 * The releases row is 1317px inside a 1320px column, so a scrollbar alone can
 * push it a handful of pixels past its container. That is not something a
 * reader can navigate to, and the arrows should stay hidden for it. Expressing
 * the threshold as a share of a slide keeps the rule about visible content
 * rather than about an arbitrary pixel count.
 */
const OVERFLOW_TOLERANCE_RATIO = 0.1;

/**
 * Horizontal carousel: native scroll + snap (so touch swipe and trackpad work
 * for free), pointer drag for mouse, and arrow controls.
 *
 * The arrows hide themselves when the content fits, which lets the same
 * component serve rows that only overflow below desktop.
 *
 * ## Every slide stays clickable
 *
 * The pointer is captured on the first movement past {@link DRAG_THRESHOLD},
 * never on `pointerdown`. That ordering is load-bearing rather than tidy — see
 * the note in `handlePointerMove`. A card inside a track is a link, and a link
 * that does not navigate is worse than a track that does not drag.
 *
 * No autoplay, per the design direction.
 */
export function Carousel({
  children,
  ariaLabel,
  slideClassName,
  trackClassName,
  className,
  arrowsAlign = "end",
  arrowsClassName,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragState = useRef({
    startX: 0,
    startScroll: 0,
    moved: 0,
    active: false,
    /** Whether the pointer has been captured — see `handlePointerMove`. */
    captured: false,
  });

  const syncBounds = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const first = track.firstElementChild as HTMLElement | null;
    const slideWidth = first
      ? first.getBoundingClientRect().width
      : track.clientWidth;

    // Arrows appear only when enough of a slide is hidden to be worth reaching.
    setHasOverflow(maxScroll > Math.max(1, slideWidth * OVERFLOW_TOLERANCE_RATIO));
    setCanScrollPrev(track.scrollLeft > 1);
    setCanScrollNext(track.scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    syncBounds();

    const observer = new ResizeObserver(syncBounds);
    observer.observe(track);
    for (const child of Array.from(track.children)) observer.observe(child);

    return () => observer.disconnect();
  }, [syncBounds, children]);

  const scrollByStep = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const first = track.firstElementChild as HTMLElement | null;
    // Step by one slide plus the gap; fall back to a viewport-width jump.
    const step = first
      ? first.getBoundingClientRect().width +
        Number.parseFloat(getComputedStyle(track).columnGap || "0")
      : track.clientWidth;

    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Let touch use native scrolling; only take over for mouse and pen.
    if (event.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
      active: true,
      captured: false,
    };
    // Snap off from the first pixel: a state update lands a frame later, and a
    // drag that begins while snapping is still on gets pulled to a slide edge.
    // Only the pointer capture waits — see `handlePointerMove`.
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;

    const delta = event.clientX - dragState.current.startX;
    dragState.current.moved = Math.abs(delta);

    /**
     * The pointer is captured here, on the first movement past the threshold —
     * never on `pointerdown`.
     *
     * Capturing early looks harmless and silently breaks every card in the
     * track. While a capture is active the browser retargets the rest of the
     * interaction to the capturing element, so `pointerup` and then `click`
     * fire on this `<div>` instead of on the anchor the reader pressed. The
     * anchor never sees a click, and a cover that is unmistakably a link does
     * nothing — which is exactly what happened on the Home's releases row and
     * on the co-authorship portraits.
     *
     * Deferring it costs nothing: capture exists so that a drag survives the
     * pointer leaving the track, and by this line the drag is real.
     */
    if (!dragState.current.captured && dragState.current.moved > DRAG_THRESHOLD) {
      dragState.current.captured = true;
      track.setPointerCapture(event.pointerId);
    }

    track.scrollLeft = dragState.current.startScroll - delta;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;

    dragState.current.active = false;
    setIsDragging(false);
    if (
      dragState.current.captured &&
      track.hasPointerCapture(event.pointerId)
    ) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  // Swallow the click that follows a real drag so slides don't navigate.
  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (dragState.current.moved > DRAG_THRESHOLD) {
      event.preventDefault();
      event.stopPropagation();
      dragState.current.moved = 0;
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        ref={trackRef}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onScroll={syncBounds}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        className={cn(
          "flex overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          isDragging ? "cursor-grabbing snap-none" : "snap-x snap-proximity",
          trackClassName,
        )}
      >
        {Children.map(children, (child, index) => (
          <div
            key={index}
            className={cn("shrink-0 snap-start", slideClassName)}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Hidden below `sm`: on a phone the swipe is the primary interaction and
          the space is better spent on the content itself. */}
      {hasOverflow ? (
        <div
          className={cn(
            "hidden items-center gap-3 sm:flex",
            ARROWS_ALIGN[arrowsAlign],
            arrowsClassName,
          )}
        >
          <CarouselArrow
            direction="prev"
            label={`${ariaLabel}: anterior`}
            disabled={!canScrollPrev}
            onClick={() => scrollByStep(-1)}
          />
          <CarouselArrow
            direction="next"
            label={`${ariaLabel}: próximo`}
            disabled={!canScrollNext}
            onClick={() => scrollByStep(1)}
          />
        </div>
      ) : null}
    </div>
  );
}

interface CarouselArrowProps {
  direction: "prev" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
}

function CarouselArrow({ direction, label, disabled, onClick }: CarouselArrowProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex size-9 items-center justify-center border border-current transition-colors duration-200",
        disabled ? "opacity-25" : "hover:bg-current/5",
      )}
    >
      <ArrowRightIcon className={direction === "prev" ? "rotate-180" : undefined} />
    </button>
  );
}
