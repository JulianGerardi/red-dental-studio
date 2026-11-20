import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import cabezas from '@/assets/extraoral-heads.png'
import { RegionDiagram, type Forma } from './RegionDiagram'
import type { ExtraOralRegion } from './data'

/* El gráfico de Extraoral: el PNG del Figma (Platform Design, Clinical Exam — Extra Oral) con las cuatro vistas
   -perfil derecho, frente, nuca, perfil izquierdo- y una zona clickeable por región encima. El PNG del Figma trae una
   región de ejemplo pintada de celeste ("Uper left"); acá se muestra sin ninguna marcada: el celeste se deshizo por
   cálculo (se estimó cómo mezcla la capa con el dibujo y se invirtió; ver modulos/clinical-mode.md), el contorno del
   dibujo es el original. Las zonas salen de las formas celestes del propio PNG, completadas por simetría, y de la
   partición que se ve en red.dev (2026-10-24); el contorno exacto de cada una es una aproximación. Right = lado derecho
   del paciente: en el frente queda a la izquierda del dibujo, en la nuca a la derecha. Coordenadas del PNG original
   (4096 px). */

const FORMAS: Forma<ExtraOralRegion>[] = [
  /* Perfil derecho */
  { region: 'Right Posterior Head', d: 'M231 355L364 359L438 367L443 371L451 405L464 437L452 444L427 479L421 480L393 459L373 458L354 467L340 481L328 503L321 541L324 575L342 612L366 630L355 674L356 730L275 715L271 690L256 653L203 566L190 516L190 456L203 405Z' },
  { region: 'Right Forehead', d: 'M447 369L469 435L481 451L507 470L581 490L707 506L703 452L687 405Z' },
  /* Frente */
  { region: 'Scalp', d: 'M1278 333L1292 300L1330 268L1400 246L1480 239L1560 246L1630 268L1668 300L1682 333Z' },
  { region: 'Right Forehead', d: 'M1299 333L1279 383L1274 449L1276 499L1480 502L1480 343Z' },
  { region: 'Left Forehead', d: 'M1661 333L1681 383L1686 449L1684 499L1480 502L1480 343Z' },
  { region: 'Right Eye', d: 'M1333 548a72 40 0 1 0 144 0a72 40 0 1 0 -144 0Z' },
  { region: 'Left Eye', d: 'M1488 548a72 40 0 1 0 144 0a72 40 0 1 0 -144 0Z' },
  /* Nuca */
  { region: 'Left Posterior Head', d: 'M2566 336L2539 391L2539 451L2557 574L2585 683L2742 687L2744 344Z' },
  { region: 'Right Posterior Head', d: 'M2924 336L2951 391L2951 451L2933 574L2905 683L2748 687L2746 344Z' },
  /* Perfil izquierdo */
  { region: 'Left Posterior Head', d: 'M3986 355L3853 359L3779 367L3774 371L3766 405L3753 437L3765 444L3790 479L3796 480L3824 459L3844 458L3863 467L3877 481L3889 503L3896 541L3893 575L3875 612L3851 630L3862 674L3861 730L3942 715L3946 690L3961 653L4014 566L4027 516L4027 456L4014 405Z' },
  { region: 'Left Forehead', d: 'M3770 369L3748 435L3736 451L3710 470L3636 490L3510 506L3514 452L3530 405Z' },
]

export function ExtraOralDiagram({
  pending, active, onToggle,
}: {
  /** Regiones elegidas ahora, antes de guardar (ámbar): lo que se ve en "Selected area" del drawer abierto. */
  pending: ExtraOralRegion[]
  /** Regiones con una condition activa ya guardada (turquesa). */
  active: ExtraOralRegion[]
  onToggle: (region: ExtraOralRegion) => void
}) {
  return (
    <RegionDiagram
      titulo="Extra oral diagram" imagen={cabezas} ancho={4096} alto={1283} viewBox="100 210 3990 880"
      formas={FORMAS} pending={pending} active={active} onToggle={onToggle}
    />
  )
}
`})))()}export{n,i as r,r as t};