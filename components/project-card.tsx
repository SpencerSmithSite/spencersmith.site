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
  return (
    <Card className="overflow-hidden bg-zinc-800/30 border-zinc-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-secondary-500/5 transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-zinc-100">{title}</h3>
        <p className="text-zinc-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-zinc-700/50 text-secondary-400 border-secondary-500/30">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 text-zinc-400">
          {links.github && (
            <Link
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary-400 transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
          )}
          {links.live && (
            <Link
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary-400 transition-colors"
            >
              <ExternalLink size={20} />
              <span className="sr-only">Live Demo</span>
            </Link>
          )}
          {links.appStore && (
            <Link
              href={links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
            >
              <AppStore size={20} />
              <span className="sr-only">App Store</span>
            </Link>
          )}
          {links.playStore && (
            <Link
              href={links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
            >
              <PlayStore size={20} />
              <span className="sr-only">Play Store</span>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
