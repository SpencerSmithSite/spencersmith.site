/* Build the two files the photo gallery actually ships.
 *
 * next.config.mjs keeps images.unoptimized, so next/image serves each file as
 * stored: no resize, no modern format, no srcset. The camera JPEGs are several
 * megabytes each. This script replaces them with:
 *
 *   public/photos/<name>.jpeg          JPEG quality 80, long edge 2048px
 *                                      (lightbox)
 *   public/photos/thumbs/<name>.jpeg   JPEG quality 80, 800px wide
 *                                      (grid)
 *
 * Other files in public/photos (project screenshots) are left alone.
 *
 * Requires macOS `sips`. From the repo root, with the camera original still
 * at public/photos/<name>.jpeg:
 *
 *   node scripts/resize-gallery-photos.mjs
 *
 * A file whose long edge is already 2048px or less is not re-encoded, so
 * running the script again does not crush the lightbox JPEG a second time.
 * The thumbnail is always rewritten from the lightbox file. Add a new gallery
 * photo by dropping the original in public/photos, appending its filename
 * below, running this script, and copying the printed pixel size into
 * components/photo-gallery.tsx.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, renameSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photoDir = join(root, "public/photos");
const thumbDir = join(photoDir, "thumbs");

const LONG_EDGE = 2048;
const THUMB_WIDTH = 800;
const JPEG_QUALITY = "80";

const GALLERY = [
  "beach-branch.jpeg",
  "waves-crashing.jpeg",
  "beach-rocks.jpeg",
  "snowy-stairs.jpeg",
  "ocean-sand.jpeg",
  "still-river.jpeg",
  "orange-flower.jpeg",
  "lighthouse.jpeg",
  "no-trespassing.jpeg",
  "flowing-river.jpeg",
  "TealAndOrangeSunset.jpeg",
];

function sips(args) {
  execFileSync("sips", args, { stdio: ["ignore", "ignore", "pipe"] });
}

function dimensions(file) {
  const out = execFileSync(
    "sips",
    ["-g", "pixelWidth", "-g", "pixelHeight", file],
    { encoding: "utf8" },
  );
  const width = Number(out.match(/pixelWidth: (\d+)/)?.[1]);
  const height = Number(out.match(/pixelHeight: (\d+)/)?.[1]);
  if (!width || !height) {
    throw new Error(`Could not read dimensions of ${file}`);
  }
  return { width, height };
}

mkdirSync(thumbDir, { recursive: true });

let bytesBefore = 0;
let bytesAfter = 0;

for (const name of GALLERY) {
  const src = join(photoDir, name);
  const thumb = join(thumbDir, name);
  const sizeBefore = statSync(src).size;
  bytesBefore += sizeBefore;

  const original = dimensions(src);
  const longEdge = Math.max(original.width, original.height);

  if (longEdge > LONG_EDGE) {
    const tmp = join(tmpdir(), `gallery-large-${name}`);
    sips([
      "-Z",
      String(LONG_EDGE),
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      JPEG_QUALITY,
      src,
      "--out",
      tmp,
    ]);
    renameSync(tmp, src);
  }

  const large = dimensions(src);
  const thumbTmp = join(tmpdir(), `gallery-thumb-${name}`);
  if (large.width > THUMB_WIDTH) {
    sips([
      "--resampleWidth",
      String(THUMB_WIDTH),
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      JPEG_QUALITY,
      src,
      "--out",
      thumbTmp,
    ]);
  } else {
    sips([
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      JPEG_QUALITY,
      src,
      "--out",
      thumbTmp,
    ]);
  }
  renameSync(thumbTmp, thumb);

  const thumbSize = statSync(thumb).size;
  const largeSize = statSync(src).size;
  bytesAfter += largeSize + thumbSize;
  const thumbDims = dimensions(thumb);
  console.log(
    `${name}\tlightbox ${large.width}x${large.height} ${largeSize}B\tthumb ${thumbDims.width}x${thumbDims.height} ${thumbSize}B\toriginal ${original.width}x${original.height} ${sizeBefore}B`,
  );
}

console.log(`total_before ${bytesBefore}`);
console.log(`total_after ${bytesAfter}`);
