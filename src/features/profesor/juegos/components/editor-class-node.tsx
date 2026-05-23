'use client'

import { Handle, Position } from '@xyflow/react'
import { Box, Lock, Users, ShieldCheck } from 'lucide-react'
import type { MiembroEditor } from '../actions/get-juego-editor'

// ─── Paleta por nodo (misma que el juego estudiantil) ─────────────────────────

const PALETA = [
  { bar: 'bg-amber-300',   txt: 'text-amber-500'   },
  { bar: 'bg-blue-300',    txt: 'text-blue-500'    },
  { bar: 'bg-cyan-300',    txt: 'text-cyan-500'    },
  { bar: 'bg-emerald-300', txt: 'text-emerald-500' },
  { bar: 'bg-violet-300',  txt: 'text-violet-500'  },
  { bar: 'bg-rose-300',    txt: 'text-rose-500'    },
  { bar: 'bg-fuchsia-300', txt: 'text-fuchsia-500' },
  { bar: 'bg-teal-300',    txt: 'text-teal-500'    },
]

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type EditorClassNodeData = {
  claseId: number
  nombre: string
  atributos: MiembroEditor[]
  metodos: MiembroEditor[]
}

// ─── Icono de visibilidad ─────────────────────────────────────────────────────

function VisibilityIcon({
  visibilidad,
  color,
}: {
  visibilidad: MiembroEditor['visibilidad']
  color: string
}) {
  if (visibilidad === 'private')   return <Lock       size={10} className={`${color} shrink-0`} />
  if (visibilidad === 'protected') return <ShieldCheck size={10} className={`${color} shrink-0`} />
  return <Users size={10} className={`${color} shrink-0`} />
}

// ─── Fila de miembro ──────────────────────────────────────────────────────────

function MiembroRow({ miembro, color }: { miembro: MiembroEditor; color: string }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-slate-100 last:border-b-0">
      <VisibilityIcon visibilidad={miembro.visibilidad} color={color} />
      <span className="text-xs text-slate-800 truncate">{miembro.nombre}</span>
      <span className="text-xs text-slate-400 ml-auto shrink-0">: {miembro.tipo}</span>
    </div>
  )
}

// ─── Nodo UML ─────────────────────────────────────────────────────────────────

export function EditorClassNode({ data }: { data: EditorClassNodeData }) {
  const color = PALETA[data.claseId % PALETA.length]

  return (
    <div className="min-w-56 max-w-72 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Barra decorativa */}
      <div className={`h-1.5 w-full ${color.bar} rounded-t-xl`} />

      {/* Header: nombre de la clase */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <Box size={13} className="text-slate-500 shrink-0" />
        <span className="font-bold text-slate-900 text-sm tracking-tight truncate">
          {data.nombre}
        </span>
      </div>

      {/* Atributos */}
      <div className="min-h-6">
        {data.atributos.length === 0 ? (
          <p className="px-4 py-1.5 text-xs text-slate-300 italic border-b border-slate-100">
            Sin atributos
          </p>
        ) : (
          data.atributos.map((a) => (
            <MiembroRow key={a.id} miembro={a} color={color.txt} />
          ))
        )}
      </div>

      {/* Separador métodos */}
      <div className="px-4 py-1 bg-slate-50 border-y border-slate-100">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
          métodos
        </span>
      </div>

      {/* Métodos */}
      <div className="min-h-6">
        {data.metodos.length === 0 ? (
          <p className="px-4 py-1.5 text-xs text-slate-300 italic">
            Sin métodos
          </p>
        ) : (
          data.metodos.map((m) => (
            <MiembroRow key={m.id} miembro={m} color={color.txt} />
          ))
        )}
      </div>

      {/* Handles invisibles para routing de aristas */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={false}
        className="!opacity-0 !w-2 !h-2 !pointer-events-none"
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={false}
        className="!opacity-0 !w-2 !h-2 !pointer-events-none"
      />
    </div>
  )
}
