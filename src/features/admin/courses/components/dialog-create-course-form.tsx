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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createCourse } from "../actions/create-course";
import type { Curso } from "../actions/get-all-courses";

const formSchema = z.object({
  id: z.string().min(1, "El ID es requerido").max(10, "El ID no puede tener más de 10 caracteres"),
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),

});

type FormData = z.infer<typeof formSchema>;

type FormStatus = {
  status: "idle" | "submitting" | "error";
  message?: string;
};

type Props = {
  handleCrear: (curso: Curso) => void;
};

export function DialogCreateCourseForm({ handleCrear }: Props) {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      nombre: "",
      descripcion: "",
      // imagen: "",
    },
  });

  const handleReset = () => {
    form.reset({
      id: undefined,
      nombre: "",
      descripcion: "",
      // imagen: "",
    });
    setFormStatus({ status: "idle" });
  };

  async function onSubmit(data: FormData) {
    setFormStatus({ status: "submitting" });
    try {
      const response = await createCourse({
        id: Number(data.id),
        nombre: data.nombre,
        descripcion: data.descripcion,
        imagen: "",
      });

      if (!response.ok || !response.data) {
        setFormStatus({
          status: "error",
          message: response.message || "Error desconocido al crear el curso",
        });
        return;
      }

      toast.success("Curso creado correctamente");
      handleCrear(response.data);
      handleReset();
      setOpen(false);
    } catch {
      setFormStatus({
        status: "error",
        message: "Error desconocido al crear el curso",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) handleReset(); }}>
      <DialogTrigger asChild>
        <Button className="bg-[#3d1f8c] hover:bg-[#2e1769] text-white">
          <Plus size={16} />
          Crear Curso
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Curso</DialogTitle>
          <DialogDescription>
            Completa el formulario para registrar un nuevo curso en el sistema.
          </DialogDescription>
        </DialogHeader>
        <form id="form-create-course" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* ID del curso */}
            <Controller
              name="id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-course-id">
                    ID del Curso *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-create-course-id"
                    placeholder="101"
                    type="number"
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

            {/* Nombre */}
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-course-nombre">
                    Nombre *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-create-course-nombre"
                    placeholder="Programación en Python"
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
                  <FieldLabel htmlFor="form-create-course-descripcion">
                    Descripción *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-create-course-descripcion"
                    placeholder="Descripción del curso"
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

            {/* Fecha de creación
            <Controller
              name="fechacreacion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-course-fecha">
                    Fecha de Creación *
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="form-create-course-fecha"
                        className="w-full justify-start text-left"
                        disabled={formStatus.status === "submitting"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? new Date(field.value).toLocaleDateString("es-CO")
                          : "Selecciona una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        disabled={formStatus.status === "submitting"}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}

            {/* Imagen (opcional)
            <Controller
              name="imagen"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-course-imagen">
                    URL de Imagen
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-create-course-imagen"
                    placeholder="https://..."
                    autoComplete="off"
                    disabled={formStatus.status === "submitting"}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}

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
