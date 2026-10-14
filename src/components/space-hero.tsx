import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { Starfield } from "@/components/motion/starfield";

/**
 * The homepage opening section: the liquid particle sculpture hero, set in
 * deep space. The sculpture is the Inside AI logo (a transparent cut-out), so
 * moving the cursor through it turns the constellation into flowing star dust
 * that settles back into the mark.
 *
 * Layers, back to front: near-black sky > the sky photo (stars with a blue
 * nebula on the right, drifting very slowly) > a sparse animated starfield for
 * twinkle, parallax and shooting stars > SculptureHero (transparent
 * background, WebGL particles, copy).
 */

const LOGO_CUTOUT = "/brand/insideai-logo-cutout.webp";
const FONT = "var(--font-display), system-ui, sans-serif";
const BODY_FONT = "var(--font-sans), system-ui, sans-serif";

export function SpaceHero() {
  return (
    <div className="space-hero">
      <div className="space-sky" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative LCP backdrop with srcset; no optimizer needed */}
        <img
          className="space-photo"
          src="/brand/hero-sky.webp"
          srcSet="/brand/hero-sky-1100.webp 1100w, /brand/hero-sky.webp 2000w"
          sizes="100vw"
          width={2000}
          height={1056}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        <Starfield className="space-stars" />
      </div>
      <SculptureHero
        className="space-sculpture"
        src={LOGO_CUTOUT}
        darkSrc={LOGO_CUTOUT}
        mobileSrc={LOGO_CUTOUT}
        mobileDarkSrc={LOGO_CUTOUT}
        imageAlt="The Inside AI logo: a glowing constellation forming the letters I and A"
        showNav={false}
        eyebrow="Your perspective on artificial intelligence"
        headline={"AI moves fast.\nStay Inside."}
        headlineAccent="Inside."
        body="Understand AI. Find useful tools. Build something."
        primaryCta={{ label: "Get AI Updates", href: "/newsletter" }}
        secondaryCta={{ label: "Start exploring", href: "/guides" }}
        hint="Move through the stars"
        hintTouch="Touch the stars"
        theme="dark"
        themeToggle={false}
        background="#000000"
        darkBackground="#000000"
        textColor="#eaf3ff"
        accentColor="#3db8ff"
        headingFont={FONT}
        accentFont={FONT}
        bodyFont={BODY_FONT}
        loadFonts={false}
        height="calc(100svh - var(--header-h))"
        backdropText="InsideAI"
        sculptureScale={0.92}
        intro
        ambient
        ambientIntensity={0.45}
        liquid={1.2}
        strength={1.1}
        radius={210}
        dotSize={1.1}
        turbulence={1.25}
        speed={0.9}
      />
    </div>
  );
}
