import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

/** Width / height of public/brand/insideai-mark-wide.png (147x120). */
const MARK_ASPECT = 147 / 120;

/** The brand lockup: the bare IA constellation mark plus the "InsideAI" wordmark. */
export function Wordmark({
  size = 40,
  preload = false,
}: {
  size?: number;
  preload?: boolean;
}) {
  return (
    <span className="wordmark">
      <Image
        className="wordmark-logo"
        src="/brand/insideai-mark-wide.png"
        alt=""
        width={Math.round(size * MARK_ASPECT)}
        height={size}
        preload={preload}
      />
      <span>
        Inside<span className="wordmark-ai">AI</span>
      </span>
    </span>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="header wrap">
        <Link href="/" aria-label="Inside AI home" className="brand-link">
          <Wordmark size={46} preload />
        </Link>
        <nav aria-label="Main navigation" className="main-nav">
          <NavLinks />
        </nav>
        <Link className="button header-cta" href="/newsletter">
          Get AI Updates
          <ArrowUpRight size={15} />
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" aria-label="Inside AI home">
              <Wordmark size={52} />
            </Link>
            <p>
              Less hype. More understanding.
              <br />
              Your next step in AI starts here.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span>Explore</span>
              {["Updates", "Videos", "Guides", "Resources"].map((n) => (
                <Link key={n} href={`/${n.toLowerCase()}`}>
                  {n}
                </Link>
              ))}
            </div>
            <div>
              <span>Connect</span>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
              {site.youtube && (
                <a
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube ↗
                </a>
              )}
              <Link href="/newsletter">Newsletter</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <span>Inside AI</span>
              <Link href="/about">About Ramesh</Link>
              <Link href="/privacy">Privacy</Link>
              <a href="/rss.xml">RSS feed ↗</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Inside AI. Ramesh Badugu</span>
          <span>
            Made for the curious.
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </footer>
  );
}
