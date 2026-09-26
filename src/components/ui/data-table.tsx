import { useState, type ReactNode } from 'react'
import { SearchX, type LucideIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { EmptyState } from '@/components/ui/empty-state'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { cn } from '@/lib/utils'

/* Tabla estándar de la app: la misma anatomía que Patients, Team, Accounts y
   Documents -caja con borde, encabezado gris, filas con divisor, pie con
   "Showing X to Y of N" y paginación- en un solo componente. Se arma
   pasándole columnas y filas; lo demás (selección, menú de fila, estado
   vacío, paginación) se prende con props. Ver Elements / Tables en Storybook. */

export type DataTableColumn<T> = {
  key: string
  header: string
  /** Ancho fijo en px. Sin ancho, la columna se estira y ocupa lo que sobra. */
  width?: number
  align?: 'left' | 'center' | 'right'
  cell: (row: T) => ReactNode
}

const ALTO_FILA = { regular: 'h-14', compact: 'h-11' } as const
const ALINEAR = { left: 'justify-start text-left', center: 'justify-center text-center', right: 'justify-end text-right' } as const

/* Ancho mínimo de la columna que se estira. */
const MIN_FLEX = 160
const GAP = 12
const PADDING = 32

export function DataTable<T>({
  columns, rows, rowKey, rowLabel, selectable, rowActions, onRowClick,
  pageSize = 10, itemLabel = 'results', density = 'regular', toolbar,
  empty = { title: 'No results', detail: 'Try a different search or filter.' },
}: {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  /** Nombre de la fila para lectores de pantalla (casilla y menú). */
  rowLabel?: (row: T) => string
  /** Casilla por fila y "seleccionar todo" en el encabezado. */
  selectable?: boolean
  /** Ítems del menú ⋮ de cada fila (DropdownMenuItem). */
  rowActions?: (row: T) => ReactNode
  /** La fila entera es clickeable. */
  onRowClick?: (row: T) => void
  pageSize?: number
  /** Qué se cuenta en el pie: "Showing 1 to 10 of 24 patients". */
  itemLabel?: string
  density?: keyof typeof ALTO_FILA
  /** Barra de arriba: buscador, filtros, acción principal. */
  toolbar?: ReactNode
  empty?: { icon?: LucideIcon; title: string; detail?: string }
}) {
  const [pagina, setPagina] = useState(1)
  const [elegidas, setElegidas] = useState<string[]>([])

  const paginas = Math.max(1, Math.ceil(rows.length / pageSize))
  const actual = Math.min(pagina, paginas)
  const visibles = rows.slice((actual - 1) * pageSize, actual * pageSize)
  const desde = rows.length === 0 ? 0 : (actual - 1) * pageSize + 1
  const hasta = desde === 0 ? 0 : desde + visibles.length - 1

  const ids = visibles.map(rowKey)
  const todas = ids.length > 0 && ids.every((id) => elegidas.includes(id))
  const alternar = (id: string) => setElegidas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const alternarTodas = () => setElegidas((p) => (todas ? p.filter((x) => !ids.includes(x)) : [...new Set([...p, ...ids])]))
  const nombre = (r: T) => rowLabel?.(r) ?? rowKey(r)

  /* Ancho mínimo: si no entra, la tabla scrollea dentro de su caja en vez de
     aplastar las columnas. */
  const anchos = columns.map((c) => c.width ?? MIN_FLEX)
  const extras = (selectable ? 16 : 0) + (rowActions ? 40 : 0)
  const huecos = columns.length - 1 + (selectable ? 1 : 0) + (rowActions ? 1 : 0)
  const minimo = anchos.reduce((a, b) => a + b, 0) + extras + huecos * GAP + PADDING

  const celda = (c: DataTableColumn<T>) =>
    cn('flex min-w-0 items-center', ALINEAR[c.align ?? 'left'], c.width === undefined && 'flex-1')
  const ancho = (c: DataTableColumn<T>) => (c.width !== undefined ? { width: c.width, flexShrink: 0 } : { minWidth: MIN_FLEX })

  return (
    <div className="flex flex-col gap-3">
      {toolbar && <div className="flex flex-wrap items-center gap-2">{toolbar}</div>}
      <div className="overflow-x-auto rounded-lg border border-line-row bg-white">
        <div style={{ minWidth: minimo }}>
          <div role="row" className="flex h-11 items-center gap-3 bg-surface-alt px-4 text-[11px] font-semibold text-ink-muted">
            {selectable && <Checkbox on={todas} onChange={alternarTodas} label="Select all rows" />}
            {columns.map((c) => <div key={c.key} role="columnheader" className={celda(c)} style={ancho(c)}><span className="truncate">{c.header}</span></div>)}
            {rowActions && <div role="columnheader" className="w-10 shrink-0 text-center">Actions</div>}
          </div>

          {rows.length === 0 ? (
            <EmptyState icon={empty.icon ?? SearchX} title={empty.title} detail={empty.detail} className="border-t border-line-row" />
          ) : (
            visibles.map((r) => {
              const id = rowKey(r)
              const elegida = elegidas.includes(id)
              return (
                <div
                  key={id}
                  role="row"
                  aria-selected={selectable ? elegida : undefined}
                  onClick={onRowClick ? () => onRowClick(r) : undefined}
                  className={cn(
                    'flex items-center gap-3 border-t border-line-row px-4 text-[13px] text-ink-soft transition-colors',
                    ALTO_FILA[density],
                    elegida ? 'bg-dash-count-bg' : onRowClick && 'cursor-pointer hover:bg-surface-subtle',
                  )}
                >
                  {selectable && (
                    <span onClick={(e) => e.stopPropagation()} className="flex">
                      <Checkbox on={elegida} onChange={() => alternar(id)} label={`Select ${nombre(r)}`} />
                    </span>
                  )}
                  {columns.map((c) => <div key={c.key} role="cell" className={celda(c)} style={ancho(c)}>{c.cell(r)}</div>)}
                  {rowActions && (
                    <div className="flex w-10 shrink-0 justify-center" onClick={(e) => e.stopPropagation()}>
                      <RowActionsMenu label={nombre(r)}>{rowActions(r)}</RowActionsMenu>
                    </div>
                  )}
                </div>
              )
            })
          )}

          {rows.length > 0 && (
            <div className="flex h-[52px] items-center justify-between gap-3 border-t border-line-row px-4">
              <p className="text-xs font-semibold text-ink-muted">
                {selectable && elegidas.length > 0 ? `${elegidas.length} selected · ` : ''}Showing {desde} to {hasta} of {rows.length} {itemLabel}
              </p>
              <Pagination pagina={actual} paginas={paginas} onChange={setPagina} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* Celdas que se repiten en las tablas de la app. */

/** Iniciales en un círculo azul y el nombre como link. */
export function PersonCell({ name, initials, onClick }: { name: string; initials: string; onClick?: () => void }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="bg-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-surface-subtle">{initials}</span>
      <button type="button" onClick={onClick} className="text-dash-blue truncate text-[13px] font-semibold hover:underline">{name}</button>
    </span>
  )
}

/** Texto que se corta con "…" si no entra, con el texto completo al pasar el mouse. */
export function TextCell({ children, strong }: { children: string; strong?: boolean }) {
  return <span title={children} className={cn('truncate', strong && 'font-medium text-ink')}>{children}</span>
}

/** Monto alineado a la derecha, con cifras de ancho fijo. */
export function AmountCell({ value }: { value: number }) {
  return <span className={cn('font-medium tabular-nums', value < 0 ? 'text-dash-ok-fg' : 'text-ink')}>{value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
}
