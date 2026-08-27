# Editora Solano — Front-end

Aplicação web da Editora Solano: catálogo editorial, blog e presença institucional.

**Regra principal:** não construir páginas visuais isoladas. Construir um sistema digital escalável — componentes reutilizáveis, tipagem consistente, arquitetura preparada para CMS e APIs.

O projeto articula quatro dimensões que devem ser respeitadas simultaneamente: design editorial, experiência do usuário, arquitetura técnica e manutenção futura.

---

## Stack

Exclusivamente:

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **pnpm** como gerenciador de pacotes

Não introduzir bibliotecas adicionais sem sinalizar antes: dependência nova é decisão técnica que passa por revisão.

### Comandos

```bash
pnpm dev         # servidor de desenvolvimento
pnpm build       # build de produção
pnpm lint        # lint
pnpm typecheck   # verificação de tipos
```

Rodar `pnpm lint` e `pnpm typecheck` antes de considerar qualquer entrega concluída. Usar sempre `pnpm` — nunca `npm` ou `yarn`, para não corromper o lockfile.

---

## Convenções de nomenclatura

**Código em inglês.** Nomes de componentes, variáveis, funções, props, tipos, campos de interface e comentários. O conteúdo editorial exibido ao usuário é em português; o código que o carrega, não.

| Elemento | Convenção | Exemplo |
|---|---|---|
| Componentes | PascalCase | `BookCard`, `PostList`, `SiteHeader` |
| Arquivos de componente | PascalCase | `BookCard.tsx` |
| Pastas | kebab-case | `components/book-card/`, `src/blog-post/` |
| Tipos e interfaces | PascalCase | `Book`, `Post`, `BookCardProps` |
| Variáveis e funções | camelCase | `bookList`, `formatPublishDate` |
| Constantes globais | SCREAMING_SNAKE_CASE | `DEFAULT_PAGE_SIZE` |
| Rotas em `app/` | kebab-case | `app/books/[slug]/`, `app/blog/` |

Props booleanas com prefixo verbal (`isLoading`, `hasCover`). Tipo de props nomeado a partir do componente (`BookCardProps`).

---

## Papel do Claude Code

Assistente de implementação de front-end. Escopo:

- interpretar o arquivo Figma conectado via MCP;
- traduzir frames em componentes React;
- estruturar páginas e layouts;
- extrair e manter a biblioteca de componentes;
- manter fidelidade visual ao design.

**Fora de escopo:**

- decisões visuais próprias quando existe referência no Figma. Se o Figma não cobre um caso (estado, breakpoint, variação), perguntar em vez de inventar;
- **criação ou manutenção de conteúdo editorial final.** O Claude Code constrói a estrutura que recebe o conteúdo, não o conteúdo. Não escrever textos institucionais, descrições de livros, biografias de autores, títulos de seção ou mensagens de interface como se fossem definitivos. Dado temporário nunca é conteúdo final.

O desenvolvedor humano é responsável pela revisão final, integrações de backend, APIs, segurança e publicação.

---

## Fonte de verdade visual

**O Figma é a referência oficial.** Consultar antes de implementar, não depois.

Respeitar sempre:

| | |
|---|---|
| composição | hierarquia visual |
| tipografia | cores |
| espaçamentos | proporções |
| grid | comportamento responsivo |

Proibido:

- substituir elementos do design por soluções genéricas ou por defaults de biblioteca;
- simplificar layouts sem autorização;
- aproximar valores "no olho" quando o token existe no arquivo.

---

## Processo obrigatório antes de escrever código

Para qualquer página ou componente novo:

1. **Analisar** o frame correspondente no Figma.
2. **Identificar** seções, componentes, elementos repetidos, estados e comportamento responsivo.
3. **Propor** a estrutura React (árvore de componentes, props, onde os dados entram).
4. **Mapear** o que é reutilizável e o que é específico daquela página.
5. **Só então implementar.**

Pular as etapas 1–4 produz página monolítica e retrabalho. Se o frame estiver ambíguo ou incompleto, sinalizar antes de codificar.

---

## Arquitetura de pastas

```
src/
├── app/            # rotas (App Router)
├── components/
│   ├── ui/         # primitivos: botão, input, badge, tipografia
│   ├── layout/     # header, footer, menu, containers, grid
│   ├── books/      # catálogo e páginas de livro
│   └── blog/       # listagem e post
├── layouts/        # composições de página
├── lib/            # utilitários, helpers, camada de obtenção de dados
│   └── content/    # textos institucionais aprovados (permanente)
├── types/          # interfaces e tipos compartilhados
├── content/        # dados temporários de entidades — substituídos pelo CMS
├── styles/         # globals, tokens, config de tema
└── assets/         # imagens e ícones estáticos
```

Componente que serve a mais de um domínio sobe para `ui/` ou `layout/`. Componente usado por uma única página pode ficar colocalizado, mas deve ser sinalizado.

---

## Componentização

Evitar páginas monolíticas. Sempre que houver repetição visual, extrair componente.

Candidatos esperados: `Header`, `Footer`, `Menu`, botões, cards, seções, blocos editoriais, componentes de livro, componentes de blog.

Regras:

- **Componentes recebem dados por props.** Sem conteúdo fixo (texto, imagem, link) dentro de componente reutilizável.
- Props tipadas em TypeScript, sem `any`.
- Um componente que cresceu além de uma responsabilidade clara deve ser dividido.

---

## Design System

Estruturar **antes** de montar páginas complexas.

**Cores** — tokens extraídos do Figma, declarados na config do Tailwind. Sem hex solto no JSX.

**Tipografia** — família, pesos, tamanhos, entrelinha e hierarquia conforme o Figma. Preferir componentes ou classes utilitárias nomeadas a repetir combinações de classes.

**Espaçamento** — escala consistente derivada do Figma. Sem valores arbitrários espalhados.

**Componentes** — biblioteca em `components/ui/`, construída incrementalmente conforme os frames exigem.

---

## Responsividade

Todo componente cobre **desktop, tablet e mobile**. Entrega só-desktop não é entrega.

A adaptação segue o comportamento definido no Figma. Onde o Figma não define um breakpoint, perguntar em vez de improvisar.

---

## Modelos de dados

Conteúdo vem de fonte externa (CMS/API). Componentes são preparados para receber esses dados — **nunca** com conteúdo escrito dentro deles.

```ts
// src/types/post.ts
export interface Post {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
  slug: string;
}
```

```ts
// src/types/book.ts
export interface Book {
  cover: string;
  title: string;
  author: string;
  description: string;
  category: string;
  series: string;
  publishingInfo: string;
  links: { label: string; url: string }[];
}
```

Os campos são os definidos no briefing, traduzidos conforme a convenção de código em inglês. Se o CMS devolver chaves em português, a conversão acontece numa camada de mapeamento em `lib/` — os tipos internos permanecem em inglês, sem misturar idiomas dentro dos componentes.

Opcionalidade, tipos exatos (`Date` vs `string` em `publishedAt`) e campos adicionais devem ser confirmados com o desenvolvedor antes de propagar pelo projeto.

**Catálogo:** a editora tem múltiplos livros, séries e coleções, e o número cresce. A estrutura precisa suportar expansão — nada de página isolada por livro sem componentes compartilhados.

**Blog:** integração com CMS é futura. Estruturar desde já assumindo dados externos; usar mocks tipados durante o desenvolvimento, em `content/` ou `mocks/` e claramente marcados como temporários.

---

## Conteúdo administrável e CMS

Nem todo conteúdo do site precisa ser administrado por CMS. A classificação abaixo é obrigatória antes de estruturar qualquer página.

### Dois tipos de conteúdo

**Conteúdo institucional** — texto aprovado, de baixa rotatividade, ligado a decisões de marca: manifesto, textos institucionais, apresentação do método, posicionamento editorial, textos de seções fixas, rótulos editoriais, mensagens de estado vazio. Vive em `lib/content`, versionado no código. Alterá-lo é decisão de marca, não operação editorial — e por isso pode permanecer no código enquanto não houver necessidade de alteração frequente.

**Entidade administrável** — conteúdo de atualização frequente, dependente da equipe editorial:

- livros;
- autores;
- posts;
- eventos;
- episódios;
- cursos;
- comunidades.

Toda entidade administrável precisa de:

- tipo próprio em `types/`;
- camada de dados própria;
- componentes independentes da origem dos dados.

**Não transformar texto institucional em CMS sem necessidade.** Cada campo administrável é superfície de manutenção; criar administração para conteúdo que muda uma vez por ano é custo sem retorno.

### Separação de camadas

| Camada | Onde | Responsabilidade |
|---|---|---|
| Conteúdo institucional | `lib/content` | texto aprovado, permanente, versionado |
| Dados de entidades | `content/` | temporário nesta fase, substituído pelo CMS depois |
| Tipos | `types/` | interfaces que representam as entidades |
| Obtenção | `lib/` | funções que buscam e normalizam os dados |
| Apresentação | `components/` | renderiza o que recebe por props |

`lib/content` e `content/` não são a mesma coisa e não se misturam. O primeiro é definitivo; o segundo é descartável e some quando o CMS entrar.

Páginas em `app/` apenas **compõem**: pedem dados à camada de obtenção e distribuem aos componentes. Não contêm conteúdo editorial nem lógica de busca inline.

### Regras

- Componentes não contêm conteúdo editorial fixo — texto, título, imagem, link ou lista. Vale para os dois tipos de conteúdo.
- Toda entidade administrável tem tipo em `types/`, mesmo enquanto os dados são temporários.
- Dados temporários de entidades vivem em `content/`, isolados e marcados como tal. Nunca dentro de componentes ou páginas.
- Acesso a dados passa sempre pela camada em `lib/`, mesmo quando a origem é arquivo local — é o ponto único que será trocado depois.
- Na dúvida sobre a classificação de um conteúdo, perguntar. Classificar errado gera retrabalho estrutural, não cosmético.

### Objetivo

A troca de dados temporários por CMS/API acontece **inteiramente na camada de dados**, sem tocar em componentes ou código de apresentação.

O teste é este: um administrador precisará poder criar, editar, remover, atualizar status, alterar links e reorganizar entidades — tudo isso sem que uma linha de componente mude. Se uma dessas ações exigiria editar código de apresentação, a estrutura está errada.

**Não implementar CMS nesta fase.** Preservar o caminho para a integração, não antecipá-la.

---

## Dados de demonstração e estados vazios

### Dados de demonstração

Durante o desenvolvimento visual, usar dados de demonstração **realistas** — volume, comprimento de texto e proporções compatíveis com o conteúdo real — para permitir validação de layout, componentes e responsividade. Títulos de uma palavra e imagens quadradas escondem problemas que só aparecem em produção.

Esses dados são temporários e vivem em `content/`, nunca dentro de componentes ou páginas.

Quando a fonte administrativa/CMS existir: os dados reais substituem os temporários **sem alteração em componentes**. Se a troca exigir editar um componente, a separação de camadas falhou.

**Nenhum dado de demonstração pode chegar a uma versão pública.** Dado fictício com aparência de conteúdo real — um livro que não existe, um evento inventado, um autor fabricado — é erro editorial, não apenas técnico. Placeholder nunca é conteúdo final, mesmo quando parece adequado. Ao entregar qualquer build destinado a publicação, verificar explicitamente que nada em `content/` está sendo renderizado.

### Estados vazios

Seções alimentadas por conteúdo administrável **não desaparecem automaticamente** quando não há dados.

Em páginas editoriais e institucionais, quando a seção faz parte da narrativa da página, a estrutura visual é preservada: título, espaçamento e enquadramento permanecem, e a lista vazia recebe uma mensagem editorial.

Exemplos de mensagem:

- "Nenhum evento agendado no momento."
- "Novos lançamentos serão apresentados em breve."
- "Em breve, novos conteúdos."

Regras:

- **O texto do estado vazio é conteúdo institucional**, não string de interface nem entidade administrável. Vive em `lib/content`, junto com os demais textos aprovados — é fala da editora e envolve decisão de marca.
- Não inventar mensagens de estado vazio. Se uma seção não tem texto definido, perguntar antes de implementar.
- Não preencher lista vazia com placeholder fictício, skeleton permanente ou conteúdo de exemplo.
- **Ocultar a seção é exceção**, não padrão — só quando o autor determinar explicitamente que aquela seção é acessória e some sem dados. A decisão é editorial, não do Claude Code.

---

## Padrões de código

Prioridades, nesta ordem:

1. Clareza
2. Manutenção
3. Reutilização
4. Fidelidade ao Figma

Evitar: código duplicado, componentes gigantes, estilos espalhados, soluções temporárias não documentadas.

---

## Checklist antes de finalizar uma entrega

**Visual** — comparar com o Figma: espaçamentos, alinhamentos, tamanhos, cores, tipografia, responsividade nos três breakpoints.

**Técnica** — organização dos componentes, reutilização efetiva, tipagem, ausência de duplicação, pontos que vão gerar dívida.

---

## Formato do relatório de entrega

Ao concluir uma funcionalidade relevante, informar:

- arquivos criados ou modificados;
- componentes adicionados à biblioteca;
- decisões técnicas tomadas e por quê;
- dependências utilizadas;
- pontos que precisam de integração (backend, CMS, API);
- divergências em relação ao Figma e o motivo.

Todo código deve estar pronto para revisão técnica.

---

## A definir

- **Arquivo Figma de referência** — URL e node ID do frame raiz, para o Claude Code localizar o design via MCP sem depender de busca.
- **Testes** — ainda não há comando de teste definido. Se for adotado, registrar aqui.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
