'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { crearRefuerzo } from '../actions/crear-refuerzo'

// ─── Schema ───────────────────────────────────────────────────────────────────

const formSchema = z.object({
  explicacion: z.string().min(1, 'La explicacion es requerida').max(1000),
  puntuacion: z.string().min(1, 'La puntuacion es requerida'),
  idmodulo: z.string().min(1, 'El modulo es requerido'),
})

type FormData = z.infer<typeof formSchema>

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  modulos: Modulo[]
  idcurso: number
  idgrupo: number
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function FormCrearRefuerzo({ modulos, idcurso, idgrupo }: Props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { explicacion: '', puntuacion: '', idmodulo: undefined },
  })

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const response = await crearRefuerzo({
        explicacion: data.explicacion,
        puntuacion: Number(data.puntuacion),
        idmodulo: Number(data.idmodulo),
        idgrupo,
      })

      if (!response.ok) {
        setErrorMsg(response.message ?? 'No se pudo crear el refuerzo')
        return
      }

      toast.success('Refuerzo creado correctamente')
      router.push(`../`)
    } catch {
      setErrorMsg('Error inesperado al crear el refuerzo')
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
              <FieldLabel>Módulo *</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
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
              <FieldLabel>Explicación *</FieldLabel>
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
              <FieldLabel>Puntuación *</FieldLabel>
              <Input
                {...field}
                type="number"
                min={1}
                placeholder="Ej: 10"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Error global */}
        {errorMsg && (
          <div className="text-sm text-red-600 border border-red-300 bg-red-50 rounded p-2">
            <p className="font-bold">¡ERROR!</p>
            <p>{errorMsg}</p>
          </div>
        )}
      </FieldGroup>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => router.push(`/home/cursos/${idcurso}/grupos/${idgrupo}`)}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white"
        >
          {isSubmitting ? 'Creando...' : 'Crear refuerzo'}
        </Button>
      </div>
    </form>
  )
}
