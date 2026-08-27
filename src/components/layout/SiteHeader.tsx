import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { NavLink } from "@/components/layout/NavLink";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { HEADER_CTA, NAV_ITEMS, SITE_INFO } from "@/lib/navigation";

/**
 * Figma: 56px ink top bar over a 108px navbar with a bottom hairline.
 *
 * The full ten-item menu needs roughly 1300px alongside the wordmark and the
 * call to action, so the breakpoint for the compact menu is `xl` (1280px):
 * desktop keeps the complete navigation, tablet and mobile get the panel.
 *
 * The call to action has room of its own down to `md` (768px); below that it
 * lives inside the panel so the bar keeps the wordmark and the toggle alone.
 */
export function SiteHeader() {
  return (
    <header>
      <TopBar />

      <div className="border-b border-ink/20">
        <Container className="flex h-[72px] items-center justify-between gap-8 xl:h-[108px]">
          <Link href="/" aria-label={`${SITE_INFO.name} — página inicial`}>
            <Logo className="w-[140px] xl:w-[176px]" />
          </Link>

          <nav aria-label="Navegação principal" className="hidden xl:block">
            <ul className="flex items-center gap-[18px]">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {/* Wrapped rather than given `hidden` directly: Button already sets
                `inline-flex`, and two display utilities on one element resolve
                by CSS order, not by class order. */}
            <div className="hidden md:block">
              <Button href={HEADER_CTA.href}>{HEADER_CTA.label}</Button>
            </div>
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
