"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"

const AllProjectsModal = dynamic(() => import("@/components/all-projects-modal"), {
  ssr: false,
})

export default function HomeAllProjects() {
  const [showAllProjects, setShowAllProjects] = useState(false)

  return (
    <>
      <div className="text-center mt-12">
        <Button
          variant="outline"
          onClick={() => setShowAllProjects(true)}
          className="border-ctp-teal/50 text-ctp-teal hover:bg-ctp-teal/10 hover:border-ctp-teal transition-all duration-300 hover:shadow-glow-sm"
        >
          View All Projects
        </Button>
      </div>
      <AllProjectsModal open={showAllProjects} onOpenChange={setShowAllProjects} />
    </>
  )
}
