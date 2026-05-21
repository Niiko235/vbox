'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import LoginForm from './login-form'
import RegisterForm from './register-form'

const ease = [0.77, 0, 0.175, 1] as const

type Universidad = { id: number; nombre: string }
type Programa = { id: number; nombre: string; id_universidad: number }

type Props = {
  universidades: Universidad[]
  programas: Programa[]
}

export function AuthCardDesktop({ universidades, programas }: Props) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Card className="overflow-hidden border-0 shadow-xl p-0 w-full max-w-5xl">
      <CardContent className="relative grid grid-cols-2 gap-0 p-0 min-h-160">
        {/* Panel branding — se mueve de izquierda a derecha */}
        <motion.section
          className="flex flex-col items-center justify-center bg-white px-12 py-16 absolute inset-y-0 w-1/2"
          animate={{ left: isLogin ? '0%' : '50%' }}
          transition={{ duration: 0.7, ease }}
        >
          <Image
            src="/Logo.svg"
            width={180}
            height={180}
            priority
            alt="Logo VirtualBox"
            className="mx-auto mb-6"
          />
          <h1 className="text-center text-4xl font-bold mb-3">VirtualBox</h1>
          <p className="text-center text-muted-foreground max-w-xs">
            Plataforma Educativa para Aprender UML de forma interactiva
          </p>
        </motion.section>

        {/* Panel formulario — se mueve de derecha a izquierda */}
        <motion.section
          className="flex flex-col justify-center px-10 py-12 bg-linear-to-t from-black to-[#2D086E] text-white absolute inset-y-0 w-1/2"
          animate={{ left: isLogin ? '50%' : '0%' }}
          transition={{ duration: 0.7, ease }}
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-4xl font-bold">Iniciar Sesión</h2>
                  <p className="text-slate-400 mt-1">
                    Accede a tu cuenta para continuar
                  </p>
                </div>
                <LoginForm onSwitch={() => setIsLogin(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <h2 className="text-3xl font-bold">Registrarse</h2>
                  <p className="text-slate-400 mt-1">
                    Crea tu cuenta para acceder a la plataforma
                  </p>
                </div>
                <RegisterForm
                  onSwitch={() => setIsLogin(true)}
                  universidades={universidades}
                  programas={programas}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </CardContent>
    </Card>
  )
}
