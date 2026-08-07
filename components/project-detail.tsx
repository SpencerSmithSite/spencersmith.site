import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import ProjectGallery from "@/components/project-gallery"
import ParticleNetworkBackground from "@/components/particle-network-background"
import { getProjectPage } from "@/lib/project-pages"

export default function ProjectDetail({ slug }: { slug: string }) {
  const { page, project } = getProjectPage(slug)
  const isExternal = (href: string) => /^https?:\/\//.test(href)

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <ParticleNetworkBackground />

      {/* Header — a dedicated one rather than the site Navbar, whose links
          scroll to homepage sections that do not exist on this page. */}
      <header className="relative z-10 border-b border-ctp-surface1/30">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ctp-subtext0 hover:text-ctp-mauve transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All projects</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 transition-transform duration-300 group-hover:scale-110">
              <Image src="/logo.png" alt="" fill className="object-contain" />
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:inline">
              Spencer Smith
            </span>
          </Link>
        </div>
      </header>

      <article className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        {/* Hero */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">{project.title}</span>
          </h1>
          <p className="text-lg md:text-xl text-ctp-subtext1 mb-6 max-w-3xl">
            {page.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="glass-subtle border-ctp-surface2/50 text-ctp-subtext1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.links.live && (
              <Link
                href={project.links.live}
                target={isExternal(project.links.live) ? "_blank" : undefined}
                rel={
                  isExternal(project.links.live)
                    ? "noopener noreferrer"
                    : undefined
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-ctp-mauve to-ctp-sapphire text-ctp-crust font-semibold hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                {page.liveLabel ?? "Visit site"}
              </Link>
            )}
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-ctp-surface2/50 text-ctp-text hover:border-ctp-mauve/50 hover:text-ctp-mauve transition-colors"
              >
                <Github className="w-4 h-4" />
                Source on GitHub
              </Link>
            )}
          </div>
        </header>

        {/* Lead image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden glass-card border border-ctp-surface2/30 mb-12">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
            priority
          />
        </div>

        {/* Overview */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ctp-text mb-4">Overview</h2>
          <div className="space-y-4 max-w-3xl">
            {page.overview.map((para, i) => (
              <p key={i} className="text-ctp-subtext0 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Features */}
        {page.features.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-ctp-text mb-6">
              What it does
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {page.features.map((f) => (
                <div
                  key={f.title}
                  className="glass-card rounded-xl border border-ctp-surface2/30 p-5"
                >
                  <h3 className="font-semibold text-ctp-text mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ctp-subtext0 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {page.gallery.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-ctp-text mb-6">
              Screenshots
            </h2>
            <ProjectGallery shots={page.gallery} />
          </section>
        )}

        {/* Specs */}
        {page.specs.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-ctp-text mb-6">
              Under the hood
            </h2>
            <dl className="glass-card rounded-xl border border-ctp-surface2/30 divide-y divide-ctp-surface1/30">
              {page.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 px-5 py-3.5"
                >
                  <dt className="text-sm font-medium text-ctp-overlay1 sm:w-40 flex-shrink-0">
                    {s.label}
                  </dt>
                  <dd className="text-sm text-ctp-subtext0">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Status / caveats */}
        {(page.status || page.note) && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-ctp-text mb-4">Status</h2>
            <div className="glass-card rounded-xl border border-ctp-surface2/30 p-5 space-y-3 max-w-3xl">
              {page.status && (
                <p className="text-ctp-subtext0 leading-relaxed">
                  {page.status}
                </p>
              )}
              {page.note && (
                <p className="text-sm text-ctp-overlay1 leading-relaxed">
                  {page.note}
                </p>
              )}
            </div>
          </section>
        )}

        <div className="pt-4 border-t border-ctp-surface1/30">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ctp-subtext0 hover:text-ctp-mauve transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all projects
          </Link>
        </div>
      </article>
    </main>
  )
}
