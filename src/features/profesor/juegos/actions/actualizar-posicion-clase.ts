'use server'

import { db } from '@/db/connnection'

export async function actualizarPosicionClase(
  idcomponente: number,
  x: number,
  y: number
): Promise<{ ok: boolean }> {
  try {
    const { rows } = await db.query<{ actualizar_posicion_clase: boolean }>(
      'SELECT actualizar_posicion_clase($1, $2, $3)',
      [idcomponente, x, y]
    )
    return { ok: rows[0].actualizar_posicion_clase }
  } catch {
    return { ok: false }
  }
}
