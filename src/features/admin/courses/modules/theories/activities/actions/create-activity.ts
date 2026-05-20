'use server'

import { db } from '@/db/connnection'

type CreateActivityResponse = {
  ok: boolean
  id?: number
  message?: string
}

export async function createActivity(
  nombre: string,
  url: string,
  disponible: boolean,
  idTeoria: number
): Promise<CreateActivityResponse> {
  try {
    const { rows } = await db.query<{ registrar_actividad: number }>(
      'SELECT registrar_actividad($1, $2, $3, $4)',
      [nombre, url, disponible, idTeoria]
    )
    return { ok: true, id: rows[0].registrar_actividad }
  } catch {
    return { ok: false, message: 'Error inesperado al crear la actividad' }
  }
}
