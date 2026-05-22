'use server'

import { db } from '@/db/connnection'
import type { Profesor } from './get-all-profesores'

type CreateTeacherInput = {
  cedula: string
  primernombre: string
  segundonombre?: string
  primerapellido: string
  segundoapellido?: string
  fechanacimiento: string
  email: string
  numerotelefono: string
  contrasenia: string
  programa: string
}

type CreateTeacherResponse =
  | { ok: true; data: Profesor }
  | { ok: false; message: string }

export async function createTeacher(
  input: CreateTeacherInput
): Promise<CreateTeacherResponse> {
  try {
    await db.query(
      `CALL registrar_profesor($1, $2, $3, $4, $5, 'profesor', $6, $7, $8, $9, $10)`,
      [
        input.cedula,
        input.primernombre,
        input.segundonombre ?? null,
        input.primerapellido,
        input.segundoapellido ?? null,
        input.fechanacimiento,
        input.numerotelefono,
        input.email,
        input.contrasenia,
        input.programa,
      ]
    )

    const nuevoProfesor: Profesor = {
      pkcc: input.cedula,
      primernombre: input.primernombre,
      segundonombre: input.segundonombre ?? null,
      primerapellido: input.primerapellido,
      segundoapellido: input.segundoapellido ?? null,
      fechanacimiento: input.fechanacimiento,
      telefono: input.numerotelefono,
      email: input.email,
      rol: 'profesor',
      codigoprograma: input.programa ? Number(input.programa) : null,
      nombreprograma: null,
      codigouniversidad: null,
    }

    return { ok: true, data: nuevoProfesor }
  } catch (error) {
    console.error('[createTeacher]', error)
    return { ok: false, message: 'Error al registrar el profesor.' }
  }
}
