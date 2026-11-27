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
      <span className={cn('absolute top-0.5 size-4 rounded-full bg-surface transition-all', on ? 'left-[18px]' : 'left-0.5')} />
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

/* El Filter de cada pestaña, con lo que cada lista tiene (settings-ledger.md, 2026-11-24): un adjustment type tiene
   Direction (Charge / Credit) e Impact (Production / Collections); un payment method, sólo Method type (Patient /
   Insurance, CON-3363). */
const DIRECCIONES = ['All', 'Charge', 'Credit'] as const
const IMPACTOS = ['All', 'Production', 'Collections'] as const
const TIPOS_METODO = ['All', 'Patient', 'Insurance'] as const

const VACIO = { icon: SlidersHorizontal, title: 'Nothing here', detail: 'Nothing matches the current search or filter.' }

const es = (valor: string, f: string) => f === 'All' || valor === f

export function SettingsLedgerOptions() {
  const [tab, setTab] = useState<Tab>('Adjustment types')
  const [q, setQ] = useState('')
  const [direccion, setDireccion] = useState('All')
  const [impacto, setImpacto] = useState('All')
  const [tipoMetodo, setTipoMetodo] = useState('All')
  const [apagados, setApagados] = useState<string[]>([])

  const alternar = (id: string) =>
    setApagados((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const cambiarTab = (t: Tab) => { setTab(t); setDireccion('All'); setImpacto('All'); setTipoMetodo('All'); setQ('') }

  const filas = useMemo(() => {
    const texto = q.trim().toLowerCase()
    if (tab === 'Adjustment types') {
      return AJUSTES.filter((a) => es(a.direccion, direccion) && es(a.impacto, impacto) && `${a.tipo} ${a.descripcion}`.toLowerCase().includes(texto))
    }
    return METODOS.filter((m) => es(m.tipo, tipoMetodo) && m.nombre.toLowerCase().includes(texto))
  }, [tab, q, direccion, impacto, tipoMetodo])

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader titulo="Ledger" />

      {/* Primero qué lista se ve (pestañas) y debajo el buscador y el Filter de esa lista (settings-ledger.md, 2026-11-24). */}
      <Tabs className="mt-5" aria-label="Ledger options" tabs={TABS} value={tab} onChange={cambiarTab} />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <SettingsSearch value={q} onChange={setQ} placeholder={tab === 'Adjustment types' ? 'Search adjustment types' : 'Search payment methods'} />
        {tab === 'Adjustment types' ? (
          <FilterMenu
            label="Filter adjustment types"
            groups={[
              {
                type: 'single', title: 'Direction', defaultValue: 'All', value: direccion, onChange: setDireccion,
                options: DIRECCIONES.map((f) => ({ value: f, count: AJUSTES.filter((a) => es(a.direccion, f)).length })),
              },
              {
                type: 'single', title: 'Impact', defaultValue: 'All', value: impacto, onChange: setImpacto,
                options: IMPACTOS.map((f) => ({ value: f, count: AJUSTES.filter((a) => es(a.impacto, f)).length })),
              },
            ]}
          />
        ) : (
          <FilterMenu
            label="Filter payment methods"
            groups={[{
              type: 'single', title: 'Method type', defaultValue: 'All', value: tipoMetodo, onChange: setTipoMetodo,
              options: TIPOS_METODO.map((f) => ({ value: f, count: METODOS.filter((m) => es(m.tipo, f)).length })),
            }]}
          />
        )}
      </div>

      {/* La tabla estándar: mismo encabezado y pie que las otras de Settings; el switch Enabled va a la izquierda, como un
          badge (tablas estandarizadas v2, 2026-11-24). */}
      <div className="mt-4">
        {tab === 'Adjustment types' ? (
          <DataTable<Ajuste>
            key="ajustes"
            columns={[
              /* Name y Description se reparten el ancho: sola, Description se llevaba media tabla (2026-11-24). */
              { key: 'tipo', header: 'Name', cell: (a) => <TextCell>{a.tipo}</TextCell> },
              { key: 'descripcion', header: 'Description', cell: (a) => <TextCell>{a.descripcion}</TextCell> },
              { key: 'categoria', header: 'Category', width: 120, cell: (a) => a.categoria },
              { key: 'direccion', header: 'Direction', width: 120, cell: (a) => a.direccion },
              { key: 'impacto', header: 'Impact', width: 120, cell: (a) => a.impacto },
              { key: 'enabled', header: 'Enabled', width: 80, cell: (a) => <Switch on={!apagados.includes(a.id)} onChange={() => alternar(a.id)} label={`Enable ${a.tipo}`} /> },
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
              { key: 'enabled', header: 'Enabled', width: 80, cell: (m) => <Switch on={!apagados.includes(m.id)} onChange={() => alternar(m.id)} label={`Enable ${m.nombre}`} /> },
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
