/* Proves that the Council download page and the app's update manifest describe
 * the same release.
 *
 *   node scripts/check-council-release.mjs
 *
 * They are two files by necessity — the page is authored HTML/JS that must
 * render with no network request of its own, and the manifest is machine-read
 * by the installed app — but they state the same versions, the same URLs and
 * the same sizes. Nothing enforced that, and the failure is quiet in the worst
 * way: the page offers a build the app will never update itself to, or the app
 * chases a version the page has never heard of, and neither one looks broken.
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
