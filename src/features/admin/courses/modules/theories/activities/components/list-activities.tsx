"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Actividad } from "../actions/get-activities";
import { DialogCreateActivityForm } from "./dialog-create-activity-form";
import { DialogEditActivityForm } from "./dialog-edit-activity-form";
import { AlertDialogDeleteActivity } from "./alert-dialog-delete-activity";

type Props = {
  idTeoria: number;
  initialActividades: Actividad[];
};

export function ListActivities({ idTeoria, initialActividades }: Props) {
  const [actividades, setActividades] = useState<Actividad[]>(initialActividades);

  const handleCrear = (actividad: Actividad) => {
    setActividades((prev) => [...prev, actividad]);
  };

  const handleEditar = (actividadActualizada: Actividad) => {
    setActividades((prev) =>
      prev.map((a) => (a.id === actividadActualizada.id ? actividadActualizada : a))
    );
  };

  const handleEliminar = (id: number) => {
    setActividades((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Actividades</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Agregue la cantidad de videos o enlaces a documentos que desee para complementar la teoría.
        </p>
      </div>

      <DialogCreateActivityForm idTeoria={idTeoria} handleCrear={handleCrear} />

      <div className="rounded-lg overflow-hidden border border-[#3d1f8c]">
        <Table>
          <TableHeader className="bg-[#3d1f8c]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-white font-semibold px-6 py-4">ID</TableHead>
              <TableHead className="text-white font-semibold px-6 py-4">Nombre</TableHead>
              <TableHead className="text-white font-semibold px-6 py-4">URL</TableHead>
              <TableHead className="text-white font-semibold px-6 py-4">Disponibilidad</TableHead>
              <TableHead className="text-white font-semibold px-6 py-4">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actividades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  <FileText size={36} strokeWidth={1.2} className="mx-auto mb-2 text-muted-foreground/40" />
                  No hay actividades creadas. Haga clic en &quot;Agregar Actividad&quot; para comenzar.
                </TableCell>
              </TableRow>
            ) : (
              actividades.map((actividad) => (
                <TableRow key={actividad.id}>
                  <TableCell className="px-6 py-4">{actividad.id}</TableCell>
                  <TableCell className="px-6 py-4 font-medium">{actividad.nombre}</TableCell>
                  <TableCell className="px-6 py-4 max-w-xs truncate">
                    <a
                      href={actividad.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3d1f8c] underline hover:text-[#2e1769]"
                    >
                      {actividad.url}
                    </a>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {actividad.disponible ? (
                      <Badge className="bg-green-100 text-green-700 border-green-300">Disponible</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">No disponible</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2">
                      <DialogEditActivityForm actividad={actividad} handleEditar={handleEditar} />
                      <AlertDialogDeleteActivity
                        id={actividad.id}
                        nombreActividad={actividad.nombre}
                        handleEliminar={handleEliminar}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
