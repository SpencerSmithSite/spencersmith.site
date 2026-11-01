/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // The Council site is plain static HTML in public/council, with path-relative
  // asset links. Two settings are needed to reach it at /council, and both were
  // arrived at by testing rather than by guessing:
  //
  //   /council              404          — public/ is served by exact filename,
  //                                        with no directory-index resolution
  //   /council/             308 → /council — which is the 404 above
  //   /council/index.html   200
  //
  // 1. `trailingSlash` reverses that redirect, so /council resolves to
  //    /council/ instead of away from it. It also keeps the site's relative
  //    links working: from /council the base is /, so href="assets/css/site.css"
  //    would request /assets/css/site.css and the page would render unstyled.
  //    From /council/ it resolves correctly.
  // 2. The rewrite supplies the directory index that Next will not.
  //
  // Rewriting /council straight to /council/index.html instead looks simpler and
  // is the trap: the address bar keeps /council, so every relative asset still
  // resolves against the site root.
  trailingSlash: true,
  async rewrites() {
    return [
      { source: '/council/', destination: '/council/index.html' },
    ]
  },

  // Baseline headers for every route, including static files under public/council.
  // Nonces are not used: issuing them needs middleware and would make every page dynamic.
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      // Inline scripts that cannot be hashed: Next's per-page __next_f bootstrap,
      // the next-themes flash script, and the identical Council theme script in
      // each public/council HTML file. va.vercel-scripts.com is the Analytics and
      // Speed Insights host in development (production loads /_vercel/* from 'self').
      // script-src-attr blocks onclick and other inline event handlers.
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "script-src-attr 'none'",
      // Server-rendered style attributes (React style props, Council's style="gap:1rem").
      "style-src 'self' 'unsafe-inline'",
      // Same-origin images, plus the data: SVG noise texture in app/globals.css.
      "img-src 'self' data:",
      // next/font self-hosts Inter and JetBrains Mono.
      "font-src 'self'",
      // formspree.io: contact form and the Council source-request form.
      // vitals.vercel-insights.com: Analytics and Speed Insights beacons in development.
      // Production beacons go to same-origin /_vercel/insights and /_vercel/speed-insights.
      "connect-src 'self' https://formspree.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; ')

    const securityHeaders = [
      { key: 'Content-Security-Policy', value: contentSecurityPolicy },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
      },
    ]

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
