import { projects, type Project } from "./projects"

export interface GalleryShot {
  src: string
  alt: string
  caption?: string
}

export interface Feature {
  title: string
  description: string
}

export interface Spec {
  label: string
  value: string
}

export interface ProjectPage {
  /** URL segment: the page lives at /<slug>. */
  slug: string
  /** Matching `id` in lib/projects.ts — the card data is the source of truth
   *  for title, tags, lead image and links, so it is not duplicated here. */
  projectId: string
  tagline: string
  overview: string[]
  features: Feature[]
  specs: Spec[]
  gallery: GalleryShot[]
  /** Overrides the "Visit site" CTA label when the destination is not a website. */
  liveLabel?: string
  status?: string
  /** Attribution, licensing, or an honest limitation worth stating up front. */
  note?: string
}

/**
 * Detail pages. Council is deliberately absent: it has its own hand-built
 * static site under public/council, wired to the app's update manifest.
 * The portfolio itself has no detail page — it is the site you are on.
 */
export const projectPages: ProjectPage[] = [
  {
    slug: "satsstack",
    projectId: "sats-stack",
    tagline:
      "Local-first Bitcoin-native personal finance — no cloud, no accounts, no tracking.",
    overview: [
      "Sats Stack is a cross-platform Flutter app that tracks fiat spending and a Bitcoin stack in the same place. Every transaction, budget and wallet balance lives in a local SQLite database on the device. There are no accounts to create and nothing is uploaded.",
      "The framing is what separates it from an ordinary budgeting app. Alongside income, spending and category budgets, it surfaces a \"fiat leak rate\" and an inflation cost, and prices each spending category in sats — so a purchase reads as an opportunity cost against the stack rather than just a line item.",
      "Wallets are imported read-only via xpub and synced through Mempool.space. Point the app at a self-hosted Mempool or Esplora node and every wallet sync and price lookup routes through it instead, with an in-app banner showing exactly which servers are being contacted.",
    ],
    features: [
      {
        title: "CSV import with auto-categorisation",
        description:
          "Imports bank statements with automatic format detection and category assignment, recording the historical BTC price at the time of each transaction.",
      },
      {
        title: "Read-only xpub wallet sync",
        description:
          "Imports BIP44/49/84 extended public keys and syncs balances and history through a Mempool.space Esplora endpoint. It never holds keys and cannot spend.",
      },
      {
        title: "Fiat leak rate dashboard",
        description:
          "Monthly income, spending and surplus alongside inflation cost, with a per-wallet breakdown when several wallets are active.",
      },
      {
        title: "Budgets priced in opportunity cost",
        description:
          "Per-category monthly budgets that also show what each category cost in sats, warning at 80% and alerting past 100%.",
      },
      {
        title: "Stack chart and DCA simulator",
        description:
          "Plots cumulative sats over 1M/3M/6M/1Y/All ranges and models future growth against a savings goal with a projected completion date.",
      },
      {
        title: "Self-hosted node routing",
        description:
          "Configuring a custom Mempool or Esplora server routes all wallet sync and price data exclusively through it, contacting no third-party servers.",
      },
      {
        title: "Local AI insights",
        description:
          "Generates a monthly spending insight and offers a chat screen against a locally running Ollama model on desktop.",
      },
      {
        title: "Analytics and full data export",
        description:
          "Spending pie charts, a six-month income-vs-spending trend, year-to-date summary, CSV export, and SQLite database export and import.",
      },
    ],
    specs: [
      { label: "Framework", value: "Flutter (Dart SDK ≥ 3.7)" },
      { label: "Database", value: "Drift 2.23 — type-safe reactive SQLite" },
      { label: "Charts", value: "fl_chart 0.71" },
      { label: "Routing", value: "go_router 16" },
      {
        label: "Bitcoin crypto",
        value: "pointycastle 4.0, bs58check, bech32",
      },
      {
        label: "Data sources",
        value: "Mempool.space Esplora, CoinGecko price fallback",
      },
      { label: "AI", value: "Ollama over HTTP, local or self-hosted" },
      {
        label: "Platforms",
        value: "macOS, Windows, Linux, iOS, Android",
      },
      { label: "Licence", value: "GPL-3.0" },
    ],
    gallery: [
      {
        src: "/projects/satsstack/dashboard.jpg",
        alt: "Sats Stack dashboard showing total stack, monthly surplus, fiat leak rate and inflation cost",
        caption: "The dashboard — stack total, surplus, leak rate and inflation cost.",
      },
      {
        src: "/projects/satsstack/features.jpg",
        alt: "The Sats Stack feature breakdown page",
        caption: "Feature breakdown from satsstack.app.",
      },
      {
        src: "/projects/satsstack/self-hosting.jpg",
        alt: "The Sats Stack self-hosting guide showing the architecture diagram",
        caption: "Self-hosting guide — run the whole stack on your own node.",
      },
    ],
    liveLabel: "Visit satsstack.app",
    status:
      "The app is feature-complete and has a full marketing site, but there is no published build yet — no GitHub release and no store listing. Running it today means building from source.",
    note: "Licensed GPL-3.0. Wallet import is read-only: Sats Stack is not a wallet, holds no keys and cannot spend. By default it contacts mempool.space and CoinGecko; the zero-third-party claim holds once a self-hosted Esplora server is configured.",
  },

  {
    slug: "schizo",
    projectId: "schizo",
    tagline:
      "An offline corkboard where the string between your notes is actually simulated.",
    overview: [
      "Schizo puts notes, links, images, screenshots and embedded videos on an infinite pannable canvas, and lets any two items be connected with coloured string. The string is not decorative geometry — it is a Verlet rope simulation with a catenary rest shape, rendered in WebGL, so connections hang and swing as items are dragged. Ropes that come to rest stop rendering to keep the canvas cheap.",
      "It is built on Tauri, with a Rust backend that persists everything to a local SQLite file. There is no sync service and no account layer. A platform-adapter abstraction means the same interface also runs as an installable offline PWA in the browser when native features are not needed.",
      "Beyond a single board there is a workspace: multiple boards in a sidebar, board portals that embed one board inside another as a navigable child, starter templates, and full-text search across every board at once. An optional assistant panel talks to a local Ollama model with the board's contents as context.",
    ],
    features: [
      {
        title: "Infinite corkboard canvas",
        description:
          "Pan and zoom freely across an unbounded cork-textured board.",
      },
      {
        title: "Physically simulated string",
        description:
          "Connect any two items with coloured string rendered as a Verlet rope with a catenary shape, in four styles — thread, yarn, wire and rope.",
      },
      {
        title: "Mixed item types",
        description:
          "Notes, links with auto-fetched Open Graph previews, images, screenshots, and YouTube or Vimeo embeds.",
      },
      {
        title: "Nested boards",
        description:
          "Embed a board inside another as a portal item, double-click to navigate in, and use a breadcrumb to get back out.",
      },
      {
        title: "Board templates",
        description:
          "Start from Cold Case, Research or Mood Board layouts pre-populated with labelled notes and connections — or from blank.",
      },
      {
        title: "Full-text search",
        description:
          "⌘K searches notes, links, images and videos across every board at once.",
      },
      {
        title: "Local AI assistant",
        description:
          "An Ollama-backed chat panel that receives the board's contents as context and runs entirely on your own machine.",
      },
      {
        title: "Keyboard-driven editing",
        description:
          "Single-key item creation, marquee multi-select, 50-step undo/redo, item locking, and PNG board export.",
      },
    ],
    specs: [
      { label: "Shell", value: "Tauri 2 (Rust, edition 2021)" },
      { label: "Frontend", value: "React 19 + TypeScript 5 + Vite 6" },
      { label: "Canvas", value: "PixiJS 8 — WebGL rope rendering" },
      { label: "State", value: "Zustand 5" },
      { label: "Styling", value: "Tailwind CSS 3" },
      {
        label: "Storage",
        value: "SQLite via rusqlite 0.32, bundled",
      },
      {
        label: "Link previews",
        value: "reqwest + scraper",
      },
      {
        label: "Platforms",
        value: "macOS, Windows, Linux — plus an offline PWA",
      },
      { label: "Licence", value: "GPL-3.0" },
    ],
    gallery: [
      {
        src: "/projects/schizo/board.jpg",
        alt: "A Schizo board with pinned notes connected by coloured string, and the toolbar below",
        caption: "The welcome board, with the item toolbar along the bottom.",
      },
    ],
    status:
      "Working but unreleased. There are no prebuilt installers — running it means cloning the repo and building with Node, Rust and the Tauri prerequisites for your platform.",
    note: "Licensed GPL-3.0. The web build is deliberately reduced and drops the native-only features.",
  },

  {
    slug: "airtype",
    projectId: "airtype",
    tagline:
      "Turn any flat surface into a keyboard, using only an iPhone camera.",
    overview: [
      "AirType is an experimental iOS app that tries to remove the keyboard entirely. The rear camera runs ARKit world tracking to lock onto a horizontal surface — a desk, a table, an armrest — and Vision's hand-pose model tracks fingertips in 3D against that plane. A brief calibration, resting both index fingers where F and J would be, anchors an invisible QWERTY layout to the real world. From there fingertip contacts are classified as taps and resolved to keys.",
      "Because iOS keyboards live in a separate process, the project is split in two: a main app that does all the camera and tracking work, and a keyboard extension that receives only finished key events. The two talk through a shared App Group ring buffer and Darwin notifications, with a silent background audio session keeping the tracking process alive while you type inside another app.",
      "The same tracking pipeline drives two other input modes: an invisible trackpad, where one finger moves the cursor and two fingers scroll, and a mid-air gesture layer that recognises swipes, waves, a fist and an OK sign. A companion macOS app reuses the hand tracker against a webcam.",
    ],
    features: [
      {
        title: "Surface lock",
        description:
          "Latches onto the first horizontal plane ARKit reports and tracks its refinements, giving the keyboard a stable real-world surface to sit on.",
      },
      {
        title: "F/J calibration",
        description:
          "Waits for both index fingertips to rest within 8mm of the plane and hold still for a second, then derives the keyboard's centre, orientation and key pitch from the measured F-to-J span.",
      },
      {
        title: "3D fingertip tracking",
        description:
          "Runs Vision's hand-pose request on each camera frame for up to two hands, unprojecting every fingertip onto the locked plane to get world-space coordinates.",
      },
      {
        title: "Tap classification",
        description:
          "Keeps a rolling ten-sample window per fingertip and fires a tap when the tip is close to the plane and moving downward fast enough — tightening to 2mm on LiDAR devices, with a 300ms debounce.",
      },
      {
        title: "Key mapping with finger priors",
        description:
          "Scores every key by distance in key-pitch units, then adds a penalty based on which home column that finger normally covers, so touch-typing habits break ties.",
      },
      {
        title: "Keyboard extension bridge",
        description:
          "The app writes key events into a shared App Group buffer and posts a Darwin notification; the extension wakes, drains the buffer and inserts text into whatever app is focused.",
      },
      {
        title: "Invisible trackpad mode",
        description:
          "One index finger on the surface becomes cursor movement and taps; two fingers become scrolling and right-click, with adjustable speeds.",
      },
      {
        title: "Mid-air gestures",
        description:
          "Reads wrist velocity for swipes and waves, and finger-curl geometry for fist and OK poses, each independently debounced.",
      },
    ],
    specs: [
      { label: "Language", value: "Swift" },
      {
        label: "UI",
        value: "SwiftUI, wrapping ARView and the camera preview layer",
      },
      {
        label: "Tracking",
        value: "ARKit world tracking + RealityKit",
      },
      {
        label: "Hand pose",
        value: "Vision — VNDetectHumanHandPoseRequest",
      },
      { label: "Maths", value: "simd — ray/plane unprojection" },
      {
        label: "IPC",
        value: "App Group ring buffer + Darwin notifications",
      },
      { label: "Build", value: "XcodeGen — app, extension and macOS targets" },
      {
        label: "Platforms",
        value: "iPhone on iOS 17+, plus a companion macOS 13+ app",
      },
    ],
    gallery: [],
    status:
      "A work in progress, and the least finished thing here. Typing, the keyboard extension, trackpad mode and gestures are all implemented, but there is no release, no build to download and no accuracy testing to point at. Cloning it means bringing your own signing and App Group setup.",
    note: "The front-camera view is visualisation only — a hand skeleton and a ghost keyboard overlay. Real typing needs the rear camera and ARKit.",
  },

  {
    slug: "maple",
    projectId: "maple-umbrel",
    tagline:
      "Packages OpenSecret's Maple AI as a self-hostable Umbrel community app.",
    overview: [
      "This is a packaging project, not an AI product. Maple is a private AI chat app built by OpenSecret that routes conversations through Trusted Execution Environments, so nobody — including OpenSecret — can read them. This repo wraps that upstream app into an Umbrel community app store, so anyone running umbrelOS can install Maple from their own dashboard in a few clicks instead of building it themselves.",
      "The packaging is more involved than a container wrapper. A multi-stage Dockerfile clones the upstream repo, patches it to enable Maple's Local Proxy tab in Umbrel mode, builds the frontend with Bun, and serves the result from nginx. That nginx config splits traffic three ways: OpenAI-compatible API calls to OpenSecret's proxy container with buffering disabled so streaming works, billing calls to OpenSecret's billing API, and proxy-config calls to a sidecar.",
      "That sidecar is the main addition — a dependency-free Python service that stores a Maple API key once on a Docker volume and injects it into every request hitting port 3002. Any tool on the local network can then point at the Umbrel box as an OpenAI-compatible endpoint without being configured with a key of its own.",
    ],
    features: [
      {
        title: "One-click community store install",
        description:
          "The repo doubles as an Umbrel community app store — add its URL in the Umbrel App Store and Maple appears under the AI category.",
      },
      {
        title: "Source-built container",
        description:
          "A multi-stage Dockerfile clones upstream Maple at build time, patches it, builds the frontend with Bun, and ships a static nginx runtime image.",
      },
      {
        title: "Local Proxy UI patch",
        description:
          "A small patch enables Maple's otherwise desktop-only Local Proxy tab in Umbrel mode, extended with a status and key-setting panel.",
      },
      {
        title: "Key-injecting sidecar",
        description:
          "A Python key-manager stores the API key on a persistent volume and injects it transparently into traffic on port 3002.",
      },
      {
        title: "OpenAI-compatible endpoint",
        description:
          "The proxied endpoint works with Cursor, Open WebUI, LiteLLM, or anything else that speaks the OpenAI API — no key needed on the client.",
      },
      {
        title: "Streaming-safe routing",
        description:
          "nginx routes API traffic with buffering and caching off so server-sent events stream properly, and forwards billing calls upstream.",
      },
      {
        title: "Browser compatibility shim",
        description:
          "Injects a crypto.randomUUID polyfill into the app shell for browsers that lack it on non-secure origins.",
      },
      {
        title: "Multi-arch CI",
        description:
          "GitHub Actions builds both images for amd64 and arm64 and pushes them to GHCR on every push to main.",
      },
    ],
    specs: [
      {
        label: "Packaging",
        value: "Umbrel community app store, manifest v1.1",
      },
      {
        label: "Orchestration",
        value: "Docker Compose — web UI, proxy, key-manager",
      },
      { label: "Web server", value: "nginx:alpine" },
      { label: "Frontend build", value: "Bun + Vite, from upstream source" },
      {
        label: "Sidecar",
        value: "Python 3.12 on Alpine, standard library only",
      },
      {
        label: "CI/CD",
        value: "GitHub Actions, multi-arch Buildx, images on GHCR",
      },
      {
        label: "Platforms",
        value: "umbrelOS on amd64 and arm64",
      },
    ],
    gallery: [],
    status:
      "Installable and usable today, though informally versioned — no GitHub releases or tags. The Umbrel manifest tracks the upstream Maple version plus a packaging revision.",
    note: "Maple is built by OpenSecret; this repo only packages it. Because Umbrel serves apps over plain HTTP and Maple's attestation needs crypto.subtle, Chrome, Edge and Firefox need a one-time flag change — Safari has no workaround, though a Cloudflare Tunnel or Tor address avoids the issue. Maple remains an OpenSecret hosted service: this is a self-hosted front end and local proxy, not a self-hosted model.",
  },

  {
    slug: "bitcoinwalletcomparison",
    projectId: "bitcoin-wallet-comparison",
    tagline:
      "A side-by-side feature matrix for 28 Bitcoin wallets, filterable by what you actually need.",
    overview: [
      "Bitcoin Wallet Comparison puts wallet software into a single scrollable data grid so capabilities can be compared directly instead of pieced together from marketing pages. Each wallet is a row, and the grid spans 65 columns covering platform availability, custody and privacy properties, on-chain transaction features, Lightning support, and buy/sell/swap functionality.",
      "It is built for choosing against specific requirements rather than reading a \"best wallet\" listicle — someone who needs coin control and PSBT support, or a self-custody Lightning wallet with no KYC. A filter panel exposes 62 of those attributes as checkboxes; applying a selection narrows the table to wallets satisfying every checked requirement and scores each by how many features it supports.",
      "The table is built for scanning. The wallet name column stays frozen while the rest scrolls horizontally, a green check marks supported features and a red X unsupported ones, and anything in between becomes a yellow info icon whose tooltip carries the nuance. Platform cells double as download links straight to the wallet's own install page.",
    ],
    features: [
      {
        title: "Side-by-side comparison grid",
        description:
          "Every wallet is a row in one data grid spanning 65 attribute columns, with the name column frozen while the rest scrolls.",
      },
      {
        title: "Requirement filtering",
        description:
          "A panel of 62 feature checkboxes narrows the table to only the wallets that support every requirement you select.",
      },
      {
        title: "Feature score and ranking",
        description:
          "Each wallet scores by its count of supported features, and the table sorts highest first.",
      },
      {
        title: "Three-state cells",
        description:
          "Green check for supported, red X for unsupported, and a yellow info icon whose tooltip explains partial or qualified support.",
      },
      {
        title: "Privacy and custody columns",
        description:
          "Self-custody, open source, no KYC, own node, Tor, plausible deniability, multisig, coin control and UTXO labels.",
      },
      {
        title: "Protocol coverage",
        description:
          "PSBT, RBF, CPFP, Taproot, silent payments, Payjoin, Stonewall, batch transactions and BIP-39 passphrase.",
      },
      {
        title: "Lightning and layer two",
        description:
          "Lightning, LNURL, Bolt 12, zaps, trampoline routing, multiple LSPs, Fedimint, Cashu and Liquid.",
      },
      {
        title: "Direct download links",
        description:
          "Android, APK, iOS, Windows, macOS and Linux cells link straight to each wallet's official install page.",
      },
    ],
    specs: [
      { label: "Framework", value: "Flutter (Dart SDK ^3.5)" },
      {
        label: "Data grid",
        value: "syncfusion_flutter_datagrid 26.2",
      },
      { label: "Backend", value: "Firebase Core" },
      {
        label: "Hosting",
        value: "Firebase Hosting, deployed from GitHub Actions",
      },
      { label: "Design", value: "Material with custom gradient theming" },
      { label: "Typography", value: "Lato via google_fonts" },
      {
        label: "Platforms",
        value: "Web, installable as a PWA",
      },
      { label: "Licence", value: "GPL-3.0" },
    ],
    gallery: [
      {
        src: "/projects/bitcoinwalletcomparison/grid.jpg",
        alt: "The comparison grid showing wallets scored and ranked across feature columns",
        caption: "The grid — wallets ranked by feature score, columns scrolling horizontally.",
      },
    ],
    liveLabel: "Open the comparison",
    status:
      "Live and in use at bitcoinwalletcomparison.com. The web app is the only distribution — there is no packaged download.",
    note: "The comparison data is maintained by hand rather than pulled from an API, so it reflects a point in time and can drift as wallets ship new features. Corrections are welcome via the repo.",
  },

  {
    slug: "openclawbridge",
    projectId: "openclaw-bridge",
    tagline:
      "A pixel-art starship bridge that turns AI agents into animated crew members.",
    overview: [
      "OpenClaw Bridge is a living dashboard — a Next.js app that renders a pixel-art starship bridge on a canvas and uses it as an ambient status display for AI agents. Instead of reading a log, you watch a crew: each agent binds to a character, and when that agent runs a tool or sends a message, its character walks to the relevant station and speaks in a typewriter-style bubble.",
      "The bridge is playable on its own, too. A roster lets you add or remove any of eight characters, idle crew wander between stations under BFS pathfinding, you can select someone and direct them, and a red alert button flashes the whole screen. An LCARS-style HUD tracks stardate, alert condition and per-crew activity.",
      "The agent layer is a documented, transport-agnostic contract rather than a hard-coded integration: anything that can POST JSON to the events endpoint can drive the bridge. This repo ships the receiving half — event bus, agent mapper, tool-to-station map, priority dialog queue, validation and rate limiting, with 75 tests behind it.",
    ],
    features: [
      {
        title: "Crew roster",
        description:
          "Add or remove any of eight characters from the bridge through a roster modal.",
      },
      {
        title: "Autonomous crew",
        description:
          "Idle characters route themselves between stations using BFS pathfinding; click one to select it, click again to direct or talk to it.",
      },
      {
        title: "Agent-to-character mapping",
        description:
          "Agent IDs map to characters with their own priority and typing speed, with unknown agents falling back to a default.",
      },
      {
        title: "Tool-to-station routing",
        description:
          "Tool names send the mapped character to a matching station — file and exec tools to Ops, web tools to Science, messaging to Communications, browser tools to Navigation.",
      },
      {
        title: "Typewriter dialog",
        description:
          "Agent messages arrive as speech bubbles rendered character-by-character, ordered through a four-level priority queue.",
      },
      {
        title: "Event REST API",
        description:
          "The events endpoint accepts agent messages, tool use and status payloads, with timestamp and latest-only queries for client polling.",
      },
      {
        title: "Red alert",
        description:
          "A HUD button flips the ship to red alert, flashing the screen and switching the status bar from condition green.",
      },
      {
        title: "Layout editor",
        description:
          "A drag-and-drop grid editor repositions bridge stations, serialising the layout to and from JSON.",
      },
    ],
    specs: [
      {
        label: "Framework",
        value: "Next.js 16 (App Router) with React 19",
      },
      { label: "Language", value: "TypeScript 5.7" },
      {
        label: "Styling",
        value: "Tailwind CSS v4, shadcn/ui on Radix primitives",
      },
      {
        label: "Rendering",
        value: "HTML canvas, hand-authored pixel sprites, scanline overlay",
      },
      {
        label: "Transport",
        value: "Route handler plus client polling over an in-memory event store",
      },
      { label: "Testing", value: "Jest 30 — 75 tests across 5 suites" },
      {
        label: "Deployment",
        value: "Vercel, with a PM2 config for self-hosting",
      },
      { label: "Platforms", value: "Desktop browsers — interaction is mouse-driven" },
    ],
    gallery: [
      {
        src: "/projects/openclawbridge/bridge.jpg",
        alt: "The pixel-art bridge with crew at their stations, viewscreen and LCARS HUD",
        caption: "The bridge with crew at their stations and the LCARS HUD.",
      },
    ],
    liveLabel: "Open the bridge",
    status:
      "The bridge is live and the agent layer is complete and tested — but the other half was never built. OpenClaw does not emit events to it yet, so the agent features work only when driven by hand through the API. Ready to receive, not yet connected.",
    note: "Uses Star Trek characters and LCARS-style design as an affectionate pastiche. Events are held in memory and lost on restart, the endpoint is unauthenticated, and updates are polled rather than pushed.",
  },

  {
    slug: "idk",
    projectId: "idk-you-pick",
    tagline:
      "Ends the \"I don't know, what do you want?\" dinner argument in one tap.",
    overview: [
      "IDK, You Pick is a Flutter restaurant-decision app built around three ways of choosing. Choose For Me pulls an instant random pick from the filtered pool. Help Me Decide runs a head-to-head bracket tournament until one winner remains. Price Bracket Battle runs the same bracket restricted to a single price tier. It is aimed at couples and groups who can narrow the field but cannot commit to a final answer.",
      "Everything runs against an on-device catalogue carrying cuisine, type, price tier, tags, coordinates and weekly hours. Filters persist between sessions, an optional location mode computes distance and filters by a radius slider, and a seen-history feature can exclude places tried in the last week. Google Places integration was deliberately dropped in favour of the local database, so no restaurant data leaves the phone and location is only requested when nearby mode is on.",
      "Around that sit favourites with swipe-to-remove, live search and sorting, an opt-in lunchtime notification that respects your active filters, JSON export and import, deep links for sharing a pick or a filter-loaded invite, and an \"Aurora Frost\" design system with glassmorphism cards and light and dark themes.",
    ],
    features: [
      {
        title: "Three decision modes",
        description:
          "Choose For Me picks at random, Help Me Decide runs a head-to-head bracket, and Price Bracket Battle brackets within one price tier.",
      },
      {
        title: "Filters that stick",
        description:
          "Multi-select chips for cuisine, type and price tier, persisted across sessions.",
      },
      {
        title: "Nearby mode",
        description:
          "GPS distance filtering using the Haversine formula with a 1–25 mile radius slider.",
      },
      {
        title: "History and seen tracking",
        description:
          "Mark places as tried and avoid repeats with a rolling seven-day history you can clear entry by entry.",
      },
      {
        title: "Favourites",
        description:
          "A dedicated list with swipe-to-remove, tap-through to detail, and a proper empty state.",
      },
      {
        title: "Search and sort",
        description:
          "Live text search across name, cuisine, type and tags, sorted by name, distance, price, cuisine or random.",
      },
      {
        title: "Lunchtime suggestions",
        description:
          "An opt-in daily notification with a filter-aware pick and seven-day deduplication so it does not repeat itself.",
      },
      {
        title: "Share, invite, export",
        description:
          "Share a winner through the system sheet, generate a deep-link invite with filters embedded, or export favourites and settings to JSON.",
      },
    ],
    specs: [
      {
        label: "Framework",
        value: "Flutter 3.29+ (Dart SDK ^3.7.2)",
      },
      {
        label: "Persistence",
        value: "SharedPreferences for filters, favourites, history and settings",
      },
      { label: "Data", value: "Bundled JSON asset — 54 restaurants" },
      { label: "Location", value: "geolocator + geocoding" },
      {
        label: "Deep links",
        value: "app_links + share_plus, idkyoupick:// scheme",
      },
      {
        label: "Notifications",
        value: "flutter_local_notifications + timezone + workmanager",
      },
      {
        label: "Testing",
        value: "20 test files; CI runs analyze, test and an iOS simulator build",
      },
      {
        label: "Platforms",
        value: "iOS, Android, macOS, Web",
      },
      { label: "Licence", value: "GPL-3.0" },
    ],
    gallery: [
      {
        src: "/projects/idk/home-dark.jpg",
        alt: "The IDK, You Pick home screen in dark mode with Choose For Me and Help Me Decide",
        caption: "Home screen — Aurora Frost, dark.",
      },
      {
        src: "/projects/idk/home-light.jpg",
        alt: "The IDK, You Pick home screen in light mode",
        caption: "The same screen in light mode.",
      },
    ],
    liveLabel: "Try the web app",
    status:
      "Live on the web and actively developed, currently at v1.1.1 with 90 passing tests. There is one GitHub release — a macOS disk image from April 2025 — but it predates the rewrite and is not representative of the current app. No store listing yet.",
    note: "The restaurant catalogue is a fixed 54-entry list bundled with the app, not a live API — and the entries are chains around New York and northern New Jersey, so distance filtering is only meaningful in that area.",
  },
]

const bySlug = new Map(projectPages.map((p) => [p.slug, p]))
const projectById = new Map(projects.map((p) => [p.id, p]))

export function getProjectPage(slug: string): {
  page: ProjectPage
  project: Project
} {
  const page = bySlug.get(slug)
  if (!page) throw new Error(`No project page for slug "${slug}"`)
  const project = projectById.get(page.projectId)
  if (!project) {
    throw new Error(
      `Project page "${slug}" references unknown project id "${page.projectId}"`,
    )
  }
  return { page, project }
}

/** Slug for a project id, when one has a detail page. */
export function slugForProject(projectId: string): string | undefined {
  return projectPages.find((p) => p.projectId === projectId)?.slug
}

/** Per-page title, description and social card, derived from the page content. */
export function buildMetadata(slug: string) {
  const { page, project } = getProjectPage(slug)
  const title = `${project.title} | Spencer Smith`
  const url = `https://spencersmith.site/${slug}`

  return {
    title,
    description: page.tagline,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: page.tagline,
      url,
      siteName: "Spencer Smith",
      images: [{ url: project.image, alt: `${project.title} screenshot` }],
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: page.tagline,
      images: [project.image],
    },
  }
}
