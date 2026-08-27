"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface BookGalleryProps {
  /** The primary cover — what is shown first and what the card also uses. */
  cover: string;
  /** Additional images. Empty means no thumbnail column at all. */
  gallery: string[];
  /** The book's title, used to describe every image. */
  title: string;
  className?: string;
}

/**
 * Figma `Cover` (528 × 525, node `526:3094`): a column of 102 × 139
 * thumbnails, 40px of air, then the 386 × 525 main image.
 *
 * ## What the thumbnails are
 *
 * `cover` is the main image and is never a thumbnail — the column lists
 * `gallery` and nothing else, which is what the frame draws: three thumbnails
 * beside a fourth, larger image. Picking one swaps what the main slot shows;
 * the cover is what it shows before anything is picked.
 *
 * There is deliberately no way back to the cover, and no arrows, no carousel
 * and no extra controls. The frame draws none of them and the interaction is
 * meant to be exactly this: pick a picture, see it large.
 *
 * Because the cover is not in the list, **no thumbnail is marked while the
 * cover is showing** — which is correct: nothing in the column is what the
 * main slot is displaying. That is what the `null` state below means.
 *
 * With an empty gallery the column is not rendered and the cover takes the
 * space.
 *
 * ## Marking the one in effect
 *
 * The unselected thumbnails dim; the one being shown stays at full strength.
 *
 * The frame draws no selected state, so this is a choice and it should be
 * confirmed. What ruled out the obvious alternative — a border, the idiom
 * `NavLink` uses for the active menu item — is the content: these are book
 * covers, and most of them are dark. A 1px ink border on a near-black cover
 * is invisible, and any palette colour that reads on a dark cover disappears
 * on a pale one. Opacity is the one marker that works over arbitrary artwork.
 *
 * Nothing is dimmed while the cover is showing. Dimming says "not the one you
 * are looking at", which only means something once the reader is looking at
 * one of them; dimming all three from the start would just make the column
 * look disabled.
 *
 * ## The shadow
 *
 * Only the main image carries `shadow-cover`. The frame applies the effect
 * style there and to the cards, and leaves the thumbnails flat; at 102px a
 * 10px shadow would read as a smudge rather than as depth.
 *
 * Below `lg` the column moves under the main image and runs horizontally,
 * which is the only arrangement that does not squeeze a 386px cover into a
 * phone beside a second column.
 */
export function BookGallery({
  cover,
  gallery,
  title,
  className,
}: BookGalleryProps) {
  /**
   * Which thumbnail is showing, by position — `null` while the cover is.
   *
   * Position and not the URL: a gallery may legitimately carry the same image
   * twice, and comparing by URL would then mark every copy of it as selected
   * at once. What the reader picked is a thumbnail, not a file.
   */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = activeIndex === null ? cover : gallery[activeIndex];

  return (
    <div
      className={cn(
        "flex flex-col-reverse items-start gap-6 lg:flex-row lg:items-center lg:gap-10",
        className,
      )}
    >
      {gallery.length > 0 ? (
        <ul className="flex shrink-0 gap-4 overflow-x-auto lg:w-[102px] lg:flex-col lg:gap-9 lg:overflow-visible">
          {gallery.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={`${image}-${index}`}
                // The dimming rides on the wrapper and carries NO transition
                // utility. Both were found the hard way: an `opacity` class on
                // the button itself never took effect, and adding
                // `transition-opacity` to either element pinned the computed
                // value at 1. The design animates none of this anyway — the
                // hover motion is coming as GSAP.
                className={cn(
                  "shrink-0",
                  activeIndex !== null && !isActive && "opacity-50",
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  // Only on the one in effect: `aria-current="false"` on every
                  // other thumbnail is noise a screen reader reads out.
                  aria-current={isActive ? true : undefined}
                  className="relative block aspect-[102/139] w-[76px] overflow-hidden lg:w-full"
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="102px"
                    className="object-cover"
                  />
                  <span className="sr-only">
                    {`Ver a imagem ${index + 1} de ${title}`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="shadow-cover relative aspect-[386/525] w-full max-w-[386px] overflow-hidden">
        <Image
          src={activeImage}
          alt={`Capa de ${title}`}
          fill
          sizes="(min-width: 1024px) 386px, 90vw"
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
