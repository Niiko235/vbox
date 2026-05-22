'use server'

import { db } from '@/db/connnection'
import { tipo_rol } from '@/types/db'

export type Profesor = {
  pkcc: string
  primernombre: string
  segundonombre: string | null
  primerapellido: string
  segundoapellido: string | null
  rol: tipo_rol
  fechanacimiento: string | null
  telefono: string | null
  email: string
  codigoprograma: number | null
  nombreprograma: string | null
  codigouniversidad: number | null
}

export async function getAllProfesores(): Promise<Profesor[]> {
  const { rows } = await db.query<Profesor>('SELECT * FROM consultar_profe()')
  return rows
}
