'use server'

import { db } from '@/db/connnection'

type Programa = {
  id: number
  nombre: string
  id_universidad: number
}

export async function getProgramas() {
  try {
    const { rows } = await db.query<Programa>(
      'SELECT * FROM retornar_programas()'
    )
    return { ok: true, data: rows }
  } catch {
    return { ok: false, data: [] as Programa[] }
  }
}
