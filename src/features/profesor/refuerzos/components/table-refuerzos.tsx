'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Pencil, Brain, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { RefuerzoGrupo } from '../actions/get-refuerzos-grupo'
import { AlertDialogDeleteRefuerzo } from './alert-dialog-delete-refuerzo'

type Props = {
  refuerzos: RefuerzoGrupo[]
  idgrupo: number
}

export function TableRefuerzos({ refuerzos: refuerzosIniciales, idgrupo }: Props) {
  const [refuerzos, setRefuerzos] = useState<RefuerzoGrupo[]>(refuerzosIniciales)

  const handleEliminar = (id: number) =>
    setRefuerzos((prev) => prev.filter((r) => r.idrefuerzo !== id))

  const botonCrear = (
    <div className="flex justify-end">
      <Button asChild className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white">
        <Link href={`./refuerzos/crear`}>
          <Plus size={16} />
          Crear refuerzo
        </Link>
      </Button>
    </div>
  )

  if (refuerzos.length === 0) {
    return (
      <div className="space-y-4">
        {botonCrear}
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3 rounded-md border border-dashed">
          <Brain size={48} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">Aún no hay refuerzos creados</p>
          <p className="text-sm">Crea uno para reforzar el contenido del grupo.</p>
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
              <TableHead className="text-white">Módulo</TableHead>
              <TableHead className="text-white">Explicación</TableHead>
              <TableHead className="text-white text-right">Puntuación</TableHead>
              <TableHead className="text-white w-28 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refuerzos.map((r) => (
              <TableRow key={r.idrefuerzo}>
                <TableCell className="tabular-nums">{r.idrefuerzo}</TableCell>
                <TableCell>{r.nombremodulo}</TableCell>
                <TableCell className="max-w-md">
                  <span className="line-clamp-2 text-muted-foreground">
                    {r.explicacion}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {r.puntuacion}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="text-[#3d1f8c] hover:text-[#2e1769] hover:bg-violet-50"
                    >
                      <Link href={`./refuerzos/${r.idrefuerzo}`}>
                        <Pencil size={18} />
                      </Link>
                    </Button>
                    <AlertDialogDeleteRefuerzo
                      id={r.idrefuerzo}
                      handleEliminar={handleEliminar}
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
