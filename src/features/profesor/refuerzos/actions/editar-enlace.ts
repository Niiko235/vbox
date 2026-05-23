'use server'

import { db } from '@/db/connnection'
import type { EnlaceRefuerzo } from './get-enlaces-refuerzo'

type EditarEnlaceInput = {
  idenlace:   number
  tipo:       EnlaceRefuerzo['tipo']
  contenido:  string
  puntuacion: number
}

export async function editarEnlace(
  input: EditarEnlaceInput
): Promise<{ ok: boolean }> {
  try {
    const { rows } = await db.query<{ editar_enlace: boolean }>(
      'SELECT editar_enlace($1, $2, $3, $4)',
      [input.idenlace, input.tipo, input.contenido, input.puntuacion]
    )
    return { ok: rows[0].editar_enlace }
  } catch {
    return { ok: false }
  }
}
