'use server'

import { db } from '@/db/connnection'

export async function eliminarEnlace(
  idenlace: number
): Promise<{ ok: boolean }> {
  try {

    console.log('Eliminar enlace id:', idenlace) // Agrega este log para verificar el id del enlace

    const { rows } = await db.query<{ eliminar_enlace: boolean }>(
      'SELECT eliminar_enlace($1)',
      [idenlace]
    )

    console.log('Resultado eliminar enlace:', rows[0]) // Agrega este log para verificar el resultado de la consulta
    return { ok: rows[0].eliminar_enlace }
  } catch(err) {
    console.log(err)
    return { ok: false }
  }
}
