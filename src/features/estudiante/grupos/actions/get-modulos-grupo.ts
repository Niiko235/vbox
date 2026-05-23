'use server'

import { db } from '@/db/connnection'

export type ModuloGrupo = {
  idmodulo: number
  nombre: string
}

export async function getModulosGrupo(idgrupo: number): Promise<ModuloGrupo[]> {
  const { rows } = await db.query<ModuloGrupo>(
    'SELECT * FROM consultar_modulos_grupo($1)',
    [idgrupo]
  )
  return rows
}
