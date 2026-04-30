"use client"

import { useEffect, useState } from "react"

interface Orb {
  id: number
  x: number
  y: number
  size: number
  color: string
  animationDuration: number
  animationDelay: number
}

const COLORS = [
  "rgba(203, 166, 247, 0.15)", // mauve
  "rgba(116, 199, 236, 0.15)", // sapphire
  "rgba(148, 226, 213, 0.12)", // teal
  "rgba(245, 194, 231, 0.1)",  // pink
  "rgba(137, 220, 235, 0.12)", // sky
]

export default function FloatingOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    // Generate orbs on client side only
    const generatedOrbs: Orb[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 200 + Math.random() * 400,
      color: COLORS[i % COLORS.length],
      animationDuration: 20 + Math.random() * 15,
      animationDelay: Math.random() * -20,
    }))
    setOrbs(generatedOrbs)
  }, [])

  if (orbs.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl animate-float"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            animationDuration: `${orb.animationDuration}s`,
            animationDelay: `${orb.animationDelay}s`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
