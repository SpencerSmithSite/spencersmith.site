import Image from "next/image"

export default function FloatingLogo() {
  return (
    <div className="floating-logo relative w-full h-full flex items-center justify-center">
      <div className="hero-logo-float relative w-48 h-48 md:w-56 md:h-56">
        {/* Single static blur layer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ctp-mauve/20 to-ctp-sapphire/20 blur-2xl" />
        <div 
          className="absolute inset-[-10%] rounded-full border border-ctp-mauve/20 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div 
          className="absolute inset-[-20%] rounded-full border border-ctp-sapphire/10 animate-spin"
          style={{ animationDuration: "30s", animationDirection: "reverse" }}
        />

        {/* Logo */}
        <Image src="/logo.png" alt="Logo" fill className="object-contain z-10" priority />
      </div>

      {/* Decorative particles with Catppuccin colors */}
      <div 
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-ctp-mauve/60 animate-pulse"
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute top-3/4 left-1/3 w-1.5 h-1.5 rounded-full bg-ctp-teal/60 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-ctp-sapphire/60 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div 
        className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-ctp-pink/60 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <div 
        className="absolute top-1/2 left-1/5 w-1.5 h-1.5 rounded-full bg-ctp-lavender/50 animate-pulse"
        style={{ animationDelay: "0.75s" }}
      />
      <div 
        className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-ctp-sky/50 animate-pulse"
        style={{ animationDelay: "1.25s" }}
      />
    </div>
  )
}
