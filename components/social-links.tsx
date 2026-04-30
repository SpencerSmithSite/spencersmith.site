"use client"

import Link from "next/link"
import { Github, Linkedin, AppleIcon as AppStore, PlayIcon as PlayStore } from "lucide-react"

interface SocialLinksProps {
  minimal?: boolean
  showAppLinks?: boolean
}

export default function SocialLinks({ minimal = false, showAppLinks = false }: SocialLinksProps) {
  const iconSize = minimal ? 18 : 20
  const containerClass = minimal ? "flex gap-3" : "flex gap-4"
  
  const linkClass = minimal
    ? "text-ctp-subtext1 hover:text-ctp-mauve transition-all duration-300 hover:scale-110"
    : "w-10 h-10 rounded-full flex items-center justify-center glass-subtle border border-ctp-surface2/30 text-ctp-subtext1 hover:text-ctp-mauve hover:border-ctp-mauve/50 hover:shadow-glow-sm transition-all duration-300 hover:scale-105"

  const socialLinks = [
    {
      href: "https://x.com/spencersmthsite",
      label: "X.com",
      icon: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </svg>
      ),
      hoverColor: "hover:text-ctp-text",
    },
    {
      href: "https://www.linkedin.com/in/spencersmithsite",
      label: "LinkedIn",
      icon: <Linkedin size={iconSize} />,
      hoverColor: "hover:text-ctp-sapphire",
    },
    {
      href: "https://github.com/SpencerSmithSite",
      label: "GitHub",
      icon: <Github size={iconSize} />,
      hoverColor: "hover:text-ctp-lavender",
    },
  ]

  const appLinks = [
    {
      href: "https://apps.apple.com",
      label: "App Store",
      icon: <AppStore size={iconSize} />,
      hoverColor: "hover:text-ctp-pink",
    },
    {
      href: "https://play.google.com",
      label: "Play Store",
      icon: <PlayStore size={iconSize} />,
      hoverColor: "hover:text-ctp-green",
    },
  ]

  const linksToShow = showAppLinks || !minimal ? [...socialLinks, ...appLinks] : socialLinks

  return (
    <div className={containerClass}>
      {linksToShow.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} ${minimal ? link.hoverColor : ""}`}
        >
          {link.icon}
          <span className="sr-only">{link.label}</span>
        </Link>
      ))}
    </div>
  )
}
