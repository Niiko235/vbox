'use server'

import { db } from '@/db/connnection'

export type Actividad = {
  id: number
  nombre: string
  url: string
  disponible: boolean
}

export async function getActivities(idTeoria: number): Promise<Actividad[]> {
  const { rows } = await db.query<Actividad>(
    'SELECT * FROM consultar_actividades($1)',
    [idTeoria]
  )
  return rows
}
