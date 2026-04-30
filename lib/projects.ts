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

export const projects: Project[] = [
  // Featured Projects (in order of importance)
  {
    id: "clawvox",
    title: "ClawVox",
    description: "A macOS voice transcription application built with Swift. Features real-time speech-to-text capabilities with a focus on accuracy and performance.",
    image: "/photos/ClawVox.jpg",
    tags: ["Swift", "macOS", "Speech Recognition"],
    links: {
      github: "https://github.com/SpencerSmithSite/ClawVox",
    },
    featured: true,
  },
  {
    id: "ollami",
    title: "Ollami",
    description: "Local-first macOS AI assistant. Captures conversations, transcribes in real-time using faster-whisper, and provides AI chat powered entirely by local Ollama models. No telemetry, no cloud, complete privacy.",
    image: "/photos/Ollami.jpg",
    tags: ["Swift", "Python", "Ollama", "AI"],
    links: {
      github: "https://github.com/SpencerSmithSite/Ollami",
    },
    featured: true,
  },
  {
    id: "satsstack",
    title: "SatsStack",
    description: "Bitcoin stacking tracker and portfolio management tool. Track your Bitcoin accumulation journey with detailed analytics and visualizations.",
    image: "/photos/SatsStack.jpg",
    tags: ["Bitcoin", "Finance", "Analytics"],
    links: {
      github: "https://github.com/SpencerSmithSite/sats-stack",
    },
    featured: true,
  },
  // Other Projects
  {
    id: "schizo",
    title: "Schizo",
    description: "An experimental project exploring unconventional software patterns and creative coding techniques.",
    image: "/photos/Schizo.jpg",
    tags: ["Experimental", "Creative Coding"],
    links: {
      github: "https://github.com/SpencerSmithSite/Schizo",
    },
    featured: false,
  },
  {
    id: "spencersmith-site",
    title: "SpencerSmith.site",
    description: "My personal portfolio website built with Next.js, Tailwind CSS, and TypeScript. Features glassmorphism design with Catppuccin Mocha theme.",
    image: "/photos/Portfolio.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    links: {
      github: "https://github.com/SpencerSmithSite/spencersmith.site",
      live: "https://spencersmith.site",
    },
    featured: false,
  },
  {
    id: "council",
    title: "Council",
    description: "A theology and scripture study application built with Flutter. Designed to help users engage with religious texts in a modern, accessible way.",
    image: "/photos/Council.jpg",
    tags: ["Flutter", "Dart", "Mobile"],
    links: {
      github: "https://github.com/SpencerSmithSite/Council",
    },
    featured: false,
  },
  {
    id: "bitcoin-wallet-comparison",
    title: "Bitcoin Wallet Comparison",
    description: "A comprehensive comparison tool for Bitcoin wallets. Compare features, security, and usability to find the wallet that best suits your needs.",
    image: "/photos/BitcoinWalletComparison.png",
    tags: ["Flutter", "Firebase", "Bitcoin"],
    links: {
      github: "https://github.com/SpencerSmithSite/Bitcoin-Wallet-Comparison",
      live: "https://bitcoinwalletcomparison.com",
    },
    featured: false,
  },
  {
    id: "idk-what-do-you-want",
    title: "IDK what do YOU want?",
    description: "A restaurant decision-making app that helps you choose where to eat when you can't decide. Features random selection, head-to-head comparison, and custom lists.",
    image: "/photos/IDKwhatdoYOUwant.png",
    tags: ["Flutter", "Firebase", "Mobile"],
    links: {
      github: "https://github.com/SpencerSmithSite/IDK-what-do-YOU-want",
      live: "https://idk-what-do-you-want-6dd19.web.app",
    },
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
