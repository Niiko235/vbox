'use server'

import { db } from '@/db/connnection'
import type { CursoProfesor } from './get-cursos-profesor'

export async function getCursoById(idcurso: number): Promise<CursoProfesor | null> {
  const { rows } = await db.query<CursoProfesor>(
    'SELECT * FROM consultar_curso_por_id($1)',
    [idcurso]
  )
  return rows[0] ?? null
}
