"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import SocialLinks from "@/components/social-links"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-ctp-surface2/30 shadow-lg shadow-ctp-crust/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ctp-mauve/30 to-ctp-sapphire/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain relative z-10"
                priority
              />
            </div>
            <span className="font-bold text-xl gradient-text">Spencer Smith</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {["projects", "photography", "writing"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="relative px-4 py-2 text-ctp-subtext1 hover:text-ctp-text transition-colors duration-300 capitalize group"
              >
                <span className="relative z-10">{section}</span>
                <span className="absolute inset-0 rounded-lg bg-ctp-surface0/0 group-hover:bg-ctp-surface0/50 transition-all duration-300" />
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-ctp-mauve to-ctp-sapphire group-hover:w-3/4 group-hover:left-[12.5%] transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <SocialLinks minimal={true} showAppLinks={true} />
            <Button
              onClick={() => scrollToSection("contact")}
              className="relative overflow-hidden bg-gradient-to-r from-ctp-mauve to-ctp-sapphire hover:from-ctp-pink hover:to-ctp-sky text-ctp-crust font-semibold transition-all duration-300 hover:shadow-glow-md hover:scale-105"
            >
              <span className="relative z-10">Contact Me</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-ctp-subtext1 hover:text-ctp-text hover:bg-ctp-surface0/50 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                }`}
              >
                <X size={24} />
              </span>
              <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                }`}
              >
                <Menu size={24} />
              </span>
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden glass-card overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
          {["projects", "photography", "writing"].map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-ctp-subtext1 hover:text-ctp-text transition-all duration-300 py-3 px-4 rounded-lg hover:bg-ctp-surface0/50 text-left capitalize border-b border-ctp-surface2/20 last:border-b-0"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {section}
            </button>
          ))}
          <div className="pt-4 flex justify-between items-center border-t border-ctp-surface2/30 mt-2">
            <SocialLinks showAppLinks={true} />
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-ctp-mauve to-ctp-sapphire hover:from-ctp-pink hover:to-ctp-sky text-ctp-crust font-semibold"
            >
              Contact Me
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
