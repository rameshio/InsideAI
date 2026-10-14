import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  outputFileTracingIncludes: {
    "/*": [
      "./content/**/*.mdx",
      "./public/downloads/*",
      "./public/images/*",
      "./public/brand/*",
    ],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};
export default config;
