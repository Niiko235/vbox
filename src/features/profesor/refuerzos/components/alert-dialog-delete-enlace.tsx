'use client'

import { useState } from 'react'
import { Trash2, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { eliminarEnlace } from '../actions/eliminar-enlace'

type Props = {
  idenlace:    number
  onEliminar:  (idenlace: number) => void
}

type FormStatus = {
  status:   'idle' | 'loading' | 'error'
  message?: string
}

export function AlertDialogDeleteEnlace({ idenlace, onEliminar }: Props) {
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })
  const [isOpen, setIsOpen]         = useState(false)

  async function handleDelete() {
    setFormStatus({ status: 'loading' })
    try {
      const result = await eliminarEnlace(idenlace)

      if (!result.ok) {
        setFormStatus({ status: 'error', message: 'No se pudo eliminar el enlace' })
        return
      }

      toast.success('Enlace eliminado')
      onEliminar(idenlace)
      setFormStatus({ status: 'idle' })
      setIsOpen(false)
    } catch {
      setFormStatus({ status: 'error', message: 'Error inesperado al eliminar el enlace' })
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Eliminar enlace</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de querer eliminar este enlace? Se eliminarán también los
            registros de acceso de los estudiantes. Esta acción no se puede deshacer.
          </AlertDialogDescription>
          {formStatus.status === 'error' && (
            <div className="text-red-600 mt-4 border border-red-300 bg-red-100 p-2 rounded-md">
              <h3 className="font-bold">¡ERROR!</h3>
              <p>{formStatus.message}</p>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            disabled={formStatus.status === 'loading'}
          >
            Cancelar
          </AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            disabled={formStatus.status === 'loading'}
            onClick={handleDelete}
          >
            {formStatus.status === 'loading' ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
