'use server'

import { db } from '@/db/connnection'

type DeleteTheoryResponse = {
  ok: boolean
  message?: string
}

export async function deleteTheory(id: number): Promise<DeleteTheoryResponse> {
  try {
    const { rows } = await db.query<{ eliminar_teoria: boolean }>(
      'SELECT eliminar_teoria($1)',
      [id]
    )
    return { ok: rows[0].eliminar_teoria }
  } catch {
    return { ok: false, message: 'Error inesperado al eliminar la teoría' }
  }
}
