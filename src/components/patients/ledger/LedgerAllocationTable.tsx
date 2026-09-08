import { useState } from 'react'
import { CreditCard, Columns3, MoveHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { moneda, fechaCorta, type Movimiento } from '@/data/ledger'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { useAnchoColumnas, ManijaResize } from '@/components/patients/ledger/useAnchoColumnas'
import { LedgerRowDetail, LedgerRowModal } from '@/components/patients/ledger/LedgerRowDetail'

/* Figma 4582:29618 / 4582:30251. Ver design-reference/figma/modulos/ledger.md. */
function coberturaSeguro(codigo: string) {
  const categoria = codigo.charAt(1)
  return categoria === '0' || categoria === '1' ? 1 : 0.5
}

type ColId =
  | 'fecha' | 'paciente' | 'provider' | 'diente' | 'superficie' | 'codigo'
  | 'desc' | 'charge' | 'otroCredito' | 'guarEstimado' | 'applied' | 'balance'

function ColumnPicker({
  columnas, ocultas, onToggle, onReset,
}: {
  columnas: { id: ColId; label: string; bloqueada?: boolean }[]
  ocultas: ColId[]
  onToggle: (id: ColId) => void
  onReset: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-[#e4e4e7] px-2.5 py-1.5 text-[12px] font-medium text-[#71717a] hover:bg-[#f4f4f5]">
        <Columns3 className="size-3.5" /> Columns
        {ocultas.length > 0 && (
          <span className="text-dash-blue rounded-full bg-[#eef5ff] px-1.5 text-[10px] font-bold">
            {columnas.length - ocultas.length}/{columnas.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="text-[11px] tracking-wide text-[#71717a] uppercase">
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
              className="text-dash-blue w-full rounded-md px-1.5 py-1 text-left text-sm font-semibold hover:bg-[#f4f4f5]"
            >
              Show all columns
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type Columna = {
  id: ColId; label: string; px: number
  /** Crece con la tabla mientras no se la arrastre a mano. */
  elastica?: boolean
  derecha?: boolean
  claseCelda?: string; bloqueada?: boolean
  titulo?: (m: Movimiento) => string
  celda: (m: Movimiento, ap: number) => React.ReactNode
}

const TAM_PAGINA = 5
/* gap-1.5 entre columnas y px-3 a los costados, como el diseño de
   referencia: con esos números las 12 columnas entran sin scroll. */
const GAP = 6
const PADDING_FILA = 24

const ANCHO_BASE: Record<ColId, number> = {
  fecha: 76, paciente: 76, provider: 72, diente: 40, superficie: 48, codigo: 52,
  desc: 88, charge: 64, otroCredito: 68, guarEstimado: 76, applied: 72, balance: 64,
}

export function LedgerAllocationTable({ cargos }: { cargos: Movimiento[] }) {
  const [aplicado, setAplicado] = useState<Record<string, string>>({})
  /* Arrancan todas visibles: con los anchos del diseño de referencia las 12
     entran en la card sin pedir scroll. "Columns" queda para achicar, no
     para arreglar un default que no entraba. */
  const [ocultas, setOcultas] = useState<ColId[]>([])
  const alternarCol = (id: ColId) => setOcultas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const [pagina, setPagina] = useState(1)
  const [expandidas, setExpandidas] = useState<string[]>([])
  const [enModal, setEnModal] = useState<Movimiento | null>(null)
  const anchos = useAnchoColumnas<ColId>(ANCHO_BASE)

  const alternarFila = (id: string) =>
    setExpandidas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const paginas = Math.max(1, Math.ceil(cargos.length / TAM_PAGINA))
  const paginaActual = Math.min(pagina, paginas)
  const cargosPagina = cargos.slice((paginaActual - 1) * TAM_PAGINA, paginaActual * TAM_PAGINA)

  const totalCargos = cargos.reduce((a, m) => a + m.monto, 0)
  const totalAplicado = cargos.reduce((a, m) => a + (Number(aplicado[m.id]) || 0), 0)

  const columnas: Columna[] = [
    { id: 'fecha', label: 'Date', px: 76, bloqueada: true, claseCelda: 'text-[#3f3f46]', celda: (m) => fechaCorta(m.fecha) },
    { id: 'paciente', label: 'Patient', px: 76, claseCelda: 'truncate text-[#09090b]', titulo: (m) => m.paciente, celda: (m) => m.paciente },
    { id: 'provider', label: 'Provider', px: 72, claseCelda: 'truncate', titulo: (m) => m.provider, celda: (m) => m.provider },
    { id: 'diente', label: 'Tooth', px: 40, celda: (m) => m.diente ?? '—' },
    { id: 'superficie', label: 'Surface', px: 48, celda: (m) => m.superficie ?? '—' },
    { id: 'codigo', label: 'Code', px: 52, claseCelda: 'text-dash-blue font-medium', celda: (m) => m.codigo },
    { id: 'desc', label: 'Description', px: 88, elastica: true, claseCelda: 'truncate text-[#09090b]', titulo: (m) => m.descripcion, celda: (m) => m.descripcion },
    { id: 'charge', label: 'Charge', px: 64, derecha: true, claseCelda: 'font-medium tabular-nums text-[#09090b]', celda: (m) => moneda(m.monto) },
    { id: 'otroCredito', label: 'Other Credit', px: 68, derecha: true, claseCelda: 'tabular-nums', celda: (m) => moneda(m.monto * coberturaSeguro(m.codigo)) },
    { id: 'guarEstimado', label: 'Guar Estimate', px: 76, derecha: true, claseCelda: 'tabular-nums', celda: (m) => moneda(m.monto * (1 - coberturaSeguro(m.codigo))) },
    {
      id: 'applied', label: 'Applied', px: 72, bloqueada: true,
      celda: (m) => (
        <input
          value={aplicado[m.id] ?? ''}
          onChange={(e) => {
            const limpio = e.target.value.replace(/[^0-9.]/g, '')
            const numero = Number(limpio)
            const final = Number.isFinite(numero) && numero > m.monto ? String(m.monto) : limpio
            setAplicado((p) => ({ ...p, [m.id]: final }))
          }}
          inputMode="decimal"
          placeholder="0.00"
          aria-label={`Applied to ${m.descripcion}`}
          className="focus:border-dash-blue h-7 w-full rounded-md border border-[#e4e4e7] bg-white px-2 text-right text-[12px] tabular-nums placeholder:text-[#a1a1aa] focus:outline-none"
        />
      ),
    },
    { id: 'balance', label: 'Balance', px: 64, derecha: true, claseCelda: 'font-semibold tabular-nums text-[#09090b]', bloqueada: true, celda: (m, ap) => moneda(Math.max(m.monto - ap, 0)) },
  ]
  const columnasVisibles = columnas.filter((c) => !ocultas.includes(c.id))
  const anchoMinimo = columnasVisibles.reduce((a, c) => a + anchos.ancho(c.id), 0)
    + (columnasVisibles.length - 1) * GAP + PADDING_FILA

  const estilo = (c: Columna) => ({
    width: anchos.ancho(c.id),
    /* La elástica puede ceder ancho cuando otra columna crece, pero nunca
       por debajo de su mínimo: de ahí sale la holgura del arrastre. */
    minWidth: c.elastica ? ANCHO_BASE[c.id] : undefined,
    flexGrow: c.elastica && anchos.manual(c.id) === undefined ? 1 : 0,
    flexShrink: c.elastica ? 1 : 0,
  })

  return (
    <div className="rounded-lg border border-[#e4e4e7] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#09090b]">
          <CreditCard className="size-4" /> Ledger Transactions
        </h2>
        <ColumnPicker columnas={columnas} ocultas={ocultas} onToggle={alternarCol} onReset={() => setOcultas([])} />
      </div>

      {cargos.length === 0 ? (
        <p className="mt-3 text-[13px] text-[#71717a]">No open charges to apply this against.</p>
      ) : (
        <>
          <div data-tabla-scroll className="mt-3 w-full overflow-x-auto rounded-md border border-[#e7e7e7]">
            <div style={{ minWidth: anchoMinimo }}>
              <div data-tabla-header className="group/fila flex items-center gap-1.5 bg-[#f9f9f9] px-3 py-2.5 text-[11px] font-semibold text-[#71717a]">
                {columnasVisibles.map((c, i) => (
                  <span
                    key={c.id}
                    data-elastica={c.elastica || undefined}
                    style={estilo(c)}
                    className={cn('relative flex items-center', c.derecha && 'justify-end')}
                  >
                    <span className="truncate">{c.label}</span>
                    <ManijaResize id={c.id} label={c.label} estado={anchos} indice={i} />
                  </span>
                ))}
              </div>
              {cargosPagina.map((m) => {
                const ap = Number(aplicado[m.id]) || 0
                const abierta = expandidas.includes(m.id)
                return (
                  <div key={m.id} className="border-t border-[#e7e7e7]">
                    {/* La fila entera abre el detalle, salvo cuando el click
                        cae en el input de "Applied" o en una manija. */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={abierta}
                      aria-label={`Toggle details for ${m.descripcion}`}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('input, [role="separator"]')) return
                        alternarFila(m.id)
                      }}
                      onKeyDown={(e) => {
                        if (e.target !== e.currentTarget) return
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternarFila(m.id) }
                      }}
                      className={cn(
                        'group/fila flex cursor-pointer items-center gap-1.5 px-3 py-2.5 text-[12px] text-[#3f3f46] hover:bg-[#fafafa]',
                        abierta && 'bg-[#fafafa]',
                      )}
                    >
                      {columnasVisibles.map((c) => (
                        <span
                          key={c.id}
                          title={c.titulo?.(m)}
                          style={estilo(c)}
                          className={cn('relative', c.derecha && 'text-right', c.claseCelda)}
                        >
                          {c.celda(m, ap)}
                        </span>
                      ))}
                    </div>
                    {abierta && <LedgerRowDetail m={m} onVerTodo={() => setEnModal(m)} />}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-3 text-xs font-semibold text-[#71717a]">
              Showing {cargosPagina.length} of {cargos.length} transactions
              {anchos.avisando && (
                <span className="motion-safe:animate-[col-hint_2.4s_ease-in-out_both] flex items-center gap-1.5 font-medium text-[#a1a1aa]">
                  <MoveHorizontal className="size-3.5" /> Drag column edges to resize · double-click to reset
                </span>
              )}
              {anchos.hayCambios && (
                <button type="button" onClick={anchos.resetear} className="text-dash-blue hover:underline">
                  Reset column widths
                </button>
              )}
            </span>
            <Pagination pagina={paginaActual} paginas={paginas} onChange={setPagina} />
          </div>

          <div className="mt-3 flex justify-end">
            <dl className="w-fit overflow-hidden rounded-md border border-[#e4e4e7] text-[13px]">
              <div className="flex items-center">
                <dt className="w-36 bg-[#f9f9f9] px-3 py-2 text-right font-medium text-[#3f3f46]">Amount not applied</dt>
                <dd className="w-24 px-3 py-2 text-right font-semibold tabular-nums text-[#09090b]">{moneda(Math.max(totalCargos - totalAplicado, 0))}</dd>
              </div>
              <div className="flex items-center border-t border-[#e4e4e7]">
                <dt className="w-36 bg-[#f9f9f9] px-3 py-2 text-right font-medium text-[#3f3f46]">Amount applied</dt>
                <dd className="text-dash-blue w-24 px-3 py-2 text-right font-semibold tabular-nums">{moneda(totalAplicado)}</dd>
              </div>
            </dl>
          </div>
        </>
      )}

      {enModal && <LedgerRowModal m={enModal} onClose={() => setEnModal(null)} />}
    </div>
  )
}
