import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  value: string
  onChange: (id: string) => void
  disabled?: boolean
}

export function SelectedUni({ value, onChange, disabled }: Props) {
  return (
    <Select onValueChange={onChange} value={value} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona tu programa" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Universidades</SelectLabel>
          <SelectItem value="apple">Universidad de la Amazonía</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
