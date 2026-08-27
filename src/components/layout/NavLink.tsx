"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

interface NavLinkProps {
  item: NavItem;
  className?: string;
  onNavigate?: () => void;
}

/**
 * The Figma `Menu` component ships one variant per route, each marking the
 * active item with an underline. That is reproduced here from the pathname.
 */
export function NavLink({ item, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "text-slab-menu border-b p-1.5 transition-colors duration-200",
        isActive ? "border-current" : "border-transparent hover:border-areia",
        className,
      )}
    >
      {item.label}
    </Link>
  );
}
