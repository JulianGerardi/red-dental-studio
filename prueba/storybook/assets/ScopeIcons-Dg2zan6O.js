import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Grid2x2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import diente from '@/assets/procedure-icons/tooth.svg'
import boca from '@/assets/procedure-icons/mouth.svg'
import arco from '@/assets/procedure-icons/arch.svg'
import type { ProcedureScope } from './data'

/* La iconografía de procedimientos del design system 2.0 (Figma 535:2307 y 535:2822): diente, boca y arcada, en blanco
   sobre un cuadrado del color del estado. Figma no tiene ícono de superficie: va el de la grilla. Ver
   design-reference/figma/modulos/clinical-mode.md. */

/* Qué es cada ícono, para su tooltip. */
export const NOMBRE_ALCANCE: Record<ProcedureScope, string> = { Tooth: 'Tooth', Surface: 'Surface', Quadrant: 'Quadrant', Arch: 'Arch' }

export function ArchIcon({ className }: { className?: string }) {
  return <img src={arco} alt="" aria-hidden className={cn('size-[18px] shrink-0', className)} />
}

export function ScopeIcon({ scope, className }: { scope: ProcedureScope; className?: string }) {
  if (scope === 'Tooth') return <img src={diente} alt="" aria-hidden className={cn('size-[13px] shrink-0', className)} />
  if (scope === 'Surface') return <Grid2x2 aria-hidden className={cn('size-[15px] shrink-0 text-white', className)} strokeWidth={2.4} />
  if (scope === 'Quadrant') return <img src={boca} alt="" aria-hidden className={cn('size-[18px] shrink-0', className)} />
  return <ArchIcon className={className} />
}
`})))()}export{n,i as r,r as t};