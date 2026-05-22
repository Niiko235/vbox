'use client'

import Link from 'next/link'
import { Gamepad2, Trophy, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { JuegoGrupo } from '../actions/get-juegos-grupo'

type Props = {
  juegos: JuegoGrupo[]
  idgrupo: number
}

export function TableJuegosGrupo({ juegos, idgrupo }: Props) {
  if (juegos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
        <Gamepad2 size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
        <p className="font-medium">Este grupo no tiene juegos asignados aún</p>
        <p className="text-sm">Comunícate con tu profesor para más información.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[#3d1f8c]">
      <Table>
        <TableHeader className="bg-[#3d1f8c]">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="text-white font-semibold px-6 py-4">
              Juego
            </TableHead>
            <TableHead className="text-white font-semibold px-6 py-4">
              <div className="flex items-center gap-2">
                <Trophy size={14} />
                Mejor puntaje
              </div>
            </TableHead>
            <TableHead className="text-white font-semibold px-6 py-4">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                Última vez jugado
              </div>
            </TableHead>
            <TableHead className="text-white font-semibold px-6 py-4">
              Acción
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {juegos.map((juego) => (
            <TableRow key={juego.idjuego}>
              <TableCell className="px-6 py-4 font-medium">
                {juego.nombrejuego}
              </TableCell>
              <TableCell className="px-6 py-4 text-center">
                {juego.mejorpuntaje !== null ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-[#3d1f8c]">
                    {juego.mejorpuntaje} pts
                  </span>
                ) : (
                  <span className="text-muted-foreground text-sm">Sin jugar</span>
                )}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                {juego.ultimavez ? (
                  new Date(juego.ultimavez).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                ) : (
                  '—'
                )}
              </TableCell>
              <TableCell className="px-6 py-4">
                <Button
                  asChild
                  size="sm"
                  className="bg-[#3d1f8c] hover:bg-[#3d1f8c]/90 gap-1"
                >
                  <Link href={`./${idgrupo}/${juego.idjuego}`}>
                    Jugar
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
