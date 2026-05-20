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
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createActivity } from "../actions/create-activity";
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
  idTeoria: number;
  handleCrear: (actividad: Actividad) => void;
};

export function DialogCreateActivityForm({ idTeoria, handleCrear }: Props) {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { nombre: "", url: "", disponible: false },
  });

  const handleReset = () => {
    form.reset({ nombre: "", url: "", disponible: false });
    setFormStatus({ status: "idle" });
  };

  async function onSubmit(data: FormData) {
    setFormStatus({ status: "submitting" });
    try {
      const response = await createActivity(data.nombre, data.url, data.disponible, idTeoria);

      if (!response.ok || !response.id) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al crear la actividad",
        });
        return;
      }

      toast.success("Actividad creada correctamente");
      handleCrear({ id: response.id, nombre: data.nombre, url: data.url, disponible: data.disponible });
      handleReset();
      setOpen(false);
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al crear la actividad",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) handleReset(); }}>
      <DialogTrigger asChild>
        <Button className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white">
          <Plus size={16} />
          Agregar Actividad
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Actividad</DialogTitle>
          <DialogDescription>
            Ingresa los datos de la nueva actividad.
          </DialogDescription>
        </DialogHeader>
        <form id="form-create-activity" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-activity-nombre">Nombre *</FieldLabel>
                  <Input
                    {...field}
                    id="form-create-activity-nombre"
                    placeholder="Actividad 1"
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
                  <FieldLabel htmlFor="form-create-activity-url">URL *</FieldLabel>
                  <Input
                    {...field}
                    id="form-create-activity-url"
                    placeholder="https://..."
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
                      id="form-create-activity-disponible"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={formStatus.status === "submitting"}
                      className="h-4 w-4 rounded border-gray-300 accent-[#3d1f8c]"
                    />
                    <FieldLabel htmlFor="form-create-activity-disponible" className="mb-0">
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
