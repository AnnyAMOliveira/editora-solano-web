/**
 * One block of a post's body.
 *
 * The Figma frame `Single page` (537:3686) draws four kinds inside the article
 * column: running paragraphs, a section heading, a pull quote with its own
 * typographic mark, and a bulleted list. A single `string` cannot express any
 * of that — it would flatten the quote and the heading into more paragraphs,
 * and the page would stop matching the design.
 *
 * ## Why blocks and not Markdown
 *
 * Markdown would need a parser, and a parser is a new dependency — a decision
 * `CLAUDE.md` requires be raised before it is taken. Blocks need nothing: they
 * are data the content layer already knows how to hold, they render with a
 * `switch`, and they are the shape most headless CMSs export natively.
 *
 * The trade-off is real and worth stating: an editor writing in a CMS will
 * almost certainly type rich text, so whatever administers this later will
 * have to map its own output into these blocks. That mapping belongs in
 * `lib/data/posts.ts`, the same seam every other entity uses.
 *
 * A discriminated union rather than an optional-fields object, so a block that
 * carries `items` cannot also claim to carry `text`, and the renderer's
 * `switch` is exhaustive by construction.
 */
export type PostContentBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; items: string[] };

/**
 * A blog post — the entity behind `/blog`, `/blog/[slug]` and
 * `/blog/tag/[slug]`.
 *
 * `publishedAt` is `YYYY-MM-DD` and typed as a string rather than a `Date`: it
 * crosses the server/client boundary without serialisation work, and the
 * format sorts correctly as a string, so `getPosts` orders by it without
 * constructing a `Date` and without a timezone able to shift the result. Same
 * choice `ScheduledEvent.date` and `Episode.publishedAt` already make.
 */
export interface Post {
  id: string;
  /** The public URL segment: `/blog/<slug>`. Treat as a contract. */
  slug: string;
  title: string;
  /**
   * The summary printed on the card and again under the title on the post's
   * own page.
   *
   * **Capped at 200 characters editorially**, to keep the archive cards a
   * uniform height. Note the cap and the card do not quite agree: the frame
   * gives the excerpt three lines of 48 characters, so a full 200 needs four
   * or five. `BlogPostCard` clamps at three lines, which is the visual
   * protection the rule asks for — a resume longer than ~145 characters is
   * stored whole and shown truncated.
   */
  excerpt: string;
  /**
   * The post's main image: the archive card's context and the full-bleed
   * banner of the post page.
   *
   * Named `coverImage` rather than `image` — the old name said nothing about
   * which of a post's images it was, and a post now has several.
   */
  coverImage: string;
  /**
   * Additional images belonging to the post. **`coverImage` is not one of
   * them.**
   *
   * A post is not limited to one picture, so the field is an array with no
   * fixed length. Nothing renders it yet: the frame draws the cover and the
   * article body, and no gallery. Building one without a reference would be
   * inventing an interaction the design never specified — so the data has a
   * home and the screen waits for a frame.
   */
  gallery: string[];
  /**
   * The people who wrote it, as `Author.id` values.
   *
   * **A relation, not free text**, and plural on purpose. `Post.author` was a
   * string until 27/08/2026, which made the blog the one place in the project
   * where authorship was not a relation — books already resolved
   * `Book.authorIds` into `Author` records. Two shapes for one idea is a
   * migration waiting to happen, and it was cheaper to close before the CMS
   * model was written than after.
   *
   * Plural because a post genuinely can have several: an interview with two
   * writers, a collective text, a contributor beside an interviewee. A
   * singular `authorId` would have needed the same migration a second time.
   *
   * Resolved by `getPostPageData` through `getAuthorsByIds`, the same function
   * the book page uses — order follows the ids as the post declares them.
   *
   * May be empty: a post whose authorship is not recorded renders no byline
   * rather than an empty one.
   */
  authorIds: string[];
  /** `YYYY-MM-DD`. The key the archive is ordered by. */
  publishedAt: string;
  content: PostContentBlock[];
  /**
   * Editorial tags — "Editorial", "Bastidores", "Entrevista".
   *
   * ────────────────────────────────────────────────────────────────────────
   * THESE ARE NOT SEO KEYWORDS. Different purpose, different structure.
   *
   * They organise the archive and give the reader a way through it:
   * `/blog/tag/[slug]` lists everything filed under one. SEO metadata is a
   * technical concern that belongs to `generateMetadata`, and nothing in this
   * project mixes the two.
   * ────────────────────────────────────────────────────────────────────────
   *
   * Plain strings, not a `Tag` entity. A relation earns its keep when
   * something resolves it into a record with its own fields — a description, a
   * curated order — and nothing here does: the tag page shows the tag's name
   * and the posts under it, both of which a string provides.
   *
   * The URL segment is derived by `toTagSlug` in `lib/tags.ts`, which folds
   * case and accents, so "Bastidores" and "bastidores" reach the same page
   * rather than splitting the archive in two.
   *
   * An array: a post can sit under several tags, and the card prints the
   * first. Order is therefore editorial.
   */
  contentTags: string[];
}
