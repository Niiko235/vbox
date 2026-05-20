'use server'

import { db } from '@/db/connnection'

type DeleteActivityResponse = {
  ok: boolean
  message?: string
}

export async function deleteActivity(id: number): Promise<DeleteActivityResponse> {
  try {
    const { rows } = await db.query<{ eliminar_actividad: boolean }>(
      'SELECT eliminar_actividad($1)',
      [id]
    )
    return { ok: rows[0].eliminar_actividad }
  } catch {
    return { ok: false, message: 'Error inesperado al eliminar la actividad' }
  }
}
