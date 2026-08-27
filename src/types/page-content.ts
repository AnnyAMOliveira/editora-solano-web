import type { Author } from "./author";
import type { Book, BookAvailability } from "./book";
import type { Community } from "./community";
import type { ContactChannel, OfficeInfo } from "./contact";
import type { Course, CourseMaterial } from "./course";
import type { Episode } from "./episode";
import type { Genre } from "./genre";
import type { PastEvent, ScheduledEvent } from "./event";
import type { MediaKitAsset, MediaMention, PressContact } from "./press";
import type { Post } from "./post";
import type { TimelineEntry } from "./timeline-entry";

/**
 * The opening editorial block shared by Sobre, Publique and Contato: eyebrow,
 * display headline and one or more lead paragraphs.
 */
export interface PageHero {
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

/** Institutional copy of `/publique`. */
export interface PublishContent {
  hero: PageHero;
  /** "O que aceitamos", "Prazo de resposta"… — numberless timeline entries. */
  conditions: TimelineEntry[];
  formTitle: string;
}

/**
 * The heading that opens a band inside a page: eyebrow, title and one lead
 * line. Smaller than `PageHero` — the title is the 36px Playfair, not the 64px
 * display, and there is a single paragraph.
 */
export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

/** Institutional copy of `/cursos`, plus the two lists the page renders. */
export interface CoursesContent {
  hero: PageHero;
  courses: Course[];
  /** Shown in the grids place when no course is on offer. Approved copy. */
  coursesEmptyMessage: string;
  /**
   * Label of every course CTA. It is page copy rather than per-course data —
   * the design gives all three the same words. A CMS that ever needs to vary
   * it can add an optional `ctaLabel` to `Course` without touching this.
   */
  courseCtaLabel: string;
  materialsIntro: SectionIntro;
  materials: CourseMaterial[];
}

/**
 * The ink band that opens `/podcast`.
 *
 * **This is the programme's presentation, and also the fallback.** When a
 * published episode exists the hero shows that episode — title, synopsis,
 * artwork and destination all come from it. When none does, these fields are
 * what renders, unchanged. So the same block serves two jobs, and both are
 * real states rather than one being a degraded version of the other.
 *
 * `eyebrow` therefore does double duty: it is the section label on its own,
 * and it is where the programme's name survives when the title slot is given
 * over to an episode. A visitor must be able to tell what show they are
 * looking at either way.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * `cover` MUST BE THE PROGRAMME'S ART, NOT AN EPISODE'S.
 *
 * The file in use today is not: it reads "EP #001" and its own alt text
 * describes "o título do episódio". It was treated as institutional art
 * because nothing linked it to the list, which is exactly the inconsistency
 * the featured-episode rule removes — an episode's artwork standing in for the
 * programme goes stale the moment a new episode is published, and nothing in
 * the code can notice.
 *
 * Episode artwork now belongs on `Episode.cover`. This field needs a real
 * programme image; until it has one, the fallback state shows art for an
 * episode that is no longer the latest.
 * ────────────────────────────────────────────────────────────────────────────
 */
export interface PodcastHero {
  eyebrow: string;
  title: string;
  description: string;
  cover: { src: string; alt: string };
  cta: { label: string; href: string };
}

/** Institutional copy of `/podcast`, plus the episode directory. */
export interface PodcastContent {
  hero: PodcastHero;
  episodesTitle: string;
  /** Shown beside the list title. Page copy, not derived from the episodes. */
  episodesYear: string;
  episodes: Episode[];
  /** Shown in the lists place when nothing is published. Approved copy. */
  episodesEmptyMessage: string;
}

/**
 * Institutional copy of `/eventos`, plus the two lists the page renders.
 *
 * Upcoming and past arrive as separate arrays rather than one list with a
 * status flag. The page is prerendered, so anything derived from "now" would
 * be frozen at build time and drift out of date; and the design already treats
 * them as two sections, which is also how a CMS would query them.
 */
export interface EventsContent {
  hero: PageHero;
  upcoming: ScheduledEvent[];
  /**
   * Shown in the list's place when nothing is scheduled. Approved copy.
   *
   * Only the upcoming list has one. "Já Aconteceu" with nothing in it has no
   * approved sentence yet — an empty archive says something different from an
   * empty diary, and nobody has written that sentence.
   */
  upcomingEmptyMessage: string;
  /** Label of every upcoming event's CTA — page copy, identical on all rows. */
  eventCtaLabel: string;
  pastTitle: string;
  past: PastEvent[];
  /**
   * Shown in the archive lists place when nothing has been recorded yet.
   * Approved copy.
   *
   * Deliberately not the same sentence as `upcomingEmptyMessage`: an empty
   * archive and an empty diary are different facts. "Nenhum evento agendado"
   * describes a calendar between seasons; an archive with nothing in it would
   * read as a publisher that has never done anything, which is why the
   * approved wording promises records rather than denying events.
   */
  pastEmptyMessage: string;
}

/**
 * Content of `/comunidades`.
 *
 * Unlike the other pages, nothing imports this shape from `lib/content`
 * directly: `lib/data/communities.ts` is the only module that knows where it
 * comes from, and `communities` arrives from there already sorted by `order`.
 */
export interface CommunitiesContent {
  hero: PageHero;
  communities: Community[];
  /** Shown in the grids place when no group is open. Approved copy. */
  emptyMessage: string;
  /** Label of every community CTA — page copy, identical on all four cards. */
  communityCtaLabel: string;
}

/**
 * A page-level call to action: what it says and where it goes.
 *
 * Label and destination travel together because they are one editorial
 * decision — renaming a button without its target is how dead links happen.
 */
export interface CtaLink {
  label: string;
  href: string;
}

/**
 * A headline with one run set in the editorial italic — "Aqui a palavra vira
 * *semente*".
 *
 * Kept as three plain strings rather than as JSX so the content layer stays
 * free of React and can come from a CMS. The component decides what the
 * emphasis looks like; the content only says which words carry it.
 */
export interface EmphasisedTitle {
  before: string;
  emphasis: string;
  after?: string;
}

/**
 * Editorial copy of the Home — every fixed string its seven sections show.
 *
 * It lives here rather than inside `layouts/home/` because a section that
 * hardcodes its own title cannot be edited by anyone but a developer, which is
 * the rule `CLAUDE.md` sets out. The entities the Home lists (books, authors,
 * posts…) are separate: those come from their own domain modules.
 *
 * What is deliberately NOT here: `SITE_INFO`, still in `lib/navigation.ts` and
 * out of scope for now, and the genre cards' `href`, which is an architectural
 * decision documented at its own call site rather than copy.
 */
export interface HomeContent {
  hero: {
    /** Composed with `SITE_INFO.name`; only the place is editorial. */
    eyebrowLocation: string;
    title: EmphasisedTitle;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    method: {
      label: string;
      description: string;
      cta: CtaLink;
    };
  };
  releases: { title: string; cta: CtaLink; emptyMessage: string };
  genres: { title: string; description: string };
  coAuthorship: {
    eyebrow: string;
    title: EmphasisedTitle;
    description: string;
    emptyMessage: string;
  };
  publishing: {
    eyebrow: string;
    title: EmphasisedTitle;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
  /**
   * `year` is page copy, not `new Date().getFullYear()`. The Home is
   * prerendered, so anything derived from the build clock freezes at build
   * time and goes quietly stale on 1 January. Same decision as
   * `PodcastContent.episodesYear`.
   */
  agenda: { title: string; year: string; emptyMessage: string };
  blog: { title: string; cta: CtaLink; emptyMessage: string };
  community: {
    eyebrow: string;
    title: string;
    description: string;
    newsletter: { label: string; description: string };
  };
}

/**
 * Institutional copy of `/blog`, `/blog/[slug]` and `/blog/tag/[slug]`.
 *
 * One block for the whole domain rather than three: the archive and the tag
 * page are the same screen with a different heading and a different list, and
 * splitting their copy would mean keeping two files in step for no gain.
 */
export interface BlogContent {
  /** Olho e título do arquivo — "Blog" / "Escritos da Casa". */
  hero: { eyebrow: string; title: string };
  /** Rótulo da ação do card. */
  readMoreLabel: string;
  /** Prefixo da assinatura na publicação — "By" no frame. */
  byLabel: string;
  /** Shown in the grids place when nothing is published. Approved copy. */
  emptyMessage: string;
  /**
   * Shown on a tag page that matches no post.
   *
   * Separate from {@link BlogContent.emptyMessage}: an archive with nothing in
   * it and a tag nobody has used yet are different facts, and the second is
   * about the filter rather than about the blog.
   */
  tagEmptyMessage: string;
  /** Olho da página de tag, acima do nome da tag. */
  tagEyebrow: string;
  /** Título da coluna lateral do post. */
  latestPostsTitle: string;
  /** O bloco de newsletter da coluna lateral, transcrito do frame. */
  newsletter: { title: string; description: string };
  /** Título do bloco de redes sociais da coluna lateral. */
  socialTitle: string;
  /**
   * Copy da navegação entre páginas do arquivo.
   *
   * `pageLabel` traz `{current}` e `{total}`, substituídos na camada de
   * apresentação. Um template em vez de uma frase montada no componente: o dia
   * em que a editoria quiser "2 / 4" em vez de "Página 2 de 4" é uma edição
   * aqui.
   */
  pagination: {
    pageLabel: string;
    previousLabel: string;
    nextLabel: string;
  };
  /**
   * Perfis da editora nas redes, na ordem em que o bloco os mostra.
   *
   * `href` é opcional, e essa é a parte que importa: uma rede sem URL aparece
   * como ícone inerte em vez de link para lugar nenhum. É o mesmo tratamento
   * de `ContactChannel.href` e de `Book.links` — o espaço fica preparado, e
   * preencher o campo o liga sem tocar em componente.
   *
   * `icon` é um identificador, não um componente: a camada de conteúdo não
   * importa React, e o mapeamento para o glifo do Phosphor vive em
   * `SocialLinks`. Um id que o componente não conhece é erro de tipo.
   */
  socialLinks: SocialLink[];
}

/**
 * Um perfil da editora numa rede social.
 *
 * `id` é a chave do glifo, não texto exibido — o rótulo é o que leitores de
 * tela ouvem, e o ícone é o que a página desenha.
 */
export interface SocialLink {
  id: "instagram" | "youtube" | "linkedin" | "facebook" | "x";
  label: string;
  /** Ausente enquanto a URL oficial não existir. Sem ele, o ícone não vira link. */
  href?: string;
}

/**
 * Where the reader is in a paginated list.
 *
 * `totalPages` is what decides whether the control renders at all: one page is
 * nothing to navigate, so a control offering it would be noise.
 */
export interface Pagination {
  current: number;
  totalPages: number;
  /** Quantos itens a lista inteira tem, antes do corte. */
  total: number;
}

/** Everything `/blog` renders. */
export interface BlogArchiveData {
  copy: BlogContent;
  /** Newest first, já cortado para a página pedida. May be empty. */
  posts: Post[];
  pagination: Pagination;
}

/** Everything `/blog/[slug]` renders. */
export interface PostPageData {
  copy: BlogContent;
  post: Post;
  /** Resolvidos de `Post.authorIds`. Vazio quando a autoria não está registrada. */
  authors: Author[];
  /** The sidebar column: recent posts, this one excluded. May be empty. */
  latest: Post[];
}

/** Everything `/blog/tag/[slug]` renders. */
export interface TagPageData {
  copy: BlogContent;
  /** The tag as editorial wrote it, resolved from the slug. */
  tag: string;
  /** Posts filed under it, newest first. May be empty. */
  posts: Post[];
}

/** Institutional copy of `/contato`. */
export interface ContactContent {
  hero: PageHero;
  office: OfficeInfo;
  channels: ContactChannel[];
  formTitle: string;
}

/**
 * Content of `/imprensa`.
 *
 * The page is a hybrid, and this shape is where the two halves meet:
 * everything except `mentions` and `mediaKit` is institutional copy that lives
 * in `lib/content/press.ts`; those two arrays are administrable entities that a
 * CMS will one day supply. `lib/data/press.ts` is the only module that knows
 * which is which today.
 *
 * The two lists carry their own empty-state message rather than sharing one:
 * they say different things, and per `CLAUDE.md` that text is the publisher
 * speaking, not an interface string.
 *
 * `mentionsYear` and `mediaKitYear` are page copy, not derived from the
 * entries — the same decision `PodcastContent.episodesYear` already records.
 * Deriving them would freeze whatever the newest entry was at build time.
 */
export interface PressContent {
  hero: PageHero;
  contact: PressContact;
  mentionsTitle: string;
  mentionsYear: string;
  /** Shown in place of the list when no mention is published. */
  mentionsEmptyMessage: string;
  mentions: MediaMention[];
  mediaKitTitle: string;
  mediaKitYear: string;
  /** Shown in place of the list when the kit has no file. */
  mediaKitEmptyMessage: string;
  mediaKit: MediaKitAsset[];
}

/**
 * Institutional copy of `/catalogo` — everything on the page that is the
 * publisher speaking rather than a book.
 *
 * `hero.paragraphs` is empty: the frame gives the catalogue an eyebrow and a
 * headline and no lead line. It stays an array so `PageHeroBlock` is reused
 * unchanged.
 */
export interface CatalogCopy {
  hero: PageHero;
  /** Placeholder of the title search field. */
  searchPlaceholder: string;
  /** Resting label of the genre dropdown — "Navegar por Gênero". */
  genreFilterLabel: string;
  /** The option that clears the filter. */
  allGenresLabel: string;
  /**
   * Shown in place of the grid when a title search returns nothing.
   *
   * Separate from {@link CatalogCopy.genreEmptyMessage} because the two states
   * are not the same event. A reader who typed something and found nothing did
   * an action that failed; a reader who arrived from the Home by clicking a
   * genre searched for nothing at all, and telling them their "busca" came up
   * empty describes something they never did.
   */
  searchEmptyMessage: string;
  /** Shown when a genre is in effect and no book is filed under it. */
  genreEmptyMessage: string;
  /**
   * Shown when the catalogue itself holds no books — before any filter is
   * considered.
   *
   * The third state, and the one that was missing. It used to fall through to
   * {@link CatalogCopy.searchEmptyMessage}, which told a reader their search
   * found nothing when they had not searched: a filter cannot explain an
   * absence that exists without it.
   *
   * Unreachable today, since the catalogue always holds five titles. It stops
   * being unreachable the moment the books come from a CMS.
   */
  catalogEmptyMessage: string;
}

/**
 * Content of `/catalogo`: the copy above plus the two entities the page reads.
 *
 * The genres travel with the books because the page needs both — the taxonomy
 * to build the filter, the books to list — and `lib/data/catalog.ts` is the
 * single place that knows either origin.
 */
export interface CatalogContent extends CatalogCopy {
  books: Book[];
  genres: Genre[];
}

/**
 * Institutional copy of `/catalogo/[slug]` — every fixed string the book page
 * shows. Nothing here belongs to a particular book.
 */
export interface BookPageCopy {
  /** First crumb of the breadcrumb, linking back to the catalogue. */
  catalogLabel: string;
  /** Heading of the first accordion. */
  synopsisTitle: string;
  /** Heading of the second accordion. */
  technicalSheetTitle: string;
  /**
   * Row labels of the technical sheet, in the order the panel lists them —
   * the same order `BookTechnicalSheet` declares its fields.
   *
   * One key per field, so adding a field to the sheet is a type error here
   * until someone writes its label.
   */
  technicalSheetLabels: {
    weight: string;
    dimensions: string;
    binding: string;
    pages: string;
    publisher: string;
    isbn: string;
    /**
     * Labels the author row. There is no matching field on
     * `BookTechnicalSheet` — the names come from `Book.authorIds`, resolved.
     */
    authors: string;
    publicationDate: string;
  };
  /** Label of the "read a sample" button. */
  sampleLabel: string;
  /**
   * What the commercial button says, one label per `BookAvailability`.
   *
   * Institutional copy, not entity data: the wording of a commercial action is
   * a brand decision, and it is the same on every book. Keying it by status
   * rather than storing it per record is the standardisation itself — forty
   * titles cannot produce forty phrasings of the same offer.
   *
   * A `Record` over the union, so adding a fourth commercial state is a type
   * error here until someone writes its label. The three below were specified
   * editorially.
   */
  availabilityLabels: Record<BookAvailability, string>;
  /** Heading of the recommendations band. */
  recommendationsTitle: string;
}

/**
 * Everything one book page renders: the copy above, the book, the people who
 * wrote it, the genre the breadcrumb shows and the books to recommend.
 *
 * The page receives entities already resolved — it never looks an author or a
 * genre up by id. That work belongs to `lib/data/books.ts`, which is also
 * where it moves the day a CMS answers those joins itself.
 */
export interface BookPageData {
  copy: BookPageCopy;
  book: Book;
  /** Resolved from `Book.authorIds`. Empty when authorship is not recorded. */
  authors: Author[];
  /**
   * The book's main genre — the first of `genreSlugs`, resolved against the
   * taxonomy. `undefined` if the book carries no genre or the slug is
   * unknown, and then the breadcrumb shows one crumb fewer.
   */
  mainGenre?: Genre;
  /** Books sharing the main genre, this one excluded. May be empty. */
  recommendations: Book[];
}

/** Institutional copy of `/autores/[slug]` — the page's only fixed strings. */
export interface AuthorPageCopy {
  /** Label of the back control. */
  backLabel: string;
  /** Heading of the band listing what the author wrote. */
  booksTitle: string;
}

/**
 * Everything one author page renders.
 *
 * The page receives entities already resolved — it never queries by id. That
 * work belongs to `lib/data/authors.ts`, which is also where it moves the day
 * a CMS answers the join itself.
 */
export interface AuthorPageData {
  copy: AuthorPageCopy;
  author: Author;
  /** What this author wrote. May be empty — then the band is not rendered. */
  books: Book[];
}
