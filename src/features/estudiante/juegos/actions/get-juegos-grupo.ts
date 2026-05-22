'use server'

import { db } from '@/db/connnection'

export type JuegoGrupo = {
  idjuego: number
  nombrejuego: string
  mejorpuntaje: number | null
  ultimavez: string | null
}

export async function getJuegosGrupo(
  idgrupo: number,
  cedula: string
): Promise<JuegoGrupo[]> {
  const { rows } = await db.query<JuegoGrupo>(
    'SELECT * FROM consultar_juegos_grupo_estudiante($1, $2)',
    [idgrupo, cedula]
  )
  return rows
}
