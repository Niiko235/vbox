'use client'

import { useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Box, Lock, ChevronRight, X } from 'lucide-react'

import { useGameStore, DRAG_MIME, type DragPayload } from '@/features/games/clases/store'
// DRAG_MIME y DragPayload siguen usándose en los drop handlers del nodo
import type { ComponenteDisponible } from '@/features/games/clases/actions/get-game-data'

// ─── Paleta de colores por nodo ───────────────────────────────────────────────

const PALETA = [
  { bar: 'bg-amber-300',  border: 'border-amber-300',  bg: 'bg-amber-50/40'  },
  { bar: 'bg-blue-300',   border: 'border-blue-300',   bg: 'bg-blue-50/40'   },
  { bar: 'bg-cyan-300',   border: 'border-cyan-300',   bg: 'bg-cyan-50/40'   },
  { bar: 'bg-emerald-300',border: 'border-emerald-300',bg: 'bg-emerald-50/40'},
  { bar: 'bg-violet-300', border: 'border-violet-300', bg: 'bg-violet-50/40' },
  { bar: 'bg-rose-300',   border: 'border-rose-300',   bg: 'bg-rose-50/40'   },
  { bar: 'bg-fuchsia-300',border: 'border-fuchsia-300',bg: 'bg-fuchsia-50/40'},
  { bar: 'bg-teal-300',   border: 'border-teal-300',   bg: 'bg-teal-50/40'   },
]

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type UMLClassNodeData = {
  claseId: number
  nombre: string
  atributos: ComponenteDisponible[]
  metodos: ComponenteDisponible[]
}

type Props = {
  data: UMLClassNodeData
}

// ─── Subcomponentes arrastrables ─────────────────────────────────────────────

type RowProps<T extends ComponenteDisponible> = {
  componente: T
  claseId: number
}

function AtributoRow({ componente, claseId }: RowProps<ComponenteDisponible>) {
  const { moverAlSidePanel } = useGameStore()
  const isPrivate = componente.extra?.visibilidad === 'private'
  const tipo = componente.extra?.tipo ?? 'any'

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-1.5 min-w-0">
        {isPrivate && <Lock size={11} className="text-slate-400 shrink-0" />}
        <span className="text-sm text-slate-900 truncate">{componente.nombre}</span>
      </div>
      <div className="flex items-center gap-2 ml-2 shrink-0">
        <span className="text-sm text-slate-400">: {tipo}</span>
        <button
          data-nodrag
          onClick={() => moverAlSidePanel(componente.id, claseId)}
          className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}

function MetodoRow({ componente, claseId }: RowProps<ComponenteDisponible>) {
  const { moverAlSidePanel } = useGameStore()

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-1.5 min-w-0">
        <ChevronRight size={11} className="text-amber-400 shrink-0" />
        <span className="text-sm text-slate-900 truncate">{componente.nombre}()</span>
      </div>
      <button
        data-nodrag
        onClick={() => moverAlSidePanel(componente.id, claseId)}
        className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-2 shrink-0"
      >
        <X size={13} />
      </button>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function UMLClassNode({ data }: Props) {
  const { moverAlCanvas, moverEntreClases } = useGameStore()
  const color = PALETA[data.claseId % PALETA.length]

  const [dragOverAtributos, setDragOverAtributos] = useState(false)
  const [dragOverMetodos, setDragOverMetodos] = useState(false)

  // ── Handlers genéricos de drop zone ────────────────────────────────────────

  const handleDragOver = (
    e: React.DragEvent,
    setter: (v: boolean) => void
  ) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    setter(true)
  }

  const handleDragLeave = (
    e: React.DragEvent,
    setter: (v: boolean) => void
  ) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setter(false)
    }
  }

  const handleDrop = (
    e: React.DragEvent,
    setter: (v: boolean) => void,
    tipoEsperado: 'Atributo' | 'Metodo'
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setter(false)

    const raw = e.dataTransfer.getData(DRAG_MIME)
    if (!raw) return

    const payload: DragPayload = JSON.parse(raw)

    // Validar que el tipo de componente coincida con la zona de drop
    const componenteEnPanel = useGameStore
      .getState()
      .componentesDisponibles.find((c) => c.id === payload.componenteId)

    const componenteEnClase = payload.sourceClaseId
      ? (() => {
          const clase = useGameStore
            .getState()
            .clases.find((c) => c.id === payload.sourceClaseId)
          return (
            clase?.atributos.find((a) => a.id === payload.componenteId) ??
            clase?.metodos.find((m) => m.id === payload.componenteId) ??
            null
          )
        })()
      : null

    const componente = componenteEnPanel ?? componenteEnClase
    if (!componente || componente.kind !== tipoEsperado) return

    if (payload.sourceClaseId === null) {
      // Viene del side panel
      moverAlCanvas(payload.componenteId, data.claseId)
    } else if (payload.sourceClaseId !== data.claseId) {
      // Viene de otra clase
      moverEntreClases(payload.componenteId, payload.sourceClaseId, data.claseId)
    }
  }

  return (
    <div className="min-w-65 max-w-75 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      {/* Barra superior decorativa */}
      <div className={`h-1.5 w-full ${color.bar} rounded-t-xl`} />

      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
        <Box size={15} className="text-slate-500 shrink-0" />
        <span className="font-bold text-slate-900 text-sm tracking-tight">
          {data.nombre}
        </span>
      </div>

      {/* ── Zona de atributos ─────────────────────────────────────── */}
      <div
        data-nodrag
        onDragOver={(e) => handleDragOver(e, setDragOverAtributos)}
        onDragLeave={(e) => handleDragLeave(e, setDragOverAtributos)}
        onDrop={(e) => handleDrop(e, setDragOverAtributos, 'Atributo')}
        className={`min-h-9 transition-colors ${
          dragOverAtributos
            ? `border-2 border-dashed ${color.border} ${color.bg}`
            : 'border-b border-slate-100'
        }`}
      >
        {data.atributos.length === 0 && !dragOverAtributos && (
          <p className="px-4 py-2 text-xs text-slate-300 italic select-none">
            Arrastra atributos aquí
          </p>
        )}
        {data.atributos.map((attr) => (
          <AtributoRow key={attr.id} componente={attr} claseId={data.claseId} />
        ))}
      </div>

      {/* Separador de sección métodos */}
      <div className="px-4 py-1.5 bg-slate-50 border-b border-slate-100">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          métodos
        </span>
      </div>

      {/* ── Zona de métodos ───────────────────────────────────────── */}
      <div
        data-nodrag
        onDragOver={(e) => handleDragOver(e, setDragOverMetodos)}
        onDragLeave={(e) => handleDragLeave(e, setDragOverMetodos)}
        onDrop={(e) => handleDrop(e, setDragOverMetodos, 'Metodo')}
        className={`min-h-9 transition-colors ${
          dragOverMetodos
            ? `border-2 border-dashed ${color.border} ${color.bg}`
            : ''
        }`}
      >
        {data.metodos.length === 0 && !dragOverMetodos && (
          <p className="px-4 py-2 text-xs text-slate-300 italic select-none">
            Arrastra métodos aquí
          </p>
        )}
        {data.metodos.map((met) => (
          <MetodoRow key={met.id} componente={met} claseId={data.claseId} />
        ))}
      </div>

      {/* Handles de conexión */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-slate-300 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-slate-300 border-2 border-white"
      />
    </div>
  )
}
