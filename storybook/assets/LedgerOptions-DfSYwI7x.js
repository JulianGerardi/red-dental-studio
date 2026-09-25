import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchButton } from '@/components/ui/search-button'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'

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

const TABS = ['Adjustments Types', 'Payment Method'] as const
type Tab = (typeof TABS)[number]

const FILTROS_AJUSTE = ['All', 'Charge', 'Credit', 'Production', 'Collections'] as const
const FILTROS_METODO = ['All', 'Patient', 'Insurance'] as const

const TAM_PAGINA = 6

export function SettingsLedgerOptions() {
  const [tab, setTab] = useState<Tab>('Adjustments Types')
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<string>('All')
  const [pagina, setPagina] = useState(1)
  const [apagados, setApagados] = useState<string[]>([])

  const alternar = (id: string) =>
    setApagados((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const cambiarTab = (t: Tab) => { setTab(t); setFiltro('All'); setQ(''); setPagina(1) }

  const filtros = tab === 'Adjustments Types' ? FILTROS_AJUSTE : FILTROS_METODO

  const filas = useMemo(() => {
    const texto = q.trim().toLowerCase()
    if (tab === 'Adjustments Types') {
      return AJUSTES.filter(
        (a) =>
          (filtro === 'All' || a.direccion === filtro || a.impacto === filtro) &&
          \`\${a.tipo} \${a.descripcion}\`.toLowerCase().includes(texto),
      )
    }
    return METODOS.filter(
      (m) => (filtro === 'All' || m.tipo === filtro) && m.nombre.toLowerCase().includes(texto),
    )
  }, [tab, q, filtro])

  const paginas = Math.max(1, Math.ceil(filas.length / TAM_PAGINA))
  const actual = Math.min(pagina, paginas)
  const visibles = filas.slice((actual - 1) * TAM_PAGINA, actual * TAM_PAGINA)

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Ledger Options"
        /* La bajada del frame es la de Locations, copiada tal cual. Se
           replica: el contenido va como está. */
        bajada="Set your location name. Add the location you need."
      >
        <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPagina(1) }}
            /* El frame dice "Search patients" en las dos pestañas, donde no
               hay pacientes. Se replica. */
            placeholder="Search patients"
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <SearchButton onClick={() => setPagina(1)} className="h-9" />
        <select
          value={tab}
          onChange={(e) => cambiarTab(e.target.value as Tab)}
          aria-label="View"
          className="focus:border-dash-blue h-9 shrink-0 rounded-md border border-line bg-white px-3 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none"
        >
          {TABS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </SettingsPageHeader>

      <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-slate p-1">
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => { setFiltro(f); setPagina(1) }}
            className={cn(
              'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              filtro === f ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-line-row bg-white">
        <div className={tab === 'Adjustments Types' ? 'min-w-[820px]' : 'min-w-[620px]'}>
          {tab === 'Adjustments Types' ? (
            <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
              <span className="w-[160px] shrink-0">Adjustment Type</span>
              <span className="min-w-[180px] flex-1">Description</span>
              <span className="w-[100px] shrink-0">Category</span>
              <span className="w-[90px] shrink-0">Direction</span>
              <span className="w-[100px] shrink-0">Impact</span>
              <span className="w-[70px] shrink-0 text-right">Actions</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
              <span className="min-w-[200px] flex-1">Name</span>
              <span className="w-[110px] shrink-0">Method Type</span>
              <span className="w-[90px] shrink-0">Status</span>
              {/* El frame rotula esta columna "Status" otra vez; se usa
                  "Actions", que es como la llama la otra pestaña para la
                  misma columna de toggle. */}
              <span className="w-[70px] shrink-0 text-right">Actions</span>
            </div>
          )}

          {visibles.length === 0 ? (
            <EmptyState icon={SlidersHorizontal} title="Nothing here" detail="Nothing matches the current search or filter." />
          ) : tab === 'Adjustments Types' ? (
            (visibles as Ajuste[]).map((a) => (
              <div key={a.id} className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft">
                <span className="w-[160px] shrink-0 truncate text-ink" title={a.tipo}>{a.tipo}</span>
                <span className="min-w-[180px] flex-1 truncate" title={a.descripcion}>{a.descripcion}</span>
                <span className="w-[100px] shrink-0 truncate">{a.categoria}</span>
                <span className="w-[90px] shrink-0 truncate">{a.direccion}</span>
                <span className="w-[100px] shrink-0 truncate">{a.impacto}</span>
                <span className="flex w-[70px] shrink-0 justify-end">
                  <Switch on={!apagados.includes(a.id)} onChange={() => alternar(a.id)} label={\`Enable \${a.tipo}\`} />
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
                  <Switch on={!apagados.includes(m.id)} onChange={() => alternar(m.id)} label={\`Enable \${m.nombre}\`} />
                </span>
              </div>
            ))
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
            <span className="text-xs font-semibold text-ink-muted">
              Showing {visibles.length} of {filas.length} {tab === 'Adjustments Types' ? 'adjustment types' : 'payment methods'}
            </span>
            <Pagination pagina={actual} paginas={paginas} onChange={setPagina} />
          </div>
        </div>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};