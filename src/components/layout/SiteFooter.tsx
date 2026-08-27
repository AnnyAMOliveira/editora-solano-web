import { FooterLinkColumn } from "@/components/layout/FooterLinkColumn";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_COLUMNS, SITE_INFO } from "@/lib/navigation";

/**
 * Figma: 1320 × 276 — wordmark and legal data on the left, three link columns
 * on the right, hairline, then the copyright row.
 *
 * The copyright year is `SITE_INFO.copyrightYear` and not the system clock:
 * every page here is prerendered, so a year computed in this component is
 * frozen at build time and silently wrong from the next 1 January.
 */
export function SiteFooter() {

  const institutionalLines = [
    SITE_INFO.legalName,
    SITE_INFO.registration,
    SITE_INFO.addressLine,
    SITE_INFO.cityLine,
  ];

  return (
    <footer className="pt-12 pb-8 md:pt-[60px]">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-6">
            <Logo width={176} />
            <address className="not-italic">
              <ul className="flex flex-col gap-[10px]">
                {institutionalLines.map((line) => (
                  <li key={line} className="text-slab-small text-muted">
                    {line}
                  </li>
                ))}
              </ul>
            </address>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-[120px]"
          >
            {FOOTER_COLUMNS.map((column) => (
              <FooterLinkColumn key={column.title} column={column} />
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-muted/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slab-small text-muted">
            © {SITE_INFO.copyrightYear} {SITE_INFO.name}
          </p>
          <p className="text-slab-small text-muted">{SITE_INFO.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
