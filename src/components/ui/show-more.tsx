import { useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Una lista larga dentro de una card: se ven los primeros `limit` y "Show N more" abre el resto adentro de un scroll, sin
   estirar la página; "Show less" vuelve. Es la regla de toda la app para muchas cards o mucha información (Julián,
   2026-10-12). Ver design-reference/figma/modulos/dashboard.md. */

export const SHOW_MORE_ALTO = 'min(70vh, 640px)'

export function ShowMore({
  total, limit, maxHeight = SHOW_MORE_ALTO, label = 'items', fade = 'from-white', className, children,
}: {
  /** Cuántos ítems hay en total. */
  total: number
  /** Cuántos se ven cerrado. Si el total no lo pasa, no hay botón ni scroll. */
  limit: number
  /** Alto máximo de la lista abierta; más allá, scroll. Nunca queda más baja que la lista cerrada. */
  maxHeight?: string
  /** Nombre de lo que se lista, para el lector de pantalla ("appointments"). */
  label?: string
  /** Color del fondo de abajo, para el degradé que avisa que hay más: el de la card (blanco) o el de la página. */
  fade?: string
  /** Clases de la lista: grilla, columna con gap… */
  className?: string
  /** Dibuja los primeros `cuantos` ítems. */
  children: (cuantos: number) => ReactNode
}) {
  const [abierto, setAbierto] = useState(false)
  const [altoCerrado, setAltoCerrado] = useState(0)
  const [alFinal, setAlFinal] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const sobran = total - limit
  const conTope = sobran > 0
  const scroll = conTope && abierto

  const alternar = () => {
    if (!abierto) setAltoCerrado(ref.current?.offsetHeight ?? 0)
    setAlFinal(false)
    setAbierto((v) => !v)
  }

  return (
    <div className="flex flex-col gap-2">
      {/* -m-1 p-1: aire para que el scroll no corte la sombra de las cards. */}
      <div
        ref={ref}
        role={scroll ? 'region' : undefined}
        aria-label={scroll ? `All ${label}` : undefined}
        tabIndex={scroll ? 0 : undefined}
        onScroll={scroll ? (e) => {
          const el = e.currentTarget
          setAlFinal(el.scrollTop + el.clientHeight >= el.scrollHeight - 4)
        } : undefined}
        className={cn('-m-1 p-1', scroll && 'overflow-y-auto overscroll-contain rounded-lg focus-visible:outline-2 focus-visible:outline-dash-blue')}
        style={scroll ? { maxHeight: `max(${altoCerrado}px, ${maxHeight})` } : undefined}
      >
        <div className={className}>{children(conTope && !abierto ? limit : total)}</div>
        {/* En Mac la barra de scroll no se ve hasta que se scrollea: el degradé avisa que hay más abajo. */}
        {scroll && (
          <div aria-hidden className={cn('pointer-events-none sticky -bottom-1 -mt-8 h-8 bg-gradient-to-t to-transparent transition-opacity', fade, alFinal && 'opacity-0')} />
        )}
      </div>
      {conTope && (
        <button
          type="button" data-show-more aria-expanded={abierto} onClick={alternar}
          className="flex items-center gap-1 self-start rounded text-[12px] font-medium text-dash-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
        >
          {abierto ? 'Show less' : `Show ${sobran} more`}
          <ChevronDown aria-hidden className={cn('size-3.5 transition-transform', abierto && 'rotate-180')} />
        </button>
      )}
    </div>
  )
}
