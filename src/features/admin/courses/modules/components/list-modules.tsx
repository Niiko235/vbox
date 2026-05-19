"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Modulo } from "../actions/get-modules";
import { DialogCreateModuleForm } from "./dialog-create-module-form";
import { DialogEditModuleForm } from "./dialog-edit-module-form";
import { AlertDialogDeleteModule } from "./alert-dialog-delete-module";

type Props = {
  idCurso: number;
  initialModulos: Modulo[];
};

export function ListModules({ idCurso, initialModulos }: Props) {
  const [modulos, setModulos] = useState<Modulo[]>(initialModulos);

  const handleCrear = (modulo: Modulo) => {
    setModulos((prev) => [...prev, modulo]);
  };

  const handleEditar = (moduloActualizado: Modulo) => {
    setModulos((prev) =>
      prev.map((m) => (m.id === moduloActualizado.id ? moduloActualizado : m))
    );
  };

  const handleEliminar = (id: number) => {
    setModulos((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <DialogCreateModuleForm idCurso={idCurso} handleCrear={handleCrear} />

      {modulos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <FileText size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">No hay módulos registrados</p>
          <p className="text-sm">Haz clic en &quot;Agregar Módulo&quot; para agregar uno nuevo</p>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border border-[#3d1f8c]">
          <Table>
            <TableHeader className="bg-[#3d1f8c]">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-white font-semibold px-6 py-4">Módulo</TableHead>
                <TableHead className="text-white font-semibold px-6 py-4">Administrar</TableHead>
                <TableHead className="text-white font-semibold px-6 py-4">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modulos.map((modulo) => (
                <TableRow key={modulo.id}>
                  <TableCell className="px-6 py-4 font-medium">{modulo.nombre}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Button
                      asChild
                      className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white font-semibold"
                    >
                      <Link href={`/inicio/cursos/${idCurso}/modulos/${modulo.id}`}>
                        Administrar Teorías
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2">
                      <DialogEditModuleForm modulo={modulo} handleEditar={handleEditar} />
                      <AlertDialogDeleteModule
                        id={modulo.id}
                        nombreModulo={modulo.nombre}
                        handleEliminar={handleEliminar}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
