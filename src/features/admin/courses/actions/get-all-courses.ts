'use server'

import { db } from '@/db/connnection'

export type Curso = {
  pkid: number
  nombre: string
  fechacreacion: string
}

export async function getAllCourses(): Promise<Curso[]> {
  const { rows } = await db.query<Curso>('SELECT * FROM get_cursos()')
  return rows
}
