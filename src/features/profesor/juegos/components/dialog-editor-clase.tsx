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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

import { useEditorStore } from '../store'

const schema = z.object({ nombre: z.string().min(1) })
type FormValues = z.infer<typeof schema>

export function DialogEditorClase({ idjuego }: { idjuego: number }) {
  const agregarClase = useEditorStore((s) => s.agregarClase)
  const [isOpen, setIsOpen]       = useState(false)
  const [errorMsg, setErrorMsg]    = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nombre: '' },
  })

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) { form.reset(); setErrorMsg(null) }
  }

  async function onSubmit({ nombre }: FormValues) {
    setErrorMsg(null)
    setSubmitting(true)
    try {
      const result = await agregarClase(nombre, idjuego)
      if (!result.ok) { setErrorMsg('No se pudo crear la clase'); return }
      toast.success(`Clase "${nombre}" creada`)
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
          className="w-full gap-1 text-[#3d1f8c] border-dashed"
        >
          <Plus size={14} /> Añadir clase
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva clase</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nombre de la clase</FieldLabel>
                  <Input {...field} placeholder="Ej. Vehiculo, Persona..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
              {submitting ? 'Creando...' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
