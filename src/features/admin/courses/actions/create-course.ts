'use server'

import { db } from '@/db/connnection'
import { getSesion } from '@/features/auth/actions/get-sesion'
import type { Curso } from './get-all-courses'

type CreateCourseInput = {
  id: number
  nombre: string
  descripcion: string
  imagen?: string
}

type CreateCourseResponse = {
  ok: boolean
  data?: Curso
  message?: string
}

export async function createCourse(input: CreateCourseInput): Promise<CreateCourseResponse> {
  try {
    const sesionResult = await getSesion()

    if (!sesionResult.ok || !sesionResult.sesion) {
      return { ok: false, message: 'No se pudo obtener la sesión del administrador' }
    }

    const adminCedula = BigInt(sesionResult.sesion.cedula)

    await db.query(
      'CALL registrar_curso($1, $2, $3, $4, $5)',
      [
        input.id,
        input.descripcion,
        input.nombre,
        adminCedula,
        input.imagen ?? null,
      ]
    )

    return {
      ok: true,
      data: {
        id: input.id,
        nombre: input.nombre,
        descripcion: input.descripcion,
        fechacreacion: new Date().toISOString(),
      },
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al crear el curso',
    }
  }
}
