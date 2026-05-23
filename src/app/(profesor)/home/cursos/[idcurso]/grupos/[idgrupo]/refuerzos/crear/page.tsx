import { ArrowLeft, BookX } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getGrupoById } from '@/features/profesor/grupos/actions/get-grupo-by-id'
import { getModulos } from '@/features/profesor/refuerzos/actions/get-modulos'
import { FormCrearRefuerzo } from '@/features/profesor/refuerzos/components/form-crear-refuerzo'

type Props = {
  params: Promise<{ idcurso: string; idgrupo: string }>
}

export default async function CrearRefuerzoPage({ params }: Props) {
  const { idcurso: idcursoParam, idgrupo: idgrupoParam } = await params
  const idcurso = Number(idcursoParam)
  const idgrupo = Number(idgrupoParam)

  const [grupo, modulos] = await Promise.all([
    getGrupoById(idgrupo),
    getModulos(idcurso),
  ])

  if (!grupo) {
    return (
      <>
        <Link href={`/home/cursos/${idcurso}`}>
          <div className="flex items-center cursor-pointer hover:underline ml-4">
            <ArrowLeft size={20} className="mr-1" />
            <h1 className="text-xl">Volver</h1>
          </div>
        </Link>
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <BookX size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">Grupo no encontrado</p>
          <p className="text-sm">El grupo al que intentas acceder no existe o fue eliminado.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Link href={`/home/cursos/${idcurso}/grupos/${idgrupo}`}>
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">{grupo.nombregrupo}</h1>
        </div>
      </Link>

      <div className="p-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Crear refuerzo</CardTitle>
            <CardDescription>
              Agrega un refuerzo al grupo{' '}
              <span className="font-medium text-foreground">{grupo.nombregrupo}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormCrearRefuerzo
              modulos={modulos}
              idcurso={idcurso}
              idgrupo={idgrupo}
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
