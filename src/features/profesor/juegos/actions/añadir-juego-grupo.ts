'use server'

import { db } from '@/db/connnection'

export async function añadirJuegoGrupo(
  idjuego: number,
  idgrupo: number
): Promise<{ ok: boolean }> {
  try {
    const { rows } = await db.query<{ añadir_juego_grupo: boolean }>(
      'SELECT añadir_juego_grupo($1, $2)',
      [idjuego, idgrupo]
    )
    return { ok: rows[0].añadir_juego_grupo }
  } catch {
    return { ok: false }
  }
}
