'use server'

import { db } from '@/db/connnection'

export type EnlaceGrupo = {
  idenlace: number
  tipo: 'Sitio web' | 'Documento' | 'Video' | 'Otro'
  contenido: string
  puntuacion: number
  idrefuerzo: number
}

export async function getEnlacesGrupo(idgrupo: number): Promise<EnlaceGrupo[]> {
  const { rows } = await db.query<EnlaceGrupo>(
    'SELECT * FROM consultar_enlaces_grupo($1)',
    [idgrupo]
  )
  return rows
}
