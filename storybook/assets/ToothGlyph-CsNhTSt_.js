import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'
import { SURFACE_LABELS } from '@/data/odontogram'

/* Los dos dibujos de cada pieza del odontograma: la vista anatómica
   -corona, raíces, encía y conductos- y la vista oclusal con las 7
   superficies. Ver design-reference/figma/modulos/clinical-mode.md. */

type TipoDiente = 'molar' | 'premolar' | 'canino' | 'incisivo'

/* Numeración universal: la posición dentro de la arcada define la forma.
   1-3 y 14-16 molares · 4-5 y 12-13 premolares · 6 y 11 caninos · 7-10
   incisivos. Vale igual para las dos arcadas. */
function tipoDiente(numero: number): TipoDiente {
  const pos = ((numero - 1) % 16) + 1
  if (pos <= 3 || pos >= 14) return 'molar'
  if (pos <= 5 || pos >= 12) return 'premolar'
  if (pos === 6 || pos === 11) return 'canino'
  return 'incisivo'
}

/* Dibujado con la corona abajo y las raíces arriba, que es la orientación
   del maxilar; la mandíbula usa el mismo dibujo espejado. */
const CORONA: Record<TipoDiente, string> = {
  molar: 'M8 35 C8 50 12 61.5 17 62.4 C19.2 62.8 20.6 61 22 61 C23.4 61 24.8 62.8 27 62.4 C32 61.5 36 50 36 35 Z',
  premolar: 'M11.8 35 C11.8 50 15.2 61 22 62.4 C28.8 61 32.2 50 32.2 35 Z',
  canino: 'M12.8 35 C12.8 46 16.8 58 22 62.6 C27.2 58 31.2 46 31.2 35 Z',
  incisivo: 'M13.8 35 L13.8 56.5 Q13.8 62 22 62 Q30.2 62 30.2 56.5 L30.2 35 Z',
}

const RAICES: Record<TipoDiente, string[]> = {
  molar: [
    'M12.3 36 C12 29 12.6 22.5 14.1 18.4 C14.8 16 18.1 16.4 18.4 19.6 C19 23 20.4 25.5 22 27 C23.6 25.5 25 23 25.6 19.6 C25.9 16.4 29.2 16 29.9 18.4 C31.4 22.5 32 29 31.7 36 Z',
  ],
  premolar: ['M17.4 36 C16.6 27 16.1 16 19.8 10.5 Q22 8 24.2 10.5 C27.9 16 27.4 27 26.6 36 Z'],
  canino: ['M17.6 36 C16.7 25 16.1 10 19.7 5 Q22 2.6 24.3 5 C27.9 10 27.3 25 26.4 36 Z'],
  incisivo: ['M18 36 C17.3 27 16.8 17 19.9 11.5 Q22 9.2 24.1 11.5 C27.2 17 26.7 27 26 36 Z'],
}

const CANALES: Record<TipoDiente, string[]> = {
  molar: ['M15.8 33 C15.4 27 15.6 23 16.3 20', 'M28.2 33 C28.6 27 28.4 23 27.7 20'],
  premolar: ['M22 34 L22 13'],
  canino: ['M22 34 L22 7.5'],
  incisivo: ['M22 34 L22 14'],
}

const ENCIA = 'M4.5 41 C4.5 32.5 11.5 29 22 29 C32.5 29 39.5 32.5 39.5 41 Z'

export function ToothGlyph({
  numero, tinte, ausente, flip,
}: {
  numero: number
  /** Tinte del esmalte: rojo si hay un problema abierto, azul si hay un finding cerrado. */
  tinte: string
  ausente: boolean
  flip: boolean
}) {
  const tipo = tipoDiente(numero)

  if (ausente) {
    return (
      <svg viewBox="0 0 44 64" className="h-[58px] w-11" aria-hidden>
        <rect x="10" y="34" width="24" height="24" rx="8" className="fill-none stroke-line-strong" strokeWidth="1.6" strokeDasharray="3 2.5" />
        <path d="M16 40 L28 52 M28 40 L16 52" className="stroke-ink-faint" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 44 64" className={cn('h-[58px] w-11', flip && '-scale-y-100')} aria-hidden>
      {RAICES[tipo].map((d) => (
        <path key={d} d={d} fill="#fcfcfd" stroke="#d2d2d9" strokeWidth="1.1" strokeLinejoin="round" />
      ))}
      {CANALES[tipo].map((d) => (
        <path key={d} d={d} fill="none" stroke="#e8949d" strokeWidth="1.1" strokeLinecap="round" />
      ))}
      <path d={ENCIA} fill="#f4bfc6" />
      <path d={CORONA[tipo]} fill={tinte} stroke="#c9c9d1" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

/* Vista oclusal: banda vestibular arriba partida en MB · B · DB, la mesa
   oclusal al medio y la banda lingual abajo en ML · L · DL. Las esquinas
   en diagonal son las del odontograma clásico; el corte en tres de cada
   banda es el que pide nuestro modelo de 7 superficies, no el de 5. */
const W = 40
const H = 36
const I = 11
const A = 13
const B = 27

const SEGMENTOS: { idx: number; d: string }[] = [
  { idx: 0, d: \`M0 0 H\${A} V\${I} H\${I} Z\` },
  { idx: 1, d: \`M\${A} 0 H\${B} V\${I} H\${A} Z\` },
  { idx: 2, d: \`M\${B} 0 H\${W} L\${W - I} \${I} H\${B} Z\` },
  { idx: 3, d: \`M0 \${I} H\${W} V\${H - I} H0 Z\` },
  { idx: 4, d: \`M\${I} \${H - I} H\${A} V\${H} H0 Z\` },
  { idx: 5, d: \`M\${A} \${H - I} H\${B} V\${H} H\${A} Z\` },
  { idx: 6, d: \`M\${B} \${H - I} H\${W - I} L\${W} \${H} H\${B} Z\` },
]

export function OcclusalView({
  numero, surfaces, ausente, seleccionado, flip, onSurface,
}: {
  numero: number
  surfaces: (string | null)[]
  ausente: boolean
  seleccionado: boolean
  flip: boolean
  onSurface: (index: number) => void
}) {
  return (
    <svg
      viewBox={\`0 0 \${W} \${H}\`}
      className={cn(
        'h-[34px] w-10 rounded-[5px] border bg-white transition-colors',
        seleccionado ? 'border-primary ring-primary/40 ring-2' : 'border-line-strong',
        ausente && 'opacity-40',
      )}
    >
      <g transform={flip ? \`translate(0 \${H}) scale(1 -1)\` : undefined}>
        {SEGMENTOS.map(({ idx, d }) => (
          <path
            key={idx}
            d={d}
            role={ausente ? undefined : 'button'}
            tabIndex={ausente ? undefined : 0}
            aria-label={\`\${numero} · \${SURFACE_LABELS[idx]}\`}
            onClick={ausente ? undefined : () => onSurface(idx)}
            onKeyDown={(e) => {
              if (ausente) return
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSurface(idx) }
            }}
            fill={surfaces[idx] || '#ffffff'}
            stroke="#d4d4d8"
            strokeWidth="0.8"
            className={cn('outline-none', !ausente && 'cursor-pointer hover:brightness-95')}
          >
            <title>{\`\${numero} · \${SURFACE_LABELS[idx]}\`}</title>
          </path>
        ))}
      </g>
    </svg>
  )
}
`})))()}export{n,i as r,r as t};