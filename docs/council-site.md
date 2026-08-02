# The Council site (`/council`)

[Council](https://github.com/SpencerSmithSite/council) is an offline-first
theology research app. Its marketing and documentation site lives in this
repository at **`public/council/`** and is served at
**<https://spencersmith.site/council>**.

```
public/council/
  index.html      Home — what it is, screenshot carousel, features
  sources.html    Every work in the library, searchable, plus a request form
  docs.html       How the app works, Ollama setup, getting an API key
  download.html   OS detection, then every platform
  assets/         css, js, data, images — no build step, no dependencies
```

It is plain HTML, CSS and vanilla JavaScript. Next.js does not build it, lint it
or know it exists — it is copied verbatim into the deployment as a static asset,
so editing a page is editing that page.

## Why it needs two lines of `next.config.mjs`

Dropping static HTML into `public/` does *not* give you a working `/council`.
Measured against a production build:

| URL | Without config |
|---|---|
| `/council` | **404** |
| `/council/` | **308 → `/council`** — i.e. redirects into the 404 |
| `/council/index.html` | 200 |
| `/council/assets/…` | 200 |

Next serves `public/` by exact filename and does no directory-index resolution,
so `/council` matches nothing.

The obvious fix — rewriting `/council` straight to `/council/index.html` — is a
trap. The address bar keeps `/council`, so the site's relative
`href="assets/css/site.css"` resolves against the site root as
`/assets/css/site.css`, and the page renders **unstyled**.

What actually works, and what is in the config:

```js
trailingSlash: true,
async rewrites() {
  return [{ source: '/council/', destination: '/council/index.html' }]
},
```

`trailingSlash` reverses the redirect so `/council` resolves *to* `/council/`,
which also makes the relative links resolve correctly; the rewrite supplies the
directory index Next will not. Note that `trailingSlash` is site-wide — any Next
routes added later will get trailing slashes too.

## Regenerating the source catalogue

`public/council/assets/data/sources.json` is **generated, never hand-edited**. It
holds all 687 works with their provenance and an excerpt of each work's own
opening text.

The generator lives in the **app** repository, not this one, because it needs the
900 MB corpus database and imports the app's own pack-assignment code — so
"which download contains this work" is answered by the same function that decides
what goes into the download. From a checkout of `SpencerSmithSite/council`:

```bash
gunzip -k assets/theology.db.gz          # only if the DB isn't unpacked yet
python3 tools/export_catalogue.py --out /path/to/spencersmith.site/public/council/assets/data/sources.json
```

Then commit the JSON here. Re-run it after any corpus rebuild — the home and
download pages read their headline figures from the same file, so they cannot
drift from the catalogue.

## Publishing an app release

The download page's platform table is at the top of
`public/council/assets/js/download.js`. iOS points at the TestFlight beta; every
other platform points at an asset attached to
[`v2026.7.27`](https://github.com/SpencerSmithSite/council/releases/tag/v2026.7.27).
A platform with `url: null` renders an honestly disabled **Coming soon** button
rather than a live-looking button that goes nowhere.

Linux ships two packages, so it also sets `alt` — a second, quieter link under
the button. The AppImage leads because it runs on any distribution; the `.deb`
sits beneath it for Debian and Ubuntu. `alt` is suppressed whenever `url` is
null, so an alternative format can never appear beside a Coming soon button.

Builds are release assets rather than files in this repository on purpose. The
APK alone is 107 MB, over GitHub's hard 100 MiB limit for a tracked file, so it
cannot be committed here at all; Git LFS would get it into GitHub but Vercel does
not fetch LFS objects at build time, so the site would serve the pointer file
instead of the app.

`requires` is a claim about the build that is actually being served, so it is
read off the artefact rather than written from memory. Every line on this page
was wrong before a build existed to check it against:

| Platform | Claimed | Actual | Read from |
|---|---|---|---|
| iOS | 13 or later | **16 or later** | `IPHONEOS_DEPLOYMENT_TARGET`, `ios/Podfile` |
| macOS | 11, Apple silicon and Intel | **12, Apple silicon** | `LSMinimumSystemVersion`, `ARCHS`/`EXCLUDED_ARCHS` |
| Linux | glibc 2.31 | **glibc 2.34** | `GLIBC_` symbols in the binary and its libraries |
| Android | 8 or later | **7 or later** | `minSdkVersion` in the APK manifest |

The iOS one was the dangerous direction: it promised support the build does not
have, so a reader on iOS 13 or 14 would join the TestFlight beta and then find
that nothing would install. The other three erred the other way and merely
turned away hardware that works — which is cheaper, but still wrong.

Read the figures back off the artefact after any toolchain or dependency bump.
Every one of these was written from memory, and every one of them was wrong.

iOS moved again on 2026-08-02, from 15 to 16, when `flutter_gemma` was added to
the app for on-device generation — it requires 16. That is the case the rule is
about: the figure changed because of a *dependency*, not a deliberate decision
about which devices to support, and nothing would have prompted anyone to come
and update this page.

The macOS DMG is signed with the Developer ID certificate and has the hardened
runtime enabled, but is **not notarised** — notarisation needs Apple credentials
that only Spencer can supply. Until it is, Gatekeeper refuses the app on a plain
double-click, which is what the platform's `note` warns about. Notarise with:

```bash
xcrun notarytool submit Council-macos.dmg \
  --apple-id <apple-id> --team-id Y2Q5JVG8X5 --password <app-specific-password> \
  --wait
xcrun stapler staple Council-macos.dmg
```

Then re-upload the DMG with `gh release upload … --clobber` and drop the `note`.

## Windows and Linux

Flutter refuses to build a desktop target on any host but that target's own OS,
so neither can be produced on a Mac. They are built by a manually dispatched
workflow in the **app** repository, `.github/workflows/release-desktop.yml`,
which attaches an Inno Setup installer, a `.deb` and an AppImage to an existing
release tag:

```bash
gh workflow run release-desktop.yml --repo SpencerSmithSite/council -f tag=v2026.7.27
```

Both jobs fetch the embedding model before building. `assets/model/*.onnx` is
gitignored in the app repository, so a fresh checkout cannot bundle its assets —
the first run of this workflow died on `No file or variants found for asset`
because only local trees happened to have the file.

The Windows installer is **unsigned**, so SmartScreen warns on first run; that is
what the Windows `note` explains. Signing it needs an Authenticode certificate,
which is a purchase rather than a setting.

The Linux runner is pinned to `ubuntu-22.04`, whose glibc is 2.35 — but the
stated requirement is **glibc 2.34**, because that is the highest `GLIBC_` symbol
the built binary and its bundled libraries actually reference:

```bash
strings -a council lib/*.so | grep -oE 'GLIBC_2\.[0-9]+' | sort -t. -k2 -n -u | tail -1
```

Taking the figure from the runner image instead would have excluded glibc 2.34
distributions — RHEL 9 among them — that run the binary perfectly well. Re-measure
after any runner bump rather than assuming the image version.

To publish, set `url` — and optionally `size` and `version` — on that platform:

```js
{
  id: "macos",
  …
  url: "https://github.com/SpencerSmithSite/council/releases/download/v2026.7.27/Council-macos.dmg",
  size: "74 MB",
  version: "2026.7.27",
}
```

That is the whole change; the button goes live in both the lead card and the full
list. The page deliberately does not read the GitHub releases API — that would
put a network request in front of the one thing the page exists to do, and would
surface the `corpus-vNN` releases, which are corpus data rather than the app.

## Screenshots

`public/council/assets/img/screens/*.webp` are real captures of the app running
the real library, taken from the Android release build, resized to 600px wide and
converted to WebP (528 KB for all eight).

```bash
adb exec-out screencap -p > shot.png
sips --resampleWidth 600 shot.png
cwebp -q 82 shot.png -o public/council/assets/img/screens/name.webp
```

Slides — image, alt text and caption together — are declared at the top of
`assets/js/carousel.js`. Adding one is a single entry.

## The request form

`sources.html` posts to the same Formspree endpoint as the site's own contact
form. A hidden `_subject` field marks the messages as coming from Council so they
are distinguishable in the inbox.

The form sits after all 687 entries, which made it effectively undiscoverable —
reaching it meant scrolling the entire catalogue, and nothing above said it
existed. A **Request a work** link now shares the count row inside the controls
bar, which is sticky, so it is both visible on arrival and reachable from
anywhere in the list.

That link also forced a fix to the sticky bar. A sticky element sticks for the
height of its **containing block**, and `.controls` had `<main>` as its parent —
so the search bar stayed pinned over the request form at the foot of the page,
where it has nothing to search, and covered the heading whenever the anchor was
followed. Wrapping the controls and the results in `.catalogue` bounds it to the
list it belongs to. If a section is ever added between the catalogue and the
footer, it belongs outside that wrapper.

## Theming

The Council site has its own light/dark toggle, independent of the rest of the
site. Every colour is a custom property declared twice in
`assets/css/site.css`; nothing below those blocks names a literal colour. The
palette comes from the app's own icon.

The theme is applied by a **blocking inline script in each page's `<head>`**, not
by the deferred `site.js`. Anything deferred runs after first paint, and a
dark-mode reader would get a white flash on every navigation.

The choice is stored in `localStorage` under `council-theme`. With nothing stored
the page follows `prefers-color-scheme` and keeps following it; once the reader
has chosen, their choice wins.

## Working on it locally

`npm run dev` serves it at <http://localhost:3000/council> like the real thing.

For a faster loop on the static files alone, skip Next entirely:

```bash
python3 -m http.server 8123 --directory public/council
```

It must be served over HTTP rather than opened as a file — `sources.html`
fetches `sources.json`, and browsers block `fetch` from `file://`. Every other
page works opened directly.
