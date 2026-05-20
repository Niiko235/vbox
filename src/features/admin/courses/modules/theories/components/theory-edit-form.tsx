"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { editTheory } from "../actions/edit-theory";
import type { Teoria } from "../actions/get-theories";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(20, "Máximo 20 caracteres"),
  contenido: z.string().min(1, "El contenido es requerido"),
});

type FormData = z.infer<typeof formSchema>;

type FormStatus = {
  status: "idle" | "submitting" | "error";
  message?: string;
};

type Props = {
  teoria: Teoria;
};

export function TheoryEditForm({ teoria }: Props) {
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [currentValues, setCurrentValues] = useState({
    nombre: teoria.nombre,
    contenido: teoria.contenido,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentValues,
  });

  async function onSubmit(data: FormData) {
    setFormStatus({ status: "submitting" });
    try {
      const response = await editTheory(teoria.id, data.nombre, data.contenido);

      if (!response.ok) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al guardar la teoría",
        });
        return;
      }

      setCurrentValues({ nombre: data.nombre, contenido: data.contenido });
      setFormStatus({ status: "idle" });
      toast.success("Teoría guardada correctamente");
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al guardar la teoría",
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="nombre"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="theory-edit-nombre">Nombre</FieldLabel>
              <Input
                {...field}
                id="theory-edit-nombre"
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
              <FieldLabel htmlFor="theory-edit-contenido">Contenido de la Teoría</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="theory-edit-contenido"
                  placeholder="Ingrese el contenido textual de la teoría..."
                  className="min-h-52 resize-y overflow-y-auto"
                  aria-invalid={fieldState.invalid}
                  disabled={formStatus.status === "submitting"}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length} caracteres
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

      <Button
        type="submit"
        className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white uppercase font-bold tracking-wide"
        disabled={formStatus.status === "submitting"}
      >
        {formStatus.status === "submitting" ? "Guardando..." : "Guardar Contenido"}
      </Button>
    </form>
  );
}
