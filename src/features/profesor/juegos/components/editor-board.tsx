'use client'

import { useEffect, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  type NodeChange,
  type Node,
  type Edge,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { useEditorStore } from '../store'
import type { JuegoEditorData } from '../actions/get-juego-editor'
import {
  EditorClassNode,
  type EditorClassNodeData,
} from './editor-class-node'
import {
  EditorRelacionEdge,
  EditorMarkerDefs,
  type EditorRelacionEdgeData,
} from './editor-custom-edges'
import { EditorSidePanel } from './editor-side-panel'

// ─── Tipos registrados ────────────────────────────────────────────────────────

const nodeTypes = { umlClass: EditorClassNode }
const edgeTypes = { relacion: EditorRelacionEdge }

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  data:      JuegoEditorData
  esCreador: boolean
}

// ─── Board ────────────────────────────────────────────────────────────────────

export function EditorBoard({ data, esCreador }: Props) {
  const {
    inicializar,
    clases,
    relaciones,
    actualizarPosicionLocal,
    persistirPosicion,
  } = useEditorStore()

  // Carga inicial una sola vez
  useEffect(() => {
    inicializar(data)
  }, [data, inicializar])

  // ── Nodos ──────────────────────────────────────────────────────────────────

  const nodes = useMemo<Node<EditorClassNodeData>[]>(
    () =>
      clases.map((c) => ({
        id:       String(c.id),
        type:     'umlClass',
        position: c.posicion,
        data: {
          claseId:   c.id,
          nombre:    c.nombre,
          atributos: c.atributos,
          metodos:   c.metodos,
        },
      })),
    [clases]
  )

  // ── Aristas ────────────────────────────────────────────────────────────────

  const edges = useMemo<Edge<EditorRelacionEdgeData>[]>(
    () =>
      relaciones.map((r) => ({
        id:     String(r.id),
        source: String(r.claseOrigen),
        target: String(r.claseDestino),
        type:   'relacion',
        data:   { tipo: r.tipo },
      })),
    [relaciones]
  )

  // ── Posición: actualización local (durante drag) ───────────────────────────

  const onNodesChange = (changes: NodeChange[]) => {
    if (!esCreador) return
    for (const change of changes) {
      if (change.type === 'position' && change.position) {
        actualizarPosicionLocal(Number(change.id), change.position)
      }
    }
  }

  // ── Persistir posición (al soltar el nodo) ─────────────────────────────────

  const onNodeDragStop = (_: React.MouseEvent, node: Node) => {
    if (!esCreador) return
    persistirPosicion(Number(node.id), node.position.x, node.position.y)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-full w-full overflow-hidden">
      <EditorMarkerDefs />

      {/* Canvas */}
      <div className="relative flex-1 bg-slate-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          nodesDraggable={esCreador}
          nodesConnectable={false}
          elementsSelectable={esCreador}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          minZoom={0.2}
          maxZoom={2}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#cbd5e1"
          />
          <Controls
            className="shadow-sm border border-slate-200 rounded-lg overflow-hidden"
            showInteractive={false}
          />
        </ReactFlow>
      </div>

      {/* Panel lateral */}
      <EditorSidePanel idjuego={data.juego.id} esCreador={esCreador} />
    </div>
  )
}
