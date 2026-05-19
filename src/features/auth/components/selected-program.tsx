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

export function SelectedProgram({ value, onChange, disabled }: Props) {
  return (
    <Select onValueChange={onChange} value={value} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona tu programa" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Programas</SelectLabel>
          <SelectItem value="apple">Ing. sistemas</SelectItem>
          <SelectItem value="banana">Ing. alimentos</SelectItem>
          <SelectItem value="blueberry">Ing. agro</SelectItem>
          <SelectItem value="grapes">Ing. software</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
