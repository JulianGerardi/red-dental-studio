import type { ReactNode } from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* El aviso de la app: un mensaje en la pantalla, con ícono, título y texto, en los colores de los estados (los mismos
   que Pill). Es el bloque Alert del constructor, ahora como componente: el constructor lee los tonos de acá. */
export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export const ALERT_TONES: Record<AlertTone, { caja: string; color: string; icono: LucideIcon; nombre: string }> = {
  info: { caja: 'border-dash-busy-fg/25 bg-info-bg', color: 'text-dash-busy-fg', icono: Info, nombre: 'Info' },
  success: { caja: 'border-dash-ok-fg/25 bg-dash-ok-bg', color: 'text-dash-ok-fg', icono: CircleCheck, nombre: 'CircleCheck' },
  warning: { caja: 'border-warn-fg/25 bg-warn-bg', color: 'text-warn-fg', icono: TriangleAlert, nombre: 'TriangleAlert' },
  danger: { caja: 'border-dash-bad-fg/25 bg-dash-bad-bg', color: 'text-dash-bad-fg', icono: CircleAlert, nombre: 'CircleAlert' },
}

export function Alert({ tone = 'info', title, children, className }: { tone?: AlertTone; title: string; children?: ReactNode; className?: string }) {
  const t = ALERT_TONES[tone]
  return (
    <div role="status" className={cn('flex items-start gap-3 rounded-lg border px-4 py-3', t.caja, className)}>
      <t.icono className={cn('mt-0.5 size-4 shrink-0', t.color)} aria-hidden />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className={cn('text-[13px] font-semibold', t.color)}>{title}</p>
        {children && <p className="text-[13px] leading-relaxed text-ink">{children}</p>}
      </div>
    </div>
  )
}
