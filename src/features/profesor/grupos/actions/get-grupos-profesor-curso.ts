'use server'

import { db } from '@/db/connnection'

export type GrupoProfesor = {
  idgrupo: number
  nombregrupo: string
  descripcion: string
  fechacreacion: string
}

export async function getGruposProfesorCurso(
  cedula: string,
  idcurso: number
): Promise<GrupoProfesor[]> {
  const { rows } = await db.query<GrupoProfesor>(
    'SELECT * FROM consultar_grupos_profesor_curso($1, $2)',
    [cedula, idcurso]
  )
  return rows
}
