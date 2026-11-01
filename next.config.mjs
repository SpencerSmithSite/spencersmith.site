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
}

export default nextConfig
