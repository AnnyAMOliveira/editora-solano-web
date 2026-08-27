/**
 * Tells an outbound destination from an in-app route.
 *
 * The Cursos page is a directory: each item points wherever its data says, and
 * that may be another site or a third-party platform. Rather than carrying an
 * `isExternal` flag that a CMS could fill in wrongly, the destination is read
 * from the URL itself — absolute (`https://…`) and protocol-relative (`//…`)
 * hrefs leave the app, everything else is a `next/link` route.
 *
 * `mailto:`, `tel:` and other schemes are deliberately not treated as external
 * here: they do not open a browsing context, so the new-tab handling this
 * feeds would be wrong for them.
 */
export function isExternalHref(href: string) {
  return /^(https?:)?\/\//i.test(href.trim());
}
