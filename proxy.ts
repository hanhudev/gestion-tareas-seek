import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith("/auth") || pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next()
  }

  if (!session) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("callbackUrl", request.url)
    return NextResponse.redirect(url)
  }

  const response = NextResponse.next()
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0")
  response.headers.set("Pragma", "no-cache")
  response.headers.set("Expires", "0")
  
  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
