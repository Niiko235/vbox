import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getSesion } from '@/features/auth/actions/get-sesion'
import { getGruposEstudiante } from '@/features/estudiante/grupos/actions/get-grupos-estudiante'
import { ListGrupos } from '@/features/estudiante/grupos/components/list-grupos'

export default async function GruposPage() {
  const { sesion } = await getSesion()
  const grupos = sesion ? await getGruposEstudiante(sesion.cedula) : []

  return (
    <>
      <Link href="./">
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">Dashboard</h1>
        </div>
      </Link>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold">Mis Grupos</h1>
          <p className="text-muted-foreground mt-1">
            Estos son todos los grupos en los que estás inscrito actualmente.
          </p>
        </div>
        {sesion && <ListGrupos grupos={grupos} cedula={sesion.cedula} />}
      </div>
    </>
  )
}
