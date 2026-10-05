import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Los badges clínicos del header: CC (Chief Complaint) y TR (Triage), con tilde o cruz, en los estados del design
   system 2.0 (Figma 254:2930): active (lleno), inactive (suave) y disabled (gris). `md` es el tamaño del header, más
   grande que el de Figma para que el tilde se lea. Ver design-reference/figma/modulos/clinical-mode.md. */
export type TipoBadge = 'CC' | 'TR'
export type ResultadoBadge = 'ok' | 'no'
export type EstadoBadge = 'active' | 'inactive' | 'disabled'

const TONO: Record<ResultadoBadge, Record<EstadoBadge, string>> = {
  ok: { active: 'bg-status-ok text-white', inactive: 'bg-status-ok-muted text-status-ok-strong', disabled: 'bg-surface-muted text-line-strong' },
  no: { active: 'bg-required text-white', inactive: 'bg-status-bad-muted text-status-bad-strong', disabled: 'bg-surface-muted text-line-strong' },
}
const TAMANO = {
  sm: 'h-[22px] gap-[5px] px-[7px] text-[10px] [&_svg]:size-[11px]',
  md: 'h-7 gap-1.5 px-2.5 text-[13px] [&_svg]:size-3',
}

export function ClinicalBadge({
  tipo, resultado = 'ok', estado = 'active', size = 'sm', className,
}: {
  tipo: TipoBadge
  resultado?: ResultadoBadge
  estado?: EstadoBadge
  size?: keyof typeof TAMANO
  className?: string
}) {
  const Icono = resultado === 'ok' ? Check : X
  return (
    <span className={cn('inline-flex shrink-0 items-center rounded-full font-semibold whitespace-nowrap', TAMANO[size], TONO[resultado][estado], className)}>
      <Icono strokeWidth={3} aria-hidden /> {tipo}
    </span>
  )
}
