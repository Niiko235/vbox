'use server'

import { db } from '@/db/connnection'

type EditTeacherInput = {
  cedula: string
  primernombre: string
  segundonombre?: string
  primerapellido: string
  segundoapellido?: string
  fechanacimiento: string
  email: string
  numerotelefono: string
  contrasenia?: string
  programa: string
}

type EditTeacherResponse =
  | { ok: true }
  | { ok: false; message: string }

export async function editTeacher(input: EditTeacherInput): Promise<EditTeacherResponse> {
  try {
    
    const { rows } = await db.query<{ editar_profesor: boolean }>(
      `SELECT editar_profesor($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        input.cedula,
        input.primernombre,
        input.segundonombre || null,
        input.primerapellido,
        input.segundoapellido || null,
        input.fechanacimiento,
        input.numerotelefono,
        input.email,
        input.contrasenia || null,
        input.programa,
      ]
    )

    const result = rows[0]?.editar_profesor
    if (!result) return { ok: false, message: 'No se encontró el profesor.' }

    return { ok: true }
  } catch (error) {
    console.error('[editTeacher]', error)
    return { ok: false, message: 'Error al actualizar el profesor.' }
  }
}
