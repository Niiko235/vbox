'use client'

import { useState } from 'react'
import { Link2, ExternalLink } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

import type { EnlaceRefuerzo } from '../actions/get-enlaces-refuerzo'
import { DialogCrearEnlace }        from './dialog-crear-enlace'
import { DialogEditarEnlace }       from './dialog-editar-enlace'
import { AlertDialogDeleteEnlace }  from './alert-dialog-delete-enlace'

// ─── Badge por tipo ───────────────────────────────────────────────────────────

const TIPO_BADGE: Record<EnlaceRefuerzo['tipo'], string> = {
  'Sitio web': 'bg-blue-100 text-blue-700 border-blue-200',
  'Documento': 'bg-amber-100 text-amber-700 border-amber-200',
  'Video':     'bg-rose-100 text-rose-700 border-rose-200',
  'Otro':      'bg-slate-100 text-slate-700 border-slate-200',
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  enlaces:    EnlaceRefuerzo[]
  idrefuerzo: number
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function TableEnlaces({ enlaces: enlacesIniciales, idrefuerzo }: Props) {
  const [enlaces, setEnlaces] = useState<EnlaceRefuerzo[]>(enlacesIniciales)

  const handleCreado  = (e: EnlaceRefuerzo) => setEnlaces((prev) => [...prev, e])
  const handleEditado = (e: EnlaceRefuerzo) =>
    setEnlaces((prev) => prev.map((x) => (x.idenlace === e.idenlace ? e : x)))
  const handleEliminado = (id: number) =>
    setEnlaces((prev) => prev.filter((x) => x.idenlace !== id))

  const botonCrear = (
    <div className="flex justify-end">
      <DialogCrearEnlace idrefuerzo={idrefuerzo} onEnlaceCreado={handleCreado} />
    </div>
  )

  if (enlaces.length === 0) {
    return (
      <div className="space-y-4">
        {botonCrear}
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3 rounded-md border border-dashed">
          <Link2 size={40} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">Sin enlaces todavía</p>
          <p className="text-sm">Añade un enlace para complementar este refuerzo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {botonCrear}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#3d1f8c] [&_tr]:border-b-0">
            <TableRow className="hover:bg-[#3d1f8c]">
              <TableHead className="text-white w-16">ID</TableHead>
              <TableHead className="text-white w-28">Tipo</TableHead>
              <TableHead className="text-white">URL / Contenido</TableHead>
              <TableHead className="text-white text-right w-28">Puntuación</TableHead>
              <TableHead className="text-white text-right w-28">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enlaces.map((enlace) => (
              <TableRow key={enlace.idenlace}>
                <TableCell className="tabular-nums">{enlace.idenlace}</TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={TIPO_BADGE[enlace.tipo]}
                  >
                    {enlace.tipo}
                  </Badge>
                </TableCell>

                <TableCell className="max-w-xs">
                  <a
                    href={enlace.contenido}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#3d1f8c] hover:underline truncate"
                  >
                    <ExternalLink size={13} className="shrink-0" />
                    <span className="truncate text-sm">{enlace.contenido}</span>
                  </a>
                </TableCell>

                <TableCell className="text-right tabular-nums">
                  {enlace.puntuacion} pts
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <DialogEditarEnlace
                      enlace={enlace}
                      onEnlaceEditado={handleEditado}
                    />
                    <AlertDialogDeleteEnlace
                      idenlace={enlace.idenlace}
                      onEliminar={handleEliminado}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
