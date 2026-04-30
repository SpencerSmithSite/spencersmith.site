"use client"

import { useState } from "react"
import { X, Github, ExternalLink } from "lucide-react"
import Image from "next/image"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { otherProjects, type Project } from "@/lib/projects"

interface AllProjectsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ProjectListItem({ project }: { project: Project }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="group glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-sm hover:scale-[1.02]">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ctp-mauve/20 to-ctp-sapphire/20" />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-ctp-surface0 animate-pulse" />
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-ctp-text mb-2 group-hover:text-ctp-mauve transition-colors">
              {project.title}
            </h3>
            <p className="text-ctp-subtext0 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-ctp-surface0/80 text-ctp-subtext1 text-xs border-ctp-surface1/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ctp-overlay1 hover:text-ctp-mauve transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ctp-overlay1 hover:text-ctp-teal transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AllProjectsModal({
  open,
  onOpenChange,
}: AllProjectsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[85vh] glass border-ctp-surface2/50 p-0 overflow-hidden"
        hideCloseButton
      >
        <DialogTitle className="sr-only">All Projects</DialogTitle>
        
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-ctp-surface1/30 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">All Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="text-ctp-overlay1 hover:text-ctp-text hover:bg-ctp-surface0/50"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="grid grid-cols-1 gap-4">
            {otherProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
