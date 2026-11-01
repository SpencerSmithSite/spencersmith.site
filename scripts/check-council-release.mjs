/* Proves that the Council download page and the app's update manifest describe
 * the same release.
 *
 *   node scripts/check-council-release.mjs
 *
 * They are two files by necessity — the page is authored HTML/JS that must
 * render with no network request of its own, and the manifest is machine-read
 * by the installed app — but they state the same versions, the same URLs, the
 * same sizes and the same sha256 checksums. Nothing enforced that, and the
 * failure is quiet in the worst way: the page offers a build the app will
 * never update itself to, or the app chases a version the page has never
 * heard of, and neither one looks broken.
 *
 * The Debian package is the exception the app does not install. Its url,
 * bytes and sha256 live on `platforms.linux.deb`, a key the updater never
 * reads, and on the page's Linux `alt`. This script checks those too.
 *
 * Exits non-zero and prints every disagreement, so one run finds all of them.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pageSrc = readFileSync(
  join(root, "public/council/assets/js/download.js"),
  "utf8",
);
const manifest = JSON.parse(
  readFileSync(join(root, "public/council/updates.json"), "utf8"),
);

/** The page's PLATFORMS array, evaluated rather than pattern-matched.
 *
 *  It is a pure data literal — strings and objects, no `document` — so running
 *  it is safe and, unlike a regex, cannot be broken by reformatting the file. */
function platformsFromPage() {
  const match = pageSrc.match(/var PLATFORMS = (\[[\s\S]*?\n  \]);/);
  if (!match) {
    throw new Error(
      "Could not find the PLATFORMS array in download.js. If it was renamed " +
        "or reshaped, update this script to match.",
    );
  }
  return new Function(`return ${match[1]}`)();
}

const problems = [];
const fail = (msg) => problems.push(msg);

/** Megabytes the way the page writes them: MiB, truncated. "195 MB" is
 *  204,610,770 bytes. */
const mib = (bytes) => Math.floor(bytes / (1024 * 1024));

const page = new Map(platformsFromPage().map((p) => [p.id, p]));

for (const [id, entry] of Object.entries(manifest.platforms)) {
  const p = page.get(id);
  if (!p) {
    fail(`updates.json has a "${id}" platform the download page does not list.`);
    continue;
  }

  // A per-platform version overrides the release-wide one, for the case where
  // one store lags behind the rest.
  const version = entry.version || manifest.version;
  if (p.version !== version) {
    fail(
      `${id}: the page says version ${p.version}, updates.json says ${version}.`,
    );
  }

  if (p.url !== entry.url) {
    fail(`${id}: the page and updates.json point at different downloads.\n` +
      `    page: ${p.url}\n    json: ${entry.url}`);
  }

  if (entry.kind === "download") {
    if (typeof entry.bytes !== "number" || entry.bytes <= 0) {
      fail(`${id}: updates.json needs a real byte count.`);
    }
    if (!/^[0-9a-f]{64}$/.test(entry.sha256 || "")) {
      fail(
        `${id}: updates.json needs a 64-character sha256. The app refuses to ` +
          `run an installer whose bytes do not match it, so a placeholder ` +
          `here means nobody can update.`,
      );
    }
    if (p.sha256 !== entry.sha256) {
      fail(
        `${id}: the page shows sha256 ${p.sha256 || "(none)"}, updates.json ` +
          `has ${entry.sha256}.`,
      );
    }
    // The page's size is prose ("195 MB"); the manifest's is exact. They should
    // still be the same number.
    const stated = parseInt(String(p.size), 10);
    if (Number.isFinite(stated) && stated !== mib(entry.bytes)) {
      fail(
        `${id}: the page says ${p.size}, updates.json's byte count is ` +
          `${mib(entry.bytes)} MB.`,
      );
    }
    // A download URL that does not carry the version tag is the classic stale
    // release: the numbers were bumped and the link was not.
    if (!entry.url.includes(`/v${version}/`)) {
      fail(`${id}: the download URL does not contain /v${version}/.`);
    }
  } else if (entry.kind !== "store") {
    fail(`${id}: unknown kind "${entry.kind}" — expected download or store.`);
  }
}

for (const id of page.keys()) {
  if (!(id in manifest.platforms)) {
    fail(
      `${id}: on the download page but not in updates.json, so that platform ` +
        `would never be offered an update.`,
    );
  }
}

// The .deb is an alternate download, not the file the updater installs. Its
// checksum still has to be real, and the page has to show the same one.
const linuxPage = page.get("linux");
const linuxEntry = manifest.platforms.linux;
const pageDeb = linuxPage && linuxPage.alt;
const manifestDeb = linuxEntry && linuxEntry.deb;
if (!pageDeb || !pageDeb.url) {
  fail("linux: the download page is missing the .deb link.");
} else if (!manifestDeb || typeof manifestDeb !== "object") {
  fail(
    "linux: updates.json is missing platforms.linux.deb. Put the Debian " +
      "url, bytes and sha256 there — the app ignores that object and keeps " +
      "updating from the AppImage.",
  );
} else {
  const version = linuxEntry.version || manifest.version;
  if (pageDeb.url !== manifestDeb.url) {
    fail(
      "linux .deb: the page and updates.json point at different downloads.\n" +
        `    page: ${pageDeb.url}\n    json: ${manifestDeb.url}`,
    );
  }
  if (!String(manifestDeb.url).includes(`/v${version}/`)) {
    fail(`linux .deb: the download URL does not contain /v${version}/.`);
  }
  if (!String(manifestDeb.url).endsWith(".deb")) {
    fail("linux .deb: the download URL does not end in .deb.");
  }
  if (!/^[0-9a-f]{64}$/.test(manifestDeb.sha256 || "")) {
    fail("linux .deb: updates.json needs a 64-character sha256.");
  }
  if (pageDeb.sha256 !== manifestDeb.sha256) {
    fail(
      `linux .deb: the page shows sha256 ${pageDeb.sha256 || "(none)"}, ` +
        `updates.json has ${manifestDeb.sha256}.`,
    );
  }
  if (typeof manifestDeb.bytes !== "number" || manifestDeb.bytes <= 0) {
    fail("linux .deb: updates.json needs a real byte count.");
  } else {
    const labelSize = String(pageDeb.label || "").match(/(\d+)\s*MB/);
    const stated = labelSize ? parseInt(labelSize[1], 10) : NaN;
    if (stated !== mib(manifestDeb.bytes)) {
      fail(
        `linux .deb: the page says ${pageDeb.label}, updates.json's byte ` +
          `count is ${mib(manifestDeb.bytes)} MB.`,
      );
    }
  }
}

for (const needle of [
  "checksumMarkup(lead.sha256)",
  "checksumMarkup(p.sha256)",
  "checksumMarkup(p.alt.sha256)",
]) {
  if (!pageSrc.includes(needle)) {
    fail(`download.js no longer shows a checksum (${needle}).`);
  }
}

if (problems.length) {
  console.error(
    `Council release check failed — ${problems.length} disagreement(s) ` +
      `between the download page and updates.json:\n`,
  );
  for (const p of problems) console.error(`  • ${p}`);
  process.exit(1);
}

console.log(
  `Council release check passed: ${manifest.version} (build ${manifest.build}) ` +
    `stated identically on the download page and in updates.json.`,
);
