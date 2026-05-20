'use server'

import { db } from '@/db/connnection'

type EditActivityResponse = {
  ok: boolean
  message?: string
}

export async function editActivity(
  id: number,
  nombre: string,
  url: string,
  disponible: boolean
): Promise<EditActivityResponse> {
  try {
    const { rows } = await db.query<{ editar_actividad: boolean }>(
      'SELECT editar_actividad($1, $2, $3, $4)',
      [id, nombre, url, disponible]
    )
    return { ok: rows[0].editar_actividad }
  } catch {
    return { ok: false, message: 'Error inesperado al editar la actividad' }
  }
}
