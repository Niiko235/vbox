'use server'

import { db } from '@/db/connnection'

type EditCourseInput = {
  id: number
  nombre: string
  descripcion: string
}

type EditCourseResponse = {
  ok: boolean
  message?: string
}

export async function editCourse(input: EditCourseInput): Promise<EditCourseResponse> {
  try {
    const { rows } = await db.query<{ editar_curso: boolean }>(
      'SELECT editar_curso($1, $2, $3)',
      [input.id, input.nombre, input.descripcion]
    )

    return { ok: rows[0].editar_curso }
  } catch {
    return { ok: false, message: 'Error inesperado al editar el curso' }
  }
}
