"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import PhotoGallery from "@/components/photo-gallery"
import SocialLinks from "@/components/social-links"
import Navbar from "@/components/navbar"
import FloatingLogo from "@/components/floating-logo"
import ParticleNetworkBackground from "@/components/particle-network-background"
import ContactForm from "@/components/contact-form"
import ScrollAnimation from "@/components/scroll-animation"
import FloatingOrbs from "@/components/floating-orbs"

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
          <ScrollAnimation>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Hello, I&apos;m</span>{" "}
              <span className="text-ctp-text">Spencer Smith</span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-ctp-subtext0">
              I Build Things.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={400}>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="gradient-text">My Projects</span>
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation delay={100}>
              <ProjectCard
                title="Bitcoin Wallet Comparison"
                description="View and compare bitcoin wallet software options and their features. Built with Flutter and Firebase."
                image="/photos/BitcoinWalletComparison.png"
                tags={["Flutter", "Firebase", "Dart"]}
                links={{
                  github: "https://github.com/spencersmithsite/bitcoin-wallet-comparison",
                  live: "https://bitcoinwalletcomparison.com",
                }}
              />
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <ProjectCard
                title="IDK what do YOU want?"
                description="A restaurant decision-making app that helps you choose where to eat when you can't decide. Built with Flutter and Firebase."
                image="/photos/IDKwhatdoYOUwant.png"
                tags={["Flutter", "Firebase", "Dart"]}
                links={{
                  github: "https://github.com/SpencerSmithSite/IDK-what-do-YOU-want",
                  live: "https://idk-what-do-you-want-6dd19.web.app/",
                }}
              />
            </ScrollAnimation>
            <ScrollAnimation delay={300}>
              <ProjectCard
                title="Spencer Smith's Portfolio"
                description="My personal portfolio website. Built with Next.js, Tailwind CSS, and TypeScript."
                image="/photos/Portfolio.png"
                tags={["Next.js", "Tailwind CSS", "TypeScript"]}
                links={{
                  github: "https://github.com/spencersmithsite/spencersmith.site",
                  live: "https://spencersmith.site",
                }}
              />
            </ScrollAnimation>
          </div>
          <ScrollAnimation delay={400}>
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-ctp-teal/50 text-ctp-teal hover:bg-ctp-teal/10 hover:border-ctp-teal transition-all duration-300"
              >
                View All Projects
              </Button>
            </div>
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
            <PhotoGallery />
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
