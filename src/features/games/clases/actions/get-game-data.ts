'use server'

import { cache } from 'react'
import { db } from '@/db/connnection'

// ─── Tipos raw que retorna la DB ──────────────────────────────────────────────

type JuegoRow = {
  id: number
  nombre: string
  descripcion: string
  puntuacion: number
}

type ComponenteRow = {
  id: number
  nombre: string
  extra: Record<string, unknown> | null
  retroalimentacion: string | null
  nombre_tipo_componente: 'Clase' | 'Atributo' | 'Metodo'
}

// ─── Tipos de dominio (lo que consume el frontend) ───────────────────────────

export type ExtraAtributo = {
  visibilidad: 'private' | 'public' | 'protected'
  tipo: string
}

export type ExtraClase = {
  x: number
  y: number
}

export type ClaseNode = {
  id: number
  nombre: string
  posicion: ExtraClase
}

export type ComponenteDisponible = {
  id: number
  nombre: string
  kind: 'Atributo' | 'Metodo'
  extra: ExtraAtributo | null
  retroalimentacion: string | null
}

export type GameData = {
  juego: JuegoRow
  clases: ClaseNode[]
  componentesDisponibles: ComponenteDisponible[]
}

// ─── Respuesta estándar ───────────────────────────────────────────────────────

type GetGameDataResponse =
  | { success: true; data: GameData }
  | { success: false; error: string }

// ─── Server Action ────────────────────────────────────────────────────────────

export const getGameData = cache(async function getGameData(
  juegoId: number
): Promise<GetGameDataResponse> {
  try {
    // Llamada 1: metadata del juego
    const { rows: juegoRows } = await db.query<JuegoRow>(
      'SELECT * FROM consultar_juego($1)',
      [juegoId]
    )

    if (juegoRows.length === 0) {
      return { success: false, error: 'El juego no existe.' }
    }

    // Llamada 2: todos los componentes del juego
    const { rows: componenteRows } = await db.query<ComponenteRow>(
      'SELECT * FROM consultar_componentes_juego($1)',
      [juegoId]
    )

    // ─── Separar clases de atributos/métodos ─────────────────────────────────

    const clases: ClaseNode[] = componenteRows
      .filter((c) => c.nombre_tipo_componente === 'Clase')
      .map((c) => ({
        id: c.id,
        nombre: c.nombre,
        posicion: (c.extra as ExtraClase) ?? { x: 0, y: 0 },
      }))

    const componentesDisponibles: ComponenteDisponible[] = componenteRows
      .filter(
        (c): c is ComponenteRow & { nombre_tipo_componente: 'Atributo' | 'Metodo' } =>
          c.nombre_tipo_componente === 'Atributo' ||
          c.nombre_tipo_componente === 'Metodo'
      )
      .map((c) => ({
        id: c.id,
        nombre: c.nombre,
        kind: c.nombre_tipo_componente,
        extra: c.nombre_tipo_componente === 'Atributo'
          ? (c.extra as ExtraAtributo)
          : null,
        retroalimentacion: c.retroalimentacion,
      }))

    return {
      success: true,
      data: {
        juego: juegoRows[0],
        clases,
        componentesDisponibles,
      },
    }
  } catch (error) {
    console.error('[getGameData]', error)
    return { success: false, error: 'Error al cargar los datos del juego.' }
  }
})
