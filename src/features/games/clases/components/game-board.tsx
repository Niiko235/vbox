'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  type NodeChange,
  type Node,
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
import { validateGame, type ValidateGameResult } from '@/features/games/clases/actions/validate-game'
import type { GameData } from '@/features/games/clases/actions/get-game-data'

// ─── Tipos de nodos registrados en ReactFlow ──────────────────────────────────

const nodeTypes = { umlClass: UMLClassNode }

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  data: GameData
  grupoId: number
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function GameBoard({ data, grupoId }: Props) {
  const { inicializar, clases, actualizarPosicion, componentesDisponibles } =
    useGameStore()

  const [isCalificando, setIsCalificando] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [resultado, setResultado] = useState<ValidateGameResult | null>(null)

  // Inicializar el store con los datos del servidor (solo una vez)
  useEffect(() => {
    inicializar(data)
  }, [data, inicializar])

  // Derivar nodos de ReactFlow desde el store
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

  // Sincronizar posiciones al store cuando el usuario mueve un nodo
  const onNodesChange = (changes: NodeChange[]) => {
    for (const change of changes) {
      if (change.type === 'position' && change.position) {
        actualizarPosicion(Number(change.id), change.position)
      }
    }
  }

  // ── Calificar ───────────────────────────────────────────────────────────────

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

      {/* ── Canvas ──────────────────────────────────────────────────── */}
      <div className="relative flex-1 bg-slate-50">
        <ReactFlow
          nodes={nodes}
          edges={[]}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={2}
          defaultEdgeOptions={{
            style: { stroke: '#94a3b8', strokeWidth: 1.5 },
            type: 'smoothstep',
          }}
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

      {/* ── Dialog de resultados ────────────────────────────────────── */}
      <ResultsDialog
        open={dialogOpen}
        grupoId={grupoId}
        resultado={resultado}
      />
    </div>
  )
}
