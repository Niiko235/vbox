import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getSesion } from '@/features/auth/actions/get-sesion'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { rutesStudent } from '@/components/sidebar/routes'
const APP_NAME = 'VBox'

export const metadata: Metadata = {
  title: {
    template: '%s | ' + APP_NAME,
    default: APP_NAME,
  },
  description: 'VBox',
}
export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userRole = await getSesion()

  if (!userRole.sesion) {
    return (
      <>
        <div>
          <h1 className="text-2xl font-bold text-center mt-10">
            No has iniciado sesión
          </h1>
        </div>
      </>
    )
  }

  if (userRole.sesion.role === 'estudiante') {
    redirect('/dashboard')
  }
  if (userRole.sesion.role === 'administrador') {
    redirect('/inicio')
  }

  return (
    <SidebarProvider>
      <AppSidebar role={'teacher'} />
      <SidebarTrigger />
      <Toaster />
      <main className="w-full mt-2">{children}</main>
    </SidebarProvider>
  )
}
