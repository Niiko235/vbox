import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getSesion } from '@/features/auth/actions/get-sesion'
import { getCursosProfesor } from '@/features/profesor/cursos/actions/get-cursos-profesor'
import { ListCursos } from '@/features/profesor/cursos/components/list-cursos'

export default async function CursosProfesorPage() {
  const { sesion } = await getSesion()
  const cursos = sesion ? await getCursosProfesor(sesion.cedula) : []

  
  return (
    <>
      <Link href="./">
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <ArrowLeft size={20} className="mr-1" />
          <h1 className="text-xl">Home</h1>
        </div>
      </Link>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold">Mis Cursos</h1>
          <p className="text-muted-foreground mt-1">
            Estos son todos los cursos que tienes asignados actualmente.
          </p>
        </div>
        <ListCursos cursos={cursos} />
      </div>
    </>
  )
}
