import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Book } from "@/types";

interface BookCardProps {
  book: Book;
  className?: string;
}

/**
 * Figma `Book Info Container` (237 wide): cover 237 × 322, then genre, title
 * and author.
 *
 * Genre and title inherit their color from the surrounding band — the Home
 * renders this on the ink section, the catalogue on the page background —
 * while the author keeps the fixed muted grey of the design.
 *
 * Cards are top-aligned and grow downwards, which is how the design handles
 * titles that wrap to two or three lines.
 *
 * ## The whole card is the link
 *
 * It used to carry a "Comprar na Amazon" button and no route of its own. Now
 * that `/catalogo/[slug]` exists, the card leads there and the button is gone:
 * an anchor inside an anchor is invalid, and the reader who clicks a book
 * expects the book, not a shop. Where to buy it is one of the things the book
 * page says.
 *
 * Inside the Home's carousel this is safe — `Carousel` swallows the click when
 * the pointer travelled far enough to count as a drag, so dragging the row
 * never navigates.
 *
 * ## The cover, at rest and on hover
 *
 * `shadow-cover` is the Figma effect style `sombras capas de livros`. It is on
 * the image and not on the card so the shadow follows the cover's edges rather
 * than the text block below it.
 *
 * Hovering lifts the cover 4px, deepens that shadow to `shadow-cover-raised`
 * and scales it by 1%. The scale is there to keep the lift from reading as the
 * cover sliding up the page: a real object moving towards the reader also gets
 * marginally larger. One percent is below the threshold at which anyone would
 * describe it as zooming, which is the intent — no rotation, no perspective,
 * nothing that turns a book into a card trick.
 *
 * ### Why this is CSS and not GSAP
 *
 * The rest of the motion system is GSAP, and this deliberately is not.
 *
 * A GSAP hover needs listeners, and listeners need a client component. This
 * card is the most repeated element on the site — five on the Home, up to
 * twenty in the catalogue, five more on every book and author page — so making
 * it interactive would push it and everything it renders into the client
 * bundle, for an effect the browser composites for free on the GPU. The brief
 * asks for exactly the opposite: client components only where they are needed.
 *
 * The two are kept from drifting by `--ease-editorial`, which is the CSS twin
 * of the `power2.out` in `motion/presets.ts`.
 *
 * ### Reduced motion
 *
 * `motion-safe:` guards the two transforms, so a reader with the preference
 * set gets the deeper shadow and no movement at all — the affordance without
 * the travel. The global rule in `globals.css` flattens the transition for
 * them on top of that.
 */
export function BookCard({ book, className }: BookCardProps) {
  return (
    <Link
      href={`/catalogo/${book.slug}`}
      className={cn("group flex w-full flex-col gap-[11px]", className)}
    >
      <div className="shadow-cover ease-editorial group-hover:shadow-cover-raised motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.01] relative aspect-[237/322] w-full overflow-hidden transition-[transform,box-shadow] duration-hover">
        <Image
          src={book.cover}
          alt={`Capa de ${book.title}`}
          fill
          sizes="(min-width: 1280px) 237px, (min-width: 768px) 30vw, 60vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <p className="text-slab-small">{book.category}</p>
        <h3 className="text-body-lg">{book.title}</h3>
        <p className="text-body text-muted">{book.author}</p>
      </div>
    </Link>
  );
}
