import { CONTACT_CONTENT } from "@/lib/content/contact";
import type { ContactContent } from "@/types";

/**
 * The seam between `/contato` and wherever its content lives.
 *
 * Only this module knows the origin: the page awaits it, `ContactSection` and
 * `ContactChannel` receive plain props, and none of them import
 * `lib/content/contact.ts`. Swapping the source for a CMS is a change to this
 * function's body alone.
 *
 * Already async so the migration never has to reach back into `page.tsx`; the
 * route still prerenders.
 *
 * No sorting. The channels have no ordering field — the design fixes them as
 * originais, imprensa and comercial, and the content declares that
 * sequence. The form's payload stays out of this: `ContactForm` owns it as a
 * `ContactMessageDraft`, which is transport, not content.
 */
export async function getContactContent(): Promise<ContactContent> {
  return CONTACT_CONTENT;
}
