import { Columns3 } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { filterTriggerClasses } from '@/components/ui/filter-menu'

/* Elegir qué columnas se ven. Lo tenía sólo la tabla de asignación; la de
   Transactions quedó sin control hasta que Julián pidió emparejarlas con
   Confidentally 2.0, donde las dos lo traen. Ver
   design-reference/figma/modulos/ledger.md. */
export function ColumnPicker<T extends string>({
  columnas, ocultas, onToggle, onReset, size = 'md', porDefecto = [],
}: {
  columnas: { id: T; label: string; bloqueada?: boolean }[]
  ocultas: T[]
  onToggle: (id: T) => void
  onReset: () => void
  /** El del filtro que tiene al lado: md junto a buscadores, sm en encabezados de cards. */
  size?: 'sm' | 'md'
  /** Las opcionales que arrancan ocultas (Unapplied Credit en el Ledger): con esas no se marca como cambiado. */
  porDefecto?: T[]
}) {
  const cambiado = ocultas.length !== porDefecto.length || ocultas.some((c) => !porDefecto.includes(c))
  return (
    <DropdownMenu>
      {/* Mismo botón que el filtro: azul cuando se cambiaron las columnas de entrada. */}
      <DropdownMenuTrigger className={filterTriggerClasses(size, cambiado)}>
        <Columns3 aria-hidden /> Columns
        {cambiado && (
          <span className="bg-dash-blue flex h-4 items-center justify-center rounded-full px-1.5 text-[10px] leading-none font-semibold text-white tabular-nums">
            {columnas.length - ocultas.length}/{columnas.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="text-[11px] tracking-wide text-ink-muted uppercase">
          Visible columns
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
        {cambiado && (
          <>
            <DropdownMenuSeparator />
            <button
              type="button"
              onClick={onReset}
              className="text-dash-blue w-full rounded-md px-1.5 py-1 text-left text-sm font-semibold hover:bg-surface-muted"
            >
              {porDefecto.length ? 'Reset to default' : 'Show all columns'}
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

