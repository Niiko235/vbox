'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { logout } from '@/features/auth/actions/log-out'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { rutesAdmin, rutesStudent, rutesTeacher } from './routes'
import Image from 'next/image'

type AppSidebarProps = {
  role: 'student' | 'teacher' | 'admin'
}

type content = {
  title: string
  url: string
  icon: React.ElementType
}[]

export function AppSidebar({ role }: AppSidebarProps) {

  const rutes = (role === 'admin' ? rutesAdmin : role === 'teacher' ? rutesTeacher : rutesStudent) as content

  const router = useRouter()

  const handleLogout = async () => {
    const response = await logout()
    if (!response.ok) {
      console.error(response.error)
    } else {
      router.push('/')
    }
  }
  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0"
    >
      <div className="h-full flex flex-col justify-between bg-[#3d1f8c]">
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-md transition-all">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={70}
                  height={70}
                  className="shrink-0"
                />
                <div className="group-data-[collapsible=icon]:hidden">
                  <h1 className="font-bold text-[#3d1f8c] text-lg">
                    Virtual Box
                  </h1>
                  <p className="text-black text-sm">
                    Panel 
                    {role === 'admin' ? ' Administrativo' : role === 'teacher' ? ' Profesor' : ' Estudiante'}
                  </p>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <Separator></Separator>
            <SidebarGroupLabel className="text-white text-lg font-bold mt-4 mb-2">
              Contenido
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {rutes.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="text-white hover:bg-white rounded-lg">
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-md">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton
            onClick={handleLogout}
            className="text-white hover:bg-red-600 hover:text-white transition rounded-lg"
          >
            <LogOut />
            Cerrar Sesión
          </SidebarMenuButton>
        </SidebarFooter>
      </div>
    </Sidebar>
  )
}
