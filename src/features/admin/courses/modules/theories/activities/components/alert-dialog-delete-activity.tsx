"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteActivity } from "../actions/delete-activity";
import { toast } from "sonner";

type Props = {
  id: number;
  nombreActividad: string;
  handleEliminar: (id: number) => void;
};

type FormStatus = {
  status: "idle" | "loading" | "error";
  message?: string;
};

export function AlertDialogDeleteActivity({ id, nombreActividad, handleEliminar }: Props) {
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    setFormStatus({ status: "loading" });
    try {
      const response = await deleteActivity(id);

      if (!response.ok) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al eliminar la actividad",
        });
        return;
      }

      toast.success("Actividad eliminada correctamente");
      handleEliminar(id);
      setFormStatus({ status: "idle" });
      setIsOpen(false);
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al eliminar la actividad",
      });
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
          <Trash2 size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{`Eliminar "${nombreActividad}"`}</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de querer eliminar esta actividad? Esta acción no se
            podrá deshacer.
          </AlertDialogDescription>
          {formStatus.status === "error" && (
            <div className="text-red-600 mt-6 border border-red-300 bg-red-100 p-2 rounded-md">
              <h3 className="font-bold">¡ERROR!</h3>
              <p>{formStatus.message}</p>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={formStatus.status === "loading"}>
            Cancelar
          </AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            disabled={formStatus.status === "loading"}
            onClick={handleDelete}
          >
            {formStatus.status === "loading" ? "Eliminando..." : "Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
