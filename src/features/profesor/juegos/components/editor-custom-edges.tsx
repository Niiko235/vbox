'use client'

import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from '@xyflow/react'
import { X } from 'lucide-react'

import { useEditorStore } from '../store'
import type { TipoRelacion } from '../actions/get-juego-editor'

// ─── Datos extra de la arista ─────────────────────────────────────────────────

export type EditorRelacionEdgeData = {
  tipo: TipoRelacion
}

// ─── Estilos por tipo ─────────────────────────────────────────────────────────

const ESTILOS: Record<TipoRelacion, { stroke: string; label: string }> = {
  Asociacion:  { stroke: '#64748b', label: 'Asociación'  },
  Agregacion:  { stroke: '#3b82f6', label: 'Agregación'  },
  Composicion: { stroke: '#8b5cf6', label: 'Composición' },
  Herencia:    { stroke: '#10b981', label: 'Herencia'    },
}

// ─── Marcadores SVG ───────────────────────────────────────────────────────────

export function EditorMarkerDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <marker id="ed-diamond-open"   markerWidth="12" markerHeight="12" refX="10" refY="5" orient="auto">
          <path d="M0,5 L5,0 L10,5 L5,10 Z" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
        </marker>
        <marker id="ed-diamond-filled" markerWidth="12" markerHeight="12" refX="10" refY="5" orient="auto">
          <path d="M0,5 L5,0 L10,5 L5,10 Z" fill="#8b5cf6" stroke="#8b5cf6" strokeWidth="1" />
        </marker>
        <marker id="ed-arrow-open"     markerWidth="12" markerHeight="12" refX="10" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="white" stroke="#10b981" strokeWidth="1.5" />
        </marker>
        <marker id="ed-arrow-simple"   markerWidth="10" markerHeight="10" refX="9"  refY="5" orient="auto">
          <path d="M0,0 L9,5 L0,10" fill="none" stroke="#64748b" strokeWidth="1.5" />
        </marker>
      </defs>
    </svg>
  )
}

const MARKER_END: Record<TipoRelacion, string> = {
  Asociacion:  'url(#ed-arrow-simple)',
  Agregacion:  'url(#ed-diamond-open)',
  Composicion: 'url(#ed-diamond-filled)',
  Herencia:    'url(#ed-arrow-open)',
}

// ─── Arista del editor ────────────────────────────────────────────────────────

export function EditorRelacionEdge({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  data,
}: EdgeProps) {
  const eliminarRelacion = useEditorStore((s) => s.eliminarRelacion)
  const tipo   = (data as EditorRelacionEdgeData).tipo
  const estilo = ESTILOS[tipo]
  const marker = MARKER_END[tipo]

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
    borderRadius: 12,
  })

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{ stroke: estilo.stroke, strokeWidth: 2 }}
        markerEnd={marker}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-2.5 py-1 shadow-sm nodrag nopan"
        >
          <span className="text-xs font-medium" style={{ color: estilo.stroke }}>
            {estilo.label}
          </span>
          <button
            onClick={() => eliminarRelacion(Number(id))}
            className="text-slate-300 hover:text-red-400 transition-colors"
          >
            <X size={11} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
