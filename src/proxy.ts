import { type NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

type JwtPayload = {
  role: 'administrador' | 'profesor' | 'estudiante'
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('jwt')?.value

  console.log('🔵 Middleware - Path:', pathname)
  console.log('🔵 Middleware - Token existe:', !!token)

  let payload: JwtPayload | null = null

  if (token) {
    try {

      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET
      )

      const { payload: decoded } = await jwtVerify(
        token,
        secret
      )

      payload = decoded as JwtPayload

      console.log("🟢 Rol:", payload.role)

    } catch (err) {
      console.log('🔴 Middleware JWT:', err)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}