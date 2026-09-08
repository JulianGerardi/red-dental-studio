import { useState } from 'react'
import { CreditCard, Columns3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { moneda, fechaCorta, type Movimiento } from '@/data/ledger'
import { Pagination } from '@/components/patients/ledger/Pagination'

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
  id: ColId; label: string; ancho: string; px: number
  claseCelda?: string; bloqueada?: boolean
  titulo?: (m: Movimiento) => string
  celda: (m: Movimiento, ap: number) => React.ReactNode
}

const TAM_PAGINA = 5
/* gap-1.5 entre columnas y px-3 a los costados, como el diseño de
   referencia: con esos números las 12 columnas entran sin scroll. */
const GAP = 6
const PADDING_FILA = 24

export function LedgerAllocationTable({ cargos }: { cargos: Movimiento[] }) {
  const [aplicado, setAplicado] = useState<Record<string, string>>({})
  /* Arrancan todas visibles: con los anchos del diseño de referencia las 12
     entran en la card sin pedir scroll. "Columns" queda para achicar, no
     para arreglar un default que no entraba. */
  const [ocultas, setOcultas] = useState<ColId[]>([])
  const alternarCol = (id: ColId) => setOcultas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const [pagina, setPagina] = useState(1)

  const paginas = Math.max(1, Math.ceil(cargos.length / TAM_PAGINA))
  const paginaActual = Math.min(pagina, paginas)
  const cargosPagina = cargos.slice((paginaActual - 1) * TAM_PAGINA, paginaActual * TAM_PAGINA)

  const totalCargos = cargos.reduce((a, m) => a + m.monto, 0)
  const totalAplicado = cargos.reduce((a, m) => a + (Number(aplicado[m.id]) || 0), 0)

  const columnas: Columna[] = [
    { id: 'fecha', label: 'Date', ancho: 'w-[76px] shrink-0', px: 76, bloqueada: true, claseCelda: 'text-[#3f3f46]', celda: (m) => fechaCorta(m.fecha) },
    { id: 'paciente', label: 'Patient', ancho: 'w-[76px] shrink-0', px: 76, claseCelda: 'truncate text-[#09090b]', titulo: (m) => m.paciente, celda: (m) => m.paciente },
    { id: 'provider', label: 'Provider', ancho: 'w-[72px] shrink-0', px: 72, claseCelda: 'truncate', titulo: (m) => m.provider, celda: (m) => m.provider },
    { id: 'diente', label: 'Tooth', ancho: 'w-[40px] shrink-0', px: 40, celda: (m) => m.diente ?? '—' },
    { id: 'superficie', label: 'Surface', ancho: 'w-[48px] shrink-0', px: 48, celda: (m) => m.superficie ?? '—' },
    { id: 'codigo', label: 'Code', ancho: 'w-[52px] shrink-0', px: 52, claseCelda: 'text-dash-blue font-medium', celda: (m) => m.codigo },
    { id: 'desc', label: 'Description', ancho: 'min-w-[88px] flex-1', px: 88, claseCelda: 'truncate text-[#09090b]', titulo: (m) => m.descripcion, celda: (m) => m.descripcion },
    { id: 'charge', label: 'Charge', ancho: 'w-[64px] shrink-0 text-right', px: 64, claseCelda: 'font-medium tabular-nums text-[#09090b]', celda: (m) => moneda(m.monto) },
    { id: 'otroCredito', label: 'Other Credit', ancho: 'w-[68px] shrink-0 text-right', px: 68, claseCelda: 'tabular-nums', celda: (m) => moneda(m.monto * coberturaSeguro(m.codigo)) },
    { id: 'guarEstimado', label: 'Guar Estimate', ancho: 'w-[76px] shrink-0 text-right', px: 76, claseCelda: 'tabular-nums', celda: (m) => moneda(m.monto * (1 - coberturaSeguro(m.codigo))) },
    {
      id: 'applied', label: 'Applied', ancho: 'w-[72px] shrink-0', px: 72, bloqueada: true,
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
    { id: 'balance', label: 'Balance', ancho: 'w-[64px] shrink-0 text-right', px: 64, claseCelda: 'font-semibold tabular-nums text-[#09090b]', bloqueada: true, celda: (m, ap) => moneda(Math.max(m.monto - ap, 0)) },
  ]
  const columnasVisibles = columnas.filter((c) => !ocultas.includes(c.id))
  const anchoMinimo = columnasVisibles.reduce((a, c) => a + c.px, 0)
    + (columnasVisibles.length - 1) * GAP + PADDING_FILA

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
          <div className="mt-3 w-full overflow-x-auto rounded-md border border-[#e7e7e7]">
            <div style={{ minWidth: anchoMinimo }}>
              <div className="flex items-center gap-1.5 bg-[#f9f9f9] px-3 py-2.5 text-[11px] font-semibold text-[#71717a]">
                {columnasVisibles.map((c) => (
                  <span key={c.id} className={cn(c.ancho, 'whitespace-nowrap')}>{c.label}</span>
                ))}
              </div>
              {cargosPagina.map((m) => {
                const ap = Number(aplicado[m.id]) || 0
                return (
                  <div key={m.id} className="flex items-center gap-1.5 border-t border-[#e7e7e7] px-3 py-2.5 text-[12px] text-[#3f3f46]">
                    {columnasVisibles.map((c) => (
                      <span key={c.id} title={c.titulo?.(m)} className={cn(c.ancho, c.claseCelda)}>{c.celda(m, ap)}</span>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#71717a]">
              Showing {cargosPagina.length} of {cargos.length} transactions
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
    </div>
  )
}
