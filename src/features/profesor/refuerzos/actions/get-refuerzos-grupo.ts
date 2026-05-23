'use server'

import { db } from '@/db/connnection'

export type RefuerzoGrupo = {
  idrefuerzo: number
  explicacion: string
  puntuacion: number
  idmodulo: number
  nombremodulo: string
}

export async function getRefuerzosGrupo(idgrupo: number): Promise<RefuerzoGrupo[]> {
  const { rows } = await db.query<RefuerzoGrupo>(
    'SELECT * FROM consultar_refuerzos_grupo($1)',
    [idgrupo]
  )
  return rows
}
