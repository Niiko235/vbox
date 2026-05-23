'use server'

import { db } from '@/db/connnection'

// ─── Tipos raw de la DB ───────────────────────────────────────────────────────

type JuegoRow = {
  id: number
  nombre: string
  descripcion: string
  puntuacion: number
}

type ComponenteRow = {
  id: number
  nombre: string | null
  extra: Record<string, unknown> | null
  retroalimentacion: string | null
  nombre_tipo_componente: 'Clase' | 'Atributo' | 'Metodo' | 'Relacion'
  clase_correcta: number | null
}

// ─── Tipos del editor ─────────────────────────────────────────────────────────

export type TipoRelacion = 'Asociacion' | 'Agregacion' | 'Composicion' | 'Herencia'

export type MiembroEditor = {
  id: number
  nombre: string
  visibilidad: 'private' | 'public' | 'protected'
  tipo: string
  retroalimentacion: string | null
}

export type ClaseEditor = {
  id: number
  nombre: string
  posicion: { x: number; y: number }
  atributos: MiembroEditor[]
  metodos: MiembroEditor[]
}

export type RelacionEditor = {
  id: number
  tipo: TipoRelacion
  claseOrigen: number
  claseDestino: number
  retroalimentacion: string | null
}

export type JuegoEditorData = {
  juego: JuegoRow
  clases: ClaseEditor[]
  relaciones: RelacionEditor[]
}

// ─── Respuesta ────────────────────────────────────────────────────────────────

type GetJuegoEditorResponse =
  | { success: true; data: JuegoEditorData }
  | { success: false; error: string }

// ─── Action ───────────────────────────────────────────────────────────────────

export async function getJuegoEditor(
  idjuego: number
): Promise<GetJuegoEditorResponse> {
  try {
    const [{ rows: juegoRows }, { rows: componenteRows }] = await Promise.all([
      db.query<JuegoRow>('SELECT * FROM consultar_juego($1)', [idjuego]),
      db.query<ComponenteRow>('SELECT * FROM consultar_componentes_juego($1)', [idjuego]),
    ])

    if (juegoRows.length === 0) {
      return { success: false, error: 'El juego no existe.' }
    }

    // ── Construir mapa de clases ──────────────────────────────────────────────

    const clasesMap = new Map<number, ClaseEditor>()

    for (const c of componenteRows) {
      if (c.nombre_tipo_componente !== 'Clase') continue
      const extra = c.extra as { x: number; y: number } | null
      clasesMap.set(c.id, {
        id: c.id,
        nombre: c.nombre ?? '',
        posicion: extra ?? { x: 50, y: 50 },
        atributos: [],
        metodos: [],
      })
    }

    // ── Asignar atributos y métodos a sus clases ──────────────────────────────

    for (const c of componenteRows) {
      if (c.nombre_tipo_componente !== 'Atributo' && c.nombre_tipo_componente !== 'Metodo') continue
      if (c.clase_correcta === null) continue

      const clase = clasesMap.get(c.clase_correcta)
      if (!clase) continue

      const extra = c.extra as { visibilidad: 'private' | 'public' | 'protected'; tipo: string } | null
      const miembro: MiembroEditor = {
        id: c.id,
        nombre: c.nombre ?? '',
        visibilidad: extra?.visibilidad ?? 'public',
        tipo: extra?.tipo ?? '',
        retroalimentacion: c.retroalimentacion,
      }

      if (c.nombre_tipo_componente === 'Atributo') {
        clase.atributos.push(miembro)
      } else {
        clase.metodos.push(miembro)
      }
    }

    // ── Construir relaciones ──────────────────────────────────────────────────

    const relaciones: RelacionEditor[] = componenteRows
      .filter((c) => c.nombre_tipo_componente === 'Relacion')
      .map((c) => {
        const extra = c.extra as { claseOrigen: number; claseDestino: number; tipo: TipoRelacion }
        return {
          id: c.id,
          tipo: extra.tipo,
          claseOrigen: extra.claseOrigen,
          claseDestino: extra.claseDestino,
          retroalimentacion: c.retroalimentacion,
        }
      })

    return {
      success: true,
      data: {
        juego: juegoRows[0],
        clases: Array.from(clasesMap.values()),
        relaciones,
      },
    }
  } catch (error) {
    console.error('[getJuegoEditor]', error)
    return { success: false, error: 'Error al cargar el editor.' }
  }
}
