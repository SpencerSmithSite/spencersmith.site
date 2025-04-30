import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

interface SocialLinksProps {
  minimal?: boolean
  showAppLinks?: boolean
}

export default function SocialLinks({ minimal = false, showAppLinks = false }: SocialLinksProps) {
  const iconSize = minimal ? 18 : 20
  const containerClass = minimal ? "flex gap-3" : "flex gap-4"
  const linkClass = minimal
    ? "text-zinc-400 hover:text-white transition-colors"
    : "w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 hover:bg-teal-600 text-zinc-400 hover:text-white transition-colors"

  return (
    <div className={containerClass}>
      <Link href="https://x.com/spencersmthsite" target="_blank" rel="noopener noreferrer" className={linkClass}>
        {/* X.com logo */}
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </svg>
        <span className="sr-only">X.com</span>
      </Link>
      <Link
        href="https://www.linkedin.com/in/spencersmithsite"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <Linkedin size={iconSize} />
        <span className="sr-only">LinkedIn</span>
      </Link>
      <Link href="https://github.com/SpencerSmithSite" target="_blank" rel="noopener noreferrer" className={linkClass}>
        <Github size={iconSize} />
        <span className="sr-only">GitHub</span>
      </Link>

      {/* App Store and Play Store links - now shown based on showAppLinks prop */}
      {(showAppLinks || !minimal) && (
        <>
          <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
            {/* Apple App Store logo - updated to match the provided image */}
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L6.5 12H17.5L12 2Z" />
              <path d="M12 22L17.5 12H6.5L12 22Z" />
              <path d="M3 9L6.5 12L3 15V9Z" />
              <path d="M21 9L17.5 12L21 15V9Z" />
            </svg>
            <span className="sr-only">App Store</span>
          </Link>
          <Link href="https://play.google.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
            {/* Google Play Store logo */}
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.5 2.253v19.494L14.25 12 4.5 2.253z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 2.253l13.504 7.384-3.754 2.363L4.5 2.253zM14.25 12l3.754 2.363L4.5 21.747 14.25 12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">Play Store</span>
          </Link>
        </>
      )}
    </div>
  )
}
