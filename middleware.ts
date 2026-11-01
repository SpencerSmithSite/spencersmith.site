import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Sends /council to /council/. A next.config redirect cannot do this: Next
// treats the trailing slash on a redirect source as optional, so a rule from
// /council to /council/ also matches /council/ and loops. A NextURL redirect
// would also drop the slash, because trailingSlash is false. /council/ itself
// is rewritten to public/council/index.html so relative asset links keep working.
export function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname
  if (pathname !== "/council") {
    return NextResponse.next()
  }

  const url = new URL(request.url)
  url.pathname = "/council/"
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: "/council",
}
