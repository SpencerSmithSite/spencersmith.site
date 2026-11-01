"use client"

import dynamic from "next/dynamic"

const PhotoGallery = dynamic(() => import("@/components/photo-gallery"), {
  ssr: false,
})

export default function HomePhotoGallery() {
  return <PhotoGallery />
}
