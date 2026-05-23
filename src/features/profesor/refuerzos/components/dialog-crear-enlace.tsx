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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

import type { EnlaceRefuerzo } from '../actions/get-enlaces-refuerzo'
import { crearEnlace } from '../actions/crear-enlace'

const TIPOS = ['Sitio web', 'Documento', 'Video', 'Otro'] as const

const schema = z.object({
  tipo:       z.enum(TIPOS),
  contenido:  z.string().min(1),
  puntuacion: z.string().min(1),
})

type FormData = z.infer<typeof schema>

type Props = {
  idrefuerzo:    number
  onEnlaceCreado: (enlace: EnlaceRefuerzo) => void
}

export function DialogCrearEnlace({ idrefuerzo, onEnlaceCreado }: Props) {
  const [isOpen, setIsOpen]       = useState(false)
  const [errorMsg, setErrorMsg]    = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { tipo: 'Sitio web', contenido: '', puntuacion: '' },
  })

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) { form.reset(); setErrorMsg(null) }
  }

  async function onSubmit(data: FormData) {
    setErrorMsg(null)
    setSubmitting(true)
    try {
      const result = await crearEnlace({
        tipo:       data.tipo,
        contenido:  data.contenido,
        puntuacion: Number(data.puntuacion),
        idrefuerzo,
      })

      if (!result.ok) {
        setErrorMsg(result.message)
        return
      }

      onEnlaceCreado(result.data)
      form.reset()
      setIsOpen(false)
    } catch {
      setErrorMsg('Error inesperado al crear el enlace')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white">
          <Plus size={16} />
          Añadir enlace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo enlace</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Tipo */}
            <Controller
              name="tipo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tipo</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Contenido / URL */}
            <Controller
              name="contenido"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>URL o contenido</FieldLabel>
                  <Input
                    {...field}
                    placeholder="https://..."
                    disabled={submitting}
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
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    placeholder="5"
                    disabled={submitting}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {errorMsg && (
              <div className="text-sm text-red-600 border border-red-300 bg-red-50 rounded p-2">
                <p className="font-bold">¡ERROR!</p>
                <p>{errorMsg}</p>
              </div>
            )}
          </FieldGroup>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white"
            >
              {submitting ? 'Añadiendo...' : 'Añadir'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
