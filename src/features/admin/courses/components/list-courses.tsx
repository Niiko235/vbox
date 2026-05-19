'use client'

import { useState } from 'react'
import { Plus, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Curso } from '../actions/get-all-courses'
import { CardCourse } from './card-course'

type Props = {
  initialCursos: Curso[]
}

export function ListCourses({ initialCursos }: Props) {
  const [cursos, setCursos] = useState<Curso[]>(initialCursos)

  const handleCrear = (curso: Curso) => {
    setCursos((prev) => [...prev, curso])
  }

  const handleEliminar = (pkid: number) => {
    setCursos((prev) => prev.filter((c) => c.pkid !== pkid))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Gestionar Cursos</h1>
        <p className="text-muted-foreground mt-1">
          Aquí puede administrar todos los cursos disponibles en la plataforma
        </p>
      </div>

      {/* Dialog de crear — por implementar */}
      <Button
        className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white"
        onClick={() =>
          handleCrear({
            pkid: Date.now(),
            nombre: 'Nuevo Curso',
            fechacreacion: new Date().toISOString(),
          })
        }
      >
        <Plus size={16} />
        Crear Curso
      </Button>

      {cursos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <FileText size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">No hay cursos registrados</p>
          <p className="text-sm">Haz clic en &quot;Crear Curso&quot; para agregar uno nuevo</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cursos.map((curso) => (
            <CardCourse key={curso.pkid} curso={curso} onEliminar={handleEliminar} />
          ))}
        </div>
      )}
    </div>
  )
}
