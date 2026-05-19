import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  // Create an unmodified response
  const responseC = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const cookieStore = await cookies()
  const token = cookieStore.get('jwt')

  //grab path
  const requestedPath = request.nextUrl.pathname

  let validatedToken = false

  try {
    if (token) {
      validatedToken = true
    }
  } catch {
    validatedToken = false
  }

  // protected routes
  if (
    requestedPath.startsWith('/dashboard') ||
    requestedPath.startsWith('/home') ||
    requestedPath.startsWith('/inicio')
  ) {
    if (!validatedToken) {
      return NextResponse.redirect(new URL(`/`, request.url))
    }
  } else if (requestedPath === '/') {
    if (validatedToken) {
      return NextResponse.redirect(new URL(`/dashboard`, request.url))
    }
  }

  return responseC
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
