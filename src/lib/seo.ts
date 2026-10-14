import type { Metadata } from "next";
import { site } from "@/config/site";
export function metadata(
  title: string,
  description: string,
  path = "",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${site.url}${path}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: `${site.url}${path}`,
      images: [
        { url: `${site.url}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
  };
}
export function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
