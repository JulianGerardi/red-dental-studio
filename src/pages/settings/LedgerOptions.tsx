import { PADDING_PAGINA } from '@/lib/estilos'
import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Tabs } from '@/components/ui/tabs'

/* Settings → Ledger. Figma 4293:57917.
   Ver design-reference/figma/modulos/settings-ledger.md. */

export function Switch({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative h-5 w-9 shrink-0 rounded-full transition-colors',
        on ? 'bg-dash-blue' : 'bg-line-strong',
      )}
    >
      <span className={cn('absolute top-0.5 size-4 rounded-full bg-white transition-all', on ? 'left-[18px]' : 'left-0.5')} />
    </button>
  )
}

type Ajuste = {
  id: string
  tipo: string
  descripcion: string
  categoria: 'Insurance' | 'Patient'
  direccion: 'Credit' | 'Charge'
  impacto: 'Production' | 'Collections'
}

const AJUSTES: Ajuste[] = [
  { id: 'a1', tipo: 'Insurance Adjustment', descripcion: 'Credit returned to the patient after', categoria: 'Insurance', direccion: 'Credit', impacto: 'Production' },
  { id: 'a2', tipo: 'Insurance Write-off', descripcion: 'Balance the carrier will not pay', categoria: 'Insurance', direccion: 'Credit', impacto: 'Production' },
  { id: 'a3', tipo: 'Courtesy Discount', descripcion: 'Goodwill discount applied at the desk', categoria: 'Patient', direccion: 'Credit', impacto: 'Collections' },
  { id: 'a4', tipo: 'Family Discount', descripcion: 'Discount for a second family member', categoria: 'Patient', direccion: 'Credit', impacto: 'Collections' },
  { id: 'a5', tipo: 'Late Cancellation Fee', descripcion: 'Charge for a visit cancelled same day', categoria: 'Patient', direccion: 'Charge', impacto: 'Production' },
  { id: 'a6', tipo: 'Missed Appointment Fee', descripcion: 'Charge for a patient who did not attend', categoria: 'Patient', direccion: 'Charge', impacto: 'Production' },
  { id: 'a7', tipo: 'Insurance Overpayment', descripcion: 'Refund owed back to the carrier', categoria: 'Insurance', direccion: 'Charge', impacto: 'Collections' },
  { id: 'a8', tipo: 'Bad Debt Write-off', descripcion: 'Balance sent to collections and cleared', categoria: 'Patient', direccion: 'Credit', impacto: 'Collections' },
]

type Metodo = {
  id: string
  nombre: string
  tipo: 'Patient' | 'Insurance'
}

const METODOS: Metodo[] = [
  { id: 'm1', nombre: 'Insurance Adjustment', tipo: 'Patient' },
  { id: 'm2', nombre: 'Check Payment', tipo: 'Patient' },
  { id: 'm3', nombre: 'Insurance Payment - Check', tipo: 'Insurance' },
  { id: 'm4', nombre: 'Card Payment', tipo: 'Patient' },
  { id: 'm5', nombre: 'Cash Payment', tipo: 'Patient' },
  { id: 'm6', nombre: 'Electronic Payment', tipo: 'Patient' },
  { id: 'm7', nombre: 'Insurance Payment - EFT', tipo: 'Insurance' },
]

const TABS = ['Adjustment types', 'Payment methods'] as const
type Tab = (typeof TABS)[number]

const FILTROS_AJUSTE = ['All', 'Charge', 'Credit', 'Production', 'Collections'] as const
const FILTROS_METODO = ['All', 'Patient', 'Insurance'] as const

const TAM_PAGINA = 6

/* Charge/Credit filtran por Direction y Production/Collections por Impact; en Payment Method, por tipo. */
const coincide = (x: Ajuste | Metodo, f: string) =>
  f === 'All' || ('direccion' in x ? x.direccion === f || x.impacto === f : x.tipo === f)

export function SettingsLedgerOptions() {
  const [tab, setTab] = useState<Tab>('Adjustment types')
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<string>('All')
  const [pagina, setPagina] = useState(1)
  const [apagados, setApagados] = useState<string[]>([])

  const alternar = (id: string) =>
    setApagados((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const cambiarTab = (t: Tab) => { setTab(t); setFiltro('All'); setQ(''); setPagina(1) }

  const filtros = tab === 'Adjustment types' ? FILTROS_AJUSTE : FILTROS_METODO

  const filas = useMemo(() => {
    const texto = q.trim().toLowerCase()
    if (tab === 'Adjustment types') {
      return AJUSTES.filter((a) => coincide(a, filtro) && `${a.tipo} ${a.descripcion}`.toLowerCase().includes(texto))
    }
    return METODOS.filter(
      (m) => coincide(m, filtro) && m.nombre.toLowerCase().includes(texto),
    )
  }, [tab, q, filtro])

  const paginas = Math.max(1, Math.ceil(filas.length / TAM_PAGINA))
  const actual = Math.min(pagina, paginas)
  const visibles = filas.slice((actual - 1) * TAM_PAGINA, actual * TAM_PAGINA)

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader titulo="Ledger options" />

      {/* Buscador y Filter a la izquierda; qué lista se ve, en pestañas a la derecha, en el borde de la tabla
          (settings-ledger.md, 2026-11-20). */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <SettingsSearch value={q} onChange={(v) => { setQ(v); setPagina(1) }} placeholder={tab === 'Adjustment types' ? 'Search adjustment types' : 'Search payment methods'} onSearch={() => setPagina(1)} />
          <FilterMenu
            label={tab === 'Adjustment types' ? 'Filter adjustment types' : 'Filter payment methods'}
            groups={[{
              type: 'single', title: 'Type', defaultValue: 'All', value: filtro, onChange: (f) => { setFiltro(f); setPagina(1) },
              options: filtros.map((f) => ({ value: f, count: (tab === 'Adjustment types' ? AJUSTES : METODOS).filter((x) => coincide(x, f)).length })),
            }]}
          />
        </div>
        <Tabs aria-label="Ledger options" tabs={TABS} value={tab} onChange={cambiarTab} />
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-line-row bg-white">
        <div className={tab === 'Adjustment types' ? 'min-w-[820px]' : 'min-w-[620px]'}>
          {tab === 'Adjustment types' ? (
            <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
              <span className="w-[160px] shrink-0">Name</span>
              <span className="min-w-[180px] flex-1">Description</span>
              <span className="w-[100px] shrink-0">Category</span>
              <span className="w-[90px] shrink-0">Direction</span>
              <span className="w-[100px] shrink-0">Impact</span>
              <span className="w-[70px] shrink-0 text-right">Enabled</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
              <span className="min-w-[200px] flex-1">Name</span>
              <span className="w-[110px] shrink-0">Method type</span>
              <span className="w-[90px] shrink-0">Status</span>
              {/* El switch es un estado editable, no una acción: la columna se llama Enabled en las dos pestañas
                  (propuesta de consistencia, 2026-11-20). */}
              <span className="w-[70px] shrink-0 text-right">Enabled</span>
            </div>
          )}

          {visibles.length === 0 ? (
            <EmptyState icon={SlidersHorizontal} title="Nothing here" detail="Nothing matches the current search or filter." />
          ) : tab === 'Adjustment types' ? (
            (visibles as Ajuste[]).map((a) => (
              <div key={a.id} className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft">
                <span className="w-[160px] shrink-0 truncate text-ink" title={a.tipo}>{a.tipo}</span>
                <span className="min-w-[180px] flex-1 truncate" title={a.descripcion}>{a.descripcion}</span>
                <span className="w-[100px] shrink-0 truncate">{a.categoria}</span>
                <span className="w-[90px] shrink-0 truncate">{a.direccion}</span>
                <span className="w-[100px] shrink-0 truncate">{a.impacto}</span>
                <span className="flex w-[70px] shrink-0 justify-end">
                  <Switch on={!apagados.includes(a.id)} onChange={() => alternar(a.id)} label={`Enable ${a.tipo}`} />
                </span>
              </div>
            ))
          ) : (
            (visibles as Metodo[]).map((m) => (
              <div key={m.id} className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft">
                <span className="min-w-[200px] flex-1 truncate text-ink" title={m.nombre}>{m.nombre}</span>
                <span className="w-[110px] shrink-0 truncate">{m.tipo}</span>
                <span className="w-[90px] shrink-0 truncate">Active</span>
                <span className="flex w-[70px] shrink-0 justify-end">
                  <Switch on={!apagados.includes(m.id)} onChange={() => alternar(m.id)} label={`Enable ${m.nombre}`} />
                </span>
              </div>
            ))
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
            <span className="text-xs font-semibold text-ink-muted">
              Showing {filas.length ? (actual - 1) * TAM_PAGINA + 1 : 0} to {(actual - 1) * TAM_PAGINA + visibles.length} of {filas.length} {tab === 'Adjustment types' ? 'adjustment types' : 'payment methods'}
            </span>
            <Pagination pagina={actual} paginas={paginas} onChange={setPagina} />
          </div>
        </div>
      </div>
    </div>
  )
}
