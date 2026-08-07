import type { Metadata } from "next"

import ProjectDetail from "@/components/project-detail"
import { buildMetadata } from "@/lib/project-pages"

const SLUG = "schizo"

export const metadata: Metadata = buildMetadata(SLUG)

export default function Page() {
  return <ProjectDetail slug={SLUG} />
}
