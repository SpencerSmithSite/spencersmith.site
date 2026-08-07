export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  links: {
    github?: string
    live?: string
  }
  featured: boolean
}

/**
 * Public projects from github.com/SpencerSmithSite, in a hand-picked display order —
 * the array order below is the order they render in, top to bottom.
 *
 * Deliberately excluded: `nvim` and `.warp` (editor/terminal config, not projects),
 * `airtype-windows` (empty repo), `ollami` and `clawvox` (no longer maintained).
 */
export const projects: Project[] = [
  {
    id: "council",
    title: "Council",
    description:
      "An offline-first Flutter app for Christian theology research. Ships with the complete KJV and downloads from a library of 687 works — the Church Fathers, the ecumenical councils, Calvin, Owen, Spurgeon — then answers questions with on-device AI grounded in the texts.",
    image: "/photos/Council.jpg",
    tags: ["Flutter", "Dart", "Offline-First", "Local AI"],
    links: {
      github: "https://github.com/SpencerSmithSite/council",
      live: "/council",
    },
    featured: true,
  },
  {
    id: "sats-stack",
    title: "Sats Stack",
    description:
      "A local-first, Bitcoin-native personal finance app. Track fiat spending and your sats stack side by side — xpub wallet sync, CSV import with auto-categorisation, budgets priced in opportunity cost, and a DCA simulator. No cloud, no accounts, no tracking.",
    image: "/photos/SatsStack.jpg",
    tags: ["Flutter", "Dart", "Bitcoin", "Local-First"],
    links: {
      github: "https://github.com/SpencerSmithSite/sats-stack",
      live: "https://satsstack.app",
    },
    featured: true,
  },
  {
    id: "airtype",
    title: "AirType",
    description:
      "Type on any flat surface. An iOS app that uses ARKit and Vision hand tracking to project a ghost keyboard onto your desk, classify taps against it, and map them to keys — with a companion keyboard extension for typing into other apps.",
    image: "/photos/AirType.jpg",
    tags: ["Swift", "ARKit", "Vision", "iOS"],
    links: {
      github: "https://github.com/SpencerSmithSite/airtype",
    },
    featured: true,
  },
  {
    id: "bitcoin-wallet-comparison",
    title: "Bitcoin Wallet Comparison",
    description:
      "A side-by-side comparison tool for Bitcoin wallets. Filter by the features that matter to you — custody model, privacy, Lightning support, platform — and see how the options actually stack up.",
    image: "/photos/BitcoinWalletComparison.png",
    tags: ["Flutter", "Dart", "Firebase", "Bitcoin"],
    links: {
      github: "https://github.com/SpencerSmithSite/bitcoin-wallet-comparison",
      live: "https://bitcoinwalletcomparison.com",
    },
    featured: false,
  },
  {
    id: "openclaw-bridge",
    title: "OpenClaw Bridge",
    description:
      "A living dashboard where your AI agents are the crew of a pixel-art starship bridge. Agents map to characters, walk to the station matching whatever tool they're running, and speak their output in typewriter speech bubbles.",
    image: "/photos/OpenClawBridge.png",
    tags: ["TypeScript", "Next.js", "Pixel Art", "AI Agents"],
    links: {
      github: "https://github.com/SpencerSmithSite/openclaw-bridge",
      live: "https://v0-pixel-art-starship-bridge.vercel.app",
    },
    featured: false,
  },
  {
    id: "schizo",
    title: "Schizo",
    description:
      "A private, offline corkboard app. Pin notes, links, images, and videos to an infinite canvas and connect them with physically-simulated string. No cloud, no accounts — everything lives in a local SQLite file.",
    image: "/photos/Schizo.jpg",
    tags: ["Tauri", "React", "TypeScript", "PixiJS"],
    links: {
      github: "https://github.com/SpencerSmithSite/schizo",
    },
    featured: false,
  },
  {
    id: "maple-umbrel",
    title: "Maple for Umbrel",
    description:
      "An Umbrel community app store package for Maple AI, the private chat app that runs inference inside Trusted Execution Environments. Self-host it on your own node in a few clicks. (Maple itself is built by OpenSecret — this is the packaging.)",
    image: "/photos/MapleUmbrel.png",
    tags: ["Python", "Docker", "Umbrel", "Self-Hosted"],
    links: {
      github: "https://github.com/SpencerSmithSite/maple-umbrel",
    },
    featured: false,
  },
  {
    id: "spencersmith-site",
    title: "SpencerSmith.site",
    description:
      "My personal portfolio site built with Next.js, Tailwind CSS, and TypeScript. Glassmorphism throughout, themed with Catppuccin Mocha.",
    image: "/photos/Portfolio.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: {
      github: "https://github.com/SpencerSmithSite/spencersmith.site",
      live: "https://spencersmith.site",
    },
    featured: false,
  },
  {
    id: "idk-you-pick",
    title: "IDK, You Pick",
    description:
      "A restaurant decision-making app for when you (or your partner) can't decide. Random picks, head-to-head bracket tournaments, price-tier battles, GPS distance filtering, favorites, and history so you stop landing on the same place twice.",
    image: "/photos/IDKwhatdoYOUwant.png",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"],
    links: {
      github: "https://github.com/SpencerSmithSite/idk-you-pick",
      live: "https://idk-what-do-you-want-6dd19.web.app",
    },
    featured: false,
  },
  {
    id: "retirement-doomsday-clock",
    title: "Retirement Doomsday Clock",
    description:
      "A single-file countdown to a colleague's retirement, rendered as a Cold War fallout terminal — scanlines, hazard stripes, and the time remaining in every unit from months down to hundredths of a second. Toggle to Party mode, or count business days only.",
    image: "/photos/RetirementDoomsdayClock.jpg",
    tags: ["HTML", "CSS", "Vanilla JS"],
    links: {
      github: "https://github.com/SpencerSmithSite/retirement-doomsday-clock",
      live: "https://spencersmithsite.github.io/retirement-doomsday-clock/",
    },
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
