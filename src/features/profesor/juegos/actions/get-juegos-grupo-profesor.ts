'use server'

import { db } from '@/db/connnection'

export type JuegoGrupoProfesor = {
  idjuego: number
  nombrejuego: string
  descripcion: string
  puntuacion: number
  nombremodulo: string
  escreador: boolean
}

export async function getJuegosGrupoProfesor(
  idgrupo: number
): Promise<JuegoGrupoProfesor[]> {
  const { rows } = await db.query<JuegoGrupoProfesor>(
    'SELECT * FROM consultar_juegos_grupo_profesor($1)',
    [idgrupo]
  )
  return rows
}
