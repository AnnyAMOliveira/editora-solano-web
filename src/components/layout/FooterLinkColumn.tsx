import Link from "next/link";

import type { FooterColumn } from "@/types";

interface FooterLinkColumnProps {
  column: FooterColumn;
}

export function FooterLinkColumn({ column }: FooterLinkColumnProps) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-slab-menu">{column.title}</h3>
      <ul className="flex flex-col gap-3">
        {column.links.map((link) => (
          <li key={`${column.title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-body text-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
