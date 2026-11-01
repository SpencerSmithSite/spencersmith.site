import Image from "next/image"
import { ChevronDown } from "lucide-react"

import ProjectCard from "@/components/project-card"
import SocialLinks from "@/components/social-links"
import Navbar from "@/components/navbar"
import FloatingLogo from "@/components/floating-logo"
import ParticleNetworkBackground from "@/components/particle-network-background"
import ContactForm from "@/components/contact-form"
import ScrollAnimation from "@/components/scroll-animation"
import FloatingOrbs from "@/components/floating-orbs"
import HomeHeroActions from "@/components/home-hero-actions"
import HomeAllProjects from "@/components/home-all-projects"
import HomePhotoGallery from "@/components/home-photo-gallery"
import { featuredProjects } from "@/lib/projects"
import { detailHrefForProject } from "@/lib/project-slugs"

export default function Home() {
  return (
    <div className="min-h-screen bg-ctp-base text-ctp-text">
      <Navbar />
      <FloatingOrbs />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ParticleNetworkBackground />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mb-8 relative h-48 md:h-56">
            <FloatingLogo />
          </div>
          <ScrollAnimation immediate>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Hello, I&apos;m</span>{" "}
              <span className="text-ctp-text">Spencer Smith</span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation immediate>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-ctp-subtext0">
              I Build Things.
            </p>
          </ScrollAnimation>
          <ScrollAnimation immediate>
            <HomeHeroActions />
          </ScrollAnimation>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-ctp-overlay1" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 relative" id="projects">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ctp-mantle/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-ctp-subtext0 text-center mb-12 max-w-2xl mx-auto">
              Highlighting my most impactful and innovative work
            </p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ScrollAnimation key={project.id} delay={100 * (index + 1)}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  links={project.links}
                  href={detailHrefForProject(project.id)}
                />
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation delay={400}>
            <HomeAllProjects />
          </ScrollAnimation>
        </div>
      </section>

      {/* Photography Section */}
      <section className="py-20 relative" id="photography">
        <div className="absolute inset-0 bg-ctp-mantle/30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="gradient-text-alt">Photography</span>
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <HomePhotoGallery />
          </ScrollAnimation>
        </div>
      </section>

      {/* Writing Section */}
      <section className="py-20 relative" id="writing">
        <div className="absolute inset-0 bg-gradient-to-b from-ctp-mantle/30 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="gradient-text">My Writings</span>
            </h2>
          </ScrollAnimation>
          <div className="flex justify-center items-center min-h-[150px]">
            <span className="text-ctp-overlay1 text-xl glass-subtle px-6 py-3 rounded-full">
              Writings coming soon...maybe
            </span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative" id="contact">
        <div className="absolute inset-0 bg-ctp-mantle/40 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                <span className="gradient-text">Get In Touch</span>
              </h2>
              <p className="text-center text-ctp-subtext0 mb-8">
                Have a project in mind or just want to say hello? Feel free to reach out!
              </p>
              <ContactForm />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative border-t border-ctp-surface0/50">
        <div className="absolute inset-0 bg-ctp-crust/50 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center gap-3 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ctp-mauve/20 to-ctp-sapphire/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image src="/logo.png" alt="Logo" fill className="object-contain relative z-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">Spencer Smith</h3>
                <p className="text-ctp-subtext0 mt-1">I build things.</p>
              </div>
            </div>
            <SocialLinks />
          </div>
          <div className="border-t border-ctp-surface0/30 mt-8 pt-8 text-center text-ctp-overlay0 text-sm">
            <p>&copy; {new Date().getFullYear()} Spencer Smith. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
