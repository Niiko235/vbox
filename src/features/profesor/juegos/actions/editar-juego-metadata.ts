'use server'

import { db } from '@/db/connnection'

type EditarJuegoMetadataInput = {
  idjuego: number
  nombre: string
  descripcion: string
  puntuacion: number
}

type EditarJuegoMetadataResponse = {
  ok: boolean
  message?: string
}

export async function editarJuegoMetadata(
  input: EditarJuegoMetadataInput
): Promise<EditarJuegoMetadataResponse> {
  try {
    const { rows } = await db.query<{ editar_juego_metadata: boolean }>(
      'SELECT editar_juego_metadata($1, $2, $3, $4)',
      [input.idjuego, input.nombre, input.descripcion, input.puntuacion]
    )
    return { ok: rows[0].editar_juego_metadata }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al editar el juego',
    }
  }
}
