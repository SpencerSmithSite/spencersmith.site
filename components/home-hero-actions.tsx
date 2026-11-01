"use client"

import { Button } from "@/components/ui/button"

export default function HomeHeroActions() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Button
        onClick={() => {
          const projectsSection = document.getElementById("projects")
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" })
          }
        }}
        className="relative overflow-hidden bg-gradient-to-r from-ctp-mauve to-ctp-sapphire hover:from-ctp-pink hover:to-ctp-sky text-ctp-crust font-semibold transition-all duration-300 hover:shadow-glow-md hover:scale-105"
      >
        View My Work
      </Button>
      <Button
        onClick={() => {
          const contactSection = document.getElementById("contact")
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" })
          }
        }}
        variant="outline"
        className="border-ctp-mauve/50 text-ctp-mauve hover:bg-ctp-mauve/10 hover:border-ctp-mauve transition-all duration-300 hover:shadow-glow-sm"
      >
        Contact Me
      </Button>
    </div>
  )
}
