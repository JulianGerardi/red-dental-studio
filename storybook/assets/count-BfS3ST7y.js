import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* El globo con una cuenta (alergias, medicación…): círculo con un dígito, píldora con dos. No marca un estado: eso es
   Pill. Decisión en design-reference/figma/modulos/patient-dashboard.md (2026-10-07). */

export const COUNT_TONES = {
  default: 'bg-dash-count-bg text-dash-blue-hover',
  /* Sobre una card azul (la abierta): fondo claro, número azul. */
  active: 'bg-info-bg text-dash-blue',
}

export function Count({
  active, className, children,
}: { active?: boolean; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] leading-none font-medium',
        active ? COUNT_TONES.active : COUNT_TONES.default,
        className,
      )}
    >
      {children}
    </span>
  )
}
`})))()}export{n,i as r,r as t};