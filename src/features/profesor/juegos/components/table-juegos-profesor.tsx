'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Gamepad2, ExternalLink, Crown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { Modulo } from '@/features/profesor/refuerzos/actions/get-modulos'
import type { JuegoGrupoProfesor } from '../actions/get-juegos-grupo-profesor'
import { DialogCrearJuego }           from './dialog-crear-juego'
import { DialogEditarJuego }          from './dialog-editar-juego'
import { DialogAniadirJuego }          from './dialog-aniadir-juego'
import { AlertDialogDeleteJuego }     from './alert-dialog-delete-juego'
import { AlertDialogQuitarJuego }     from './alert-dialog-quitar-juego'

type Props = {
  juegos:   JuegoGrupoProfesor[]
  idgrupo:  number
  idcurso:  number
  modulos:  Modulo[]
}

export function TableJuegosProfesor({
  juegos: juegosIniciales,
  idgrupo,
  idcurso,
  modulos,
}: Props) {
  const [juegos, setJuegos] = useState<JuegoGrupoProfesor[]>(juegosIniciales)

  const handleCreado  = (j: JuegoGrupoProfesor) => setJuegos((prev) => [j, ...prev])
  const handleAñadido = (j: JuegoGrupoProfesor) => setJuegos((prev) => [...prev, j])

  const handleEditado = (actualizado: JuegoGrupoProfesor) =>
    setJuegos((prev) => prev.map((j) => (j.idjuego === actualizado.idjuego ? actualizado : j)))

  const handleEliminado = (idjuego: number) =>
    setJuegos((prev) => prev.filter((j) => j.idjuego !== idjuego))

  const botonesCrear = (
    <div className="flex justify-end gap-2">
      <DialogAniadirJuego
        idgrupo={idgrupo}
        modulos={modulos}
        onJuegoAñadido={handleAñadido}
      />
      <DialogCrearJuego
        idgrupo={idgrupo}
        modulos={modulos}
        onJuegoCreado={handleCreado}
      />
    </div>
  )

  if (juegos.length === 0) {
    return (
      <div className="space-y-4">
        {botonesCrear}
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3 rounded-md border border-dashed">
          <Gamepad2 size={48} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">Aún no hay juegos en este grupo</p>
          <p className="text-sm">Crea uno nuevo o añade un juego existente del módulo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {botonesCrear}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#3d1f8c] [&_tr]:border-b-0">
            <TableRow className="hover:bg-[#3d1f8c]">
              <TableHead className="text-white w-16">ID</TableHead>
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Módulo</TableHead>
              <TableHead className="text-white text-right">Puntuación</TableHead>
              <TableHead className="text-white w-36 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {juegos.map((juego) => (
              <TableRow key={juego.idjuego}>
                <TableCell className="tabular-nums">{juego.idjuego}</TableCell>

                {/* Nombre + badge de creador */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{juego.nombrejuego}</span>
                    {juego.escreador && (
                      <Badge
                        variant="secondary"
                        className="gap-1 text-[10px] px-1.5 py-0 bg-violet-100 text-violet-700 border-violet-200"
                      >
                        <Crown size={10} />
                        Creador
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {juego.descripcion}
                  </p>
                </TableCell>

                <TableCell>{juego.nombremodulo}</TableCell>

                <TableCell className="text-right tabular-nums">
                  {juego.puntuacion}
                </TableCell>

                {/* Acciones */}
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-1">
                    {/* Ir al editor */}
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="text-[#3d1f8c] hover:text-[#2e1769] hover:bg-violet-50"
                    >
                      <Link
                        href={`/home/cursos/${idcurso}/grupos/${idgrupo}/juegos/${juego.idjuego}`}
                      >
                        <ExternalLink size={18} />
                      </Link>
                    </Button>

                    {juego.escreador ? (
                      <>
                        {/* Editar metadata */}
                        <DialogEditarJuego
                          juego={juego}
                          onJuegoEditado={handleEditado}
                        />
                        {/* Eliminar */}
                        {/* <AlertDialogDeleteJuego
                          idjuego={juego.idjuego}
                          onEliminar={handleEliminado}
                        /> */}
                      </>
                    ) : (
                      /* Quitar del grupo */
                      <AlertDialogQuitarJuego
                        idjuego={juego.idjuego}
                        idgrupo={idgrupo}
                        onQuitar={handleEliminado}
                      />
                    )}
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
