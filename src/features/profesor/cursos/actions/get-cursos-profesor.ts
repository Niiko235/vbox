'use server'

import { db } from '@/db/connnection'

export type CursoProfesor = {
  idcurso: number
  nombrecurso: string
  descripcion: string
  imagen: string
  fechacreacion: string
}

export async function getCursosProfesor(cedula: string): Promise<CursoProfesor[]> {
  const { rows } = await db.query<CursoProfesor>(
    'SELECT * FROM consultar_cursos_profesor($1)',
    [cedula]
  )
  return rows
}
