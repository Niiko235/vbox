import { ArrowLeft, BookX } from 'lucide-react'
import Link from 'next/link'
import { getGrupoById } from '@/features/profesor/grupos/actions/get-grupo-by-id'
import { getEstudiantesGrupo } from '@/features/profesor/estudiantes/actions/get-estudiantes-grupo'
import { getRefuerzosGrupo } from '@/features/profesor/refuerzos/actions/get-refuerzos-grupo'
import { TableEstudiantes } from '@/features/profesor/estudiantes/components/table-estudiantes'
import { TableRefuerzos } from '@/features/profesor/refuerzos/components/table-refuerzos'

type Props = {
  params: Promise<{ idcurso: string; idgrupo: string }>
}

function Disclaimer({ titulo, mensaje, backHref }: { titulo: string; mensaje: string; backHref: string }) {
  return (
    <>
      <Link href={backHref}>
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">Volver</h1>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
        <BookX size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
        <p className="font-medium">{titulo}</p>
        <p className="text-sm">{mensaje}</p>
      </div>
    </>
  )
}

export default async function GrupoProfesorPage({ params }: Props) {
  const { idcurso: idcursoParam, idgrupo: idgrupoParam } = await params
  const idcurso = Number(idcursoParam)
  const idgrupo = Number(idgrupoParam)

  const grupo = await getGrupoById(idgrupo)
  if (!grupo) {
    return (
      <Disclaimer
        titulo="Grupo no encontrado"
        mensaje="El grupo al que intentas acceder no existe o fue eliminado."
        backHref={`/home/cursos/${idcurso}`}
      />
    )
  }

  const [estudiantes, refuerzos] = await Promise.all([
    getEstudiantesGrupo(idgrupo),
    getRefuerzosGrupo(idgrupo),
  ])

  return (
    <>
      <Link href={`/home/cursos/${idcurso}`}>
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">{grupo.nombrecurso}</h1>
        </div>
      </Link>
      <div className="p-8 space-y-10">
        <div>
          <div className="text-xs font-medium text-[#3d1f8c] uppercase tracking-wide mb-1">
            Código del grupo: {grupo.idgrupo}
          </div>
          <h1 className="text-4xl font-bold">{grupo.nombregrupo}</h1>
          <p className="text-muted-foreground mt-1 max-w-3xl">{grupo.descripcion}</p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-1">Estudiantes</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Estudiantes inscritos en este grupo.
          </p>
          <TableEstudiantes estudiantes={estudiantes} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-1">Refuerzos</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Refuerzos asignados a este grupo.
          </p>
          <TableRefuerzos refuerzos={refuerzos} idgrupo={idgrupo} />
        </section>
      </div>
    </>
  )
}
