"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import PhotoGallery from "@/components/photo-gallery"
import BlogPreview from "@/components/blog-preview"
import SocialLinks from "@/components/social-links"
import Navbar from "@/components/navbar"
import FloatingLogo from "@/components/floating-logo"
import ParticleNetworkBackground from "@/components/particle-network-background"
import ContactForm from "@/components/contact-form"
import ScrollAnimation from "@/components/scroll-animation"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Replace the static background with the particle network */}
        <ParticleNetworkBackground />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mb-8 relative h-48 md:h-56">
            <FloatingLogo />
          </div>
          <ScrollAnimation>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-400">
              Hello, I'm <span className="text-white">Spencer Smith</span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-zinc-300">I Build Things.</p>
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
                className="bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 text-white"
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
                className="border-secondary-500 text-secondary-500 hover:bg-secondary-500/10"
              >
                Contact Me
              </Button>
            </div>
          </ScrollAnimation>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-zinc-400"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-zinc-900" id="projects">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-400">
                My Projects
              </span>
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation delay={100}>
              <ProjectCard
                title="Mobile App"
                description="A cross-platform mobile application built with React Native"
                image="/placeholder.svg?height=400&width=600"
                tags={["React Native", "Firebase", "Redux"]}
                links={{
                  github: "https://github.com",
                  appStore: "https://apps.apple.com",
                  playStore: "https://play.google.com",
                }}
              />
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <ProjectCard
                title="Web Dashboard"
                description="Analytics dashboard with real-time data visualization"
                image="/placeholder.svg?height=400&width=600"
                tags={["React", "D3.js", "Node.js"]}
                links={{
                  github: "https://github.com",
                  live: "https://example.com",
                }}
              />
            </ScrollAnimation>
            <ScrollAnimation delay={300}>
              <ProjectCard
                title="AI Assistant"
                description="Natural language processing chatbot for customer service"
                image="/placeholder.svg?height=400&width=600"
                tags={["Python", "TensorFlow", "NLP"]}
                links={{
                  github: "https://github.com",
                }}
              />
            </ScrollAnimation>
          </div>
          <ScrollAnimation delay={400}>
            <div className="text-center mt-12">
              <Button variant="outline" className="border-secondary-500 text-secondary-500 hover:bg-secondary-500/10">
                View All Projects
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Photography Section */}
      <section className="py-20 bg-zinc-800/50" id="photography">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-400">
                Photography
              </span>
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <PhotoGallery />
          </ScrollAnimation>
        </div>
      </section>

      {/* Writing Section */}
      <section className="py-20 bg-zinc-900" id="writing">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-400">
                My Writings
              </span>
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation delay={100}>
              <BlogPreview
                title="The Future of Web Development"
                excerpt="Exploring the latest trends and technologies shaping the future of web development..."
                date="May 15, 2023"
                image="/placeholder.svg?height=300&width=500"
              />
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <BlogPreview
                title="Photography Tips for Beginners"
                excerpt="Essential tips and techniques to improve your photography skills and capture stunning images..."
                date="April 22, 2023"
                image="/placeholder.svg?height=300&width=500"
              />
            </ScrollAnimation>
            <ScrollAnimation delay={300}>
              <BlogPreview
                title="My Journey as a Developer"
                excerpt="Personal reflections on my path from beginner to professional developer and lessons learned along the way..."
                date="March 10, 2023"
                image="/placeholder.svg?height=300&width=500"
              />
            </ScrollAnimation>
          </div>
          <ScrollAnimation delay={400}>
            <div className="text-center mt-12">
              <Button variant="outline" className="border-primary-500 text-primary-500 hover:bg-primary-500/10">
                Read More Articles
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-zinc-800/50" id="contact">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto backdrop-blur-lg bg-zinc-800/30 p-8 md:p-12 rounded-2xl border border-zinc-700/50 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-400">
                  Get In Touch
                </span>
              </h2>
              <p className="text-center text-zinc-300 mb-8">
                Have a project in mind or just want to say hello? Feel free to reach out!
              </p>
              <ContactForm />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-400">
                  Spencer Smith
                </h3>
                <p className="text-zinc-400 mt-1">Developer. Photographer. Writer.</p>
              </div>
            </div>
            <SocialLinks />
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
            <p>© {new Date().getFullYear()} Spencer Smith. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
