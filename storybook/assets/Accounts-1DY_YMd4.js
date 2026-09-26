import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Building2 } from 'lucide-react'
import { SearchButton } from '@/components/ui/search-button'
import { aviso } from '@/components/ui/toaster'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'

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

/* La tabla estándar (ui/data-table) con las columnas de cuentas. Owners es la
   columna que se estira. */
const COLUMNAS: DataTableColumn<Cuenta>[] = [
  { key: 'nombre', header: 'Name', width: 120, cell: (c) => <Link to={\`/settings/accounts/\${c.id}\`} className="text-dash-blue truncate font-medium hover:underline" title={c.nombre}>{c.nombre}</Link> },
  { key: 'plan', header: 'Plan', width: 130, cell: (c) => <TextCell strong>{c.plan}</TextCell> },
  { key: 'suscripcion', header: 'Subscription', width: 90, cell: (c) => c.suscripcion },
  { key: 'vence', header: 'Expires on', width: 95, cell: (c) => c.vence },
  { key: 'estadoSub', header: 'Subscription Status', width: 110, cell: (c) => c.estadoSuscripcion },
  { key: 'locaciones', header: 'Locations', width: 80, cell: (c) => c.locaciones },
  { key: 'empleados', header: 'Employees', width: 85, cell: (c) => c.empleados },
  { key: 'licencias', header: 'Licenses', width: 75, cell: (c) => c.licencias },
  { key: 'duenos', header: 'Owners', cell: (c) => <TextCell>{c.duenos}</TextCell> },
  { key: 'estado', header: 'Status', width: 85, cell: (c) => <Pill tone={ESTADO_TONO[c.estado]}>{c.estado}</Pill> },
]

export function SettingsAccounts() {
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('All')

  const filtradas = useMemo(
    () => CUENTAS.filter(
      (c) =>
        (filtro === 'All' || c.estado === filtro) &&
        \`\${c.nombre} \${c.plan} \${c.duenos}\`.toLowerCase().includes(q.trim().toLowerCase()),
    ),
    [q, filtro],
  )

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Accounts overview"
        bajada="View and manage all accounts across the platform."
        accion={<Button onClick={() => aviso.info('New account — coming soon.')}><Plus /> New Account</Button>}
      >
        <div className="relative min-w-0 flex-1 sm:max-w-[300px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <SearchButton onClick={() => setQ((v) => v.trim())} className="h-9" />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as typeof filtro)}
          aria-label="Filter by status"
          className="focus:border-dash-blue h-9 shrink-0 rounded-md border border-line bg-white px-3 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none"
        >
          {FILTROS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={COLUMNAS}
          rows={filtradas}
          rowKey={(c) => c.id}
          rowLabel={(c) => c.nombre}
          /* "Mostrar" en castellano en una pantalla en inglés: así viene en el
             diseño y el contenido se replica tal cual. */
          pageSizeOptions={[10, 25, 50]}
          pageSizeLabel="Mostrar:"
          empty={{ icon: Building2, title: 'No accounts', detail: 'Nothing matches the current search or filter.' }}
          rowActions={(c) => (
            <>
              <DropdownMenuItem onSelect={() => aviso.info(\`Editing \${c.nombre}.\`)}>Edit account</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => aviso.info(\`Licenses for \${c.nombre}.\`)}>Manage licenses</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={() => aviso.warn(\`\${c.nombre} suspended.\`)}>Suspend</DropdownMenuItem>
            </>
          )}
        />
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};