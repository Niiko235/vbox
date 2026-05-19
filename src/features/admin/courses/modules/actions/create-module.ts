'use server'

import { db } from '@/db/connnection'

type CreateModuleResponse = {
  ok: boolean
  id?: number
  message?: string
}

export async function createModule(nombre: string, idCurso: number): Promise<CreateModuleResponse> {
  try {
    const { rows } = await db.query<{ registrar_modulo: number }>(
      'SELECT registrar_modulo($1, $2)',
      [nombre, idCurso]
    )
    return { ok: true, id: rows[0].registrar_modulo }
  } catch {
    return { ok: false, message: 'Error inesperado al crear el módulo' }
  }
}
