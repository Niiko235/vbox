'use server'

import { db } from '@/db/connnection'

type Universidad = {
  id: number
  nombre: string
}

export async function getUniversidades() {
  try {
    const { rows } = await db.query<Universidad>(
      'SELECT * FROM retornar_universidad()'
    )
    return { ok: true, data: rows }
  } catch {
    return { ok: false, data: [] as Universidad[] }
  }
}
