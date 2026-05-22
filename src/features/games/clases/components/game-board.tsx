'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  type NodeChange,
  type Node,
  type Edge,
  type Connection,
} from '@xyflow/react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import '@xyflow/react/dist/style.css'

import { Button } from '@/components/ui/button'
import { useGameStore } from '@/features/games/clases/store'
import { SidePanel } from '@/features/games/clases/components/side-panel'
import { ResultsDialog } from '@/features/games/clases/components/results-dialog'
import {
  UMLClassNode,
  type UMLClassNodeData,
} from '@/features/games/clases/components/uml-class-node'
import {
  RelacionEdge,
  UMLMarkerDefs,
  type RelacionEdgeData,
} from '@/features/games/clases/components/custom-edges'
import { RelationTypeDialog } from '@/features/games/clases/components/relation-type-dialog'
import { validateGame, type ValidateGameResult } from '@/features/games/clases/actions/validate-game'
import type { GameData, TipoRelacion } from '@/features/games/clases/actions/get-game-data'

// ─── Tipos de nodos y aristas registrados en ReactFlow ────────────────────────

const nodeTypes = { umlClass: UMLClassNode }
const edgeTypes = { relacion: RelacionEdge }

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  data: GameData
  grupoId: number
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function GameBoard({ data, grupoId }: Props) {
  const {
    inicializar,
    clases,
    actualizarPosicion,
    componentesDisponibles,
    relaciones,
    agregarRelacion,
  } = useGameStore()

  const [isCalificando, setIsCalificando] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [resultado, setResultado] = useState<ValidateGameResult | null>(null)

  // ── Estado para el dialog de selección de tipo de relación ────────────────
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(null)

  useEffect(() => {
    inicializar(data)
  }, [data, inicializar])

  // ── Nodos ─────────────────────────────────────────────────────────────────

  const nodes = useMemo<Node<UMLClassNodeData>[]>(
    () =>
      clases.map((clase) => ({
        id: String(clase.id),
        type: 'umlClass',
        position: clase.posicion,
        data: {
          claseId: clase.id,
          nombre: clase.nombre,
          atributos: clase.atributos,
          metodos: clase.metodos,
        },
      })),
    [clases]
  )

  const onNodesChange = (changes: NodeChange[]) => {
    for (const change of changes) {
      if (change.type === 'position' && change.position) {
        actualizarPosicion(Number(change.id), change.position)
      }
    }
  }

  // ── Aristas ───────────────────────────────────────────────────────────────

  const edges = useMemo<Edge<RelacionEdgeData>[]>(
    () =>
      relaciones.map((r) => ({
        id: r.id,
        source: String(r.claseOrigen),
        target: String(r.claseDestino),
        type: 'relacion',
        data: { tipo: r.tipo },
      })),
    [relaciones]
  )

  // ── onConnect: guardar conexión pendiente y abrir dialog ──────────────────

  const onConnect = useCallback((connection: Connection) => {
    // Evitar auto-conexión
    if (connection.source === connection.target) return
    setPendingConnection(connection)
  }, [])

  const handleSelectTipo = (tipo: TipoRelacion) => {
    if (!pendingConnection) return
    const origenId = Number(pendingConnection.source)
    const destinoId = Number(pendingConnection.target)

    agregarRelacion({
      id: `${origenId}-${destinoId}`,
      claseOrigen: origenId,
      claseDestino: destinoId,
      tipo,
    })

    setPendingConnection(null)
  }

  const handleCancelRelacion = () => setPendingConnection(null)

  // ── Calificar ─────────────────────────────────────────────────────────────

  const handleCalificar = async () => {
    setIsCalificando(true)

    const respuesta = clases.map((clase) => ({
      claseId: clase.id,
      componenteIds: [
        ...clase.atributos.map((a) => a.id),
        ...clase.metodos.map((m) => m.id),
      ],
    }))

    const response = await validateGame({
      juegoId: data.juego.id,
      grupoId,
      clases: respuesta,
      relacionesEstudiante: relaciones,
    })

    setIsCalificando(false)

    if (!response.success) {
      toast.error(response.error)
      return
    }

    setResultado(response.data)
    setDialogOpen(true)
  }

  const panelVacio = componentesDisponibles.length === 0

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* Marcadores SVG para los extremos de las aristas */}
      <UMLMarkerDefs />

      {/* ── Canvas ──────────────────────────────────────────────── */}
      <div className="relative flex-1 bg-slate-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
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

        {/* Botón Calificar — flotante esquina inferior derecha */}
        <div className="absolute bottom-6 right-6 z-10">
          <Button
            onClick={handleCalificar}
            disabled={!panelVacio || isCalificando}
            className="
              rounded-full px-6 py-3 h-auto
              bg-slate-900 text-white shadow-lg
              hover:bg-slate-800
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all gap-2
            "
          >
            {isCalificando ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Calificando...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                Calificar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ── Side Panel ──────────────────────────────────────────────── */}
      <SidePanel />

      {/* ── Dialog selector de tipo de relación ─────────────────────── */}
      <RelationTypeDialog
        open={pendingConnection !== null}
        onSelect={handleSelectTipo}
        onCancel={handleCancelRelacion}
      />

      {/* ── Dialog de resultados ────────────────────────────────────── */}
      <ResultsDialog
        open={dialogOpen}
        grupoId={grupoId}
        resultado={resultado}
      />
    </div>
  )
}
