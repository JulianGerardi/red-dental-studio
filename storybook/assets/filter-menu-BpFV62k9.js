import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { forwardRef, Fragment, type ButtonHTMLAttributes } from 'react'
import { ListFilter, Search, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PillTone } from '@/components/ui/pill'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/* El filtro de la app, uno solo para todas las pantallas (antes había un ícono suelto en el Dashboard, un select nativo en
   Accounts, un desplegable propio en la Problem List y un popover en Workflows). Mismo botón -ícono, "Filter" y cuántos
   filtros hay aplicados- y mismo menú: grupos de varias opciones (casillas) o de una (radio), con cantidad, color o ícono
   por opción, búsqueda opcional y Clear all. Se aplica al tocar, sin botón Apply. Ver Elements / Filter. */

export type FilterOption = string | {
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}

export type FilterGroup =
  | { title?: string; type?: 'multiple'; options: FilterOption[]; value: string[]; onChange: (v: string[]) => void }
  | { title?: string; type: 'single'; options: FilterOption[]; value: string; onChange: (v: string) => void; /** El valor de "sin filtro" (All, o el que abre por defecto): no cuenta y Clear all vuelve a él. */ defaultValue?: string }

export type FilterSearch = { label: string; placeholder?: string; value: string; onChange: (v: string) => void }

const PUNTO: Record<PillTone, string> = {
  success: 'bg-dash-ok-fg', info: 'bg-dash-busy-fg', warning: 'bg-warn-fg', danger: 'bg-dash-bad-fg', neutral: 'bg-ink-faint', purple: 'bg-purple-fg',
}

const TAMANO = {
  sm: 'h-7 gap-1.5 px-2.5 text-[12px] [&_svg]:size-3.5',
  md: 'h-9 gap-2 px-3 text-[13px] [&_svg]:size-4',
} as const

/* El botón del filtro. Solo, sin menú, sirve para los filtros que todavía no filtran. */
export const FilterTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Cuántos filtros hay aplicados; con 1 o más el botón se pinta de azul. */
  count?: number
  size?: keyof typeof TAMANO
  /** Nombre para lectores de pantalla ("Filter appointments"). */
  label?: string
}>(({ count = 0, size = 'md', label = 'Filter', className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label={count ? \`\${label} (\${count} applied)\` : label}
    className={cn(
      'focus-visible:outline-dash-blue inline-flex shrink-0 items-center rounded-md border font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors disabled:pointer-events-none disabled:opacity-50',
      TAMANO[size],
      count ? 'border-dash-blue bg-info-bg text-dash-blue' : 'data-[state=open]:border-dash-blue border-line bg-white text-ink hover:bg-surface-subtle',
      className,
    )}
    {...props}
  >
    <ListFilter aria-hidden />
    Filter
    {count > 0 && <span className="bg-dash-blue flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-semibold text-white tabular-nums">{count}</span>}
  </button>
))
FilterTrigger.displayName = 'FilterTrigger'

const opcion = (o: FilterOption) => (typeof o === 'string' ? { value: o } : o)

/* Lo que va adentro de cada opción: punto o ícono, el nombre y la cantidad. */
export function FilterOptionLabel({ o, reservar }: { o: Exclude<FilterOption, string>; /** Otras opciones del grupo llevan punto o ícono: deja el lugar para que los nombres queden alineados. */ reservar?: 'punto' | 'icono' }) {
  const Icono = o.icon
  return (
    <>
      {o.tone ? <span aria-hidden className={cn('size-2 shrink-0 rounded-full', PUNTO[o.tone])} />
        : Icono ? <Icono className="size-3.5 shrink-0 text-ink-muted" aria-hidden />
        : reservar ? <span aria-hidden className={cn('shrink-0', reservar === 'punto' ? 'size-2' : 'size-3.5')} /> : null}
      <span className="min-w-0 flex-1 truncate">{o.label ?? o.value}</span>
      {o.count !== undefined && <span className={cn('text-[11px] tabular-nums', o.count ? 'text-ink-muted' : 'text-ink-faint')}>{o.count}</span>}
    </>
  )
}

export function FilterMenu({
  label = 'Filter', options, value, onChange, groups, search, result, size = 'md', align = 'end', tour, disabled,
}: {
  /** Nombre para lectores de pantalla y título del menú. */
  label?: string
  /** Forma corta: un solo grupo de varias opciones. */
  options?: FilterOption[]
  value?: string[]
  onChange?: (v: string[]) => void
  groups?: FilterGroup[]
  search?: FilterSearch
  /** Una línea al pie con lo que queda: "4 of 6 workflows". */
  result?: string
  /** md 36px junto a buscadores · sm 28px en encabezados de cards y paneles. */
  size?: keyof typeof TAMANO
  align?: 'start' | 'end'
  /** Ancla del tour de ayuda. */
  tour?: string
  disabled?: boolean
}) {
  const grupos: FilterGroup[] = groups ?? [{ type: 'multiple', options: options ?? [], value: value ?? [], onChange: onChange ?? (() => {}) }]
  const aplicados =
    grupos.reduce((n, g) => n + (g.type === 'single' ? (g.value !== (g.defaultValue ?? '') ? 1 : 0) : g.value.length), 0) + (search?.value.trim() ? 1 : 0)
  const limpiar = () => {
    grupos.forEach((g) => (g.type === 'single' ? g.onChange(g.defaultValue ?? '') : g.onChange([])))
    search?.onChange('')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <FilterTrigger count={aplicados} size={size} label={label} data-tour={tour} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-[248px]">
        <div className="flex items-center justify-between gap-2 px-2 py-1.5">
          <span className="text-[12px] font-semibold text-ink">Filters</span>
          {aplicados > 0 && (
            <button type="button" onClick={limpiar} className="text-dash-blue text-[12px] font-medium hover:underline">Clear all</button>
          )}
        </div>
        {/* La búsqueda va primero, antes de las opciones. */}
        {search && (
          <>
            <DropdownMenuSeparator />
            <label className="flex flex-col gap-1.5 px-2 py-1.5">
              <span className="text-[11px] font-semibold text-ink-muted">{search.label}</span>
              <span className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint" />
                <input
                  value={search.value}
                  onChange={(e) => search.onChange(e.target.value)}
                  /* El menú busca por la letra que se toca: acá las teclas son del campo. */
                  onKeyDown={(e) => e.stopPropagation()}
                  placeholder={search.placeholder ?? 'Search...'}
                  className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-2 pl-8 text-[12px] placeholder:text-ink-faint focus:outline-none"
                />
              </span>
            </label>
          </>
        )}
        {grupos.map((g, i) => {
          const opciones = g.options.map(opcion)
          const reservar = opciones.some((o) => o.tone) ? 'punto' : opciones.some((o) => o.icon) ? 'icono' : undefined
          return (
          <Fragment key={i}>
            <DropdownMenuSeparator />
            {g.title && <DropdownMenuLabel className="text-[11px] font-semibold text-ink-muted">{g.title}</DropdownMenuLabel>}
            {g.type === 'single' ? (
              <DropdownMenuRadioGroup value={g.value} onValueChange={g.onChange}>
                {opciones.map((o) => (
                  <DropdownMenuRadioItem key={o.value} value={o.value} disabled={o.disabled} className="gap-2 text-[13px]">
                    <FilterOptionLabel o={o} reservar={reservar} />
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            ) : (
              opciones.map((o) => (
                <DropdownMenuCheckboxItem
                  key={o.value}
                  checked={g.value.includes(o.value)}
                  disabled={o.disabled && !g.value.includes(o.value)}
                  onCheckedChange={() => g.onChange(g.value.includes(o.value) ? g.value.filter((x) => x !== o.value) : [...g.value, o.value])}
                  onSelect={(e) => e.preventDefault()}
                  className="gap-2 text-[13px]"
                >
                  <FilterOptionLabel o={o} reservar={reservar} />
                </DropdownMenuCheckboxItem>
              ))
            )}
          </Fragment>
          )
        })}
        {result && (
          <>
            <DropdownMenuSeparator />
            <p className="px-2 py-1 text-[11px] text-ink-muted tabular-nums">{result}</p>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
`})))()}export{n,i as r,r as t};