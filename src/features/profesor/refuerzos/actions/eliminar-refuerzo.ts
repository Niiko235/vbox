'use server'

import { db } from '@/db/connnection'

type EliminarRefuerzoResponse = {
  ok: boolean
  message?: string
}

export async function eliminarRefuerzo(id: number): Promise<EliminarRefuerzoResponse> {
  try {
    const { rows } = await db.query<{ eliminar_refuerzo: boolean }>(
      'SELECT eliminar_refuerzo($1)',
      [id]
    )
    return { ok: rows[0].eliminar_refuerzo }
  } catch {
    return { ok: false, message: 'Error inesperado al eliminar el refuerzo' }
  }
}
