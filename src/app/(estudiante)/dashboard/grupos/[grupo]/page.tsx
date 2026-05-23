import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSesion } from '@/features/auth/actions/get-sesion'
import { getGrupoById } from '@/features/profesor/grupos/actions/get-grupo-by-id'
import { getModulosGrupo } from '@/features/estudiante/grupos/actions/get-modulos-grupo'
import { getTeoriasGrupo } from '@/features/estudiante/grupos/actions/get-teorias-grupo'
import { getActividadesGrupo } from '@/features/estudiante/grupos/actions/get-actividades-grupo'
import { getRefuerzosGrupo } from '@/features/profesor/refuerzos/actions/get-refuerzos-grupo'
import { getEnlacesGrupo } from '@/features/estudiante/grupos/actions/get-enlaces-grupo'
import { getJuegosGrupo } from '@/features/estudiante/juegos/actions/get-juegos-grupo'
import { ContenidoModularGrupo } from '@/features/estudiante/grupos/components/contenido-modular-grupo'

type Props = {
  params: Promise<{ grupo: string }>
}

export default async function GrupoEstudiantePage({ params }: Props) {
  const { grupo: grupoParam } = await params
  const idgrupo = Number(grupoParam)

  const grupo = await getGrupoById(idgrupo)
  if (!grupo) notFound()

  const { sesion } = await getSesion()

  const [modulos, teorias, actividades, refuerzos, enlaces, juegos] =
    await Promise.all([
      getModulosGrupo(idgrupo),
      getTeoriasGrupo(idgrupo),
      getActividadesGrupo(idgrupo),
      getRefuerzosGrupo(idgrupo),
      getEnlacesGrupo(idgrupo),
      sesion
        ? getJuegosGrupo(idgrupo, sesion.cedula)
        : Promise.resolve([]),
    ])

  return (
    <>
      <Link href="/dashboard/grupos">
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">Mis Grupos</h1>
        </div>
      </Link>

      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="text-xs font-medium text-[#3d1f8c] uppercase tracking-wide mb-1">
            {grupo.nombrecurso} · Código: {grupo.idgrupo}
          </div>
          <h1 className="text-4xl font-bold">{grupo.nombregrupo}</h1>
          <p className="text-muted-foreground mt-1 max-w-3xl">{grupo.descripcion}</p>
        </div>

        {/* Contenido modular */}
        <ContenidoModularGrupo
          modulos={modulos}
          teorias={teorias}
          actividades={actividades}
          refuerzos={refuerzos}
          enlaces={enlaces}
          juegos={juegos}
          idgrupo={idgrupo}
        />
      </div>
    </>
  )
}
