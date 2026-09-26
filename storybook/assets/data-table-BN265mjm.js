import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, GripVertical, MoveHorizontal, Search, SearchX, type LucideIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { EmptyState } from '@/components/ui/empty-state'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { FilterMenu } from '@/components/dashboard/FilterMenu'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { ColumnPicker } from '@/components/patients/ledger/ColumnPicker'
import { BotonExpandirTodo } from '@/components/patients/ledger/LedgerRowDetail'
import { ManijaResize, useAnchoColumnas } from '@/components/patients/ledger/useAnchoColumnas'
import { cn } from '@/lib/utils'

/* Tabla estándar de la app: la misma anatomía que Patients, Team, Accounts y
   Documents -caja con borde, encabezado gris, filas con divisor, pie con
   "Showing X to Y of N" y paginación- en un solo componente. Se arma
   pasándole columnas y filas; lo demás se prende con props, incluidas las
   funciones del Ledger para reducir, achicar y filtrar: buscador, filtro,
   elegir columnas, anchos que se arrastran y filas que se expanden. Usa las
   mismas piezas que el Ledger (ColumnPicker, ManijaResize, FilterMenu). Ver
   Elements / Tables en Storybook. */

export type DataTableColumn<T> = {
  key: string
  header: string
  /** Ancho fijo en px. Sin ancho, la columna se estira y ocupa lo que sobra. */
  width?: number
  align?: 'left' | 'center' | 'right'
  cell: (row: T) => ReactNode
  /** Siempre visible: no se puede ocultar desde Columns. */
  locked?: boolean
  /** Arranca oculta; se muestra desde Columns. */
  hidden?: boolean
}

/* Alto mínimo: una celda con dos líneas agranda la fila en vez de cortarse. */
const ALTO_FILA = { regular: 'min-h-14 py-2', compact: 'min-h-11 py-1.5' } as const
const ALINEAR = { left: 'justify-start text-left', center: 'justify-center text-center', right: 'justify-end text-right' } as const

/* Ancho mínimo de la columna que se estira. */
const MIN_FLEX = 160
const GAP = 12
const PADDING = 32

export function DataTable<T>({
  columns, rows, rowKey, rowLabel, selectable, rowActions, onRowClick, rowDetail, reorder,
  search, filter, columnPicker, resizable, actions,
  pageSize: pageSizeInicial = 10, pageSizeOptions, pageSizeLabel = 'Rows per page:',
  itemLabel = 'results', density = 'regular', selected, onSelectedChange,
  empty = { title: 'No results', detail: 'Try a different search or filter.' },
}: {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  /** Nombre de la fila para lectores de pantalla (casilla y menú). */
  rowLabel?: (row: T) => string
  /** Casilla por fila y "seleccionar todo" en el encabezado. */
  selectable?: boolean
  /** Selección controlada desde afuera (ids), para mostrarla fuera de la tabla. */
  selected?: string[]
  onSelectedChange?: (ids: string[]) => void
  /** Ítems del menú ⋮ de cada fila (DropdownMenuItem). */
  rowActions?: (row: T) => ReactNode
  /** La fila entera es clickeable. */
  onRowClick?: (row: T) => void
  /** Detalle que se despliega al hacer clic en la fila, como en el Ledger. */
  rowDetail?: (row: T) => ReactNode
  /** Manija para reordenar filas arrastrando (o con ↑ ↓ desde el teclado).
      \`canMove\` deja fijas las filas que no se pueden mover. */
  reorder?: { onReorder: (from: T, to: T) => void; canMove?: (row: T) => boolean }
  /** Buscador arriba de la tabla. \`match\` decide si la fila coincide. */
  search?: { placeholder?: string; match: (row: T, query: string) => boolean }
  /** Filtro por categorías (el embudo). Sin nada tildado, se ve todo. */
  filter?: { label: string; options: string[]; match: (row: T, selected: string[]) => boolean }
  /** Botón Columns para elegir qué columnas se ven. */
  columnPicker?: boolean
  /** Bordes de columna que se arrastran para achicar o ensanchar. */
  resizable?: boolean
  /** A la derecha de la barra: acción principal, exportar… */
  actions?: ReactNode
  pageSize?: number
  /** Selector de filas por página en el pie, por ejemplo [10, 25, 50]. */
  pageSizeOptions?: number[]
  pageSizeLabel?: string
  /** Qué se cuenta en el pie: "Showing 1 to 10 of 24 patients". */
  itemLabel?: string
  density?: keyof typeof ALTO_FILA
  empty?: { icon?: LucideIcon; title: string; detail?: string }
}) {
  const [pagina, setPagina] = useState(1)
  const [pageSize, setPageSize] = useState(pageSizeInicial)
  const [elegidasPropias, setElegidasPropias] = useState<string[]>([])
  const elegidas = selected ?? elegidasPropias
  /* La última selección, para que dos clics seguidos no se pisen antes de
     que la tabla vuelva a dibujarse. */
  const ultima = useRef(elegidas)
  useLayoutEffect(() => { ultima.current = elegidas })
  const setElegidas = (f: (p: string[]) => string[]) => {
    const n = f(ultima.current)
    ultima.current = n
    if (!selected) setElegidasPropias(n)
    onSelectedChange?.(n)
  }
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<string[]>([])
  const [ocultas, setOcultas] = useState<string[]>(() => columns.filter((c) => c.hidden && !c.locked).map((c) => c.key))
  const [abiertas, setAbiertas] = useState<string[]>([])
  const arrastrada = useRef<T | null>(null)
  const anchos = useAnchoColumnas<string>(Object.fromEntries(columns.map((c) => [c.key, c.width ?? MIN_FLEX])))

  /* Si las filas cambian desde afuera (la pantalla busca o filtra), se vuelve
     a la primera página. */
  const firma = \`\${rows.length}:\${rows[0] ? rowKey(rows[0]) : ''}\`
  const [firmaPrevia, setFirmaPrevia] = useState(firma)
  if (firma !== firmaPrevia) {
    setFirmaPrevia(firma)
    setPagina(1)
  }

  /* Buscar y filtrar primero; paginar después. */
  const filtradas = useMemo(
    () => rows.filter((r) => (!search || !q.trim() || search.match(r, q.trim())) && (!filter || filtro.length === 0 || filter.match(r, filtro))),
    [rows, search, q, filter, filtro],
  )
  const visiblesCols = columns.filter((c) => !ocultas.includes(c.key))

  const paginas = Math.max(1, Math.ceil(filtradas.length / pageSize))
  const actual = Math.min(pagina, paginas)
  const visibles = filtradas.slice((actual - 1) * pageSize, actual * pageSize)
  const desde = filtradas.length === 0 ? 0 : (actual - 1) * pageSize + 1
  const hasta = desde === 0 ? 0 : desde + visibles.length - 1

  const ids = visibles.map(rowKey)
  const todas = ids.length > 0 && ids.every((id) => elegidas.includes(id))
  const alternar = (id: string) => setElegidas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const alternarTodas = () => setElegidas((p) => (todas ? p.filter((x) => !ids.includes(x)) : [...new Set([...p, ...ids])]))
  const alternarAbierta = (id: string) => setAbiertas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const nombre = (r: T) => rowLabel?.(r) ?? rowKey(r)

  /* Ancho de cada columna: el arrastrado a mano, el fijo, o elástica. */
  const manual = (c: DataTableColumn<T>) => (resizable ? anchos.manual(c.key) : undefined)
  const elastica = (c: DataTableColumn<T>) => c.width === undefined && manual(c) === undefined
  const ancho = (c: DataTableColumn<T>) => {
    const w = manual(c) ?? c.width
    return w !== undefined ? { width: w, flexShrink: 0 } : { minWidth: MIN_FLEX }
  }
  const celda = (c: DataTableColumn<T>) =>
    cn('relative flex min-w-0 items-center', ALINEAR[c.align ?? 'left'], elastica(c) && 'flex-1')
  /* Si ya no queda columna elástica (se achicó a mano o se ocultó), un
     relleno ocupa lo que sobra y el menú de fila sigue pegado a la derecha. */
  const relleno = !visiblesCols.some(elastica) ? <div aria-hidden className="flex-1" /> : null

  /* Ancho mínimo: si no entra, la tabla scrollea dentro de su caja en vez de
     aplastar las columnas. */
  const extras = (selectable ? 16 : 0) + (rowActions ? 40 : 0) + (rowDetail ? 16 : 0) + (reorder ? 20 : 0)
  const huecos = visiblesCols.length - 1 + (selectable ? 1 : 0) + (rowActions ? 1 : 0) + (rowDetail ? 1 : 0) + (reorder ? 1 : 0)
  const minimo = visiblesCols.reduce((a, c) => a + (manual(c) ?? c.width ?? MIN_FLEX), 0) + extras + huecos * GAP + PADDING

  const idsAbribles = rowDetail ? ids : []
  const todasAbiertas = idsAbribles.length > 0 && idsAbribles.every((id) => abiertas.includes(id))
  const hayBarra = !!(search || filter || columnPicker || actions || rowDetail)
  const reiniciar = () => setPagina(1)

  return (
    <div className="flex flex-col gap-3">
      {hayBarra && (
        <div className="flex flex-wrap items-center gap-2">
          {search && (
            <div className="relative w-[260px] max-w-full">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); reiniciar() }}
                placeholder={search.placeholder ?? 'Search'}
                aria-label={search.placeholder ?? 'Search'}
                className="h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:border-dash-blue focus:outline-none"
              />
            </div>
          )}
          {filter && <FilterMenu label={filter.label} options={filter.options} value={filtro} onChange={(v) => { setFiltro(v); reiniciar() }} />}
          {rowDetail && visibles.length > 0 && (
            <BotonExpandirTodo
              todasAbiertas={todasAbiertas}
              hayAlgunaAbierta={idsAbribles.some((id) => abiertas.includes(id))}
              onExpandirTodo={() => setAbiertas((p) => [...new Set([...p, ...idsAbribles])])}
              onColapsarTodo={() => setAbiertas((p) => p.filter((x) => !idsAbribles.includes(x)))}
            />
          )}
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {columnPicker && (
              <ColumnPicker
                columnas={columns.map((c) => ({ id: c.key, label: c.header, bloqueada: c.locked }))}
                ocultas={ocultas}
                onToggle={(id) => setOcultas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))}
                onReset={() => setOcultas([])}
              />
            )}
            {actions}
          </div>
        </div>
      )}

      <div data-tabla-scroll className="overflow-x-auto rounded-lg border border-line-row bg-white">
        <div style={{ minWidth: minimo }}>
          <div role="row" data-tabla-header className="group/fila flex h-11 items-center gap-3 bg-surface-alt px-4 text-[11px] font-semibold text-ink-muted">
            {reorder && <span className="w-5 shrink-0" aria-hidden />}
            {rowDetail && <span className="w-4 shrink-0" aria-hidden />}
            {selectable && <Checkbox on={todas} onChange={alternarTodas} label="Select all rows" />}
            {visiblesCols.map((c, i) => (
              <div key={c.key} role="columnheader" data-elastica={elastica(c) || undefined} className={celda(c)} style={ancho(c)}>
                <span className="truncate">{c.header}</span>
                {resizable && <ManijaResize id={c.key} label={c.header} estado={anchos} indice={i} />}
              </div>
            ))}
            {relleno}
            {rowActions && <div role="columnheader" className="w-10 shrink-0 text-center">Actions</div>}
          </div>

          {filtradas.length === 0 ? (
            <EmptyState
              icon={rows.length === 0 ? (empty.icon ?? SearchX) : SearchX}
              title={rows.length === 0 ? empty.title : 'No results'}
              detail={rows.length === 0 ? empty.detail : 'Nothing matches the current search or filter.'}
              className="border-t border-line-row"
            />
          ) : (
            visibles.map((r) => {
              const id = rowKey(r)
              const elegida = elegidas.includes(id)
              const abierta = abiertas.includes(id)
              const alHacerClic = rowDetail ? () => alternarAbierta(id) : onRowClick ? () => onRowClick(r) : undefined
              const movible = reorder && (reorder.canMove?.(r) ?? true)
              const indice = filtradas.indexOf(r)
              const mover = (paso: number) => {
                const destino = filtradas[indice + paso]
                if (reorder && destino && (reorder.canMove?.(destino) ?? true)) reorder.onReorder(r, destino)
              }
              return (
                <div
                  key={id}
                  className="border-t border-line-row"
                  onDragOver={reorder ? (e) => e.preventDefault() : undefined}
                  onDrop={reorder ? () => {
                    const origen = arrastrada.current
                    arrastrada.current = null
                    if (origen && origen !== r && (reorder.canMove?.(r) ?? true)) reorder.onReorder(origen, r)
                  } : undefined}
                >
                  <div
                    role="row"
                    aria-selected={selectable ? elegida : undefined}
                    aria-expanded={rowDetail ? abierta : undefined}
                    tabIndex={alHacerClic ? 0 : undefined}
                    onClick={alHacerClic ? (e) => { if (!(e.target as HTMLElement).closest('[role="separator"]')) alHacerClic() } : undefined}
                    onKeyDown={alHacerClic ? (e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); alHacerClic() } } : undefined}
                    className={cn(
                      'group/fila flex items-center gap-3 px-4 text-[13px] text-ink-soft transition-colors focus-visible:outline-none focus-visible:bg-surface-subtle',
                      ALTO_FILA[density],
                      elegida ? 'bg-dash-count-bg' : abierta ? 'bg-surface-subtle' : alHacerClic && 'cursor-pointer hover:bg-surface-subtle',
                    )}
                  >
                    {reorder && (
                      movible ? (
                        <button
                          type="button"
                          draggable
                          onDragStart={() => { arrastrada.current = r }}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); mover(e.key === 'ArrowUp' ? -1 : 1) }
                          }}
                          aria-label={\`Reorder \${nombre(r)}. Drag, or use the up and down arrows.\`}
                          className="flex w-5 shrink-0 cursor-grab justify-center rounded text-ink-faint hover:text-ink-muted focus-visible:outline-2 focus-visible:outline-dash-blue active:cursor-grabbing"
                        >
                          <GripVertical className="size-4" />
                        </button>
                      ) : <span className="w-5 shrink-0" aria-hidden />
                    )}
                    {rowDetail && <ChevronRight aria-hidden className={cn('size-4 shrink-0 text-ink-faint transition-transform', abierta && 'rotate-90')} />}
                    {selectable && (
                      <span onClick={(e) => e.stopPropagation()} className="flex">
                        <Checkbox on={elegida} onChange={() => alternar(id)} label={\`Select \${nombre(r)}\`} />
                      </span>
                    )}
                    {visiblesCols.map((c) => <div key={c.key} role="cell" className={celda(c)} style={ancho(c)}>{c.cell(r)}</div>)}
                    {relleno}
                    {rowActions && (
                      <div className="flex w-10 shrink-0 justify-center" onClick={(e) => e.stopPropagation()}>
                        <RowActionsMenu label={nombre(r)}>{rowActions(r)}</RowActionsMenu>
                      </div>
                    )}
                  </div>
                  {rowDetail && abierta && <div className="border-t border-line-soft bg-surface-subtle px-4 py-3 pl-11 text-[13px] text-ink-soft">{rowDetail(r)}</div>}
                </div>
              )
            })
          )}

          {filtradas.length > 0 && (
            <div className="flex min-h-[52px] flex-wrap items-center justify-between gap-3 border-t border-line-row px-4 py-2">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-ink-muted">
                <span>
                  {selectable && elegidas.length > 0 ? \`\${elegidas.length} selected · \` : ''}
                  Showing {desde} to {hasta} of {filtradas.length} {itemLabel}
                  {filtradas.length !== rows.length && <span className="font-medium text-ink-faint"> (filtered from {rows.length})</span>}
                </span>
                {pageSizeOptions && (
                  <span className="flex items-center gap-2 font-normal">
                    {pageSizeLabel}
                    <select
                      value={pageSize}
                      onChange={(e) => { setPageSize(Number(e.target.value)); setPagina(1) }}
                      aria-label="Rows per page"
                      className="h-7 rounded-md border border-line bg-white px-2 text-[12px] focus:border-dash-blue focus:outline-none"
                    >
                      {pageSizeOptions.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </span>
                )}
                {resizable && anchos.avisando && (
                  <span className="motion-safe:animate-[col-hint_2.4s_ease-in-out_both] hidden items-center gap-1.5 font-medium text-ink-faint lg:flex">
                    <MoveHorizontal className="size-3.5" /> Drag column edges to resize · double-click to reset
                  </span>
                )}
                {resizable && anchos.hayCambios && (
                  <button type="button" onClick={anchos.resetear} className="text-dash-blue hidden hover:underline lg:inline">Reset column widths</button>
                )}
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
export function PersonCell({ name, initials, to, onClick, tone = 'solid' }: {
  name: string
  initials: string
  to?: string
  onClick?: () => void
  /** solid: pacientes. soft: equipo (círculo celeste, iniciales azules). */
  tone?: 'solid' | 'soft'
}) {
  const clase = 'text-dash-blue truncate text-[13px] font-semibold hover:underline'
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full font-semibold',
        tone === 'solid' ? 'bg-dash-blue-hover text-[13px] text-surface-subtle' : 'bg-dash-count-bg text-dash-blue-hover text-[11px]',
      )}>{initials}</span>
      {to ? (
        <Link to={to} onClick={(e) => e.stopPropagation()} className={clase}>{name}</Link>
      ) : (
        <button type="button" onClick={onClick} className={clase}>{name}</button>
      )}
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
`})))()}export{n,i as r,r as t};