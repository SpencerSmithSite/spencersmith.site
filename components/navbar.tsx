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
      setIsMobileMenuOpen(false) // Close mobile menu if open
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMobileMenuOpen(false) // Close mobile menu if open
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-zinc-900/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-400">
              Spencer Smith
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("photography")}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Photography
            </button>
            <button
              onClick={() => scrollToSection("writing")}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Writing
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <SocialLinks minimal={true} showAppLinks={true} />
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 text-white"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-lg">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800 text-left"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("photography")}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800 text-left"
            >
              Photography
            </button>
            <button
              onClick={() => scrollToSection("writing")}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800 text-left"
            >
              Writing
            </button>
            <div className="pt-4 flex justify-between items-center">
              <SocialLinks showAppLinks={true} />
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 text-white"
              >
                Hire Me
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
