import { Card } from '../ui/card'

// tipos para los componentes

type UmlClassComponent = {
  id: string
  kind: 'method' | 'attribute'
  data: string
}

// Tipos de componentes que el profesor configuró
const AVAILABLE_COMPONENTS: {
  attributes: UmlClassComponent[]
  methods: UmlClassComponent[]
} = {
  attributes: [
    { id: 'attr-1', data: 'bateria', kind: 'attribute' },
    { id: 'attr-2', data: 'modelo', kind: 'attribute' },
    { id: 'attr-3', data: 'año', kind: 'attribute' },
  ],
  methods: [
    {
      id: 'met-4',
      data: 'encender',
      kind: 'method',
    },
    { id: 'met-5', data: 'apagar', kind: 'method' },
  ],
}

// ↓ React.DragEvent<HTMLDivElement> en lugar de DragEvent
// ↓ UmlComponent en lugar de any
const handleDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  component: UmlClassComponent
) => {
  // ↓ optional chaining para el null de dataTransfer
  e.dataTransfer?.setData(
    'application/uml-component',
    JSON.stringify(component)
  )
  if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'
}

export function SidePanelComponents() {
  // ← export para que no quede "unused"
  return (
    <Card className="side-panel">
      <section>
        <h4>Atributos</h4>
        {AVAILABLE_COMPONENTS.attributes.map((attr) => (
          <div
            key={attr.id}
            draggable
            onDragStart={(e) => handleDragStart(e, attr)}
            className="component-item attribute"
          >
            <span>{attr.data}</span>
          </div>
        ))}
      </section>

      <section>
        <h4>Métodos</h4>
        {AVAILABLE_COMPONENTS.methods.map((method) => (
          <div
            key={method.id}
            draggable
            onDragStart={(e) => handleDragStart(e, method)}
            className="component-item method"
          >
            <span>{method.data}</span>
          </div>
        ))}
      </section>
    </Card>
  )
}
