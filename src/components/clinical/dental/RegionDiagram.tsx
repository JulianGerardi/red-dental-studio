import { cn } from '@/lib/utils'

/* Base de los gráficos por regiones (Extraoral, Intraoral): el PNG del Figma tal cual y, encima, una zona clickeable
   por región. Una región puede tener más de una forma (en dos vistas del dibujo): todas se marcan juntas. Colores por
   estado con los tokens de la app: ámbar mientras se elige (`warn-fg`), turquesa cuando ya tiene una condition activa
   guardada (`dash-ok-fg`). Ver design-reference/figma/modulos/clinical-mode.md (2026-10-24). */

export type EstadoRegion = 'default' | 'pending' | 'active'
export type Forma<R extends string> = { region: R; d: string }

const RELLENO: Record<EstadoRegion, string> = {
  default: 'fill-transparent hover:fill-ink/10',
  pending: 'fill-warn-fg/40 hover:fill-warn-fg/50',
  active: 'fill-dash-ok-fg/35 hover:fill-dash-ok-fg/45',
}

export function RegionDiagram<R extends string>({
  titulo, imagen, ancho, alto, viewBox, formas, pending, active, onToggle, className,
}: {
  titulo: string
  imagen: string
  /** Tamaño del PNG original: las formas están en sus coordenadas. */
  ancho: number
  alto: number
  viewBox: string
  formas: Forma<R>[]
  pending: R[]
  active: R[]
  onToggle: (region: R) => void
  className?: string
}) {
  const estadoDe = (region: R): EstadoRegion =>
    pending.includes(region) ? 'pending' : active.includes(region) ? 'active' : 'default'

  return (
    <svg viewBox={viewBox} className={cn('h-auto w-full', className)} role="group" aria-label={titulo}>
      <image href={imagen} width={ancho} height={alto} />
      {formas.map(({ region, d }, i) => (
        <path
          key={i} d={d} tabIndex={0} role="button" aria-label={region} aria-pressed={estadoDe(region) !== 'default'}
          onClick={() => onToggle(region)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(region) } }}
          className={cn('cursor-pointer stroke-transparent outline-none transition-colors focus-visible:stroke-dash-blue', RELLENO[estadoDe(region)])}
          strokeWidth="6"
        />
      ))}
    </svg>
  )
}
