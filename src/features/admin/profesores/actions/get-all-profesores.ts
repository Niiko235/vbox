'use server'

import { db } from '@/db/connnection'
import { tipo_rol } from '@/types/db' 

export type Profesor = {
  pkcc: string
  primernombre: string
  primerapellido: string
  email: string
  rol: tipo_rol
}

export async function getAllProfesores(): Promise<Profesor[]> {
  const { rows } = await db.query<Profesor>('SELECT * FROM get_profesores()')
  return rows
}
