'use server'

import { db } from '@/db/connnection'
import type { JuegoGrupoProfesor } from './get-juegos-grupo-profesor'

type CrearJuegoInput = {
  nombre: string
  descripcion: string
  puntuacion: number
  idmodulo: number
  idgrupo: number
}

type CrearJuegoResponse =
  | { ok: true; data: JuegoGrupoProfesor }
  | { ok: false; message: string }

type JuegoRow = {
  idjuego: number
  nombrejuego: string
  descripcion: string
  puntuacion: number
  idmodulo: number
  nombremodulo: string
}

export async function crearJuego(
  input: CrearJuegoInput
): Promise<CrearJuegoResponse> {
  try {
    const { rows } = await db.query<JuegoRow>(
      'SELECT * FROM crear_juego($1, $2, $3, $4, $5)',
      [input.nombre, input.descripcion, input.puntuacion, input.idmodulo, input.idgrupo]
    )

    if (rows.length === 0) {
      return { ok: false, message: 'No se pudo crear el juego' }
    }

    return {
      ok: true,
      data: { ...rows[0], escreador: true },
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al crear el juego',
    }
  }
}
