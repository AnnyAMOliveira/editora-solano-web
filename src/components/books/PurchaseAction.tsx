import { Button } from "@/components/ui/Button";
import type { Book, BookPageCopy } from "@/types";

interface PurchaseActionProps {
  availability: Book["availability"];
  /** `links[0]` is the primary retailer; the rest are not rendered yet. */
  links: Book["links"];
  labels: BookPageCopy["availabilityLabels"];
}

/**
 * The one commercial action of `/catalogo/[slug]`.
 *
 * The catalogue's job is to bring a reader here; this is what the reader does
 * next. Its whole content is the rule that decides which of the three states
 * a book is in, and that rule is worth reading on its own rather than as four
 * nested ternaries inside a 200-line page section.
 *
 * ## What renders
 *
 * | availability  | `links[0]` | result                         |
 * | ------------- | ---------- | ------------------------------ |
 * | `available`   | yes        | "Comprar" → the retailer       |
 * | `available`   | no         | nothing                        |
 * | `preorder`    | yes        | "Pré-venda" → the retailer     |
 * | `preorder`    | no         | nothing                        |
 * | `coming-soon` | —          | "Em breve", inert              |
 *
 * ## Nothing, rather than a broken button
 *
 * A status that invites an action and a destination for it are two separate
 * facts, and the second can be missing while the first is settled. When it is,
 * this renders nothing at all: a button that says "Comprar" and leads nowhere
 * costs the reader a click and the publisher the trust of that click.
 *
 * This is a data gap, not a state to design for — the fix is the URL, added in
 * the data layer, and this component starts rendering with no change to it.
 * Filling the gap with "Em breve" instead would be worse than the empty slot:
 * it would put a false claim about a real book on the page, sourced from
 * nothing but an absent field.
 *
 * ## Why "Em breve" is a disabled button
 *
 * It is the one state with nowhere to go, so it cannot be a link. A disabled
 * button is the honest control: `Button` already defines the state, so no new
 * visual decision is made here, and assistive technology announces it as an
 * action that exists and is currently unavailable — which is exactly what the
 * book's status says. It carries no arrow, because the arrow means "goes
 * somewhere".
 *
 * `links` is ignored in this branch by construction: a title with no way to
 * order it has no order page, and reading the field here would let bad data
 * produce a live "Em breve" link.
 */
export function PurchaseAction({
  availability,
  links,
  labels,
}: PurchaseActionProps) {
  const label = labels[availability];

  if (availability === "coming-soon") {
    return (
      <Button variant="link" disabled>
        {label}
      </Button>
    );
  }

  const [primaryLink] = links;
  if (!primaryLink) return null;

  return (
    <Button href={primaryLink.url} variant="link" hasIcon>
      {label}
    </Button>
  );
}

/**
 * Whether {@link PurchaseAction} will render anything.
 *
 * The rule lives here rather than being re-derived by the page, which needs to
 * know whether the button row exists at all before it draws its wrapper — an
 * empty flex row still contributes its own padding to the layout.
 *
 * Two conditions rather than one: `coming-soon` always shows its inert label,
 * and the other two states show a button only once a retailer URL exists.
 */
export function hasPurchaseAction(
  availability: Book["availability"],
  links: Book["links"],
): boolean {
  return availability === "coming-soon" || links.length > 0;
}
