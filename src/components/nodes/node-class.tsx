// components/nodes/UMLClassNode.tsx

import { Handle, Position, useReactFlow } from '@xyflow/react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useState } from 'react'

type componetClass = {
  id: string
  kind: 'method' | 'attribute'
  data: string
}

type UMLClassNodeData = {
  nombre: string
  attributes: componetClass[]
  methods: componetClass[]
  isDropTarget: boolean
}

type UMLClassNodeProps = {
  id: string
  data: UMLClassNodeData
}

export default function UMLClassNode({ id, data }: UMLClassNodeProps) {
  const { updateNodeData } = useReactFlow()
  const [isDragOver, setIsDragOver] = useState(false)

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault() // OBLIGATORIO para permitir drop
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  const onDragLeave = () => setIsDragOver(false)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation() // evita que el canvas también reciba el evento
    setIsDragOver(false)

    const raw = e.dataTransfer.getData('application/uml-component')
    if (!raw) return

    const component = JSON.parse(raw)

    if (component.kind === 'attribute') {
      updateNodeData(id, {
        attributes: [...data.attributes, component],
      })
    } else if (component.kind === 'method') {
      updateNodeData(id, {
        methods: [...data.methods, component],
      })
    }
  }

  return (
    <Card
      className="min-w-[180px] text-xs gap-0"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Nombre */}

      <CardHeader className="border-b text-center">
        <CardTitle className="text-sm font-bold">{data.nombre}</CardTitle>
      </CardHeader>

      {/* Atributos */}

      <CardContent className="p-0 border-b">
        {data.attributes.map((attr) => (
          <div key={attr.id} className="p-1 border-b w-full">
            private {attr.data} : string;
          </div>
        ))}
      </CardContent>

      {/* Métodos */}

      <CardContent className="p-2 space-y-2">
        {data.methods.map((met) => (
          <Card key={met.id} className="pl-1">
            {met.data}
          </Card>
        ))}
      </CardContent>

      {/* Handles */}

      <Handle type="target" position={Position.Left} />

      <Handle type="source" position={Position.Right} />
    </Card>
  )
}
