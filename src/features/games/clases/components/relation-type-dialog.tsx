'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { TipoRelacion } from '@/features/games/clases/actions/get-game-data'

// ─── Opciones ─────────────────────────────────────────────────────────────────

const OPCIONES: { tipo: TipoRelacion; label: string; descripcion: string; color: string }[] = [
  {
    tipo: 'Asociacion',
    label: 'Asociación',
    descripcion: 'Relación general entre clases',
    color: 'text-slate-600 border-slate-300 hover:border-slate-500 hover:bg-slate-50',
  },
  {
    tipo: 'Agregacion',
    label: 'Agregación',
    descripcion: 'La parte puede existir sin el todo',
    color: 'text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50',
  },
  {
    tipo: 'Composicion',
    label: 'Composición',
    descripcion: 'La parte no puede existir sin el todo',
    color: 'text-violet-600 border-violet-200 hover:border-violet-400 hover:bg-violet-50',
  },
  {
    tipo: 'Herencia',
    label: 'Herencia',
    descripcion: 'Una clase extiende a otra',
    color: 'text-emerald-600 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50',
  },
]

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  open: boolean
  onSelect: (tipo: TipoRelacion) => void
  onCancel: () => void
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function RelationTypeDialog({ open, onSelect, onCancel }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Tipo de relación</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 pt-1">
          {OPCIONES.map((op) => (
            <button
              key={op.tipo}
              onClick={() => onSelect(op.tipo)}
              className={`
                flex flex-col items-start gap-0.5 rounded-lg border px-4 py-3
                transition-colors text-left ${op.color}
              `}
            >
              <span className="font-medium text-sm">{op.label}</span>
              <span className="text-xs opacity-70">{op.descripcion}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
