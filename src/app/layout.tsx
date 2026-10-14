import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";
import { site } from "@/config/site";
import { Header, Footer } from "@/components/site-shell";
import { Effects } from "@/components/motion/effects";
import "./globals.css";

// Two families only: Syne (headings, labels, wordmark) gives the channel its
// own voice; Manrope keeps body text plain and easy to read.
const display = Syne({ subsets: ["latin"], variable: "--font-display" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Inside AI: A clearer view of what’s next",
    template: "%s | Inside AI",
  },
  description: site.description,
  openGraph: { siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#010104",
  colorScheme: "dark",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <div className="backdrop" aria-hidden="true" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
