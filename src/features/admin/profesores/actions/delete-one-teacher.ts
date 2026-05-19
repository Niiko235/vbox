'use server'

import { db } from '@/db/connnection'

type DeleteTeacherResponse = {
  ok: boolean
  message?: string
}

export async function deleteOneTeacher(
  cedula: string
): Promise<DeleteTeacherResponse> {
  try {
    const { rows } = await db.query<{ eliminar_profesor: boolean }>(
      'SELECT eliminar_profesor($1)',
      [BigInt(cedula)]
    )

    const result = rows[0].eliminar_profesor

    return{
      ok: result,
    }

  } catch {
    return { ok: false, message: 'Error inesperado al eliminar el profesor' }
  }
}
