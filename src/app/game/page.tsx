'use client'

import { Card } from '@/components/ui/card'

import { useCallback } from 'react'
import {
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  ReactFlow,
  addEdge,
  Controls,
  Background,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import UMLClassNode from '@/components/nodes/node-class'
import { SidePanelComponents } from '@/components/side/sidepanel-components'

const nodeTypes = {
  umlClass: UMLClassNode,
}

const initialNodes = [
  {
    id: '1',
    type: 'umlClass',
    position: { x: 100, y: 100 },
    data: {
      nombre: 'Carro',
      attributes: [
       
      ],
      methods: [
       
      ],
      isDropTarget: false,
    },
  },
  {
    id: '2',
    type: 'umlClass',
    position: { x: 400, y: 400 },
    data: {
      nombre: 'Carro',
      attributes: [
      
      ],
      methods: [
      
      ],
      isDropTarget: false,
    },
  },
]

const initialEdges: Edge[] = [{ id: '1-2', source: '1', target: '2' }]

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Connection) => {
    // params = { source, target, sourceHandle, targetHandle }
    setEdges((eds) => addEdge(params, eds))
  }, [])

  return (
    <section className="h-screen grid grid-cols-1 xl:grid-cols-2">
      <Card className="bg-">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // connectionMode="loose"
          fitView
        >
          <Background />
          <Controls />
          {/* <MiniMap /> */}
        </ReactFlow>
      </Card>
      <SidePanelComponents />
    </section>
  )
}
