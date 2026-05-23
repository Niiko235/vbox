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

import type { GrupoEstudiante } from '../actions/get-grupos-estudiante'
import { unirseGrupo } from '../actions/unirse-grupo'

const formSchema = z.object({
  codigo: z
    .string()
    .min(1, 'El código es requerido')
    .regex(/^\d+$/, 'El código debe ser numérico'),
})

type FormData = z.infer<typeof formSchema>

type FormStatus = {
  status: 'idle' | 'submitting' | 'error'
  message?: string
}

type Props = {
  cedula: string
  handleYaPertenece: (idgrupo: number) => boolean
  handleAgregarGrupo: (grupo: GrupoEstudiante) => void
}

export function DialogJoinGroup({
  cedula,
  handleYaPertenece,
  handleAgregarGrupo,
}: Props) {
  const [open, setOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { codigo: '' },
  })

  const handleReset = () => {
    form.reset({ codigo: '' })
    setFormStatus({ status: 'idle' })
  }

  async function onSubmit(data: FormData) {
    const idgrupo = Number(data.codigo)

    if (handleYaPertenece(idgrupo)) {
      setFormStatus({ status: 'error', message: 'Ya perteneces a este grupo' })
      return
    }

    setFormStatus({ status: 'submitting' })
    try {
      const response = await unirseGrupo(cedula, idgrupo)

      if (!response.ok || !response.data) {
        setFormStatus({
          status: 'error',
          message: response.message || 'No se pudo unir al grupo',
        })
        return
      }

      handleAgregarGrupo(response.data)
      toast.success('Te uniste al grupo correctamente')
      handleReset()
      setOpen(false)
    } catch {
      setFormStatus({
        status: 'error',
        message: 'Error desconocido al unirse al grupo',
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
          Unirse a un grupo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unirse a un grupo</DialogTitle>
          <DialogDescription>
            Ingresa el código del grupo que te compartió tu profesor.
          </DialogDescription>
        </DialogHeader>
        <form id="form-join-group" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="codigo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-join-group-codigo">
                    Código del grupo *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-join-group-codigo"
                    placeholder="1"
                    type="number"
                    autoComplete="off"
                    disabled={formStatus.status === 'submitting'}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
              {formStatus.status === 'submitting' ? 'Uniéndose...' : 'Unirse'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
