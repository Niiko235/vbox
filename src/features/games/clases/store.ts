import { create } from 'zustand'
import type {
  GameData,
  ComponenteDisponible,
  ExtraAtributo,
} from '@/features/games/clases/actions/get-game-data'

// ─── Tipos internos del store ─────────────────────────────────────────────────

export type ClaseEnCanvas = {
  id: number
  nombre: string
  posicion: { x: number; y: number }
  atributos: ComponenteDisponible[]
  metodos: ComponenteDisponible[]
}

// ─── Payload del drag & drop ──────────────────────────────────────────────────

export type DragPayload = {
  componenteId: number
  sourceClaseId: number | null // null → viene del side panel
}

export const DRAG_MIME = 'application/vbox-componente'

// ─── Store ────────────────────────────────────────────────────────────────────

type GameStore = {
  juegoId: number | null
  clases: ClaseEnCanvas[]
  componentesDisponibles: ComponenteDisponible[]

  // Inicializa el estado con los datos que llegan de la DB
  inicializar: (data: GameData) => void

  // Side panel → clase
  moverAlCanvas: (componenteId: number, claseId: number) => void

  // Clase → side panel
  moverAlSidePanel: (componenteId: number, claseId: number) => void

  // Clase A → Clase B
  moverEntreClases: (
    componenteId: number,
    origenId: number,
    destinoId: number
  ) => void

  // Actualiza posición cuando el usuario arrastra el nodo en el canvas
  actualizarPosicion: (
    claseId: number,
    posicion: { x: number; y: number }
  ) => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extraerComponenteDeSidePanel(
  state: GameStore,
  componenteId: number
): { componente: ComponenteDisponible; resto: ComponenteDisponible[] } | null {
  const idx = state.componentesDisponibles.findIndex((c) => c.id === componenteId)
  if (idx === -1) return null
  const componente = state.componentesDisponibles[idx]
  const resto = state.componentesDisponibles.filter((c) => c.id !== componenteId)
  return { componente, resto }
}

function extraerComponenteDeClase(
  clases: ClaseEnCanvas[],
  componenteId: number,
  claseId: number
): { componente: ComponenteDisponible | null; clasesActualizadas: ClaseEnCanvas[] } {
  let extraido: ComponenteDisponible | null = null

  const clasesActualizadas = clases.map((clase) => {
    if (clase.id !== claseId) return clase

    const enAtributos = clase.atributos.find((a) => a.id === componenteId)
    if (enAtributos) {
      extraido = enAtributos
      return { ...clase, atributos: clase.atributos.filter((a) => a.id !== componenteId) }
    }

    const enMetodos = clase.metodos.find((m) => m.id === componenteId)
    if (enMetodos) {
      extraido = enMetodos
      return { ...clase, metodos: clase.metodos.filter((m) => m.id !== componenteId) }
    }

    return clase
  })

  return { componente: extraido, clasesActualizadas }
}

function insertarEnClase(
  clases: ClaseEnCanvas[],
  componente: ComponenteDisponible,
  claseId: number
): ClaseEnCanvas[] {
  return clases.map((clase) => {
    if (clase.id !== claseId) return clase
    if (componente.kind === 'Atributo') {
      return { ...clase, atributos: [...clase.atributos, componente] }
    }
    return { ...clase, metodos: [...clase.metodos, componente] }
  })
}

// ─── Creación del store ───────────────────────────────────────────────────────

export const useGameStore = create<GameStore>((set, get) => ({
  juegoId: null,
  clases: [],
  componentesDisponibles: [],

  inicializar: (data) => {
    set({
      juegoId: data.juego.id,
      clases: data.clases.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        posicion: c.posicion,
        atributos: [],
        metodos: [],
      })),
      componentesDisponibles: data.componentesDisponibles,
    })
  },

  moverAlCanvas: (componenteId, claseId) => {
    const state = get()
    const resultado = extraerComponenteDeSidePanel(state, componenteId)
    if (!resultado) return

    set({
      componentesDisponibles: resultado.resto,
      clases: insertarEnClase(state.clases, resultado.componente, claseId),
    })
  },

  moverAlSidePanel: (componenteId, claseId) => {
    const state = get()
    const { componente, clasesActualizadas } = extraerComponenteDeClase(
      state.clases,
      componenteId,
      claseId
    )
    if (!componente) return

    set({
      clases: clasesActualizadas,
      componentesDisponibles: [...state.componentesDisponibles, componente],
    })
  },

  moverEntreClases: (componenteId, origenId, destinoId) => {
    const state = get()
    const { componente, clasesActualizadas } = extraerComponenteDeClase(
      state.clases,
      componenteId,
      origenId
    )
    if (!componente) return

    set({
      clases: insertarEnClase(clasesActualizadas, componente, destinoId),
    })
  },

  actualizarPosicion: (claseId, posicion) => {
    set((state) => ({
      clases: state.clases.map((c) =>
        c.id === claseId ? { ...c, posicion } : c
      ),
    }))
  },
}))
