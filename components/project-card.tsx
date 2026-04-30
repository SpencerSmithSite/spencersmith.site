"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, AppleIcon as AppStore, PlayIcon as PlayStore } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  links: {
    github?: string
    live?: string
    appStore?: string
    playStore?: string
  }
}

export default function ProjectCard({ title, description, image, tags, links }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="group relative overflow-hidden glass-card border-ctp-surface2/30 hover:border-ctp-mauve/50 transition-all duration-500 hover:shadow-glow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border on hover */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-ctp-mauve via-ctp-sapphire to-ctp-teal opacity-0 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : ""
        }`}
        style={{
          padding: "1px",
          background: isHovered
            ? "linear-gradient(135deg, hsl(var(--ctp-mauve)), hsl(var(--ctp-sapphire)), hsl(var(--ctp-teal)))"
            : "transparent",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 ${
            isHovered ? "scale-110 blur-[1px]" : "scale-100"
          }`}
        />
        {/* Overlay gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-ctp-base via-ctp-base/50 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-80" : "opacity-40"
          }`}
        />

        {/* Floating action links on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {links.github && (
            <Link
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full glass hover:bg-ctp-mauve/30 text-ctp-text hover:text-ctp-mauve transition-all duration-300 hover:scale-110"
            >
              <Github size={22} />
              <span className="sr-only">GitHub</span>
            </Link>
          )}
          {links.live && (
            <Link
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full glass hover:bg-ctp-sapphire/30 text-ctp-text hover:text-ctp-sapphire transition-all duration-300 hover:scale-110"
            >
              <ExternalLink size={22} />
              <span className="sr-only">Live Demo</span>
            </Link>
          )}
          {links.appStore && (
            <Link
              href={links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full glass hover:bg-ctp-teal/30 text-ctp-text hover:text-ctp-teal transition-all duration-300 hover:scale-110"
            >
              <AppStore size={22} />
              <span className="sr-only">App Store</span>
            </Link>
          )}
          {links.playStore && (
            <Link
              href={links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full glass hover:bg-ctp-green/30 text-ctp-text hover:text-ctp-green transition-all duration-300 hover:scale-110"
            >
              <PlayStore size={22} />
              <span className="sr-only">Play Store</span>
            </Link>
          )}
        </div>
      </div>

      <CardContent className="relative p-6">
        <h3 className="text-xl font-bold mb-2 text-ctp-text group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-ctp-subtext0 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="glass-subtle border-ctp-surface2/50 text-ctp-subtext1 hover:border-ctp-mauve/50 hover:text-ctp-mauve transition-all duration-300"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Bottom links for mobile/accessibility */}
        <div className="flex gap-3 mt-4 text-ctp-overlay1 md:hidden">
          {links.github && (
            <Link
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ctp-mauve transition-colors"
            >
              <Github size={20} />
            </Link>
          )}
          {links.live && (
            <Link
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ctp-sapphire transition-colors"
            >
              <ExternalLink size={20} />
            </Link>
          )}
          {links.appStore && (
            <Link
              href={links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ctp-teal transition-colors"
            >
              <AppStore size={20} />
            </Link>
          )}
          {links.playStore && (
            <Link
              href={links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ctp-green transition-colors"
            >
              <PlayStore size={20} />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
