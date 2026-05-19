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
  primernombre: string
  correo: string
  rol: tipo_rol
  id: string
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

    console.log('DB row:', rows[0])

    const token = jwt.sign(
      {
        email: user.correo,
        name: user.primernombre,
        role: user.rol,
        cedula: user.id,
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
        email: user.correo,
        name: user.primernombre,
        role: user.rol,
      },
    }
  } catch {
    return {
      ok: false,
      error: 'Error al iniciar sesión',
    }
  }
}
