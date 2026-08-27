/**
 * One row of the contact channel list (Figma `Timeline Entry` on Contato):
 * a heading, the address itself and a note about it.
 *
 * Every channel the publisher lists today is an e-mail address, and each one
 * carries a `mailto:` href. There is no telephone channel — see the note in
 * `lib/content/contact.ts`.
 */
export interface ContactChannel {
  id: string;
  title: string;
  /** The address as it is typeset. */
  value: string;
  note: string;
  /**
   * What the value links to. Optional, and every current channel has one.
   *
   * It stays optional because a channel can legitimately be an address rather
   * than a destination — a physical counter, an opening-hours line — and
   * `ContactChannel` renders those as plain text instead of a link that leads
   * nowhere. It is **not** a slot for a placeholder to sit in while it waits
   * for a real value: a channel that cannot be reached does not belong on the
   * page at all.
   */
  href?: string;
}

/** The ink card at the top of the right column. */
export interface OfficeInfo {
  label: string;
  address: string;
  details: string;
  legal: string;
}

/**
 * What the "Mande uma mensagem" form will send once a backend exists. Same
 * contract as {@link import("./submission").SubmissionDraft}: transport shape
 * only, kept away from the components that draw the fields.
 */
export interface ContactMessageDraft {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactMessageField = keyof ContactMessageDraft;

export type ContactMessageErrors = Partial<Record<ContactMessageField, string>>;
