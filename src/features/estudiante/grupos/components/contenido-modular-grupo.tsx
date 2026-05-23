'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  Gamepad2,
  Globe,
  FileText,
  Video,
  Link2,
  Trophy,
  Zap,
  BookX,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { ModuloGrupo } from '../actions/get-modulos-grupo'
import type { TeoriaGrupo } from '../actions/get-teorias-grupo'
import type { ActividadGrupo } from '../actions/get-actividades-grupo'
import type { RefuerzoGrupo } from '@/features/profesor/refuerzos/actions/get-refuerzos-grupo'
import type { EnlaceGrupo } from '../actions/get-enlaces-grupo'
import type { JuegoGrupo } from '@/features/estudiante/juegos/actions/get-juegos-grupo'

// ─── Types ─────────────────────────────────────────────────────────────────────

type TeoriaConActividades = TeoriaGrupo & { actividades: ActividadGrupo[] }
type RefuerzoConEnlaces = RefuerzoGrupo & { enlaces: EnlaceGrupo[] }
type ModuloContenido = ModuloGrupo & {
  teorias: TeoriaConActividades[]
  refuerzos: RefuerzoConEnlaces[]
  juegos: JuegoGrupo[]
}

export type Props = {
  modulos: ModuloGrupo[]
  teorias: TeoriaGrupo[]
  actividades: ActividadGrupo[]
  refuerzos: RefuerzoGrupo[]
  enlaces: EnlaceGrupo[]
  juegos: JuegoGrupo[]
  idgrupo: number
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const TIPO_ICON: Record<string, React.ReactNode> = {
  'Sitio web': <Globe size={12} />,
  'Documento': <FileText size={12} />,
  'Video': <Video size={12} />,
  'Otro': <Link2 size={12} />,
}

const TIPO_COLORS: Record<string, string> = {
  'Sitio web': 'bg-blue-100 text-blue-700 border-blue-200',
  'Documento': 'bg-orange-100 text-orange-700 border-orange-200',
  'Video': 'bg-red-100 text-red-700 border-red-200',
  'Otro': 'bg-gray-100 text-gray-600 border-gray-200',
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionHeading({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode
  label: string
  count: number
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-muted-foreground">{icon}</span>
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </h3>
      <span className="text-xs text-muted-foreground/70 ml-auto">{count}</span>
    </div>
  )
}

function TeoriaItem({ teoria }: { teoria: TeoriaConActividades }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left transition-colors"
      >
        <span className="font-medium text-sm">{teoria.nombre}</span>
        <ChevronDown
          size={16}
          className={cn(
            'text-muted-foreground transition-transform duration-200 shrink-0 ml-3',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="px-4 py-4 border-t bg-gray-50/50 space-y-4">
          {/* Contenido teórico */}
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {teoria.contenido}
          </p>

          {/* Actividades */}
          {teoria.actividades.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Actividades
              </p>
              <div className="space-y-1.5">
                {teoria.actividades.map((a) =>
                  a.disponible ? (
                    <a
                      key={a.idactividad}
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline group"
                    >
                      <ExternalLink
                        size={12}
                        className="shrink-0 group-hover:translate-x-0.5 transition-transform"
                      />
                      {a.nombre}
                    </a>
                  ) : (
                    <div
                      key={a.idactividad}
                      className="flex items-center gap-2 text-sm text-muted-foreground/60"
                    >
                      <ExternalLink size={12} className="shrink-0" />
                      <span>{a.nombre}</span>
                      <span className="text-xs border rounded px-1.5 py-0.5 border-dashed">
                        No disponible
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RefuerzoItem({ refuerzo }: { refuerzo: RefuerzoConEnlaces }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left transition-colors gap-3"
      >
        <span className="font-medium text-sm line-clamp-1 flex-1 min-w-0">
          {refuerzo.explicacion}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[#3d1f8c] font-medium flex items-center gap-1">
            <Trophy size={11} />
            {refuerzo.puntuacion} pts
          </span>
          <ChevronDown
            size={16}
            className={cn(
              'text-muted-foreground transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </div>
      </button>

      {open && (
        <div className="px-4 py-3 border-t bg-gray-50/50 space-y-2">
          {refuerzo.enlaces.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay enlaces en este refuerzo aún.
            </p>
          ) : (
            refuerzo.enlaces.map((e) => (
              <a
                key={e.idenlace}
                href={e.contenido}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:underline group"
              >
                <Badge
                  className={cn(
                    'text-xs border shrink-0 flex items-center gap-1',
                    TIPO_COLORS[e.tipo] ?? TIPO_COLORS['Otro']
                  )}
                >
                  {TIPO_ICON[e.tipo] ?? <Link2 size={12} />}
                  {e.tipo}
                </Badge>
                <span className="text-blue-600 truncate">{e.contenido}</span>
                <ExternalLink
                  size={11}
                  className="shrink-0 text-muted-foreground group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function JuegoCard({ juego, idgrupo }: { juego: JuegoGrupo; idgrupo: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border rounded-md bg-white hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <Gamepad2 size={16} className="text-[#3d1f8c] shrink-0" />
        <span className="font-medium text-sm truncate">{juego.nombrejuego}</span>
        {juego.mejorpuntaje !== null && (
          <span className="text-xs text-[#3d1f8c] font-medium flex items-center gap-1 shrink-0">
            <Trophy size={11} />
            {juego.mejorpuntaje} pts
          </span>
        )}
      </div>
      <Button
        asChild
        size="sm"
        className="bg-[#3d1f8c] hover:bg-[#3d1f8c]/90 gap-1 shrink-0 ml-3"
      >
        <Link href={`/dashboard/grupos/${idgrupo}/${juego.idjuego}`}>
          Jugar
          <ArrowRight size={13} />
        </Link>
      </Button>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────

export function ContenidoModularGrupo({
  modulos,
  teorias,
  actividades,
  refuerzos,
  enlaces,
  juegos,
  idgrupo,
}: Props) {
  // Organise flat lists into module hierarchy
  const contenido: ModuloContenido[] = modulos.map((m) => ({
    ...m,
    teorias: teorias
      .filter((t) => t.idmodulo === m.idmodulo)
      .map((t) => ({
        ...t,
        actividades: actividades.filter((a) => a.idteoria === t.idteoria),
      })),
    refuerzos: refuerzos
      .filter((r) => r.idmodulo === m.idmodulo)
      .map((r) => ({
        ...r,
        enlaces: enlaces.filter((e) => e.idrefuerzo === r.idrefuerzo),
      })),
    juegos: juegos.filter((j) => j.idmodulo === m.idmodulo),
  }))

  if (contenido.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
        <BookX size={56} strokeWidth={1.2} className="text-muted-foreground/40" />
        <p className="font-medium">Este grupo no tiene módulos aún</p>
        <p className="text-sm">Comunícate con tu profesor para más información.</p>
      </div>
    )
  }

  return (
    <Accordion
      type="multiple"
      defaultValue={contenido.map((m) => String(m.idmodulo))}
      className="space-y-4"
    >
      {contenido.map((modulo) => {
        const totalItems =
          modulo.teorias.length + modulo.refuerzos.length + modulo.juegos.length
        const isEmpty = totalItems === 0

        return (
          <AccordionItem
            key={modulo.idmodulo}
            value={String(modulo.idmodulo)}
            className="border rounded-lg bg-background"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50/60 rounded-t-lg transition-colors">
              <div className="flex items-center gap-4 text-left">
                <span className="font-semibold text-base">{modulo.nombre}</span>
                <div className="flex items-center gap-2">
                  {modulo.teorias.length > 0 && (
                    <Badge variant="outline" className="text-xs font-normal gap-1">
                      <BookOpen size={10} />
                      {modulo.teorias.length} {modulo.teorias.length === 1 ? 'teoría' : 'teorías'}
                    </Badge>
                  )}
                  {modulo.refuerzos.length > 0 && (
                    <Badge variant="outline" className="text-xs font-normal gap-1">
                      <Zap size={10} />
                      {modulo.refuerzos.length}{' '}
                      {modulo.refuerzos.length === 1 ? 'refuerzo' : 'refuerzos'}
                    </Badge>
                  )}
                  {modulo.juegos.length > 0 && (
                    <Badge variant="outline" className="text-xs font-normal gap-1">
                      <Gamepad2 size={10} />
                      {modulo.juegos.length} {modulo.juegos.length === 1 ? 'juego' : 'juegos'}
                    </Badge>
                  )}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="!h-auto px-6 pb-6 pt-2">
              {isEmpty ? (
                <p className="text-sm text-muted-foreground py-4">
                  No hay contenido en este módulo aún.
                </p>
              ) : (
                <div className="space-y-6">
                  {/* ── Teorías ── */}
                  {modulo.teorias.length > 0 && (
                    <div>
                      <SectionHeading
                        icon={<BookOpen size={14} />}
                        label="Teorías"
                        count={modulo.teorias.length}
                      />
                      <div className="space-y-2">
                        {modulo.teorias.map((t) => (
                          <TeoriaItem key={t.idteoria} teoria={t} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Refuerzos ── */}
                  {modulo.refuerzos.length > 0 && (
                    <div>
                      <SectionHeading
                        icon={<Zap size={14} />}
                        label="Refuerzos"
                        count={modulo.refuerzos.length}
                      />
                      <div className="space-y-2">
                        {modulo.refuerzos.map((r) => (
                          <RefuerzoItem key={r.idrefuerzo} refuerzo={r} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Juegos ── */}
                  {modulo.juegos.length > 0 && (
                    <div>
                      <SectionHeading
                        icon={<Gamepad2 size={14} />}
                        label="Juegos"
                        count={modulo.juegos.length}
                      />
                      <div className="space-y-2">
                        {modulo.juegos.map((j) => (
                          <JuegoCard key={j.idjuego} juego={j} idgrupo={idgrupo} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
