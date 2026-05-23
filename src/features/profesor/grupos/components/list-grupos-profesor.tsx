'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { GrupoProfesor } from '../actions/get-grupos-profesor-curso'
import { DialogCreateGrupo } from './dialog-create-grupo'

type Props = {
  grupos: GrupoProfesor[]
  cedula: string
  idcurso: number
}

export function ListGruposProfesor({ grupos: gruposIniciales, cedula, idcurso }: Props) {
  const [grupos, setGrupos] = useState<GrupoProfesor[]>(gruposIniciales)

  const handleAgregarGrupo = (grupo: GrupoProfesor) =>
    setGrupos((prev) => [...prev, grupo])

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <DialogCreateGrupo
          cedula={cedula}
          idcurso={idcurso}
          handleAgregarGrupo={handleAgregarGrupo}
        />
      </div>

      {grupos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <Users size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">No tienes grupos en este curso</p>
          <p className="text-sm">Crea uno con el botón de arriba.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grupos.map((grupo) => (
            <Card
              key={grupo.idgrupo}
              className="flex flex-col border border-[#3d1f8c]/30 hover:border-[#3d1f8c] transition-colors"
            >
              <CardHeader>
                <div className="text-xs font-medium text-[#3d1f8c] uppercase tracking-wide mb-1">
                  Código: {grupo.idgrupo}
                </div>
                <CardTitle className="text-lg">{grupo.nombregrupo}</CardTitle>
                <CardDescription className="line-clamp-3">{grupo.descripcion}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-xs text-muted-foreground">
                  Creado el{' '}
                  <span className="font-medium text-foreground">
                    {new Date(grupo.fechacreacion).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-[#3d1f8c] hover:bg-[#3d1f8c]/90">
                  <Link href={`./${idcurso}/grupos/${grupo.idgrupo}`}>Ver grupo</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
