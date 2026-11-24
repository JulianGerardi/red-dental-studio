import { PADDING_PAGINA } from '@/lib/estilos'
import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DataTable, TextCell } from '@/components/ui/data-table'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { FilterMenu } from '@/components/ui/filter-menu'
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

const VACIO = { icon: SlidersHorizontal, title: 'Nothing here', detail: 'Nothing matches the current search or filter.' }

/* Charge/Credit filtran por Direction y Production/Collections por Impact; en Payment Method, por tipo. */
const coincide = (x: Ajuste | Metodo, f: string) =>
  f === 'All' || ('direccion' in x ? x.direccion === f || x.impacto === f : x.tipo === f)

export function SettingsLedgerOptions() {
  const [tab, setTab] = useState<Tab>('Adjustment types')
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<string>('All')
  const [apagados, setApagados] = useState<string[]>([])

  const alternar = (id: string) =>
    setApagados((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const cambiarTab = (t: Tab) => { setTab(t); setFiltro('All'); setQ('') }

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

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader titulo="Ledger options" />

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <SettingsSearch value={q} onChange={setQ} placeholder={tab === 'Adjustment types' ? 'Search adjustment types' : 'Search payment methods'} />
        <FilterMenu
          label={tab === 'Adjustment types' ? 'Filter adjustment types' : 'Filter payment methods'}
          groups={[{
            type: 'single', title: 'Type', defaultValue: 'All', value: filtro, onChange: setFiltro,
            options: filtros.map((f) => ({ value: f, count: (tab === 'Adjustment types' ? AJUSTES : METODOS).filter((x) => coincide(x, f)).length })),
          }]}
        />
      </div>

      {/* Qué lista se ve, en pestañas a la izquierda, debajo del buscador: como en toda la app (settings-ledger.md, 2026-11-20). */}
      <Tabs className="mt-4" aria-label="Ledger options" tabs={TABS} value={tab} onChange={cambiarTab} />

      {/* La tabla estándar: mismo encabezado y pie que las otras de Settings; el switch Enabled va a la izquierda, como un
          badge (tablas estandarizadas v2, 2026-11-24). */}
      <div className="mt-4">
        {tab === 'Adjustment types' ? (
          <DataTable<Ajuste>
            key="ajustes"
            columns={[
              { key: 'tipo', header: 'Name', width: 180, cell: (a) => <TextCell>{a.tipo}</TextCell> },
              { key: 'descripcion', header: 'Description', cell: (a) => <TextCell>{a.descripcion}</TextCell> },
              { key: 'categoria', header: 'Category', width: 100, cell: (a) => a.categoria },
              { key: 'direccion', header: 'Direction', width: 90, cell: (a) => a.direccion },
              { key: 'impacto', header: 'Impact', width: 100, cell: (a) => a.impacto },
              { key: 'enabled', header: 'Enabled', width: 70, cell: (a) => <Switch on={!apagados.includes(a.id)} onChange={() => alternar(a.id)} label={`Enable ${a.tipo}`} /> },
            ]}
            rows={filas as Ajuste[]}
            rowKey={(a) => a.id}
            rowLabel={(a) => a.tipo}
            empty={VACIO}
          />
        ) : (
          <DataTable<Metodo>
            key="metodos"
            columns={[
              { key: 'nombre', header: 'Name', cell: (m) => <TextCell>{m.nombre}</TextCell> },
              { key: 'tipo', header: 'Method type', width: 110, cell: (m) => m.tipo },
              { key: 'estado', header: 'Status', width: 90, cell: () => 'Active' },
              /* El switch es un estado editable, no una acción: la columna se llama Enabled en las dos pestañas
                 (propuesta de consistencia, 2026-11-20). */
              { key: 'enabled', header: 'Enabled', width: 70, cell: (m) => <Switch on={!apagados.includes(m.id)} onChange={() => alternar(m.id)} label={`Enable ${m.nombre}`} /> },
            ]}
            rows={filas as Metodo[]}
            rowKey={(m) => m.id}
            rowLabel={(m) => m.nombre}
            empty={VACIO}
          />
        )}
      </div>
    </div>
  )
}
