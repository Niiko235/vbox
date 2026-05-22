import { getAllProfesores } from '@/features/admin/profesores/actions/get-all-profesores'
import { ListProfesores } from '@/features/admin/profesores/components/list-profesores'
import { getUniversidades } from '@/features/auth/actions/get-universidades'
import { getProgramas } from '@/features/auth/actions/get-programas'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function ProfesoresPage() {
  const [profesores, uniResult, progResult] = await Promise.all([
    getAllProfesores(),
    getUniversidades(),
    getProgramas(),
  ])

  return (
    <>
      <Link href={'./'}>
        <div className="flex items-center cursor-pointer hover:underline ml-4">
          <div className="size-5">
            <ArrowLeft size={20} className="mr-1" />
          </div>
          <div>
            <h1 className="text-xl">Inicio</h1>
          </div>
        </div>
      </Link>
      <div className="p-8 space-y-6">
        <ListProfesores
          initialProfesores={profesores}
          universidades={uniResult.data}
          programas={progResult.data}
        />
      </div>
    </>
  )
}
