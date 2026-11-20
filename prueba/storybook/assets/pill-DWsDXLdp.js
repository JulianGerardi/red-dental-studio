import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* Pill de estado, reusada en toda tabla del sistema (Accounts, Employees,
   Locations, Patients, Relationships, Insurance, Documents, Ledger): mismo
   radio, tipografía y los seis tonos que ya circulaban repetidos —y a veces
   ligeramente distintos— en cada pantalla. */

export type PillTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'purple'

export const PILL_TONES: Record<PillTone, string> = {
  success: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg',
  info: 'border-dash-busy-fg bg-info-bg text-dash-busy-fg',
  warning: 'border-warn-fg bg-warn-bg text-warn-fg',
  danger: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg',
  neutral: 'border-ink-faint bg-[#f5f5f5] text-[#595959]',
  purple: 'border-purple-fg bg-purple-bg text-purple-fg',
}

export const PILL_SIZES = {
  md: 'px-2.5 py-[3px] text-[11px]',
  sm: 'px-2 py-[1px] text-[10px]',
}

export function Pill({
  tone, size = 'md', className, children,
}: { tone: PillTone; size?: keyof typeof PILL_SIZES; className?: string; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border font-semibold', PILL_SIZES[size], PILL_TONES[tone], className)}>
      {children}
    </span>
  )
}
`})))()}export{r as n,n as r,i as t};