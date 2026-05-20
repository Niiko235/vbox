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
import { editActivity } from "../actions/edit-activity";
import type { Actividad } from "../actions/get-activities";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(20, "Máximo 20 caracteres"),
  url: z.string().min(1, "La URL es requerida").url("Debe ser una URL válida"),
  disponible: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

type FormStatus = {
  status: "idle" | "submitting" | "error";
  message?: string;
};

type Props = {
  actividad: Actividad;
  handleEditar: (actividadActualizada: Actividad) => void;
};

export function DialogEditActivityForm({ actividad, handleEditar }: Props) {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [currentValues, setCurrentValues] = useState({
    nombre: actividad.nombre,
    url: actividad.url,
    disponible: actividad.disponible,
  });

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
      const response = await editActivity(actividad.id, data.nombre, data.url, data.disponible);

      if (!response.ok) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al editar la actividad",
        });
        return;
      }

      toast.success("Actividad actualizada correctamente");
      const updated = { ...actividad, nombre: data.nombre, url: data.url, disponible: data.disponible };
      setCurrentValues({ nombre: data.nombre, url: data.url, disponible: data.disponible });
      handleEditar(updated);
      setFormStatus({ status: "idle" });
      setOpen(false);
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al editar la actividad",
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
          <DialogTitle>Editar Actividad</DialogTitle>
          <DialogDescription>
            Modifica los datos de la actividad.
          </DialogDescription>
        </DialogHeader>
        <form id="form-edit-activity" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-edit-activity-nombre">Nombre *</FieldLabel>
                  <Input
                    {...field}
                    id="form-edit-activity-nombre"
                    autoComplete="off"
                    disabled={formStatus.status === "submitting"}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-edit-activity-url">URL *</FieldLabel>
                  <Input
                    {...field}
                    id="form-edit-activity-url"
                    autoComplete="off"
                    disabled={formStatus.status === "submitting"}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="disponible"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="form-edit-activity-disponible"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={formStatus.status === "submitting"}
                      className="h-4 w-4 rounded border-gray-300 accent-[#3d1f8c]"
                    />
                    <FieldLabel htmlFor="form-edit-activity-disponible" className="mb-0">
                      Disponible para estudiantes
                    </FieldLabel>
                  </div>
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
