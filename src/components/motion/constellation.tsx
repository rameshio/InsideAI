"use client";
import { useEffect, useRef } from "react";
import { logoMesh, mulberry32 } from "@/lib/logo-mesh";

/**
 * The homepage hero visual: the Inside AI "IA" mark rendered as a live 3D
 * network on a 2D canvas (no WebGL dependency).
 *
 * - On load, every node flies in from a scattered sphere and assembles the mark.
 * - It slowly sways, tilts toward the pointer, and carries "signal" pulses
 *   travelling along its edges.
 * - Scrolling the hero away rotates and expands the mesh in depth.
 * - Reduced motion: a single, still, fully assembled frame.
 * - Pauses itself when off screen or when the tab is hidden.
 */

const ACCENT = [61, 184, 255] as const;
const ASSEMBLE_MS = 1900;
const STAGGER_MS = 650;
const PULSES = 16;
const PULSE_MS = 950;
const DUST = 80;
const FOCAL = 3.4;

type Vec = { x: number; y: number; z: number };

const rgba = (a: number, c: readonly number[] = ACCENT) =>
  `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const easeOut = (t: number) => 1 - (1 - t) ** 4;

function glowSprite(size: number, core: string, halo: string) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, core);
  grad.addColorStop(0.18, core);
  grad.addColorStop(0.35, halo);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

function rotate(v: Vec, rx: number, ry: number): Vec {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x = v.x * cy + v.z * sy;
  const z1 = -v.x * sy + v.z * cy;
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  return { x, y: v.y * cx - z1 * sx, z: v.y * sx + z1 * cx };
}

export function Constellation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mesh = logoMesh();
    const rand = mulberry32(42);

    // Per-node start position on a scattered sphere and an assembly delay.
    const starts: Vec[] = mesh.nodes.map(() => {
      const u = rand() * Math.PI * 2;
      const v = Math.acos(2 * rand() - 1);
      const r = 1.6 + rand() * 1.4;
      return {
        x: r * Math.sin(v) * Math.cos(u),
        y: r * Math.sin(v) * Math.sin(u),
        z: r * Math.cos(v),
      };
    });
    const delays = mesh.nodes.map(() => rand() * STAGGER_MS);
    const dust = Array.from({ length: DUST }, () => ({
      x: rand() * 2 - 1,
      y: rand() * 2 - 1,
      z: rand(),
      tw: rand() * Math.PI * 2,
    }));

    const neighbours = mesh.nodes.map(() => [] as number[]);
    mesh.edges.forEach(([a, b]) => {
      neighbours[a].push(b);
      neighbours[b].push(a);
    });
    const pulses = Array.from({ length: PULSES }, () => {
      const [a, b] = mesh.edges[Math.floor(rand() * mesh.edges.length)];
      return { from: a, to: b, t: rand() };
    });

    const nodeSprite = glowSprite(64, "rgba(235,248,255,1)", rgba(0.35));
    const pulseSprite = glowSprite(64, "rgba(255,255,255,1)", rgba(0.6));

    let width = 0;
    let height = 0;
    let dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(performance.now() + ASSEMBLE_MS * 4);
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = clamp((e.clientX / window.innerWidth) * 2 - 1, -1, 1);
      pointer.ty = clamp((e.clientY / window.innerHeight) * 2 - 1, -1, 1);
    };

    let startedAt = performance.now();
    let last = startedAt;

    function draw(now: number) {
      if (!ctx || !canvas) return;
      const dt = Math.min(64, now - last);
      last = now;
      const elapsed = now - startedAt;
      const rect = canvas.getBoundingClientRect();
      const scroll = reduce ? 0 : clamp(-rect.top / Math.max(1, rect.height));

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const sway = reduce ? 0 : Math.sin(elapsed * 0.00032) * 0.32;
      const ry = sway + pointer.x * 0.42 + scroll * 1.35;
      const rx =
        (reduce ? 0 : Math.cos(elapsed * 0.00027) * 0.07) -
        pointer.y * 0.26 +
        scroll * 0.35;
      const spread = 1 + scroll * 0.55;
      const unit = Math.min(width, height) * 0.46;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // Background dust drifting with parallax.
      for (const d of dust) {
        const px = cx + (d.x + pointer.x * 0.05 * d.z) * width * 0.55;
        const py =
          cy +
          (d.y + pointer.y * 0.05 * d.z - scroll * 0.2 * d.z) * height * 0.55;
        const a =
          0.12 + 0.3 * d.z * (0.6 + 0.4 * Math.sin(elapsed * 0.0012 + d.tw));
        ctx.fillStyle = rgba(a, [170, 220, 255]);
        ctx.fillRect(px, py, 1.2 + d.z, 1.2 + d.z);
      }

      // Project every node.
      const projected = mesh.nodes.map((n, i) => {
        const k = reduce
          ? 1
          : easeOut(clamp((elapsed - delays[i]) / ASSEMBLE_MS));
        const s = starts[i];
        const local = {
          x: (s.x + (n.x - s.x) * k) * spread,
          y: (s.y + (n.y - s.y) * k) * spread,
          z: (s.z + (n.z * (1 + scroll * 4) - s.z) * k) * spread,
        };
        const r = rotate(local, rx, ry);
        const persp = FOCAL / (FOCAL + r.z);
        return {
          x: cx + r.x * unit * persp,
          y: cy + r.y * unit * persp,
          depth: persp,
          k,
        };
      });

      const fade = 1 - scroll * 0.75;

      // Edges: a wide soft pass for glow, then a crisp bright pass.
      for (const pass of [0, 1]) {
        ctx.lineWidth = pass === 0 ? 4 : 1.1;
        for (const [a, b] of mesh.edges) {
          const pa = projected[a];
          const pb = projected[b];
          const depth = (pa.depth + pb.depth) / 2;
          const settle = Math.min(pa.k, pb.k);
          const alpha =
            (pass === 0 ? 0.07 : 0.55) *
            settle *
            clamp(depth * depth, 0.25, 1.3) *
            fade;
          if (alpha < 0.01) continue;
          ctx.strokeStyle = rgba(alpha);
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }

      // Nodes.
      for (const pnode of projected) {
        const size = 15 * pnode.depth * (0.55 + 0.45 * pnode.k);
        ctx.globalAlpha = clamp(0.35 + pnode.k * 0.65) * fade;
        ctx.drawImage(
          nodeSprite,
          pnode.x - size / 2,
          pnode.y - size / 2,
          size,
          size,
        );
      }

      // Signals travelling along edges, hopping to a neighbour on arrival.
      if (!reduce && elapsed > ASSEMBLE_MS * 0.7)
        for (const pulse of pulses) {
          pulse.t += dt / PULSE_MS;
          if (pulse.t >= 1) {
            const next = neighbours[pulse.to];
            pulse.from = pulse.to;
            pulse.to = next[Math.floor(rand() * next.length)] ?? pulse.from;
            pulse.t = 0;
          }
          const a = projected[pulse.from];
          const b = projected[pulse.to];
          const size = 20 * ((a.depth + b.depth) / 2);
          ctx.globalAlpha = Math.sin(pulse.t * Math.PI) * fade;
          ctx.drawImage(
            pulseSprite,
            a.x + (b.x - a.x) * pulse.t - size / 2,
            a.y + (b.y - a.y) * pulse.t - size / 2,
            size,
            size,
          );
        }
      ctx.globalAlpha = 1;

      // The flare where the letters meet, as in the logo.
      const coreIndex = mesh.nodes.findIndex((n) => n.ring === 2);
      const core = projected[coreIndex];
      const beat = reduce ? 1 : 0.85 + 0.15 * Math.sin(elapsed * 0.0024);
      const flare = unit * 0.42 * beat * core.k;
      const grad = ctx.createRadialGradient(
        core.x,
        core.y,
        0,
        core.x,
        core.y,
        flare,
      );
      grad.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
      grad.addColorStop(0.08, rgba(0.85 * fade, [150, 225, 255]));
      grad.addColorStop(0.3, rgba(0.25 * fade));
      grad.addColorStop(1, rgba(0));
      ctx.fillStyle = grad;
      ctx.fillRect(core.x - flare, core.y - flare, flare * 2, flare * 2);
      ctx.strokeStyle = rgba(0.5 * fade * core.k, [200, 240, 255]);
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI + elapsed * 0.00008;
        const len = flare * (i % 2 ? 0.55 : 0.9);
        ctx.beginPath();
        ctx.moveTo(core.x - Math.cos(ang) * len, core.y - Math.sin(ang) * len);
        ctx.lineTo(core.x + Math.cos(ang) * len, core.y + Math.sin(ang) * len);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    let frame = 0;
    let visible = true;
    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer, { passive: true });
    startedAt = performance.now();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
