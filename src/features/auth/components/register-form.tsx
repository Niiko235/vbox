'use client'

import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import {
  Field,
  FieldError,
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
  nombres: z.string().min(1, {
    message: 'Debes ingresar tu nombre para registrarte.',
  }),

  apellidos: z.string().min(1, {
    message: 'Debes ingresar tu apellido para registrarte.',
  }),

  numeroTelefono: z.string().min(1, {
    message: 'Debes ingresar el número de teléfono para registrarte.',
  }),
  cedula: z.string().min(1, {
    message: 'Debes ingresar la cédula para registrarte.',
  }),
  universidad: z.string().min(1, {
    message: 'Debes seleccionar una universidad para registrarte.',
  }),
  fechaNacimiento: z.string().min(1, {
    message: 'Debes ingresar la fecha de nacimiento para registrarte.',
  }),
  programa: z.string().min(1, {
    message: 'Debes seleccionar un programa para registrarte.',
  }),
  email: z.string().min(1, {
    message: 'Debes ingresar el correo electrónico para ingresar.',
  }),
  password: z.string().min(1, {
    message: 'Debes ingresar la contraseña para ingresar.',
  }),
})

type props = {
  onSwitch: () => void
}

type FormValues = z.infer<typeof formSchema>

type FormStatus = {
  status: 'idle' | 'loading' | 'error'
  error?: string
}

export default function RegisterForm({ onSwitch }: props) {
  const router = useRouter()
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: '',
      apellidos: '',
      numeroTelefono: '',
      cedula: '',
      universidad: '',
      fechaNacimiento: undefined,
      programa: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: FormValues) {
    setFormStatus({ status: 'loading' })
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
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="nombres"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-nombres">
                    Nombres *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-nombres"
                    aria-invalid={fieldState.invalid}
                    placeholder="Fernando"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="apellidos"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-apellidos">
                    Apellidos *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-apellidos"
                    aria-invalid={fieldState.invalid}
                    placeholder="Valderrama"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="numeroTelefono"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-numero-telefono">
                    Número de teléfono *
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="form-register-numero-telefono"
                    aria-invalid={fieldState.invalid}
                    placeholder="3214567890"
                    autoComplete="off"
                    disabled={formStatus.status === 'loading'}
                    className="bg-gray-800 border-gray-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="universidad"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Universidad *</FieldLabel>
                <SelectedUni
                  value={field.value}
                  onChange={field.onChange}
                  disabled={formStatus.status === 'loading'}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input de la fecha nacimiento */}
            <Controller
              name="fechaNacimiento"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-fecha-nacimiento">
                    Fecha de Nacimiento *
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="form-register-fecha-acimiento"
                        className="w-full justify-start text-left text-black"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : 'Selecciona una fecha'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        disabled={formStatus.status == 'loading'}
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-register-password">
                  Contraseña
                </FieldLabel>
                <Input
                  {...field}
                  id="form-register-password"
                  placeholder="••••••••"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  disabled={formStatus.status === 'loading'}
                  className="bg-gray-800 border-gray-500"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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

      <p className="text-center text-sm mt-6 text-slate-400">
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
