'use server'

import { db } from '@/db/connnection'

export type Profesor = {
  pkcc: string
  primernombre: string
  primerapellido: string
  email: string
}

export async function getAllProfesores(): Promise<Profesor[]> {
  const { rows } = await db.query<Profesor>('SELECT * FROM get_profesores()')
  return rows
}
