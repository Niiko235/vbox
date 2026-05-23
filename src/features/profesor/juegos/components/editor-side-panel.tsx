'use client'

import { useState } from 'react'
import {
  Trash2,
  Trash2Icon,
  Box,
  GitFork,
  Lock,
  Users,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { toast } from 'sonner'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import type { ClaseEditor, MiembroEditor, RelacionEditor } from '../actions/get-juego-editor'
import { useEditorStore } from '../store'
import { DialogEditorClase }   from './dialog-editor-clase'
import { DialogEditorMiembro } from './dialog-editor-miembro'
import { DialogEditorRelacion } from './dialog-editor-relacion'

// ─── Icono visibilidad ────────────────────────────────────────────────────────

function VisibilityIcon({ v }: { v: MiembroEditor['visibilidad'] }) {
  if (v === 'private')   return <Lock        size={10} className="text-slate-400 shrink-0" />
  if (v === 'protected') return <ShieldCheck size={10} className="text-slate-400 shrink-0" />
  return <Users size={10} className="text-slate-400 shrink-0" />
}

// ─── Alert dialog genérico de eliminación ────────────────────────────────────

function DeleteButton({
  title,
  description,
  onConfirm,
}: {
  title: string
  description: string
  onConfirm: () => Promise<void>
}) {
  const [isOpen, setIsOpen]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)
    try {
      await onConfirm()
      setIsOpen(false)
    } catch {
      setError('Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if (!v) setError(null) }}>
      <AlertDialogTrigger asChild>
        <button className="p-1 rounded text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors">
          <Trash2 size={13} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          {error && (
            <div className="text-red-600 mt-3 border border-red-300 bg-red-100 p-2 rounded-md text-sm">
              {error}
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={loading}>
            Cancelar
          </AlertDialogCancel>
          <Button variant="destructive" disabled={loading} onClick={handleConfirm}>
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// ─── Fila de miembro ──────────────────────────────────────────────────────────

function MiembroRow({
  miembro,
  idclase,
  tipo,
}: {
  miembro: MiembroEditor
  idclase: number
  tipo: 'atributos' | 'metodos'
}) {
  const { eliminarAtributo, eliminarMetodo } = useEditorStore()

  const handleDelete = async () => {
    const result = tipo === 'atributos'
      ? await eliminarAtributo(miembro.id, idclase)
      : await eliminarMetodo(miembro.id, idclase)
    if (!result.ok) throw new Error()
    toast.success(`${tipo === 'atributos' ? 'Atributo' : 'Método'} eliminado`)
  }

  return (
    <div className="flex items-center gap-1.5 py-1 px-2 group rounded hover:bg-slate-50">
      <VisibilityIcon v={miembro.visibilidad} />
      <span className="text-xs text-slate-700 truncate flex-1">{miembro.nombre}</span>
      <span className="text-xs text-slate-400 shrink-0">: {miembro.tipo}</span>
      <DeleteButton
        title={`Eliminar ${tipo === 'atributos' ? 'atributo' : 'método'}`}
        description={`¿Eliminar "${miembro.nombre}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
      />
    </div>
  )
}

// ─── Entrada de clase (con acordeón de atributos/métodos) ─────────────────────

function ClaseEntry({ clase, idjuego }: { clase: ClaseEditor; idjuego: number }) {
  const eliminarClase = useEditorStore((s) => s.eliminarClase)
  const [open, setOpen] = useState(false)

  const handleDeleteClase = async () => {
    const result = await eliminarClase(clase.id)
    if (!result.ok) throw new Error()
    toast.success(`Clase "${clase.nombre}" eliminada`)
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white overflow-hidden">
      {/* Header de la clase */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200">
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <Box size={13} className="text-slate-500 shrink-0" />
        <span className="text-sm font-semibold text-slate-800 flex-1 truncate">
          {clase.nombre}
        </span>
        <DeleteButton
          title="Eliminar clase"
          description={`¿Eliminar la clase "${clase.nombre}"? Se eliminarán también todos sus atributos, métodos y relaciones.`}
          onConfirm={handleDeleteClase}
        />
      </div>

      {/* Atributos + Métodos (expandible) */}
      {open && (
        <div className="divide-y divide-slate-100">
          {/* Atributos */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                Atributos ({clase.atributos.length})
              </span>
              <DialogEditorMiembro tipo="Atributo" idclase={clase.id} idjuego={idjuego} />
            </div>
            {clase.atributos.length === 0 ? (
              <p className="text-xs text-slate-300 italic py-1 px-2">Sin atributos</p>
            ) : (
              clase.atributos.map((a) => (
                <MiembroRow key={a.id} miembro={a} idclase={clase.id} tipo="atributos" />
              ))
            )}
          </div>

          {/* Métodos */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                Métodos ({clase.metodos.length})
              </span>
              <DialogEditorMiembro tipo="Metodo" idclase={clase.id} idjuego={idjuego} />
            </div>
            {clase.metodos.length === 0 ? (
              <p className="text-xs text-slate-300 italic py-1 px-2">Sin métodos</p>
            ) : (
              clase.metodos.map((m) => (
                <MiembroRow key={m.id} miembro={m} idclase={clase.id} tipo="metodos" />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Fila de relación ─────────────────────────────────────────────────────────

const TIPO_LABELS: Record<string, string> = {
  Asociacion:  'Asociación',
  Agregacion:  'Agregación',
  Composicion: 'Composición',
  Herencia:    'Herencia',
}

function RelacionRow({
  relacion,
  clases,
}: {
  relacion: RelacionEditor
  clases: ClaseEditor[]
}) {
  const eliminarRelacion = useEditorStore((s) => s.eliminarRelacion)

  const nombreOrigen  = clases.find((c) => c.id === relacion.claseOrigen)?.nombre  ?? '?'
  const nombreDestino = clases.find((c) => c.id === relacion.claseDestino)?.nombre ?? '?'

  const handleDelete = async () => {
    const result = await eliminarRelacion(relacion.id)
    if (!result.ok) throw new Error()
    toast.success('Relación eliminada')
  }

  return (
    <div className="flex items-center gap-2 py-1.5 px-3 group rounded hover:bg-slate-50">
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-slate-600">
          {TIPO_LABELS[relacion.tipo] ?? relacion.tipo}
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-xs text-slate-500 truncate">{nombreOrigen}</span>
          <ArrowRight size={10} className="text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 truncate">{nombreDestino}</span>
        </div>
      </div>
      <DeleteButton
        title="Eliminar relación"
        description={`¿Eliminar la relación ${TIPO_LABELS[relacion.tipo]} entre "${nombreOrigen}" y "${nombreDestino}"?`}
        onConfirm={handleDelete}
      />
    </div>
  )
}

// ─── Panel lateral ────────────────────────────────────────────────────────────

type Props = {
  idjuego:   number
  esCreador: boolean
}

export function EditorSidePanel({ idjuego, esCreador }: Props) {
  const clases    = useEditorStore((s) => s.clases)
  const relaciones = useEditorStore((s) => s.relaciones)

  return (
    <aside className="w-80 flex flex-col border-l border-slate-200 bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 bg-white shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">Panel de edición</h2>
        {!esCreador && (
          <p className="text-xs text-muted-foreground mt-0.5">
            Solo lectura — este grupo no es el creador del juego.
          </p>
        )}
      </div>

      {/* Si no es creador → mensaje y diagrama read-only */}
      {!esCreador ? (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Puedes ver el diagrama pero no editarlo.
          </p>
          {/* Listado de clases (solo visualización) */}
          {clases.map((c) => (
            <div key={c.id} className="rounded-md border bg-white p-3 text-sm">
              <p className="font-semibold">{c.nombre}</p>
              <p className="text-xs text-slate-400 mt-1">
                {c.atributos.length} atrib. · {c.metodos.length} mét.
              </p>
            </div>
          ))}
        </div>
      ) : (
        /* Editor completo */
        <div className="flex-1 overflow-y-auto">
          <Accordion
            type="multiple"
            defaultValue={['clases', 'conexiones']}
            className="px-3 py-3 space-y-1"
          >
            {/* ── Clases ───────────────────────────────────────────────── */}
            <AccordionItem value="clases" className="border rounded-md bg-white">
              <AccordionTrigger className="px-3 py-2.5 text-sm font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Box size={14} className="text-slate-500" />
                  Clases
                  <span className="text-xs font-normal text-slate-400">
                    ({clases.length})
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3 pt-0 space-y-2 !h-auto">
                <DialogEditorClase idjuego={idjuego} />
                {clases.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4 italic">
                    Aún no hay clases. ¡Añade la primera!
                  </p>
                ) : (
                  clases.map((clase) => (
                    <ClaseEntry key={clase.id} clase={clase} idjuego={idjuego} />
                  ))
                )}
              </AccordionContent>
            </AccordionItem>

            {/* ── Conexiones ───────────────────────────────────────────── */}
            <AccordionItem value="conexiones" className="border rounded-md bg-white">
              <AccordionTrigger className="px-3 py-2.5 text-sm font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <GitFork size={14} className="text-slate-500" />
                  Conexiones
                  <span className="text-xs font-normal text-slate-400">
                    ({relaciones.length})
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3 pt-0 space-y-1 !h-auto">
                <DialogEditorRelacion idjuego={idjuego} clases={clases} />
                {relaciones.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4 italic">
                    Sin conexiones todavía.
                  </p>
                ) : (
                  relaciones.map((r) => (
                    <RelacionRow key={r.id} relacion={r} clases={clases} />
                  ))
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </aside>
  )
}
