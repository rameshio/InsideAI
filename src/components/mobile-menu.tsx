"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { NavLinks, NAV_ITEMS } from "./nav-links";

/**
 * Small-screen menu built on <details> so it works before hydration.
 * Closes on navigation (including browser back/forward), Escape, and outside click.
 */
export function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const close = () => ref.current?.removeAttribute("open");

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) {
        close();
        ref.current.querySelector("summary")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details className="mobile-menu" ref={ref}>
      <summary>
        <span className="menu-icon" aria-hidden="true" />
        Menu
      </summary>
      <nav aria-label="Mobile navigation">
        <NavLinks items={[...NAV_ITEMS, "Newsletter"]} onNavigate={close} />
      </nav>
    </details>
  );
}
