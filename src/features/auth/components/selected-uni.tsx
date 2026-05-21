import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Universidad = { id: number; nombre: string }

type Props = {
  value: string
  onChange: (id: string) => void
  disabled?: boolean
  universidades: Universidad[]
}

export function SelectedUni({ value, onChange, disabled, universidades }: Props) {
  return (
    <Select onValueChange={onChange} value={value} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona tu universidad" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Universidades</SelectLabel>
          {universidades.map((uni) => (
            <SelectItem key={uni.id} value={String(uni.id)}>
              {uni.nombre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
