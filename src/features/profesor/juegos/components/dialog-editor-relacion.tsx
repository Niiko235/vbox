'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

import type { ClaseEditor, TipoRelacion } from '../actions/get-juego-editor'
import { useEditorStore } from '../store'

const schema = z.object({
  tipoRelacion:      z.enum(['Asociacion', 'Agregacion', 'Composicion', 'Herencia']),
  idclaseOrigen:     z.string().min(1),
  idclaseDestino:    z.string().min(1),
  retroalimentacion: z.string(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  idjuego: number
  clases:  ClaseEditor[]
}

export function DialogEditorRelacion({ idjuego, clases }: Props) {
  const agregarRelacion = useEditorStore((s) => s.agregarRelacion)
  const [isOpen, setIsOpen]       = useState(false)
  const [errorMsg, setErrorMsg]    = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const disabled = clases.length < 2

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipoRelacion:      'Asociacion',
      idclaseOrigen:     '',
      idclaseDestino:    '',
      retroalimentacion: '',
    },
  })

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) { form.reset(); setErrorMsg(null) }
  }

  async function onSubmit(values: FormValues) {
    if (values.idclaseOrigen === values.idclaseDestino) {
      setErrorMsg('La clase origen y destino no pueden ser la misma')
      return
    }
    setErrorMsg(null)
    setSubmitting(true)
    try {
      const result = await agregarRelacion({
        tipoRelacion:      values.tipoRelacion as TipoRelacion,
        idclaseOrigen:     Number(values.idclaseOrigen),
        idclaseDestino:    Number(values.idclaseDestino),
        idjuego,
        retroalimentacion: values.retroalimentacion.trim() || null,
      })

      if (!result.ok) { setErrorMsg('No se pudo crear la relación'); return }

      toast.success('Relación añadida')
      form.reset()
      setIsOpen(false)
    } catch {
      setErrorMsg('Error inesperado')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          disabled={disabled}
          className="w-full gap-1 text-[#3d1f8c] border-dashed"
          title={disabled ? 'Necesitas al menos 2 clases para crear una conexión' : undefined}
        >
          <Plus size={14} /> Añadir conexión
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva conexión</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Tipo de relación */}
            <Controller
              name="tipoRelacion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tipo de relación</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asociacion">Asociación</SelectItem>
                      <SelectItem value="Agregacion">Agregación</SelectItem>
                      <SelectItem value="Composicion">Composición</SelectItem>
                      <SelectItem value="Herencia">Herencia</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              {/* Clase origen */}
              <Controller
                name="idclaseOrigen"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Origen</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Clase origen" />
                      </SelectTrigger>
                      <SelectContent>
                        {clases.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Clase destino */}
              <Controller
                name="idclaseDestino"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Destino</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Clase destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {clases.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Retroalimentación */}
            <Controller
              name="retroalimentacion"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>
                    Retroalimentación{' '}
                    <span className="text-muted-foreground font-normal">(opcional)</span>
                  </FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Pista o explicación para el estudiante"
                    className="resize-none"
                    rows={2}
                  />
                </Field>
              )}
            />

            {errorMsg && (
              <div className="text-red-600 border border-red-300 bg-red-100 p-2 rounded-md text-sm">
                {errorMsg}
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
