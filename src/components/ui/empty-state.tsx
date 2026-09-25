import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Figma (Design System) 7476:11618. Estado vacío del sistema: cuadrito
   `#e8eef8` con el icono en `#1d56bc`, título, bajada de dos líneas y, según
   el caso, un botón primario o la pastilla gris de "planeado".
   Reemplaza los vacíos sueltos que cada pantalla se había inventado. */
export function EmptyState({
  icon: Icon,
  title,
  detail,
  accion,
  pill,
  className,
}: {
  icon?: LucideIcon
  title: string
  detail?: string
  accion?: { label: string; onClick: () => void }
  /* Para lo que todavía no existe: "PLANNED", "COMING SOON". */
  pill?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-2 px-6 py-10 text-center',
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-brand-tint">
        {Icon ? <Icon className="text-dash-blue size-4" /> : <span className="bg-dash-blue size-2.5 rounded-full" />}
      </span>
      <p className="text-sm font-bold text-ink">{title}</p>
      {detail && (
        <p className="max-w-[260px] text-xs leading-[1.5] text-ink-faint">{detail}</p>
      )}
      {accion && (
        <button
          type="button"
          onClick={accion.onClick}
          className="bg-dash-blue hover:bg-dash-blue-hover mt-1 h-9 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
        >
          {accion.label}
        </button>
      )}
      {pill && (
        <span className="mt-1 rounded-md bg-[#f2f5f7] px-2 py-1 text-[10px] font-semibold tracking-wide text-dash-delta uppercase">
          {pill}
        </span>
      )}
    </div>
  )
}
