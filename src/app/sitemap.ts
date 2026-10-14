import { MetadataRoute } from "next";
import { site } from "@/config/site";
import { allContent, kinds } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...kinds, "newsletter", "about", "contact", "privacy"]
    .map((p) => ({ url: `${site.url}/${p}` }))
    .concat(
      allContent().map((e) => ({
        url: `${site.url}/${e.kind}/${e.slug}`,
        lastModified: new Date(e.updated || e.published),
      })),
    );
}
