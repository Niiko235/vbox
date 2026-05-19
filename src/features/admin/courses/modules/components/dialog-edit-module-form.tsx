"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { editModule } from "../actions/edit-module";
import type { Modulo } from "../actions/get-modules";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(20, "Máximo 20 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

type FormStatus = {
  status: "idle" | "submitting" | "error";
  message?: string;
};

type Props = {
  modulo: Modulo;
  handleEditar: (moduloActualizado: Modulo) => void;
};

export function DialogEditModuleForm({ modulo, handleEditar }: Props) {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [currentValues, setCurrentValues] = useState({ nombre: modulo.nombre });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentValues,
  });

  const handleReset = () => {
    form.reset(currentValues);
    setFormStatus({ status: "idle" });
  };

  async function onSubmit(data: FormData) {
    setFormStatus({ status: "submitting" });
    try {
      const response = await editModule(modulo.id, data.nombre);

      if (!response.ok) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al editar el módulo",
        });
        return;
      }

      toast.success("Módulo actualizado correctamente");
      setCurrentValues({ nombre: data.nombre });
      handleEditar({ ...modulo, nombre: data.nombre });
      setFormStatus({ status: "idle" });
      setOpen(false);
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al editar el módulo",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) handleReset(); }}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Módulo</DialogTitle>
          <DialogDescription>
            Modifica el nombre del módulo.
          </DialogDescription>
        </DialogHeader>
        <form id="form-edit-module" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-edit-module-nombre">
                    Nombre *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-edit-module-nombre"
                    autoComplete="off"
                    disabled={formStatus.status === "submitting"}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {formStatus.status === "error" && (
              <div className="text-sm text-red-600 border border-red-300 bg-red-50 rounded p-2">
                <p className="font-bold">¡ERROR!</p>
                <p>{formStatus.message}</p>
              </div>
            )}
          </FieldGroup>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              disabled={formStatus.status === "submitting"}
              onClick={() => { handleReset(); setOpen(false); }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={formStatus.status === "submitting"}>
              {formStatus.status === "submitting" ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
