import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FONT_VARIABLES } from "@/lib/fonts";
import { SITE_INFO } from "@/lib/navigation";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_INFO.name} — ${SITE_INFO.tagline}`,
    template: `%s — ${SITE_INFO.name}`,
  },
  description:
    "Somos uma editora onde literatura, arte e ecologia falam a mesma língua. Cada livro é lapidado à mão, no ritmo de quem cultiva.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={FONT_VARIABLES}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
