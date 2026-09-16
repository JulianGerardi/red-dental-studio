import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* Pill de estado, reusada en toda tabla del sistema (Accounts, Employees,
   Locations, Patients, Relationships, Insurance, Documents, Ledger): mismo
   radio, tipografía y los seis tonos que ya circulaban repetidos —y a veces
   ligeramente distintos— en cada pantalla. */

export type PillTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'purple'

const TONO: Record<PillTone, string> = {
  success: 'border-[#1a804d] bg-[#f0fcf5] text-[#1a804d]',
  info: 'border-[#174596] bg-[#f0f5ff] text-[#174596]',
  warning: 'border-[#99660d] bg-[#fffaf0] text-[#99660d]',
  danger: 'border-[#b22626] bg-[#fff2f2] text-[#b22626]',
  neutral: 'border-[#a1a1aa] bg-[#f5f5f5] text-[#595959]',
  purple: 'border-[#6633a6] bg-[#f5f0ff] text-[#6633a6]',
}

export function Pill({ tone, className, children }: { tone: PillTone; className?: string; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-[3px] text-[11px] font-semibold', TONO[tone], className)}>
      {children}
    </span>
  )
}
