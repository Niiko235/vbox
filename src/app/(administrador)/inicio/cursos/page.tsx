import { getAllCourses } from '@/features/admin/courses/actions/get-all-courses'
import { ListCourses } from '@/features/admin/courses/components/list-courses'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function CursosPage() {
  const cursos = await getAllCourses()

  return (
    <>
      <Link href="./" className="flex items-center gap-2 ml-4 mt-2 text-muted-foreground hover:underline w-fit">
        <ArrowLeft size={18} />
        <span>Regresar al inicio</span>
      </Link>
      <div className="p-8">
        <ListCourses initialCursos={cursos} />
      </div>
    </>
  )
}
