'use server'

import { db } from '@/db/connnection'

type CrearRefuerzoInput = {
  explicacion: string
  puntuacion: number
  idmodulo: number
  idgrupo: number
}

type CrearRefuerzoResponse = {
  ok: boolean
  message?: string
}

export async function crearRefuerzo(input: CrearRefuerzoInput): Promise<CrearRefuerzoResponse> {
  try {
    const { rows } = await db.query<{ crear_refuerzo: boolean }>(
      'SELECT crear_refuerzo($1, $2, $3, $4)',
      [input.explicacion, input.puntuacion, input.idmodulo, input.idgrupo]
    )
    return { ok: rows[0].crear_refuerzo }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al crear el refuerzo',
    }
  }
}
