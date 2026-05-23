'use client'

import { useState } from 'react'
import { Type, Zap, ChevronDown } from 'lucide-react'

import {
  useGameStore,
  DRAG_MIME,
  type DragPayload,
} from '@/features/games/clases/store'
import type { ComponenteDisponible } from '@/features/games/clases/actions/get-game-data'

// ─── Ítem arrastrable ─────────────────────────────────────────────────────────

function ComponenteItem({ componente }: { componente: ComponenteDisponible }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const payload: DragPayload = {
      componenteId: componente.id,
      sourceClaseId: null,
    }
    e.dataTransfer.setData(DRAG_MIME, JSON.stringify(payload))
    e.dataTransfer.effectAllowed = 'move'
    setIsDragging(true)
  }

  const Icon = componente.kind === 'Atributo' ? Type : Zap
  const subtitulo = componente.extra ? `: ${componente.extra.tipo}` : null

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      className={`
        flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white
        px-3 py-2 cursor-grab transition-all select-none
        hover:border-amber-300 hover:bg-amber-50/30
        active:cursor-grabbing
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <Icon size={14} className="text-slate-400 shrink-0" />
      <span className="text-sm text-slate-900 flex-1 truncate">
        {componente.nombre}
      </span>
      {subtitulo && (
        <span className="text-xs text-slate-400 shrink-0">{subtitulo}</span>
      )}
    </div>
  )
}

// ─── Sección colapsable simple ────────────────────────────────────────────────

function Seccion({
  label,
  icon: Icon,
  count,
  children,
}: {
  label: string
  icon: React.ElementType
  count: number
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
      >
        <Icon size={14} className="text-slate-400" />
        {label}
        <span className="ml-1 text-xs text-slate-400 font-normal">
          ({count})
        </span>
        <ChevronDown
          size={14}
          className={`ml-auto text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="flex flex-col gap-2 pb-3">{children}</div>}
    </div>
  )
}

// ─── Side Panel principal ─────────────────────────────────────────────────────

export function SidePanel() {
  const { componentesDisponibles } = useGameStore()

  const atributos = componentesDisponibles.filter((c) => c.kind === 'Atributo')
  const metodos = componentesDisponibles.filter((c) => c.kind === 'Metodo')

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 px-4 py-4 shrink-0">
        <h2 className="font-semibold text-slate-900 text-base">Componentes</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Arrastra los elementos al diagrama
        </p>
      </div>

      {/* Lista con scroll */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <Seccion label="Atributos" icon={Type} count={atributos.length}>
          {atributos.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2 text-center">
              Todos los atributos fueron ubicados
            </p>
          ) : (
            atributos.map((a) => <ComponenteItem key={a.id} componente={a} />)
          )}
        </Seccion>

        <Seccion label="Métodos" icon={Zap} count={metodos.length}>
          {metodos.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2 text-center">
              Todos los métodos fueron ubicados
            </p>
          ) : (
            metodos.map((m) => <ComponenteItem key={m.id} componente={m} />)
          )}
        </Seccion>
      </div>
    </aside>
  )
}
