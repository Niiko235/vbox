import { getAllCourses } from '@/features/admin/courses/actions/get-all-courses'
import { getModules } from '@/features/admin/courses/modules/actions/get-modules'
import { ListModules } from '@/features/admin/courses/modules/components/list-modules'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ curso: string }>
}

export default async function CursoPage({ params }: Props) {
  const { curso: cursoId } = await params
  const id = Number(cursoId)

  const [cursos, modulos] = await Promise.all([
    getAllCourses(),
    getModules(id),
  ])

  const curso = cursos.find((c) => c.id === id)
  if (!curso) notFound()

  return (
    <>
      <Link
        href="/inicio/cursos"
        className="flex items-center gap-2 ml-4 mt-2 text-muted-foreground hover:underline w-fit"
      >
        <ArrowLeft size={18} />
        <span>Volver a Cursos</span>
      </Link>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            {curso.nombre} — ID: {curso.id}
          </h1>
          <div className="mt-4 space-y-1 text-sm">
            <p>
              <span className="font-semibold">Descripción:</span> {curso.descripcion}
            </p>
            <p>
              <span className="font-semibold">Fecha de creación:</span>{' '}
              {new Date(curso.fechacreacion).toLocaleDateString('es-CO')}
            </p>
          </div>
        </div>

        <ListModules idCurso={id} initialModulos={modulos} />
      </div>
    </>
  )
}
