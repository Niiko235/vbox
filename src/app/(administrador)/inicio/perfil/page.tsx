import { getPerfil } from "@/features/admin/perfil/actions/get-perfil";
import CardPerfil from "@/features/admin/perfil/components/card-perfil";
import { getSesion } from "@/features/auth/actions/get-sesion";

export default async function Page() {
    const perfil = await getSesion();
    if (!perfil.sesion) {
        return(<h1 className="text-4xl font-bold tracking-tight">
            No se pudo cargar la información del perfil
        </h1>)
    }
    const response = await getPerfil(perfil.sesion.cedula);
    if (!response) {
        return(<h1 className="text-4xl font-bold tracking-tight">
            No se pudo cargar la información del perfil
        </h1>)}
    return (
        <div className="space-y-8 p-8">
            <CardPerfil Perfil ={response} />
        </div>
    )
}