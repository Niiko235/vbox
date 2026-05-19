'use server'

import { db } from '@/db/connnection'

type DeleteModuleResponse = {
  ok: boolean
  message?: string
}

export async function deleteModule(id: number): Promise<DeleteModuleResponse> {
  try {
    const { rows } = await db.query<{ eliminar_modulo: boolean }>(
      'SELECT eliminar_modulo($1)',
      [id]
    )
    return { ok: rows[0].eliminar_modulo }
  } catch {
    return { ok: false, message: 'Error inesperado al eliminar el módulo' }
  }
}
