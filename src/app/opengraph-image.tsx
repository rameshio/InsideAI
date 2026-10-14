import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Inside AI: Understand AI. Find useful tools. Build something.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#3db8ff";

export default async function Image() {
  const logo = await readFile(
    path.join(process.cwd(), "public/brand/insideai-logo-512.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px",
        background:
          "radial-gradient(circle at 78% 45%, #0b2a5c 0%, #010104 60%)",
        color: "#eaf3ff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          Inside<span style={{ color: ACCENT, fontWeight: 400 }}>AI</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, letterSpacing: -3 }}>AI moves fast.</div>
          <div style={{ fontSize: 80, letterSpacing: -3, color: ACCENT }}>
            Stay Inside.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#b3c3df" }}>
          Understand AI. Find useful tools. Build something.
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        width={400}
        height={400}
        alt=""
        style={{ borderRadius: 32, border: "2px solid #1f4f8f" }}
      />
    </div>,
    size,
  );
}
