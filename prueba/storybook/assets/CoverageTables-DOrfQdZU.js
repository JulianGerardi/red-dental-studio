import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Copy, HandCoins, Pencil, Plus, Power, ShieldCheck, Smile, Trash2, Wallet } from 'lucide-react'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { aviso } from '@/components/ui/toaster'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { StatStripApilada } from '@/components/dashboard/StatStrip'
import { CoverageBar } from '@/components/finance/CoverageBar'
import { CoverageSummary } from '@/components/finance/CoverageSummary'
import { CoverageTableDrawer } from '@/components/finance/CoverageTableDrawer'
import { CoverageRuleDrawer } from '@/components/finance/CoverageRuleDrawer'
import { PlansTable } from '@/components/finance/PlansTable'
import { BOTON_ICONO } from '@/lib/estilos'
import type { ProcedureGroup } from '@/components/clinical/dental/data'
import { useFinanzas } from '@/data/finanzasStore'
import {
  CATEGORIAS, TONO_ESTADO, cantidad, dinero, idNuevo, maximoTexto,
  type Estado, type ReglaCobertura, type TablaCobertura,
} from '@/data/finanzas'

/* Settings → Billing → Coverage Tables: la lista y el detalle de cada una (qué porcentaje paga por categoría CDT, sus
   límites y los planes que la usan). Ver design-reference/figma/modulos/settings-billing.md. */

const LISTA = '/settings/finance/coverage-table'
const FILTROS = ['All', 'Active', 'Inactive'] as const

/* Las acciones de una coverage table, iguales en el kebab de la fila y en el del detalle. */
export function useAccionesCobertura() {
  const navigate = useNavigate()
  const { coberturas, planes, guardar, borrar } = useFinanzas()
  const usos = (t: TablaCobertura) => planes.filter((p) => p.coberturaId === t.id).length
  return {
    usos,
    duplicar: (t: TablaCobertura) => {
      const copia: TablaCobertura = { ...t, id: idNuevo(\`\${t.nombre} copy\`, coberturas.map((x) => x.id)), nombre: \`\${t.nombre} (copy)\`, reglas: { ...t.reglas } }
      guardar('coberturas', copia)
      aviso.ok(\`\${copia.nombre} was created.\`, { label: 'Open', onClick: () => navigate(\`\${LISTA}/\${copia.id}\`) })
    },
    alternar: (t: TablaCobertura) => {
      const estado: Estado = t.estado === 'Active' ? 'Inactive' : 'Active'
      guardar('coberturas', { ...t, estado })
      aviso.ok(\`\${t.nombre} is now \${estado.toLowerCase()}.\`)
    },
    /* Una tabla en uso no se borra: los planes quedarían sin cobertura. */
    quitar: (t: TablaCobertura, alBorrar?: () => void) => {
      const n = usos(t)
      if (n) return aviso.error(\`\${t.nombre} is used by \${cantidad(n, 'plan')}. Move them to another coverage table first.\`)
      const deshacer = borrar('coberturas', t.id)
      alBorrar?.()
      aviso.ok(\`\${t.nombre} was deleted.\`, { label: 'Undo', onClick: deshacer })
    },
  }
}

export function MenuCobertura({ t, acciones, alBorrar }: { t: TablaCobertura; acciones: ReturnType<typeof useAccionesCobertura>; alBorrar?: () => void }) {
  return (
    <>
      <DropdownMenuItem onSelect={() => acciones.duplicar(t)}><Copy className="size-4 shrink-0" /> Duplicate</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => acciones.alternar(t)}><Power className="size-4 shrink-0" /> {t.estado === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onSelect={() => acciones.quitar(t, alBorrar)}><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
    </>
  )
}

export function SettingsCoverageTables({ nuevo = false }: { nuevo?: boolean }) {
  const navigate = useNavigate()
  const { coberturas, guardar } = useFinanzas()
  const acciones = useAccionesCobertura()
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('All')
  const [drawer, setDrawer] = useState<'nuevo' | TablaCobertura | null>(nuevo ? 'nuevo' : null)
  const cerrar = () => { setDrawer(null); if (nuevo) navigate(LISTA, { replace: true }) }

  const filas = useMemo(
    () => coberturas.filter((t) => (filtro === 'All' || t.estado === filtro) && t.nombre.toLowerCase().includes(q.trim().toLowerCase())),
    [coberturas, q, filtro],
  )

  const columnas: DataTableColumn<TablaCobertura>[] = [
    { key: 'nombre', header: 'Name', width: 210, locked: true, cell: (t) => <Link to={\`\${LISTA}/\${t.id}\`} className="text-dash-blue truncate font-semibold hover:underline">{t.nombre}</Link> },
    { key: 'cobertura', header: 'Coverage', cell: (t) => <CoverageSummary tabla={t} /> },
    { key: 'maximo', header: 'Annual max', width: 90, align: 'right', cell: (t) => <span className={t.maximo ? 'font-medium text-ink tabular-nums' : 'text-ink-muted'}>{maximoTexto(t.maximo)}</span> },
    { key: 'deducible', header: 'Deductible', width: 85, align: 'right', cell: (t) => <span className="font-medium text-ink tabular-nums">{dinero(t.deducible)}</span> },
    { key: 'periodo', header: 'Benefit period', width: 110, cell: (t) => <TextCell>{t.periodo}</TextCell> },
    { key: 'planes', header: 'Plans', width: 60, align: 'right', cell: (t) => <span className="tabular-nums">{acciones.usos(t)}</span> },
    { key: 'estado', header: 'Status', width: 90, cell: (t) => <Pill tone={TONO_ESTADO[t.estado]}>{t.estado}</Pill> },
  ]

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Coverage Tables"
        bajada="What a plan pays for each procedure category, with its deductible and maximums."
        accion={<Button onClick={() => setDrawer('nuevo')}><Plus /> New coverage table</Button>}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search coverage tables" />
        <FilterMenu
          label="Filter by status"
          groups={[{
            type: 'single', title: 'Status', defaultValue: 'All', value: filtro, onChange: (v) => setFiltro(v as typeof filtro),
            options: FILTROS.map((f) => ({ value: f, count: f === 'All' ? coberturas.length : coberturas.filter((t) => t.estado === f).length, tone: f === 'All' ? undefined : TONO_ESTADO[f] })),
          }]}
        />
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={columnas}
          rows={filas}
          rowKey={(t) => t.id}
          rowLabel={(t) => t.nombre}
          itemLabel="coverage tables"
          empty={{ icon: ShieldCheck, title: 'No coverage tables yet', detail: 'Create one from a template: every plan needs one.' }}
          rowActions={(t) => (
            <>
              <DropdownMenuItem onSelect={() => setDrawer(t)}><Pencil className="size-4 shrink-0" /> Edit limits</DropdownMenuItem>
              <MenuCobertura t={t} acciones={acciones} />
            </>
          )}
        />
      </div>

      {drawer && (
        <CoverageTableDrawer
          inicial={drawer === 'nuevo' ? undefined : drawer}
          onClose={cerrar}
          onGuardar={(t) => {
            guardar('coberturas', t)
            if (drawer === 'nuevo') aviso.ok(\`\${t.nombre} was created.\`, { label: 'Open', onClick: () => navigate(\`\${LISTA}/\${t.id}\`) })
            else aviso.ok(\`\${t.nombre} was updated.\`)
          }}
        />
      )}
    </div>
  )
}

/* Las reglas de una tabla, una fila por categoría CDT. Tocar la fila abre su regla en un drawer. */
export function CoverageRulesTable({ tabla, onEditar }: { tabla: TablaCobertura; onEditar: (g: ProcedureGroup) => void }) {
  type Fila = (typeof CATEGORIAS)[number] & { regla: ReglaCobertura }
  const filas: Fila[] = CATEGORIAS.map((c) => ({ ...c, regla: tabla.reglas[c.grupo] }))
  const columnas: DataTableColumn<Fila>[] = [
    { key: 'categoria', header: 'Category', locked: true, cell: (f) => <TextCell strong>{f.grupo}</TextCell> },
    { key: 'codigos', header: 'Codes', width: 110, cell: (f) => <span className="text-ink-muted tabular-nums">{f.rango}</span> },
    { key: 'clase', header: 'Class', width: 100, cell: (f) => f.clase },
    { key: 'pago', header: 'Plan pays', width: 120, locked: true, cell: (f) => <CoverageBar value={f.regla.porcentaje} /> },
    { key: 'deducible', header: 'Deductible', width: 90, cell: (f) => (f.regla.porcentaje === 0 ? '—' : f.regla.deducible ? 'Applies' : 'Waived') },
    { key: 'espera', header: 'Waiting', width: 90, cell: (f) => (f.regla.espera === 'None' ? '—' : f.regla.espera) },
    { key: 'frecuencia', header: 'Frequency', width: 190, cell: (f) => (f.regla.frecuencia ? <TextCell>{f.regla.frecuencia}</TextCell> : '—') },
  ]
  return (
    <DataTable
      columns={columnas}
      rows={filas}
      rowKey={(f) => f.grupo}
      rowLabel={(f) => f.grupo}
      itemLabel="categories"
      pageSize={filas.length}
      onRowClick={(f) => onEditar(f.grupo)}
      rowActions={(f) => <DropdownMenuItem onSelect={() => onEditar(f.grupo)}><Pencil className="size-4 shrink-0" /> Edit rule</DropdownMenuItem>}
    />
  )
}

const TABS = ['Coverage', 'Plans'] as const
type Tab = (typeof TABS)[number]

export function SettingsCoverageTableDetail() {
  const { tableId } = useParams()
  const navigate = useNavigate()
  const { coberturas, planes, guardar } = useFinanzas()
  const acciones = useAccionesCobertura()
  const [tab, setTab] = useState<Tab>('Coverage')
  const [editando, setEditando] = useState(false)
  const [regla, setRegla] = useState<ProcedureGroup | null>(null)
  const t = coberturas.find((x) => x.id === tableId)
  if (!t) return <Navigate to={LISTA} replace />

  const susPlanes = planes.filter((p) => p.coberturaId === t.id)

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo={t.nombre}
        etiquetas={<Pill tone={TONO_ESTADO[t.estado]}>{t.estado}</Pill>}
        bajada={\`Benefit period: \${t.periodo}. Click a category to change what the plan pays.\`}
        accion={(
          <div className="flex items-center gap-2">
            <Button onClick={() => setEditando(true)}><Pencil /> Edit limits</Button>
            <RowActionsMenu label={t.nombre} className={BOTON_ICONO}>
              <MenuCobertura t={t} acciones={acciones} alBorrar={() => navigate(LISTA)} />
            </RowActionsMenu>
          </div>
        )}
      />

      <div className="mt-5">
        <StatStripApilada stats={[
          { label: 'Annual maximum', value: maximoTexto(t.maximo), nota: 'per person', icon: Wallet },
          { label: 'Deductible', value: dinero(t.deducible), nota: \`Family \${dinero(t.deducibleFamilia)}\`, icon: HandCoins },
          { label: 'Ortho lifetime max', value: t.maximoOrto ? dinero(t.maximoOrto) : 'Not covered', nota: 'per person', icon: Smile },
          { label: 'Plans', value: String(susPlanes.length), nota: susPlanes.length ? 'use this table' : 'Not used by any plan', icon: ShieldCheck },
        ]} />
      </div>

      <Tabs className="mt-5" aria-label="Coverage table sections" tabs={['Coverage', { value: 'Plans', count: susPlanes.length }]} value={tab} onChange={setTab} />

      <div className="mt-4">
        {tab === 'Coverage' && <CoverageRulesTable tabla={t} onEditar={setRegla} />}
        {tab === 'Plans' && (
          <PlansTable
            planes={susPlanes}
            ocultar={['coverageTable']}
            vacio={{ title: 'No plans use this coverage table', detail: 'Choose it in a plan, from the carrier’s detail.' }}
          />
        )}
      </div>

      {editando && (
        <CoverageTableDrawer inicial={t} onClose={() => setEditando(false)} onGuardar={(x) => { guardar('coberturas', x); aviso.ok(\`\${x.nombre} was updated.\`) }} />
      )}
      {regla && (
        <CoverageRuleDrawer
          grupo={regla}
          regla={t.reglas[regla]}
          onClose={() => setRegla(null)}
          onGuardar={(r) => { guardar('coberturas', { ...t, reglas: { ...t.reglas, [regla]: r } }); aviso.ok(\`\${regla} now pays \${r.porcentaje}%.\`) }}
        />
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};