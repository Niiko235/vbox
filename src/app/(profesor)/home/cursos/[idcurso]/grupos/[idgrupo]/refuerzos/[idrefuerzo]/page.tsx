import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { getRefuerzo }         from '@/features/profesor/refuerzos/actions/get-refuerzo'
import { getEnlacesRefuerzo }  from '@/features/profesor/refuerzos/actions/get-enlaces-refuerzo'
import { getModulos }          from '@/features/profesor/refuerzos/actions/get-modulos'
import { FormEditarRefuerzo }  from '@/features/profesor/refuerzos/components/form-editar-refuerzo'
import { TableEnlaces }        from '@/features/profesor/refuerzos/components/table-enlaces'

type Props = {
  params: Promise<{ idcurso: string; idgrupo: string; idrefuerzo: string }>
}

export default async function EditarRefuerzoPage({ params }: Props) {
  const { idcurso: idcursoParam, idgrupo: idgrupoParam, idrefuerzo: idrefuerzoParam } =
    await params

  const idcurso    = Number(idcursoParam)
  const idgrupo    = Number(idgrupoParam)
  const idrefuerzo = Number(idrefuerzoParam)

  const [refuerzo, enlaces, modulos] = await Promise.all([
    getRefuerzo(idrefuerzo),
    getEnlacesRefuerzo(idrefuerzo),
    getModulos(idcurso),
  ])

  if (!refuerzo) notFound()

  const backHref = `/home/cursos/${idcurso}/grupos/${idgrupo}`

  return (
    <>
      <Link href={backHref}>
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">Volver al grupo</h1>
        </div>
      </Link>

      <div className="p-8 max-w-4xl space-y-8">
        {/* ── Metadata del refuerzo ─────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Editar refuerzo #{refuerzo.idrefuerzo}</CardTitle>
            <CardDescription>
              Módulo actual:{' '}
              <span className="font-medium text-foreground">
                {refuerzo.nombremodulo}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormEditarRefuerzo refuerzo={refuerzo} modulos={modulos} />
          </CardContent>
        </Card>

        {/* ── Enlaces ───────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-1">Enlaces</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Recursos externos asociados a este refuerzo.
          </p>
          <TableEnlaces enlaces={enlaces} idrefuerzo={idrefuerzo} />
        </section>
      </div>
    </>
  )
}
