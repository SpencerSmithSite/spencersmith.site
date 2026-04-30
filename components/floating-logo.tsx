"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function FloatingLogo() {
  const [offsetY, setOffsetY] = useState(0)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let frameId: number
    let angle = 0

    const animate = () => {
      // Smooth floating animation using sine wave
      const newY = Math.sin(angle) * 12
      // Subtle rotation effect
      const newRotation = Math.sin(angle * 0.5) * 4

      setOffsetY(newY)
      setRotation(newRotation)
      angle += 0.04
      frameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative w-48 h-48 md:w-56 md:h-56"
        style={{
          transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Animated glow rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ctp-mauve/20 to-ctp-sapphire/20 blur-2xl animate-pulse-glow" />
        <div 
          className="absolute inset-[-10%] rounded-full border border-ctp-mauve/20 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div 
          className="absolute inset-[-20%] rounded-full border border-ctp-sapphire/10 animate-spin"
          style={{ animationDuration: "30s", animationDirection: "reverse" }}
        />

        {/* Logo */}
        <Image src="/logo.png" alt="Logo" fill className="object-contain z-10" priority />
      </div>

      {/* Decorative particles with Catppuccin colors */}
      <div 
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-ctp-mauve/60 animate-pulse"
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute top-3/4 left-1/3 w-1.5 h-1.5 rounded-full bg-ctp-teal/60 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-ctp-sapphire/60 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div 
        className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-ctp-pink/60 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <div 
        className="absolute top-1/2 left-1/5 w-1.5 h-1.5 rounded-full bg-ctp-lavender/50 animate-pulse"
        style={{ animationDelay: "0.75s" }}
      />
      <div 
        className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-ctp-sky/50 animate-pulse"
        style={{ animationDelay: "1.25s" }}
      />
    </div>
  )
}
