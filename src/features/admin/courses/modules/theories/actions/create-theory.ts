'use server'

import { db } from '@/db/connnection'

type CreateTheoryResponse = {
  ok: boolean
  id?: number
  message?: string
}

export async function createTheory(
  nombre: string,
  contenido: string,
  idModulo: number
): Promise<CreateTheoryResponse> {
  try {
    const { rows } = await db.query<{ registrar_teoria: number }>(
      'SELECT registrar_teoria($1, $2, $3)',
      [nombre, contenido, idModulo]
    )
    return { ok: true, id: rows[0].registrar_teoria }
  } catch {
    return { ok: false, message: 'Error inesperado al crear la teoría' }
  }
}
