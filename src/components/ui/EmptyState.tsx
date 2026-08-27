import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /**
   * The approved sentence for this section, from `lib/content`.
   *
   * A prop and never a default: empty-state copy is the publisher speaking,
   * and a component that could supply its own would be writing editorial text.
   * There is deliberately no fallback — a section with no message fails to
   * compile rather than rendering something nobody approved.
   */
  message: string;
  /**
   * Which band this sits on. `dark` is the ink sections — Lançamentos on the
   * Home, and anything else using `Section tone="dark"`.
   *
   * A prop rather than a `className` override because `cn` is a plain joiner
   * with no Tailwind conflict resolution: passing `text-bg/70` alongside
   * `text-muted` would leave the winner to stylesheet order rather than to
   * intent. Selecting the class is unambiguous.
   */
  tone?: "light" | "dark";
  className?: string;
}

const TONE: Record<NonNullable<EmptyStateProps["tone"]>, string> = {
  light: "text-muted",
  // The ink band paints `text-bg`; 70% of it reads as quiet without dropping
  // to the grey that would nearly vanish against ink.
  dark: "text-bg/70",
};

/**
 * The line a section shows in place of a list it has no data for.
 *
 * ## Why the section stays
 *
 * Per `CLAUDE.md`, a section fed by administrable content does not disappear
 * when there is nothing to show: the heading, the spacing and the framing hold
 * their place, and an editorial sentence takes the list's position. A section
 * that vanishes tells the reader nothing; one that shows a hole tells them
 * something is broken. This says what is actually true.
 *
 * Hiding the section instead is the exception and an editorial call — never
 * something the code decides on its own.
 *
 * ## Why it is a component
 *
 * The markup is two classes on a paragraph, which is barely worth a file until
 * you count the places that need it: twelve, across the Home, `/eventos`,
 * `/cursos`, `/comunidades`, `/podcast`, `/catalogo` and `/imprensa`. Twelve
 * hand-written copies drift — one gets `text-body` instead of `text-body-lg`,
 * another forgets the muted tone — and nothing fails when they do. One
 * component is one answer.
 *
 * It renders exactly the paragraph the Catálogo and Imprensa empty states
 * already used, so adopting it there changed no markup.
 */
export function EmptyState({ message, tone = "light", className }: EmptyStateProps) {
  return (
    <p className={cn("text-body-lg", TONE[tone], className)}>{message}</p>
  );
}
