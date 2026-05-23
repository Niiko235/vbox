import { db } from './connnection'
import { tipo_rol } from '@/types/db'
import { QueryResultRow } from 'pg'

// Mapea los roles de tu app a los roles de PostgreSQL
const rolMap: Record<tipo_rol, string> = {
  estudiante:     'estvbox',
  profesor:       'provbox',
  administrador:  'adminvbox',
}

export async function queryConRol<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: any[],
  rol?: tipo_rol
): Promise<T[]> {
  const client = await db.connect()
  try {
    if (rol && rolMap[rol]) {
      await client.query(`SET ROLE ${rolMap[rol]}`)
    } else {
      // Sin rol → usa iniciador (visitante por defecto)
      await client.query(`SET ROLE iniciador`)
    }
    const { rows } = await client.query<T>(sql, params)
    return rows
  } finally {
    await client.query('RESET ROLE')
    client.release()
  }
}