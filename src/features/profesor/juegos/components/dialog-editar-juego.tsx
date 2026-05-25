'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'

import type { JuegoGrupoProfesor } from '../actions/get-juegos-grupo-profesor'
import { editarJuegoInfo } from '../actions/editar_juego_info'

const schema = z.object({
  nombre:      z.string().min(1).max(20, 'El nombre no puede tener más de 20 caracteres'),
  descripcion: z.string().min(1),
  puntuacion:  z.string().min(1),
})

type FormValues = z.infer<typeof schema>

type Props = {
  juego: JuegoGrupoProfesor
  onJuegoEditado: (juego: JuegoGrupoProfesor) => void
}

export function DialogEditarJuego({ juego, onJuegoEditado }: Props) {
  const [isOpen, setIsOpen]         = useState(false)
  const [errorMsg, setErrorMsg]      = useState<string | null>(null)
  const [submitting, setSubmitting]  = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre:      juego.nombrejuego,
      descripcion: juego.descripcion,
      puntuacion:  String(juego.puntuacion),
    },
  })

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) setErrorMsg(null)
    if (open) {
      form.reset({
        nombre:      juego.nombrejuego,
        descripcion: juego.descripcion,
        puntuacion:  String(juego.puntuacion),
      })
    }
  }

  async function onSubmit(values: FormValues) {
    setErrorMsg(null)
    setSubmitting(true)
    try {
      const result = await editarJuegoInfo({
        idjuego:     juego.idjuego,
        nombre:      values.nombre,
        descripcion: values.descripcion,
        puntuacion:  Number(values.puntuacion),
      })

      if (!result.ok) {
        setErrorMsg(result.message ?? 'Error al editar el juego')
        return
      }

      onJuegoEditado({
        ...juego,
        nombrejuego: values.nombre,
        descripcion: values.descripcion,
        puntuacion:  Number(values.puntuacion),
      })
      setIsOpen(false)
    } catch {
      setErrorMsg('Error inesperado al editar el juego')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#3d1f8c] hover:text-[#2e1769] hover:bg-violet-50"
        >
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar juego</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Nombre */}
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nombre</FieldLabel>
                  <Input {...field} placeholder="Nombre del juego" />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Descripción */}
            <Controller
              name="descripcion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Descripción</FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Descripción del juego"
                    className="resize-none"
                    rows={3}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Puntuación */}
            <Controller
              name="puntuacion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Puntuación</FieldLabel>
                  <Input {...field} type="number" placeholder="100" />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {errorMsg && (
              <div className="text-red-600 border border-red-300 bg-red-100 p-2 rounded-md">
                <h3 className="font-bold text-sm">¡ERROR!</h3>
                <p className="text-sm">{errorMsg}</p>
              </div>
            )}
          </FieldGroup>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white"
            >
              {submitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
