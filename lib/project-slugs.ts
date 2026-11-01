/**
 * Project id → detail-page slug. This is the only place those pairs live.
 * Council is omitted: it has a hand-built site at /council/, not a generated page.
 */
export const projectSlugById = {
  "sats-stack": "satsstack",
  schizo: "schizo",
  airtype: "airtype",
  "maple-umbrel": "maple",
  "bitcoin-wallet-comparison": "bitcoinwalletcomparison",
  "openclaw-bridge": "openclawbridge",
  "idk-you-pick": "idk",
} as const

/** Slug for a project id, when one has a detail page. */
export function slugForProject(projectId: string): string | undefined {
  if (Object.prototype.hasOwnProperty.call(projectSlugById, projectId)) {
    return projectSlugById[projectId as keyof typeof projectSlugById]
  }
  return undefined
}

/**
 * Where a project's "View details" link points, when it has somewhere to go.
 * Council is the exception to the generated pages: it has its own hand-built
 * static site under public/council, so it links there instead.
 */
export function detailHrefForProject(projectId: string): string | undefined {
  const slug = slugForProject(projectId)
  if (slug) return `/${slug}`
  if (projectId === "council") return "/council/"
  return undefined
}
