'use server'

import { db } from '@/db/connnection'

export type Modulo = {
  id: number
  nombre: string
}

export async function getModulos(idcurso: number): Promise<Modulo[]> {
  const { rows } = await db.query<Modulo>(
    'SELECT * FROM consultar_modulos($1)',
    [idcurso]
  )
  return rows
}
