"use client"

import { useEffect, useRef } from "react"

// Catppuccin Mocha accents. One sprite-sheet cell is painted per color.
const COLORS = ["#cba6f7", "#74c7ec", "#94e2d5", "#f5c2e7", "#89dceb", "#b4befe"] as const

const MAX_PARTICLES = 80
const LINK_DISTANCE = 140
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE
const MOUSE_RADIUS = 180
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS
const SPRITE_SIZE = 64

// Same stops the old per-frame radial fill used. farthest-side puts the
// mid stop on the viewport edge; the crust stop sits out at the corners.
const PARTICLE_BACKGROUND =
  "radial-gradient(circle farthest-side at center, #1e1e2e 0%, #181825 100%, #11111b 180%)"

function hexChannel(hex: string, start: number) {
  return Number.parseInt(hex.slice(start, start + 2), 16)
}

function mixHex(a: string, b: string) {
  const r = (hexChannel(a, 1) + hexChannel(b, 1)) >> 1
  const g = (hexChannel(a, 3) + hexChannel(b, 3)) >> 1
  const bl = (hexChannel(a, 5) + hexChannel(b, 5)) >> 1
  return `rgb(${r}, ${g}, ${bl})`
}

function createSpriteSheet() {
  const sheet = document.createElement("canvas")
  sheet.width = SPRITE_SIZE * COLORS.length
  sheet.height = SPRITE_SIZE
  const ctx = sheet.getContext("2d")
  if (!ctx) return null

  COLORS.forEach((color, index) => {
    const origin = index * SPRITE_SIZE
    const cx = origin + SPRITE_SIZE / 2
    const cy = SPRITE_SIZE / 2
    ctx.save()
    ctx.beginPath()
    ctx.rect(origin, 0, SPRITE_SIZE, SPRITE_SIZE)
    ctx.clip()
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, SPRITE_SIZE / 2)
    glow.addColorStop(0, `${color}40`)
    glow.addColorStop(0.5, `${color}10`)
    glow.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(cx, cy, SPRITE_SIZE / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(cx, cy, SPRITE_SIZE / 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })

  return sheet
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  colorIndex: number
  originalX: number
  originalY: number
  pulsePhase: number
  pulseSpeed: number
}

export default function ParticleNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const sprite = createSpriteSheet()
    if (!sprite) return

    const lineColors = COLORS.map((a) => COLORS.map((b) => mixHex(a, b)))

    let width = 0
    let height = 0
    let dpr = 1
    const particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false
    let mouseTimer = 0
    let time = 0
    let onScreen = true
    let raf = 0
    let looping = false

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const canAnimate = () => !document.hidden && onScreen && !motionQuery.matches

    const stop = () => {
      looping = false
      cancelAnimationFrame(raf)
    }

    const layout = () => {
      const nextDpr = window.devicePixelRatio || 1
      const box = canvas.parentElement?.getBoundingClientRect()
      const nextWidth = Math.round(box?.width || canvas.clientWidth)
      const nextHeight = Math.round(box?.height || canvas.clientHeight)
      if (nextWidth < 1 || nextHeight < 1) return

      const sizeChanged = nextWidth !== width || nextHeight !== height
      const dprChanged = nextDpr !== dpr
      if (!sizeChanged && !dprChanged && particles.length > 0) return

      const previousWidth = width
      const previousHeight = height
      width = nextWidth
      height = nextHeight
      dpr = nextDpr
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (particles.length === 0) {
        const count = Math.min(50 + Math.floor((width * height) / 80_000), MAX_PARTICLES)
        for (let i = 0; i < count; i++) {
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
            colorIndex: Math.floor(Math.random() * COLORS.length),
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.02,
          })
        }
        return
      }

      if (!sizeChanged || previousWidth < 1 || previousHeight < 1) return
      const scaleX = width / previousWidth
      const scaleY = height / previousHeight
      for (const particle of particles) {
        particle.x *= scaleX
        particle.y *= scaleY
        particle.originalX *= scaleX
        particle.originalY *= scaleY
      }
    }

    const update = () => {
      time += 1
      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) {
          particle.x = 0
          particle.vx *= -1
        } else if (particle.x > width) {
          particle.x = width
          particle.vx *= -1
        }
        if (particle.y < 0) {
          particle.y = 0
          particle.vy *= -1
        } else if (particle.y > height) {
          particle.y = height
          particle.vy *= -1
        }

        if (!isMouseMoving) {
          particle.vx += (particle.originalX - particle.x) * 0.0003
          particle.vy += (particle.originalY - particle.y) * 0.0003
        } else {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distSq = dx * dx + dy * dy
          if (distSq > 0 && distSq < MOUSE_RADIUS_SQ) {
            const distance = Math.sqrt(distSq)
            const angle = Math.atan2(dy, dx)
            const force = (MOUSE_RADIUS - distance) / 1200
            particle.vx -= Math.cos(angle) * force
            particle.vy -= Math.sin(angle) * force
            particle.vx += (Math.random() - 0.5) * 0.04
            particle.vy += (Math.random() - 0.5) * 0.04
          }
        }

        particle.vx *= 0.985
        particle.vy *= 0.985
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 0.8

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq <= 0 || distSq >= LINK_DISTANCE_SQ) continue

          const distance = Math.sqrt(distSq)
          ctx.globalAlpha = (1 - distance / LINK_DISTANCE) * 0.35
          ctx.strokeStyle = lineColors[a.colorIndex][b.colorIndex]
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
      for (const particle of particles) {
        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.3 + 1
        const size = particle.radius * pulse * 8
        ctx.drawImage(
          sprite,
          particle.colorIndex * SPRITE_SIZE,
          0,
          SPRITE_SIZE,
          SPRITE_SIZE,
          particle.x - size / 2,
          particle.y - size / 2,
          size,
          size,
        )
      }
    }

    const frame = () => {
      update()
      draw()
      if (canAnimate()) raf = requestAnimationFrame(frame)
      else looping = false
    }

    const start = () => {
      if (looping || !canAnimate() || particles.length === 0) return
      looping = true
      raf = requestAnimationFrame(frame)
    }

    const sync = () => {
      if (canAnimate()) {
        start()
        return
      }
      stop()
      if (particles.length > 0) draw()
    }

    const wakeMouse = () => {
      isMouseMoving = true
      window.clearTimeout(mouseTimer)
      mouseTimer = window.setTimeout(() => {
        isMouseMoving = false
      }, 3000)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = event.clientX - rect.left
      mouseY = event.clientY - rect.top
      wakeMouse()
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      const rect = canvas.getBoundingClientRect()
      mouseX = touch.clientX - rect.left
      mouseY = touch.clientY - rect.top
      wakeMouse()
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    })

    layout()
    if (particles.length > 0) draw()
    start()

    const frameEl = canvas.parentElement ?? canvas
    observer.observe(frameEl)
    const resizeObserver = new ResizeObserver(() => {
      layout()
      if (!looping && particles.length > 0) draw()
    })
    resizeObserver.observe(frameEl)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    document.addEventListener("visibilitychange", sync)
    motionQuery.addEventListener("change", sync)

    return () => {
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("visibilitychange", sync)
      motionQuery.removeEventListener("change", sync)
      window.clearTimeout(mouseTimer)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background: PARTICLE_BACKGROUND }}
    >
      {/* Canvas is a replaced element, so inset alone leaves it at 300×150. */}
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
