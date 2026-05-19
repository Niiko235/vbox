'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
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
import { DialogEditCourseForm } from './dialog-edit-course-form'

type Props = {
  curso: Curso
  onEliminar: (pkid: number) => void
  onEditar: (cursoActualizado: Curso) => void
}

export function CardCourse({ curso, onEliminar, onEditar }: Props) {
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
        {/* <p className="text-muted-foreground">{curso.descripcion}</p> */}
      </CardContent>

      <CardFooter className="flex items-center gap-2 bg-transparent border-t-0">
        <Button
          asChild
          className="flex-1 bg-[#3d1f8c] hover:bg-[#2e1769] text-white font-semibold"
        >
          <Link href={`/inicio/cursos/${curso.id}`}>Ver detalles</Link>
        </Button>
        <DialogEditCourseForm curso={curso} handleEditar={onEditar} />
        <AlertDialogDeleteCourse
          id={curso.id}
          nombreCurso={curso.nombre}
          handleEliminar={onEliminar}
        />
      </CardFooter>
    </Card>
  )
}
