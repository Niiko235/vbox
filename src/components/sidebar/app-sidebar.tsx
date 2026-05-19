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
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* <SidebarMenuItem className="flex items-center ">
              <div className="size-10 flex items-center justify-center bg-purple-600 rounded-full mr-3">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">MobiLab UA</h1>
                <span>{name}</span>
              </div>
            </SidebarMenuItem> */}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <Separator></Separator>
          <SidebarGroupLabel>Contenido</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {rutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
        <SidebarMenuButton onClick={handleLogout}>
          <LogOut /> Cerrar Sesión
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
