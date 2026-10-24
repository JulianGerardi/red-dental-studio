import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'
import cabezas from '@/assets/extraoral-heads.png'
import type { ExtraOralRegion } from './data'

/* El gráfico de Extraoral: el PNG del Figma (Platform Design, Clinical Exam — Extra Oral) tal cual, con las cuatro
   vistas -perfil derecho, frente, nuca, perfil izquierdo-, y encima una zona clickeable por región. El PNG ya trae
   pintada de celeste una región de ejemplo (la de "Uper left"): acá se muestra en gris con un filtro, sin tocar el
   archivo, hasta tener la cabeza limpia y una capa por región de la app real. Las zonas salen de las formas celestes
   del propio PNG (frente, nuca, perfil) completadas por simetría y de la partición que se ve en red.dev (Julián,
   2026-10-24); el contorno exacto de cada una es una aproximación. Ver design-reference/figma/modulos/clinical-mode.md.
   Una región puede estar en más de una vista (Right Forehead en su perfil y en el frente): todas sus formas comparten
   el id y se marcan juntas. Las coordenadas son las del PNG original (4096 px). */

type EstadoRegion = 'default' | 'pending' | 'active'

type Forma = { region: ExtraOralRegion; d: string }

const FORMAS: Forma[] = [
  /* Perfil derecho */
  { region: 'Right Posterior Head', d: 'M231 355L364 359L438 367L443 371L451 405L464 437L452 444L427 479L421 480L393 459L373 458L354 467L340 481L328 503L321 541L324 575L342 612L366 630L355 674L356 730L275 715L271 690L256 653L203 566L190 516L190 456L203 405Z' },
  { region: 'Right Forehead', d: 'M447 369L469 435L481 451L507 470L581 490L707 506L703 452L687 405Z' },
  /* Frente: el lado derecho del paciente queda a la izquierda del dibujo */
  { region: 'Scalp', d: 'M1278 333L1292 300L1330 268L1400 246L1480 239L1560 246L1630 268L1668 300L1682 333Z' },
  { region: 'Right Forehead', d: 'M1299 333L1279 383L1274 449L1276 499L1480 502L1480 343Z' },
  { region: 'Left Forehead', d: 'M1661 333L1681 383L1686 449L1684 499L1480 502L1480 343Z' },
  { region: 'Right Eye', d: 'M1333 548a72 40 0 1 0 144 0a72 40 0 1 0 -144 0Z' },
  { region: 'Left Eye', d: 'M1488 548a72 40 0 1 0 144 0a72 40 0 1 0 -144 0Z' },
  /* Nuca: el lado izquierdo del paciente queda a la izquierda del dibujo */
  { region: 'Left Posterior Head', d: 'M2566 336L2539 391L2539 451L2557 574L2585 683L2742 687L2744 344Z' },
  { region: 'Right Posterior Head', d: 'M2924 336L2951 391L2951 451L2933 574L2905 683L2748 687L2746 344Z' },
  /* Perfil izquierdo */
  { region: 'Left Posterior Head', d: 'M3986 355L3853 359L3779 367L3774 371L3766 405L3753 437L3765 444L3790 479L3796 480L3824 459L3844 458L3863 467L3877 481L3889 503L3896 541L3893 575L3875 612L3851 630L3862 674L3861 730L3942 715L3946 690L3961 653L4014 566L4027 516L4027 456L4014 405Z' },
  { region: 'Left Forehead', d: 'M3770 369L3748 435L3736 451L3710 470L3636 490L3510 506L3514 452L3530 405Z' },
]

/* Color por estado: transparente en reposo, ámbar mientras se elige (\`warn-fg\`, antes de guardar), turquesa cuando ya
   tiene una condition activa guardada, como el celeste de la app real (\`dash-ok-fg\`). */
const RELLENO: Record<EstadoRegion, string> = {
  default: 'fill-transparent hover:fill-ink/10',
  pending: 'fill-warn-fg/40 hover:fill-warn-fg/50',
  active: 'fill-dash-ok-fg/35 hover:fill-dash-ok-fg/45',
}

export function ExtraOralDiagram({
  pending, active, onToggle,
}: {
  /** Regiones elegidas ahora, antes de guardar (ámbar): lo que se ve en "Selected area" del drawer abierto. */
  pending: ExtraOralRegion[]
  /** Regiones con una condition activa ya guardada (turquesa). */
  active: ExtraOralRegion[]
  onToggle: (region: ExtraOralRegion) => void
}) {
  const estadoDe = (region: ExtraOralRegion): EstadoRegion =>
    pending.includes(region) ? 'pending' : active.includes(region) ? 'active' : 'default'

  return (
    <svg viewBox="100 210 3990 880" className="h-auto w-full" role="group" aria-label="Extra oral diagram">
      <image href={cabezas} width="4096" height="1283" className="grayscale" />
      {FORMAS.map(({ region, d }, i) => (
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
`})))()}export{n,i as r,r as t};