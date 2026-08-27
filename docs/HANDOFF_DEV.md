# Handoff técnico — Editora Solano

Documento de referência do front-end da Editora Solano, escrito para quem vai construir o
backend, modelar o CMS ou assumir a manutenção do projeto.

Ele descreve **as decisões tomadas neste projeto** e a fronteira entre o que o front
resolve e o que espera do backend. Não é um manual de Next.js: assume que quem lê já
conhece o framework e quer entender por que este código está organizado como está.

| | |
|---|---|
| Versão | 27/08/2026 |
| Estado | Front-end implementado, validado e preparado para integração CMS/backend. Motion System GSAP aplicado a todas as rotas |
| Documento irmão | [AUDITORIA_CONTEUDO.md](AUDITORIA_CONTEUDO.md) — inventário de conteúdo |
| Design System | [DESIGN_SYSTEM.html](DESIGN_SYSTEM.html) — referência visual: tokens, tipografia, componentes, motion |
| Dependências | `next`, `react`, `@phosphor-icons/react`, `gsap` |

---

## 1. Contexto do projeto

A **Editora Solano** é uma editora de Londrina/PR que publica literatura, biografia,
pesquisa socioambiental e ensaio. O site é sua presença institucional e operacional
simultaneamente — não é um cartão de visitas nem uma loja.

O produto cumpre cinco papéis ao mesmo tempo:

| Papel | Onde acontece |
|---|---|
| **Vitrine institucional** | Home, Sobre, Publique — apresentam a casa, o Método Solano e as condições de envio de originais |
| **Catálogo editorial** | Catálogo e página de livro — as obras, com ficha técnica e ação comercial |
| **Apresentação de autores** | Página de autor — retrato, biografia e bibliografia |
| **Arquivo de conteúdos** | Blog, Podcast, Eventos, Imprensa — o que a editora produz e onde aparece |
| **Relacionamento com leitores** | Comunidades, Cursos, newsletter, formulários |

A consequência arquitetural: **quase tudo o que o site mostra é conteúdo que muda com
frequência editorial**, e quase nada é layout fixo. O front foi construído para receber
esse conteúdo de fora, não para carregá-lo dentro.

---

## 2. Escopo atual do front-end

**Quinze rotas de produto** — as páginas que existem como decisão de produto — implementadas e validadas.

| Página | Rota | Origem dos dados |
|---|---|---|
| Home | `/` | `getHomePageData()` |
| Sobre | `/sobre` | `getAboutContent()` |
| Publique | `/publique` | `getPublishContent()` |
| Contato | `/contato` | `getContactContent()` |
| Cursos | `/cursos` | `getCoursesContent()` |
| Podcast | `/podcast` | `getPodcastContent()` + `getFeaturedEpisode()` |
| Eventos | `/eventos` | `getEventsContent()` |
| Comunidades | `/comunidades` | `getCommunitiesContent()` |
| Imprensa | `/imprensa` | `getPressContent()` |
| Catálogo | `/catalogo` | `getCatalogContent()` |
| Livro individual | `/catalogo/[slug]` | `getBookPageData(slug)` |
| Autor individual | `/autores/[slug]` | `getAuthorPageData(slug)` |
| Blog — arquivo | `/blog` | `getBlogArchiveData(page)` |
| Publicação | `/blog/[slug]` | `getPostPageData(slug)` |
| Tag do blog | `/blog/tag/[slug]` | `getTagPageData(slug)` |

### Rotas de produto × páginas geradas

São dois números diferentes e vale não confundi-los:

| | |
|---|---|
| **15 rotas de produto** | As da tabela acima. É o que foi desenhado e construído |
| **34 páginas no build** | O que o Next gera a partir delas |

A diferença são as rotas dinâmicas: `/catalogo/[slug]` é **uma** rota de produto que gera
cinco páginas, uma por livro. Somando: 12 estáticas + 20 pré-renderizadas por
`generateStaticParams` (9 autores, 5 livros, 3 posts, 3 tags) + 2 dinâmicas = 34.

**Ninguém criou 34 páginas à mão**, e o número cresce sozinho conforme o conteúdo entra:
cada livro novo é mais uma página gerada, sem nenhuma rota nova.

---

## 3. Stack e comandos

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Linguagem | TypeScript (strict) |
| Estilo | Tailwind CSS 4, com tokens em `@theme` |
| Ícones | `@phosphor-icons/react` |
| Animação | `gsap` + `ScrollTrigger` — ver a seção 19 |
| Gerenciador | pnpm |

```bash
pnpm dev         # servidor de desenvolvimento
pnpm build       # build de produção
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
```

**Usar sempre `pnpm`.** `npm` ou `yarn` corrompem o lockfile.

**Não existe suíte automatizada no momento.** A validação atual foi realizada por `build`,
`lint`, `typecheck` e testes manuais nos breakpoints definidos — 1440, 834 e 390.

**Dependências são decisão técnica.** O projeto tem cinco em produção — `next`, `react`,
`react-dom`, `@phosphor-icons/react`, `gsap` — e nada foi acrescentado sem necessidade
demonstrada. `Post.content` é um array de blocos tipados em vez de Markdown justamente
para não introduzir um parser.

`gsap` é a mais recente, adicionada para o Motion System. Fica confinada a `src/motion/`:
nenhum componente ou layout a importa, o que a torna substituível sem tocar em página
nenhuma.

---

## 4. Arquitetura de dados

### A regra

> **Nenhum componente conhece a origem dos dados. Nenhuma página conhece a origem
> específica.**

```
CMS / API
    ↓
lib/data        ← única camada que sabe de onde vem
    ↓
app/*/page.tsx  ← compõe, não busca
    ↓
layouts/        ← organiza a página
    ↓
components/     ← recebe props
```

Isso é verificável, não aspiracional: **nenhum arquivo fora de `lib/data/` importa
`lib/content/` ou `lib/mocks/`**. As 15 rotas importam exclusivamente de `lib/data`.

A consequência prática para quem integra: **trocar a origem dos dados é reescrever o corpo
das funções de `lib/data` e mais nada.** Nenhum componente, layout ou página muda.

### As três camadas de origem

#### `lib/content/` — conteúdo institucional aprovado

Texto da editora, de baixa rotatividade, ligado a decisões de marca: o Método Solano, os
heróis das páginas, a taxonomia de gêneros, as etapas do processo editorial, os rótulos de
interface e **as mensagens de estado vazio**.

**Não pertence ao CMS.** Alterar esse texto é decisão de marca, não operação editorial, e
criar administração para um rótulo que muda uma vez por ano é custo sem retorno.

Sobrevive à entrada do CMS — só a origem pode mudar, se um dia quiserem.

#### `lib/data/` — a costura

Onde vive o que o resto do app não deve saber:

- **de onde os dados vêm** — hoje arquivos, amanhã uma API;
- **ordenação** — posts por data, comunidades por `order`, eventos por data;
- **junções** — resolver `authorIds` em registros de `Author`, `genreSlugs` em `Genre`;
- **composição de página** — uma função por rota, devolvendo tudo o que ela renderiza;
- **o mapeamento de idioma**, quando o CMS entrar.

Todas as funções já são `async`, embora hoje resolvam de imediato. É deliberado: uma query
de CMS devolve promise, e declarar síncrono hoje obrigaria a migração a voltar às páginas.

#### `lib/mocks/` — validação visual

Dados temporários que existem só para conferir layout, componentes e responsividade com
volume realista. Contêm autores, livros e posts.

**Esta pasta será apagada quando o CMS entrar.** Nada que sobreviva à migração deve morar
aqui — foi por isso que a taxonomia de gêneros e as etapas de publicação saíram dela para
`lib/content/`.

**Nenhum dado de `mocks/` pode chegar a uma versão pública.**

### Módulos de apoio

| Arquivo | Responsabilidade |
|---|---|
| `lib/format.ts` | Datas e durações como o design as escreve. Lê `YYYY-MM-DD` posicionalmente, sem construir `Date` — nenhum fuso horário desloca um dia |
| `lib/validation.ts` | `isValidEmail` e `isBlank`. Validação **de interface**; não substitui checagem no servidor |
| `lib/catalog.ts` | `filterBooks` — o predicado de gênero e busca do catálogo, isolado do componente |
| `lib/tags.ts` | `toTagSlug` e `findTagBySlug` — derivação de slug de tag editorial |
| `lib/links.ts` | `isExternalHref` — decide se um destino sai do app |
| `lib/navigation.ts` | Menu, rodapé e `SITE_INFO` (razão social, CNPJ, endereço, tagline) |
| `lib/utils.ts` | `cn` — juntador de classes, sem resolução de conflito Tailwind |

> ⚠ **`cn` não faz merge de classes conflitantes.** Passar `text-muted` e `text-bg/70`
> juntos deixa o vencedor por ordem da folha de estilo, não por ordem do argumento. Onde há
> variação de tom, os componentes **selecionam** a classe (ver `EmptyState`), não a
> sobrepõem.

---

## 5. Convenções técnicas

### Idioma

| Camada | Idioma |
|---|---|
| Código — tipos, campos, funções, componentes, comentários | **Inglês** |
| Conteúdo exibido ao leitor | **Português** |
| CMS — provavelmente | **Português** |

**O mapeamento entre os dois acontece em `lib/data`.** Se o CMS devolver `titulo`,
`autor`, `data_publicacao`, a conversão para `title`, `author`, `publishedAt` é feita no
corpo da função que busca — os tipos internos permanecem em inglês e nenhum componente
aprende que existiu outra nomenclatura.

### Nomenclatura

| Elemento | Convenção | Exemplo |
|---|---|---|
| Componentes e arquivos | PascalCase | `BlogPostCard.tsx` |
| Pastas | kebab-case | `components/blog/` |
| Tipos | PascalCase | `Post`, `BookTechnicalSheet` |
| Variáveis e funções | camelCase | `getPostsByTag` |
| Constantes globais | SCREAMING_SNAKE_CASE | `POSTS_PER_PAGE` |
| Rotas | kebab-case | `/catalogo/[slug]` |

Props booleanas com prefixo verbal (`isLoading`, `hasCover`).

### Datas

Todo campo de data é **`string` em `YYYY-MM-DD`**, nunca `Date`.

Dois motivos, ambos práticos: a string cruza a fronteira servidor/cliente sem
serialização, e compara corretamente com `localeCompare`, o que permite ordenar sem
construir `Date` e sem que um fuso horário mova o resultado.

A exceção é `BookTechnicalSheet.publicationDate`, que é string livre: nada a ordena, e uma
editora pode conhecer só o ano de uma edição antiga.

---

## 6. Modelo de entidades

Onze entidades administráveis, todas com tipo próprio em `src/types/` e função em
`lib/data/`.

### Book — `types/book.ts`

```ts
interface Book {
  id: string;
  slug: string;              // contrato de URL
  cover: string;
  title: string;
  author: string;            // ⚠ LEGADO — ver abaixo
  description: string;
  category: string;
  genreSlugs: string[];      // → Genre.slug
  authorIds: string[];       // → Author.id
  series: string;
  gallery: string[];
  technicalSheet: BookTechnicalSheet;
  availability: BookAvailability;
  sampleUrl?: string;
  links: BookLink[];
}

type BookAvailability = "available" | "preorder" | "coming-soon";

interface BookTechnicalSheet {
  weight: string;
  dimensions: string;
  binding: string;
  pages: number;             // número, não "248 págs."
  publisher: string;
  isbn: string;
  publicationDate: string;
}
```

**`availability` é obrigatório e sem default.** A regra editorial é que todo livro tem
status comercial, e um campo obrigatório é como a regra é imposta em vez de apenas
documentada: acrescentar um título sem decidir não compila.

É uma união fechada porque **decide comportamento** — qual botão renderiza. Um rótulo que
só é impresso pode ser string livre; um rótulo que também é ramificação não pode, ou no
dia em que alguém escrever "Pré-Venda" o botão some em silêncio.

**A ficha técnica não guarda autoria.** A linha "Autores" do painel vem de `authorIds`
resolvido, para que a ficha não possa contradizer o bloco de autor algumas centenas de
pixels abaixo dela. Um `technicalSheet.authors: string[]` existiu por algumas horas e foi
removido pelo mesmo motivo.

> ⚠ **`Book.author` é legado.** É texto livre e hoje contém o nome da casa ("Solano"),
> não de uma pessoa. Só o `BookCard` o imprime. **Nada novo deve depender dele.** No modelo
> de CMS, ele não existe — a autoria é a relação.

### Author — `types/author.ts`

```ts
interface Author {
  id: string;
  slug: string;              // contrato de URL
  name: string;
  shortDescription: string;
  genre: string;             // área de atuação, ex. "Socioambiental"
  portrait: string;
  bio: string;
}
```

Todos obrigatórios. Um autor sem retrato ou sem biografia não é um autor cadastrado pela
metade — é um registro que ainda não deveria existir.

### Post — `types/post.ts`

```ts
interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;           // teto de 200 caracteres — ver §11
  coverImage: string;
  gallery: string[];
  authorIds: string[];       // → Author.id, plural
  publishedAt: string;       // YYYY-MM-DD, chave da ordenação
  content: PostContentBlock[];
  contentTags: string[];     // tags editoriais
}

type PostContentBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; items: string[] };
```

**`content` é um array de blocos, não uma string.** O frame do artigo desenha quatro tipos
— parágrafo, subtítulo, citação e lista — e uma string os achataria todos em parágrafo.
Blocos em vez de Markdown para não introduzir um parser como dependência.

União discriminada de propósito: o `switch` do renderizador é exaustivo por construção, e
um bloco que carrega `items` não pode também alegar carregar `text`.

> **`contentTags` são tags editoriais, não SEO.** Organizam o arquivo e dão ao leitor um
> caminho por ele: `/blog/tag/[slug]` lista tudo o que está sob uma. Metadados de busca são
> outra coisa, com outro público, e vivem em `generateMetadata`. **Nada no projeto mistura
> os dois, e nenhuma meta de palavra-chave é emitida.**

`coverImage` e `gallery` são separados: a capa é a imagem do card e o banner da
publicação; a galeria são as demais imagens do texto. Um post não está limitado a uma
imagem.

### Genre — `types/genre.ts`

```ts
interface Genre {
  id: string;
  slug: string;              // chave de navegação — é um contrato
  number: string;            // "01"…"08", ordenação editorial
  title: string;
  description: string;
}
```

**Gêneros são casados por `slug`, nunca por `title`.** Um título é string de exibição que
a editoria reescreve; um link que depende de redação quebra no dia em que alguém corrige
uma maiúscula.

`number` é armazenado, não derivado da posição no array — é ordenação editorial. A
consequência: remover um gênero abre buraco na sequência até alguém renumerar.

### ScheduledEvent / PastEvent / AgendaEvent — `types/event.ts`

```ts
interface AgendaEvent {              // o que a Home mostra
  id: string;
  title: string;
  description: string;
  date: string;                      // YYYY-MM-DD
}

interface ScheduledEvent extends AgendaEvent {
  category: string;
  time?: string;                     // "19:30" — ausente enquanto não confirmado
  location: string;
  href: string;                      // inscrição
}

type PastEvent = AgendaEvent;        // mesma forma, outra lista
```

`PastEvent` é um alias de `AgendaEvent`: um evento passado carrega exatamente o que a
agenda da Home mostra — data, título e uma linha — sem local nem inscrição, que já não
fazem sentido depois que aconteceu.

Futuros e passados são **duas listas**, não uma com flag de status. A página é
pré-renderizada, então qualquer coisa derivada de "agora" congelaria no build; e o design
já os trata como duas seções, que é também como um CMS os consultaria.

`AgendaEvent` é o contrato estreito que a Home recebe — os mesmos objetos vistos por uma
interface menor, não cópias.

### Episode — `types/episode.ts`

```ts
interface Episode {
  id: string;
  number: string;                     // "011" — rótulo tipografado, não chave
  title: string;
  description: string;
  durationMinutes: number;            // número; "min" é tipografia
  href: string;
  publishedAt?: string;               // ⚠ opcional hoje — ver abaixo
  cover?: { src: string; alt: string };
}
```

> **Regra do destaque:** o episódio em destaque do herói é **sempre o último publicado**.
> Não existe escolha manual, e não deve existir — um campo de destaque é algo que alguém
> precisa lembrar de atualizar a cada quinze dias, e que fica velho em silêncio quando não
> lembra.

`getFeaturedEpisode()` em `lib/data/podcast.ts` faz a escolha. **Hoje devolve `undefined`**
porque nenhum episódio carrega `publishedAt`, e o herói cai na apresentação do programa.

**`publishedAt` deve ser obrigatório no modelo do CMS.** Opcional permite que um episódio
novo entre sem data e fique silenciosamente fora da regra do destaque — publicado, e
invisível para a única coisa que decide o que o herói mostra. É opcional no tipo apenas
porque nenhum episódio tem data hoje; **é requisito de modelo, não só pendência
editorial** (ver §13).

`number` **não** é chave de ordenação: é rótulo, e ordenar por ele quebra no dia em que um
episódio for renumerado ou publicado fora de sequência.

### Course e CourseMaterial — `types/course.ts`

```ts
interface Course {
  id: string;
  category: string;                   // "Curso", "Mentoria"
  title: string;
  description: string;
  availability: string;               // texto livre — só é impresso
  href: string;
}

// Alias de TimelineEntry, a linha rotulada que Publique e Cursos compartilham.
type CourseMaterial = TimelineEntry;

interface TimelineEntry {
  id: string;
  number?: string;                    // "01" — ausente nos materiais
  title: string;
  description: string;
}
```

`Course.availability` é string livre, ao contrário de `Book.availability`: aqui o valor só
é impresso, nunca ramifica. Se um dia decidir se o botão aparece, precisa virar união
fechada pelo mesmo motivo.

### Community — `types/community.ts`

```ts
interface Community {
  id: string;
  schedule: string;                   // "Mensal · online"
  status: string;                     // "ABERTO", "LISTA DE ESPERA"
  title: string;
  description: string;
  href: string;                       // convite do grupo
  order: number;                      // ordenação administrável
}
```

`order` existe para que reordenar seja trocar um número no painel, não editar a ordem de um
arquivo. A ordenação acontece em `lib/data/communities.ts`; o card nunca aprende que o
campo existe.

### MediaMention e MediaKitAsset — `types/press.ts`

```ts
interface MediaMention {
  id: string;
  outlet: string;                     // veículo
  kind: string;                       // "Reportagem", "Podcast"
  title: string;
  publishedAt: string;                // YYYY-MM-DD
  href: string;                       // a matéria
}

interface MediaKitAsset {
  id: string;
  title: string;
  description: string;
  href: string;                       // arquivo hospedado
  order: number;                      // ordenação administrável
}
```

`MediaKitAsset.order` existe pela mesma razão que `Community.order`: reordenar deve ser
trocar um número no painel, não editar a ordem de um arquivo.

### SocialLink — `types/page-content.ts`

```ts
interface SocialLink {
  id: "instagram" | "youtube" | "linkedin" | "facebook" | "x";
  label: string;
  href?: string;                      // ausente = ícone inerte, não link
}
```

`href` opcional é a parte que importa: uma rede sem URL renderiza como glifo inerte, fora
da ordem de tabulação, em vez de link para lugar nenhum. É o mesmo tratamento de
`ContactChannel.href` e de `Book.links`.

---

## 7. Relacionamentos

### Livro ↔ Autor

```
Book.authorIds: string[]
        ↓  getAuthorsByIds()
Author[]
```

A ordem segue a que o livro declara, não a da lista de origem — um livro com dois autores
os nomeia na ordem que quer. Ids sem registro correspondente são descartados em vez de
virarem buracos: um livro que aponta para um autor removido mostra os que tem, e a página
se sustenta.

**Verificado:** zero `authorIds` órfãos.

> **Não construir nada novo sobre `Book.author`.** É o campo legado de texto livre. No
> modelo de CMS ele não deve existir.

### Livro ↔ Gênero

```
Book.genreSlugs: string[]
        ↓
Genre.slug
```

`genreSlugs[0]` é o **gênero principal**: é o que o breadcrumb mostra e de onde as
recomendações são tiradas. A ordem é editorial, não incidental — reordenar o array muda a
página.

Nada no código valida que um slug existe na taxonomia. Essa checagem pertence a quem
administra: um CMS com campo de relação não consegue produzir slug órfão, um campo de texto
livre sempre consegue.

**Verificado:** os 4 slugs em uso existem entre os 8 da taxonomia.

### Autor ↔ Livro

```
getBooksByAuthor(authorId)
```

A leitura inversa de `authorIds`, em `lib/data/books.ts` — mora ali porque responde com
livros, e esse é o módulo que sabe de onde livros vêm. Hoje varre a lista completa, o que é
adequado com cinco registros; com CMS vira consulta por relação, ali e em nenhum outro
lugar.

### Blog ↔ Tags

```
Post.contentTags: string[]
        ↓  toTagSlug()
/blog/tag/[slug]
```

**Não existe entidade `Tag`.** Uma relação se paga quando algo resolve a tag num registro
com campos próprios — descrição, ordem curada — e nada aqui faz isso: a página de tag mostra
o nome da tag e os posts sob ela, ambos fornecidos por uma string.

`toTagSlug` dobra caixa e acento, então "Bastidores", "bastidores" e "BASTIDORES" chegam à
mesma página em vez de partirem o arquivo em três. O nome exibido é resolvido de volta a
partir do slug, porque "historia-e-cultura" não é "História e Cultura".

> **O que a string livre não resolve:** variantes de **redação**. "Evento" e "Eventos" são
> duas tags, com duas páginas, e nenhuma derivação as reconcilia. **O CMS deve oferecer
> seleção com criação, não campo de texto solto.**

### Post ↔ Autor

```
Post.authorIds: string[]
        ↓  getAuthorsByIds()
Author[]
```

A mesma relação e a mesma função do livro. `Post.author` foi texto livre até 27/08/2026 —
o blog era o único lugar do projeto onde autoria não era relação, e duas formas para uma
ideia só é migração esperando para acontecer. Foi fechado antes de o modelo de CMS ser
escrito, não depois.

**Plural de propósito.** Um post pode ter vários autores de verdade: entrevista a duas
vozes, texto coletivo, colaborador ao lado de entrevistado. Um `authorId` singular teria
pedido a mesma migração uma segunda vez.

A assinatura da publicação imprime os nomes resolvidos, separados por vírgula — a vírgula é
tipografia, a mesma escolha do bloco de título do livro. Sem autoria registrada, a
assinatura não renderiza e só a data aparece.

> **Os nomes ainda não são links.** O frame não desenha um, e a regra do projeto é não
> inventar elementos que o design não especifica. Agora que a relação existe, ligar o nome
> a `/autores/[slug]` é uma linha — mas é decisão de design, não consequência automática.

---

## 8. Rotas

### Institucional

| Rota | Geração |
|---|---|
| `/` | Estática |
| `/sobre` | Estática |
| `/publique` | Estática |
| `/contato` | Estática |
| `/cursos` · `/eventos` · `/comunidades` · `/podcast` · `/imprensa` | Estáticas |

### Catálogo

| Rota | Geração |
|---|---|
| `/catalogo` | **Dinâmica** — lê `?genero=` |
| `/catalogo/[slug]` | SSG, uma por livro |

### Autores

| Rota | Geração |
|---|---|
| `/autores/[slug]` | SSG, uma por autor |

Não há rota de listagem de autores. O carrossel da Home é a única entrada.

### Blog

| Rota | Geração |
|---|---|
| `/blog` | **Dinâmica** — lê `?page=` |
| `/blog/[slug]` | SSG, uma por publicação |
| `/blog/tag/[slug]` | SSG, uma por tag em uso |

### Regras de rota

- **Slug é contrato.** Trocar um slug quebra todo link já compartilhado ou indexado.
- **Slug inexistente devolve 404**, não estado vazio — é endereço errado, não página sem
  conteúdo. Vale para livro, autor, post e tag.
- **Parâmetro de página fora do intervalo cai na página válida mais próxima**, para não
  parecer um arquivo vazio.
- **As duas rotas dinâmicas são-no por leitura de query string.** Nenhuma outra foi tornada
  dinâmica sem necessidade.

---

## 9. Regras de conteúdo

### Conteúdo institucional — fica no código

Vive em `lib/content/`, versionado. **Não pertence ao CMS.**

- textos institucionais e heróis de página;
- o Método Solano e as etapas do processo editorial;
- a taxonomia de gêneros;
- rótulos de interface e de botão;
- **as mensagens de estado vazio**;
- dados da sede: razão social, CNPJ, endereço, e-mails.

**Uma regra que vale registrar:** copy institucional **não indica o tamanho de uma lista
administrável**. Um número em prosa é um fato congelado no momento da escrita sobre um dado
que muda sem ele, e nada no código percebe a divergência — ela só aparece na tela de um
leitor. Duas frases já foram corrigidas por isso.

### Conteúdo administrável — futuro CMS

Livros, autores, posts, eventos, episódios, cursos, materiais, comunidades, aparições na
mídia e itens do mídia kit.

O teste, para qualquer texto em dúvida: **este conteúdo sobrevive à entrada do CMS?** Se
sim, está em `lib/content/`. Se será cadastrado e editado por alguém da equipe editorial,
é entidade administrável.

---

## 10. Estados vazios

### A regra

| | Página de coleção / listagem | Página de item |
|---|---|---|
| **Sem conteúdo** | Mantém estrutura, título e espaçamento. Mostra o estado vazio aprovado | Oculta o bloco. Não cria mensagem |
| **Por quê** | Quem abriu veio pela lista; devolver o herói e nada não responde à pergunta que o trouxe | Quem abriu um livro veio pelo livro; avisar que não há recomendações é ruído sobre algo que ninguém procurava |
| **Onde** | Blog, tag, catálogo, eventos, cursos, comunidades, podcast, imprensa, listas da Home | Recomendações do livro, bibliografia do autor, blocos relacionados |

**A seção nunca desaparece por decisão do código.** Ocultar é exceção e decisão editorial.

### Implementação

`components/ui/EmptyState.tsx` — recebe a mensagem por prop e **não tem valor padrão**. Uma
seção sem mensagem não compila, em vez de renderizar algo que ninguém aprovou.

Treze mensagens aprovadas, todas em `lib/content/`. Nenhuma escrita dentro de componente.

### As duas exceções

| Caso | Comportamento |
|---|---|
| **Cursos — materiais gratuitos** | A lista **some**, sem mensagem. O formulário permanece. A banda é uma troca — e-mail à esquerda, materiais à direita — e uma lista vazia ali é promessa sem nada atrás |
| **Livro — ficha técnica vazia** | Sem mensagem. O acordeão fica e abre em branco; linhas só quando há dado, e nenhum valor é inventado |

### Ainda sem mensagem

"Já Aconteceu" tem mensagem; o catálogo totalmente vazio tem mensagem. Resta apenas a ficha
técnica vazia, por decisão de não criar uma.

---

## 11. Paginação e quantidade

### Blog

> **Até 9 publicações, o Blog permanece em uma única página. A partir da 10ª publicação, a
> paginação é ativada, utilizando 9 publicações por página.**

Nove porque é o que a grade fecha: três colunas por três linhas, sem célula órfã. Com
exatamente nove não há segunda página, então `PageNav` não renderiza — um controle que
oferece "Página 1 de 1" é ruído.

`POSTS_PER_PAGE` vive em `lib/data/posts.ts`. Quantos itens uma página carrega é decisão de
dados; a grade só recebe o que lhe derem.

A página é um endereço (`?page=2`): sobrevive a recarga, a compartilhamento e ao botão
voltar, e abre em aba nova.

**A página de tag não pagina**, por escolha: paginá-la custaria a geração estática das
rotas de tag, e nenhuma chega perto do limiar.

### PageNav

`components/ui/PageNav.tsx` é a **única paginação do projeto** e passa a ser o padrão.
Qualquer lista que venha a paginar deve reusá-lo. Foi montado com peças já aprovadas: o
botão quadrado de 36px com borda e a seta que o `Carousel` usa, incluindo o estado
desabilitado a 25%.

### Autores — carrossel

A fileira da Home transborda a partir de **7 retratos** (medido, não estimado: no desktop
de 1440 o trilho tem 1380px úteis, e *n* retratos medem `206n − 30`). As setas aparecem
só quando há transbordo.

> ⚠ **Com 6 autores ou menos a composição se desfaz:** a fileira fica alinhada à esquerda
> sob um cabeçalho centralizado.

### Livros

Nem a Home nem o catálogo paginam. `getBooks()` devolve o acervo inteiro para os dois.

> ⚠ **Com mais de ~12 livros a Home carrega todas as capas**; com mais de ~40 a grade do
> catálogo e seu filtro no cliente deixam de escalar.

### Riscos de composição

Grades de card deixam **célula vazia com hairline** quando a contagem não fecha: gêneros
fora de múltiplo de 3, comunidades em número ímpar, cursos com 1 ou 2. Nenhum quebra o
layout — são buracos visíveis, não bugs.

---

## 12. Imagens e assets

| Campo | Obrigatório | Comportamento sem imagem |
|---|---|---|
| `Book.cover` | Sim | — |
| `Book.gallery` | Sim (pode ser vazio) | Sem miniaturas, só a capa |
| `Author.portrait` | Sim | — |
| `Post.coverImage` | Sim (pode ser vazio) | A publicação abre sem banner |
| `Post.gallery` | Sim (pode ser vazio) | Nada renderiza hoje |
| `Episode.cover` | Opcional | Herói cai na imagem do programa |
| `PodcastHero.cover` | Sim | — |

**Ausência de imagem não quebra layout em nenhum caso.** Todas passam por `next/image` com
`sizes` explícito e `alt` — 10 de 10 ocorrências têm alt.

**Múltiplas imagens são suportadas onde faz sentido:** `Book.gallery` e `Post.gallery` são
arrays sem tamanho fixo. A galeria do post ainda não tem componente — o frame não desenha
nenhuma, e construir uma seria inventar interação não especificada.

> ⚠ `public/assets/podcast/antes-do-livro.png` tem **3,1 MB de um `public/` de 3,9 MB**.
> O `next/image` entrega otimizada, então não afeta o visitante — o peso é no repositório.

---

## 13. Integração CMS

### Responsabilidades

| CMS / backend | Front-end |
|---|---|
| Cadastro, edição e publicação de entidades | Apresentação e composição |
| Upload e hospedagem de imagens | Estados vazios e de carregamento |
| Links e destinos externos | Navegação e rotas |
| Autenticação e permissões | Validação de interface |
| Ordenação, se preferir devolvê-la pronta | Ordenação, enquanto o CMS não a fizer |

### Pontos de integração

| Ponto | O que fazer |
|---|---|
| **Idioma** | Chaves em português → contrato em inglês, dentro de `lib/data` |
| **`Post.content`** | Rich text → `PostContentBlock[]`. É a transformação mais pesada |
| **`Book.availability`** | União fechada: valor fora dos três precisa ser mapeado, não repassado |
| **Ordenações** | Se o CMS ordenar, os `sort` de `lib/data` viram redundantes — não errados |
| **Slugs** | Contratos públicos. Os de autor são placeholders (`autor-1`…) e trocá-los depois quebra links |
| **Tags** | Seleção com criação, nunca texto solto |
| **Datas** | `YYYY-MM-DD`. Se vier ISO completo ou objeto, normalizar em `lib/data` |
| **`Episode.publishedAt`** | **Obrigatório no modelo.** É a chave do destaque do podcast: um episódio sem data não existe para a regra que escolhe o herói |

### Estratégia de publicação

O CMS deve distinguir três estados, e **o front deve consumir apenas o terceiro**:

```
Rascunho  →  Revisão  →  Publicado
                            ↓
                       lib/data
```

Duas regras que decorrem disso:

1. **Conteúdo não publicado não aparece publicamente** — nem em listagem, nem por URL
   direta. Um rascunho alcançável pelo slug é um vazamento, não uma prévia.
2. **Conteúdo com data futura não aparece antes da data.** Um post agendado para a semana
   que vem não deve estar no arquivo hoje, e um livro anunciado para o mês que vem não
   deve estar no catálogo.

Isso importa especialmente para quatro entidades:

| Entidade | Por quê |
|---|---|
| **Post** | O arquivo é ordenado por `publishedAt`; um rascunho vazado apareceria no topo |
| **Evento** | A agenda separa futuro de passado. Um evento não confirmado no ar é compromisso público que a editora não assumiu |
| **Livro** | `availability` já modela pré-venda e "em breve" — mas um livro em preparação não deve estar no catálogo |
| **Curso** | Uma turma não aberta anunciada como aberta gera inscrição que ninguém pode atender |

**Onde o filtro mora:** em `lib/data`, junto com a ordenação. Se o CMS já devolver só o
publicado, as funções não mudam; se devolver tudo, o filtro entra ali e nenhum componente
percebe.

> **A regra existente que se conecta a isto:** o Podcast escolhe o episódio em destaque
> pelo `publishedAt` mais recente. Se um episódio em rascunho carregar data, ele passa a
> alimentar o herói — mais uma razão para o filtro de publicação vir antes de qualquer
> ordenação.

### Uploads de imagem

O CMS é responsável por armazenar e servir as imagens. Para cada uma, **quatro campos**, não
apenas a URL:

| Campo | Obrigatório | Por quê |
|---|---|---|
| **URL** | Sim | O que `next/image` recebe |
| **Alt text** | Sim | Acessibilidade. Hoje o front compõe alt a partir do título — funciona para uma capa de livro, não para uma fotografia editorial, onde o alt descreve o que está na imagem e não como ela se chama |
| **Crédito** | Sim para retratos e fotos | Fotografia tem autoria. Um retrato de autor publicado sem crédito é problema de direito, não de layout |
| **Legenda** | Quando aplicável | Imagens dentro de um texto costumam pedir uma; capas e retratos não |

Onde isso incide:

| Imagem | Alt | Crédito | Legenda |
|---|---|---|---|
| `Author.portrait` | Sim | **Sim** — pedido explícito da equipe editorial | Não |
| `Book.cover` e `Book.gallery` | Sim | Quando houver fotografia | Não |
| `Post.coverImage` | Sim | **Sim** | Talvez |
| `Post.gallery` | Sim | **Sim** | **Sim** |
| `Episode.cover` | Sim | Quando houver | Não |
| Mídia kit | — | — | — |

> **Consequência de modelo:** os campos de imagem hoje são `string` (uma URL).
> `Episode.cover` e `PodcastHero.cover` já são `{ src, alt }` — essa é a forma mais próxima
> do que o CMS vai devolver. **Os demais precisarão virar objeto quando crédito e legenda
> existirem**, e a conversão é uma linha em `lib/data` mais uma no componente que os
> desenha. Vale decidir antes de cadastrar as imagens reais, não depois.

**Nenhum backend foi implementado e nenhuma API foi inventada.** O que existe é a costura
pronta para recebê-los.

---

## 14. Conteúdo temporário

Marcado com blocos `TEMPORÁRIO` no topo dos arquivos.

| Entidade | Qtd. | Por que essa quantidade |
|---|---|---|
| Autor | 9 | O frame repete "Nome do autor" 9×; são necessários ≥ 7 para o carrossel transbordar |
| Livro | 5 | **Decisão visual**: 5 capas de 237px em ritmo de 33px somam 1317px, a coluna de conteúdo |
| Post | 3 | O frame da Home desenha 3 cartões; o do arquivo desenha 6 |
| Episódio | 5 | Só o #011 tem título real |
| Evento | 4 futuros, 4 passados | 4 é decisão visual na Home; no conteúdo é o mesmo evento repetido |

> **Quantidade de mock não representa quantidade real.** Nove autores não são um pedido de
> nove autores — a quantidade de qualquer entidade é decisão da editora e não está escrita
> em lugar nenhum deste projeto.

Convenções de placeholder que valem conhecer:

- **ISBNs são `000-0-0000-0000-N`, deliberadamente impossíveis.** Um ISBN é identificador do
  mundo real, e um falso plausível é pior que dado nenhum: pode ser copiado, buscado e
  citado.
- **Nenhuma URL foi inventada.** Destinos provisórios apontam para `/contato`, uma rota
  real, e estão documentados no topo de cada arquivo.
- **Imagens de post estão vazias**, para que um post não pareça ilustrado quando não é.

---

## 15. Pendências para produção

### Editorial

| Item | Detalhe |
|---|---|
| Autores reais | Nomes, áreas, retratos com crédito, apresentações curtas e **biografias** |
| **Slugs de autor** | `autor-1`…`autor-9` são placeholders. **Trocar depois quebra todo link compartilhado** |
| Autoria dos livros | `authorIds` aponta para registros escolhidos arbitrariamente |
| Livros | Sinopses, coleção, ficha técnica real, galeria, URLs de amostra e de loja |
| **ISBN** | Identificador real — não pode ser inventado |
| Status comercial | Os 5 estão `"available"` por inferência dos anos de publicação |
| Posts | Tudo. Nenhum post real existe |
| Episódios | Títulos e resumos do #007 ao #010, durações, links e **`publishedAt`** |
| Eventos | Agenda real; os 4 atuais são o mesmo lançamento repetido |
| Imprensa | Aparições reais e arquivos do mídia kit |
| Cursos e comunidades | Links de inscrição e convites dos grupos |
| **URL do X** | Único perfil social ainda não fornecido |
| Ficha técnica vazia | Decidir se ganha mensagem |

### Backend / CMS

| Item |
|---|
| Modelo final das 11 entidades |
| Autenticação e permissões |
| Upload e hospedagem de imagens |
| Endpoints dos 4 formulários |
| Estratégia de revalidação / rebuild na publicação |

### Desenvolvimento

| Item | Prioridade |
|---|---|
| `sitemap.ts` e `robots.ts` | **Antes da publicação pública.** Não é integração de backend — é preparação de lançamento, e independe do CMS |
| Suíte de testes | A decidir |
| Substituir a capa do podcast (3,1 MB) | Baixa |
| Limite/paginação para catálogo, episódios e eventos | Quando o volume pedir |

---

## 16. Formulários

Quatro, todos client components:

| Formulário | Onde | Payload |
|---|---|---|
| Envio de originais | `/publique` | `SubmissionDraft` |
| Mensagem | `/contato` | `ContactMessageDraft` |
| Materiais gratuitos | `/cursos` | `MaterialsRequestDraft` |
| Newsletter | Home e sidebar do blog | e-mail |

**Estado atual:** validação de interface pronta, envio pendente.

Cada `handleSubmit` valida, monta o objeto e para num ponto marcado por comentário
explícito no código: **o `draft` é exatamente o que o endpoint receberá.** Os tipos de
payload vivem em `types/` separados dos componentes que desenham os campos — são contrato
de transporte, não de interface.

> ⚠ A validação de `lib/validation.ts` é de interface e **não substitui checagem no
> servidor**.

---

## 17. SEO

| | |
|---|---|
| Metadata | Todas as 15 rotas. A Home usa o `default` do layout raiz |
| Template | `%s — Editora Solano`, definido em `app/layout.tsx` |
| Páginas dinâmicas | `generateMetadata` em livro, autor, post e tag |
| Descrição de post | O `excerpt` que o editor já escreveu |
| Canonical | Não configurado |
| `sitemap.ts` / `robots.ts` | **Não existem** |

> **`contentTags` e metadata de SEO são coisas separadas e permanecem separadas.** As tags
> organizam o arquivo para leitores; nenhuma meta de palavra-chave é emitida — o atributo é
> ignorado por buscadores há anos, e misturar os dois colocaria vocabulário editorial num
> slot técnico que não faz nada com ele.

Slugs são consistentes entre livro, autor, post e tag: minúsculas, sem acento, separados
por hífen, e todos contratos públicos.

---

## 18. Performance

| | |
|---|---|
| Server Components | Padrão. 17 client components, todos com interatividade real |
| Estáticas | 12 rotas |
| SSG | 20 rotas |
| Dinâmicas | 2, ambas por leitura de query string |
| Imagens | `next/image` com `sizes` explícito |

Os 17 client components são formulários, carrossel, acordeão, galeria de livro, navegação
mobile, `NavLink` (precisa de `usePathname`), `BackLink`, os controles de filtro do catálogo
e o `<Reveal>` do Motion System. **Nenhum é client sem motivo.**

`<Reveal>` é a única fronteira de cliente que a animação adiciona ao projeto inteiro: recebe
os filhos como prop, então envolver uma grade de `BookCard` não puxa `BookCard` para o
bundle. Ver a seção 19.

> ⚠ **Oito listas renderizam tudo o que a camada de dados devolver.** Só o blog pagina, e
> só a agenda da Home (4) e os recomendados do livro (5) têm corte. Não é problema hoje;
> passa a ser conforme o catálogo crescer.

---

## 19. Motion System

Camada de apresentação em GSAP. **Não toca em dados, tipos, rotas nem lógica** — se ela for
removida inteira, o site continua funcionando e renderizando exatamente o mesmo conteúdo.

| | |
|---|---|
| Biblioteca | `gsap@3.15` + `ScrollTrigger` |
| Onde vive | `src/motion/` — nenhum outro arquivo importa `gsap` |
| Superfície pública | um componente: `<Reveal>` |
| Client Components novos | 1 |
| Custo | ~44 KB gzip, carregado onde há animação |

### Arquitetura

```
src/motion/
├── gsap.ts         registro do plugin — único import de `gsap` no projeto
├── presets.ts      tokens de movimento + os três presets (sem GSAP, sem DOM, sem React)
├── animations.ts   createReveal() — monta o tween e o ScrollTrigger
├── use-reveal.ts   hook: gsap.context, gsap.matchMedia, cleanup
├── Reveal.tsx      o único client component
└── index.ts        exporta só `Reveal`
```

`index.ts` exporta deliberadamente apenas o componente. Reexportar o hook colocaria o GSAP no
grafo de módulos de servidor de toda página que só queria animar alguma coisa.

### `<Reveal>`

Anima os **filhos diretos** e nada mais. Uma seção pede entrada em uma linha:

```tsx
<Reveal preset="staggerCards">
  {genres.map((genre) => <GenreCard key={genre.id} genre={genre} />)}
</Reveal>
```

**Server Components continuam Server Components.** Os filhos chegam como prop já renderizados
no servidor, então envolver uma grade de `BookCard` não puxa `BookCard` — nem os dados que ele
recebeu — para o bundle do cliente. Páginas e layouts seguem sendo de servidor.

**Duas formas, porque layout não pode se mexer:**

- **Padrão** — renderiza `<div class="contents">`. `display: contents` elimina a caixa mas
  mantém o nó no DOM, então os filhos continuam sendo células de grid ou itens de flex do pai.
  Aninhar dois é seguro: nenhum gera caixa, então os filhos ainda alcançam o grid (é o que a
  Imprensa faz, onde a ordem de leitura no mobile depende de `order`).
- **`as`** — renderiza *no lugar* do elemento que já existia, com as mesmas classes.
  Obrigatório para `<ul>`/`<ol>`, onde uma `<div>` entre a lista e os itens é markup inválido
  e custa a semântica, e para qualquer container estilizado com `[&>*]:` — um wrapper
  transparente deixaria esse seletor casando com o wrapper, que não tem caixa.

`data-reveal` é um marcador com o nome do preset, para inspeção. **Nada lê esse atributo** —
nem CSS, nem JavaScript.

### Presets

Quatro, e nenhum a mais.

| Preset | `from` → `to` | Duração | Stagger | Uso |
|---|---|---|---|---|
| `heroReveal` | `opacity 0→1`, `y 12→0` | 1,0 s | **0** | Só o bloco de abertura de uma página |
| `fadeUp` | `opacity 0→1`, `y 16→0` | 0,9 s | 0,08 s | Seções, títulos, blocos editoriais |
| `fadeIn` | `opacity 0→1` | 1,0 s | 0,05 s | Capas, carrosséis, inventários |
| `staggerCards` | `opacity 0→1`, `y 18→0` | 0,75 s | 0,12 s | Grades e listas |

Ease único: `power3.out`. O vocabulário inteiro é opacidade e um deslocamento curto — sem
escala, rotação, blur, parallax ou loop.

`heroReveal` é o único com stagger **zero**, e isso é a definição dele, não um detalhe. Um
hero é uma composição sendo descoberta, não um conjunto sendo montado: um olho que chega
antes do próprio título é a forma mais confiável de fazer uma página parecer uma interface
inicializando, e nenhum valor de stagger acima de zero evita isso por completo. Os dois
tempos de um hero são dois `<Reveal>`, separados por `MOTION_HERO_DELAY` — nunca um grupo
com ritmo interno.

**O que protege a direção de arte é a razão stagger/duração**, sempre uma fração pequena:
9% no texto, 16% nos cards, 5% nos inventários. É isso que faz um grupo se sobrepor numa
única onda em vez de disparar como uma sequência de eventos separados. Acima de uns 20% o
movimento deixa de ler como revelação e passa a ler como interface se montando.

> **O Figma não tem spec de movimento.** Nenhum valor de timing, ease ou travel existe no
> arquivo. Esses números não são transcritos: são decisões documentadas em `presets.ts`. Se o
> design definir movimento depois, tudo muda em um arquivo só.

### A regra central: nada visível é escondido

O HTML que o servidor manda é a página pronta. **Não existe CSS que esconda nada**, não existe
estado inicial invisível e não existe `<noscript>` de resgate. Se o GSAP não rodar — script
desligado, bundle falhado, um crawler lendo o markup, uma aba em background — todas as seções
aparecem completas.

Isso divide o trabalho em dois, pelo lugar onde o grupo está quando a página monta:

| Onde está ao montar | O que acontece |
|---|---|
| **Fora da tela** | O leitor ainda não viu, então esconder não custa nada. Recebe o preset como escrito, seguro por um ScrollTrigger até entrar em vista. |
| **Na tela** (o hero, e tudo acima da dobra) | O preset é usado **sem o canal de opacidade**: o grupo ainda faz sua subida curta, mas está legível em todos os quadros dela. Toca na hora, sem trigger. |

Consequência que vale registrar: **na prática todo hero é um deslocamento de 12px sem fade**,
porque todo hero está acima da dobra. A opacidade declarada em `heroReveal` é o que um hero
receberia se algum dia ficasse abaixo dela. Reverter isso significaria reabrir a decisão de
estado inicial visível.

Não é um quarto preset — são os mesmos três com um canal omitido. É por isso que `fadeIn`,
que só tem opacidade, simplesmente não anima acima da dobra: não sobra nada dele depois da
regra, e uma capa que já está na tela não tem de onde chegar.

A medição acontece uma vez, na montagem.

### Reduced motion

`gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. O tween não é criado — não é
criado e encurtado. A query é viva: quem liga a preferência no meio da sessão tem os tweens
revertidos.

Como nada é escondido de antemão, reduced motion não precisa de um segundo mecanismo: com a
preferência ligada, a página simplesmente é o que o servidor mandou.

O hover das capas usa a variante `motion-safe:` do Tailwind nos dois transforms, então com
movimento reduzido a capa ainda responde ao mouse — só não se mexe.

### Motion tokens

Ficam em dois lugares, de propósito, e cada arquivo referencia o outro.

**`globals.css` (`@theme`)** — o que o CSS de fato dirige:

| Token | Valor | Onde |
|---|---|---|
| `--ease-editorial` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Equivalente CSS do `power3.out` (easeOutCubic); hover da capa |
| `--duration-hover` | `300ms` | Resposta do hover |
| `--shadow-cover-raised` | `0 18px 24px 0 #00000026` | Estado elevado de `--shadow-cover` |

> O Tailwind v4 **não tem namespace `--duration-*`** (só `--ease-*`). Sem a utility
> `@utility duration-hover` declarada logo abaixo do bloco de tipografia, `duration-hover` é
> uma classe inexistente e a transição cai silenciosamente no default de 150ms do Tailwind.
> Isso já aconteceu uma vez.

**`src/motion/presets.ts`** — os tempos de entrada, porque quem os toca é o GSAP e não o CSS.
Um token que nenhuma folha de estilo lê envelhece sem ninguém perceber.

Nenhum valor de movimento solto em JSX.

### Componentes animados

| Página | Grupos | Presets |
|---|---|---|
| Home | 16 | Hero em dois tempos; cabeçalhos como bloco; gêneros e listas em `staggerCards`; carrosséis em `fadeIn` |
| Sobre | 4 | Hero em dois tempos; heading; princípios em `staggerCards` |
| Catálogo | 3 | Hero; grade |
| Livro | 5 | Capa em `fadeIn`; coluna de informação; autor; recomendados |
| Autor | 4 | Retrato+nome, depois a biografia; heading; grade |
| Blog (arquivo e tag) | 2 | Hero; cards |
| Post | 4 | Capa; título em dois tempos; artigo e sidebar |
| Eventos | 5 | Hero; duas listas; heading |
| Cursos | 5 | Hero; grade de cursos; heading; materiais em `fadeIn` |
| Comunidades | 3 | Hero; grade |
| Podcast | 5 | Hero em dois tempos; artwork; heading; episódios |
| Imprensa | 7 | Hero; dois headings; menções; cartão da assessoria; mídia kit em `fadeIn` |
| Publique, Contato | 2 cada | Hero, herdado de `PageHeroBlock` |

**A cascata do hero mora dentro de `PageHeroBlock`**, não nas chamadas. Sete rotas usam esse
bloco; um wrapper em cada chamada animaria o hero como uma unidade só e sairia de sincronia
com o tempo.

**Todo hero entra em dois tempos, nunca em quatro.** O que nomeia a página — olho e título —
e depois o que a explica, separados por `MOTION_HERO_DELAY` (0,35 s, um terço da duração do
preset). Os dois usam `heroReveal`, cujo stagger é zero. Vale para a Home, `PageHeroBlock`
(sete rotas), Sobre, Podcast, o retrato do autor e o bloco de título do post — seis pontos,
treze grupos.

Há um segundo token de pausa, `MOTION_COLUMN_DELAY` (0,2 s), e ele **não** é o do hero: é a
coluna de informação do livro seguindo sua capa, e a sidebar do post seguindo o artigo.
Blocos que ficam ao lado de algo em vez de embaixo, animados com `fadeUp`. Mantêm a pausa
mais curta porque o preset deles é mais curto.

**Gramática de aplicação:**

- **Hero** usa `heroReveal` e entra em dois tempos — título, depois texto de apoio. É o único
  lugar onde um bloco se divide, e mesmo ali nunca em mais de dois. A arte que acompanha um
  hero (a capa do podcast, a capa do post) continua em `fadeIn`: é imagem, não texto de
  abertura.
- **Cabeçalho de seção** entra como bloco. Um título que se separa da linha de apoio lê como
  interface se montando, que é o oposto da intenção.
- **Cards** usam `staggerCards`, em grades e listas.
- **Carrosséis nunca recebem stagger.** A fileira já está parcialmente fora da tela; uma
  cascata animaria capas que ninguém vê. Recebem um `fadeIn` como bloco.
- **Inventários** (materiais gratuitos, mídia kit) usam `fadeIn`. São o conteúdo de uma
  promessa, lidos como uma coisa só — não cards para navegar.
- **Controles nunca animam sozinhos.** Breadcrumb, `BackLink`, toolbar do catálogo, formulário
  de materiais, controle de áudio do episódio: um controle que aparece devagar é um controle
  que ainda não pode ser usado. O CTA dentro de um card chega com o card.
- **Decorações não animam.** As espirais são marca d'água e ficam fora dos grupos.

### Hover das capas — por que é CSS e não GSAP

`BookCard` continua Server Component. Um hover em GSAP precisa de listeners, listeners
precisam de client component, e esse é o componente mais repetido do site — cinco na Home, até
vinte no catálogo, cinco em cada página de livro e de autor. O efeito é elevação de 4px,
escala 1.01 e sombra mais profunda: transform e box-shadow, que o navegador compõe na GPU de
graça.

```
motion-safe:group-hover:-translate-y-1  motion-safe:group-hover:scale-[1.01]
group-hover:shadow-cover-raised  ease-editorial  duration-hover
```

A sombra fica fora da guarda `motion-safe:` de propósito: com movimento reduzido a capa
responde sem se mexer.

### Performance

- **Um ScrollTrigger por grupo**, ancorado no primeiro elemento — cinco cards custam um
  trigger, não cinco, e a cascata segue a ordem em que foram escritos.
- Grupos que tocam no carregamento **não criam trigger nenhum**.
- O ScrollTrigger dirige todas as instâncias a partir de **um único listener de scroll**
  compartilhado. A contagem é custo de bookkeeping, não de listener.
- `once: true` — a entrada não se repete ao rolar de volta.
- `clearProps: "opacity,transform"` devolve o elemento ao CSS no fim, o que também é o que
  impede a entrada GSAP e o hover CSS de brigarem pelo mesmo `transform`.
- `gsap.context()` + `gsap.matchMedia()`, ambos revertidos no unmount.
- `<Reveal>` lê os filhos **uma vez, na montagem**. O que aparece depois — catálogo filtrando,
  página de resultados trocando — entra sem entrada. Re-animar uma grade a cada tecla é
  exatamente o que este sistema existe para evitar.

### Ao mexer nisso

1. Animação é apresentação. Se um ajuste de movimento exigir tocar em `lib/data`, `types/` ou
   numa rota, a mudança está errada.
2. Não escreva timeline em componente. Se `<Reveal>` não resolve, o lugar de resolver é
   `animations.ts`.
3. Não adicione preset sem necessidade real. Três cobrem o site inteiro hoje.
4. Nunca esconda conteúdo por CSS esperando o GSAP revelar. Foi assim na primeira versão e foi
   revertido: acoplava a legibilidade da página à execução da animação.

---

## 20. Auditoria final

**Front-end pronto para integração com backend/CMS, com ressalvas exclusivamente
relacionadas a conteúdo editorial e decisões futuras de operação.**

A fronteira de dados foi verificada por varredura: **nenhum arquivo fora de `lib/data`
importa `lib/content` ou `lib/mocks`**. As relações foram verificadas por comparação: zero
gêneros órfãos, zero `authorIds` quebrados, todos os links internos resolvem.

### Ressalvas

| Ressalva | Impacto | Depende de |
|---|---|---|
| **Slugs temporários de autores** | Trocar depois quebra links compartilhados | Editorial |
| **34 URLs provisórias** para `/contato` | Nenhum link morto, nenhum destino certo | Editorial, Comercial, Assessoria |
| **`publishedAt` dos episódios** | Destaque do podcast inerte | Editorial **e** modelo do CMS |
| **Ausência de sitemap/robots** | Não bloqueia integração; bloqueia publicação | Desenvolvimento |
| **Ausência de testes automatizados** | Verificação toda manual | Decisão |

**Nenhuma é estrutural.** Conteúdo real ausente não é falha do front quando a estrutura
para recebê-lo está pronta, tipada e ligada.

> **Uma ressalva saiu desta lista em 27/08/2026.** `Post.author` era texto livre enquanto
> o livro já usava relação, e a inconsistência foi fechada antes do handoff: agora é
> `Post.authorIds`, plural, resolvido pela mesma função do livro. Era a única ressalva que
> teria virado migração de dados depois de o CMS ser modelado.

---

## 21. Checklist de handoff

### Front-end

- [x] Build funcionando — 15 rotas de produto, 34 páginas geradas
- [x] `typecheck` e `lint` passando
- [x] Rotas funcionando, todos os links internos resolvem
- [x] Dados desacoplados — 0 violações da fronteira `lib/data`
- [x] Estados vazios definidos e implementados
- [x] Design System documentado — ver abaixo
- [ ] `sitemap.ts` e `robots.ts` — **antes da publicação pública**
- [ ] Suíte de testes

### Backend

- [ ] CMS definido
- [ ] Modelo das 11 entidades
- [ ] API definida
- [ ] Uploads definidos
- [ ] Permissões definidas
- [ ] Endpoints dos 4 formulários
- [ ] Revalidação na publicação
- [ ] Estados rascunho / revisão / publicado
- [ ] Metadados de imagem: alt, crédito, legenda

### Editorial

- [ ] Conteúdo real enviado
- [ ] Imagens enviadas com crédito
- [ ] Links reais enviados
- [ ] Slugs de autor definidos **antes** de qualquer publicação
- [ ] URL do X

---

## Anexo — Design System

Tokens em `src/app/globals.css`, bloco `@theme`. **Não há hex solto no JSX.**

### Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#181713` | Texto e bandas escuras |
| `--color-bg` | `#fafafa` | Fundo da página |
| `--color-paper` | `#ffffff` | Superfícies |
| `--color-muted` | `#71717a` | Texto secundário e hairlines (`border-muted/20`) |
| `--color-mata` | `#283b2a` | Verde de marca |
| `--color-terra` | `#7a4e2d` | Terracota de marca |
| `--color-areia` | `#d8cdb8` | Sublinhado do botão `link` |
| `--color-watermark` | `#d4d4d8` | Fundo tingido de seção |

### Tipografia

Três famílias: **IBM Plex Serif** (slab), **Jost** (corpo), **Playfair Display** (display).

Utilitários: `text-display`, `text-h2`, `text-slab-h2`, `text-slab-sub`, `text-slab-menu`,
`text-slab-small`, `text-body-lg`, `text-body`, `text-body-sm`, `text-field`.

Cada um corresponde a uma variável do Figma e carrega no comentário a qual. **Preferir o
utilitário a recompor famílias e tamanhos no JSX.**

### Espaçamento e efeitos

| Token | Valor |
|---|---|
| `--spacing-gutter` | `60px` — coluna de conteúdo de 1320 em 1440 |
| `--spacing-section` | `50px` |
| `--shadow-card` | `0 4px 6px 0 #00000017` |
| `--shadow-cover` | `0 10px 10px 0 #0000001a` — só capas de livro |
| `--shadow-cover-raised` | `0 18px 24px 0 #00000026` — estado elevado do anterior, no hover |
| `--radius-panel` | `10px` |

### Movimento

| Token | Valor |
|---|---|
| `--ease-editorial` | `cubic-bezier(0.215, 0.61, 0.355, 1)` — equivalente CSS do `power3.out` |
| `--duration-hover` | `300ms` — via a utility `duration-hover`, declarada no mesmo arquivo |

Os tempos de **entrada** não estão aqui: ficam em `src/motion/presets.ts`, porque quem os
toca é o GSAP e não o CSS. Ver a seção 19. `--shadow-cover-raised`, `--ease-editorial` e
`--duration-hover` são os três tokens que **não** vêm do Figma — o arquivo não desenha hover
nem especifica movimento —, e cada um carrega no comentário a decisão que representa.

### Componentes compartilhados

`components/ui/`: `Accordion`, `ArrowRightIcon`, `BackLink`, `Breadcrumb`, `Button`,
`Carousel`, `Container`, `Emphasis`, `EmptyState`, `FieldShell`, `FileUpload`, `FormField`,
`GenreTag`, `Logo`, `PageHeroBlock`, `PageNav`, `Panel`, `PlayIcon`, `Section`,
`SectionHeading`, `SelectField`, `SpiralDecoration`, `TimelineItem`.

### Duas duplicações que são deliberadas

**`PostCard` e `BlogPostCard`** parecem candidatos a fusão e não são. O da Home tem 680 de
largura, hairline inferior, sem data e sem ação; o do arquivo tem caixa fechada com sombra,
432 de largura, tag e data numa linha, e "Ler Completo". Quatro de cinco características
divergem — uma prop `variant` produziria dois layouts com um nome só.

**`BookCard` e `BlogPostCard`** compartilham só o fato de serem cards clicáveis. Nada mais.

### Regra de navegação dos cards

> **Cards são elementos de descoberta e navegação. Ações comerciais ficam apenas na página
> individual.**

O card inteiro é o link — não há botão interno, porque âncora dentro de âncora é HTML
inválido. Vale para `BookCard` (4 contextos), `PostCard` e `BlogPostCard`.

### Responsividade

Breakpoints padrão do Tailwind. **Só existem frames desktop 1440 no Figma** — o
comportamento em tablet e mobile segue os padrões que o projeto estabeleceu (grades de card
em 1 → 2 → 3 colunas), não especificação. Verificado em 1440, 834 e 390.
