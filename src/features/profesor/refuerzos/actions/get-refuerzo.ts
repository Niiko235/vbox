'use server'

import { db } from '@/db/connnection'

export type RefuerzoDetalle = {
  idrefuerzo:  number
  explicacion: string
  puntuacion:  number
  idmodulo:    number
  nombremodulo: string
}

export async function getRefuerzo(
  idrefuerzo: number
): Promise<RefuerzoDetalle | null> {
  const { rows } = await db.query<RefuerzoDetalle>(
    'SELECT * FROM consultar_refuerzo($1)',
    [idrefuerzo]
  )
  return rows[0] ?? null
}
