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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { editCourse } from "../actions/edit-course";
import type { Curso } from "../actions/get-all-courses";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
});

type FormData = z.infer<typeof formSchema>;

type FormStatus = {
  status: "idle" | "submitting" | "error";
  message?: string;
};

type Props = {
  curso: Curso;
  handleEditar: (cursoActualizado: Curso) => void;
};

export function DialogEditCourseForm({ curso, handleEditar }: Props) {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [currentValues, setCurrentValues] = useState({ nombre: curso.nombre, descripcion: curso.descripcion });

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
      const response = await editCourse({
        id: curso.id,
        nombre: data.nombre,
        descripcion: data.descripcion,
      });

      if (!response.ok) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al editar el curso",
        });
        return;
      }

      toast.success("Curso actualizado correctamente");
      const newCurso: Curso = { ...curso, nombre: data.nombre, descripcion: data.descripcion };
      setCurrentValues({ nombre: data.nombre, descripcion: data.descripcion });
      handleEditar(newCurso);
      setFormStatus({ status: "idle" });
      setOpen(false);
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al editar el curso",
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
          <DialogTitle>Editar Curso</DialogTitle>
          <DialogDescription>
            Modifica los datos del curso. El ID no puede cambiarse.
          </DialogDescription>
        </DialogHeader>
        <form id="form-edit-course" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Nombre */}
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-edit-course-nombre">
                    Nombre *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-edit-course-nombre"
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

            {/* Descripción */}
            <Controller
              name="descripcion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-edit-course-descripcion">
                    Descripción *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-edit-course-descripcion"
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

            {/* Imagen — por implementar */}

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
