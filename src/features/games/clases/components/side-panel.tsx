'use client'

import { useState } from 'react'
import { Type, Zap } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useGameStore, DRAG_MIME, type DragPayload } from '@/features/games/clases/store'
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
  const subtitulo =
    componente.kind === 'Atributo' && componente.extra
      ? `: ${componente.extra.tipo}`
      : null

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

// ─── Drop zone para devolver al side panel ────────────────────────────────────

function SidePanelDropZone() {
  const { moverAlSidePanel, clases } = useGameStore()
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const raw = e.dataTransfer.getData(DRAG_MIME)
    if (!raw) return

    const payload: DragPayload = JSON.parse(raw)
    if (payload.sourceClaseId === null) return // ya está en el panel

    moverAlSidePanel(payload.componenteId, payload.sourceClaseId)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`
        mx-4 mb-3 rounded-lg border-2 border-dashed transition-colors py-3
        flex items-center justify-center
        ${
          isDragOver
            ? 'border-amber-300 bg-amber-50/40'
            : 'border-slate-200 bg-transparent'
        }
      `}
    >
      <span className="text-xs text-slate-400 select-none">
        {isDragOver ? 'Soltar para devolver' : 'Arrastra aquí para devolver'}
      </span>
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
      <div className="flex-1 overflow-y-auto">

        {/* Zona para devolver componentes */}
        <div className="pt-3">
          <SidePanelDropZone />
        </div>

        {/* Acordeón de secciones */}
        <Accordion
          type="multiple"
          defaultValue={['atributos', 'metodos']}
          className="px-4 pb-4"
        >
          {/* Atributos */}
          <AccordionItem value="atributos" className="border-slate-100">
            <AccordionTrigger className="text-sm font-medium text-slate-700 hover:no-underline py-3">
              <div className="flex items-center gap-2">
                <Type size={14} className="text-slate-400" />
                Atributos
                <span className="ml-1 text-xs text-slate-400 font-normal">
                  ({atributos.length})
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              {atributos.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2 text-center">
                  Todos los atributos fueron ubicados
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {atributos.map((a) => (
                    <ComponenteItem key={a.id} componente={a} />
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Métodos */}
          <AccordionItem value="metodos" className="border-slate-100">
            <AccordionTrigger className="text-sm font-medium text-slate-700 hover:no-underline py-3">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-slate-400" />
                Métodos
                <span className="ml-1 text-xs text-slate-400 font-normal">
                  ({metodos.length})
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              {metodos.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2 text-center">
                  Todos los métodos fueron ubicados
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {metodos.map((m) => (
                    <ComponenteItem key={m.id} componente={m} />
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  )
}
