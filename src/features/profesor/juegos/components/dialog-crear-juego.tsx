'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus } from 'lucide-react'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'

import type { Modulo } from '@/features/profesor/refuerzos/actions/get-modulos'
import type { JuegoGrupoProfesor } from '../actions/get-juegos-grupo-profesor'
import { crearJuego } from '../actions/crear-juego'

const schema = z.object({
  nombre:      z.string().min(1, 'El nombre es requerido').max(20, 'El nombre no puede tener más de 20 caracteres'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  puntuacion:  z.string().min(1, 'La puntuación es requerida'),
  idmodulo:    z.string().min(1, 'Debe seleccionar un módulo'),
})

type FormValues = z.infer<typeof schema>

type Props = {
  idgrupo: number
  modulos: Modulo[]
  onJuegoCreado: (juego: JuegoGrupoProfesor) => void
}

export function DialogCrearJuego({ idgrupo, modulos, onJuegoCreado }: Props) {
  const [isOpen, setIsOpen]     = useState(false)
  const [errorMsg, setErrorMsg]  = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nombre: '', descripcion: '', puntuacion: '', idmodulo: '' },
  })

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) { form.reset(); setErrorMsg(null) }
  }

  async function onSubmit(values: FormValues) {
    setErrorMsg(null)
    setSubmitting(true)
    try {
      const result = await crearJuego({
        nombre:      values.nombre,
        descripcion: values.descripcion,
        puntuacion:  Number(values.puntuacion),
        idmodulo:    Number(values.idmodulo),
        idgrupo,
      })

      if (!result.ok) {
        setErrorMsg(result.message)
        return
      }

      onJuegoCreado(result.data)
      form.reset()
      setIsOpen(false)
    } catch {
      setErrorMsg('Error inesperado al crear el juego')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white">
          <Plus size={16} />
          Crear juego
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear juego</DialogTitle>
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

            {/* Módulo */}
            <Controller
              name="idmodulo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Módulo</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un módulo" />
                    </SelectTrigger>
                    <SelectContent>
                      {modulos.map((m) => (
                        <SelectItem key={m.id} value={String(m.id)}>
                          {m.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              {submitting ? 'Creando...' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
