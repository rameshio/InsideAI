/**
 * Rebuilds every brand image from the two source files in design/source/:
 *   insideai-logo-source.jpg  the IA constellation mark on black
 *   hero-sky-source.jpg       the homepage hero sky (stars + nebula)
 *
 * Run: node scripts/build-brand-assets.mjs
 */
import sharp from "sharp";

const LOGO_SRC = "design/source/insideai-logo-source.jpg";
const SKY_SRC = "design/source/hero-sky-source.jpg";
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };
const MARK_THRESHOLD = 60; // brighter than the source's background noise (~50)
const EDGE_IGNORE = 60; // px; the source has a bright 1px frame at its edge
const ALPHA_FLOOR = 52; // channel peaks at or below this become transparent

/** Bounding box of the mark, ignoring background noise and the edge frame. */
async function markBox() {
  const { data, info } = await sharp(LOGO_SRC)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  let left = width;
  let top = height;
  let right = 0;
  let bottom = 0;
  for (let y = EDGE_IGNORE; y < height - EDGE_IGNORE; y++) {
    for (let x = EDGE_IGNORE; x < width - EDGE_IGNORE; x++) {
      const i = (y * width + x) * 3;
      if (Math.max(data[i], data[i + 1], data[i + 2]) <= MARK_THRESHOLD)
        continue;
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

/**
 * Light-on-black to real transparency: alpha is the brightest channel above
 * the noise floor, and the colour is un-premultiplied so it looks the same
 * when composited on black.
 */
async function toCutout(input) {
  const { data, info } = await sharp(input)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const peak = Math.max(data[i], data[i + 1], data[i + 2]);
    const a = Math.max(0, (peak - ALPHA_FLOOR) / (255 - ALPHA_FLOOR));
    const scale = a > 0 ? 255 / peak : 0;
    out[j] = Math.min(255, Math.round(data[i] * scale));
    out[j + 1] = Math.min(255, Math.round(data[i + 1] * scale));
    out[j + 2] = Math.min(255, Math.round(data[i + 2] * scale));
    out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

/** The keyed mark centred in a transparent square with the given padding. */
async function squareMark(cut, box, padding) {
  const side = Math.round(Math.max(box.width, box.height) * (1 + padding * 2));
  const clear = { r: 0, g: 0, b: 0, alpha: 0 };
  return sharp(cut)
    .extend({
      top: Math.floor((side - box.height) / 2),
      bottom: Math.ceil((side - box.height) / 2),
      left: Math.floor((side - box.width) / 2),
      right: Math.ceil((side - box.width) / 2),
      background: clear,
    })
    .png()
    .toBuffer();
}

/** Flattens a transparent mark onto pure black at the given size. */
const onBlack = (img, size) =>
  sharp(img).resize(size, size).flatten({ background: BLACK });

const box = await markBox();
const cut = await toCutout(await sharp(LOGO_SRC).extract(box).toBuffer());
const page = await squareMark(cut, box, 0.12);
const tight = await squareMark(cut, box, 0.04);

await Promise.all([
  onBlack(page, 1254)
    .webp({ quality: 90 })
    .toFile("public/brand/insideai-logo.webp"),
  onBlack(page, 512).png().toFile("public/brand/insideai-logo-512.png"),
  onBlack(tight, 96).png().toFile("public/brand/insideai-mark-96.png"),
  // the header/footer lockup: the bare mark, no tile, at 3x a ~40px height
  sharp(cut)
    .resize({ height: 120 })
    .png()
    .toFile("public/brand/insideai-mark-wide.png"),
  onBlack(tight, 64).png().toFile("src/app/icon.png"),
  onBlack(page, 180).png().toFile("src/app/apple-icon.png"),
  sharp(tight)
    .resize(1000, 1000)
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile("public/brand/insideai-logo-cutout.webp"),
  sharp(SKY_SRC).webp({ quality: 80 }).toFile("public/brand/hero-sky.webp"),
  sharp(SKY_SRC)
    .resize({ width: 1100 })
    .webp({ quality: 78 })
    .toFile("public/brand/hero-sky-1100.webp"),
]);
console.log("brand assets rebuilt");
