'use server'

import { db } from '@/db/connnection'
import type { GrupoEstudiante } from './get-grupos-estudiante'

type UnirseGrupoResponse = {
  ok: boolean
  data?: GrupoEstudiante
  message?: string
}

export async function unirseGrupo(cedula: string, idgrupo: number): Promise<UnirseGrupoResponse> {
  try {
    const { rows } = await db.query<GrupoEstudiante>(
      'SELECT * FROM unirse_grupo($1, $2)',
      [cedula, idgrupo]
    )

    if (rows.length === 0) {
      return { ok: false, message: 'No se pudo unir al grupo' }
    }

    return { ok: true, data: rows[0] }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al unirse al grupo',
    }
  }
}
