/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },

  // The Council site is plain static HTML in public/council, with path-relative
  // asset links. public/ is served by exact filename, so:
  //
  //   /council              404
  //   /council/             would 308 → /council (the 404) under Next's default
  //                         trailing-slash redirect
  //   /council/index.html   200
  //
  // Rewriting /council straight to /council/index.html keeps the address bar on
  // /council. From there href="assets/css/site.css" resolves against the site
  // root (/assets/css/site.css) and the page renders unstyled. From /council/
  // the same relative link resolves to /council/assets/css/site.css.
  //
  // That slash is only needed for /council/. trailingSlash used to force it on
  // every route. skipTrailingSlashRedirect turns Next's site-wide redirect off
  // so the redirect below can send every other trailing-slash URL back to the
  // unslashed form, while /council/ stays put for the rewrite.
  //
  // /council → /council/ cannot live in this redirects() list. Next makes the
  // trailing slash optional on user redirects, so a source of /council also
  // matches /council/ and the redirect loops. middleware.ts matches the exact
  // path instead. The rewrite supplies the directory index Next will not.
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Same shape as Next's built-in "strip trailing slash" redirect, except
      // it does not match /council/ (the lookahead sees the slash that follows
      // the capture). /council/sources.html/ still strips.
      {
        source: "/:path((?!council/$)(?:[^/]+/)*[^/]+)/",
        destination: "/:path",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      { source: "/council/", destination: "/council/index.html" },
    ]
  },

  // Baseline headers for every route, including static files under public/council.
  // Nonces are not used. middleware.ts only redirects the exact path /council;
  // it does not nonce responses or opt the other pages into dynamic rendering.
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
