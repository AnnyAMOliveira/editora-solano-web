import { Panel } from "@/components/ui/Panel";
import { cn } from "@/lib/utils";
import type { PressContact } from "@/types";

interface PressContactCardProps {
  contact: PressContact;
  className?: string;
}

/**
 * Figma `Sede` on Imprensa (572 × 155, node 519:2175) — the label, the press
 * address and the reply time on the ink card.
 *
 * The card is `Panel tone="ink"`, the same one the Contato page uses for its
 * office block, so the 10px corner and the padding come from the design system
 * rather than from this file. Figma insets the text asymmetrically here —
 * 43 above, 34 below, 23 aside — which is a nudge, not a scale value, and the
 * two ink cards in the project should not drift apart because of it.
 *
 * What the frame's inset does determine is the card's 155px height, and that
 * matters beyond the card: the right column runs independently of the left, so
 * every block below inherits this height. It is therefore restored as a
 * minimum from `lg` up, with the three lines centred in the extra room. Below
 * `lg` the card wraps its content, since nothing is being aligned there.
 *
 * The address is stored without its scheme and linked with `mailto:` here, so
 * what is typeset and what is dialled can never disagree. `mailto:` is not an
 * external href by `isExternalHref`'s definition — it opens no browsing
 * context — so there is no new-tab handling to apply.
 *
 * Hover is `areia` rather than the `terra` the light rows use: on the ink
 * ground terra is too dark to register as a state, and areia is the palette's
 * answer for marks on that ground — it is what the play control already uses.
 */
export function PressContactCard({ contact, className }: PressContactCardProps) {
  return (
    <Panel
      tone="ink"
      className={cn(
        "flex flex-col items-start gap-2.5 lg:min-h-[155px] lg:justify-center",
        className,
      )}
    >
      <p className="text-slab-menu text-bg">{contact.label}</p>

      <a
        href={`mailto:${contact.email}`}
        className="text-body hover:text-areia underline-offset-4 transition-colors duration-200 hover:underline"
      >
        {contact.email}
      </a>

      <p className="text-body-sm">{contact.note}</p>
    </Panel>
  );
}
