'use server'

import { db } from '@/db/connnection'
import type { GrupoProfesor } from './get-grupos-profesor-curso'

type CrearGrupoInput = {
  nombre: string
  descripcion: string
  cedula: string
  idcurso: number
}

type CrearGrupoResponse = {
  ok: boolean
  data?: GrupoProfesor
  message?: string
}

export async function crearGrupo(input: CrearGrupoInput): Promise<CrearGrupoResponse> {
  try {
    const { rows } = await db.query<GrupoProfesor>(
      'SELECT * FROM crear_grupo($1, $2, $3, $4)',
      [input.nombre, input.descripcion, input.cedula, input.idcurso]
    )

    if (rows.length === 0) {
      return { ok: false, message: 'No se pudo crear el grupo' }
    }

    return { ok: true, data: rows[0] }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al crear el grupo',
    }
  }
}
