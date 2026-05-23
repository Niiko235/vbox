'use server'

import { db } from '@/db/connnection'
import type { MiembroEditor } from './get-juego-editor'

type CrearComponenteAtributoInput = {
  nombre: string
  visibilidad: 'private' | 'public' | 'protected'
  tipo: string
  idclase: number
  retroalimentacion: string | null
  idjuego: number
}

type CrearComponenteAtributoResponse =
  | { ok: true; data: MiembroEditor }
  | { ok: false; message: string }

type AtributoRow = {
  idcomponente: number
  nombre: string
  visibilidad: string
  tipo: string
  idclase: number
}

export async function crearComponenteAtributo(
  input: CrearComponenteAtributoInput
): Promise<CrearComponenteAtributoResponse> {
  try {
    const { rows } = await db.query<AtributoRow>(
      'SELECT * FROM crear_componente_atributo($1, $2, $3, $4, $5, $6)',
      [input.nombre, input.visibilidad, input.tipo, input.idclase, input.retroalimentacion, input.idjuego]
    )

    if (rows.length === 0) {
      return { ok: false, message: 'No se pudo crear el atributo' }
    }

    const row = rows[0]
    return {
      ok: true,
      data: {
        id: row.idcomponente,
        nombre: row.nombre,
        visibilidad: row.visibilidad as 'private' | 'public' | 'protected',
        tipo: row.tipo,
        retroalimentacion: input.retroalimentacion,
      },
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al crear el atributo',
    }
  }
}
