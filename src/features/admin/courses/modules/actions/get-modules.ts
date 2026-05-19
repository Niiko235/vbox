'use server'

import { db } from '@/db/connnection'

export type Modulo = {
  id: number
  nombre: string
}

export async function getModules(idCurso: number): Promise<Modulo[]> {
  const { rows } = await db.query<Modulo>(
    'SELECT * FROM consultar_modulos($1)',
    [idCurso]
  )
  return rows
}
