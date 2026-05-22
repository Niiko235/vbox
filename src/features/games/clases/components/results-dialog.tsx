'use client'

import { useRouter } from 'next/navigation'
import { CheckCircle2, XCircle, ArrowLeft, Trophy } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { ValidateGameResult } from '@/features/games/clases/actions/validate-game'

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  open: boolean
  grupoId: number
  resultado: ValidateGameResult | null
}

// ─── Helpers visuales ─────────────────────────────────────────────────────────

function ScoreDisplay({
  obtenido,
  total,
}: {
  obtenido: number
  total: number
}) {
  const porcentaje = total > 0 ? Math.round((obtenido / total) * 100) : 0
  const esPerfecto = obtenido === total

  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <div
        className={`
          flex items-center justify-center w-20 h-20 rounded-full
          ${esPerfecto ? 'bg-amber-100' : 'bg-slate-100'}
        `}
      >
        <Trophy
          size={36}
          className={esPerfecto ? 'text-amber-400' : 'text-slate-400'}
        />
      </div>
      <p className="text-4xl font-bold text-slate-900 mt-2">
        {obtenido}{' '}
        <span className="text-2xl font-normal text-slate-400">
          / {total} puntos
        </span>
      </p>
      <p
        className={`text-sm font-medium ${
          esPerfecto ? 'text-amber-500' : 'text-slate-500'
        }`}
      >
        {esPerfecto
          ? '¡Diagrama perfecto!'
          : `${porcentaje}% de componentes correctos`}
      </p>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function ResultsDialog({ open, grupoId, resultado }: Props) {
  const router = useRouter()

  if (!resultado) return null

  const { puntajeObtenido, puntajeTotal, errores } = resultado

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-md"
        // Evitar que el estudiante cierre el diálogo sin acción explícita
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-slate-900">
            Resultado del juego
          </DialogTitle>
        </DialogHeader>

        {/* Puntaje */}
        <ScoreDisplay obtenido={puntajeObtenido} total={puntajeTotal} />

        {/* Errores */}
        {errores.length > 0 ? (
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Componentes incorrectos
            </p>
            {errores.map((e) => (
              <div
                key={e.componenteId}
                className="flex gap-3 rounded-lg border border-red-100 bg-red-50/60 px-3 py-2.5"
              >
                <XCircle
                  size={16}
                  className="text-red-400 mt-0.5 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {e.nombreComponente}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {e.retroalimentacion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50/60 px-3 py-2.5">
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            <p className="text-sm text-slate-700">
              Todos los componentes están correctamente ubicados.
            </p>
          </div>
        )}

        <DialogFooter className="mt-2">
          <Button
            className="w-full gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full"
            onClick={() => router.push(`/dashboard/grupos/${grupoId}`)}
          >
            <ArrowLeft size={16} />
            Volver al grupo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
