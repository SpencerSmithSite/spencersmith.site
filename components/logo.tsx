import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  className?: string
}

export default function Logo({ size = "md", withText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  }

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <Image src="/logo.png" alt="Logo" fill className="object-contain drop-shadow-lg" priority />
      </div>
      {withText && (
        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-400">
          John Doe
        </span>
      )}
    </Link>
  )
}
