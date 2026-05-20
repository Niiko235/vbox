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
import { deleteTheory } from "../actions/delete-theory";
import { toast } from "sonner";

type Props = {
  id: number;
  nombreTeoria: string;
  handleEliminar: (id: number) => void;
};

type FormStatus = {
  status: "idle" | "loading" | "error";
  message?: string;
};

export function AlertDialogDeleteTheory({ id, nombreTeoria, handleEliminar }: Props) {
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    setFormStatus({ status: "loading" });
    try {
      const response = await deleteTheory(id);

      if (!response.ok) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al eliminar la teoría",
        });
        return;
      }

      toast.success("Teoría eliminada correctamente");
      handleEliminar(id);
      setFormStatus({ status: "idle" });
      setIsOpen(false);
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al eliminar la teoría",
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
          <AlertDialogTitle>{`Eliminar "${nombreTeoria}"`}</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de querer eliminar esta teoría? Esta acción no se
            podrá deshacer y perderás toda la información relacionada.
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
