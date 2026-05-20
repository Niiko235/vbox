'use server'

import { db } from '@/db/connnection'

type EditTheoryResponse = {
  ok: boolean
  message?: string
}

export async function editTheory(
  id: number,
  nombre: string,
  contenido: string
): Promise<EditTheoryResponse> {
  try {
    const { rows } = await db.query<{ editar_teoria: boolean }>(
      'SELECT editar_teoria($1, $2, $3)',
      [id, nombre, contenido]
    )
    return { ok: rows[0].editar_teoria }
  } catch {
    return { ok: false, message: 'Error inesperado al editar la teoría' }
  }
}
