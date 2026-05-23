'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { Modulo } from '../actions/get-modulos'
import type { RefuerzoDetalle } from '../actions/get-refuerzo'
import { editarRefuerzo } from '../actions/editar-refuerzo'

const schema = z.object({
  explicacion: z.string().min(1),
  puntuacion:  z.string().min(1),
  idmodulo:    z.string().min(1),
})

type FormData = z.infer<typeof schema>

type Props = {
  refuerzo: RefuerzoDetalle
  modulos:  Modulo[]
}

export function FormEditarRefuerzo({ refuerzo, modulos }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg]          = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      explicacion: refuerzo.explicacion,
      puntuacion:  String(refuerzo.puntuacion),
      idmodulo:    String(refuerzo.idmodulo),
    },
  })

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)
    setErrorMsg(null)
    try {
      const result = await editarRefuerzo({
        idrefuerzo:  refuerzo.idrefuerzo,
        explicacion: data.explicacion,
        puntuacion:  Number(data.puntuacion),
        idmodulo:    Number(data.idmodulo),
      })

      if (!result.ok) {
        setErrorMsg('No se pudo guardar el refuerzo')
        return
      }

      toast.success('Refuerzo actualizado correctamente')
    } catch {
      setErrorMsg('Error inesperado al guardar')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Módulo */}
        <Controller
          name="idmodulo"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Módulo</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
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

        {/* Explicación */}
        <Controller
          name="explicacion"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Explicación</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  placeholder="Escribe la explicación del refuerzo..."
                  rows={6}
                  className="min-h-36 max-h-60 resize-none overflow-y-auto"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value?.length ?? 0}/1000 caracteres
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
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
                min={1}
                placeholder="Ej: 10"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
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

      <div className="flex justify-end mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  )
}
