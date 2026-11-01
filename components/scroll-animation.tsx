"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number // delay in ms
  /** Skip the hidden start state so this content is visible in the server HTML. */
  immediate?: boolean
}

type PendingReveal = {
  delay: number
  timeoutId?: number
}

const pending = new Map<Element, PendingReveal>()
let sharedObserver: IntersectionObserver | null = null

function getSharedObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const item = pending.get(entry.target)
        if (!item) continue

        const el = entry.target
        sharedObserver?.unobserve(el)

        const reveal = () => {
          el.classList.add("animate-in")
          pending.delete(el)
        }

        if (item.delay > 0) {
          item.timeoutId = window.setTimeout(reveal, item.delay)
        } else {
          reveal()
        }
      }
    },
    {
      threshold: 0.1, // Trigger when at least 10% of the element is visible
      rootMargin: "0px 0px -100px 0px", // Slightly before the element comes into view
    },
  )

  return sharedObserver
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  immediate = false,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || immediate) return

    if (prefersReducedMotion()) {
      el.classList.add("animate-in")
      return
    }

    const observer = getSharedObserver()
    pending.set(el, { delay })
    observer.observe(el)

    return () => {
      const item = pending.get(el)
      if (item?.timeoutId !== undefined) {
        window.clearTimeout(item.timeoutId)
      }
      pending.delete(el)
      observer.unobserve(el)
    }
  }, [delay, immediate])

  const revealClass = immediate
    ? ""
    : "opacity-0 translate-y-8 transition-[opacity,transform] duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"

  return (
    <div ref={ref} className={[revealClass, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  )
}
