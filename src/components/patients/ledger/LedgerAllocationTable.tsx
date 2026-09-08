import { useState } from 'react'
import { CreditCard, Columns3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { moneda, type Movimiento } from '@/data/ledger'

/* Figma 4582:29618 / 4582:30251. Ver design-reference/figma/modulos/ledger.md. */
function coberturaSeguro(codigo: string) {
  const categoria = codigo.charAt(1)
  return categoria === '0' || categoria === '1' ? 1 : 0.5
}

type ColId =
  | 'fecha' | 'paciente' | 'provider' | 'diente' | 'superficie' | 'codigo'
  | 'desc' | 'charge' | 'otroCredito' | 'guarEstimado' | 'applied' | 'balance'

function ColumnPicker({
  columnas, ocultas, onToggle,
}: {
  columnas: { id: ColId; label: string; bloqueada?: boolean }[]
  ocultas: ColId[]
  onToggle: (id: ColId) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-[#e4e4e7] px-2.5 py-1.5 text-[12px] font-medium text-[#71717a] hover:bg-[#f4f4f5]">
        <Columns3 className="size-3.5" /> Columns
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[190px]">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type Columna = { id: ColId; label: string; ancho: string; px: number; claseCelda?: string; bloqueada?: boolean; celda: (m: Movimiento, ap: number) => React.ReactNode }

export function LedgerAllocationTable({ cargos }: { cargos: Movimiento[] }) {
  const [aplicado, setAplicado] = useState<Record<string, string>>({})
  /* Ocultas por defecto: con las doce puestas la tabla siempre pedía scroll
     horizontal. Quedan afuera hasta que el usuario las pida desde "Columns". */
  const [ocultas, setOcultas] = useState<ColId[]>(['provider', 'diente', 'superficie', 'otroCredito', 'guarEstimado'])
  const alternarCol = (id: ColId) => setOcultas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const totalCargos = cargos.reduce((a, m) => a + m.monto, 0)
  const totalAplicado = cargos.reduce((a, m) => a + (Number(aplicado[m.id]) || 0), 0)

  const columnas: Columna[] = [
    { id: 'fecha', label: 'Transaction Date', ancho: 'w-[90px] shrink-0', px: 90, bloqueada: true, celda: (m) => m.fecha },
    { id: 'paciente', label: 'Patient', ancho: 'w-[100px] shrink-0', px: 100, claseCelda: 'truncate', celda: (m) => m.paciente },
    { id: 'provider', label: 'Provider', ancho: 'w-[130px] shrink-0', px: 130, claseCelda: 'truncate', celda: (m) => m.provider },
    { id: 'diente', label: 'Tooth', ancho: 'w-[55px] shrink-0', px: 55, celda: (m) => m.diente ?? '-' },
    { id: 'superficie', label: 'Surface', ancho: 'w-[60px] shrink-0', px: 60, celda: (m) => m.superficie ?? '-' },
    { id: 'codigo', label: 'Code', ancho: 'w-[60px] shrink-0', px: 60, claseCelda: 'text-dash-blue font-medium', celda: (m) => m.codigo },
    { id: 'desc', label: 'Description', ancho: 'min-w-[160px] flex-1', px: 160, claseCelda: 'truncate text-[#09090b]', celda: (m) => m.descripcion },
    { id: 'charge', label: 'Charge', ancho: 'w-[80px] shrink-0 text-right', px: 80, claseCelda: 'font-medium tabular-nums text-[#09090b]', celda: (m) => moneda(m.monto) },
    { id: 'otroCredito', label: 'Other Credit', ancho: 'w-[90px] shrink-0 text-right', px: 90, claseCelda: 'tabular-nums', celda: (m) => moneda(m.monto * coberturaSeguro(m.codigo)) },
    { id: 'guarEstimado', label: 'Guar Estimate', ancho: 'w-[95px] shrink-0 text-right', px: 95, claseCelda: 'tabular-nums', celda: (m) => moneda(m.monto * (1 - coberturaSeguro(m.codigo))) },
    {
      id: 'applied', label: 'Applied', ancho: 'w-[90px] shrink-0 text-right', px: 90, bloqueada: true,
      celda: (m) => (
        <input
          value={aplicado[m.id] ?? ''}
          onChange={(e) => {
            const limpio = e.target.value.replace(/[^0-9.]/g, '')
            const numero = Number(limpio)
            const final = Number.isFinite(numero) && numero > m.monto ? String(m.monto) : limpio
            setAplicado((p) => ({ ...p, [m.id]: final }))
          }}
          placeholder="0.00"
          aria-label={`Applied to ${m.descripcion}`}
          className="focus:border-dash-blue h-8 w-full rounded-md border border-[#e4e4e7] bg-white px-2 text-right text-[13px] tabular-nums placeholder:text-[#a1a1aa] focus:outline-none"
        />
      ),
    },
    { id: 'balance', label: 'Balance', ancho: 'w-[85px] shrink-0 text-right', px: 85, claseCelda: 'font-semibold tabular-nums text-[#09090b]', bloqueada: true, celda: (m, ap) => moneda(Math.max(m.monto - ap, 0)) },
  ]
  const columnasVisibles = columnas.filter((c) => !ocultas.includes(c.id))
  const anchoMinimo = columnasVisibles.reduce((a, c) => a + c.px, 0) + (columnasVisibles.length - 1) * 12

  return (
    <div className="rounded-lg border border-[#e4e4e7] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#09090b]">
          <CreditCard className="size-4" /> Ledger Transactions
        </h2>
        <ColumnPicker columnas={columnas} ocultas={ocultas} onToggle={alternarCol} />
      </div>

      {cargos.length === 0 ? (
        <p className="mt-3 text-[13px] text-[#71717a]">No open charges to apply this against.</p>
      ) : (
        <>
          <div className="mt-3 overflow-x-auto">
            <div style={{ minWidth: anchoMinimo }}>
              <div className="flex h-12 items-center gap-3 border-b border-[#e7e7e7] bg-[#f9f9f9] text-xs font-semibold text-[#71717a]">
                {columnasVisibles.map((c) => (
                  <span key={c.id} className={c.ancho}>{c.label}</span>
                ))}
              </div>
              {cargos.map((m) => {
                const ap = Number(aplicado[m.id]) || 0
                return (
                  <div key={m.id} className="flex items-center gap-3 border-b border-[#e7e7e7] py-3 text-[13px] text-[#3f3f46] last:border-0">
                    {columnasVisibles.map((c) => (
                      <span key={c.id} className={cn(c.ancho, c.claseCelda)}>{c.celda(m, ap)}</span>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <div className="bg-dash-count-bg flex flex-col gap-1.5 rounded-md px-4 py-3 text-[13px]">
              <span className="flex items-center justify-between gap-6">
                <span className="text-[#71717a]">Amount not applied</span>
                <span className="font-semibold tabular-nums text-[#09090b]">{moneda(Math.max(totalCargos - totalAplicado, 0))}</span>
              </span>
              <span className="flex items-center justify-between gap-6">
                <span className="text-[#71717a]">Amount applied</span>
                <span className="text-dash-blue font-semibold tabular-nums">{moneda(totalAplicado)}</span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
