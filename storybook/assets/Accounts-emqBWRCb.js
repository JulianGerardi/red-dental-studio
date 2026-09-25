import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchButton } from '@/components/ui/search-button'
import { aviso } from '@/components/ui/toaster'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'

/* Settings → Accounts. Ver design-reference/figma/modulos/settings-accounts.md.

   \`Cuenta\`, \`CUENTAS\` y el tono de \`estado\` se exportan: Julián marcó que en
   el sitio real (red.dev.confidentally.com/settings/account) entrar a una
   cuenta de esta lista lleva a SU configuración -las mismas tres pestañas
   Information/Subscription/Owner que ve el usuario logueado para la propia,
   en pages/settings/Account.tsx-, no a un placeholder. */
export type EstadoCuenta = 'Active' | 'Draft' | 'Pending'

export const ESTADO_TONO: Record<EstadoCuenta, PillTone> = {
  Active: 'success',
  Draft: 'neutral',
  Pending: 'warning',
}

export type Cuenta = {
  id: string
  nombre: string
  plan: string
  suscripcion: string
  vence: string
  estadoSuscripcion: string
  locaciones: number
  empleados: number
  licencias: string
  duenos: string
  estado: EstadoCuenta
}

/* El guion largo es el vacío del diseño: hay cuentas sin plan, sin dueño y
   sin licencias, y se replican así en vez de inventarles un valor. */
export const CUENTAS: Cuenta[] = [
  { id: 'c1', nombre: 'aasdasda', plan: 'testing betsy', suscripcion: 'BET', vence: '09/30/2026', estadoSuscripcion: 'ACTIVE', locaciones: 0, empleados: 0, licencias: '5', duenos: '—', estado: 'Active' },
  { id: 'c2', nombre: 'alo com dieam', plan: '—', suscripcion: '—', vence: '', estadoSuscripcion: '', locaciones: 0, empleados: 0, licencias: '—', duenos: 'jojojo jojojo', estado: 'Draft' },
  { id: 'c3', nombre: 'Betsy account', plan: 'Prueba Red', suscripcion: 'PBR', vence: '11/30/2026', estadoSuscripcion: 'ACTIVE', locaciones: 1, empleados: 2, licencias: '170', duenos: 'Betsy Owner owww', estado: 'Active' },
  { id: 'c4', nombre: 'betsy test owner', plan: '—', suscripcion: '—', vence: '', estadoSuscripcion: '', locaciones: 0, empleados: 0, licencias: '—', duenos: 'bridge youandl', estado: 'Draft' },
  { id: 'c5', nombre: 'bla bla bla', plan: '—', suscripcion: '—', vence: '', estadoSuscripcion: '', locaciones: 0, empleados: 0, licencias: '—', duenos: '—', estado: 'Draft' },
  { id: 'c6', nombre: 'caba', plan: 'testing betsy', suscripcion: 'BET', vence: '07/31/2026', estadoSuscripcion: 'CANCELLED', locaciones: 0, empleados: 0, licencias: '5', duenos: '—', estado: 'Active' },
  { id: 'c7', nombre: 'clinic 002', plan: 'Confidentally Basic Pack', suscripcion: 'CBP', vence: '11/28/2026', estadoSuscripcion: 'ACTIVE', locaciones: 0, empleados: 0, licencias: '3', duenos: '—', estado: 'Pending' },
  { id: 'c8', nombre: 'clinic 003', plan: 'Confidentally Basic Pack', suscripcion: 'CBP', vence: '07/24/2027', estadoSuscripcion: 'ACTIVE', locaciones: 0, empleados: 0, licencias: '3', duenos: 'jonatan ale', estado: 'Pending' },
  { id: 'c9', nombre: 'clinic007', plan: 'Prueba Red', suscripcion: 'PBR', vence: '01/31/2027', estadoSuscripcion: 'ACTIVE', locaciones: 1, empleados: 1, licencias: '170', duenos: 'juan quintero', estado: 'Active' },
  { id: 'c10', nombre: 'Clinica de Abril', plan: 'Confidentally Premium Abril', suscripcion: 'ABR', vence: '08/07/2026', estadoSuscripcion: 'EXPIRED', locaciones: 0, empleados: 0, licencias: '12', duenos: 'Maria Viola', estado: 'Pending' },
  { id: 'c11', nombre: 'Clinica Norte', plan: 'Prueba Red', suscripcion: 'PBR', vence: '02/28/2027', estadoSuscripcion: 'ACTIVE', locaciones: 2, empleados: 6, licencias: '40', duenos: 'Nadia Duarte', estado: 'Active' },
  { id: 'c12', nombre: 'Consultorio Sur', plan: 'Confidentally Basic Pack', suscripcion: 'CBP', vence: '05/12/2027', estadoSuscripcion: 'ACTIVE', locaciones: 1, empleados: 3, licencias: '8', duenos: 'Elias Aguirre', estado: 'Pending' },
]

const FILTROS = ['All', 'Active', 'Draft', 'Pending'] as const

const COLS = {
  nombre: 'w-[120px] shrink-0',
  plan: 'w-[130px] shrink-0',
  suscripcion: 'w-[90px] shrink-0',
  vence: 'w-[95px] shrink-0',
  estadoSub: 'w-[110px] shrink-0',
  locaciones: 'w-[80px] shrink-0',
  empleados: 'w-[85px] shrink-0',
  licencias: 'w-[75px] shrink-0',
  duenos: 'min-w-[110px] flex-1',
  estado: 'w-[85px] shrink-0',
  acciones: 'w-[60px] shrink-0 text-right',
}

export function SettingsAccounts() {
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('All')
  const [porPagina, setPorPagina] = useState(10)
  const [pagina, setPagina] = useState(1)

  const filtradas = useMemo(
    () => CUENTAS.filter(
      (c) =>
        (filtro === 'All' || c.estado === filtro) &&
        \`\${c.nombre} \${c.plan} \${c.duenos}\`.toLowerCase().includes(q.trim().toLowerCase()),
    ),
    [q, filtro],
  )
  const paginas = Math.max(1, Math.ceil(filtradas.length / porPagina))
  const actual = Math.min(pagina, paginas)
  const visibles = filtradas.slice((actual - 1) * porPagina, actual * porPagina)
  const desde = filtradas.length === 0 ? 0 : (actual - 1) * porPagina + 1

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Accounts overview"
        bajada="View and manage all accounts across the platform."
        accion={(
          <button
            type="button"
            onClick={() => aviso.info('New account — coming soon.')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-2 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
          >
            <Plus className="size-4" /> New Account
          </button>
        )}
      >
        <div className="relative min-w-0 flex-1 sm:max-w-[300px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPagina(1) }}
            placeholder="Search..."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <SearchButton onClick={() => setPagina(1)} className="h-9" />
        <select
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value as typeof filtro); setPagina(1) }}
          aria-label="Filter by status"
          className="focus:border-dash-blue h-9 shrink-0 rounded-md border border-line bg-white px-3 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none"
        >
          {FILTROS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </SettingsPageHeader>

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-line-row bg-white">
        <div className="min-w-[1080px]">
          <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
            <span className={COLS.nombre}>Name</span>
            <span className={COLS.plan}>Plan</span>
            <span className={COLS.suscripcion}>Subscription</span>
            <span className={COLS.vence}>Expires on</span>
            <span className={COLS.estadoSub}>Subscription Status</span>
            <span className={COLS.locaciones}>Locations</span>
            <span className={COLS.empleados}>Employees</span>
            <span className={COLS.licencias}>Licenses</span>
            <span className={COLS.duenos}>Owners</span>
            <span className={COLS.estado}>Status</span>
            <span className={COLS.acciones}>Actions</span>
          </div>

          {visibles.length === 0 ? (
            <EmptyState icon={Building2} title="No accounts" detail="Nothing matches the current search or filter." />
          ) : (
            visibles.map((c) => (
              <div key={c.id} className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft">
                <Link to={\`/settings/accounts/\${c.id}\`} className={cn(COLS.nombre, 'text-dash-blue truncate font-medium hover:underline')} title={c.nombre}>
                  {c.nombre}
                </Link>
                <span className={cn(COLS.plan, 'truncate font-medium text-ink')} title={c.plan}>{c.plan}</span>
                <span className={COLS.suscripcion}>{c.suscripcion}</span>
                <span className={COLS.vence}>{c.vence}</span>
                <span className={COLS.estadoSub}>{c.estadoSuscripcion}</span>
                <span className={COLS.locaciones}>{c.locaciones}</span>
                <span className={COLS.empleados}>{c.empleados}</span>
                <span className={COLS.licencias}>{c.licencias}</span>
                <span className={cn(COLS.duenos, 'truncate')} title={c.duenos}>{c.duenos}</span>
                <span className={COLS.estado}>
                  <Pill tone={ESTADO_TONO[c.estado]}>{c.estado}</Pill>
                </span>
                <span className={cn(COLS.acciones, 'flex justify-end')}>
                  <RowActionsMenu label={c.nombre}>
                    <DropdownMenuItem onSelect={() => aviso.info(\`Editing \${c.nombre}.\`)}>Edit account</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => aviso.info(\`Licenses for \${c.nombre}.\`)}>Manage licenses</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={() => aviso.warn(\`\${c.nombre} suspended.\`)}>Suspend</DropdownMenuItem>
                  </RowActionsMenu>
                </span>
              </div>
            ))
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
            <span className="flex items-center gap-3 text-xs font-semibold text-ink-muted">
              Showing {desde} to {desde === 0 ? 0 : desde + visibles.length - 1} of {filtradas.length} results
              {/* "Mostrar" en castellano en una pantalla en inglés: así viene
                  en el diseño y el contenido se replica tal cual. */}
              <span className="flex items-center gap-2 font-normal">
                Mostrar:
                <select
                  value={porPagina}
                  onChange={(e) => { setPorPagina(Number(e.target.value)); setPagina(1) }}
                  aria-label="Rows per page"
                  className="focus:border-dash-blue h-7 rounded-md border border-line bg-white px-2 text-[12px] focus:outline-none"
                >
                  {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </span>
            </span>
            <Pagination pagina={actual} paginas={paginas} onChange={setPagina} />
          </div>
        </div>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};