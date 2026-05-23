'use server'

import { db } from '@/db/connnection'
import type { MiembroEditor } from './get-juego-editor'

type CrearComponenteMetodoInput = {
  nombre: string
  visibilidad: 'private' | 'public' | 'protected'
  tipo: string
  idclase: number
  retroalimentacion: string | null
  idjuego: number
}

type CrearComponenteMetodoResponse =
  | { ok: true; data: MiembroEditor }
  | { ok: false; message: string }

type MetodoRow = {
  idcomponente: number
  nombre: string
  visibilidad: string
  tipo: string
  idclase: number
}

export async function crearComponenteMetodo(
  input: CrearComponenteMetodoInput
): Promise<CrearComponenteMetodoResponse> {
  try {
    const { rows } = await db.query<MetodoRow>(
      'SELECT * FROM crear_componente_metodo($1, $2, $3, $4, $5, $6)',
      [input.nombre, input.visibilidad, input.tipo, input.idclase, input.retroalimentacion, input.idjuego]
    )

    if (rows.length === 0) {
      return { ok: false, message: 'No se pudo crear el método' }
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
      message: error instanceof Error ? error.message : 'Error inesperado al crear el método',
    }
  }
}
