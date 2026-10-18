import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { ShowMore } from '@/components/ui/show-more'
import { OperatoryCard, type Operatory } from './OperatoryCard'

/* Las salas del Dashboard en una tira arriba de los turnos (Julián, 2026-10-13): una fila de cards sobre la página que
   llena el ancho. Cuántas entran sale del ancho (una card no baja de OPERATORY_MIN); las que no entran van a
   "Show N more", la regla de listas largas. Con onElegir, tocar una sala la elige (filtra la sala de espera) y tocarla
   de nuevo la suelta (2026-10-17). Ver design-reference/figma/modulos/dashboard.md. */

export const OPERATORY_MIN = 232
const GAP = 16

export function OperatoryStrip({ rooms, elegida, onElegir }: {
  rooms: Operatory[]
  /** El nombre de la sala elegida. */
  elegida?: string | null
  /** Tocar una sala: su nombre, o null si era la elegida. */
  onElegir?: (sala: string | null) => void
}) {
  const ref = useRef<HTMLElement>(null)
  const [entran, setEntran] = useState(6)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => setEntran(Math.max(1, Math.floor((el.clientWidth + GAP) / (OPERATORY_MIN + GAP))))
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (rooms.length === 0) return null
  /* Con menos salas que lugares, las que hay se reparten el ancho en vez de dejar un hueco a la derecha. */
  const columnas = Math.min(entran, rooms.length)

  return (
    <section ref={ref} aria-label="Rooms" style={{ '--columnas': columnas } as CSSProperties}>
      <ShowMore
        total={rooms.length} limit={entran} label="rooms" fade="from-page-background"
        className="grid grid-cols-[repeat(var(--columnas),minmax(0,1fr))] gap-4"
      >
        {(n) => rooms.slice(0, n).map((r, i) => (
          <OperatoryCard
            key={i} room={r} enPagina
            seleccionada={!!elegida && elegida === r.name}
            atenuada={!!elegida && elegida !== r.name}
            onClick={onElegir && (() => onElegir(elegida === r.name ? null : r.name))}
          />
        ))}
      </ShowMore>
    </section>
  )
}
