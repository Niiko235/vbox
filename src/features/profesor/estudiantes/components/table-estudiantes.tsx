import { UsersRound } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { EstudianteGrupo } from '../actions/get-estudiantes-grupo'

type Props = {
  estudiantes: EstudianteGrupo[]
}

export function TableEstudiantes({ estudiantes }: Props) {
  if (estudiantes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3 rounded-md border border-dashed">
        <UsersRound size={48} strokeWidth={1.2} className="text-muted-foreground/40" />
        <p className="font-medium">Aún no hay estudiantes inscritos</p>
        <p className="text-sm">Comparte el código del grupo para que se unan.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-[#3d1f8c] [&_tr]:border-b-0">
          <TableRow className="hover:bg-[#3d1f8c]">
            <TableHead className="text-white">Nombre</TableHead>
            <TableHead className="text-white">Correo</TableHead>
            <TableHead className="text-white">Cédula</TableHead>
            <TableHead className="text-white text-right">Puntuación total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estudiantes.map((est) => (
            <TableRow key={est.cedula}>
              <TableCell className="font-medium">{est.nombre}</TableCell>
              <TableCell>{est.correo}</TableCell>
              <TableCell>{est.cedula}</TableCell>
              <TableCell className="text-right tabular-nums">
                {est.puntuaciontotal}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
