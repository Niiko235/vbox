'use server'

import { db } from '@/db/connnection'

export type EstudianteGrupo = {
  cedula: string
  nombre: string
  correo: string
  puntuaciontotal: number
}

export async function getEstudiantesGrupo(idgrupo: number): Promise<EstudianteGrupo[]> {
  const { rows } = await db.query<EstudianteGrupo>(
    'SELECT * FROM consultar_estudiantes_grupo($1)',
    [idgrupo]
  )
  return rows
}
