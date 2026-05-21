import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Programa = { id: number; nombre: string; id_universidad: number }

type Props = {
  value: string
  onChange: (id: string) => void
  disabled?: boolean
  programas: Programa[]
  universidadId: string
}

export function SelectedProgram({ value, onChange, disabled, programas, universidadId }: Props) {
  const programasFiltrados = universidadId
    ? programas.filter((p) => String(p.id_universidad) === universidadId)
    : []

  return (
    <Select
      onValueChange={onChange}
      value={value}
      disabled={disabled || !universidadId}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            universidadId
              ? 'Selecciona tu programa'
              : 'Primero selecciona una universidad'
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Programas</SelectLabel>
          {programasFiltrados.map((prog) => (
            <SelectItem key={prog.id} value={String(prog.id)}>
              {prog.nombre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
