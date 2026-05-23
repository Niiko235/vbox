'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

import type { GrupoProfesor } from '../actions/get-grupos-profesor-curso'
import { crearGrupo } from '../actions/crear-grupo'

const formSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(20, 'Máximo 20 caracteres'),
  descripcion: z
    .string()
    .min(1, 'La descripción es requerida')
    .max(500, 'Máximo 500 caracteres'),
})

type FormData = z.infer<typeof formSchema>

type FormStatus = {
  status: 'idle' | 'submitting' | 'error'
  message?: string
}

type Props = {
  cedula: string
  idcurso: number
  handleAgregarGrupo: (grupo: GrupoProfesor) => void
}

export function DialogCreateGrupo({ cedula, idcurso, handleAgregarGrupo }: Props) {
  const [open, setOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { nombre: '', descripcion: '' },
  })

  const handleReset = () => {
    form.reset({ nombre: '', descripcion: '' })
    setFormStatus({ status: 'idle' })
  }

  async function onSubmit(data: FormData) {
    setFormStatus({ status: 'submitting' })
    try {
      const response = await crearGrupo({
        nombre: data.nombre,
        descripcion: data.descripcion,
        cedula,
        idcurso,
      })

      if (!response.ok || !response.data) {
        setFormStatus({
          status: 'error',
          message: response.message || 'No se pudo crear el grupo',
        })
        return
      }

      handleAgregarGrupo(response.data)
      toast.success('Grupo creado correctamente')
      handleReset()
      setOpen(false)
    } catch {
      setFormStatus({
        status: 'error',
        message: 'Error desconocido al crear el grupo',
      })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val)
        if (!val) handleReset()
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white">
          <Plus size={16} />
          Crear grupo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear nuevo grupo</DialogTitle>
          <DialogDescription>
            El código del grupo se generará automáticamente.
          </DialogDescription>
        </DialogHeader>
        <form id="form-create-grupo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-grupo-nombre">
                    Nombre *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-create-grupo-nombre"
                    placeholder="Grupo A"
                    autoComplete="off"
                    disabled={formStatus.status === 'submitting'}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="descripcion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-grupo-descripcion">
                    Descripción *
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-create-grupo-descripcion"
                      placeholder="Descripción del grupo"
                      rows={6}
                      className="min-h-36 max-h-36 resize-none overflow-y-auto"
                      aria-invalid={fieldState.invalid}
                      disabled={formStatus.status === 'submitting'}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value ? field.value.length : 0}/500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {formStatus.status === 'error' && (
              <div className="text-sm text-red-600 border border-red-300 bg-red-50 rounded p-2">
                <p className="font-bold">¡ERROR!</p>
                <p>{formStatus.message}</p>
              </div>
            )}
          </FieldGroup>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              disabled={formStatus.status === 'submitting'}
              onClick={() => {
                handleReset()
                setOpen(false)
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={formStatus.status === 'submitting'}>
              {formStatus.status === 'submitting' ? 'Creando...' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
