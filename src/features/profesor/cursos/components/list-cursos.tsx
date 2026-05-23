import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CursoProfesor } from '../actions/get-cursos-profesor'

type Props = {
  cursos: CursoProfesor[]
}

export function ListCursos({ cursos }: Props) {
  if (cursos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
        <BookOpen size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
        <p className="font-medium">No tienes cursos asignados</p>
        <p className="text-sm">Comunícate con el administrador para que te asigne un curso.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cursos.map((curso) => (
        <Card
          key={curso.idcurso}
          className="flex flex-col border border-[#3d1f8c]/30 hover:border-[#3d1f8c] transition-colors"
        >
          <CardHeader>
            <CardTitle className="text-lg">{curso.nombrecurso}</CardTitle>
            <CardDescription className="line-clamp-3">{curso.descripcion}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-xs text-muted-foreground">
              Creado el{' '}
              <span className="font-medium text-foreground">
                {new Date(curso.fechacreacion).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-[#3d1f8c] hover:bg-[#3d1f8c]/90">
              <Link href={`./cursos/${curso.idcurso}`}>Ver curso</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
