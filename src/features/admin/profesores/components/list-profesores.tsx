'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Profesor } from '../actions/get-all-profesores'

type Props = {
  initialProfesores: Profesor[]
}

export function ListProfesores({ initialProfesores }: Props) {
  const [profesores, setProfesores] = useState<Profesor[]>(initialProfesores)

  const handleCrear = (profesor: Profesor) => {
    setProfesores((prev) => [...prev, profesor])
  }

  const handleEliminar = (pkcc: string) => {
    setProfesores((prev) => prev.filter((p) => p.pkcc !== pkcc))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Gestionar Profesores</h1>
          <p className="text-muted-foreground mt-1">
            Conoce todos los profesores que se encuentran en el sistema y
            administralos a tu gusto.
          </p>
        </div>
      </div>
      <div>
        {/* Dialog de crear — por implementar */}
        <Button
          className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white"
          onClick={() =>
            handleCrear({
              pkcc: Date.now().toString(),
              primernombre: 'Nuevo',
              primerapellido: 'Profesor',
              email: 'nuevo@test.com',
            })
          }
        >
          <Plus size={16} />
          Crear Profesor
        </Button>
      </div>

      {profesores.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <FileText
            size={56}
            strokeWidth={1.2}
            className="text-muted-foreground/40"
          />
          <p className="font-medium">No hay profesores registrados</p>
          <p className="text-sm">
            Haz clic en &quot;Crear Profesor&quot; para agregar uno nuevo
          </p>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border border-[#3d1f8c]">
          <Table>
            <TableHeader className="bg-[#3d1f8c]">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-white font-semibold px-6 py-4">
                  Nombre
                </TableHead>
                <TableHead className="text-white font-semibold px-6 py-4">
                  Cédula
                </TableHead>
                <TableHead className="text-white font-semibold px-6 py-4">
                  Correo
                </TableHead>
                <TableHead className="text-white font-semibold px-6 py-4">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profesores.map((profesor) => (
                <TableRow key={profesor.pkcc}>
                  <TableCell className="px-6 py-4">
                    {profesor.primernombre} {profesor.primerapellido}
                  </TableCell>
                  <TableCell className="px-6 py-4">{profesor.pkcc}</TableCell>
                  <TableCell className="px-6 py-4">{profesor.email}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* Dialog de editar — por implementar */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </Button>
                      {/* AlertDialog de eliminar — por implementar */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleEliminar(profesor.pkcc)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
