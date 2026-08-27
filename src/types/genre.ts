/**
 * One genre of the publisher's catalogue taxonomy — the cards under "Navegue
 * por gênero" on the Home, and the vocabulary `/catalogo` filters by. Not part
 * of the original briefing; proposed from the Figma frame.
 *
 * `number` is the display index shown in the card corner (01–08). It is stored
 * rather than derived because it is editorial ordering, not array position.
 */
export interface Genre {
  id: string;
  /**
   * The navigation key, carried in the public URL (`/catalogo?genero=<slug>`)
   * and used to join a genre to the books filed under it. Genres are matched
   * by this and never by `title`, which is a display string editorial can
   * rewrite. Changing a slug breaks every link already shared or indexed, so
   * these values are a contract.
   */
  slug: string;
  number: string;
  title: string;
  description: string;
}
