'use client'

import { useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Plus, CalendarIcon } from 'lucide-react'
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

import { createTeacher } from '../actions/create-teacher'
import type { Profesor } from '../actions/get-all-profesores'

// ─── Schema ───────────────────────────────────────────────────────────────────

const formSchema = z
  .object({
    cedula: z.string().min(1, 'La cédula es requerida').max(18, 'Máximo 18 caracteres'),
    primernombre: z.string().min(1, 'El primer nombre es requerido').max(15, 'Máximo 15 caracteres'),
    segundonombre: z.string().max(30, 'Máximo 30 caracteres').optional(),
    primerapellido: z.string().min(1, 'El primer apellido es requerido').max(15, 'Máximo 15 caracteres'),
    segundoapellido: z.string().max(30, 'Máximo 30 caracteres').optional(),
    fechanacimiento: z.string().min(1, 'La fecha de nacimiento es requerida'),
    email: z.string().email('El correo electrónico no es válido'),
    numerotelefono: z.string().min(1, 'El teléfono es requerido').max(10, 'Máximo 10 caracteres'),
    contrasenia: z.string().min(1, 'La contraseña es requerida').max(10, 'Máximo 10 caracteres'),
    confirmarcontrasenia: z.string().min(1, 'Debes confirmar la contraseña'),
    universidad: z.string().min(1, 'Debes seleccionar una universidad'),
    programa: z.string().min(1, 'Debes seleccionar un programa'),
  })
  .refine((data) => data.contrasenia === data.confirmarcontrasenia, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmarcontrasenia'],
  })

type FormValues = z.infer<typeof formSchema>

type FormStatus = {
  status: 'idle' | 'submitting' | 'error'
  message?: string
}

// ─── Tipos reutilizados de auth ───────────────────────────────────────────────

type Universidad = { id: number; nombre: string }
type Programa = { id: number; nombre: string; id_universidad: number }

type Props = {
  universidades: Universidad[]
  programas: Programa[]
  handleCrear: (profesor: Profesor) => void
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function DialogCreateTeacherForm({ universidades, programas, handleCrear }: Props) {
  const [open, setOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cedula: '',
      primernombre: '',
      segundonombre: '',
      primerapellido: '',
      segundoapellido: '',
      fechanacimiento: '',
      email: '',
      numerotelefono: '',
      contrasenia: '',
      confirmarcontrasenia: '',
      universidad: '',
      programa: '',
    },
  })

  const universidadSeleccionada = useWatch({ control: form.control, name: 'universidad' })

  const handleReset = () => {
    form.reset()
    setFormStatus({ status: 'idle' })
  }

  async function onSubmit(values: FormValues) {
    setFormStatus({ status: 'submitting' })
    try {
      const response = await createTeacher({
        cedula: values.cedula,
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

      toast.success('Profesor registrado correctamente')
      handleCrear(response.data)
      handleReset()
      setOpen(false)
    } catch {
      setFormStatus({ status: 'error', message: 'Error desconocido al registrar el profesor.' })
    }
  }

  const isSubmitting = formStatus.status === 'submitting'

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) handleReset() }}>
      <DialogTrigger asChild>
        <Button className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white">
          <Plus size={16} />
          Crear Profesor
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Profesor</DialogTitle>
          <DialogDescription>
            Completa el formulario para registrar un nuevo profesor en el sistema.
          </DialogDescription>
        </DialogHeader>

        <form id="form-create-teacher" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            {/* Nombres */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="primernombre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher-primernombre">Primer nombre *</FieldLabel>
                    <Input {...field} id="teacher-primernombre" placeholder="Juan" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="segundonombre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher-segundonombre">Segundo nombre</FieldLabel>
                    <Input {...field} id="teacher-segundonombre" placeholder="David" autoComplete="off" disabled={isSubmitting} />
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
                    <FieldLabel htmlFor="teacher-primerapellido">Primer apellido *</FieldLabel>
                    <Input {...field} id="teacher-primerapellido" placeholder="Narvaez" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="segundoapellido"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher-segundoapellido">Segundo apellido</FieldLabel>
                    <Input {...field} id="teacher-segundoapellido" placeholder="Sepulveda" autoComplete="off" disabled={isSubmitting} />
                  </Field>
                )}
              />
            </div>

            {/* Cédula, teléfono y fecha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="cedula"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher-cedula">Cédula *</FieldLabel>
                    <Input {...field} id="teacher-cedula" type="number" placeholder="1117324534" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="numerotelefono"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher-telefono">Teléfono *</FieldLabel>
                    <Input {...field} id="teacher-telefono" type="number" placeholder="3214567890" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="fechanacimiento"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher-fecha">Fecha Nacimiento *</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="teacher-fecha"
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
                  <FieldLabel htmlFor="teacher-email">Correo electrónico *</FieldLabel>
                  <Input {...field} id="teacher-email" placeholder="juan@gmail.com" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Contraseñas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="contrasenia"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher-contrasenia">Contraseña *</FieldLabel>
                    <Input {...field} id="teacher-contrasenia" placeholder="est123" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="confirmarcontrasenia"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher-confirmar">Confirmar Contraseña *</FieldLabel>
                    <Input {...field} id="teacher-confirmar" placeholder="est123" autoComplete="off" disabled={isSubmitting} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

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
