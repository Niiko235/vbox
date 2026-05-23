'use server'

import { db } from '@/db/connnection'
import type { EnlaceRefuerzo } from './get-enlaces-refuerzo'

type CrearEnlaceInput = {
  tipo:        EnlaceRefuerzo['tipo']
  contenido:   string
  puntuacion:  number
  idrefuerzo:  number
}

type CrearEnlaceResponse =
  | { ok: true;  data: EnlaceRefuerzo }
  | { ok: false; message: string }

type EnlaceRow = {
  idenlace:   number
  tipo:       string
  contenido:  string
  puntuacion: number
}

export async function crearEnlace(
  input: CrearEnlaceInput
): Promise<CrearEnlaceResponse> {
  try {
    const { rows } = await db.query<EnlaceRow>(
      'SELECT * FROM crear_enlace($1, $2, $3, $4)',
      [input.tipo, input.contenido, input.puntuacion, input.idrefuerzo]
    )

    if (rows.length === 0) {
      return { ok: false, message: 'No se pudo crear el enlace' }
    }

    const row = rows[0]
    return {
      ok: true,
      data: {
        idenlace:   row.idenlace,
        tipo:       row.tipo as EnlaceRefuerzo['tipo'],
        contenido:  row.contenido,
        puntuacion: row.puntuacion,
      },
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al crear el enlace',
    }
  }
}
