"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide interaction layer, mounted once in the root layout. Renders nothing.
 *
 * 1. Smooth, inertial wheel scrolling (Lenis). Touch keeps native scrolling.
 * 2. 3D tilt + cursor spotlight for any element with `data-tilt`.
 * 3. A ripple from the press point on `.button` / `.small-button` / `.chip`.
 *
 * All three are delegated listeners, so they keep working across client-side
 * navigations without re-binding. Reduced motion disables 1 and 2.
 */

const TILT_MAX_DEG = 7;
const RIPPLE_TARGETS = ".button, .small-button, .chip, .sh-btn";

let lenis: Lenis | null = null;

export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    if (!reduce) {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    let active: HTMLElement | null = null;
    let pending = 0;
    const reset = (el: HTMLElement) => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.removeAttribute("data-tilting");
    };
    const onMove = (e: PointerEvent) => {
      if (reduce || e.pointerType !== "mouse") return;
      const el =
        (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]") ??
        null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el || pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        if (active !== el) return; // pointer already moved on
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--tilt-x", `${(px - 0.5) * TILT_MAX_DEG * 2}deg`);
        el.style.setProperty("--tilt-y", `${(0.5 - py) * TILT_MAX_DEG * 2}deg`);
        el.style.setProperty("--spot-x", `${px * 100}%`);
        el.style.setProperty("--spot-y", `${py * 100}%`);
        el.setAttribute("data-tilting", "");
      });
    };
    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };

    const onDown = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(
        RIPPLE_TARGETS,
      );
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--ripple-x", `${e.clientX - r.left}px`);
      el.style.setProperty("--ripple-y", `${e.clientY - r.top}px`);
      el.classList.remove("is-rippling");
      void el.offsetWidth; // restart the CSS animation
      el.classList.add("is-rippling");
    };
    const onRippleEnd = (e: AnimationEvent) => {
      if (e.animationName === "ripple")
        (e.target as HTMLElement).classList.remove("is-rippling");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("animationend", onRippleEnd);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pending);
      lenis?.destroy();
      lenis = null;
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("animationend", onRippleEnd);
    };
  }, []);

  // New page content changes the document height; let Lenis re-measure.
  useEffect(() => {
    lenis?.resize();
  }, [pathname]);

  return null;
}
