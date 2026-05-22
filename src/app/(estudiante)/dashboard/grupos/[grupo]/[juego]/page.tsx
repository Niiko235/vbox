import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { getGameData } from '@/features/games/clases/actions/get-game-data'
import { GameBoard } from '@/features/games/clases/components/game-board'

// ─── Params ───────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ grupo: string; juego: string }>
}

// ─── Metadata dinámica ────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { juego: juegoId } = await params
  const result = await getGameData(Number(juegoId))

  if (!result.success) return { title: 'Juego' }

  return { title: result.data.juego.nombre }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function JuegoPage({ params }: Props) {
  const { grupo: grupoId, juego: juegoId } = await params

  const result = await getGameData(Number(juegoId))

  if (!result.success) notFound()

  return (
    <section className="flex h-[calc(100vh-2rem)] w-full overflow-hidden">
      <GameBoard data={result.data} grupoId={Number(grupoId)} />
    </section>
  )
}
