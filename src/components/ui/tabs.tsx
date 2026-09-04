import { cn } from '@/lib/utils'

/* Pill tabs del original: contenedor gris, tab activo blanco/azul. */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
  variant = 'muted',
}: {
  tabs: readonly T[]
  value: T
  onChange: (v: T) => void
  className?: string
  variant?: 'muted' | 'primary'
}) {
  return (
    <div className={cn('bg-muted inline-flex items-center rounded-lg p-1', className)}>
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            value === t
              ? variant === 'primary'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
