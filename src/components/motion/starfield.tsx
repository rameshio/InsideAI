"use client";
import { useEffect, useRef } from "react";
import { mulberry32 } from "@/lib/logo-mesh";

/**
 * Animated star layer for the homepage hero. It sits over the sky photo,
 * which already carries the dense star field, so this layer stays sparse and
 * adds what a photo can't: twinkle, depth parallax, and shooting stars.
 *
 * Three depth layers of mostly tiny stars in natural colours (white, warm
 * amber, pale gold, blue-white) drift slowly sideways and shift with the
 * pointer and with scroll (nearer layers move more, which reads as depth).
 * A handful of bright stars carry a soft glow halo, and a rare shooting star
 * crosses. Canvas 2D only.
 * Pauses off screen / in hidden tabs; draws one still frame under reduced motion.
 */

const STAR_DENSITY = 1 / 2600; // stars per CSS pixel of area
const MAX_STARS = 600;
const LAYERS = [
  { depth: 0.25, share: 0.7 },
  { depth: 0.6, share: 0.25 },
  { depth: 1, share: 0.05 },
];
const BRIGHT_AREA = 160_000; // one bright, haloed star per this many px²
const BRIGHT_MIN = 4;
const BRIGHT_MAX = 10;
const POINTER_PARALLAX = 22; // px at the nearest layer
const SCROLL_PARALLAX = 90;
const DRIFT = 9; // px per second at the nearest layer
const SHOOT_MIN_MS = 6000;
const SHOOT_MAX_MS = 14000;
const SHOOT_LIFE_MS = 950;
const HALO_SPRITE = 64; // px, pre-rendered glow drawn scaled per star

// Natural star colours with how often each appears.
const PALETTE = [
  { rgb: "255,255,255", weight: 0.5 },
  { rgb: "255,196,128", weight: 0.22 }, // warm amber
  { rgb: "255,232,190", weight: 0.13 }, // pale gold
  { rgb: "196,218,255", weight: 0.15 }, // blue-white
];
const HALO_COLORS = ["255,255,255", "196,218,255"];

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  depth: number;
  tw: number;
  phase: number;
  color: string;
  halo: number; // glow radius in px, 0 for ordinary stars
  haloColor: number;
};

type Shooter = { x: number; y: number; vx: number; vy: number; born: number };

function pickColor(roll: number): string {
  let acc = 0;
  for (const c of PALETTE) {
    acc += c.weight;
    if (roll < acc) return c.rgb;
  }
  return PALETTE[0].rgb;
}

function makeHaloSprite(rgb: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = HALO_SPRITE;
  const g = c.getContext("2d");
  if (!g) return c;
  const h = HALO_SPRITE / 2;
  const grad = g.createRadialGradient(h, h, 0, h, h, h);
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(0.08, `rgba(${rgb},0.85)`);
  grad.addColorStop(0.25, `rgba(${rgb},0.22)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, HALO_SPRITE, HALO_SPRITE);
  return c;
}

function makeStars(width: number, height: number): Star[] {
  const rand = mulberry32(2026);
  const total = Math.min(MAX_STARS, Math.round(width * height * STAR_DENSITY));
  const stars: Star[] = [];
  for (const layer of LAYERS) {
    const count = Math.round(total * layer.share);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: rand(),
        y: rand(),
        r: (0.3 + rand() * rand() * 1.1) * (0.5 + layer.depth),
        a: 0.5 + rand() * 0.5,
        depth: layer.depth,
        tw: 0.3 + rand() * 1.2,
        phase: rand() * Math.PI * 2,
        color: pickColor(rand()),
        halo: 0,
        haloColor: 0,
      });
    }
  }
  const bright = Math.max(
    BRIGHT_MIN,
    Math.min(BRIGHT_MAX, Math.round((width * height) / BRIGHT_AREA)),
  );
  for (let i = 0; i < bright; i++) {
    const big = rand() < 0.3;
    stars.push({
      x: rand(),
      y: rand(),
      r: big ? 2 : 1.4,
      a: 1,
      depth: 0.8 + rand() * 0.2,
      tw: 0.2 + rand() * 0.4,
      phase: rand() * Math.PI * 2,
      color: "255,255,255",
      halo: big ? 22 + rand() * 10 : 10 + rand() * 8,
      haloColor: rand() < 0.6 ? 0 : 1,
    });
  }
  return stars;
}

export function Starfield({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const shooters: Shooter[] = [];
    let nextShot = performance.now() + SHOOT_MIN_MS;
    const start = performance.now();
    const halos = HALO_COLORS.map(makeHaloSprite);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(width, height);
      if (reduce) draw(performance.now());
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    function draw(now: number) {
      if (!ctx || !canvas) return;
      const t = (now - start) / 1000;
      const rect = canvas.getBoundingClientRect();
      const scroll = reduce
        ? 0
        : Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const drift = reduce ? 0 : t * DRIFT * s.depth;
        let x = s.x * width - drift - pointer.x * POINTER_PARALLAX * s.depth;
        const y =
          s.y * height -
          pointer.y * POINTER_PARALLAX * s.depth -
          scroll * SCROLL_PARALLAX * s.depth;
        x = ((x % width) + width) % width;
        const twinkle = reduce
          ? 1
          : 0.8 + 0.2 * Math.sin(t * s.tw * 2 + s.phase);
        const alpha = s.a * twinkle;
        if (s.halo) {
          const size = s.halo * 2 * (0.92 + 0.08 * twinkle);
          ctx.globalAlpha = 0.9 * twinkle;
          ctx.drawImage(
            halos[s.haloColor],
            x - size / 2,
            y - size / 2,
            size,
            size,
          );
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        if (s.r < 0.9) {
          const px = Math.max(1, s.r * 1.6);
          ctx.fillRect(x, y, px, px);
          continue;
        }
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (reduce) return;
      if (now > nextShot) {
        // travels down and to the left
        const angle = Math.PI * (0.78 + Math.random() * 0.1);
        const speed = 0.75 + Math.random() * 0.5; // px per ms
        shooters.push({
          x: width * (0.35 + Math.random() * 0.65),
          y: height * Math.random() * 0.45,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          born: now,
        });
        nextShot =
          now + SHOOT_MIN_MS + Math.random() * (SHOOT_MAX_MS - SHOOT_MIN_MS);
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        const age = now - sh.born;
        if (age > SHOOT_LIFE_MS) {
          shooters.splice(i, 1);
          continue;
        }
        const life = age / SHOOT_LIFE_MS;
        const hx = sh.x + sh.vx * age;
        const hy = sh.y + sh.vy * age;
        const tail = 160 * Math.sin(life * Math.PI);
        const tx = hx - sh.vx * (tail / Math.hypot(sh.vx, sh.vy));
        const ty = hy - sh.vy * (tail / Math.hypot(sh.vx, sh.vy));
        const fade = Math.sin(life * Math.PI);
        const grad = ctx.createLinearGradient(hx, hy, tx, ty);
        grad.addColorStop(0, `rgba(235,248,255,${0.95 * fade})`);
        grad.addColorStop(0.25, `rgba(143,216,255,${0.5 * fade})`);
        grad.addColorStop(1, "rgba(61,184,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
    }

    let frame = 0;
    let visible = true;
    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduce || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer, { passive: true });
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
