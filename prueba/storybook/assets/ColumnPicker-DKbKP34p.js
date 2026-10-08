import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Columns3 } from 'lucide-react'
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
  columnas, ocultas, onToggle, onReset, size = 'md',
}: {
  columnas: { id: T; label: string; bloqueada?: boolean }[]
  ocultas: T[]
  onToggle: (id: T) => void
  onReset: () => void
  /** El del filtro que tiene al lado: md junto a buscadores, sm en encabezados de cards. */
  size?: 'sm' | 'md'
}) {
  return (
    <DropdownMenu>
      {/* Mismo botón que el filtro: azul cuando hay columnas ocultas. */}
      <DropdownMenuTrigger className={filterTriggerClasses(size, ocultas.length > 0)}>
        <Columns3 aria-hidden /> Columns
        {ocultas.length > 0 && (
          <span className="bg-dash-blue flex h-4 items-center justify-center rounded-full px-1.5 text-[10px] leading-none font-semibold text-white tabular-nums">
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

`})))()}export{n,i as r,r as t};