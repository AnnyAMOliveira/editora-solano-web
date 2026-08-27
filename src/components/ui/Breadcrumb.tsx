import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  /** Omitted on the last crumb — the page you are already on. */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Figma `Breadcrumb` on the book page (`526:3084`) — crumbs in `RegularText/p`
 * separated by a small caret.
 *
 * An ordered list inside a labelled `nav`, which is the shape assistive
 * technology expects: the trail is a sequence, and its last item is where the
 * reader is. That last crumb carries no `href` and is marked
 * `aria-current="page"` instead of being a link to itself.
 *
 * The separators are `aria-hidden`: they are punctuation between items the
 * list structure already separates.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Você está aqui" className={className}>
      <ol className="text-body text-muted flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-ink underline-offset-4 transition-colors duration-200 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}

              {isLast ? null : (
                <CaretRight aria-hidden="true" className="size-3 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
