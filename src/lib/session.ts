import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { tipo_rol } from '@/types/db'

type JwtPayload = {
  email: string
  name: string
  role: tipo_rol
  cedula: string
}

export async function getSession(): Promise<JwtPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('jwt')?.value

  if (!token) return null

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
  } catch {
    return null
  }
}

export async function getSessionRole(): Promise<tipo_rol | undefined> {
  const session = await getSession()
  return session?.role
}