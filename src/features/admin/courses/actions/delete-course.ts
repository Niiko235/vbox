'use server'

import { db } from '@/db/connnection'

type DeleteCourseResponse = {
  ok: boolean
  message?: string
}

export async function deleteCourse(id: number): Promise<DeleteCourseResponse> {
  try {
    const { rows } = await db.query<{ eliminar_curso: boolean }>(
      'SELECT eliminar_curso($1)',
      [id]
    )

    return { ok: rows[0].eliminar_curso }
  } catch {
    return { ok: false, message: 'Error inesperado al eliminar el curso' }
  }
}
