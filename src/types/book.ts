export interface BookLink {
  label: string;
  url: string;
}

/**
 * Whether a book can be bought, and how.
 *
 * A closed set rather than the free text `Community.status` and
 * `Course.availability` carry, because this value **drives behaviour**: it
 * decides which action the book page renders. A label that is only printed can
 * be a string and survive a rewording; a label that is also a branch cannot —
 * the day someone writes "Pré-Venda" the button silently stops appearing, and
 * nothing fails until a reader notices.
 *
 * The three states are the ones editorial defined:
 *
 * - `available`  — on sale now.
 * - `preorder`   — announced, orders open, not yet shipping.
 * - `coming-soon` — announced, no way to order yet.
 *
 * There is deliberately no `out-of-print`/`esgotado`. It is a real state of a
 * publisher's catalogue, but nobody has specified it, and inventing a fourth
 * commercial state is an editorial decision rather than a technical one.
 */
export type BookAvailability = "available" | "preorder" | "coming-soon";

/**
 * The catalogue data of an edition — what the "Ficha Técnica" panel lists.
 *
 * **The fields below are the official sheet**, fixed editorially on
 * 27/08/2026: peso, dimensões, encadernação, número de páginas, editora, ISBN,
 * autores e data de publicação. They are the list to request from the editorial
 * team, and the order here is the order the panel prints them.
 *
 * Structured fields rather than one prose line: an ISBN is an identifier, a
 * page count is a number, dimensions are measurements. A CMS holds them apart,
 * a reader may want to filter by them, and a single string makes all of that
 * impossible.
 *
 * Every field may be empty, and most are today. `TechnicalSheet` renders only
 * the rows that carry a value, so a partial sheet degrades to what is known
 * rather than asserting blanks. An ISBN is a real-world identifier and must
 * never be invented.
 *
 * ## Authorship is not here
 *
 * The sheet prints an author row, but it does not store one. The names come
 * from {@link Book.authorIds}, resolved to `Author` records by the data layer
 * and handed to `TechnicalSheet` alongside this object.
 *
 * A `technicalSheet.authors: string[]` existed briefly and was removed the
 * same day: two records of the same fact drift apart, and correcting a name in
 * one of them left the other one wrong on the same screen. One relation, read
 * in two places, cannot disagree with itself.
 *
 * ## What the 27/08 revision changed
 *
 * `format` was split into {@link BookTechnicalSheet.weight},
 * {@link BookTechnicalSheet.dimensions} and
 * {@link BookTechnicalSheet.binding} — it held "Brochura, 14 × 21 cm", one
 * string carrying a binding type and a measurement, which is the prose-line
 * problem in miniature. `publicationYear` became
 * {@link BookTechnicalSheet.publicationDate}.
 */
export interface BookTechnicalSheet {
  /** As printed on the sheet, unit included: "320 g". */
  weight: string;
  /** The edition's measurements: "14 × 21 cm". */
  dimensions: string;
  /**
   * How the edition is bound — "Brochura", "Capa dura", "Edição especial".
   *
   * Free text rather than a union, unlike `Book.availability`. Nothing
   * branches on this: it is printed and never read by code, so a value nobody
   * anticipated costs a row that reads oddly rather than a button that
   * silently stops rendering. A publisher will invent binding descriptions
   * that no enum written today would contain.
   */
  binding: string;
  /**
   * A number, not "248 págs." — the unit is typography, the same call
   * `Episode` makes for `durationMinutes`. Zero reads as "not informed".
   */
  pages: number;
  publisher: string;
  isbn: string;
  /**
   * When the edition was published.
   *
   * A string rather than a `Date`, and deliberately not constrained to
   * `YYYY-MM-DD` like `ScheduledEvent.date`: nothing sorts or compares this —
   * it is printed. A publisher may know only the year for an older title, and
   * a format that cannot express "2021" would force a fabricated month and day
   * to fill the field.
   *
   * The trade-off is real: a CMS returning a true date will need a formatting
   * step, and that belongs in `lib/format.ts` alongside the other date
   * formatters, not here and not in the component.
   */
  publicationDate: string;
}

/**
 * Catalog entry.
 *
 * The briefing fields defined in CLAUDE.md are kept verbatim. `id` and `slug`
 * are additions required by React keys and by the `/catalogo/[slug]` route.
 */
export interface Book {
  id: string;
  /** The public URL segment: `/catalogo/<slug>`. Treat as a contract. */
  slug: string;
  /** The primary cover, shown on every card and as the gallery's main image. */
  cover: string;
  title: string;
  /**
   * The author as typeset on the card.
   *
   * **Legacy field — do not build anything new on it.** It is free text, and
   * on the current data it holds the publisher's name rather than a person's.
   * {@link Book.authorIds} is the relation; this string survives only because
   * `BookCard` prints it and replacing it there is a separate decision.
   */
  author: string;
  /** The synopsis. Shown on the book page; the cards do not use it. */
  description: string;
  /**
   * The label printed above the title on `BookCard` — "Romance",
   * "Psicanálise". Display text, not a key: it is written per book and is not
   * required to match anything in the catalogue taxonomy.
   *
   * Whether this should eventually be derived from the book's first genre
   * instead of authored separately is an open editorial question. Until it is
   * answered the two coexist: this one is what the reader sees,
   * {@link Book.genreSlugs} is what the catalogue filters by.
   */
  category: string;
  /**
   * The genres this book is filed under, as `Genre.slug` values.
   *
   * This is the join between a book and the catalogue taxonomy in
   * `lib/content/genres.ts`, and it is what `/catalogo?genero=<slug>` resolves
   * against. Matching by slug rather than by `category` is deliberate: a
   * display label is rewritten whenever editorial changes its mind about
   * wording, and a filter that depends on wording breaks silently when that
   * happens.
   *
   * An array because a book can legitimately sit in more than one genre — a
   * memoir about a territory belongs to both "Biografias e Memórias" and
   * "História e Cultura". A book with a single genre carries a one-item array
   * rather than a bare string, so the catalogue never has two shapes to
   * handle.
   *
   * **The first entry is the book's main genre**: it is what the breadcrumb
   * shows and what the recommendations are drawn from. Order is therefore
   * editorial, not incidental — reordering this array changes the page.
   *
   * Nothing here validates that a slug exists in the taxonomy. That check
   * belongs to whatever administers the data — a CMS with a relation field
   * cannot produce an orphan slug, while a free-text field always can.
   */
  genreSlugs: string[];
  /**
   * The people who wrote it, as `Author.id` values.
   *
   * The relation the book page needs: it shows a portrait, a name and a
   * biography, and none of that can come out of a string. An array because a
   * book can have more than one author — the Home's whole "Livros escritos por
   * várias mãos" section is about exactly that.
   *
   * May be empty: a book whose authorship is not yet recorded renders no
   * author block rather than an empty one.
   */
  authorIds: string[];
  series: string;
  /**
   * Additional images of the edition — the gallery thumbnails on the book
   * page. **`cover` is not one of them**: it is the main image, and these are
   * what the reader can switch to.
   *
   * May be empty, and then the page shows the cover alone with no thumbnail
   * column.
   */
  gallery: string[];
  technicalSheet: BookTechnicalSheet;
  /**
   * The book's commercial state — **required, with no default**.
   *
   * Every book in the catalogue has one: that is the rule, and a required
   * field is how the rule is enforced rather than merely documented. Adding a
   * title without deciding whether it is on sale does not compile. An optional
   * field with a fallback would let the decision be skipped and then guessed
   * by the renderer, which is exactly the failure this replaces.
   *
   * ## Why it is not inferred from `links`
   *
   * Before this field existed, the page showed a buy button whenever
   * `links[0]` was present. That reads presence of data as an editorial state
   * and conflates two unrelated facts: *"this book is not for sale yet"* and
   * *"nobody has sent us the store URL yet"*. The first is a decision, the
   * second is a gap. They now live in different fields, and a book can be
   * `available` while its URL is still missing — the page renders no button,
   * and the reason is legible in the data instead of guessed from it.
   */
  availability: BookAvailability;
  /**
   * Where a sample of the book can be read. Optional, and absent on every
   * book today — the "Ler Amostra" button is not rendered without it, rather
   * than pointing somewhere that is not a sample.
   *
   * Independent of {@link Book.availability}: a sample chapter is how a
   * `preorder` is sold, and a `coming-soon` title may publish one to build
   * interest. The two buttons are decided separately.
   */
  sampleUrl?: string;
  /**
   * Where the book can be bought. **May be empty**, and is on every real
   * record today: no store URL exists yet.
   *
   * `links[0]` is the primary retailer — the one the button points at. Order
   * is therefore editorial, like `genreSlugs`. The remaining entries are not
   * rendered anywhere yet; a page that offers a choice of retailers is a
   * design that does not exist.
   *
   * `label` is the **retailer's name**, not the button's wording. What the
   * button says is decided by {@link Book.availability} and comes from
   * `lib/content/book.ts`, so the catalogue cannot drift into forty different
   * ways of saying "Comprar". The label is kept because which store a book
   * sells at is genuinely per-book data, and a future multi-retailer block
   * needs it.
   *
   * Empty is a deliberate state rather than a missing one. A store link that
   * goes to the shop's home page instead of the book is worse than no link —
   * the reader clicks, lands nowhere useful, and nothing in the code says it
   * was a placeholder. When the real URLs arrive they are added here, in the
   * data layer, with no component change.
   */
  links: BookLink[];
}
