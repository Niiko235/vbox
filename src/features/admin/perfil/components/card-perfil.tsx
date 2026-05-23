import { Card, CardContent } from "@/components/ui/card";
import { tipo_rol } from "@/types/db";
import {
  Binary,
  CalendarFold,
  IdCard,
  Mail,
  NotepadText,
  School,
  Smartphone,
  University,
  User,
  UserRoundKey,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Props = {
  Perfil: {
    pkcc: string;
    primernombre: string;
    segundonombre: string | null;
    primerapellido: string;
    segundoapellido: string | null;
    rol: tipo_rol;
    fechanacimiento: string;
    telefono: string | null;
    email: string;
    codigoprograma: number | null;
    nombreprograma: string | null;
    codigouniversidad: number | null;
    nombreuniversidad: string | null;
  };
};

export default function CardPerfil({ Perfil }: Props) {
  return (
    <div className="space-y-4 p-4 ">
      <div className="space-y-1">
        <h2 className="text-4xl font-bold">Información del Perfil</h2>
        <p className="text-sm text-gray-500 pt-2">Gestione la información privada</p>
      </div>
      <Card className="shadow-xl bg-gradient-to-b from-[#5b21b6] via-[#3d1f8c] to-black">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full">
                <IdCard className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">Cedula</p>
                <h3 className="text-lg">{Perfil.pkcc}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full">
                <User className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold ">
                  Nombre Completo
                </p>
                <h3 className="text-lg">
                  {Perfil.primernombre} {Perfil.segundonombre}
                  {Perfil.primerapellido} {Perfil.segundoapellido}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full">
                <UserRoundKey className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">Rol</p>
                <h3 className="text-lg">{Perfil.rol}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full">
                <CalendarFold className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">
                  Fecha de Nacimiento
                </p>
                <h3 className="text-lg">
                  {new Date(Perfil.fechanacimiento).toLocaleDateString(
                    "es-CO",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full ">
                <Smartphone className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">
                  Número de Teléfono
                </p>
                <h3 className="text-lg">{Perfil.telefono}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full ">
                <Mail className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">Email</p>
                <h3 className="text-lg">{Perfil.email}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full ">
                <Binary className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">
                  Codigo Programa
                </p>
                <h3 className="text-lg">{Perfil.codigoprograma}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full ">
                <NotepadText className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">
                  Nombre Programa
                </p>
                <h3 className="text-lg">{Perfil.nombreprograma}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full ">
                <School className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">
                  Codigo Universidad
                </p>
                <h3 className="text-lg">{Perfil.codigouniversidad}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white">
              <div className="bg-violet-100 p-3 rounded-full ">
                <University className="text-[#3d1f8c]" />
              </div>
              <div>
                <p className="text-sm text-[#3d1f8c] font-bold">
                  Nombre Universidad
                </p>
                <h3 className="text-lg">{Perfil.nombreuniversidad}</h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
