'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

import { tipo_rol } from '@/types/db'

type sesion = {
  name: string,
  email: string,
  role: tipo_rol,
  cedula: string,
}

export async function getSesion() {
  try {
    const cookiesStore = await cookies()

    const jwtSesion = cookiesStore.get('jwt')


    if (!jwtSesion) {
      throw new Error('No se encontró el token de validación')
    }

    const token = jwt.verify(jwtSesion.value, process.env.JWT_SECRET as string) as jwt.JwtPayload & sesion;

    if (!token) {
      throw new Error('Token inválido')
    }

    const sesion : sesion = {
      name: token.name,
      email: token.email,
      role: token.role,
      cedula: token.cedula,
    }

    return {
      ok: true,
      sesion
    }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : 'Error al obtener la sesión',
    }
  }
}
