import { create } from 'zustand'

import type {
  ClaseEditor,
  RelacionEditor,
  JuegoEditorData,
  TipoRelacion,
  MiembroEditor,
} from './actions/get-juego-editor'

import { crearComponenteClase }    from './actions/crear-componente-clase'
import { crearComponenteAtributo } from './actions/crear-componente-atributo'
import { crearComponenteMetodo }   from './actions/crear-componente-metodo'
import { crearComponenteRelacion } from './actions/crear-componente-relacion'
import { eliminarComponente as eliminarComponenteAction } from './actions/eliminar-componente'
import { actualizarPosicionClase as actualizarPosicionAction } from './actions/actualizar-posicion-clase'

// ─── Tipos de input para las acciones del store ───────────────────────────────

export type AgregarMiembroInput = {
  nombre: string
  visibilidad: 'private' | 'public' | 'protected'
  tipo: string
  idclase: number
  retroalimentacion: string | null
  idjuego: number
}

export type AgregarRelacionInput = {
  tipoRelacion: TipoRelacion
  idclaseOrigen: number
  idclaseDestino: number
  retroalimentacion: string | null
  idjuego: number
}

// ─── Tipo del store ───────────────────────────────────────────────────────────

type EditorStore = {
  idjuego: number | null
  clases: ClaseEditor[]
  relaciones: RelacionEditor[]

  // Carga inicial desde la DB
  inicializar: (data: JuegoEditorData) => void

  // ── Clases ──────────────────────────────────────────────────────────────────
  agregarClase: (nombre: string, idjuego: number) => Promise<{ ok: boolean }>
  eliminarClase: (idclase: number) => Promise<{ ok: boolean }>

  // Posición: se actualiza en local en cada drag y se persiste al soltar
  actualizarPosicionLocal: (idclase: number, posicion: { x: number; y: number }) => void
  persistirPosicion: (idclase: number, x: number, y: number) => Promise<void>

  // ── Atributos ───────────────────────────────────────────────────────────────
  agregarAtributo: (input: AgregarMiembroInput) => Promise<{ ok: boolean }>
  eliminarAtributo: (idatributo: number, idclase: number) => Promise<{ ok: boolean }>

  // ── Métodos ─────────────────────────────────────────────────────────────────
  agregarMetodo: (input: AgregarMiembroInput) => Promise<{ ok: boolean }>
  eliminarMetodo: (idmetodo: number, idclase: number) => Promise<{ ok: boolean }>

  // ── Relaciones ───────────────────────────────────────────────────────────────
  agregarRelacion: (input: AgregarRelacionInput) => Promise<{ ok: boolean }>
  eliminarRelacion: (idrelacion: number) => Promise<{ ok: boolean }>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function eliminarMiembroDeClase(
  clases: ClaseEditor[],
  idmiembro: number,
  idclase: number,
  tipo: 'atributos' | 'metodos'
): ClaseEditor[] {
  return clases.map((c) => {
    if (c.id !== idclase) return c
    return { ...c, [tipo]: c[tipo].filter((m: MiembroEditor) => m.id !== idmiembro) }
  })
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useEditorStore = create<EditorStore>((set, get) => ({
  idjuego: null,
  clases: [],
  relaciones: [],

  // ── Inicializar ─────────────────────────────────────────────────────────────

  inicializar: (data) => {
    set({
      idjuego: data.juego.id,
      clases: data.clases,
      relaciones: data.relaciones,
    })
  },

  // ── Clases ──────────────────────────────────────────────────────────────────

  agregarClase: async (nombre, idjuego) => {
    const result = await crearComponenteClase(nombre, idjuego)
    if (!result.ok) return { ok: false }

    set((state) => ({ clases: [...state.clases, result.data] }))
    return { ok: true }
  },

  eliminarClase: async (idclase) => {
    const result = await eliminarComponenteAction(idclase)
    if (!result.ok) return { ok: false }

    set((state) => ({
      // Quitar la clase
      clases: state.clases.filter((c) => c.id !== idclase),
      // Quitar relaciones que la involucren (cascade en DB, reflejamos en cliente)
      relaciones: state.relaciones.filter(
        (r) => r.claseOrigen !== idclase && r.claseDestino !== idclase
      ),
    }))
    return { ok: true }
  },

  // ── Posición de nodos ───────────────────────────────────────────────────────

  // Llamado en onNodesChange durante el drag (solo actualiza estado local)
  actualizarPosicionLocal: (idclase, posicion) => {
    set((state) => ({
      clases: state.clases.map((c) =>
        c.id === idclase ? { ...c, posicion } : c
      ),
    }))
  },

  // Llamado en onNodeDragStop (persiste en DB)
  persistirPosicion: async (idclase, x, y) => {
    await actualizarPosicionAction(idclase, x, y)
    // No necesita actualizar estado local — ya fue actualizado por actualizarPosicionLocal
  },

  // ── Atributos ───────────────────────────────────────────────────────────────

  agregarAtributo: async (input) => {
    const result = await crearComponenteAtributo(input)
    if (!result.ok) return { ok: false }

    set((state) => ({
      clases: state.clases.map((c) =>
        c.id === input.idclase
          ? { ...c, atributos: [...c.atributos, result.data] }
          : c
      ),
    }))
    return { ok: true }
  },

  eliminarAtributo: async (idatributo, idclase) => {
    const result = await eliminarComponenteAction(idatributo)
    if (!result.ok) return { ok: false }

    set((state) => ({
      clases: eliminarMiembroDeClase(state.clases, idatributo, idclase, 'atributos'),
    }))
    return { ok: true }
  },

  // ── Métodos ─────────────────────────────────────────────────────────────────

  agregarMetodo: async (input) => {
    const result = await crearComponenteMetodo(input)
    if (!result.ok) return { ok: false }

    set((state) => ({
      clases: state.clases.map((c) =>
        c.id === input.idclase
          ? { ...c, metodos: [...c.metodos, result.data] }
          : c
      ),
    }))
    return { ok: true }
  },

  eliminarMetodo: async (idmetodo, idclase) => {
    const result = await eliminarComponenteAction(idmetodo)
    if (!result.ok) return { ok: false }

    set((state) => ({
      clases: eliminarMiembroDeClase(state.clases, idmetodo, idclase, 'metodos'),
    }))
    return { ok: true }
  },

  // ── Relaciones ───────────────────────────────────────────────────────────────

  agregarRelacion: async (input) => {
    const result = await crearComponenteRelacion(input)
    if (!result.ok) return { ok: false }

    set((state) => ({ relaciones: [...state.relaciones, result.data] }))
    return { ok: true }
  },

  eliminarRelacion: async (idrelacion) => {
    const result = await eliminarComponenteAction(idrelacion)
    if (!result.ok) return { ok: false }

    set((state) => ({
      relaciones: state.relaciones.filter((r) => r.id !== idrelacion),
    }))
    return { ok: true }
  },
}))
