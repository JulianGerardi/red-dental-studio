import { ListFilter } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/* El embudo del Figma está dibujado pero no tiene menú. Acá despliega la lista
   de categorías y filtra de verdad; sin nada tildado se muestra todo.
   Mismo componente shadcn que el selector de columnas de Ledger -antes cada
   uno tenía su propio dropdown hand-rolled, con checkbox dibujado distinto. */
export function FilterMenu({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  /** Vacío = sin filtro. */
  value: string[]
  onChange: (v: string[]) => void
}) {
  const alternar = (o: string) =>
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={label}
          data-tour="dash-filter"
          className="relative rounded-md p-1.5 text-[#09090b] transition-colors hover:bg-[#f4f4f5]"
        >
          <ListFilter className="size-4" />
          {value.length > 0 && (
            <span className="bg-dash-blue absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-semibold text-white">
              {value.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[190px]">
        {options.map((o) => (
          <DropdownMenuCheckboxItem
            key={o}
            checked={value.includes(o)}
            onCheckedChange={() => alternar(o)}
            onSelect={(e) => e.preventDefault()}
          >
            {o}
          </DropdownMenuCheckboxItem>
        ))}
        {value.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-dash-blue w-full rounded-md px-1.5 py-1 text-left text-sm font-semibold hover:bg-[#f4f4f5]"
            >
              Clear filter
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
