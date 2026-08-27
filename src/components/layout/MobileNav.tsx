"use client";

import { List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { HEADER_CTA, NAV_ITEMS } from "@/lib/navigation";

/**
 * Compact navigation for tablet and mobile. The Figma file has no frame below
 * 1440px, so this is an extension of the desktop design: same links, same
 * order, same type and color tokens, presented as a full-height panel.
 *
 * The panel — rather than a dropdown — is what lets all ten links keep the
 * desktop spacing and hierarchy on a small screen.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close when the route changes — including browser back/forward. Adjusting
  // state during render is the supported pattern here; a synchronous setState
  // inside an effect would cause a cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(true)}
        className="text-ink -mr-1.5 inline-flex size-11 items-center justify-center transition-colors duration-200 hover:text-mata xl:hidden"
      >
        <List size={24} weight="light" />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="bg-bg fixed inset-0 z-50 flex flex-col xl:hidden"
        >
          <Container className="flex h-[72px] shrink-0 items-center justify-between border-b border-ink/20">
            <Logo width={140} />
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Fechar menu"
              onClick={() => setIsOpen(false)}
              className="text-ink -mr-1.5 inline-flex size-11 items-center justify-center transition-colors duration-200 hover:text-mata"
            >
              <X size={24} weight="light" />
            </button>
          </Container>

          <Container className="flex flex-1 flex-col justify-between gap-10 overflow-y-auto py-10">
            <nav aria-label="Navegação principal">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      item={item}
                      className="text-slab-sub inline-block py-2"
                      onNavigate={() => setIsOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <Button href={HEADER_CTA.href} className="w-full">
              {HEADER_CTA.label}
            </Button>
          </Container>
        </div>
      ) : null}
    </>
  );
}
