/**
 * The URL segment for an editorial tag: `/blog/tag/<slug>`.
 *
 * Tags are stored as the words editorial writes ("Bastidores"), not as keys,
 * so the key is derived rather than authored. Folding case and accents is what
 * keeps "Bastidores", "bastidores" and "BASTIDORES" pointing at one page
 * instead of splitting the archive into three that each hold part of it.
 *
 * The same normalisation `filterBooks` already applies to the catalogue
 * search, for the same reason: what a reader types, and what an editor typed,
 * should not have to match exactly to meet.
 *
 * **This is a lossy mapping and that is the point.** Two tags that differ only
 * in case or accent are the same tag. Two that differ in wording — "Evento"
 * and "Eventos" — are not, and no derivation can merge them; that is a
 * vocabulary problem for whatever administers the tags.
 */
export function toTagSlug(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Finds the tag as editorial wrote it, from a slug taken out of the URL.
 *
 * The tag page shows the tag's own name in its heading, and the slug cannot
 * supply it — "historia-e-cultura" is not "História e Cultura". So the slug is
 * resolved back against the tags the posts actually carry, and the first match
 * wins.
 *
 * Returns `undefined` for a slug no post uses, which is what lets the route
 * answer with `notFound()` rather than rendering a page titled after a tag
 * that does not exist.
 */
export function findTagBySlug(
  tags: string[],
  slug: string,
): string | undefined {
  return tags.find((tag) => toTagSlug(tag) === slug);
}
