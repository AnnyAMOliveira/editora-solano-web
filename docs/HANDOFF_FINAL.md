# Handoff final — Editora Solano

Documento oficial de transição técnica do website da Editora Solano. Descreve o
que foi entregue, como está organizado, o que depende de terceiros e o que
falta para publicação.

| | |
|---|---|
| Versão | 1.0 — 27/08/2026 |
| Status | Frontend implementado, validado e preparado para integração CMS/backend |
| Destinatários | Frontend, backend, CMS, equipe editorial, manutenção futura |
| Documento profundo | [HANDOFF_DEV.md](HANDOFF_DEV.md) — arquitetura de dados, modelos e integração em detalhe |
| Referência visual | [DESIGN_SYSTEM.html](DESIGN_SYSTEM.html) |
| Inventário de conteúdo | [AUDITORIA_CONTEUDO.md](AUDITORIA_CONTEUDO.md) |

Este documento é o ponto de entrada da entrega. Onde uma seção precisar de mais
profundidade, ela aponta para o `HANDOFF_DEV.md` em vez de repeti-lo.

---

## 1. Contexto do projeto

A **Editora Solano** é uma editora de Londrina/PR que publica literatura,
biografia, memória, ensaio e obras socioambientais. Trabalha com autores
estabelecidos e com pessoas que carregam uma história e ainda não sabem que têm
um livro — o que faz do processo editorial, e não apenas do catálogo, parte da
proposta da casa.

O website existe para sustentar cinco papéis ao mesmo tempo:

| Papel | O que a interface precisa entregar |
|---|---|
| **Vitrine institucional** | Quem é a editora, como ela trabalha e o que a distingue. Método Solano, posicionamento, canais de contato |
| **Catálogo editorial** | Obras navegáveis por gênero e busca, com página própria por título e informação comercial correta |
| **Apresentação de autores** | Página por autor, com retrato, biografia e a bibliografia publicada pela casa |
| **Arquivo de conteúdos** | Blog datado com tags editoriais, podcast e registro de eventos — material que cresce e permanece consultável |
| **Relacionamento com leitores** | Comunidades, cursos, materiais gratuitos, carta mensal e o canal de envio de originais |

A consequência arquitetural desses papéis é que **três deles crescem sem parar**
— catálogo, autores e arquivo. O frontend foi construído assumindo que esse
crescimento acontece fora do código.

---

## 2. Estado atual

> **Frontend implementado, validado e preparado para integração CMS/backend.**

O que isso significa, com precisão:

- As 15 rotas existem, compilam e renderizam.
- `pnpm build`, `pnpm lint` e `pnpm typecheck` passam.
- A fronteira de dados está fechada e verificada por varredura.
- O Design System e o Motion System estão implementados e documentados.

O que isso **não** significa:

- **Não é uma versão publicada.** O conteúdo de `src/lib/mocks/` é temporário e
  não pode chegar ao ar — livros com ISBN deliberadamente impossível, nove
  autores chamados "Nome do autor", três posts de lorem.
- **Os formulários não enviam.** Validam no cliente e param no ponto de
  integração.
- **34 destinos apontam para `/contato`** por não existir URL real ainda.

Antes de qualquer build destinado a publicação é obrigatório verificar
explicitamente que nada em `src/lib/mocks/` está sendo renderizado. Ver a
[auditoria de conteúdo](AUDITORIA_CONTEUDO.md).

---

## 3. Escopo entregue

15 rotas, das quais 14 são páginas de produto e uma é o template da publicação
individual.

| Rota | Página | Geração |
|---|---|---|
| `/` | Home | Estática |
| `/sobre` | Sobre — hero e Método Solano | Estática |
| `/publique` | Publique — envio de originais | Estática |
| `/contato` | Contato | Estática |
| `/cursos` | Cursos e materiais | Estática |
| `/podcast` | Podcast — destaque e episódios | Estática |
| `/eventos` | Agenda e "Já Aconteceu" | Estática |
| `/comunidades` | Comunidades | Estática |
| `/imprensa` | Imprensa — Na Mídia e Mídia Kit | Estática |
| `/catalogo` | Catálogo com busca e filtro | Dinâmica — lê `?genero=` |
| `/catalogo/[slug]` | Livro individual | SSG — uma por título |
| `/autores/[slug]` | Autor individual | SSG — uma por autor |
| `/blog` | Arquivo do blog | Dinâmica — lê `?page=` |
| `/blog/[slug]` | Publicação individual | SSG — uma por post |
| `/blog/tag/[slug]` | Arquivo filtrado por tag | SSG — uma por tag em uso |

O build gera **34 páginas**: 10 estáticas, 20 SSG (9 autores, 5 livros, 3 posts,
3 tags) e 2 dinâmicas, mais as internas do framework. As duas rotas dinâmicas o
são por leitura de query string, e ambas estão justificadas — genre e página
precisam sobreviver a recarregamento, compartilhamento e botão voltar.

---

## 4. Arquitetura de dados

**Nenhum componente conhece a origem dos dados.**

```text
CMS/API
 ↓
lib/data
 ↓
pages
 ↓
layouts
 ↓
components
```

- **`lib/data` é a fronteira de integração.** As 34 funções dessa camada, em 16
  arquivos, são as únicas que sabem de onde o dado vem. Trocar arquivo local por
  CMS é reescrever o corpo delas.
- **Componentes recebem dados por props**, tipadas, sem `any`. Nenhum componente
  importa `lib/content` ou `lib/mocks`.
- **Páginas apenas compõem.** Pedem um objeto à camada de dados e distribuem aos
  layouts. Não contêm texto editorial nem lógica de busca inline.

A fronteira foi verificada por varredura, não por leitura: **os 16 arquivos de
`lib/data` são os únicos que importam `lib/content` ou `lib/mocks`** — zero
violações em todo o `src`. Repetir essa varredura é a forma mais barata de
confirmar que a arquitetura continua íntegra:

```bash
grep -rn "^import .*from \"@/lib/(content|mocks)" src \
  --include=*.ts --include=*.tsx | grep -v "^src/lib/"
```

O teste que a regra precisa passar: um administrador deve poder criar, editar,
remover, alterar status, trocar links e reorganizar entidades **sem que uma
linha de componente mude**. Se alguma dessas ações exigir editar apresentação, a
separação falhou.

---

## 5. Camadas do projeto

### `lib/content` — conteúdo institucional aprovado

Texto da editora, de baixa rotatividade, ligado a decisões de marca.

- textos institucionais e heróis de página;
- rótulos de interface e de ficha técnica;
- **mensagens de estado vazio** — são fala da editora, não string de sistema;
- informações de marca, endereço, CNPJ e canais.

**Não pertence ao CMS.** Alterá-lo é decisão de marca, não operação editorial, e
criar administração para um rótulo que muda uma vez por ano é custo sem retorno.
Permanece versionado no código.

### `lib/data` — camada de acesso

Responsável por:

- buscar dados;
- transformar e normalizar (incluindo mapeamento de idioma, se o CMS devolver
  chaves em português);
- resolver relações — `getAuthorsByIds`, `getBooksByAuthor`, `getRecommendedBooks`;
- ordenar — posts por `publishedAt` DESC, episódio em destaque pelo mais recente;
- montar o objeto que cada página consome — `getHomePageData`, `getBookPageData`,
  `getPostPageData`, `getAuthorPageData`, `getTagPageData`.

**É a camada principal de substituição quando o CMS entrar.**

### `lib/mocks` — dados temporários

Registros de desenvolvimento para validar layout, componentes e
responsividade com volume realista.

- 9 autores, 5 livros, 3 posts;
- ISBN no padrão `000-0-0000-0000-N`, deliberadamente impossível;
- biografias e sinopses em lorem transcrito do Figma.

**Não publicar.** Dado fictício com aparência de conteúdo real é erro editorial,
não apenas técnico.

---

## 6. Modelo de entidades

Contratos completos, conferidos contra `src/types/` em 27/08/2026. Campos
opcionais estão marcados com `?`.

### Book

| Campo | Tipo | Nota |
|---|---|---|
| `id` | `string` | |
| `slug` | `string` | Contrato de URL: `/catalogo/<slug>` |
| `title` | `string` | |
| `cover` | `string` | Capa principal, usada em todo cartão e como imagem da galeria |
| `gallery` | `string[]` | Imagens adicionais |
| `description` | `string` | Sinopse. Só a página individual usa |
| `category` | `string` | Rótulo impresso no cartão |
| `genreSlugs` | `string[]` | O primeiro é o gênero principal — breadcrumb e recomendados |
| `authorIds` | `string[]` | Relação com `Author` |
| `author` | `string` | **Legado.** Texto livre, diz "Solano"/"Editora Solano". Só o `BookCard` imprime; nada novo deve depender dele |
| `series` | `string` | Coleção. Nenhuma tela exibe hoje |
| `availability` | `"available" \| "preorder" \| "coming-soon"` | União fechada e obrigatória, sem default |
| `technicalSheet` | `BookTechnicalSheet` | 7 campos: `weight`, `dimensions`, `binding`, `pages`, `publisher`, `isbn`, `publicationDate` |
| `links` | `{ label, url }[]` | Destinos de compra |
| `sampleUrl?` | `string` | Amostra hospedada |

> A autoria **não** vive na ficha técnica. `technicalSheet.authors` existiu e foi
> removido: a ficha recebe os autores já resolvidos de `authorIds`, para que as
> três posições da página que imprimem nomes leiam uma relação só.

### Author

| Campo | Tipo | Nota |
|---|---|---|
| `id` · `slug` | `string` | `slug` é contrato de URL — trocar depois quebra todo link compartilhado |
| `name` | `string` | |
| `portrait` | `string` | Retrato; falta o crédito do fotógrafo (ver §13) |
| `shortDescription` | `string` | Linha curta sob o nome |
| `genre` | `string` | Rótulo sob o nome no carrossel |
| `bio` | `string` | Biografia |

### Post

| Campo | Tipo | Nota |
|---|---|---|
| `id` · `slug` | `string` | |
| `title` · `excerpt` | `string` | O resumo é cortado em 3 linhas no cartão |
| `coverImage` | `string` | Vazio hoje. Sem capa, a página abre no bloco de título |
| `gallery` | `string[]` | **Nada renderiza ainda** — o frame não desenha galeria |
| `authorIds` | `string[]` | Relação com `Author` |
| `publishedAt` | `string` `YYYY-MM-DD` | Chave da ordenação; ordena como string, sem `Date` nem fuso |
| `content` | `PostContentBlock[]` | Blocos tipados: parágrafo, subtítulo, citação, lista |
| `contentTags` | `string[]` | Tags editoriais, string livre com slug derivado |

### Episode

| Campo | Tipo | Nota |
|---|---|---|
| `id` · `number` | `string` | `number` aparece no olho do herói |
| `title` · `description` | `string` | |
| `durationMinutes` | `number` | Só na lista |
| `href` | `string` | Destino do CTA quando o episódio está em destaque |
| `publishedAt?` | `string` | **A chave da escolha.** Opcional hoje; deve virar obrigatório quando as datas reais chegarem |
| `cover?` | `{ src, alt }` | Arte do episódio. Ausente cai na imagem do programa |

> **Regra:** o destaque do Podcast é sempre o último episódio publicado, nunca
> uma escolha manual. `getFeaturedEpisode()` devolve o de `publishedAt` mais
> recente e descarta os sem data — data ausente é desconhecida, não antiga.
> Publicar um episódio é a operação inteira. Não existe `featuredEpisodeId`, e
> acrescentar um seria reintroduzir a decisão que foi descartada.

### Event

Três tipos derivados de uma base:

| Tipo | Campos |
|---|---|
| `AgendaEvent` | `id`, `title`, `description`, `date` |
| `ScheduledEvent` | estende a base com `category`, `time?`, `location`, `href` |
| `PastEvent` | alias de `AgendaEvent` — um evento passado não tem inscrição |

### Course

`id`, `category`, `title`, `description`, `availability`, `href`.
`CourseMaterial` é alias de `TimelineEntry` — os materiais não são links: o
design não desenha afordância neles e a copy diz que chegam por e-mail.

### Community

`id`, `title`, `description`, `schedule`, `status`, `href`, `order`.
`order` é o que a camada de dados usa para ordenar.

### Press

| Tipo | Campos |
|---|---|
| `MediaMention` | `id`, `outlet`, `kind`, `title`, `publishedAt`, `href` |
| `MediaKitAsset` | `id`, `title`, `description`, `href`, `order` |
| `PressContact` | `label`, `email`, `note` |

### Genre

`id`, `slug`, `number`, `title`, `description`. Taxonomia aprovada, **não
administrável** — vive em `lib/content`.

> `number` é armazenado (`01`…`08`). Remover um gênero abre buraco na sequência
> até alguém renumerar à mão.

---

## 7. Relacionamentos

### Livro → Autor

```text
Book.authorIds  →  Author.id
```

Resolvido por `getAuthorsByIds()`. Alimenta o nome sob o título, o bloco de
autor e a ficha técnica — três posições lendo uma relação só.

### Livro → Gênero

```text
Book.genreSlugs  →  Genre.slug
```

O primeiro slug é o gênero principal: define o breadcrumb e a base dos
recomendados.

### Autor → Livros

```text
getBooksByAuthor(authorId)
```

Leitura inversa de `authorIds`, em `lib/data/books.ts`. Sem título ligado, a
banda de bibliografia não renderiza.

### Post → Autor

```text
Post.authorIds  →  Author.id
```

### Post → Tags

```text
Post.contentTags  →  /blog/tag/[slug]
```

O slug é derivado por `toTagSlug()`, que dobra caixa e acento: "Bastidores",
"bastidores" e "BASTIDORES" chegam à mesma página. O nome é resolvido de volta
contra as tags em uso, porque o título precisa da grafia da editoria.

> **Tags editoriais não são SEO.** Nenhuma meta tag de palavra-chave foi criada.
> `contentTags` é vocabulário de navegação; a metadata da página vem de `title`
> e `excerpt`. Os dois não devem ser unificados.

**Limite conhecido:** a derivação junta variantes ortográficas, não variantes de
redação. "Evento" e "Eventos" são duas tags com duas páginas. A forma de evitar
é o CMS oferecer **seleção com criação**, não campo de texto solto.

---

## 8. Rotas

### Catálogo

```text
/catalogo            grade, busca e filtro por gênero
/catalogo/[slug]     livro individual
```

O gênero vive na URL (`?genero=`) porque precisa sobreviver a recarregamento,
compartilhamento e botão voltar. A busca **não** vai para a URL: muda a cada
tecla e inundaria o histórico.

### Autor

```text
/autores/[slug]      autor individual
```

Não há rota de listagem de autores. A navegação até um autor acontece pelo
carrossel da Home ou pela página de um livro.

### Blog

```text
/blog                arquivo, pagina de 9 em 9
/blog/[slug]         publicação individual
/blog/tag/[slug]     arquivo filtrado por tag
```

`/blog` e `/blog/tag/[slug]` são a mesma tela: mesma grade, mesmos cartões,
mesmo espaçamento e mesmo estado vazio. Só o título e a lista mudam, e ambos
chegam por prop.

Um slug de tag que nenhum post usa devolve **404**, não estado vazio: é endereço
errado, não página sem conteúdo.

---

## 9. Design System

Referência: **[`DESIGN_SYSTEM.html`](DESIGN_SYSTEM.html)** — documento HTML
standalone, abre direto no navegador.

Contém, em 18 seções:

- **tokens** — os valores nomeados de `@theme`, com aplicação de cada um;
- **cores** — as 8 oficiais, com swatch, token, hex e uso;
- **tipografia** — 3 famílias e 10 níveis nomeados, com espécime em tamanho real;
- **componentes** — catálogo visual com preview funcional e regras de uso;
- **estados** — normal, hover, foco, desabilitado e vazio;
- **motion** — filosofia, os 4 presets e as regras.

A regra que o documento estabelece: **não criar token, componente, cor ou
animação sem atualizá-lo.**

---

## 10. Motion System

**Local:** `src/motion/`

Camada de apresentação. **Não toca em dados, tipos, rotas nem lógica** — se for
removida inteira, o site continua funcionando e renderizando o mesmo conteúdo.

| | |
|---|---|
| Biblioteca | `gsap` + `ScrollTrigger` |
| Superfície pública | um componente: `<Reveal>` |
| Client Components adicionados | 1 |
| Custo | ~44 KB gzip |

`src/motion/` é o **único lugar do projeto que importa `gsap`** — verificável
por varredura. Nenhum componente ou layout conhece a biblioteca.

**Regras invioláveis:**

- **Animação não altera estrutura.** `<Reveal>` renderiza `display: contents`, ou
  substitui o elemento que já existia quando recebe `as`. Layout não se move.
- **Conteúdo funciona sem animação.** Não existe CSS que esconda nada, nem
  estado inicial invisível, nem `<noscript>` de resgate. Script desligado,
  bundle falhado ou crawler: todas as seções aparecem completas.
- **Respeita `prefers-reduced-motion`.** `gsap.matchMedia` não cria o tween —
  não cria e encurta. A query é viva.

Detalhamento dos presets, tokens e razões: [HANDOFF_DEV.md, seção 19](HANDOFF_DEV.md).

---

## 11. Conteúdo e CMS

### Conteúdo institucional — permanece no código

| O quê | Onde |
|---|---|
| Textos institucionais e heróis de página | `lib/content/*.ts` |
| Rótulos de interface e de ficha técnica | `lib/content/book.ts`, `catalog.ts` |
| **Mensagens de estado vazio** | `lib/content/`, junto do texto aprovado |
| Marca, endereço, CNPJ, menu e rodapé | `lib/navigation.ts` |
| Taxonomia de gêneros | `lib/content/genres.ts` |
| Etapas do processo editorial | `lib/content/publishing-steps.ts` |

### Conteúdo administrável — vai para o CMS

| Entidade | Origem atual |
|---|---|
| Livros | `mocks/books.ts` |
| Autores | `mocks/authors.ts` |
| Posts | `mocks/posts.ts` |
| Eventos | `content/events.ts` |
| Episódios | `content/podcast.ts` |
| Cursos e materiais | `content/courses.ts` |
| Comunidades | `content/communities.ts` |
| Imprensa — aparições e mídia kit | `content/press.ts` |

Cinco dessas entidades ainda vivem em `content/` porque foram implementadas
antes da separação ficar clara. **São administráveis** e devem migrar para o CMS
junto com as demais — a camada de dados já as trata como tal, então a migração
não muda componente nenhum.

---

## 12. Estratégia de publicação

```text
Rascunho  →  Revisão  →  Publicado
```

**Somente conteúdos publicados devem aparecer no frontend.**

> **Este fluxo é um requisito para o CMS, não algo implementado.** O frontend
> não tem campo de status editorial em nenhuma entidade. O que existe hoje:

| Mecanismo | Entidade | O que faz |
|---|---|---|
| `publishedAt` ausente | `Episode` | O episódio é invisível para a regra do destaque |
| `availability` | `Book` | Status **comercial**, não editorial — não controla visibilidade |

O que o CMS precisa entregar:

- um campo de status por entidade administrável;
- a garantia de que a API devolve **apenas publicados** ao frontend, ou um
  parâmetro que a camada de dados possa aplicar;
- `publishedAt` obrigatório em `Episode` e `Post` quando as datas reais existirem.

A decisão sobre onde o filtro acontece — na API ou em `lib/data` — está aberta e
é do backend. Ambas cabem na arquitetura atual.

---

## 13. Imagens e assets

Toda imagem passa por `next/image` com `sizes` explícito. As proporções vêm do
Figma e são declaradas como `aspect-[w/h]`, reservando o espaço antes do arquivo
chegar.

| Aplicação | Campo | Proporção | Alt |
|---|---|---|---|
| Capa de livro | `Book.cover` | `237/322` | "Capa de {título}" |
| Galeria do livro | `Book.gallery` | `386/525` principal · `102/139` miniatura | Título do livro |
| Retrato no carrossel | `Author.portrait` | quadrado, circular | Nome do autor |
| Retrato na página | `Author.portrait` | 160px, circular | "Retrato de {nome}" |
| Capa de publicação | `Post.coverImage` | `1322/743` | Título do post |
| Galeria de publicação | `Post.gallery` | — | Nada renderiza ainda |
| Arte do podcast | `Episode.cover` | `587/539` | `cover.alt` próprio |

**Campos que existem:** `src` (a string do caminho) e `alt`.

> **Crédito e legenda não estão modelados.** Nenhuma entidade carrega esses
> campos hoje. `Episode.cover` é o único par `{ src, alt }` estruturado; os
> demais são strings simples com o `alt` construído no componente.
>
> **Isso é uma lacuna real para o CMS.** Retrato de autor precisa de crédito do
> fotógrafo, e imagem editorial de publicação normalmente precisa de legenda.
> Acrescentar significa mudar o tipo de `string` para um objeto — mudança de
> contrato que deve ser decidida **antes** da modelagem do CMS, não depois.

**Regras de comportamento:**

- **Ausência não vira placeholder.** Um post sem capa abre sem capa. Reaproveitar
  capa de livro ou retrato de autor faria uma publicação parecer ilustrada
  quando não é.
- **Retratos são dessaturados** — `mix-blend-luminosity` no carrossel,
  `grayscale` na página do autor.
- **`alt` em 10 de 10 imagens.** Verificado.

---

## 14. Estados vazios

Seção alimentada por conteúdo administrável **não some** quando não há dados. A
regra depende do tipo de página.

### Páginas de coleção — mantêm a estrutura

Título, espaçamento e enquadramento permanecem, e um `EmptyState` com frase
aprovada toma o lugar da lista.

Quem abriu a página veio pela lista: devolver o hero e mais nada não responde à
pergunta que trouxe o leitor.

**Aplicado em:** Blog, Eventos, Catálogo, Cursos, Comunidades, Podcast, Imprensa
e as listas da Home.

### Páginas de item — ocultam o bloco

Sem mensagem. Quem abriu um livro veio pelo livro; avisar que não há
recomendações é ruído sobre algo que ninguém procurava.

**Aplicado em:** recomendações do livro, bibliografia do autor, blocos
relacionados.

### Duas exceções, ambas editoriais

| Caso | Decisão | Razão |
|---|---|---|
| **Materiais gratuitos** | Oculta a lista, o formulário fica | A banda é uma troca; uma lista vazia ali é promessa sem nada atrás |
| **Ficha técnica vazia** | Mantém o acordeão, abre em branco | Saber que nada foi registrado é diferente do painel não existir |

> A mensagem de estado vazio é **conteúdo institucional**, não string de
> interface. Vive em `lib/content` e chega ao componente por prop.
> `EmptyState` não tem valor padrão: uma seção sem mensagem não compila.

---

## 15. Paginação

### Blog

| Publicações | Comportamento |
|---|---|
| 0 | Estado vazio; estrutura mantida |
| 1–9 | Uma página, sem controle de navegação |
| 10+ | Pagina de 9 em 9; o controle aparece |

Nove é o que a grade de 3 colunas fecha — três linhas cheias, sem célula órfã.
Com exatamente nove não existe segunda página, e por isso o controle não
aparece: "Página 1 de 1" seria ruído. **Nove não é teto de publicações**, é
quantas cabem de uma vez.

`?page=99` cai na última página válida.

**A página de tag não pagina**, por escolha: paginá-la custaria a geração
estática das rotas de tag, e nenhuma chega perto do limiar.

> `PageNav` é a **primeira e única paginação do projeto** — o catálogo lista o
> acervo inteiro e não há rota de listagem de autores. Qualquer lista que venha
> a paginar deve reusá-lo.

### Demais listas

**Oito listas renderizam tudo o que a camada de dados devolver.** Só a agenda da
Home (4 eventos) e os recomendados do livro (5) têm corte. Não é problema hoje;
passa a ser conforme o catálogo crescer, e a decisão de quando é do produto.

---

## 16. Formulários

| Formulário | Onde | Campos |
|---|---|---|
| **Contato** | `/contato` | Nome, e-mail, assunto, mensagem |
| **Publique** | `/publique` | Dados do autor, gênero, sinopse, upload do original |
| **Materiais** | `/cursos` | Nome e e-mail, em troca dos materiais gratuitos |
| **Newsletter** | Home e sidebar do blog | E-mail |

**Estado:**

- ✅ **Validação frontend pronta** — regras em `src/lib/validation.ts`, mensagens
  de erro ligadas por `aria-describedby`, borda em `terra` e a frase junto: cor
  nunca é o único sinal.
- ⬜ **Integração backend pendente.** Os quatro param no mesmo ponto, com
  comentário explícito: o objeto `draft` é exatamente o payload que o endpoint
  deve receber.

> A validação de `lib/validation.ts` é de interface e **não substitui checagem no
> servidor**. Upload de arquivo, rate limiting, anti-spam e persistência são do
> backend.

---

## 17. SEO

| Item | Estado |
|---|---|
| `metadata` por rota | ✅ Todas. A Home usa o `default` do layout |
| `generateMetadata` nas dinâmicas | ✅ Livro, autor, post e tag — título e descrição vindos do próprio conteúdo |
| Slugs legíveis | ⚠️ Contrato público. `autor-1`…`autor-9` são placeholders |
| `sitemap.ts` | ⬜ Não existe |
| `robots.ts` | ⬜ Não existe |

> **`contentTags` não é SEO.** São duas coisas separadas e devem permanecer
> assim: `contentTags` é vocabulário de navegação editorial, que gera rotas
> reais. A metadata da página vem de `title` e `excerpt`. Nenhuma meta tag de
> palavra-chave foi criada, e criar uma a partir das tags misturaria as duas.

⚠️ **Slugs de autor são a pendência de maior risco.** São contrato público:
trocá-los depois quebra todo link já compartilhado ou indexado. Devem ser
definidos com os nomes reais **antes** da publicação.

---

## 18. Performance

| | |
|---|---|
| Server Components | Padrão em todas as páginas e layouts |
| Client Components | **17**, todos com interatividade real |
| Rotas estáticas | 10 |
| Rotas SSG | 20 |
| Rotas dinâmicas | 2, ambas por leitura de query string |
| Imagens | `next/image` com `sizes` explícito, 10 de 10 com `alt` |

Os 17 client components são os 4 formulários, o carrossel, o acordeão, a galeria
de livro, a navegação móvel, `NavLink` (precisa de `usePathname`), `BackLink`, os
controles de filtro do catálogo, os campos de formulário e o `<Reveal>` do
Motion System. **Nenhum é client sem motivo.**

`<Reveal>` é a única fronteira de cliente que a animação adiciona ao projeto
inteiro: recebe os filhos como prop, então envolver uma grade de `BookCard` não
puxa `BookCard` para o bundle.

**Custo conhecido:** o chunk do GSAP + ScrollTrigger pesa ~44 KB gzip e é
carregado onde há animação.

---

## 19. Pendências

### Editorial

| Item | Detalhe |
|---|---|
| **Conteúdo real** | Sinopses dos 5 livros, biografias e nomes reais dos autores, posts (nenhum real existe), títulos e resumos dos episódios |
| **Imagens** | Retratos com crédito do fotógrafo, capas de publicação, arte do programa do podcast |
| **Links** | 34 destinos apontam para `/contato`: compra, amostra, Spotify, inscrição em evento, convite de comunidade, mídia kit |
| **ISBN** | Identificador real. **Não pode ser inventado** — o padrão atual é deliberadamente impossível |
| **Autores** | `Book.authorIds` aponta para registros placeholder escolhidos arbitrariamente |
| **Episódios** | `publishedAt` de cada um. Sem eles a regra do destaque fica inerte |
| **Decisões** | Status comercial real dos livros, ordem de "Já Aconteceu", rótulo "Todos os gêneros" |

### Backend / CMS

| Item | Detalhe |
|---|---|
| **API** | Endpoints por entidade. A fronteira já existe em `lib/data` |
| **Autenticação** | Acesso ao painel administrativo |
| **Uploads** | Imagens e arquivos — capas, retratos, PDFs de amostra, mídia kit |
| **Permissões** | Quem publica, quem revisa, quem só escreve |
| **Status editorial** | Rascunho / revisão / publicado, por entidade — ver §12 |
| **Envio de formulário** | Os 4 endpoints, com validação de servidor |
| **Crédito e legenda de imagem** | Mudança de contrato a decidir antes da modelagem — ver §13 |

### Desenvolvimento

| Item | Detalhe |
|---|---|
| **`sitemap.ts`** | Não bloqueia integração; vale antes da publicação |
| **`robots.ts`** | Idem |
| **Testes automatizados** | Não existe suíte nem comando de teste. Toda verificação até aqui foi manual |
| **Limite das 8 listas** | Só o blog pagina; as demais renderizam tudo |
| **Capa do podcast em 3,1 MB** | `next/image` entrega otimizada, então não afeta o visitante — pesa no repositório |

---

## 20. Checklist final

### Frontend

- [x] Build funcionando — `pnpm build`, 34 páginas
- [x] Typecheck — `tsc --noEmit`, sem erros
- [x] Lint — ESLint, sem erros
- [x] Rotas funcionando — as 15, verificadas no navegador
- [x] Design System criado — `DESIGN_SYSTEM.html`, 18 seções
- [x] Motion System criado — `src/motion/`, 4 presets, reduced motion
- [x] Arquitetura desacoplada — fronteira `lib/data` verificada por varredura
- [x] Responsividade — 1440, 834 e 390, sem overflow horizontal
- [x] Acessibilidade de base — foco visível, `alt` em todas as imagens, `aria-current`

### Backend

- [ ] CMS definido
- [ ] API definida
- [ ] Uploads definidos
- [ ] Permissões definidas
- [ ] Status editorial definido
- [ ] Endpoints dos formulários

### Editorial

- [ ] Conteúdo definitivo enviado
- [ ] Imagens definitivas enviadas
- [ ] Links definitivos enviados
- [ ] Slugs de autor confirmados **antes da publicação**
- [ ] Verificação de que nada de `lib/mocks` está sendo renderizado

---

## Encerramento

O frontend está pronto para receber a integração. As três frentes que restam —
backend, CMS e conteúdo editorial — são independentes entre si e podem avançar
em paralelo.

A pergunta que a arquitetura precisa continuar respondendo com "sim":

> Se a origem dos dados deixar de ser `lib/content` / `lib/mocks` e passar a ser
> um CMS, o frontend continua funcionando sem refatorar páginas e componentes?

Foi verificada por varredura e não por leitura: nenhum arquivo fora de
`lib/data` importa `lib/content` ou `lib/mocks`. Repetir essa varredura é a
forma mais barata de confirmar que a resposta continua sendo sim.

Para dúvidas de arquitetura de dados, modelos ou integração, o documento
detalhado é [HANDOFF_DEV.md](HANDOFF_DEV.md). Para dúvidas visuais,
[DESIGN_SYSTEM.html](DESIGN_SYSTEM.html). Para o que é conteúdo aprovado e o que
é placeholder, [AUDITORIA_CONTEUDO.md](AUDITORIA_CONTEUDO.md).

# Limites deste Handoff

Este documento cobre:

- frontend;
- arquitetura de dados;
- integração esperada;
- decisões visuais.

Não cobre:

- implementação do CMS;
- infraestrutura backend;
- banco de dados;
- autenticação;
- deploy de produção.
