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

export async function editarJuegoInfo(
  input: EditarJuegoMetadataInput
): Promise<EditarJuegoMetadataResponse> {
  try {

    console.log('Editar juego info input:', input.puntuacion) // Agrega este log para verificar los datos de entrada
    const { rows } = await db.query<{ editar_juego_info: boolean }>(
      'SELECT editar_juego_info($1, $2, $3, $4)',
      [input.idjuego, input.nombre, input.descripcion, input.puntuacion]
    )
    return { ok: rows[0].editar_juego_info }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al editar el juego',
    }
  }
}
