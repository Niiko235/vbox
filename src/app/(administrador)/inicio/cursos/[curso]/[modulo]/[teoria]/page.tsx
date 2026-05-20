import { getTheories } from '@/features/admin/courses/modules/theories/actions/get-theories'
import { TheoryEditForm } from '@/features/admin/courses/modules/theories/components/theory-edit-form'
import { getActivities } from '@/features/admin/courses/modules/theories/activities/actions/get-activities'
import { ListActivities } from '@/features/admin/courses/modules/theories/activities/components/list-activities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ curso: string; modulo: string; teoria: string }>
}

export default async function TeoriaPage({ params }: Props) {
  const { curso: cursoId, modulo: moduloId, teoria: teoriaId } = await params
  const idCurso = Number(cursoId)
  const idModulo = Number(moduloId)
  const idTeoria = Number(teoriaId)

  const [teorias, actividades] = await Promise.all([
    getTheories(idModulo),
    getActivities(idTeoria),
  ])

  const teoria = teorias.find((t) => t.id === idTeoria)
  if (!teoria) notFound()

  return (
    <>
      <Link
        href={`./`}
        className="flex items-center gap-2 ml-4 mt-2 text-muted-foreground hover:underline w-fit"
      >
        <ArrowLeft size={18} />
        <span>Volver al Módulo</span>
      </Link>
      <div className="p-8 space-y-6">
        <h1 className="text-4xl font-bold">{teoria.nombre}</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Contenido de la Teoría</CardTitle>
          </CardHeader>
          <CardContent>
            <TheoryEditForm teoria={teoria} />
          </CardContent>
        </Card>

        <ListActivities idTeoria={idTeoria} initialActividades={actividades} />
      </div>
    </>
  )
}
