import { useRef } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchButton } from '@/components/ui/search-button'

/* El buscador de las listas de Settings: campo con lupa y el botón Search al lado, en la fila de abajo del
   SettingsPageHeader. Filtra mientras se escribe; Search lleva el foco al campo. Antes cada lista lo escribía a mano
   (Locations, Accounts, Ledger); Billing es la primera que lo usa. */
export function SettingsSearch({
  value, onChange, placeholder = 'Search...', className, disabled,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <>
      <div className={cn('relative min-w-0 flex-1 sm:max-w-[320px]', className)}>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          ref={ref}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-muted"
        />
      </div>
      <SearchButton onClick={() => ref.current?.focus()} className="h-9" />
    </>
  )
}
