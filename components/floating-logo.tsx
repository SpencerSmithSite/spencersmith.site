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
      // Simple floating animation using sine wave
      const newY = Math.sin(angle) * 10
      // Subtle rotation effect
      const newRotation = Math.sin(angle * 0.5) * 3

      setOffsetY(newY)
      setRotation(newRotation)
      angle += 0.05
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
        {/* Glow effect - reduced since the logo already has a shadow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-400/10 blur-xl" />

        {/* Logo */}
        <Image src="/logo.png" alt="Logo" fill className="object-contain z-10" priority />
      </div>

      {/* Decorative particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary-500/50 animate-pulse" />
      <div className="absolute top-3/4 left-1/3 w-1 h-1 rounded-full bg-secondary-400/50 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-secondary-500/50 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-primary-500/50 animate-pulse" />
    </div>
  )
}
