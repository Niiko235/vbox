import { BookOpenText, ChartLine, CircleUser, User } from 'lucide-react'

// Rutas del menu para docentes.
export const rutesTeacher = [
  {
    title: 'Grupos',
    url: '/home/grupos',
    icon: BookOpenText,
  },
  {
    title: 'Estadísticas',
    url: '/home/estadisticas',
    icon: ChartLine,
  },
  {
    title: 'Perfil',
    url: '/home/perfil',
    icon: CircleUser,
  },
]

export const rutesAdmin = [
  {
    title: 'Profesores',
    url: '/inicio/profesores',
    icon: User,
  },
  {
    title: 'Cursos',
    url: '/inicio/cursos',
    icon: BookOpenText,
  },
  {
    title: 'Estadísticas',
    url: '/inicio/estadisticas',
    icon: ChartLine,
  },
  {
    title: 'Perfil',
    url: '/inicio/perfil',
    icon: CircleUser,
  },
]

export const rutesStudent = [
  {
    title: 'Perfil',
    url: '/dashboard/perfil',
    icon: CircleUser,
  },
]
