import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'

import { getJuegoEditor }    from '@/features/profesor/juegos/actions/get-juego-editor'
import { getJuegoGrupoInfo } from '@/features/profesor/juegos/actions/get-juego-grupo-info'
import { EditorBoard }       from '@/features/profesor/juegos/components/editor-board'

type Props = {
  params: Promise<{ idcurso: string; idgrupo: string; idjuego: string }>
}

export default async function JuegoEditorPage({ params }: Props) {
  const { idcurso: idcursoParam, idgrupo: idgrupoParam, idjuego: idjuegoParam } =
    await params

  const idcurso = Number(idcursoParam)
  const idgrupo = Number(idgrupoParam)
  const idjuego = Number(idjuegoParam)

  // Cargar datos en paralelo
  const [editorResult, grupoInfo] = await Promise.all([
    getJuegoEditor(idjuego),
    getJuegoGrupoInfo(idjuego, idgrupo),
  ])

  // El juego debe existir y estar asignado a este grupo
  if (!editorResult.success || !grupoInfo) notFound()

  const { data }    = editorResult
  const { escreador, nombrejuego } = grupoInfo

  const backHref = `/home/cursos/${idcurso}/grupos/${idgrupo}`

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col overflow-hidden">
      {/* ── Barra superior ───────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center gap-3 px-4 py-2.5 border-b border-slate-200 bg-white">
        <Link
          href={backHref}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al grupo
        </Link>

        <span className="text-slate-300">·</span>

        <h1 className="text-sm font-semibold text-slate-800 truncate">
          {nombrejuego}
        </h1>

        {!escreador && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <Lock size={11} />
            Solo lectura
          </span>
        )}
      </header>

      {/* ── Editor ───────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        <EditorBoard data={data} esCreador={escreador} />
      </div>
    </div>
  )
}
