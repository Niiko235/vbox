'use server'

import { db } from '@/db/connnection'

export async function quitarJuegoGrupo(
  idjuego: number,
  idgrupo: number
): Promise<{ ok: boolean }> {
  try {
    const { rows } = await db.query<{ quitar_juego_grupo: boolean }>(
      'SELECT quitar_juego_grupo($1, $2)',
      [idjuego, idgrupo]
    )
    return { ok: rows[0].quitar_juego_grupo }
  } catch {
    return { ok: false }
  }
}
