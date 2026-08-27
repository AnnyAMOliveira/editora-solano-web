# Editora Solano — Website

Plataforma editorial institucional da Editora Solano (Londrina/PR), reunindo:

- catálogo de livros;
- autores;
- conteúdos editoriais;
- eventos;
- podcast;
- cursos;
- comunidades;
- imprensa.

O frontend foi construído para receber um CMS ou uma API **sem alteração dos
componentes visuais**. Toda origem de dados está isolada em `src/lib/data/` —
trocar arquivo local por integração remota é reescrever o corpo dessas funções,
e nenhuma página, layout ou componente muda.

> **Estado:** frontend implementado, validado e preparado para integração
> CMS/backend. Não é uma versão publicada — o conteúdo em `src/lib/mocks/` e
> parte de `src/lib/content/` é temporário e não pode chegar ao ar.
> Ver [`docs/HANDOFF_FINAL.md`](docs/HANDOFF_FINAL.md).

---

## Stack

| | |
|---|---|
| **Next.js 16** | App Router, Server Components por padrão |
| **React 19** | |
| **TypeScript** | modo estrito, sem `any` |
| **Tailwind CSS 4** | CSS-first: os tokens vivem no `@theme` de `src/app/globals.css` |
| **GSAP 3** | com ScrollTrigger; confinado a `src/motion/` |
| **@phosphor-icons/react** | ícones, sempre pela entrada `/dist/ssr` |
| **pnpm** | gerenciador de pacotes |

---

## Requisitos

- **Node.js 20+** — desenvolvido e validado em 24.19
- **pnpm 11+** — o repositório declara `packageManager: pnpm@11.22.0`

Usar `npm` ou `yarn` corrompe o lockfile.

---

## Instalação

```bash
pnpm install
```

---

## Execução

```bash
pnpm dev
```

A aplicação sobe em **http://localhost:3000**.

---

## Scripts

```bash
pnpm dev         # servidor de desenvolvimento com hot reload
pnpm build       # build de produção; gera as rotas estáticas e SSG
pnpm lint        # ESLint com a configuração do Next
pnpm typecheck   # tsc --noEmit, sem emitir arquivos
```

`pnpm lint` e `pnpm typecheck` devem passar antes de qualquer entrega. Não há
suíte de testes automatizados — a verificação atual é build, lint, typecheck e
conferência manual nos três breakpoints (1440, 834 e 390).

---

## Estrutura do projeto

```text
src/
├── app/          # rotas do App Router; páginas apenas compõem
├── components/   # componentes de apresentação, por domínio + ui/
├── layouts/      # composições de página, montadas a partir de components/
├── types/        # interfaces das entidades e do conteúdo
├── lib/          # conteúdo aprovado, camada de dados, utilitários
└── motion/       # Motion System em GSAP; único lugar que importa a biblioteca
```

| Pasta | Responsabilidade |
|---|---|
| `app/` | Uma pasta por rota. A página pede dados à camada de dados e distribui aos layouts. Não contém texto editorial nem lógica de busca. |
| `components/` | Renderizam o que recebem por prop. `ui/` guarda os primitivos compartilhados; as demais pastas são por domínio (`books/`, `blog/`, `authors/`…). |
| `layouts/` | Seções inteiras de página — o hero da Home, a grade do catálogo, o detalhe do livro. Compõem componentes; não buscam dados. |
| `types/` | Uma interface por entidade. É o contrato que a camada de dados precisa entregar. |
| `lib/` | `content/` (texto institucional aprovado), `data/` (fronteira de integração), `mocks/` (dados temporários) e utilitários. |
| `motion/` | Presets, hook e o componente `<Reveal>`. Nenhum outro arquivo importa `gsap`. |

---

## Arquitetura resumida

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

Duas regras sustentam isso:

- **Componentes não acessam dados.** Recebem tudo por prop, tipado. Nenhum
  componente sabe se o dado veio de um arquivo local, de um CMS ou de uma API.
- **Páginas não conhecem a origem dos dados.** Chamam uma função de
  `lib/data/`, recebem o que precisam e distribuem. A fronteira é verificável:
  nenhum arquivo fora de `lib/data/` importa `lib/content` ou `lib/mocks`.

---

## Documentos relacionados

| Documento | Para quem | O que traz |
|---|---|---|
| [`docs/HANDOFF_FINAL.md`](docs/HANDOFF_FINAL.md) | Entrega técnica | Contexto, escopo, entidades, rotas, pendências e checklist final |
| [`docs/HANDOFF_DEV.md`](docs/HANDOFF_DEV.md) | Backend e CMS | Arquitetura de dados em profundidade, integração, Motion System |
| [`docs/AUDITORIA_CONTEUDO.md`](docs/AUDITORIA_CONTEUDO.md) | Editorial | O que é texto aprovado, o que é placeholder e o que falta |
| [`docs/DESIGN_SYSTEM.html`](docs/DESIGN_SYSTEM.html) | Design e frontend | Tokens, tipografia, componentes, estados e Motion System |
| [`CLAUDE.md`](CLAUDE.md) | Quem for desenvolver | Convenções, arquitetura e regras do projeto |
