'use server'

import { db } from '@/db/connnection'

type EditModuleResponse = {
  ok: boolean
  message?: string
}

export async function editModule(id: number, nombre: string): Promise<EditModuleResponse> {
  try {
    const { rows } = await db.query<{ editar_modulo: boolean }>(
      'SELECT editar_modulo($1, $2)',
      [id, nombre]
    )
    return { ok: rows[0].editar_modulo }
  } catch {
    return { ok: false, message: 'Error inesperado al editar el módulo' }
  }
}
