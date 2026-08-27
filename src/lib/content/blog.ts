import type { BlogContent } from "@/types";

/**
 * Institutional copy of the blog — the archive, the post page and the tag
 * page, transcribed from the Figma frames `Blog` (534:3272) and `Single page`
 * (537:3686).
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THE FRAMES DRAW AND THIS FILE DOES NOT CARRY.
 *
 * **Contadores de visualização e de compartilhamento.** O frame da publicação
 * escreve "1.6K views" e "1.2K shares" na linha de metadados. São números de
 * analytics: não existem no modelo `Post`, não têm origem no projeto, e
 * inventá-los seria publicar estatística falsa sobre um texto real. A linha é
 * renderizada sem eles.
 *
 * A URL do X chegou em 27/08/2026 e fechou a última pendência desta lista: os
 * cinco perfis estão abaixo, todos com destino. `SocialLinks` continua tratando
 * `href` como opcional — a rede seguinte a ser fornecida entra do mesmo jeito,
 * preenchendo um campo aqui e sem tocar em componente.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const BLOG_CONTENT: BlogContent = {
  hero: {
    eyebrow: "Blog",
    title: "Escritos da Casa",
  },

  readMoreLabel: "Ler Completo",

  // Transcrito do frame, que escreve "By nome do autor" em inglês dentro de
  // uma página em português. Mantido como está por ser o que o design diz —
  // vale revisão editorial.
  byLabel: "By",

  // Aprovada editorialmente em 27/08/2026.
  emptyMessage: "Novos conteúdos serão publicados em breve.",

  // Aprovada editorialmente em 27/08/2026.
  //
  // Deliberadamente sobre a tag e não sobre o blog: um arquivo vazio e uma tag
  // ainda não usada são fatos diferentes, e o leitor que chegou por uma tag
  // precisa saber qual dos dois encontrou.
  tagEmptyMessage: "Nenhuma publicação com esta tag no momento.",

  tagEyebrow: "Tag",

  latestPostsTitle: "Últimos Posts",

  newsletter: {
    title: "Newsletter",
    description:
      "Receba atualizações de nossos conteúdos e fique por dentro do que está rolando na Editora Solano!",
  },
  socialTitle: "Nos Siga nas Redes!",

  // Aceitos em 27/08/2026, junto com o controle. O frame não desenha navegação,
  // então estes três rótulos não têm contrapartida no design — foram escritos
  // para ele. Ver a nota em `PageNav`.
  pagination: {
    pageLabel: "Página {current} de {total}",
    previousLabel: "Publicações anteriores",
    nextLabel: "Próximas publicações",
  },

  // URLs oficiais fornecidas pela editora em 27/08/2026.
  socialLinks: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/editorasolano/",
    },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@EditoraSolano",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/editora-solano/",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/editorasolano/",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/editorasolano",
    },
  ],
};
