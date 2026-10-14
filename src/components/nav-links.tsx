"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = ["Updates", "Videos", "Guides", "Resources", "About"];

/** Primary navigation with an active state (aria-current) for the current section. */
export function NavLinks({
  items = NAV_ITEMS,
  onNavigate,
}: {
  items?: string[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return items.map((name) => {
    const href = `/${name.toLowerCase()}`;
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        key={name}
        href={href}
        aria-current={isActive ? "page" : undefined}
        onClick={onNavigate}
      >
        {name}
      </Link>
    );
  });
}
