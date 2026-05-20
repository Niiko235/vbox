'use server'

import { db } from '@/db/connnection'

export type Teoria = {
  id: number
  nombre: string
  contenido: string
}

export async function getTheories(idModulo: number): Promise<Teoria[]> {
  const { rows } = await db.query<Teoria>(
    'SELECT * FROM consultar_teorias($1)',
    [idModulo]
  )
  return rows
}
