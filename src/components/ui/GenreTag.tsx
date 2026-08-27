import { cn } from "@/lib/utils";

interface GenreTagProps {
  label: string;
  className?: string;
}

/**
 * Figma `genders` on the book page (`526:3096`) — the genre in a hairline box
 * with a 4px corner, 10px of padding, set in `RegularText/p` grey.
 *
 * A label and not a link: the breadcrumb right above it already leads to the
 * filtered catalogue, and two controls to the same place a few pixels apart is
 * noise. It is `ui/` rather than `books/` because it describes a genre, and
 * the catalogue is the next thing likely to want it.
 */
export function GenreTag({ label, className }: GenreTagProps) {
  return (
    <span
      className={cn(
        "border-muted/20 text-body text-muted inline-flex items-center justify-center rounded border p-2.5",
        className,
      )}
    >
      {label}
    </span>
  );
}
