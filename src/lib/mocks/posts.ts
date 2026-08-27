import type { Post } from "@/types";

/**
 * TEMPORARY — see src/lib/mocks/README.md
 *
 * ════════════════════════════════════════════════════════════════════════════
 * TEMPORÁRIO — VALIDAÇÃO VISUAL (27/08/2026). REMOVER ANTES DE PUBLICAR.
 *
 * Nenhum post real existe. Tudo abaixo é o placeholder do frame, posto aqui
 * para validar a grade, o card, a página individual e a página de tag.
 *
 * - `title` e `excerpt` são o texto que o Figma escreve nos cards.
 * - `content` é lorem, transcrito e não escrito. Os quatro tipos de bloco
 *   aparecem ao menos uma vez para que o corpo do artigo seja exercitado
 *   inteiro — parágrafo, citação, subtítulo e lista.
 * - **`coverImage` e `gallery` estão vazios.** Não há foto de post no projeto,
 *   e reaproveitar uma capa de livro ou um retrato de autor faria um post
 *   parecer ilustrado quando não é. A página individual desenha o banner só
 *   quando existe imagem.
 * - `contentTags` usa o vocabulário de exemplo do briefing. **Não é a taxonomia
 *   final** — é o suficiente para exercitar a página de tag, incluindo um post
 *   com duas tags e uma tag usada por mais de um post.
 * - `authorIds` aponta para registros placeholder. O mapeamento é arbitrário —
 *   os nove autores são todos "Nome do autor", então nenhum é mais correto que
 *   outro. Existe para exercitar a relação de ponta a ponta, incluindo o caso
 *   de dois autores num post.
 *
 * TRÊS POSTS NÃO É LIMITE. É o que o frame da Home desenha. A grade do arquivo
 * é de 3 colunas e comporta qualquer quantidade — ver o inventário.
 * ════════════════════════════════════════════════════════════════════════════
 */

/** O lorem do frame, repetido nos três posts. Não é texto. */
const PLACEHOLDER_BODY: Post["content"] = [
  {
    kind: "paragraph",
    text: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
  },
  {
    kind: "paragraph",
    text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.",
  },
  {
    kind: "quote",
    text: "Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
  },
  {
    kind: "paragraph",
    text: "Eget aenean tellus venenatis. Donec odio tempus. Felis arcu pretium metus nullam quam aenean sociis quis sem neque vici libero. Venenatis nullam fringilla pretium magnis aliquam nunc vulputate integer augue ultricies cras.",
  },
  { kind: "heading", text: "Eu ridiculus fringilla aenean" },
  {
    kind: "paragraph",
    text: "Sociis consequat adipiscing sit curabitur donec sem luctus cras natoque vulputate dolor eget dapibus. Nec vitae eros ullamcorper laoreet dapibus mus ac ante viverra.",
  },
  {
    kind: "list",
    items: [
      "Crisp fresh iconic elegant timeless clean perfume",
      "Neck straight sharp silhouette and dart detail",
      "Machine wash cold slim fit premium stretch selvedge denim comfortable low waist",
    ],
  },
  {
    kind: "paragraph",
    text: "See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing. Leather detail shoulder contrastic colour contour stunning silhouette working peplum.",
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    slug: "titulo-do-post-1",
    title: "Titulo do Post",
    excerpt:
      "Um texto pequeno, no máximo 100 palavras para resumir o post, pode ser seu subtítulo.",
    coverImage: "",
    gallery: [],
    authorIds: ["author-1"],
    publishedAt: "2026-03-15",
    content: PLACEHOLDER_BODY,
    contentTags: ["Bastidores"],
  },
  {
    id: "post-2",
    slug: "titulo-do-post-2",
    title: "Titulo do Post",
    excerpt:
      "Um texto pequeno, no máximo 100 palavras para resumir o post, pode ser seu subtítulo.",
    coverImage: "",
    gallery: [],
    // Dois autores de propósito: exercita a relação plural — entrevista a duas
    // vozes, texto coletivo, colaborador ao lado de entrevistado.
    authorIds: ["author-2", "author-3"],
    publishedAt: "2026-02-15",
    // Duas tags de propósito: exercita o card, que imprime só a primeira, e a
    // página de tag, que precisa encontrar o post por qualquer uma das duas.
    contentTags: ["Editorial", "Bastidores"],
    content: PLACEHOLDER_BODY,
  },
  {
    id: "post-3",
    slug: "titulo-do-post-3",
    title: "Titulo do Post",
    excerpt:
      "Um texto pequeno, no máximo 100 palavras para resumir o post, pode ser seu subtítulo.",
    coverImage: "",
    gallery: [],
    authorIds: ["author-4"],
    publishedAt: "2026-01-15",
    content: PLACEHOLDER_BODY,
    contentTags: ["Entrevista"],
  },
];
