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
import { login } from '../actions/login'

const formSchema = z.object({
  email: z.string().min(1, {
    message: 'Debes ingresar el correo electrónico para ingresar.',
  }),
  password: z.string().min(1, {
    message: 'Debes ingresar la contraseña para ingresar.',
  }),
})

type FormValues = z.infer<typeof formSchema>

type FormStatus = {
  status: 'idle' | 'loading' | 'error'
  error?: string
}

type props = {
  onSwitch: () => void
}

export default function LoginForm({ onSwitch }: props) {
  const router = useRouter()
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: 'idle' })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: FormValues) {
    setFormStatus({ status: 'loading' })
    const response = await login({
      email: values.email,
      password: values.password,
    })
    if (!response.ok) {
      setFormStatus({
        status: 'error',
        error: response.error ?? 'Error al iniciar sesión',
      })
      return
    }
    setFormStatus({ status: 'idle' })
    router.refresh()
    if (response.data?.role === 'administrador') {
      router.push('/inicio/')
    } else if (response.data?.role === 'profesor') {
      router.push('/home')
    } else if (response.data?.role === 'estudiante') {
      router.push('/dashboard')
    }
  }

  return (
    <>
      <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-login-email">
                  Correo electronico
                </FieldLabel>
                <Input
                  {...field}
                  id="form-login-email"
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
                <FieldLabel htmlFor="form-login-password">
                  Contraseña
                </FieldLabel>
                <Input
                  {...field}
                  id="form-login-password"
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
          {formStatus.status === 'loading' ? 'Accediendo...' : 'Acceder'}
        </Button>
      </form>

      <p className="text-center text-sm mt-6 text-slate-400">
        ¿No tienes cuenta?{' '}
        <button
          onClick={onSwitch}
          className="text-white font-bold underline hover:cursor-pointer"
        >
          Regístrate aquí
        </button>
      </p>
    </>
  )
}
