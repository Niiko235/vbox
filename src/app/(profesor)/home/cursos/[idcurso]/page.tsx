import { ArrowLeft, BookX } from 'lucide-react'
import Link from 'next/link'
import { getSesion } from '@/features/auth/actions/get-sesion'
import { getCursoById } from '@/features/profesor/cursos/actions/get-curso-by-id'
import { getGruposProfesorCurso } from '@/features/profesor/grupos/actions/get-grupos-profesor-curso'
import { ListGruposProfesor } from '@/features/profesor/grupos/components/list-grupos-profesor'

type Props = {
  params: Promise<{ idcurso: string }>
}

function Disclaimer({ titulo, mensaje }: { titulo: string; mensaje: string }) {
  return (
    <>
      <Link href="../cursos">
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">Mis cursos</h1>
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

export default async function CursoProfesorPage({ params }: Props) {
  const { idcurso: idcursoParam } = await params
  const idcurso = Number(idcursoParam)

  const { sesion } = await getSesion()
  if (!sesion) {
    return (
      <Disclaimer
        titulo="No se pudo cargar tu sesión"
        mensaje="Inicia sesión nuevamente para acceder a este curso."
      />
    )
  }

  const curso = await getCursoById(idcurso)
  if (!curso) {
    return (
      <Disclaimer
        titulo="Curso no encontrado"
        mensaje="El curso al que intentas acceder no existe o fue eliminado."
      />
    )
  }

  const grupos = await getGruposProfesorCurso(sesion.cedula, idcurso)

  return (
    <>
      <Link href="../cursos">
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">Mis cursos</h1>
        </div>
      </Link>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold">{curso.nombrecurso}</h1>
          <p className="text-muted-foreground mt-1 max-w-3xl">{curso.descripcion}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Creado el{' '}
            <span className="font-medium text-foreground">
              {new Date(curso.fechacreacion).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-1">Grupos</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Grupos que tienes en este curso.
          </p>
          <ListGruposProfesor
            grupos={grupos}
            cedula={sesion.cedula}
            idcurso={idcurso}
          />
        </div>
      </div>
    </>
  )
}
