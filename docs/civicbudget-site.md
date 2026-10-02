# The CivicBudget site (`/CivicBudget`)

[CivicBudget](https://github.com/SpencerSmithSite/civic-budget) is budget preparation and a
public transparency portal for Ohio local government. Its product site is one static page at
**`public/CivicBudget/`**, served at **<https://spencersmith.site/CivicBudget/>**.

```
public/CivicBudget/
  index.html            the whole site: hero, the budget year, Civic Buddy (the AI assistant), forecasting, features, ERP, security, demo, FAQ, contact
  assets/css/site.css   one stylesheet; colors are the app's own design tokens
  assets/js/site.js     clips play in view with a pause button on each, copy the demo password, send the form
  assets/fonts/         Public Sans and IBM Plex Mono, self-hosted, with their OFL licenses
  assets/img/           the hero screenshot, the portal overview, a Civic Buddy answer on the portal, the projection report, the logo, the social card
  assets/video/         six silent clips (MP4) and their poster images: Civic Buddy in the admin app, Civic Buddy on the portal,
                        the multi-year plan, a department request, the worksheet, and the portal on a phone
```

Like Council, it is plain HTML, CSS, and a little JavaScript. Next does not build it; it is
copied into the deployment as static files. Everything works without JavaScript: the clips keep
their native controls, and the form posts straight to Formspree.

## Routing

The folder keeps the product's capitals, and `next.config.mjs` wires it like Council
(`trailingSlash`, plus a rewrite that supplies the directory index). People type the address in
lowercase, and a redirect cannot fix that. Measured against a production build:

| URL | Result |
|---|---|
| `/CivicBudget` | 308 to `/CivicBudget/`, then the page |
| `/civicbudget/` | the page |
| `/civicbudget/assets/css/site.css` | the stylesheet |
| `/CivicBudget/nope.css` | 404 |

A redirect from `/civicbudget/` to `/CivicBudget/` loops forever, because Next matches redirect
sources without regard to case, so `/CivicBudget/` matches it too. What works instead is a
rewrite from `/CivicBudget/:path+` to the same path:
- the exact spelling is a public file, served (case-sensitively) before rewrites run;
- any other spelling misses and is rewritten onto the real folder.

The page's canonical link keeps search engines on one address.

## Choices worth knowing

- **Built to be skimmed.** The hero is a headline, one sentence, and two buttons; five short points
  under it say what the product does and jump to each section. Lead paragraphs are a sentence or
  two in darker text than captions, bullets start with a bold label, and a feature inside a section
  is a smaller heading than the section itself.
- **A screen and a phone, staged together.** Where a desktop screenshot and a phone clip show the
  same thing, they are one composition (`.stack`): the screen behind, tilted slightly one way, the
  phone over its lower-right corner, tilted the other, with one caption under both. The stage keeps
  its proportions, so the overlap holds at every width; on a phone, the phone clip grows.
- **Layering only where it adds something.** Three places overlap one thing on another: the hero's
  fund check, the screen-and-phone pairs (`.stack`), and the pace card on the projections report
  (`.lift` with a `.callout`, both square to the page), because a dense table does not make "on pace
  with last year" obvious.
  Everything else sits straight. The pace card's figures come from the seed; re-check them after a
  reseed changes the data.
- **Always light, with navy bands.** The hero, the security section, and the footer are navy like
  the app's sidebar; everything else is light. There is no dark color scheme: one turned every
  section dark on a device set to dark mode, which buried the contrast between the bands.
- **Not only for Ohio.** The page speaks to local government generally. Ohio comes up once, in the
  FAQ, which says honestly which rules are settings and which forms a new state would add.

- **Fonts are self-hosted.** A page that sells security should not hand every visitor's address
  to a font host. Only the Latin subsets are included. Public Sans is the U.S. government's
  typeface (USWDS); IBM Plex Mono sets account numbers and statute citations.
- **Clips, not GIFs.** Each clip is an H.264 MP4 of 200 to 800 KB. A GIF of the same clip would
  be several megabytes and worse to look at.
  - They start only when on screen, never under `prefers-reduced-motion`, and each has a
    Pause/Play button, since WCAG 2.2.2 requires a way to stop moving content that lasts more
    than five seconds.
  - Each has a one-line caption, and the full step-by-step under "What happens in this clip". The
    video's `aria-describedby` points at the full text, so a screen reader gets all of it either way.
  - In the two AI clips, the seconds the model spends answering play eight times faster, and the
    caption says so. Nothing else in any clip is sped up or cut.
- **The contact form** posts to the same Formspree endpoint as the rest of the site. A hidden
  `_subject` of "CivicBudget inquiry" tells the messages apart, and `_gotcha` is Formspree's
  honeypot.
- **The page wakes the demo.** The live demo sleeps when idle (the container scales to zero and
  the free database pauses), so a first visit waits about a minute. `site.js` sends one `POST` to
  the demo's `/health/wake` when this page loads, so the demo starts waking while the reader is still
  here. The request starts a sleeping container, which wakes the database, and the endpoint wakes a
  database that paused behind a running container. The app does nothing unless a wake is due, so the
  ping cannot hold the database awake. It costs nothing while nobody visits, and it is
  skipped under Save-Data and in automated browsers (`navigator.webdriver`), so crawlers and the
  screenshot scripts do not spend the demo's free allowance. The demo's address is read from the
  "Open the demo" link (`data-demo`), so it lives in one place.
- **The Administrator login comes first.** Most people trying the demo want to see everything, so
  the demo section opens with a "Start here" card for `admin@mapleridge.example`: the email and
  password, each with a copy button, and the way in. The other logins sit beside it in a table, one
  role at a time.
- **The demo password is on the page on purpose.** It is public in the app's README too. The demo
  holds only fictional data and is rebuilt every night.

## Regenerating the clips and screenshots

The clips come from the app itself, recorded by Playwright from a freshly seeded local copy. The
script lives in the app repository, `scripts/screenshots/site-clips.mjs`, which says how to run it
and how to encode the output. The two Civic Buddy clips need a model connected to the
local app (`Assistant:ApiKey` in its user-secrets), and their answers differ a little each run, so
check the captions' figures against the new recording. After re-recording, copy `*.mp4` and
`*-poster.webp` into `assets/video/`.

`portal-overview.webp` and `projection.webp` are the app's README screenshots (`docs/screenshots`,
made by `scripts/screenshots/capture.mjs` and `capture-ai.mjs`) resized to 1600 wide; the
projection is cropped to the report, without the app's sidebar, so it reads at the size it is
shown. `portal-ask.webp` is the README's Civic Buddy answer page (`portal-ask.png`), resized the
same way.

The hero screenshot is the FY2027 worksheet as the Fiscal Officer, at 1440 × 900 and 2× scale,
resized to 1600 wide as WebP. The Street fund panel over it (`.check` in `index.html`) repeats
that screenshot's figures ($21,908.68 over, every reseed), so update both together.

`assets/img/social.png` (the link preview) is a screenshot of this page's own hero at
1200 × 630.

The site is deliberately not listed on the portfolio's home page or in `lib/projects.ts`; it is
reached by its address.

## Working on it locally

```bash
python3 -m http.server 8123 --directory public
```

Then open <http://localhost:8123/CivicBudget/>. Use `npm run build && npx next start` to check the
routing rules above, which only a production build applies.
