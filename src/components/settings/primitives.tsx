import { cn } from '@/lib/utils'

/* Compartidos entre la ficha de empleado y la de locación: la misma card con
   título opcional, y el mismo switch Yes/No. */
export function Card({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-xl border border-line bg-white p-4 sm:p-5', className)}>
      {title && <h2 className="text-sm font-bold text-ink">{title}</h2>}
      <div className={title ? 'mt-4' : ''}>{children}</div>
    </section>
  )
}

export function Toggle({ label, on, onChange }: { label?: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs font-medium text-ink">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className="flex items-center gap-2 text-[13px] text-ink"
      >
        <span className={cn('flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-dash-blue' : 'bg-line-strong')}>
          <span className={cn('size-4 rounded-full bg-white transition-transform', on && 'translate-x-4')} />
        </span>
        {on ? 'Yes' : 'No'}
      </button>
    </div>
  )
}
