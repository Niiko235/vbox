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
import type { Teoria } from "../actions/get-theories";
import { DialogCreateTheoryForm } from "./dialog-create-theory-form";
import { AlertDialogDeleteTheory } from "./alert-dialog-delete-theory";

type Props = {
  idModulo: number;
  idCurso: number;
  initialTeorias: Teoria[];
};

export function ListTheories({ idModulo, idCurso, initialTeorias }: Props) {
  const [teorias, setTeorias] = useState<Teoria[]>(initialTeorias);

  const handleCrear = (teoria: Teoria) => {
    setTeorias((prev) => [...prev, teoria]);
  };

  const handleEliminar = (id: number) => {
    setTeorias((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <DialogCreateTheoryForm idModulo={idModulo} handleCrear={handleCrear} />

      {teorias.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <FileText size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
          <p className="font-medium">No hay teorías registradas</p>
          <p className="text-sm">Haz clic en &quot;Agregar Teoría&quot; para agregar una nueva</p>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border border-[#3d1f8c]">
          <Table>
            <TableHeader className="bg-[#3d1f8c]">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-white font-semibold px-6 py-4">Teoría</TableHead>
                <TableHead className="text-white font-semibold px-6 py-4">Administrar</TableHead>
                <TableHead className="text-white font-semibold px-6 py-4">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teorias.map((teoria) => (
                <TableRow key={teoria.id}>
                  <TableCell className="px-6 py-4 font-medium">{teoria.nombre}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Button
                      asChild
                      className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white font-semibold"
                    >
                      <Link href={`/inicio/cursos/${idCurso}/${idModulo}/${teoria.id}`}>
                        Administrar Información
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <AlertDialogDeleteTheory
                      id={teoria.id}
                      nombreTeoria={teoria.nombre}
                      handleEliminar={handleEliminar}
                    />
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
