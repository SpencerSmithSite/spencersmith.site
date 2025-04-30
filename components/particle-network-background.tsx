"use client"

import { useEffect, useRef } from "react"

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
    }[] = []

    // Adjust particle count based on screen size
    const baseCount = 40
    const width = window.innerWidth
    const height = window.innerHeight
    const area = width * height
    const particleCount = Math.min(baseCount + Math.floor(area / 100000), 100)

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#ff9142" : "#1efaff",
      })
    }

    // Animation
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

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
          particle.vx += dx * 0.0005
          particle.vy += dy * 0.0005
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles
        for (const otherParticle of particles) {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)

            // Gradient line based on particle colors with opacity based on distance
            const opacity = (1 - distance / 120) * 0.5
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // React to mouse
        if (isMouseMoving) {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const angle = Math.atan2(dy, dx)
            const force = (150 - distance) / 1500
            particle.vx -= Math.cos(angle) * force
            particle.vy -= Math.sin(angle) * force

            // Add a bit of randomness to make it more lively
            particle.vx += (Math.random() - 0.5) * 0.05
            particle.vy += (Math.random() - 0.5) * 0.05
          }
        }

        // Apply some friction to prevent excessive speed
        particle.vx *= 0.98
        particle.vy *= 0.98
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

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-zinc-900" />
}
