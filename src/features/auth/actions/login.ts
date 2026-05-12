'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { db } from '@/db/connnection'
import { tipo_rol } from '@/types/db'

type props = {
  email: string
  password: string
}

type perfil = {
  PrimerNombre: string
  USUARIO: string
  ROL: tipo_rol
}

const secretKey = process.env.JWT_SECRET

export async function login({ email, password }: props) {
  const postgres = db
  try {
    const { rows } = await postgres.query<perfil>(
      'SELECT * FROM iniciar_sesion($1, $2)',
      [email, password]
    )

    if (rows.length === 0) {
      throw new Error('Credenciales inválidas')
    }

    const user = rows[0]

    const token = jwt.sign(
      {
        email: user.USUARIO,
        name: user.PrimerNombre,
        role: user.ROL,
      },
      secretKey as string
    )

    const cookieStore = await cookies()
    cookieStore.set({
      name: 'jwt',
      value: token,
    })

    return {
      ok: true,
      data: {
        email: user.USUARIO,
        name: user.PrimerNombre,
        role: user.ROL,
      },
    }
  } catch {
    return {
      ok: false,
      error: 'Error al iniciar sesión',
    }
  } finally {
    await postgres.end()
  }
}
