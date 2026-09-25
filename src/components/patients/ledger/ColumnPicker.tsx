import { Columns3 } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/* Elegir qué columnas se ven. Lo tenía sólo la tabla de asignación; la de
   Transactions quedó sin control hasta que Julián pidió emparejarlas con
   Confidentally 2.0, donde las dos lo traen. Ver
   design-reference/figma/modulos/ledger.md. */
export function ColumnPicker<T extends string>({
  columnas, ocultas, onToggle, onReset,
}: {
  columnas: { id: T; label: string; bloqueada?: boolean }[]
  ocultas: T[]
  onToggle: (id: T) => void
  onReset: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink-muted hover:bg-surface-muted">
        <Columns3 className="size-3.5" /> Columns
        {ocultas.length > 0 && (
          <span className="text-dash-blue rounded-full bg-[#eef5ff] px-1.5 text-[10px] font-bold">
            {columnas.length - ocultas.length}/{columnas.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="text-[11px] tracking-wide text-ink-muted uppercase">
          Show columns
        </DropdownMenuLabel>
        {columnas.map((c) => (
          <DropdownMenuCheckboxItem
            key={c.id}
            checked={!ocultas.includes(c.id)}
            disabled={c.bloqueada}
            onCheckedChange={() => onToggle(c.id)}
            onSelect={(e) => e.preventDefault()}
          >
            {c.label}
          </DropdownMenuCheckboxItem>
        ))}
        {ocultas.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <button
              type="button"
              onClick={onReset}
              className="text-dash-blue w-full rounded-md px-1.5 py-1 text-left text-sm font-semibold hover:bg-surface-muted"
            >
              Show all columns
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

