'use server'

import { db } from '@/db/connnection'

export type Curso = {
  id: number
  nombre: string
  descripcion: string
  fechacreacion: string
}

export async function getAllCourses(): Promise<Curso[]> {
  const { rows } = await db.query<Curso>('SELECT * FROM consultar_curso()')
  return rows
}
