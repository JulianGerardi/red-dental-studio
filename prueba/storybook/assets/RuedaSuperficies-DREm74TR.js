import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'

/* La rueda de superficies de una Lab order, con la forma de red.dev (recorrido del 2026-11-27): cinco zonas -mesial a la
   izquierda, distal a la derecha, oclusal o incisal al centro y arriba / abajo según la arcada: en el maxilar Buccal arriba
   y Palatal abajo, en la mandíbula Lingual arriba y Buccal abajo-. No es la \`SurfaceWheel\` de siete zonas de los
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

/* Las cinco zonas con la forma de red.dev (viewBox 0 0 319.51 328.28): arriba, derecha, abajo, izquierda y centro, en el
   orden de \`superficiesDe\`; cada una con dónde va su letra. Arriba y abajo la zona tiene dos franjas: la letra va en la
   de adentro, no sobre la línea que las separa. */
const VISTA = '0 0 319.51 328.28'
const ZONAS: { d: string; x: number; y: number }[] = [
  { x: 158.86, y: 77, d: 'M158.86 8.1c42.97 0 81.7 17.34 109.84 45.39l-30.44 30.53c-20.35-20.28-48.38-32.81-79.4-32.81S99.74 63.76 79.39 84.07L50.22 54.89l-1.4-1.21C76.98 25.52 115.89 8.1 158.86 8.1 M158.86 51.21c31.02 0 59.05 12.53 79.4 32.81l-34.59 34.7c-.23-.25-.48-.5-.72-.74-11.38-11.34-27.06-18.34-44.38-18.34s-33.02 7-44.39 18.34l-.44.44-34.35-34.35c20.35-20.31 48.45-32.86 79.47-32.86' },
  { x: 265, y: 165, d: 'M268.7 53.49c28.27 28.18 45.77 67.16 45.77 110.23s-17.73 82.58-46.35 110.79l-31.18-29.8-35.91-34.33-1.35-.23c.36-.31.71-.62 1.06-.94 12.73-11.5 20.73-28.15 20.73-46.66 0-17.05-6.78-32.51-17.8-43.83l34.59-34.7z' },
  { x: 158.86, y: 251, d: 'M114.26 207.19c11.37 11.29 27.02 18.26 44.31 18.26 15.71 0 30.08-5.76 41.11-15.3l1.35.23 35.91 34.33c-20.23 19.51-47.75 31.51-78.08 31.51s-59.06-12.53-79.41-32.81l34.37-35.79z M236.94 244.71l31.18 29.8c-28.09 27.71-66.68 44.82-109.26 44.82S77.68 302.22 49.59 274.5l29.86-31.09c20.35 20.28 49.08 32.81 79.41 32.81s57.85-12 78.08-31.51z' },
  { x: 55, y: 165, d: 'M113.53 206.45c.24.25.49.5.73.74l-.44.43-34.37 35.79-29.86 31.09C20.97 246.3 3.24 207.08 3.24 163.72S20.66 81.84 48.82 53.68l1.4 1.21 29.17 29.18 34.35 34.35c-11.18 11.36-18.08 27.28-18.08 44.13s6.81 32.57 17.87 43.9' },
  { x: 158.86, y: 165, d: 'M203.67 118.72c11.02 11.32 17.8 26.78 17.8 43.83 0 18.51-8 35.16-20.73 46.66-.35.32-.7.63-1.06.94-11.03 9.54-25.4 15.3-41.11 15.3-17.29 0-32.94-6.97-44.31-18.26-.24-.24-.49-.49-.73-.74-11.06-11.33-17.87-26.83-17.87-43.9s6.9-32.77 18.08-44.13l.44-.44c11.37-11.34 27.07-18.34 44.39-18.34s33 7 44.38 18.34c.24.24.49.49.72.74' },
]

export function RuedaSuperficies({ diente, value, onChange, size = 160, disabled }: {
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
      viewBox={VISTA} width={size} height={size} role="group" aria-label={diente ? \`Surfaces of tooth \${diente}\` : 'Tooth surfaces'}
      aria-disabled={apagada || undefined} className={cn('max-w-full shrink-0', !diente && 'opacity-50')}
    >
      {zonas.map((s, i) => {
        const zona = ZONAS[i]!
        const on = !!diente && value.includes(s)
        return (
          <g
            key={\`\${i}-\${s}\`} role="checkbox" aria-checked={on} aria-label={NOMBRE[s]} tabIndex={apagada ? -1 : 0}
            onClick={() => tocar(s)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tocar(s) } }}
            className={cn('outline-none [&:focus-visible>path]:stroke-dash-blue [&:focus-visible>path]:stroke-[4]', !apagada && 'cursor-pointer')}
          >
            <path d={zona.d} strokeWidth={2} strokeMiterlimit={10} className={cn('stroke-ink transition-colors', on ? 'fill-dash-count-bg' : 'fill-surface', !apagada && !on && 'hover:fill-surface-subtle')}>
              <title>{NOMBRE[s]}</title>
            </path>
            <text x={zona.x} y={zona.y} textAnchor="middle" dominantBaseline="central" fontSize={30} fontWeight={700} className="pointer-events-none fill-ink select-none">{s}</text>
          </g>
        )
      })}
    </svg>
  )
}
`})))()}export{n,i as r,r as t};