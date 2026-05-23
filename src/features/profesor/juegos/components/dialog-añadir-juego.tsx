'use client'

import { useState } from 'react'
import { Library, Plus, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

import type { Modulo } from '@/features/profesor/refuerzos/actions/get-modulos'
import type { JuegoModulo } from '../actions/get-juegos-modulo'
import type { JuegoGrupoProfesor } from '../actions/get-juegos-grupo-profesor'
import { getJuegosModulo } from '../actions/get-juegos-modulo'
import { añadirJuegoGrupo } from '../actions/añadir-juego-grupo'

type Props = {
  idgrupo: number
  modulos: Modulo[]
  onJuegoAñadido: (juego: JuegoGrupoProfesor) => void
}

export function DialogAñadirJuego({ idgrupo, modulos, onJuegoAñadido }: Props) {
  const [isOpen, setIsOpen]             = useState(false)
  const [moduloId, setModuloId]         = useState<string>('')
  const [juegos, setJuegos]             = useState<JuegoModulo[]>([])
  const [loadingModulo, setLoadingModulo] = useState(false)
  // Track which juego ids are in-flight
  const [adding, setAdding]             = useState<Set<number>>(new Set())

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) {
      setModuloId('')
      setJuegos([])
    }
  }

  async function handleModuloChange(value: string) {
    setModuloId(value)
    setJuegos([])
    setLoadingModulo(true)
    try {
      const data = await getJuegosModulo(Number(value), idgrupo)
      setJuegos(data)
    } catch {
      toast.error('No se pudieron cargar los juegos del módulo')
    } finally {
      setLoadingModulo(false)
    }
  }

  async function handleAñadir(juego: JuegoModulo) {
    setAdding((prev) => new Set(prev).add(juego.idjuego))
    try {
      const result = await añadirJuegoGrupo(juego.idjuego, idgrupo)

      if (!result.ok) {
        toast.error('No se pudo añadir el juego')
        return
      }

      // Update local list to show as assigned
      setJuegos((prev) =>
        prev.map((j) => (j.idjuego === juego.idjuego ? { ...j, yaasignado: true } : j))
      )

      // Notify parent with the minimal data we have; nombremodulo comes from the Select
      const nombremodulo = modulos.find((m) => String(m.id) === moduloId)?.nombre ?? ''
      onJuegoAñadido({
        idjuego:      juego.idjuego,
        nombrejuego:  juego.nombrejuego,
        descripcion:  juego.descripcion,
        puntuacion:   juego.puntuacion,
        nombremodulo,
        escreador:    false,
      })

      toast.success(`"${juego.nombrejuego}" añadido al grupo`)
    } catch {
      toast.error('Error inesperado al añadir el juego')
    } finally {
      setAdding((prev) => {
        const next = new Set(prev)
        next.delete(juego.idjuego)
        return next
      })
    }
  }

  const disponibles = juegos.filter((j) => !j.yaasignado)

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Library size={16} />
          Añadir juego
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir juego al grupo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Selector de módulo */}
          <div className="space-y-1.5">
            <Label>Módulo</Label>
            <Select value={moduloId} onValueChange={handleModuloChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un módulo para ver los juegos" />
              </SelectTrigger>
              <SelectContent>
                {modulos.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lista de juegos */}
          {loadingModulo && (
            <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm">Cargando juegos...</span>
            </div>
          )}

          {!loadingModulo && moduloId && juegos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2 rounded-md border border-dashed">
              <Check size={32} strokeWidth={1.2} className="text-muted-foreground/40" />
              <p className="text-sm">Todos los juegos de este módulo ya están en el grupo.</p>
            </div>
          )}

          {!loadingModulo && disponibles.length > 0 && (
            <ul className="divide-y rounded-md border overflow-hidden px-1">
              {disponibles.map((juego) => (
                <li
                  key={juego.idjuego}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{juego.nombrejuego}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {juego.descripcion}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {juego.puntuacion} pts
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={adding.has(juego.idjuego)}
                      onClick={() => handleAñadir(juego)}
                      className="gap-1"
                    >
                      {adding.has(juego.idjuego) ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Plus size={14} />
                      )}
                      Añadir
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
