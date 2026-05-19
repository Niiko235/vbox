import { redirect } from 'next/navigation'
import { getSesion } from '@/features/auth/actions/get-sesion'
import type { Metadata } from 'next'
import { rutesAdmin } from '@/components/sidebar/routes'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
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

  if (userRole.sesion.role === 'profesor') {
    redirect('/home')
  }
  if (userRole.sesion.role === 'estudiante') {
    redirect('/dashboard')
  }

  return (
    <SidebarProvider>
      <AppSidebar content={rutesAdmin} />
      <SidebarTrigger />
      <Toaster />
      <main className="w-full mt-2">{children}</main>
    </SidebarProvider>
  )
}
