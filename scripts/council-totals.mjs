/* Writes the hero totals the home and download pages fetch, from the catalogue.
 *
 *   node scripts/council-totals.mjs           # rewrite totals.json
 *   node scripts/council-totals.mjs --check   # fail if the two disagree
 *
 * `sources.json` is the full catalogue (hundreds of kilobytes) and only the
 * sources page needs it. The home and download pages fill a handful of
 * `[data-stat]` nodes, so they fetch `totals.json` instead. The two files
 * state the same counts only because this script derives one from the other.
 * After a corpus rebuild, run it again. `npm run check:council` runs `--check`
 * and fails if the catalogue changed and totals.json was left behind.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcesPath = join(root, "public/council/assets/data/sources.json");
const totalsPath = join(root, "public/council/assets/data/totals.json");

/** The fields `stats.js` formats into the hero. `collections` is the array
 *  length, which is what the old fetch of the full catalogue exposed as
 *  `data.collections.length`. */
const KEYS = [
  "corpusVersion",
  "sources",
  "units",
  "chars",
  "authors",
  "traditions",
  "collections",
];

function report(problems) {
  console.error(
    `Council totals check failed — ${problems.length} disagreement(s) ` +
      `between totals.json and sources.json:\n`,
  );
  for (const p of problems) console.error(`  • ${p}`);
  console.error("\nRegenerate with: node scripts/council-totals.mjs");
  process.exit(1);
}

export function totalsFromCatalogue(data) {
  const problems = [];
  const t = data && data.totals;
  if (typeof data?.corpusVersion !== "number" || !Number.isFinite(data.corpusVersion)) {
    problems.push("sources.json corpusVersion is not a finite number.");
  }
  if (!t || typeof t !== "object") {
    problems.push("sources.json has no totals object.");
  } else {
    for (const key of ["sources", "units", "chars", "authors", "traditions"]) {
      if (typeof t[key] !== "number" || !Number.isFinite(t[key])) {
        problems.push(`sources.json totals.${key} is not a finite number.`);
      }
    }
  }
  if (!Array.isArray(data?.collections)) {
    problems.push("sources.json has no collections array.");
  }
  if (problems.length) {
    const err = new Error(problems.join("\n"));
    err.problems = problems;
    throw err;
  }

  return {
    corpusVersion: data.corpusVersion,
    sources: t.sources,
    units: t.units,
    chars: t.chars,
    authors: t.authors,
    traditions: t.traditions,
    collections: data.collections.length,
  };
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function check(expected) {
  let actual;
  try {
    actual = readJson(totalsPath);
  } catch (err) {
    report([`could not read totals.json (${err.message}).`]);
  }

  const problems = [];
  const actualKeys = Object.keys(actual);
  const missing = KEYS.filter((k) => !Object.prototype.hasOwnProperty.call(actual, k));
  const extra = actualKeys.filter((k) => !KEYS.includes(k));
  if (missing.length) problems.push(`totals.json is missing ${missing.join(", ")}.`);
  if (extra.length) problems.push(`totals.json has unexpected keys: ${extra.join(", ")}.`);

  for (const key of KEYS) {
    if (!Object.prototype.hasOwnProperty.call(actual, key)) continue;
    if (actual[key] !== expected[key]) {
      problems.push(
        `${key}: totals.json says ${JSON.stringify(actual[key])}, ` +
          `sources.json says ${JSON.stringify(expected[key])}.`,
      );
    }
  }
  if (problems.length) report(problems);

  console.log(
    `Council totals check passed: ${expected.sources} works, ` +
      `${expected.collections} collections, corpus ${expected.corpusVersion}.`,
  );
}

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  let expected;
  try {
    expected = totalsFromCatalogue(readJson(sourcesPath));
  } catch (err) {
    report(err.problems || [err.message]);
  }

  if (process.argv.includes("--check")) {
    check(expected);
  } else {
    writeFileSync(totalsPath, JSON.stringify(expected, null, 2) + "\n");
    console.log(`Wrote totals.json from sources.json (corpus ${expected.corpusVersion}).`);
  }
}
