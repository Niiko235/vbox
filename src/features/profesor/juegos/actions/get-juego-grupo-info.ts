'use server'

import { db } from '@/db/connnection'

export type JuegoGrupoInfo = {
  escreador: boolean
  nombrejuego: string
}

/**
 * Verifica que el juego pertenezca (via juegoelegido) al grupo dado y
 * devuelve si ese grupo es el creador. Retorna null si el acceso no
 * está autorizado (el juego no está asignado a este grupo).
 */
export async function getJuegoGrupoInfo(
  idjuego: number,
  idgrupo: number
): Promise<JuegoGrupoInfo | null> {
  try {
    const { rows } = await db.query<JuegoGrupoInfo>(
      `SELECT
         (j.fkidgrupo_juego = $2) AS escreador,
         j.nombre_juego           AS nombrejuego
       FROM public.juegoelegido je
       JOIN public.juego j
         ON j.pkid_juego = je.pfkidjuego_juegoelegido
       WHERE je.pfkidjuego_juegoelegido  = $1
         AND je.pfkidgrupo_juegoelegido  = $2`,
      [idjuego, idgrupo]
    )
    return rows[0] ?? null
  } catch {
    return null
  }
}
