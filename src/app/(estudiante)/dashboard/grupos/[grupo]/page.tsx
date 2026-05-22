import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getSesion } from '@/features/auth/actions/get-sesion'
import { getJuegosGrupo } from '@/features/estudiante/juegos/actions/get-juegos-grupo'
import { TableJuegosGrupo } from '@/features/estudiante/juegos/components/table-juegos-grupo'

type Props = {
  params: Promise<{ grupo: string }>
}

export default async function GrupoPage({ params }: Props) {
  const { grupo: grupoId } = await params
  const { sesion } = await getSesion()

  const juegos = sesion
    ? await getJuegosGrupo(Number(grupoId), sesion.cedula)
    : []

  return (
    <>
      <Link href="/dashboard/grupos">
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">Mis Grupos</h1>
        </div>
      </Link>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold">Juegos del Grupo</h1>
          <p className="text-muted-foreground mt-1">
            Estos son los juegos disponibles en este grupo. Haz clic en{' '}
            <span className="font-medium text-foreground">Jugar</span> para entrar.
          </p>
        </div>
        <TableJuegosGrupo juegos={juegos} idgrupo={Number(grupoId)} />
      </div>
    </>
  )
}
