'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
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

import { quitarJuegoGrupo } from '../actions/quitar-juego-grupo'

type Props = {
  idjuego: number
  idgrupo: number
  onQuitar: (idjuego: number) => void
}

type FormStatus = {
  status: 'idle' | 'loading' | 'error'
  message?: string
}

export function AlertDialogQuitarJuego({ idjuego, idgrupo, onQuitar }: Props) {
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })
  const [isOpen, setIsOpen]         = useState(false)

  async function handleQuitar() {
    setFormStatus({ status: 'loading' })
    try {
      const result = await quitarJuegoGrupo(idjuego, idgrupo)

      if (!result.ok) {
        setFormStatus({ status: 'error', message: 'No se pudo quitar el juego del grupo' })
        return
      }

      toast.success('Juego quitado del grupo')
      onQuitar(idjuego)
      setFormStatus({ status: 'idle' })
      setIsOpen(false)
    } catch {
      setFormStatus({ status: 'error', message: 'Error inesperado al quitar el juego' })
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-orange-500 hover:text-orange-700 hover:bg-orange-50"
        >
          <LogOut size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-orange-100 text-orange-600">
            <LogOut />
          </AlertDialogMedia>
          <AlertDialogTitle>Quitar juego del grupo</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de querer quitar este juego del grupo? El juego seguirá
            existiendo en el grupo que lo creó y podrás volver a añadirlo más adelante.
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
            variant="default"
            disabled={formStatus.status === 'loading'}
            onClick={handleQuitar}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {formStatus.status === 'loading' ? 'Quitando...' : 'Quitar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
