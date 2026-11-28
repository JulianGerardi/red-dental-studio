import { cn } from '@/lib/utils'

/* Compartidos entre la ficha de empleado y la de locación: la misma card con
   título opcional, y el mismo switch Yes/No. */
export function Card({ title, action, children, className }: {
  title?: string
  /** Un control a la derecha del título (la dentición de Teeth & surface). */
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('rounded-lg bg-surface shadow-panel p-4 sm:p-5', className)} aria-label={title}>
      {title && (
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-sm font-bold text-ink">{title}</h2>
          {action && <span className="ml-auto">{action}</span>}
        </div>
      )}
      <div className={title ? 'mt-4' : ''}>{children}</div>
    </section>
  )
}

export function Toggle({
  label, on, onChange, ariaLabel, disabled,
}: {
  label?: string
  on: boolean
  onChange: (v: boolean) => void
  /** Nombre para el lector de pantalla cuando el rótulo no va arriba del switch. */
  ariaLabel?: string
  /** Sólo lectura: se ve el valor, no se cambia. */
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs font-medium text-ink">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={ariaLabel ?? label}
        disabled={disabled}
        onClick={() => onChange(!on)}
        className="flex w-fit items-center gap-2 rounded-full text-[13px] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className={cn('flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-dash-blue' : 'bg-line-strong')}>
          <span className={cn('size-4 rounded-full bg-surface transition-transform', on && 'translate-x-4')} />
        </span>
        {on ? 'Yes' : 'No'}
      </button>
    </div>
  )
}
