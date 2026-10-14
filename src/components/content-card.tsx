import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { Entry, formatDate } from "@/lib/content";
import { mulberry32 } from "@/lib/logo-mesh";

const ART_W = 400;
const ART_H = 240;
const ART_NODES = 26;

type ArtNode = { x: number; y: number; r: number };

/** Four seeded "network" compositions in the logo's visual language. */
const layouts: ((rand: () => number, i: number) => [number, number])[] = [
  // orbit
  (rand, i) => {
    const a = (i / ART_NODES) * Math.PI * 2 + rand() * 0.3;
    const r = i % 3 === 0 ? 0.35 + rand() * 0.3 : 1;
    return [200 + Math.cos(a) * 150 * r, 120 + Math.sin(a) * 70 * r];
  },
  // cluster
  (rand) => {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand());
    return [200 + Math.cos(a) * 120 * r, 118 + Math.sin(a) * 88 * r];
  },
  // flow
  (rand, i) => {
    const x = 30 + (i / ART_NODES) * 340;
    return [x, 120 + Math.sin(x / 48) * 52 + (rand() - 0.5) * 40];
  },
  // lattice
  (rand, i) => [
    60 + (i % 7) * 47 + (rand() - 0.5) * 18,
    45 + Math.floor(i / 7) * 50 + (rand() - 0.5) * 18,
  ],
];

const artCache = new Map<
  number,
  { nodes: ArtNode[]; edges: [number, number][] }
>();

function artNetwork(variant: number) {
  const cached = artCache.get(variant);
  if (cached) return cached;
  const rand = mulberry32(97 + variant * 131);
  const nodes = Array.from({ length: ART_NODES }, (_, i) => {
    const [x, y] = layouts[variant](rand, i);
    return { x: Math.round(x), y: Math.round(y), r: 1.4 + rand() * 1.8 };
  });
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
  });
  const net = { nodes, edges };
  artCache.set(variant, net);
  return net;
}

export function Art({
  variant = 0,
  video = false,
}: {
  variant?: number;
  video?: boolean;
}) {
  const v = ((variant % 4) + 4) % 4;
  const { nodes, edges } = artNetwork(v);
  const hub = nodes[(v * 7) % ART_NODES];
  return (
    <div aria-hidden="true" className={`art art-${v}`}>
      <div className="art-grid" />
      <svg
        className="art-net"
        viewBox={`0 0 ${ART_W} ${ART_H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="art-edges">
          {edges.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
            />
          ))}
        </g>
        <g className="art-nodes">
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} />
          ))}
        </g>
        <circle className="art-hub-glow" cx={hub.x} cy={hub.y} r={34} />
        <circle className="art-hub" cx={hub.x} cy={hub.y} r={4} />
      </svg>
      {video && (
        <span className="play-disc">
          <Play fill="currentColor" size={22} />
        </span>
      )}
    </div>
  );
}

export function ContentCard({
  entry,
  index = 0,
  visual = false,
  featured = false,
}: {
  entry: Entry;
  index?: number;
  visual?: boolean;
  featured?: boolean;
}) {
  return (
    <Link
      className={`content-card ${visual ? "visual-card" : ""} ${featured ? "featured-card" : ""}`}
      href={`/${entry.kind}/${entry.slug}`}
      data-tilt
    >
      {visual &&
        (entry.youtubeId ? (
          <div className="video-thumbnail">
            <Image
              src={`https://i.ytimg.com/vi/${entry.youtubeId}/hqdefault.jpg`}
              alt=""
              width={480}
              height={360}
              sizes="(max-width: 760px) 100vw, 33vw"
            />
            <span className="play-disc">
              <Play size={20} />
            </span>
          </div>
        ) : (
          <Art variant={index} video={entry.kind === "videos"} />
        ))}
      <div className="card-body">
        <div className="card-meta">
          <span>{entry.category}</span>
          <span>
            {entry.kind === "videos"
              ? entry.duration || (entry.youtubeId ? "Video" : "Video outline")
              : `${entry.readingTime} min read`}
          </span>
        </div>
        <h3>
          {entry.title}
          <ArrowUpRight size={19} />
        </h3>
        <p>{entry.summary}</p>
        <div className="card-date">
          {formatDate(entry.published)}
          {entry.demo && (
            <span>Demo {entry.kind === "videos" ? "outline" : "content"}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
