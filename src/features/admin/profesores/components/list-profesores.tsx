'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
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
import { AlertDialogDeleteTeacher } from './alert-dialog-delete-teacher'
import { DialogCreateTeacherForm } from './dialog-create-teacher-form'
import { DialogEditTeacherForm } from './dialog-edit-teacher-form'

type Universidad = { id: number; nombre: string }
type Programa = { id: number; nombre: string; id_universidad: number }

type Props = {
  initialProfesores: Profesor[]
  universidades: Universidad[]
  programas: Programa[]
}

export function ListProfesores({ initialProfesores, universidades, programas }: Props) {
  const [profesores, setProfesores] = useState<Profesor[]>(initialProfesores)

  const handleCrear = (profesor: Profesor) => {
    setProfesores((prev) => [...prev, profesor])
  }

  const handleEditar = (profesorActualizado: Profesor) => {
    setProfesores((prev) =>
      prev.map((p) => (p.pkcc === profesorActualizado.pkcc ? profesorActualizado : p))
    )
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
        <DialogCreateTeacherForm
          universidades={universidades}
          programas={programas}
          handleCrear={handleCrear}
        />
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
                      <DialogEditTeacherForm
                        profesor={profesor}
                        universidades={universidades}
                        programas={programas}
                        handleEditar={handleEditar}
                      />
                      <AlertDialogDeleteTeacher
                        cedula={profesor.pkcc}
                        nombreProfesor={`${profesor.primernombre} ${profesor.primerapellido}`}
                        handleEliminar={handleEliminar}
                      />
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
