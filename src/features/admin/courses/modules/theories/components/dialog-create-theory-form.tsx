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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { toast } from "sonner";
import { createTheory } from "../actions/create-theory";
import type { Teoria } from "../actions/get-theories";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(20, "Máximo 20 caracteres"),
  contenido: z.string().min(1, "El contenido es requerido").max(255, "Máximo 255 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

type FormStatus = {
  status: "idle" | "submitting" | "error";
  message?: string;
};

type Props = {
  idModulo: number;
  handleCrear: (teoria: Teoria) => void;
};

export function DialogCreateTheoryForm({ idModulo, handleCrear }: Props) {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { nombre: "", contenido: "" },
  });

  const handleReset = () => {
    form.reset({ nombre: "", contenido: "" });
    setFormStatus({ status: "idle" });
  };

  async function onSubmit(data: FormData) {
    setFormStatus({ status: "submitting" });
    try {
      const response = await createTheory(data.nombre, data.contenido, idModulo);

      if (!response.ok || !response.id) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al crear la teoría",
        });
        return;
      }

      toast.success("Teoría creada correctamente");
      handleCrear({ id: response.id, nombre: data.nombre, contenido: data.contenido });
      handleReset();
      setOpen(false);
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al crear la teoría",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) handleReset(); }}>
      <DialogTrigger asChild>
        <Button className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white">
          <Plus size={16} />
          Agregar Teoría
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Teoría</DialogTitle>
          <DialogDescription>
            Ingresa el nombre y el contenido de la nueva teoría.
          </DialogDescription>
        </DialogHeader>
        <form id="form-create-theory" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-theory-nombre">Nombre *</FieldLabel>
                  <Input
                    {...field}
                    id="form-create-theory-nombre"
                    placeholder="Introducción"
                    autoComplete="off"
                    disabled={formStatus.status === "submitting"}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="contenido"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-theory-contenido">Contenido *</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-create-theory-contenido"
                      placeholder="Ingrese el contenido textual de la teoría..."
                      className="h-28 max-h-28 resize-none overflow-y-auto"
                      aria-invalid={fieldState.invalid}
                      disabled={formStatus.status === "submitting"}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/255 caracteres
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
