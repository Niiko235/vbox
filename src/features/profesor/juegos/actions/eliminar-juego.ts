'use server'

import { db } from '@/db/connnection'

export async function eliminarJuego(idjuego: number): Promise<{ ok: boolean }> {
  try {
    const { rows } = await db.query<{ eliminar_juego: boolean }>(
      'SELECT eliminar_juego($1)',
      [idjuego]
    )
    return { ok: rows[0].eliminar_juego }
  } catch {
    return { ok: false }
  }
}
