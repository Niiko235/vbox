'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import type { Curso } from '../actions/get-all-courses'
import { CardCourse } from './card-course'
import { DialogCreateCourseForm } from './dialog-create-course-form'

type Props = {
  initialCursos: Curso[]
}

export function ListCourses({ initialCursos }: Props) {
  const [cursos, setCursos] = useState<Curso[]>(initialCursos)

  const handleCrear = (curso: Curso) => {
    setCursos((prev) => [...prev, curso])
  }

  const handleEliminar = (pkid: number) => {
    setCursos((prev) => prev.filter((c) => c.id !== pkid))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Gestionar Cursos</h1>
        <p className="text-muted-foreground mt-1">
          Aquí puede administrar todos los cursos disponibles en la plataforma
        </p>
      </div>

      <DialogCreateCourseForm handleCrear={handleCrear} />

      {cursos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <FileText size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">No hay cursos registrados</p>
          <p className="text-sm">Haz clic en &quot;Crear Curso&quot; para agregar uno nuevo</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cursos.map((curso) => (
            <CardCourse key={curso.id} curso={curso} onEliminar={handleEliminar} />
          ))}
        </div>
      )}
    </div>
  )
}
