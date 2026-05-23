'use server'

import { db } from '@/db/connnection'

export type EnlaceRefuerzo = {
  idenlace:   number
  tipo:       'Sitio web' | 'Documento' | 'Video' | 'Otro'
  contenido:  string
  puntuacion: number
}

export async function getEnlacesRefuerzo(
  idrefuerzo: number
): Promise<EnlaceRefuerzo[]> {
  const { rows } = await db.query<EnlaceRefuerzo>(
    'SELECT * FROM consultar_enlaces_refuerzo($1)',
    [idrefuerzo]
  )
  return rows
}
