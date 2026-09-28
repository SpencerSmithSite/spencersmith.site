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
  //
  // The CivicBudget site (public/CivicBudget) is wired the same way. Its address keeps the
  // product's capitals, but people type it in lowercase. A redirect cannot fix that: Next matches
  // sources without regard to case, so /CivicBudget/ would redirect to itself forever. Instead the
  // second rule maps any spelling onto the real folder. Public files are served, case-sensitively,
  // before these rewrites run, so the exact spelling never reaches it; the page's canonical link
  // keeps search engines on one address.
  trailingSlash: true,
  async rewrites() {
    return [
      { source: '/council/', destination: '/council/index.html' },
      { source: '/CivicBudget/', destination: '/CivicBudget/index.html' },
      { source: '/CivicBudget/:path+', destination: '/CivicBudget/:path+' },
    ]
  },
}

export default nextConfig