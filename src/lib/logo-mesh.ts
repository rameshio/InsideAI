/**
 * Geometry for the Inside AI "IA" constellation mark.
 *
 * The outline is traced from the brand logo (public/brand/insideai-logo.webp,
 * 1254px square). Points are sampled along the outline and scattered inside
 * it, then Delaunay-triangulated so the result reads like the logo's
 * triangulated wireframe. Everything is seeded, so the mark has the same
 * shape on every load.
 */

export type Point = { x: number; y: number };
export type MeshNode = Point & { z: number; ring: number };
export type Mesh = {
  nodes: MeshNode[];
  edges: [number, number][];
  core: Point & { z: number };
};

type Poly = Point[];

const p = (x: number, y: number): Point => ({ x, y });

// Union outline of the I and the A, clockwise, in logo pixel space.
const OUTLINE: Poly = [
  p(275, 242),
  p(537, 242),
  p(537, 338),
  p(537, 600),
  p(673, 242),
  p(790, 242),
  p(1085, 975),
  p(850, 975),
  p(848, 782),
  p(623, 782),
  p(575, 975),
  p(275, 975),
  p(275, 887),
  p(370, 835),
  p(370, 365),
  p(275, 338),
];

// Counter of the A.
const HOLE: Poly = [p(750, 440), p(840, 680), p(648, 680)];

// The bright flare where the two letters meet.
const CORE = p(537, 605);
const CENTER = p(680, 608);
const SCALE = 430;

const OUTLINE_STEP = 78;
const MIN_GAP = 64;
const CANDIDATES = 2600;
const DEPTH = 0.16;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function inPolygon(pt: Point, poly: Poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (
      a.y > pt.y !== b.y > pt.y &&
      pt.x < ((b.x - a.x) * (pt.y - a.y)) / (b.y - a.y) + a.x
    )
      inside = !inside;
  }
  return inside;
}

const inShape = (pt: Point) => inPolygon(pt, OUTLINE) && !inPolygon(pt, HOLE);

function sampleRing(poly: Poly): Point[] {
  const out: Point[] = [];
  poly.forEach((a, i) => {
    const b = poly[(i + 1) % poly.length];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const steps = Math.max(1, Math.round(len / OUTLINE_STEP));
    for (let s = 0; s < steps; s++)
      out.push(
        p(a.x + ((b.x - a.x) * s) / steps, a.y + ((b.y - a.y) * s) / steps),
      );
  });
  return out;
}

type Tri = [number, number, number];

/** Bowyer-Watson Delaunay triangulation. Fine for a few hundred points. */
function delaunay(points: Point[]): Tri[] {
  const all = [...points, p(-1e5, -1e5), p(1e5, -1e5), p(0, 1e5)];
  const n = points.length;
  let tris: Tri[] = [[n, n + 1, n + 2]];
  const circum = (t: Tri) => {
    const [a, b, c] = t.map((i) => all[i]);
    const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    const a2 = a.x * a.x + a.y * a.y;
    const b2 = b.x * b.x + b.y * b.y;
    const c2 = c.x * c.x + c.y * c.y;
    const x = (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d;
    const y = (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d;
    return { x, y, r2: (a.x - x) ** 2 + (a.y - y) ** 2 };
  };
  for (let i = 0; i < n; i++) {
    const pt = all[i];
    const bad: Tri[] = [];
    const keep: Tri[] = [];
    for (const t of tris) {
      const c = circum(t);
      ((pt.x - c.x) ** 2 + (pt.y - c.y) ** 2 < c.r2 ? bad : keep).push(t);
    }
    const edgeCount = new Map<string, [number, number]>();
    const seen = new Map<string, number>();
    for (const t of bad)
      for (const [u, v] of [
        [t[0], t[1]],
        [t[1], t[2]],
        [t[2], t[0]],
      ]) {
        const key = u < v ? `${u}-${v}` : `${v}-${u}`;
        seen.set(key, (seen.get(key) || 0) + 1);
        edgeCount.set(key, [u, v]);
      }
    tris = keep;
    for (const [key, [u, v]] of edgeCount)
      if (seen.get(key) === 1) tris.push([u, v, i]);
  }
  return tris.filter((t) => t.every((i) => i < n));
}

function build(): Mesh {
  const rand = mulberry32(0x1a_2026);
  const outline = sampleRing(OUTLINE);
  const hole = sampleRing(HOLE);
  const pts: { pt: Point; ring: number }[] = [
    ...outline.map((pt) => ({ pt, ring: 1 })),
    ...hole.map((pt) => ({ pt, ring: 1 })),
    { pt: CORE, ring: 2 },
  ];
  const tooClose = (c: Point) =>
    pts.some(({ pt }) => Math.hypot(pt.x - c.x, pt.y - c.y) < MIN_GAP);
  for (let i = 0; i < CANDIDATES; i++) {
    const c = p(260 + rand() * 840, 230 + rand() * 760);
    if (inShape(c) && !tooClose(c)) pts.push({ pt: c, ring: 0 });
  }
  const tris = delaunay(pts.map((e) => e.pt)).filter((t) => {
    const [a, b, c] = t.map((i) => pts[i].pt);
    return inShape(p((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3));
  });
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (const t of tris)
    for (const [u, v] of [
      [t[0], t[1]],
      [t[1], t[2]],
      [t[2], t[0]],
    ]) {
      const key = u < v ? `${u}-${v}` : `${v}-${u}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push(u < v ? [u, v] : [v, u]);
      }
    }
  const norm = (pt: Point) =>
    p((pt.x - CENTER.x) / SCALE, (pt.y - CENTER.y) / SCALE);
  const nodes = pts.map(({ pt, ring }) => ({
    ...norm(pt),
    z: ring === 2 ? 0 : (rand() * 2 - 1) * DEPTH,
    ring,
  }));
  return { nodes, edges, core: { ...norm(CORE), z: 0 } };
}

let cached: Mesh | null = null;
export function logoMesh(): Mesh {
  cached ??= build();
  return cached;
}
