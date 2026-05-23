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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

import { useEditorStore } from '../store'

const schema = z.object({
  nombre:            z.string().min(1),
  visibilidad:       z.enum(['public', 'private', 'protected']),
  tipo:              z.string().min(1),
  retroalimentacion: z.string(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  tipo:    'Atributo' | 'Metodo'
  idclase: number
  idjuego: number
}

export function DialogEditorMiembro({ tipo, idclase, idjuego }: Props) {
  const { agregarAtributo, agregarMetodo } = useEditorStore()
  const [isOpen, setIsOpen]       = useState(false)
  const [errorMsg, setErrorMsg]    = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre:            '',
      visibilidad:       'public',
      tipo:              '',
      retroalimentacion: '',
    },
  })

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) { form.reset(); setErrorMsg(null) }
  }

  async function onSubmit(values: FormValues) {
    setErrorMsg(null)
    setSubmitting(true)
    try {
      const input = {
        nombre:            values.nombre,
        visibilidad:       values.visibilidad,
        tipo:              values.tipo,
        idclase,
        idjuego,
        retroalimentacion: values.retroalimentacion.trim() || null,
      }
      const result = tipo === 'Atributo'
        ? await agregarAtributo(input)
        : await agregarMetodo(input)

      if (!result.ok) {
        setErrorMsg(`No se pudo añadir el ${tipo === 'Atributo' ? 'atributo' : 'método'}`)
        return
      }

      toast.success(`${tipo} "${values.nombre}" añadido`)
      form.reset()
      setIsOpen(false)
    } catch {
      setErrorMsg('Error inesperado')
    } finally {
      setSubmitting(false)
    }
  }

  const label = tipo === 'Atributo' ? 'atributo' : 'método'

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 gap-1 text-xs text-[#3d1f8c] hover:bg-violet-50"
        >
          <Plus size={12} /> {tipo}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo {label}</DialogTitle>
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
                  <Input
                    {...field}
                    placeholder={tipo === 'Metodo' ? 'calcularPrecio()' : 'precio'}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              {/* Visibilidad */}
              <Controller
                name="visibilidad"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Visibilidad</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">public</SelectItem>
                        <SelectItem value="private">private</SelectItem>
                        <SelectItem value="protected">protected</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Tipo */}
              <Controller
                name="tipo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Tipo</FieldLabel>
                    <Input {...field} placeholder="String, int, void..." />
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
