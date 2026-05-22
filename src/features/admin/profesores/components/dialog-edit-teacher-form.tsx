'use client'

import { useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Pencil, CalendarIcon } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { SelectedUni } from '@/features/auth/components/selected-uni'
import { SelectedProgram } from '@/features/auth/components/selected-program'

import { editTeacher } from '../actions/edit-teacher'
import type { Profesor } from '../actions/get-all-profesores'

// ─── Schema ───────────────────────────────────────────────────────────────────

const formSchema = z.object({
  primernombre: z.string().min(1, 'El primer nombre es requerido').max(15, 'Máximo 15 caracteres'),
  segundonombre: z.string().max(30, 'Máximo 30 caracteres').optional(),
  primerapellido: z.string().min(1, 'El primer apellido es requerido').max(15, 'Máximo 15 caracteres'),
  segundoapellido: z.string().max(30, 'Máximo 30 caracteres').optional(),
  fechanacimiento: z.string().min(1, 'La fecha de nacimiento es requerida'),
  email: z.string().email('El correo electrónico no es válido'),
  numerotelefono: z.string().min(1, 'El teléfono es requerido').max(10, 'Máximo 10 caracteres'),
  contrasenia: z.string().max(10, 'Máximo 10 caracteres').optional(),
  universidad: z.string().min(1, 'Debes seleccionar una universidad'),
  programa: z.string().min(1, 'Debes seleccionar un programa'),
})

type FormValues = z.infer<typeof formSchema>

type FormStatus = {
  status: 'idle' | 'submitting' | 'error'
  message?: string
}

type Universidad = { id: number; nombre: string }
type Programa = { id: number; nombre: string; id_universidad: number }

type Props = {
  profesor: Profesor
  universidades: Universidad[]
  programas: Programa[]
  handleEditar: (profesorActualizado: Profesor) => void
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function DialogEditTeacherForm({ profesor, universidades, programas, handleEditar }: Props) {
  const [open, setOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })

  // Valores iniciales — se resetean al cerrar sin guardar
  const defaultValues: FormValues = {
    primernombre: profesor.primernombre,
    segundonombre: profesor.segundonombre ?? '',
    primerapellido: profesor.primerapellido,
    segundoapellido: profesor.segundoapellido ?? '',
    fechanacimiento: profesor.fechanacimiento
      ? new Date(profesor.fechanacimiento).toISOString()
      : '',
    email: profesor.email,
    numerotelefono: profesor.telefono ?? '',
    contrasenia: '',
    universidad: profesor.codigouniversidad?.toString() ?? '',
    programa: profesor.codigoprograma?.toString() ?? '',
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const universidadSeleccionada = useWatch({ control: form.control, name: 'universidad' })

  const handleReset = () => {
    form.reset(defaultValues)
    setFormStatus({ status: 'idle' })
  }

  async function onSubmit(values: FormValues) {
    setFormStatus({ status: 'submitting' })
    try {
      const response = await editTeacher({
        cedula: profesor.pkcc,
        primernombre: values.primernombre,
        segundonombre: values.segundonombre,
        primerapellido: values.primerapellido,
        segundoapellido: values.segundoapellido,
        fechanacimiento: values.fechanacimiento,
        email: values.email,
        numerotelefono: values.numerotelefono,
        contrasenia: values.contrasenia,
        programa: values.programa,
      })

      if (!response.ok) {
        setFormStatus({ status: 'error', message: response.message })
        return
      }

      toast.success('Profesor actualizado correctamente')
      handleEditar({
        ...profesor,
        primernombre: values.primernombre,
        segundonombre: values.segundonombre ?? null,
        primerapellido: values.primerapellido,
        segundoapellido: values.segundoapellido ?? null,
        fechanacimiento: values.fechanacimiento || null,
        telefono: values.numerotelefono,
        email: values.email,
        codigoprograma: values.programa ? Number(values.programa) : null,
        codigouniversidad: values.universidad ? Number(values.universidad) : null,
      })
      setFormStatus({ status: 'idle' })
      setOpen(false)
    } catch {
      setFormStatus({ status: 'error', message: 'Error desconocido al actualizar el profesor.' })
    }
  }

  const isSubmitting = formStatus.status === 'submitting'

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) handleReset() }}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
          <Pencil size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Profesor</DialogTitle>
          <DialogDescription>
            Modifica los datos del profesor. La cédula no puede cambiarse.
          </DialogDescription>
        </DialogHeader>

        <form id="form-edit-teacher" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            {/* Cédula — solo lectura */}
            <Field>
              <FieldLabel>Cédula</FieldLabel>
              <Input value={profesor.pkcc} disabled className="bg-muted text-muted-foreground cursor-not-allowed" />
            </Field>

            {/* Nombres */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="primernombre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-teacher-primernombre">Primer nombre *</FieldLabel>
                    <Input {...field} id="edit-teacher-primernombre" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="segundonombre"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="edit-teacher-segundonombre">Segundo nombre</FieldLabel>
                    <Input {...field} id="edit-teacher-segundonombre" autoComplete="off" disabled={isSubmitting} />
                  </Field>
                )}
              />
            </div>

            {/* Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="primerapellido"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-teacher-primerapellido">Primer apellido *</FieldLabel>
                    <Input {...field} id="edit-teacher-primerapellido" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="segundoapellido"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="edit-teacher-segundoapellido">Segundo apellido</FieldLabel>
                    <Input {...field} id="edit-teacher-segundoapellido" autoComplete="off" disabled={isSubmitting} />
                  </Field>
                )}
              />
            </div>

            {/* Teléfono y fecha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="numerotelefono"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-teacher-telefono">Teléfono *</FieldLabel>
                    <Input {...field} id="edit-teacher-telefono" type="number" placeholder="3214567890" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="fechanacimiento"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-teacher-fecha">Fecha Nacimiento *</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="edit-teacher-fecha"
                          className="w-full justify-start text-left"
                          disabled={isSubmitting}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? new Date(field.value).toLocaleDateString('es-CO') : 'dd/mm/yyyy'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                          captionLayout="dropdown"
                          disabled={isSubmitting}
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Universidad y Programa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="universidad"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Universidad *</FieldLabel>
                    <SelectedUni
                      value={field.value}
                      onChange={(id) => {
                        field.onChange(id)
                        form.setValue('programa', '')
                      }}
                      disabled={isSubmitting}
                      universidades={universidades}
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="programa"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Programa *</FieldLabel>
                    <SelectedProgram
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                      programas={programas}
                      universidadId={universidadSeleccionada}
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-teacher-email">Correo electrónico *</FieldLabel>
                  <Input {...field} id="edit-teacher-email" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Contraseña */}
            <Controller
              name="contrasenia"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-teacher-contrasenia">Nueva contraseña *</FieldLabel>
                  <Input {...field} id="edit-teacher-contrasenia" placeholder="est123" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
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
              disabled={isSubmitting}
              onClick={() => { handleReset(); setOpen(false) }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
