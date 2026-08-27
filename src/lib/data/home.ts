import { HOME_CONTENT } from "@/lib/content/home";
import { getAuthors } from "@/lib/data/authors";
import { getBooks } from "@/lib/data/books";
import { getFeaturedEvents } from "@/lib/data/events";
import { getGenres } from "@/lib/data/genres";
import { getPosts } from "@/lib/data/posts";
import { getPublishingSteps } from "@/lib/data/publishing-steps";
import type {
  AgendaEvent,
  Author,
  Book,
  Genre,
  HomeContent,
  Post,
  PublishingStep,
} from "@/types";

/** Everything the Home needs, in one answer. */
export interface HomePageData {
  content: HomeContent;
  books: Book[];
  genres: Genre[];
  authors: Author[];
  publishingSteps: PublishingStep[];
  events: AgendaEvent[];
  posts: Post[];
}

/**
 * Composes the Home from its editorial copy and the six entities it lists.
 *
 * A composition module rather than another origin: the domain functions it
 * calls are the ones `/catalogo` and `/blog` will call too, so nothing here
 * duplicates a source. What it adds is one answer for one page, which keeps
 * `page.tsx` from orchestrating six fetches of its own.
 *
 * The six run together rather than in sequence. Today each resolves
 * immediately, so it changes nothing; the day they become network calls it is
 * the difference between one round trip and six.
 *
 * Copy and entities arrive side by side but stay separable on purpose: the
 * copy is the design's real text, several entities are still placeholders, and
 * the two will almost certainly move behind a CMS at different moments.
 *
 * The agenda preview comes from `getFeaturedEvents`, which reads the same
 * records `/eventos` renders. The Home used to read a parallel list of its
 * own; it no longer does, so the two agendas cannot disagree.
 */
export async function getHomePageData(): Promise<HomePageData> {
  const [books, genres, authors, publishingSteps, events, posts] =
    await Promise.all([
      getBooks(),
      getGenres(),
      getAuthors(),
      getPublishingSteps(),
      getFeaturedEvents(),
      getPosts(),
    ]);

  return {
    content: HOME_CONTENT,
    books,
    genres,
    authors,
    publishingSteps,
    events,
    posts,
  };
}
