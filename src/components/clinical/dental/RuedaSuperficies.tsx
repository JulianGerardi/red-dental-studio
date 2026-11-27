import { cn } from '@/lib/utils'

/* La rueda de superficies de una Lab order, como red.dev (video de Julián del 2026-11-27): cinco zonas -mesial a la
   izquierda, distal a la derecha, oclusal o incisal al centro y arriba / abajo según la arcada: en el maxilar Buccal arriba
   y Palatal abajo, en la mandíbula Lingual arriba y Buccal abajo-. No es la `SurfaceWheel` de siete zonas de los
   findings. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

export type SuperficieLab = 'M' | 'D' | 'O' | 'I' | 'B' | 'L' | 'P'

const NOMBRE: Record<SuperficieLab, string> = { M: 'Mesial', D: 'Distal', O: 'Occlusal', I: 'Incisal', B: 'Buccal', L: 'Lingual', P: 'Palatal' }

const ANTERIORES = new Set([
  ...Array.from({ length: 6 }, (_, i) => String(6 + i)), ...Array.from({ length: 6 }, (_, i) => String(22 + i)),
  ...'CDEFGHMNOPQR'.split(''),
])
const MAXILAR = new Set([...Array.from({ length: 16 }, (_, i) => String(i + 1)), ...'ABCDEFGHIJ'.split('')])

/** Las cinco superficies de un diente, en el orden de la rueda: arriba, derecha, abajo, izquierda y centro. */
export function superficiesDe(diente: string): [SuperficieLab, SuperficieLab, SuperficieLab, SuperficieLab, SuperficieLab] {
  const [arriba, abajo]: SuperficieLab[] = MAXILAR.has(diente) ? ['B', 'P'] : ['L', 'B']
  return [arriba!, 'D', abajo!, 'M', ANTERIORES.has(diente) ? 'I' : 'O']
}

const C = 120
const R = 110
const R1 = 42
const rad = (g: number) => (g * Math.PI) / 180
const pt = (r: number, g: number) => [C + r * Math.cos(rad(g)), C + r * Math.sin(rad(g))] as const
const sector = (a1: number, a2: number) => {
  const [x1, y1] = pt(R1, a1)
  const [x2, y2] = pt(R, a1)
  const [x3, y3] = pt(R, a2)
  const [x4, y4] = pt(R1, a2)
  return `M${x1} ${y1} L${x2} ${y2} A${R} ${R} 0 0 1 ${x3} ${y3} L${x4} ${y4} A${R1} ${R1} 0 0 0 ${x1} ${y1} Z`
}

export function RuedaSuperficies({ diente, value, onChange, size = 140, disabled }: {
  /** Sin diente la rueda se ve apagada: no hay a quién marcarle superficies. */
  diente: string | null
  value: SuperficieLab[]
  onChange: (v: SuperficieLab[]) => void
  size?: number
  disabled?: boolean
}) {
  const zonas = superficiesDe(diente ?? '1')
  const apagada = disabled || !diente
  const tocar = (s: SuperficieLab) => { if (!apagada) onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s]) }
  return (
    <svg
      viewBox="0 0 240 240" width={size} height={size} role="group" aria-label={diente ? `Surfaces of tooth ${diente}` : 'Tooth surfaces'}
      aria-disabled={apagada || undefined} className={cn('max-w-full shrink-0', apagada && 'opacity-50')}
    >
      {zonas.map((s, i) => {
        const centro = i === 4
        const medio = -90 + i * 90
        const [lx, ly] = centro ? [C, C] : pt((R1 + R) / 2, medio)
        const on = !!diente && value.includes(s)
        return (
          <g
            key={`${i}-${s}`} role="checkbox" aria-checked={on} aria-label={NOMBRE[s]} tabIndex={apagada ? -1 : 0}
            onClick={() => tocar(s)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tocar(s) } }}
            className={cn('outline-none [&:focus-visible>*:first-child]:stroke-dash-blue [&:focus-visible>*:first-child]:stroke-[3]', !apagada && 'cursor-pointer')}
          >
            {centro
              ? <circle cx={C} cy={C} r={R1} strokeWidth={1.5} className={cn('stroke-ink', on ? 'fill-dash-count-bg' : 'fill-surface')} />
              : <path d={sector(medio - 45, medio + 45)} strokeWidth={1.5} className={cn('stroke-ink', on ? 'fill-dash-count-bg' : 'fill-surface')} />}
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fontSize={17} fontWeight={700} className="pointer-events-none fill-ink select-none">{s}</text>
          </g>
        )
      })}
    </svg>
  )
}
