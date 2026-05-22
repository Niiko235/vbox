import { User, GraduationCap, Shield, Phone, Mail, Divide, IdCard, UserRoundKey } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getSesion } from "@/features/auth/actions/get-sesion"

export default async function Page() {

    const perfil = await getSesion();
    if (!perfil.sesion) {
        return(<h1 className="text-4xl font-bold tracking-tight">
            No se pudo cargar la información del perfil
        </h1>)
    }

    return (
        <div className="space-y-8 p-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">
                    Bienvenido al Panel de Administración
                </h1>
                <p className="text-muted-foreground text-lg">
                    Aquí puede administrar cursos, estudiantes, profesores y más. 
                    Use el menú de navegación para acceder a las diferentes secciones del panel.
                </p>
            </div>
            <div className="space-y-2">
                <Separator />
                <div className="pt-4">
                    <h2 className="text-2xl font-semibold">
                        Información del Perfil
                    </h2>
                    <p className="text-muted-foreground">
                        Información general del administrador
                    </p>
                </div>
            </div>
            <Card className="shadow-xl bg-[#3d1f8c]">
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
                            <div className="bg-violet-100 p-3 rounded-full">
                                <User className="text-[#3d1f8c]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#3d1f8c] font-bold ">
                                    Nombre Completo
                                </p>
                                <h3 className="text-lg">
                                    {perfil.sesion.name}
                                </h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
                            <div className="bg-violet-100 p-3 rounded-full">
                                <UserRoundKey className="text-[#3d1f8c]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#3d1f8c] font-bold">
                                    Rol
                                </p>
                                <h3 className="text-lg">
                                    {perfil.sesion.role}
                                </h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
                            <div className="bg-violet-100 p-3 rounded-full">
                                <IdCard className="text-[#3d1f8c]" /> </div>
                            <div>
                                <p className="text-sm text-[#3d1f8c] font-bold">
                                    Cedula
                                </p>
                                <h3 className="text-lg">
                                    {perfil.sesion.cedula}
                                </h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
                            <div className="bg-violet-100 p-3 rounded-full ">
                                <Mail className="text-[#3d1f8c]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#3d1f8c] font-bold">
                                    Email
                                </p>

                                <h3 className="text-lg">
                                    {perfil.sesion.email}
                                </h3>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}