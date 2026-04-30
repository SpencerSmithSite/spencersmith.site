"use client"

import { useEffect, useRef } from "react"

// Catppuccin Mocha colors
const COLORS = {
  mauve: "#cba6f7",
  sapphire: "#74c7ec",
  teal: "#94e2d5",
  pink: "#f5c2e7",
  sky: "#89dceb",
  lavender: "#b4befe",
  base: "#1e1e2e",
}

export default function ParticleNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mouse position
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false
    let mouseTimer: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true

      clearTimeout(mouseTimer)
      mouseTimer = setTimeout(() => {
        isMouseMoving = false
      }, 3000)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
        isMouseMoving = true

        clearTimeout(mouseTimer)
        mouseTimer = setTimeout(() => {
          isMouseMoving = false
        }, 3000)
      }
    }

    window.addEventListener("touchmove", handleTouchMove)

    const colorKeys = ["mauve", "sapphire", "teal", "pink", "sky", "lavender"] as const
    const getRandomColor = () => COLORS[colorKeys[Math.floor(Math.random() * colorKeys.length)]]

    // Create particles
    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      originalX: number
      originalY: number
      pulsePhase: number
      pulseSpeed: number
    }[] = []

    // Adjust particle count based on screen size
    const baseCount = 50
    const width = window.innerWidth
    const height = window.innerHeight
    const area = width * height
    const particleCount = Math.min(baseCount + Math.floor(area / 80000), 120)

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        color: getRandomColor(),
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      })
    }

    // Animation
    let animationId: number
    let time = 0

    const animate = () => {
      time += 1
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      )
      gradient.addColorStop(0, "#1e1e2e")
      gradient.addColorStop(0.5, "#181825")
      gradient.addColorStop(1, "#11111b")
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      for (const particle of particles) {
        // Move particles
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges with some bounce effect
        if (particle.x < 0) {
          particle.x = 0
          particle.vx *= -1
        }
        if (particle.x > width) {
          particle.x = width
          particle.vx *= -1
        }
        if (particle.y < 0) {
          particle.y = 0
          particle.vy *= -1
        }
        if (particle.y > height) {
          particle.y = height
          particle.vy *= -1
        }

        // Gradually return to original position when mouse is not moving
        if (!isMouseMoving) {
          const dx = particle.originalX - particle.x
          const dy = particle.originalY - particle.y
          particle.vx += dx * 0.0003
          particle.vy += dy * 0.0003
        }

        // Calculate pulsing radius
        const pulseAmount = Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.3 + 1
        const currentRadius = particle.radius * pulseAmount

        // Draw particle with glow effect
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          currentRadius * 4
        )
        glowGradient.addColorStop(0, particle.color + "40")
        glowGradient.addColorStop(0.5, particle.color + "10")
        glowGradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentRadius * 4, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        // Draw particle core
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles with gradient lines
        for (const otherParticle of particles) {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 140 && distance > 0) {
            const opacity = (1 - distance / 140) * 0.35
            
            const lineGradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              otherParticle.x,
              otherParticle.y
            )
            lineGradient.addColorStop(0, particle.color + Math.floor(opacity * 255).toString(16).padStart(2, "0"))
            lineGradient.addColorStop(1, otherParticle.color + Math.floor(opacity * 255).toString(16).padStart(2, "0"))

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // React to mouse with enhanced effect
        if (isMouseMoving) {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 180) {
            const angle = Math.atan2(dy, dx)
            const force = (180 - distance) / 1200
            particle.vx -= Math.cos(angle) * force
            particle.vy -= Math.sin(angle) * force

            // Add randomness
            particle.vx += (Math.random() - 0.5) * 0.04
            particle.vy += (Math.random() - 0.5) * 0.04
          }
        }

        // Apply friction
        particle.vx *= 0.985
        particle.vy *= 0.985
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      clearTimeout(mouseTimer)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}
