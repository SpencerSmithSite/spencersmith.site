"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

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
  const filteredPhotos = activeCategory ? photos.filter((photo) => photo.category === activeCategory) : photos

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            activeCategory === null
              ? "bg-gradient-to-r from-primary-500 to-secondary-400 text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeCategory === category
                ? "bg-gradient-to-r from-primary-500 to-secondary-400 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden bg-zinc-800/30 border-zinc-700/50 backdrop-blur-sm cursor-pointer group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-medium">{photo.alt}</h3>
                  <p className="text-zinc-300 text-sm">{photo.category}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl bg-zinc-900 border-zinc-700">
          {selectedPhoto && (
            <div className="relative h-[80vh] w-full">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white text-lg font-medium">{selectedPhoto.alt}</p>
                <p className="text-zinc-300 text-sm">{selectedPhoto.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
