import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* El campo de búsqueda de la app: lupa a la izquierda, mismos tamaños que Button (sm 28 · md 32 · lg 36). Regla
   (auditoría de normalización, 2026-11-20, figma/README.md): `md` en la barra de una página, debajo del título, con
   SearchButton al lado; `sm` dentro de una card. Filtra mientras se escribe. */
const TAMANO = {
  sm: { caja: 'h-7 pl-8 text-[12px]', lupa: 'left-2.5 size-3.5' },
  md: { caja: 'h-8 pl-9 text-[13px]', lupa: 'left-3 size-4' },
  lg: { caja: 'h-9 pl-9 text-[13px]', lupa: 'left-3 size-4' },
} as const

export type SearchInputSize = keyof typeof TAMANO

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  value: string
  onChange: (v: string) => void
  size?: SearchInputSize
  /** Clases del contenedor (ancho). Por defecto ocupa lo que hay hasta 320px. */
  className?: string
  /** Muestra una X para borrar cuando hay texto. */
  clearable?: boolean
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, size = 'md', className, clearable, placeholder, 'aria-label': ariaLabel, disabled, ...props }, ref) => {
    const t = TAMANO[size]
    return (
      <div className={cn('relative min-w-0 flex-1 sm:max-w-[320px]', className)}>
        <Search aria-hidden className={cn('pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-faint', t.lupa)} />
        <input
          ref={ref}
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel ?? placeholder}
          className={cn(
            'focus:border-dash-blue w-full rounded-md border border-line bg-surface shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-muted',
            t.caja, clearable && value ? 'pr-8' : 'pr-3',
          )}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange('')}
            className="absolute top-1/2 right-1.5 flex size-5 -translate-y-1/2 items-center justify-center rounded text-ink-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-dash-blue"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    )
  },
)
SearchInput.displayName = 'SearchInput'
