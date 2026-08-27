import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/ArrowRightIcon";
import { cn } from "@/lib/utils";
import type { Pagination } from "@/types";

interface PageNavProps {
  pagination: Pagination;
  /** Base do endereço; a página vira `?page=N` sobre ele. */
  basePath: string;
  /** "Página 2 de 4" — montado pela camada de conteúdo, não aqui. */
  label: string;
  /** Rótulos acessíveis dos dois controles. */
  previousLabel: string;
  nextLabel: string;
  className?: string;
}

/**
 * Step through a paginated list — previous, position, next.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * NÃO ESTÁ NO FIGMA, E FOI APROVADO ASSIM MESMO (27/08/2026).
 *
 * O frame do blog desenha seis cards e nenhuma navegação, então não havia
 * referência para como um controle de paginação se parece neste site. Em vez
 * de inventar uma linguagem nova, este é montado com peças que o design já
 * aprovou: o mesmo botão quadrado de 36px com borda de 1px e a mesma
 * `ArrowRightIcon` que as setas do `Carousel` usam, incluindo o `opacity-25`
 * do estado desabilitado.
 *
 * É a afordância que o projeto já usa para percorrer uma lista — a diferença é
 * que aqui ela navega em vez de rolar.
 *
 * **É também a única paginação do projeto.** O catálogo lista o acervo inteiro
 * e não existe rota de listagem de autores, então não havia padrão anterior a
 * seguir: este passa a ser o padrão. Qualquer lista que venha a paginar deve
 * usar este componente em vez de resolver o problema de novo.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * ## Links, não botões
 *
 * Cada página é um endereço. `?page=2` sobrevive a recarga, a compartilhamento
 * e ao botão voltar, e um leitor pode abrir a página seguinte numa aba nova —
 * coisas que um `onClick` com estado local não dá. É a mesma decisão que o
 * filtro de gênero do catálogo tomou.
 *
 * A extremidade da lista renderiza um `<span>` e não um link desativado: não
 * existe página zero para onde apontar, e um controle inerte fora da ordem de
 * tabulação é mais honesto que uma âncora que não leva a lugar nenhum.
 */
export function PageNav({
  pagination,
  basePath,
  label,
  previousLabel,
  nextLabel,
  className,
}: PageNavProps) {
  const { current, totalPages } = pagination;

  // Uma página só não é navegação — é ruído.
  if (totalPages <= 1) return null;

  const hasPrevious = current > 1;
  const hasNext = current < totalPages;

  const hrefFor = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  const control =
    "inline-flex size-9 items-center justify-center border border-current transition-colors duration-200";

  return (
    <nav aria-label={label} className={cn("flex items-center gap-3", className)}>
      {hasPrevious ? (
        <Link
          href={hrefFor(current - 1)}
          aria-label={previousLabel}
          className={cn(control, "hover:bg-current/5")}
        >
          <ArrowRightIcon className="rotate-180" />
        </Link>
      ) : (
        <span aria-hidden="true" className={cn(control, "opacity-25")}>
          <ArrowRightIcon className="rotate-180" />
        </span>
      )}

      <p className="text-slab-small text-muted px-1">{label}</p>

      {hasNext ? (
        <Link
          href={hrefFor(current + 1)}
          aria-label={nextLabel}
          className={cn(control, "hover:bg-current/5")}
        >
          <ArrowRightIcon />
        </Link>
      ) : (
        <span aria-hidden="true" className={cn(control, "opacity-25")}>
          <ArrowRightIcon />
        </span>
      )}
    </nav>
  );
}
