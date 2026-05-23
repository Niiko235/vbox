'use server'

import { db } from '@/db/connnection'

export type TeoriaGrupo = {
  idteoria: number
  nombre: string
  contenido: string
  orden: number
  idmodulo: number
}

export async function getTeoriasGrupo(idgrupo: number): Promise<TeoriaGrupo[]> {
  const { rows } = await db.query<TeoriaGrupo>(
    'SELECT * FROM consultar_teorias_grupo($1)',
    [idgrupo]
  )
  return rows
}
