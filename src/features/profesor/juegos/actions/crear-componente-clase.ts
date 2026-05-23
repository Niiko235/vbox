'use server'

import { db } from '@/db/connnection'
import type { ClaseEditor } from './get-juego-editor'

type CrearComponenteClaseResponse =
  | { ok: true; data: ClaseEditor }
  | { ok: false; message: string }

type ClaseRow = {
  idcomponente: number
  nombre: string
  x: number
  y: number
}

export async function crearComponenteClase(
  nombre: string,
  idjuego: number
): Promise<CrearComponenteClaseResponse> {
  try {
    const { rows } = await db.query<ClaseRow>(
      'SELECT * FROM crear_componente_clase($1, $2)',
      [nombre, idjuego]
    )

    if (rows.length === 0) {
      return { ok: false, message: 'No se pudo crear la clase' }
    }

    const row = rows[0]
    return {
      ok: true,
      data: {
        id: row.idcomponente,
        nombre: row.nombre,
        posicion: { x: row.x, y: row.y },
        atributos: [],
        metodos: [],
      },
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al crear la clase',
    }
  }
}
