'use server'

import { db } from '@/db/connnection'

export async function eliminarComponente(
  idcomponente: number
): Promise<{ ok: boolean }> {
  try {
    const { rows } = await db.query<{ eliminar_componente: boolean }>(
      'SELECT eliminar_componente($1)',
      [idcomponente]
    )
    return { ok: rows[0].eliminar_componente }
  } catch {
    return { ok: false }
  }
}
