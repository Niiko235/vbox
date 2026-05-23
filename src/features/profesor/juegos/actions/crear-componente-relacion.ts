'use server'

import { db } from '@/db/connnection'
import type { RelacionEditor, TipoRelacion } from './get-juego-editor'

type CrearComponenteRelacionInput = {
  tipoRelacion: TipoRelacion
  idclaseOrigen: number
  idclaseDestino: number
  retroalimentacion: string | null
  idjuego: number
}

type CrearComponenteRelacionResponse =
  | { ok: true; data: RelacionEditor }
  | { ok: false; message: string }

type RelacionRow = {
  idcomponente: number
  tipo_relacion: string
  idclase_origen: number
  idclase_destino: number
  retroalimentacion: string | null
}

export async function crearComponenteRelacion(
  input: CrearComponenteRelacionInput
): Promise<CrearComponenteRelacionResponse> {
  try {
    const { rows } = await db.query<RelacionRow>(
      'SELECT * FROM crear_componente_relacion($1, $2, $3, $4, $5)',
      [input.tipoRelacion, input.idclaseOrigen, input.idclaseDestino, input.retroalimentacion, input.idjuego]
    )

    if (rows.length === 0) {
      return { ok: false, message: 'No se pudo crear la relación' }
    }

    const row = rows[0]
    return {
      ok: true,
      data: {
        id: row.idcomponente,
        tipo: row.tipo_relacion as TipoRelacion,
        claseOrigen: row.idclase_origen,
        claseDestino: row.idclase_destino,
        retroalimentacion: row.retroalimentacion,
      },
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al crear la relación',
    }
  }
}
