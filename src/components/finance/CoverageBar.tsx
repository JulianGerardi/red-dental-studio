import { cn } from '@/lib/utils'

/* Lo que paga el plan en una categoría: la barra y el número. Verde si cubre todo, azul si cubre una parte y "Not covered"
   en gris si no cubre. Ver design-reference/figma/modulos/settings-billing.md. */

const TAMANO = { sm: 'w-10', md: 'w-16' } as const

export function CoverageBar({
  value, size = 'md', className,
}: {
  /** 0 a 100. */
  value: number
  /** md en las tablas · sm en resúmenes y drawers angostos. */
  size?: keyof typeof TAMANO
  className?: string
}) {
  const v = Math.max(0, Math.min(100, value))
  if (v === 0) return <span className={cn('text-[12px] font-medium text-ink-faint', className)}>Not covered</span>
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        role="meter"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Covered at ${v}%`}
        className={cn('h-1.5 shrink-0 overflow-hidden rounded-full bg-surface-muted', TAMANO[size])}
      >
        <span className={cn('block h-full rounded-full', v === 100 ? 'bg-dash-ok-fg' : 'bg-dash-blue')} style={{ width: `${v}%` }} />
      </span>
      <span className="w-9 text-[12px] font-semibold text-ink tabular-nums">{v}%</span>
    </span>
  )
}
