'use server'
import { db } from '@/db/connnection'
import { tipo_rol } from '@/types/db'

export type Perfil = {
  pkcc: string
  primernombre: string
  segundonombre: string | null
  primerapellido: string
  segundoapellido: string | null
  rol: tipo_rol
  fechanacimiento: string
  telefono: string | null
  email: string
  codigoprograma: number | null
  nombreprograma: string | null
  codigouniversidad: number | null
  nombreuniversidad: string | null
}

export async function getPerfil(cedula: string): Promise<Perfil> {
    const { rows } = await db.query<Perfil>('SELECT * FROM obtener_datos($1)', [cedula])
    console.log(rows[0])
    return rows[0]
}