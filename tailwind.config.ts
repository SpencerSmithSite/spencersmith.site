import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Catppuccin Mocha colors
        ctp: {
          rosewater: "hsl(var(--ctp-rosewater))",
          flamingo: "hsl(var(--ctp-flamingo))",
          pink: "hsl(var(--ctp-pink))",
          mauve: "hsl(var(--ctp-mauve))",
          red: "hsl(var(--ctp-red))",
          maroon: "hsl(var(--ctp-maroon))",
          peach: "hsl(var(--ctp-peach))",
          yellow: "hsl(var(--ctp-yellow))",
          green: "hsl(var(--ctp-green))",
          teal: "hsl(var(--ctp-teal))",
          sky: "hsl(var(--ctp-sky))",
          sapphire: "hsl(var(--ctp-sapphire))",
          blue: "hsl(var(--ctp-blue))",
          lavender: "hsl(var(--ctp-lavender))",
          text: "hsl(var(--ctp-text))",
          subtext1: "hsl(var(--ctp-subtext1))",
          subtext0: "hsl(var(--ctp-subtext0))",
          overlay2: "hsl(var(--ctp-overlay2))",
          overlay1: "hsl(var(--ctp-overlay1))",
          overlay0: "hsl(var(--ctp-overlay0))",
          surface2: "hsl(var(--ctp-surface2))",
          surface1: "hsl(var(--ctp-surface1))",
          surface0: "hsl(var(--ctp-surface0))",
          base: "hsl(var(--ctp-base))",
          mantle: "hsl(var(--ctp-mantle))",
          crust: "hsl(var(--ctp-crust))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "logo-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(-5px) rotate(-1deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(var(--orbit-radius, 100px)) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--orbit-radius, 100px)) rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "logo-float": "logo-float 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        shimmer: "shimmer 2s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        orbit: "orbit 20s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-sm": "0 0 10px hsl(var(--ctp-mauve) / 0.2)",
        "glow-md": "0 0 20px hsl(var(--ctp-mauve) / 0.3)",
        "glow-lg": "0 0 40px hsl(var(--ctp-mauve) / 0.4)",
        "glow-teal": "0 0 20px hsl(var(--ctp-teal) / 0.3)",
        "glow-sapphire": "0 0 20px hsl(var(--ctp-sapphire) / 0.3)",
        glass: "0 8px 32px hsl(var(--ctp-crust) / 0.4), inset 0 1px 0 hsl(var(--ctp-text) / 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
