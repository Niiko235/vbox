'use server'

import { db } from '@/db/connnection'

type DeleteTeacherResponse = {
  ok: boolean
  message?: string
}

export async function deleteOneTeacher(cedula: string): Promise<DeleteTeacherResponse> {
  try {
    const { rows } = await db.query<{ eliminar_profesor: string }>(
      'SELECT eliminar_profesor($1)',
      [BigInt(cedula)]
    )

    const result = rows[0].eliminar_profesor

    if (result !== 'OK') {
      return { ok: false, message: result }
    }

    return { ok: true }
  } catch {
    return { ok: false, message: 'Error inesperado al eliminar el profesor' }
  }
}
