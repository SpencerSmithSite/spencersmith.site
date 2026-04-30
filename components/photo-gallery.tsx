"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Photo data structure
export interface Photo {
  id: number
  src: string
  alt: string
  category: string
  width: number
  height: number
}

// Your photos collection
const photos: Photo[] = [
  {
    id: 1,
    src: "/photos/beach-branch.jpeg",
    alt: "Bare branches frame a view of a calm blue lake",
    category: "Landscape",
    width: 1920,
    height: 1080,
  },
  {
    id: 2,
    src: "/photos/waves-crashing.jpeg",
    alt: "Waves crashing against rocks on a sunny day",
    category: "Water",
    width: 1920,
    height: 1080,
  },
  {
    id: 3,
    src: "/photos/beach-rocks.jpeg",
    alt: "Line of rocks along a tranquil shoreline",
    category: "Landscape",
    width: 1920,
    height: 1080,
  },
  {
    id: 4,
    src: "/photos/snowy-stairs.jpeg",
    alt: "Stone stairs ascending through a snowy winter forest",
    category: "Winter",
    width: 1920,
    height: 1080,
  },
  {
    id: 5,
    src: "/photos/ocean-sand.jpeg",
    alt: "Close-up where ocean water meets sandy beach",
    category: "Abstract",
    width: 1920,
    height: 1080,
  },
  {
    id: 6,
    src: "/photos/still-river.jpeg",
    alt: "Calm turquoise river surrounded by lush forest",
    category: "Nature",
    width: 1920,
    height: 1080,
  },
  {
    id: 7,
    src: "/photos/orange-flower.jpeg",
    alt: "Vibrant orange lily against blurred green background",
    category: "Flora",
    width: 1920,
    height: 1080,
  },
  {
    id: 8,
    src: "/photos/lighthouse.jpeg",
    alt: "Distant lighthouse viewed through bare branches",
    category: "Landscape",
    width: 1920,
    height: 1080,
  },
  {
    id: 9,
    src: "/photos/no-trespassing.jpeg",
    alt: "Rocky beach with private property sign and evergreen trees",
    category: "Landscape",
    width: 1920,
    height: 1080,
  },
  {
    id: 10,
    src: "/photos/flowing-river.jpeg",
    alt: "Rushing river flowing through dense forest",
    category: "Nature",
    width: 1920,
    height: 1080,
  },
  {
    id: 11,
    src: "/photos/TealAndOrangeSunset.jpeg",
    alt: "An orange sunset blends into a teal sky",
    category: "Landscape",
    width: 1920,
    height: 1080,
  },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(photos.map((photo) => photo.category)))

  // Filter photos by category if one is selected
  const filteredPhotos = activeCategory
    ? photos.filter((photo) => photo.category === activeCategory)
    : photos

  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1])
    }
  }

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === null
              ? "bg-gradient-to-r from-ctp-mauve to-ctp-sapphire text-ctp-crust shadow-glow-sm"
              : "glass-subtle text-ctp-subtext1 hover:text-ctp-text hover:border-ctp-mauve/30 border border-transparent"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-to-r from-ctp-mauve to-ctp-sapphire text-ctp-crust shadow-glow-sm"
                : "glass-subtle text-ctp-subtext1 hover:text-ctp-text hover:border-ctp-mauve/30 border border-transparent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, index) => (
          <Card
            key={photo.id}
            className="overflow-hidden glass-card border-ctp-surface2/30 cursor-pointer group hover:border-ctp-teal/50 transition-all duration-500 hover:shadow-glow-teal"
            onClick={() => setSelectedPhoto(photo)}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ctp-crust via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="glass-subtle rounded-lg p-3">
                  <h3 className="text-ctp-text font-medium text-sm line-clamp-2">
                    {photo.alt}
                  </h3>
                  <p className="text-ctp-mauve text-xs mt-1">{photo.category}</p>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-ctp-mauve/20 to-transparent transform rotate-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedPhoto}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-6xl glass border-ctp-surface2/50 p-0 overflow-hidden" hideCloseButton>
          {selectedPhoto && (
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-ctp-text hover:text-ctp-mauve hover:bg-ctp-surface0/50 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation buttons */}
              {currentIndex > 0 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-ctp-text hover:text-ctp-mauve hover:bg-ctp-surface0/50 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {currentIndex < filteredPhotos.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-ctp-text hover:text-ctp-mauve hover:bg-ctp-surface0/50 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Image */}
              <div className="relative h-[80vh] w-full">
                <Image
                  src={selectedPhoto.src || "/placeholder.svg"}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ctp-crust to-transparent">
                <div className="max-w-2xl mx-auto text-center">
                  <p className="text-ctp-text text-lg font-medium">
                    {selectedPhoto.alt}
                  </p>
                  <p className="text-ctp-mauve text-sm mt-1">
                    {selectedPhoto.category}
                  </p>
                  <p className="text-ctp-overlay1 text-xs mt-2">
                    {currentIndex + 1} / {filteredPhotos.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
