'use server'

import { db } from '@/db/connnection'

export type GrupoDetalle = {
  idgrupo: number
  nombregrupo: string
  descripcion: string
  fechacreacion: string
  idcurso: number
  nombrecurso: string
}

export async function getGrupoById(idgrupo: number): Promise<GrupoDetalle | null> {
  const { rows } = await db.query<GrupoDetalle>(
    'SELECT * FROM consultar_grupo_por_id($1)',
    [idgrupo]
  )
  return rows[0] ?? null
}
