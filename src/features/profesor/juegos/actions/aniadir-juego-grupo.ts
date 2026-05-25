'use server'

import { db } from '@/db/connnection'

export async function aniadirJuegoGrupo(
  idjuego: number,
  idgrupo: number
): Promise<{ ok: boolean }> {
  try {

    console.log('ANADIENDO UN JUEGO EN EL SERVIDOR')
    console.log(idjuego, idgrupo)
    const { rows } = await db.query<{ aniadir_juego_grupo: boolean }>(
      'SELECT aniadir_juego_grupo($1, $2)',
      [idjuego, idgrupo]
    )
    return { ok: rows[0].aniadir_juego_grupo }
  } catch {
    return { ok: false }
  }
}
