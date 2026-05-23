'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { GrupoEstudiante } from '../actions/get-grupos-estudiante'
import { DialogJoinGroup } from './dialog-join-group'

type Props = {
  grupos: GrupoEstudiante[]
  cedula: string
}

export function ListGrupos({ grupos: gruposIniciales, cedula }: Props) {
  const [grupos, setGrupos] = useState<GrupoEstudiante[]>(gruposIniciales)

  const handleYaPertenece = (idgrupo: number) =>
    grupos.some((g) => g.idgrupo === idgrupo)

  const handleAgregarGrupo = (grupo: GrupoEstudiante) =>
    setGrupos((prev) => [...prev, grupo])

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <DialogJoinGroup
          cedula={cedula}
          handleYaPertenece={handleYaPertenece}
          handleAgregarGrupo={handleAgregarGrupo}
        />
      </div>

      {grupos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <BookOpen size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">No estás inscrito en ningún grupo</p>
          <p className="text-sm">Únete usando el código que te compartió tu profesor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grupos.map((grupo) => (
            <Card key={grupo.idgrupo} className="flex flex-col border border-[#3d1f8c]/30 hover:border-[#3d1f8c] transition-colors">
              <CardHeader>
                <div className="text-xs font-medium text-[#3d1f8c] uppercase tracking-wide mb-1">
                  {grupo.nombrecurso}
                </div>
                <CardTitle className="text-lg">{grupo.nombregrupo}</CardTitle>
                <CardDescription className="line-clamp-3">{grupo.descripcion}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-xs text-muted-foreground">
                  Ingresaste el{' '}
                  <span className="font-medium text-foreground">
                    {new Date(grupo.fechaingreso).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-[#3d1f8c] hover:bg-[#3d1f8c]/90">
                  <Link href={`./grupos/${grupo.idgrupo}`}>Ver grupo</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
