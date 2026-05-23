'use server'

import { db } from '@/db/connnection'

type EditarRefuerzoInput = {
  idrefuerzo:  number
  explicacion: string
  puntuacion:  number
  idmodulo:    number
}

export async function editarRefuerzo(
  input: EditarRefuerzoInput
): Promise<{ ok: boolean }> {
  try {
    const { rows } = await db.query<{ editar_refuerzo: boolean }>(
      'SELECT editar_refuerzo($1, $2, $3, $4)',
      [input.idrefuerzo, input.explicacion, input.puntuacion, input.idmodulo]
    )
    return { ok: rows[0].editar_refuerzo }
  } catch {
    return { ok: false }
  }
}
