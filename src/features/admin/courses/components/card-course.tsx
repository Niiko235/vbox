'use client'

import Link from 'next/link'
import { Pencil, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Curso } from '../actions/get-all-courses'
import { AlertDialogDeleteCourse } from './alert-dialog-delete-course'

type Props = {
  curso: Curso
  onEliminar: (pkid: number) => void
}

export function CardCourse({ curso, onEliminar }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#3d1f8c] text-lg font-bold">
          <BookOpen size={22} className="text-[#3d1f8c]" />
          {curso.nombre}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <p>
          <span className="font-semibold">ID:</span> {curso.id}
        </p>
        <p>
          <span className="font-semibold">Fecha de creación:</span>{' '}
          {new Date(curso.fechacreacion).toLocaleDateString('es-CO')}
        </p>
      </CardContent>

      <CardFooter className="flex items-center gap-2 bg-transparent border-t-0">
        <Button
          asChild
          className="flex-1 bg-[#3d1f8c] hover:bg-[#2e1769] text-white font-semibold"
        >
          <Link href={`/inicio/cursos/${curso.id}`}>Ver detalles</Link>
        </Button>
        {/* Dialog de editar — por implementar */}
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
        >
          <Pencil size={18} />
        </Button>
        <AlertDialogDeleteCourse
          id={curso.id}
          nombreCurso={curso.nombre}
          handleEliminar={onEliminar}
        />
      </CardFooter>
    </Card>
  )
}
