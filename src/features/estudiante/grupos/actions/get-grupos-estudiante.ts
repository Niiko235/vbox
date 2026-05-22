'use server'

import { db } from '@/db/connnection'

export type GrupoEstudiante = {
  idgrupo: number
  nombregrupo: string
  descripcion: string
  fechaingreso: string
  nombrecurso: string
}

export async function getGruposEstudiante(cedula: string): Promise<GrupoEstudiante[]> {
  const { rows } = await db.query<GrupoEstudiante>(
    'SELECT * FROM consultar_grupos_estudiante($1)',
    [cedula]
  )
  return rows
}
