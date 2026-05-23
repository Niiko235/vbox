'use server'

import { db } from '@/db/connnection'
import { getSesion } from '@/features/auth/actions/get-sesion'
import type { RelacionEstudiante } from '@/features/games/clases/store'

// ─── Tipos de entrada ─────────────────────────────────────────────────────────

export type ClaseRespuesta = {
  claseId: number
  componenteIds: number[]
}

export type ValidateGameInput = {
  juegoId: number
  grupoId: number
  clases: ClaseRespuesta[]
  relacionesEstudiante: RelacionEstudiante[]
}

// ─── Tipos de salida ──────────────────────────────────────────────────────────

export type ErrorComponente = {
  componenteId: number
  nombreComponente: string
  retroalimentacion: string
}

export type ValidateGameResult = {
  puntajeObtenido: number
  puntajeTotal: number
  errores: ErrorComponente[]
}

type ValidateGameResponse =
  | { success: true; data: ValidateGameResult }
  | { success: false; error: string }

// ─── Tipo raw de la DB ────────────────────────────────────────────────────────

type ComponenteRow = {
  id: number
  nombre: string
  retroalimentacion: string | null
  nombre_tipo_componente: 'Clase' | 'Atributo' | 'Metodo' | 'Relacion'
  clase_correcta: number | null
  extra: Record<string, unknown> | null
}

type JuegoRow = {
  puntuacion: number
}

// ─── Server Action ────────────────────────────────────────────────────────────

export async function validateGame(
  input: ValidateGameInput
): Promise<ValidateGameResponse> {
  try {
    // ── Verificar sesión ─────────────────────────────────────────────────────
    const { ok, sesion } = await getSesion()
    if (!ok || !sesion) {
      return { success: false, error: 'Sesión no válida.' }
    }

    const estudianteId = BigInt(sesion.cedula)

    // ── 1. Re-consultar solución y puntaje máximo en paralelo ────────────────
    //    (request distinta a la carga de página → no hay cache compartido)
    const [{ rows: componentes }, { rows: juegoRows }] = await Promise.all([
      db.query<ComponenteRow>(
        `SELECT id, nombre, retroalimentacion, nombre_tipo_componente, clase_correcta, extra
         FROM consultar_componentes_juego($1)
         WHERE nombre_tipo_componente IN ('Atributo', 'Metodo', 'Relacion')`,
        [input.juegoId]
      ),
      db.query<JuegoRow>(
        'SELECT puntuacion FROM consultar_juego($1)',
        [input.juegoId]
      ),
    ])

    if (juegoRows.length === 0) {
      return { success: false, error: 'El juego no existe.' }
    }

    const puntajeTotal = juegoRows[0].puntuacion

    // ── 2. Separar componentes por tipo ──────────────────────────────────────

    const componentesAtribMetod = componentes.filter(
      (c) => c.nombre_tipo_componente === 'Atributo' || c.nombre_tipo_componente === 'Metodo'
    )
    const relacionesSolucion = componentes.filter(
      (c) => c.nombre_tipo_componente === 'Relacion'
    )

    // ── 3. Validar atributos y métodos ────────────────────────────────────────

    const grafoSolucion = new Map<number, number>()
    for (const c of componentesAtribMetod) {
      if (c.clase_correcta !== null) {
        grafoSolucion.set(c.id, c.clase_correcta)
      }
    }

    const grafoEstudiante = new Map<number, number>()
    for (const clase of input.clases) {
      for (const componenteId of clase.componenteIds) {
        grafoEstudiante.set(componenteId, clase.claseId)
      }
    }

    const errores: ErrorComponente[] = []
    let totalCorrectos = 0

    for (const componente of componentesAtribMetod) {
      const claseCorrecta = grafoSolucion.get(componente.id)
      const claseEstudiante = grafoEstudiante.get(componente.id)

      if (claseCorrecta === claseEstudiante) {
        totalCorrectos++
      } else {
        errores.push({
          componenteId: componente.id,
          nombreComponente: componente.nombre,
          retroalimentacion:
            componente.retroalimentacion ??
            'Este componente no pertenece a esta clase.',
        })
      }
    }

    // ── 4. Validar relaciones ─────────────────────────────────────────────────

    for (const relSolucion of relacionesSolucion) {
      const extra = relSolucion.extra as {
        claseOrigen: number
        claseDestino: number
        tipo: string
      }

      const dibujada = input.relacionesEstudiante.find(
        (r) =>
          r.claseOrigen === extra.claseOrigen &&
          r.claseDestino === extra.claseDestino &&
          r.tipo === extra.tipo
      )

      if (dibujada) {
        totalCorrectos++
      } else {
        errores.push({
          componenteId: relSolucion.id,
          nombreComponente: `Relación ${extra.tipo}`,
          retroalimentacion:
            relSolucion.retroalimentacion ??
            `Falta una relación de tipo ${extra.tipo} entre las clases indicadas.`,
        })
      }
    }

    // ── 5. Calcular puntaje proporcional ──────────────────────────────────────
    const totalComponentes = componentesAtribMetod.length + relacionesSolucion.length
    const puntajeObtenido =
      totalComponentes > 0
        ? Math.round((totalCorrectos / totalComponentes) * puntajeTotal)
        : 0

    // ── 5. Registrar resultado (solo después de validar) ──────────────────────
    await db.query('SELECT registrar_ingresojuego($1, $2, $3, $4)', [
      estudianteId,
      input.grupoId,
      input.juegoId,
      puntajeObtenido,
    ])

    return {
      success: true,
      data: { puntajeObtenido, puntajeTotal, errores },
    }
  } catch (error) {
    console.error('[validateGame]', error)
    return { success: false, error: 'Error al validar el juego.' }
  }
}
