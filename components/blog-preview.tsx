import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPreviewProps {
  title: string
  excerpt: string
  date: string
  image: string
}

export default function BlogPreview({ title, excerpt, date, image }: BlogPreviewProps) {
  return (
    <Card className="overflow-hidden bg-zinc-800/30 border-zinc-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="text-sm text-primary-400 mb-2">{date}</div>
        <h3 className="text-xl font-bold mb-2 text-zinc-100">{title}</h3>
        <p className="text-zinc-400 mb-4">{excerpt}</p>
        <Link
          href="#"
          className="text-secondary-400 hover:text-secondary-300 transition-colors inline-flex items-center"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  )
}
