# Inventário de conteúdo — Editora Solano

O que no site é texto aprovado da editora, o que é dado posto ali **apenas para validar
layout**, e o que precisa chegar da equipe editorial antes de qualquer publicação.

| | |
|---|---|
| Escopo | `src/lib/content/` · `src/lib/mocks/` · `src/lib/data/` · `src/lib/navigation.ts` |
| Rotas auditadas | 12 |
| Última revisão | 27/08/2026 |
| Revisão anterior | 26/08/2026 — [ver o que mudou](#o-que-mudou-nesta-revisão) |

---

## A regra que organiza este documento

**Dado temporário existe para validar composição, espaçamento, responsividade e
comportamento de componente. Ele não declara quantidade.**

Nove retratos no carrossel da Home não são um pedido de nove autores. São nove porque o
frame do Figma repete "Nome do autor" nove vezes, e porque nove é o suficiente para o
carrossel transbordar e as setas aparecerem. A quantidade real de autores, livros,
episódios, eventos ou de qualquer outra entidade é decisão da editora e não está escrita
em lugar nenhum deste projeto.

A revisão anterior deste documento não fazia essa separação e chegou a pedir *"nome real
dos 9 autores"* — o que lê como se nove fosse um requisito. Não é. Toda linha deste
inventário agora diz **quantos existem hoje e por quê**, nunca quantos deveriam existir.

**Legenda**

| | |
|---|---|
| **Definitivo** | texto aprovado da editora, permanece como está |
| **Validação visual** | placeholder para conferir layout; sai antes de publicar |
| **Estrutura pronta** | camada correta, aguardando conteúdo real |

---

# 1. Conteúdo institucional definitivo

Texto da editora, aprovado, de baixa rotatividade. Vive em `lib/content/`, versionado no
código. Não precisa de CMS — alterá-lo é decisão de marca, não operação editorial.

| Arquivo | Conteúdo | Status |
|---|---|---|
| `content/about.ts` | Hero da Sobre + Método Solano (5 princípios) | Definitivo |
| `content/publish.ts` | Hero + 4 condições de envio de originais | Definitivo |
| `content/home.ts` | Copy das 7 seções da Home + ano da agenda | Definitivo |
| `content/genres.ts` | Taxonomia oficial — 8 gêneros do catálogo | Definitivo |
| `content/submission-genres.ts` | 7 gêneros aceitos para submissão | Definitivo |
| `content/contact.ts` | Hero, sede (CNPJ e endereço reais), 3 e-mails reais | Definitivo |
| `content/courses.ts` | Hero, 3 cursos, 3 materiais, intro dos materiais | Definitivo |
| `content/communities.ts` | Hero + 4 comunidades (nomes, cadência, status) | Definitivo |
| `content/events.ts` | Hero, "Já Aconteceu", rótulo do CTA | Definitivo |
| `content/podcast.ts` | Apresentação do programa "Antes do Livro" + capa | Definitivo |
| `content/press.ts` | Hero, cartão da assessoria (e-mail real), 4 itens do mídia kit | Definitivo |
| `content/catalog.ts` | Hero, placeholder da busca, rótulo do filtro | Definitivo |
| `content/book.ts` | Rótulos da página de livro + os 3 rótulos comerciais | Definitivo |
| `content/publishing-steps.ts` | As 5 etapas do processo editorial | Definitivo |
| `lib/navigation.ts` | Menu, rodapé, razão social, CNPJ, endereço, tagline, ano | Definitivo |
| `app/globals.css` | Tokens de cor, tipo, espaçamento e sombras | Definitivo |

**Definitivo não quer dizer imutável, quer dizer aprovado.** Alguns blocos dentro desses
arquivos ainda são copy provisória à espera de revisão editorial — estão listados em §5.2.

---

# 2. Conteúdo temporário de validação visual

Existe para validar layout, componentes e responsividade com volume realista.
**Nada disto pode chegar a uma versão pública.**

A coluna **Motivo** responde à pergunta que faltava: por que existem *esta* quantidade de
itens.

| Entidade | Qtd. usada | Motivo da quantidade | Arquivo |
|---|---|---|---|
| Autor | **9** | O frame repete "Nome do autor" 9 ×. São necessários ≥ 7 para o carrossel da Home transbordar e as setas aparecerem — abaixo disso o controle nunca seria exercitado | `mocks/authors.ts` |
| Livro | **5** | **Decisão visual do Figma.** 5 capas de 237px em ritmo de 33px somam 1317px — exatamente a coluna de conteúdo de 1320. A fileira fecha na borda por construção | `mocks/books.ts` |
| Post | **3** | Preenchimento. O frame da Home desenha 3 cartões; o do arquivo desenha 6. Nenhum dos dois é limite | `mocks/posts.ts` |
| Episódio | **5** | Preenchimento. Só o #011 tem título real; os outros 4 são "Nome do Episodio" repetido pelo frame | `content/podcast.ts` |
| Evento futuro | **4** | **Decisão visual na Home** (o preview corta em 4). No conteúdo é preenchimento: os quatro são o mesmo lançamento repetido | `content/events.ts` |
| Evento passado | **4** | Preenchimento. Quatro linhas de "Evento passado" para conferir a lista | `content/events.ts` |
| Aparição na mídia | **3** | Preenchimento. Três linhas idênticas para conferir a coluna | `content/press.ts` |
| Galeria do livro | **3** | Preenchimento — repete a própria capa 3 ×, que é o que o frame faz | `mocks/books.ts` |

**Quantidades que são conteúdo aprovado, não preenchimento** — não confundir com a tabela
acima:

| Entidade | Qtd. | Natureza |
|---|---|---|
| Gênero | 8 | Taxonomia oficial, confirmada pela editoria |
| Curso | 3 | Ofertas reais |
| Material gratuito | 3 | Materiais reais (arquivos ainda não hospedados) |
| Comunidade | 4 | Grupos reais (convites ainda não emitidos) |
| Item do mídia kit | 4 | Itens reais (arquivos ainda não hospedados) |
| Etapa de publicação | 5 | Processo editorial aprovado |
| Canal de contato | 3 | Três e-mails reais. O telefone saiu em 27/08/2026 — a editora não tem atendimento telefônico |

**Livros são um caso misto:** os 5 títulos são obras reais da editora e as capas em
`public/assets/books/` são reais. O que é temporário é o conteúdo em torno delas —
sinopse, ficha técnica, galeria, links e o status comercial.

---

# 3. Auditoria por entidade

Sete perguntas por entidade. **"Ausência quebra?"** e **"Redução mantém composição?"**
foram verificadas no navegador, não deduzidas do código.

## 3.1 Autores

| | |
|---|---|
| **Quantidade hoje** | 9 |
| **Decisão visual ou preenchimento?** | **Preenchimento.** Os nove são "Nome do autor" com a mesma área ("Socioambiental") e o mesmo lorem. Nenhuma decisão de design fixa esse número |
| **Mínimo / máximo suportado** | 0 a ∞. O carrossel aceita qualquer quantidade e esconde as setas quando o conteúdo cabe |
| **Ausência quebra o layout?** | **Não quebra, mas deixa um buraco.** Verificado: com 0 autores a seção mantém olho, título e descrição e abre ≈ 150px de vazio antes da próxima seção. Nada explica a lacuna |
| **Redução mantém a composição?** | **Só acima de 7.** Verificado com 3: os retratos não quebram, as setas somem corretamente, mas a fileira fica **alinhada à esquerda sob um cabeçalho centralizado**. A seção inteira é composta ao centro; a fileira curta desmancha isso |
| **Estado vazio** | **Não existe. Precisa ser criado** |
| **Limite / listagem** | Nenhum. `getAuthors()` devolve todos, e todos viram slide |

**A conta dos 7.** No desktop de 1440px o trilho tem 1380px úteis (a coluna de 1320 mais
os 60 de sangria à direita). Cada retrato ocupa 176px com 30px de intervalo, então *n*
retratos medem `206n − 30`. Isso passa de 1380 a partir de **n = 7**. Com 7 ou mais a
fileira sangra na borda direita como o Figma desenha; com 6 ou menos ela termina no meio
da tela e a composição centralizada se perde.

> **Como este item era descrito antes:** *"Equipe editorial precisa fornecer 9 autores."*
> **Descrição correta:** 9 autores temporários foram usados para validar o carrossel da
> Home. A quantidade real será definida pela equipe editorial. Se forem menos de 7, o
> alinhamento da seção precisa ser revisto no Figma.

## 3.2 Livros

| | |
|---|---|
| **Quantidade hoje** | 5 |
| **Decisão visual ou preenchimento?** | **Decisão visual.** 237 × 5 + 33 × 4 = 1317px, a coluna de conteúdo inteira. O número foi escolhido para a fileira fechar na borda |
| **Mínimo / máximo suportado** | 0 a ∞ na Home (carrossel) e no Catálogo (grade de 2/3/5 colunas) |
| **Ausência quebra o layout?** | Não quebra. Na Home deixa a banda escura com título, botão "Ver Catálogo Completo" e vazio abaixo. No Catálogo cai na mensagem de busca vazia — que não descreve esse caso |
| **Redução mantém a composição?** | Sim, melhor que a de autores: o cabeçalho de Lançamentos é alinhado à esquerda, então uma fileira curta continua coerente. Abaixo de 5 a fileira só não encosta na borda direita |
| **Estado vazio** | **Home: não existe.** Catálogo: existem dois (busca sem resultado, gênero sem livros), mas **não existe um para "catálogo inteiro vazio"** |
| **Limite / listagem** | **Nenhum, e isto é um risco.** `getBooks()` devolve o catálogo inteiro para o carrossel da Home. Com 40 títulos a Home carrega 40 capas. O Catálogo também não pagina |

**Recomendações na página do livro** são o único lugar com limite: `getRecommendedBooks`
corta em 5, que é exatamente uma linha da grade `xl:grid-cols-5`. Sem outro livro no
gênero, a banda inteira não renderiza — decisão certa para página de item, mas sem
mensagem.

**Status comercial** (implementado em 27/08/2026): os 5 estão marcados `"available"` por
inferência dos anos de publicação, **não por decisão da editora**. Ver §5.2.

## 3.3 Podcast

| | |
|---|---|
| **Quantidade hoje** | 5 episódios |
| **Decisão visual ou preenchimento?** | Preenchimento. Só o #011 tem título e resumo reais; os outros 4 repetem "Nome do Episodio" |
| **Mínimo / máximo suportado** | 0 a ∞. Lista vertical simples |
| **Ausência quebra o layout?** | Não. Sobra "Episódios / 2026" e nada abaixo |
| **Redução mantém a composição?** | Sim. É uma lista; qualquer quantidade lê bem |
| **Estado vazio** | **Não existe. Precisa ser criado** |
| **Limite / listagem** | Nenhum, e sem paginação. Documentado como decisão adiada: 5 linhas não pedem paginação, um arquivo de 80 episódios pede |

### O destaque do podcast — três respostas

O briefing desta revisão pergunta por um "episódio em destaque". **Ele não existe.**

**De qual campo vem a imagem de destaque?**
De `PODCAST_CONTENT.hero.cover.src` — um campo institucional fixo em
`lib/content/podcast.ts`, apontando para `/assets/podcast/antes-do-livro.png`. Não tem
nenhuma ligação com a lista de episódios.

O herói de `/podcast` apresenta **o programa**, não um episódio: `PodcastHero` carrega
olho, título ("Antes do Livro"), descrição do programa, capa e um CTA para o Spotify.
Nenhum desses campos é derivado de `Episode`.

> **Inconsistência encontrada.** O texto alternativo da capa diz *"retrato de Chico
> Mendes sobre fundo verde, **com o título do episódio**"*. A arte é de um episódio
> específico, mas o campo é institucional e estático. Se um episódio novo entrar, a arte
> do herói continua a do episódio antigo e nada no código percebe. Ou a capa passa a ser
> a do programa (arte fixa, sem título de episódio), ou o destaque passa a ser
> administrável — são duas decisões diferentes e ambas são editoriais.

**O último episódio publicado pode ser usado como destaque?**
**Hoje, não — e não é uma limitação de layout, é de dado.** `Episode` não tem
`publishedAt`. A camada de dados não ordena nada de propósito: `number` é rótulo tipado
("011"), não chave de ordenação, e ordenar por ele quebraria no dia em que um episódio
fosse renumerado ou publicado fora de sequência. "O último publicado" não é calculável
com os campos que existem.

Fazer isso funcionar exige uma das duas coisas, e **nenhuma delas é decisão do
desenvolvimento**: acrescentar `publishedAt` a `Episode` e assumir que o mais recente é
sempre o destaque; ou aceitar que "destaque" e "mais recente" não são a mesma coisa.

**Existe campo explícito `featuredEpisode`?**
Não. Não existe em `Episode`, em `PodcastContent` nem em lugar nenhum do projeto.

**O que precisa ser decidido antes de implementar qualquer coisa:** o destaque é sempre o
episódio mais recente, ou é uma escolha editorial? Se for escolha, é um campo
`featuredEpisodeId` em `PodcastContent`. Se for automático, é `publishedAt` em `Episode`
mais ordenação na camada de dados. As duas são pequenas de implementar e impossíveis de
adivinhar.

## 3.4 Eventos

| | |
|---|---|
| **Quantidade hoje** | 4 futuros, 4 passados |
| **Decisão visual ou preenchimento?** | **Na Home, decisão visual:** `getFeaturedEvents(limit = 4)` corta em 4 porque é o que o frame desenha. **No conteúdo, preenchimento:** os quatro futuros são o mesmo "Lançamento — O Menino dos Pinheirais", mesmo horário, local "a confirmar" |
| **Mínimo / máximo suportado** | 0 a ∞ nas duas páginas |
| **Ausência quebra o layout?** | Não. Na Home sobra "Agenda / 2026" sobre uma coluna vazia; em `/eventos` sobra o hero |
| **Redução mantém a composição?** | Sim, são listas verticais. Na Home a coluna da agenda divide a linha com a do blog e as duas têm trilhas fixas — uma coluna vazia não estica a outra (verificado) |
| **Estado vazio** | **Não existe em nenhuma das três listas** (Home, próximos, "Já Aconteceu") |
| **Limite / listagem** | **Home: sim, 4.** `/eventos`: nenhum — lista todos os futuros e todos os passados, sem paginação e sem corte por data |

**A Home e `/eventos` leem a mesma origem: confirmado.** `getFeaturedEvents()` chama
`getUpcomingEvents()`, que lê `EVENTS_CONTENT.upcoming` — a mesma constante que a página
usa. A Home recebe `AgendaEvent`, um contrato mais estreito sobre os mesmos objetos, não
uma cópia. A agenda paralela em `mocks/events.ts` foi apagada numa revisão anterior;
nada duplica esses registros hoje.

**"Já Aconteceu" não é ordenado**, de propósito: o conteúdo está do mais antigo para o
mais novo, o design não indica direção e impor uma mudaria o que está na tela.

## 3.5 Cursos

| | |
|---|---|
| **Quantidade hoje** | 3 cursos, 3 materiais |
| **Decisão visual ou preenchimento?** | **Decisão visual e conteúdo aprovado.** A grade é de 3 colunas no Figma e os três cursos são ofertas reais |
| **Mínimo / máximo suportado** | 0 a ∞. Grade de 1/2/3 colunas |
| **Ausência quebra o layout?** | Não. Sobra o hero e um vazio |
| **Redução mantém a composição?** | **Parcialmente.** Com 1 ou 2 cursos as células restantes ficam vazias à direita; os cartões não esticam (`items-stretch` iguala altura, não largura). Com 4, a última linha traz um cartão sozinho |
| **Estado vazio** | **Não existe em nenhuma das duas listas** |
| **Limite / listagem** | Nenhum |

Os cartões já se igualam em altura, então cursos com descrições de comprimentos
diferentes não desalinham a linha — isso está resolvido.

## 3.6 Comunidades

| | |
|---|---|
| **Quantidade hoje** | 4 |
| **Decisão visual ou preenchimento?** | Conteúdo aprovado. Quatro grupos reais |
| **Mínimo / máximo suportado** | 0 a ∞. Grade de 1/2 colunas com bordas coladas |
| **Ausência quebra o layout?** | Não. Sobra o hero |
| **Redução mantém a composição?** | **4 fecha certo (2 + 2). Qualquer número ímpar deixa uma célula vazia** com a hairline desenhada em volta, que lê como cartão faltando e não como espaço |
| **Estado vazio** | **Não existe. Precisa ser criado** |
| **Limite / listagem** | Nenhum. Existe `order`, e a camada de dados ordena por ele — reordenar é trocar um número, não editar arquivo |

**Mudança de status:** `Community.status` é texto livre (`"ABERTO"`, `"LISTA DE ESPERA"`,
`"POR CONVITE"`). Trocar o status é trocar uma string; nenhum comportamento depende dela e
nada quebra. **Mas rótulos longos crescem dentro do cartão** — "LISTA DE ESPERA" já é o
maior em uso e cabe; algo como "INSCRIÇÕES ENCERRADAS EM DEZEMBRO" não foi testado.

> Vale notar o contraste com `Book.availability`, criado em 27/08/2026 como união fechada
> justamente porque **decide qual botão renderiza**. `Community.status` só é impresso, e
> por isso texto livre continua adequado ali. Se um dia o status passar a decidir se o
> botão "Entrar no Grupo" aparece, ele precisa virar união fechada pelo mesmo motivo.

## 3.7 Blog

| | |
|---|---|
| **Quantidade hoje** | 3 |
| **Decisão visual ou preenchimento?** | Preenchimento. Os três são "Titulo do Post" com `image` e `content` vazios |
| **Mínimo / máximo suportado** | 0 a ∞ |
| **Ausência quebra o layout?** | **Não quebra, mas é o buraco mais visível do site.** Verificado com 0 posts: a coluna direita da Home mantém o título "No Blog" e o botão "Todos os Textos", e fica inteiramente vazia abaixo — cerca de 400px. A coluna da agenda, ao lado, segue cheia, o que torna o vazio ainda mais evidente |
| **Redução mantém a composição?** | Sim. É uma lista vertical |
| **Estado vazio** | **Não existe. Precisa ser criado** |
| **Limite / listagem** | Nenhum. `getPosts()` devolve todos e a Home renderiza todos — com 30 posts a coluna da Home teria 30 cartões |

**`/blog` não existe.** O menu, o rodapé e o botão "Todos os Textos" já apontam para lá.
`Post.slug` existe e nada o consome. Esta é a pendência estrutural mais antiga do projeto.

## 3.8 Gêneros

| | |
|---|---|
| **Quantidade hoje** | 8 |
| **Decisão visual ou preenchimento?** | **Nem um nem outro: é taxonomia aprovada.** Não sai quando o CMS entrar |
| **Mínimo / máximo suportado** | 0 a ∞. Grade de 1/2/3 colunas |
| **Ausência quebra o layout?** | Não |
| **Redução mantém a composição?** | **Não limpa.** 8 em 3 colunas dá 3 + 3 + 2 e a última linha fica com uma célula vazia — visível porque os cartões têm borda. Qualquer contagem fora de múltiplo de 3 tem o mesmo efeito no desktop |
| **Estado vazio** | Não existe. Improvável ser necessário — a taxonomia não fica vazia |
| **Limite / listagem** | Nenhum, e não precisa |

**`number` é armazenado, não derivado** ("01"…"08"), porque é ordenação editorial e não
posição de array. A consequência: **remover um gênero abre um buraco na numeração** (01,
02, 04…) até alguém renumerar à mão. Acrescentar um exige escrever o próximo número.

**4 dos 8 gêneros não têm nenhum livro** — Infantojuvenil, Natureza, Arte e Filosofia,
Educação. O filtro do catálogo cai no estado vazio de gênero, que existe e funciona.

## 3.9 Imprensa

| | |
|---|---|
| **Quantidade hoje** | 3 aparições, 4 itens de mídia kit |
| **Decisão visual ou preenchimento?** | Aparições: preenchimento (três linhas iguais). Mídia kit: itens reais, arquivos ainda não hospedados |
| **Ausência quebra o layout?** | **Não — é a única página que trata isso.** As duas listas têm guarda de `length > 0` |
| **Redução mantém a composição?** | Sim, são listas verticais |
| **Estado vazio** | **Existe nas duas**, com copy provisória |
| **Limite / listagem** | Nenhum nas duas |

É o padrão que as outras seções deveriam seguir: a estrutura permanece — título, ano,
espaçamento — e uma linha editorial toma o lugar da lista.

---

# 4. Riscos de layout com quantidade variável

Componentes que precisam de atenção quando a quantidade real chegar. Ordenados por
gravidade.

| # | Componente | Risco | Gatilho | Encaminhamento |
|---|---|---|---|---|
| 1 | `CoAuthorshipSection` (Home) | Fileira curta alinhada à esquerda sob cabeçalho centralizado | **≤ 6 autores** no desktop | Decidir no Figma: centralizar a fileira quando ela couber, ou manter a sangria à esquerda |
| 2 | `ReleasesSection` (Home) | Carrega o catálogo inteiro no carrossel | **> ~12 livros** | Definir quantos Lançamentos a Home mostra e passar como limite — a mesma forma que `getFeaturedEvents(4)` já usa |
| 3 | `AgendaBlogSection` — coluna do blog | ≈ 400px vazios ao lado de uma coluna cheia; o botão "Todos os Textos" leva a uma rota inexistente | **0 posts**, que é o estado real hoje | Estado vazio + criar `/blog` |
| 4 | `CatalogBrowser` | Grade sem paginação | **> ~40 livros** | Definir paginação ou scroll infinito. O filtro roda no cliente e também deixa de escalar |
| 5 | `GenresSection` | Célula vazia com hairline na última linha; numeração `01…08` com buraco ao remover | Contagem **fora de múltiplo de 3** | Confirmar que 8 é definitivo, ou derivar `number` da posição |
| 6 | `CommunitiesSection` | Célula vazia com hairline | Contagem **ímpar** | Mesma decisão do item 5, em grade de 2 |
| 7 | `CoursesSection` | Células vazias à direita | **1 ou 2 cursos**, ou 4 | Confirmar se 3 é fixo |
| 8 | `EpisodesSection` | Lista sem paginação | **> ~30 episódios** | Decisão adiada de propósito; revisitar quando o arquivo crescer |
| 9 | `UpcomingEventsSection` | Lista sem paginação nem corte por data | **> ~20 eventos** | A Home já corta em 4; `/eventos` não corta |
| 10 | `CommunityCard` | Rótulo de status longo cresce dentro do cartão | Status acima de ~20 caracteres | Testar com o vocabulário real de status |

**Nenhum desses casos quebra o layout.** Verificado no navegador: não há sobreposição,
estouro de container nem scroll horizontal em nenhum deles. O que existe são buracos sem
explicação e composições que se desmancham — problemas editoriais visíveis, não bugs.

## Se os dados temporários forem removidos

| Pergunta | Resposta |
|---|---|
| **O componente mantém espaçamento?** | Sim, em todos. Nenhuma seção colapsa: título, olho, descrição e padding permanecem |
| **A seção desaparece?** | **Não, em nenhum caso** — que é o comportamento correto segundo o CLAUDE.md. A única exceção é a banda de recomendados na página do livro, que não renderiza sem outro livro no gênero (decisão certa para página de item) |
| **Existe estado vazio?** | **Só em 4 dos 15 lugares:** busca do catálogo, gênero sem livros, Na Mídia e Mídia Kit. Todos os outros ficam com o buraco |
| **Existe limite visual?** | **Só em 2:** agenda da Home (4 eventos) e recomendados do livro (5 livros). Todo o resto renderiza tudo o que a camada de dados devolver |

---

# 5. O que precisa ser fornecido pela equipe editorial

**A quantidade de cada item desta seção é desconhecida por definição.** As colunas dizem
quais campos são necessários por registro, não quantos registros devem existir.

Sobre a coluna **Responsável**: são papéis, não pessoas, e precisam ser confirmados — o
projeto não tem essa informação.

## 5.1 Entidades

| Entidade | Campos necessários por registro | Quantidade | Responsável |
|---|---|---|---|
| **Autor** | `name`, `genre` (área de atuação), `portrait` com crédito do fotógrafo, `shortDescription`, `bio`, `slug` legível | Desconhecida. 9 placeholders hoje, só para validar o carrossel | Equipe editorial |
| **Livro** | `description` (sinopse), `series`, `technicalSheet` (peso, dimensões, encadernação, páginas, editora, ISBN, data de publicação), `gallery`, `sampleUrl`, `links` (URL de loja), `availability`, confirmação de `genreSlugs` e de `authorIds` | 5 títulos reais. Novos títulos, desconhecida | Equipe editorial + Comercial |
| **Post** | `title`, `excerpt`, `image`, `content`, `author`, `category`, `publishedAt`, `slug` | Desconhecida. Nenhum post real existe | Equipe editorial |
| **Episódio** | `title`, `description`, `durationMinutes`, `href` (Spotify) dos #007 a #010 | 5 hoje. Arquivo completo, desconhecido | Equipe editorial |
| **Evento futuro** | `title`, `date`, `hour`, `place` confirmado, `href` de inscrição | Desconhecida. Os 4 atuais são o mesmo evento repetido | Equipe editorial |
| **Evento passado** | `title`, `date`, descrição do que aconteceu | Desconhecida | Equipe editorial |
| **Aparição na mídia** | veículo, tipo, `title`, data, `href` da matéria | Desconhecida | Assessoria de imprensa |
| **Mídia kit** | Arquivos hospedados dos 4 itens | 4 itens definidos | Assessoria de imprensa |
| **Curso** | `href` de inscrição dos 3 | 3 ofertas definidas | Equipe editorial |
| **Material** | Arquivos hospedados dos 3 | 3 materiais definidos | Equipe editorial |
| **Comunidade** | Convites reais (WhatsApp, Telegram ou Discord) dos 4 | 4 grupos definidos | Equipe editorial |

## 5.2 Decisões editoriais pendentes

Nenhuma delas pode ser tomada pelo desenvolvimento.

| Decisão | Por quê | Responsável |
|---|---|---|
| **Status comercial dos 5 livros** | Os cinco estão `"available"` por inferência dos anos de publicação. É leitura de dado, não decisão da casa | Comercial |
| **Destaque do podcast** | Sempre o mais recente, ou escolha editorial? Ver §3.3 | Equipe editorial |
| **Autoria de cada livro** | `Book.authorIds` aponta para registros placeholder escolhidos arbitrariamente | Equipe editorial |
| **Ficha técnica vazia** | Estado vazio ainda sem tratamento definido. A editoria decidiu não criar mensagem em 27/08/2026; o acordeão abre em branco quando nenhum campo tem valor | Equipe editorial |
| **Rótulo "Todos os gêneros"** | Do filtro do catálogo; única copy institucional ainda provisória | Equipe editorial |
| **`Book.category` deriva do gênero?** | Hoje o rótulo do cartão é campo próprio e coexiste com `genreSlugs` | Equipe editorial |
| **Ordem de "Já Aconteceu"** | Mais recente primeiro ou mais antigo primeiro? Hoje é a ordem do arquivo | Equipe editorial |
| **Alinhamento do carrossel com poucos autores** | Ver risco nº 1 | Design |
| **Quantidade de Lançamentos na Home** | Ver risco nº 2 | Design + Equipe editorial |

## 5.3 Marcadores temporários no código

| Arquivo | Campo | O que está lá |
|---|---|---|
| `mocks/books.ts` | `description` (× 5) | O lorem do próprio frame, transcrito |
| `mocks/books.ts` | `technicalSheet` (× 5) | **ISBN `000-0-0000-0000-N`, deliberadamente impossível**; dimensões, encadernação e páginas inventadas. `weight` e `publicationDate` ficam vazios — não há fonte, e preenchê-los seria inventar dois fatos novos |
| `mocks/books.ts` | `availability` (× 5) | `"available"` por inferência, não por decisão |
| `mocks/books.ts` | `sampleUrl` e `links` (livro 1) | Destino `/contato` — **nenhuma URL de loja foi inventada** |
| `mocks/authors.ts` | `bio` e `shortDescription` (× 9) | O lorem do frame — **não é biografia** |
| `mocks/authors.ts` | `slug` (× 9) | `autor-1`…`autor-9` — feio de propósito, porque os nove têm o mesmo nome |

O padrão do ISBN é intencional: é identificador do mundo real, e um falso plausível é pior
que dado nenhum — pode ser copiado, buscado e citado.

## 5.4 URLs provisórias

34 destinos apontam para `/contato`. Nenhuma URL fictícia foi inventada — a política é
apontar para uma rota real e marcar o arquivo.

| Arquivo | Qtd. | O que está provisório |
|---|---|---|
| `content/press.ts` | 7 | 3 aparições + 4 arquivos do mídia kit |
| `content/podcast.ts` | 6 | 5 episódios + CTA "Ouça no Spotify" |
| `content/events.ts` | 4 | CTA "Quero Participar" de cada evento |
| `content/communities.ts` | 4 | CTA "Entrar no Grupo" |
| `content/courses.ts` | 3 | CTA "Saiba Mais" |
| `mocks/books.ts` | 10 | `sampleUrl` e `links` dos 5 livros |

---

# 6. Estrutura — o que já está pronto

Treze entidades, todas com tipo próprio em `types/` e função em `lib/data/`. Nenhum
componente conhece a origem dos dados.

| Entidade | Origem atual | Ainda temporário | `lib/data` |
|---|---|---|---|
| Livros | `mocks/books.ts` | sinopse, coleção, ficha, links, amostra, galeria, status | Pronta |
| Autores | `mocks/authors.ts` | tudo | Pronta |
| Posts | `mocks/posts.ts` | tudo | Pronta |
| Gêneros | `content/genres.ts` | — | Pronta |
| Eventos | `content/events.ts` | títulos, locais, links | Pronta |
| Episódios | `content/podcast.ts` | títulos, durações, links | Pronta |
| Cursos | `content/courses.ts` | destinos | Pronta |
| Materiais | `content/courses.ts` | arquivos | Pronta |
| Comunidades | `content/communities.ts` | convites | Pronta |
| Aparições na mídia | `content/press.ts` | tudo | Pronta |
| Mídia kit | `content/press.ts` | arquivos | Pronta |
| Etapas de publicação | `content/publishing-steps.ts` | — | Pronta |
| Status comercial | `types/book.ts` | classificação dos 5 | Pronta |

**A arquitetura não é o gargalo.** A troca de qualquer item deste documento por dado real
acontece inteiramente na camada de dados, sem tocar em componente. O que falta é
conteúdo e são decisões editoriais.

---

# 7. Pendências técnicas

- **`/blog` não existe** e já é linkada pelo menu, pelo rodapé e pelo botão "Todos os
  Textos". `Post.slug` existe e nada o consome.
- **Os slugs dos autores são placeholders** (`autor-1`…). Trocá-los depois quebra todo
  link já compartilhado.
- **Nove seções sem estado vazio** — listadas em §5.2.
- **Dois limites de listagem existem; oito lugares não têm nenhum** — ver §4.
- **A galeria do livro não tem volta para a capa.** Escolhida uma miniatura, não há
  controle para restaurar a capa principal; o frame não desenha um.
- **O "Voltar" da página de autor** volta para o site anterior quando a URL é aberta numa
  aba que já visitou outro site.
- **Formulários não enviam** — os quatro validam no cliente e param no ponto de
  integração.
- **Capa do podcast em 3,1 MB** no repositório (o `next/image` entrega otimizada).
- **`SITE_INFO` ainda vive em `lib/navigation.ts`**, não em `lib/content/`.
- **Não há testes** e não há comando de teste definido.

---

## O que mudou nesta revisão

**27/08/2026, décima rodada — fechamento do blog.**

- **Regra de paginação definitiva**: até 9 publicações uma página só; da 10ª em diante
  pagina de 9 em 9. É o que já estava implementado — nenhuma lógica mudou, só a
  documentação, que ainda tratava a escolha como proposta pendente.
- **Correção de premissa**: não existe paginação de Livros nem de Autores no projeto. O
  catálogo lista o acervo inteiro e não há rota de listagem de autores. `PageNav` é a
  primeira paginação e passa a ser o padrão.
- **Página de tag sem paginação** registrada como escolha deliberada, não pendência.
- **A única pendência do blog é a URL oficial do X.**

**27/08/2026, nona rodada — redes sociais, paginação e tag aprovada.**

- **Redes sociais**: Instagram, YouTube, LinkedIn e Facebook com URLs oficiais e ícones do
  Phosphor. O X renderiza inerte, sem destino — o espaço fica preparado.
- **Paginação de 9 em 9** no arquivo. As duas regras do briefing não fecham ao mesmo tempo:
  8 acerta a contagem e quebra a grade, 9 preserva a grade e adia o controle em uma
  publicação. Ficou em 9, aguardando confirmação.
- **O controle de paginação é proposta** — não existe no Figma, montado só com peças já
  aprovadas do Design System.
- **"Nenhuma publicação com esta tag no momento." aprovada** e fora das pendências.
- **Os cards já eram clicáveis** nas três superfícies. Nada a corrigir.

**27/08/2026, oitava rodada — domínio do Blog implementado.**

- **Três rotas novas**: `/blog` (arquivo), `/blog/[slug]` (publicação) e `/blog/tag/[slug]`
  (arquivo filtrado). A pendência mais antiga do projeto — "`/blog` não existe e já é
  linkada pelo menu" — está fechada.
- **`Post` reconstruído** sobre os dois frames: `coverImage`, `gallery[]`, `contentTags[]`,
  e `content` como blocos tipados (parágrafo, subtítulo, citação, lista).
- **Tags editoriais como string livre**, sem entidade `Tag`. O slug é derivado por
  `lib/tags.ts`, que dobra caixa e acento — "Bastidores" e "bastidores" são a mesma tag.
- **Ordenação `publishedAt` DESC na camada de dados.** Muda também a Home, que passa a
  mostrar os três posts mais recentes.
- **Cards da Home passaram a ser clicáveis** — eram os únicos do site que não eram.
- **Não implementados, de propósito:** contadores de views e shares (analytics, sem
  origem), tempo de leitura, e o bloco de redes sociais (sem URLs).

**27/08/2026, sétima rodada — correção final de conteúdo variável.**

- **Duas copies corrigidas**, ambas com redação fornecida pela editoria: o hero de
  Comunidades e a abertura dos materiais em Cursos. Nenhuma contém mais contagem de lista
  administrável.
- **Dois estados vazios novos**: "Já Aconteceu" ganhou mensagem própria, e o catálogo
  totalmente vazio deixou de cair na mensagem de busca — passou a ter estado separado, com
  precedência sobre os filtros.
- **A lista de materiais passa a ser ocultada** quando vazia, sem mensagem. É a única
  exceção do projeto, e o formulário permanece.
- **Ficha técnica vazia**: decidido não criar mensagem. O acordeão fica, as linhas aparecem
  só quando há dado.
- **Regra geral registrada**: página de listagem mantém estrutura e mostra estado vazio;
  página de item oculta o bloco sem mensagem.

**27/08/2026, sexta rodada — copy que conta itens.**

- **Opção A aplicada em Comunidades**: a contagem saiu do hero, que dizia "Quatro grupos"
  logo acima de "Novas comunidades serão abertas em breve.". Uma palavra a menos, nada
  reescrito.
- **A regra**: copy institucional não conta itens de lista administrável. Um número em
  prosa é um fato congelado sobre um dado que muda sem ele.
- **Varredura completa da copy**: o único outro caso é "receba os três materiais" em
  Cursos — sinalizado no arquivo, não alterado. As outras cinco ocorrências de números são
  seguras (método, prazo, cadência) e estão registradas com o motivo.
- **8 casos restantes de estado vazio catalogados** com contexto e recomendação de manter
  estrutura ou ocultar. Nenhuma mensagem foi escrita.
- **Caso novo**: a bibliografia da página de autor some quando não há livro ligado —
  correto, mas não constava do inventário.

**27/08/2026, quinta rodada — estados vazios implementados.**

- **9 mensagens de estado vazio aprovadas e implementadas**: Home (autores, lançamentos,
  agenda, blog), eventos futuros, cursos, comunidades, episódios e a listagem do blog.
  Todas em `lib/content`, todas passando pela camada de dados, nenhuma escrita dentro de
  componente.
- **Novo `EmptyState`** em `components/ui/`. Doze lugares renderizavam ou passariam a
  renderizar o mesmo parágrafo; agora há um só. Os três que já existiam (Catálogo,
  Imprensa × 2) foram migrados sem mudança de markup.
- **Novo `lib/content/blog.ts`** com a mensagem da listagem do blog. A rota ainda não
  existe — a copy aprovada fica guardada na camada certa em vez de esperar num briefing.
- **Restam 3 estados vazios sem mensagem**: "Já Aconteceu", materiais gratuitos e catálogo
  inteiro vazio. Não estavam na lista aprovada.
- **Achado:** o hero de Comunidades diz "Quatro grupos que se encontram com regularidade" —
  copy aprovada que fixa uma contagem e contradiz o estado vazio.

**27/08/2026, quarta rodada — ficha técnica e copy aprovada.**

- **`binding` acrescentado.** A encadernação voltou a ter onde morar: "Brochura", "Capa
  dura", "Edição especial". Texto livre, porque nada ramifica sobre ele.
- **`technicalSheet.authors` removido.** A autoria deixou de existir em dois lugares:
  `Book.authorIds` é a relação, e a ficha consome os autores já resolvidos. Uma correção
  de nome agora corrige as três posições da página de uma vez.
- **Rótulo "Autor" virou "Autores"** — um livro pode ter mais de um, e o caso foi
  verificado na tela com dois.
- **As 4 mensagens de estado vazio foram aprovadas** e saíram das pendências. Continuam em
  `lib/content`, não pertencem ao CMS e não são item pendente. O único campo institucional
  ainda provisório é o rótulo "Todos os gêneros".

**27/08/2026, terceira rodada — contato e ficha técnica.**

- **O telefone saiu do Contato.** O placeholder `(43) 0000-0000` não esperava um número:
  a editora não tem atendimento telefônico, então o canal não existe. Removido dos dados,
  do tipo, da metadata da página e deste inventário. É uma divergência deliberada do
  Figma, que desenha a quarta linha.
- **A ficha técnica passou a ter 7 campos oficiais** — peso, dimensões, número de páginas,
  editora, ISBN, autor e data de publicação. `format` foi dividido em `weight` e
  `dimensions`; `publicationYear` virou `publicationDate`; `authors` é novo. Os rótulos
  deixaram de ser provisórios.
- **Dois alertas abertos:** a encadernação ("Brochura") não tem campo no modelo oficial, e
  `technicalSheet.authors` é um segundo registro de autoria que pode divergir de
  `Book.authorIds`. **Os dois foram resolvidos no mesmo dia — ver a quarta rodada.**

**27/08/2026 — separação entre quantidade de validação e quantidade real.**

- Toda entidade passou a declarar **por que tem a quantidade que tem**. Onde havia
  *"equipe editorial precisa fornecer 9 autores"* agora se lê *"9 autores temporários
  foram usados para validar o carrossel; a quantidade real é decisão da editora"*.
- Nova auditoria de sete perguntas por entidade (§3), com os casos de ausência e redução
  **verificados no navegador**, não deduzidos.
- Nova seção de riscos de layout com quantidade variável (§4), com o gatilho numérico de
  cada um.
- O destaque do podcast foi investigado e documentado: **não existe episódio em
  destaque** — o herói apresenta o programa (§3.3).
- Confirmado que a Home e `/eventos` leem a mesma origem.
- Registrado o `Book.availability`, criado em 27/08/2026.

**26/08/2026 — revisão anterior.** As 5 etapas do processo editorial saíram de `mocks/`
para `lib/content/`; `Book.authorIds` criou o vínculo livro ↔ autor; `mocks/events.ts`
foi apagado e a Home passou a ler a mesma agenda de `/eventos`; os links da Amazon que
apontavam para a home da loja foram removidos; `/catalogo/[slug]` foi implementada.

---

## Antes de publicar

Verificar explicitamente que nada de `mocks/` e nenhum bloco marcado como temporário em
`lib/content/` está sendo renderizado:

```
src/lib/mocks/          (pasta inteira — authors, books, posts)
src/lib/content/book.ts
src/lib/content/catalog.ts
src/lib/content/communities.ts
src/lib/content/contact.ts
src/lib/content/courses.ts
src/lib/content/events.ts
src/lib/content/podcast.ts
src/lib/content/press.ts
```

E confirmar que os 26 destinos provisórios de §5.4 foram substituídos.

Ver também [HANDOFF_DEV.md](HANDOFF_DEV.md) §9 (dados temporários), §10 (estados vazios)
e §17 (particularidades do Catálogo).
