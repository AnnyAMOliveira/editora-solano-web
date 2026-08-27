import { BLOG_CONTENT } from "@/lib/content/blog";
import { getAuthorsByIds } from "@/lib/data/authors";
import { MOCK_POSTS } from "@/lib/mocks";
import { findTagBySlug, toTagSlug } from "@/lib/tags";
import type {
  BlogArchiveData,
  BlogContent,
  Post,
  PostPageData,
  TagPageData,
} from "@/types";

/**
 * The seam between the app and wherever blog posts live.
 *
 * Four screens read through here — the Home's preview column, the archive, one
 * post, and one tag — so the day posts come from a CMS there is a single body
 * to change and no page notices. Already async for that reason; the routes
 * still prerender.
 *
 * ## Newest first, and why that lives here
 *
 * `publishedAt` is `YYYY-MM-DD`, which compares correctly as a string, so the
 * sort builds no `Date` and no timezone can shift it. The copy is deliberate:
 * `sort` mutates in place, and the source array must not be reordered as a
 * side effect of rendering.
 *
 * **This ordering is new, and it changes the Home.** Until now nothing sorted:
 * every screen showed the order the content file declared, and that was
 * recorded as a decision waiting to be made rather than something to slip in.
 * An archive that is not chronological is not an archive, so it was made — and
 * the Home's blog column now shows the three most recent posts rather than the
 * first three written. That is almost certainly what it always meant to show.
 */
export async function getPosts(): Promise<Post[]> {
  return [...MOCK_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

/**
 * One post by its public slug, or `undefined` when there is none.
 *
 * `undefined` rather than a throw: whether a missing post is a 404, a redirect
 * or an empty state is the route's decision, not this module's.
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

/**
 * Every post filed under one tag, newest first.
 *
 * Matched by slug rather than by the tag's own text, so `/blog/tag/bastidores`
 * finds a post tagged "Bastidores". `toTagSlug` folds case and accents — see
 * `lib/tags.ts` for why that is the whole point.
 *
 * Inherits the ordering of `getPosts`, so the tag page and the archive agree
 * about what is recent.
 */
export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  const posts = await getPosts();

  return posts.filter((post) =>
    post.contentTags.some((tag) => toTagSlug(tag) === tagSlug),
  );
}

/**
 * Every tag in use, in the order the posts declare them.
 *
 * Derived rather than stored: there is no `Tag` entity, so the vocabulary is
 * whatever the posts happen to carry. Deduplicated by slug rather than by
 * text, so "Bastidores" and "bastidores" collapse into one — the same folding
 * the tag route applies, which is what keeps the list and the routes agreeing.
 *
 * The first spelling encountered wins, which is arbitrary but stable: the
 * archive is ordered, so "first" means "on the most recent post that uses it".
 */
export async function getContentTags(): Promise<string[]> {
  const posts = await getPosts();
  const seen = new Map<string, string>();

  for (const post of posts) {
    for (const tag of post.contentTags) {
      const slug = toTagSlug(tag);
      if (!seen.has(slug)) seen.set(slug, tag);
    }
  }

  return [...seen.values()];
}

/** The blog's institutional copy, through the same seam as its entities. */
export async function getBlogContent(): Promise<BlogContent> {
  return BLOG_CONTENT;
}

/**
 * Quantos posts cabem numa página do arquivo.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * REGRA DEFINITIVA, fixada editorialmente em 27/08/2026:
 *
 * Até 9 publicações, o Blog permanece em uma única página. A partir da 10ª
 * publicação, a paginação é ativada, utilizando 9 publicações por página.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * **Nove porque é o que a grade fecha.** Três colunas × três linhas: nenhuma
 * célula órfã, e a última linha só fica incompleta na última página.
 *
 * Com exatamente 9 o arquivo é uma página cheia e não há para onde navegar, e
 * por isso `PageNav` não renderiza — um controle que oferece "Página 1 de 1"
 * é ruído. A décima publicação é o que cria a segunda página e o faz aparecer.
 *
 * Nove nunca é teto de quantas publicações podem existir — é quantas cabem de
 * uma vez.
 *
 * Vive aqui e não no componente: quantos itens uma página carrega é decisão de
 * dados, e a grade só recebe o que lhe derem.
 */
export const POSTS_PER_PAGE = 9;

/**
 * Everything `/blog` renders, for one page of the archive.
 *
 * `page` é normalizado antes de cortar: um número fora do intervalo — de um
 * `?page=` digitado à mão ou de um link velho — cai na página mais próxima que
 * existe em vez de devolver uma grade vazia que pareceria um arquivo sem
 * publicações. As duas coisas são estados diferentes e não devem se confundir.
 */
export async function getBlogArchiveData(
  page = 1,
): Promise<BlogArchiveData> {
  const [copy, all] = await Promise.all([getBlogContent(), getPosts()]);

  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const current = Math.min(Math.max(1, Math.trunc(page) || 1), totalPages);
  const start = (current - 1) * POSTS_PER_PAGE;

  return {
    copy,
    posts: all.slice(start, start + POSTS_PER_PAGE),
    pagination: { current, totalPages, total },
  };
}

/**
 * Everything `/blog/[slug]` renders, in one answer.
 *
 * Os autores chegam resolvidos, nunca como ids: a página imprime nomes, e
 * resolver a relação é trabalho de junção, que pertence a esta camada. É a
 * mesma chamada que `getBookPageData` faz — um `getAuthorsByIds` só, usado
 * pelas duas entidades que têm autoria.
 *
 * `latest` is the sidebar column. It excludes the post being read — offering
 * the reader the page they are already on is not a recommendation — and is cut
 * to the three the frame draws. Three is a layout fact, so it is an argument
 * with a default rather than a constant this module treats as law.
 *
 * Returns `undefined` when the slug matches no post, so the route can call
 * `notFound()`.
 */
export async function getPostPageData(
  slug: string,
  latestLimit = 3,
): Promise<PostPageData | undefined> {
  const [copy, post, posts] = await Promise.all([
    getBlogContent(),
    getPostBySlug(slug),
    getPosts(),
  ]);

  if (!post) return undefined;

  const authors = await getAuthorsByIds(post.authorIds);

  const latest = posts
    .filter((candidate) => candidate.id !== post.id)
    .slice(0, latestLimit);

  return { copy, post, authors, latest };
}

/**
 * Everything `/blog/tag/[slug]` renders.
 *
 * The heading needs the tag as editorial wrote it, and a slug cannot supply
 * that — "historia-e-cultura" is not "História e Cultura". So the name is
 * resolved back from the tags in use, and a slug nobody uses returns
 * `undefined` rather than a page titled after a tag that does not exist.
 *
 * A tag that exists but currently matches nothing is a different case and
 * returns normally, with an empty list: that is the tag empty state, not a 404.
 * It cannot happen while tags are derived from the posts themselves, and it
 * becomes reachable the moment a CMS lets a tag outlive its last post.
 */
export async function getTagPageData(
  tagSlug: string,
): Promise<TagPageData | undefined> {
  const [copy, tags, posts] = await Promise.all([
    getBlogContent(),
    getContentTags(),
    getPostsByTag(tagSlug),
  ]);

  const tag = findTagBySlug(tags, tagSlug);
  if (!tag) return undefined;

  return { copy, tag, posts };
}
