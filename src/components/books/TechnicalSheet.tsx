import { cn } from "@/lib/utils";
import type { Author, BookPageCopy, BookTechnicalSheet } from "@/types";

interface TechnicalSheetProps {
  sheet: BookTechnicalSheet;
  /**
   * The book's authors, already resolved from `Book.authorIds`.
   *
   * They arrive beside the sheet rather than inside it: authorship is a
   * relation the page has already resolved for the title block and the author
   * band, and storing the names a third time is how the three of them start
   * disagreeing. Empty renders no author row.
   */
  authors: Author[];
  labels: BookPageCopy["technicalSheetLabels"];
  className?: string;
}

/**
 * The body of the "Ficha Técnica" panel: label and value, one row per field.
 *
 * ## Only the rows that are known
 *
 * Every field of `BookTechnicalSheet` may be empty. A row with a blank value
 * would assert that the field exists and is empty; leaving it out says
 * nothing, which is the truth. `pages` is a number, so zero counts as "not
 * informed", and an empty `authors` array does too.
 *
 * The rows follow the order of the official sheet — peso, dimensões,
 * encadernação, número de páginas, editora, ISBN, autores, data de publicação
 * — which is also the order `BookTechnicalSheet` and `technicalSheetLabels`
 * declare their fields. Keeping three lists in one sequence is deliberate: it
 * makes a mismatch visible at a glance.
 *
 * The author row is the one exception: it has no field on the sheet. Its names
 * come from `Book.authorIds`, resolved upstream, so the sheet cannot
 * contradict the author band a few hundred pixels below it.
 *
 * When nothing at all is known the component renders nothing and the panel
 * opens empty. That is a state the design never drew — see the note in
 * `lib/content/book.ts`; giving it a message would mean writing copy nobody
 * approved.
 *
 * ## The layout is provisional
 *
 * The frame draws this panel closed and never opens it, so there is no
 * reference for the rows. They follow the idiom the rest of the project
 * already uses for label/value pairs — hairline-separated rows, label in the
 * slab face, value in the body face — rather than inventing a new one.
 */
export function TechnicalSheet({
  sheet,
  authors,
  labels,
  className,
}: TechnicalSheetProps) {
  const rows = [
    { label: labels.weight, value: sheet.weight },
    { label: labels.dimensions, value: sheet.dimensions },
    { label: labels.binding, value: sheet.binding },
    { label: labels.pages, value: sheet.pages > 0 ? String(sheet.pages) : "" },
    { label: labels.publisher, value: sheet.publisher },
    { label: labels.isbn, value: sheet.isbn },
    // Joined here rather than anywhere upstream: the comma is typography, the
    // same call the title block already makes on the same array.
    { label: labels.authors, value: authors.map((a) => a.name).join(", ") },
    { label: labels.publicationDate, value: sheet.publicationDate },
  ].filter((row) => row.value !== "");

  if (rows.length === 0) return null;

  return (
    <dl className={cn("flex flex-col", className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="border-muted/20 flex flex-col gap-1 border-b py-2.5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <dt className="text-slab-small text-muted">{row.label}</dt>
          <dd className="text-body sm:text-right">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
