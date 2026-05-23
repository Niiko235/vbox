'use server'

import { db } from '@/db/connnection'

export async function eliminarEnlace(
  idenlace: number
): Promise<{ ok: boolean }> {
  try {
    const { rows } = await db.query<{ eliminar_enlace: boolean }>(
      'SELECT eliminar_enlace($1)',
      [idenlace]
    )
    return { ok: rows[0].eliminar_enlace }
  } catch {
    return { ok: false }
  }
}
