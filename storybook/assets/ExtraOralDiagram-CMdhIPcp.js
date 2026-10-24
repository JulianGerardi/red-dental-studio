import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'
import type { ExtraOralRegion } from './data'

/* El gráfico de Extraoral: cuatro vistas de cabeza (perfil derecho, frente, nuca, perfil izquierdo -el orden de una
   foto clínica: lateral derecho, frontal, posterior, lateral izquierdo-), con regiones clickeables. Dibujado a mano
   como SVG propio, no una foto ni el PNG del Figma: mismo criterio que el Odontogram ("no una foto", clinical-mode.md).
   Las siete regiones y el orden de las vistas salen de grabaciones de pantalla de red.dev (Julián, 2026-10-24); los
   límites exactos de cada zona son una aproximación -quedan para ajustar cuando se vea con más referencia-. Una
   región puede dibujarse en más de una vista (Right/Left Forehead, en su perfil y en el frente): todas sus formas
   comparten el mismo id y se marcan juntas. Scalp sólo en el frente por ahora -las grabaciones también la mostraban
   en los dos perfiles, pero ahí no entraba sin pisar Forehead/Posterior Head; queda para la próxima pasada-. */

type EstadoRegion = 'default' | 'pending' | 'active'

type Forma = { region: ExtraOralRegion; d: string }

const CABEZA_PERFIL = (mirar: 'izq' | 'der') => {
  /* Perfil mirando a la derecha por default (nariz a la derecha); "izq" la espeja con scaleX. */
  const base = 'M70 38 C95 30 118 42 122 65 C132 68 138 78 134 88 L128 92 C130 100 128 108 122 112 L112 128 C110 138 104 146 96 150 L90 165 L60 165 L60 150 C48 146 40 136 38 122 C30 118 25 108 26 96 C22 88 24 76 32 68 C36 52 50 42 70 38 Z'
  return mirar === 'izq' ? base : base
}

const PERFIL_SHOULDERS = 'M20 240 Q20 185 46 170 L112 170 Q138 185 138 240 Z'

/* Perfil derecho (nariz a la derecha): posterior = izquierda del dibujo, frente/sien = derecha. */
const FORMAS_PERFIL_DERECHO: Forma[] = [
  { region: 'Right Posterior Head', d: 'M26 70 C23 86 25 102 34 116 C40 124 48 130 56 133 L56 60 C44 62 33 65 26 70 Z' },
  { region: 'Right Forehead', d: 'M70 39 C92 32 112 42 119 62 L119 90 C108 84 96 78 86 70 C78 63 72 52 70 39 Z' },
]

const FORMAS_PERFIL_IZQUIERDO: Forma[] = [
  { region: 'Left Posterior Head', d: 'M26 70 C23 86 25 102 34 116 C40 124 48 130 56 133 L56 60 C44 62 33 65 26 70 Z' },
  { region: 'Left Forehead', d: 'M70 39 C92 32 112 42 119 62 L119 90 C108 84 96 78 86 70 C78 63 72 52 70 39 Z' },
]

const CABEZA_FRENTE = 'M100 30 C128 30 142 52 142 85 C142 112 134 132 120 146 L120 165 L80 165 L80 146 C66 132 58 112 58 85 C58 52 72 30 100 30 Z'
const FRENTE_SHOULDERS = 'M34 240 Q34 185 60 170 L140 170 Q166 185 166 240 Z'

const FORMAS_FRENTE: Forma[] = [
  { region: 'Scalp', d: 'M62 58 C64 42 79 31 100 31 C121 31 136 42 138 58 C125 50 112 46 100 46 C88 46 75 50 62 58 Z' },
  { region: 'Left Forehead', d: 'M62 58 C75 50 88 46 100 46 L100 86 L64 86 C61 76 60 67 62 58 Z' },
  { region: 'Right Forehead', d: 'M138 58 C125 50 112 46 100 46 L100 86 L136 86 C139 76 140 67 138 58 Z' },
  { region: 'Left Eye', d: 'M70 98 C74 93 82 92 88 95 C90 99 89 104 85 106 C79 108 72 106 70 102 Z' },
  { region: 'Right Eye', d: 'M112 95 C118 92 126 93 130 98 L130 102 C128 106 121 108 115 106 C111 104 110 99 112 95 Z' },
]

const CABEZA_NUCA = 'M100 30 C128 30 142 52 142 85 C142 112 134 132 120 146 L120 165 L80 165 L80 146 C66 132 58 112 58 85 C58 52 72 30 100 30 Z'
const NUCA_SHOULDERS = 'M34 240 Q34 185 60 170 L140 170 Q166 185 166 240 Z'
const NUCA_OREJAS = 'M58 85 C52 85 48 90 48 97 C48 104 52 109 58 109 Z M142 85 C148 85 152 90 152 97 C152 104 148 109 142 109 Z'

const FORMAS_NUCA: Forma[] = [
  { region: 'Left Posterior Head', d: 'M58 58 C58 44 72 32 100 31 L100 140 L76 140 C64 126 58 106 58 85 C58 76 58 66 58 58 Z' },
  { region: 'Right Posterior Head', d: 'M142 58 C142 44 128 32 100 31 L100 140 L124 140 C136 126 142 106 142 85 C142 76 142 66 142 58 Z' },
]

/* Color por estado: gris transparente en reposo, ámbar mientras se elige (antes de guardar, como el resto de la app:
   \`warn-fg\`), verde cuando ya tiene una condition activa guardada (\`dash-ok-fg\`, el mismo verde de un finding Active). */
const RELLENO: Record<EstadoRegion, string> = {
  default: 'fill-transparent hover:fill-ink/5',
  pending: 'fill-warn-fg/35 hover:fill-warn-fg/45',
  active: 'fill-dash-ok-fg/30 hover:fill-dash-ok-fg/40',
}

function Panel({
  titulo, viewBox, cabeza, hombros, extra, formas, estadoDe, onToggle,
}: {
  titulo: string
  viewBox: string
  cabeza: string
  hombros: string
  extra?: string
  formas: Forma[]
  estadoDe: (region: ExtraOralRegion) => EstadoRegion
  onToggle: (region: ExtraOralRegion) => void
}) {
  return (
    <svg viewBox={viewBox} className="h-auto w-full max-w-[200px]" role="group" aria-label={titulo}>
      <path d={hombros} className="fill-surface-muted stroke-line" strokeWidth="1" />
      <path d={cabeza} className="fill-surface-muted stroke-line" strokeWidth="1" />
      {extra && <path d={extra} className="fill-surface-muted stroke-line" strokeWidth="1" />}
      {formas.map(({ region, d }) => (
        <path
          key={region} d={d} tabIndex={0} role="button" aria-label={region} aria-pressed={estadoDe(region) !== 'default'}
          onClick={() => onToggle(region)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(region) } }}
          className={cn('cursor-pointer stroke-line-strong outline-none transition-colors', RELLENO[estadoDe(region)])}
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}

export function ExtraOralDiagram({
  pending, active, onToggle,
}: {
  /** Regiones elegidas ahora, antes de guardar (ámbar): lo que se ve en "Selected area" del drawer abierto. */
  pending: ExtraOralRegion[]
  /** Regiones con una condition activa ya guardada (verde). */
  active: ExtraOralRegion[]
  onToggle: (region: ExtraOralRegion) => void
}) {
  const estadoDe = (region: ExtraOralRegion): EstadoRegion =>
    pending.includes(region) ? 'pending' : active.includes(region) ? 'active' : 'default'

  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
      <Panel titulo="Right profile" viewBox="0 0 170 240" cabeza={CABEZA_PERFIL('der')} hombros={PERFIL_SHOULDERS} formas={FORMAS_PERFIL_DERECHO} estadoDe={estadoDe} onToggle={onToggle} />
      <Panel titulo="Front" viewBox="0 0 200 240" cabeza={CABEZA_FRENTE} hombros={FRENTE_SHOULDERS} formas={FORMAS_FRENTE} estadoDe={estadoDe} onToggle={onToggle} />
      <Panel titulo="Back" viewBox="0 0 200 240" cabeza={CABEZA_NUCA} hombros={NUCA_SHOULDERS} extra={NUCA_OREJAS} formas={FORMAS_NUCA} estadoDe={estadoDe} onToggle={onToggle} />
      <Panel titulo="Left profile" viewBox="0 0 170 240" cabeza={CABEZA_PERFIL('izq')} hombros={PERFIL_SHOULDERS} formas={FORMAS_PERFIL_IZQUIERDO} estadoDe={estadoDe} onToggle={onToggle} />
    </div>
  )
}
`})))()}export{n,i as r,r as t};