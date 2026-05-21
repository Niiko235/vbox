'use client'

import { Controller, useForm, useWatch } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

import { SelectedUni } from './selected-uni'
import { SelectedProgram } from './selected-program'

// import { register } from "@/features/auth/actions/register";

const formSchema = z.object({
  primernombre: z
    .string()
    .min(1, 'El primer nombre es requerido')
    .max(15, 'El primer nombre no puede tener más de 15 caracteres'),
  segundonombre: z
    .string()
    .max(30, 'El segundo nombre no puede tener más de 30 caracteres')
    .optional(),
  primerapellido: z
    .string()
    .min(1, 'El primer apellido es requerido')
    .max(15, 'El primer apellido no puede tener más de 15 caracteres'),
  segundoapellido: z
    .string()
    .max(30, 'El segundo apellido no puede tener más de 30 caracteres')
    .optional(),
  cedula: z
    .string()
    .min(1, 'La cédula es requerida')
    .max(18, 'La cédula no puede tener más de 18 caracteres'),
  fechanacimiento: z.string().min(1, 'La fecha de nacimiento es requerida'),
  email: z.email('El correo electrónico no es válido'),
  numerotelefono: z
    .string()
    .min(1, 'El número de teléfono es requerido')
    .max(10, 'El número de teléfono no puede tener más de 10 caracteres'),
  contrasenia: z
    .string()
    .min(1, 'La contraseña es requerida')
    .max(10, 'La contraseña no puede tener más de 10 caracteres'),
  confirmarcontrasenia: z
    .string()
    .min(1, 'La confirmación de contraseña es requerida')
    .max(
      10,
      'La confirmación de contraseña no puede tener más de 10 caracteres'
    ),
  universidad: z.string().min(1, 'Debes seleccionar una universidad'),
  programa: z.string().min(1, 'Debes seleccionar un programa'),
}).refine((data) => data.contrasenia === data.confirmarcontrasenia, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmarcontrasenia'],
})

type Universidad = { id: number; nombre: string }
type Programa = { id: number; nombre: string; id_universidad: number }

type props = {
  onSwitch: () => void
  universidades: Universidad[]
  programas: Programa[]
}

type FormValues = z.infer<typeof formSchema>

type FormStatus = {
  status: 'idle' | 'loading' | 'error'
  error?: string
}

export default function RegisterForm({
  onSwitch,
  universidades,
  programas,
}: props) {
  const router = useRouter()
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primernombre: '',
      segundonombre: '',
      primerapellido: '',
      segundoapellido: '',
      cedula: '',
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

  async function onSubmit(values: FormValues) {
    console.log(values)
    // setFormStatus({ status: 'loading' })
    // const response = await register(values.email, values.password);
    // if (!response.ok) {
    //   setFormStatus({
    //     status: "error",
    //     error: response.error ?? "Error al iniciar sesión",
    //   });
    // } else {
    //   setFormStatus({ status: "idle" });
    //   router.push("/dashboard");
    // }
  }

  return (
    <>
      <form id="form-register" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="primernombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-primernombre">
                    Primer nombre *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-primernombre"
                    aria-invalid={fieldState.invalid}
                    placeholder="Fernando"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                </Field>
              )}
            />

            <Controller
              name="segundonombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-segundonombre">
                    Segundo nombre
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-segundonombre"
                    aria-invalid={fieldState.invalid}
                    placeholder="Valderrama"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                </Field>
              )}
            />
            <Controller
              name="primerapellido"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-primerapellido">
                    Primer apellido *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-primerapellido"
                    aria-invalid={fieldState.invalid}
                    placeholder="Fernando"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                </Field>
              )}
            />

            <Controller
              name="segundoapellido"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-segundoapellido">
                    Segundo apellido
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-segundoapellido"
                    aria-invalid={fieldState.invalid}
                    placeholder="Valderrama"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                </Field>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Controller
              name="cedula"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-cedula">
                    Cédula *
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="form-register-cedula"
                    aria-invalid={fieldState.invalid}
                    placeholder="1117324534"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                </Field>
              )}
            />
            <Controller
              name="numerotelefono"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-numerotelefono">
                    Número teléfono *
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="form-register-numerotelefono"
                    aria-invalid={fieldState.invalid}
                    placeholder="3214567890"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                </Field>
              )}
            />
            <Controller
              name="fechanacimiento"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-fechanacimiento">
                    Fecha Nacimiento *
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="form-register-fechanacimiento"
                        className="w-full justify-start text-left text-black"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : 'dd/mm/yyyy'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        disabled={formStatus.status == 'loading'}
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {/* {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )} */}
                </Field>
              )}
            />
          </div>

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
                    disabled={formStatus.status === 'loading'}
                    universidades={universidades}
                  />
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
                    disabled={formStatus.status === 'loading'}
                    programas={programas}
                    universidadId={universidadSeleccionada}
                  />
                </Field>
              )}
            />
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-register-email">
                  Correo electronico
                </FieldLabel>
                <Input
                  {...field}
                  id="form-register-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="vbox@example.com"
                  autoComplete="off"
                  disabled={formStatus.status === 'loading'}
                  className="bg-gray-800 border-gray-500"
                />
              </Field>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="contrasenia"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-contrasenia">
                    Contraseña*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-contrasenia"
                    placeholder="est123"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                </Field>
              )}
            />
            <Controller
              name="confirmarcontrasenia"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-confirmarcontrasenia">
                    Confirmar Contraseña *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-confirmarcontrasenia"
                    placeholder="est123"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                </Field>
              )}
            />
          </div>
        </FieldGroup>

        {formStatus.status === 'error' && (
          <p className="text-sm font-medium text-destructive">
            {formStatus.error}
          </p>
        )}
        <Button
          type="submit"
          className="bg-white text-black mt-6 w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          disabled={formStatus.status === 'loading'}
        >
          {formStatus.status === 'loading' ? 'Registrandose...' : 'Registrarse'}
        </Button>
      </form>

      <p className="text-center text-sm mt-2 text-slate-400">
        ¿Ya tienes cuenta?{' '}
        <button
          onClick={onSwitch}
          className="text-white font-bold underline hover:cursor-pointer"
        >
          Inicia sesión aquí
        </button>
      </p>
    </>
  )
}
