import { getModules } from '@/features/admin/courses/modules/actions/get-modules'
import { getTheories } from '@/features/admin/courses/modules/theories/actions/get-theories'
import { ListTheories } from '@/features/admin/courses/modules/theories/components/list-theories'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ curso: string; modulo: string }>
}

export default async function ModuloPage({ params }: Props) {
  const { curso: cursoId, modulo: moduloId } = await params
  const idCurso = Number(cursoId)
  const idModulo = Number(moduloId)

  const [modulos, teorias] = await Promise.all([
    getModules(idCurso),
    getTheories(idModulo),
  ])

  const modulo = modulos.find((m) => m.id === idModulo)
  if (!modulo) notFound()

  return (
    <>
      <Link
        href={`/inicio/cursos/${idCurso}`}
        className="flex items-center gap-2 ml-4 mt-2 text-muted-foreground hover:underline w-fit"
      >
        <ArrowLeft size={18} />
        <span>Volver al Curso</span>
      </Link>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold uppercase">{`Modulo: ${modulo.nombre}`}</h1>
        </div>

        <ListTheories
          idModulo={idModulo}
          idCurso={idCurso}
          initialTeorias={teorias}
        />
      </div>
    </>
  )
}
