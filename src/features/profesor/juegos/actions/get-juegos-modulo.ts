'use server'

import { db } from '@/db/connnection'

export type JuegoModulo = {
  idjuego: number
  nombrejuego: string
  descripcion: string
  puntuacion: number
  yaasignado: boolean
}

export async function getJuegosModulo(
  idmodulo: number,
  idgrupo: number
): Promise<JuegoModulo[]> {
  const { rows } = await db.query<JuegoModulo>(
    'SELECT * FROM consultar_juegos_modulo($1, $2)',
    [idmodulo, idgrupo]
  )
  return rows
}
