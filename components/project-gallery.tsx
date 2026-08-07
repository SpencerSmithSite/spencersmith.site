"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { GalleryShot } from "@/lib/project-pages"

function Thumb({
  shot,
  onOpen,
}: {
  shot: GalleryShot
  onOpen: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // A cached image can finish decoding before React attaches onLoad, so the
  // event never fires and the image would stay stuck at opacity-0.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <figure className="group">
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full aspect-[4/3] overflow-hidden rounded-xl glass-card border border-ctp-surface2/30 hover:border-ctp-mauve/50 transition-all duration-300 hover:shadow-glow-sm"
      >
        {!loaded && (
          <div className="absolute inset-0 bg-ctp-surface0 animate-pulse" />
        )}
        {/* contain, not cover: these shots mix wide desktop captures with tall
            phone screenshots, and cropping either one loses the subject. */}
        <Image
          ref={imgRef}
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-contain p-2 transition-all duration-500 group-hover:scale-[1.03] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </button>
      {shot.caption && (
        <figcaption className="mt-2 text-xs text-ctp-overlay1">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  )
}

export default function ProjectGallery({ shots }: { shots: GalleryShot[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const active = openIndex === null ? null : shots[openIndex]

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shots.map((shot, i) => (
          <Thumb key={shot.src} shot={shot} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogContent
          className="max-w-6xl glass border-ctp-surface2/50 p-2 sm:p-3"
          hideCloseButton
        >
          <DialogTitle className="sr-only">{active?.alt ?? "Screenshot"}</DialogTitle>
          {active && (
            <>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full glass text-ctp-overlay1 hover:text-ctp-text hover:bg-ctp-surface0/60 transition-colors"
              >
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </button>
              {/* Intrinsic sizing: the shots vary in aspect ratio, so let the
                  image dictate the box rather than forcing a fixed frame. */}
              <img
                src={active.src}
                alt={active.alt}
                className="w-full h-auto max-h-[82vh] object-contain rounded-lg"
              />
              {active.caption && (
                <p className="px-2 pt-2 pb-1 text-sm text-ctp-subtext0">
                  {active.caption}
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
