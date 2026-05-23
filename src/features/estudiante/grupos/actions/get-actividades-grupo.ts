'use server'

import { db } from '@/db/connnection'

export type ActividadGrupo = {
  idactividad: number
  nombre: string
  url: string
  disponible: boolean
  idteoria: number
}

export async function getActividadesGrupo(idgrupo: number): Promise<ActividadGrupo[]> {
  const { rows } = await db.query<ActividadGrupo>(
    'SELECT * FROM consultar_actividades_grupo($1)',
    [idgrupo]
  )
  return rows
}
