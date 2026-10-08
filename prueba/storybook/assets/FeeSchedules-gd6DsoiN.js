import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { CalendarDays, Copy, ListChecks, Pencil, Percent, Plus, Power, Receipt, Scale, ShieldCheck, Star, Trash2 } from 'lucide-react'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { aviso } from '@/components/ui/toaster'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DataTable, TextCell, AmountCell, type DataTableColumn } from '@/components/ui/data-table'
import { StatStripApilada } from '@/components/dashboard/StatStrip'
import { EditableAmount } from '@/components/finance/EditableAmount'
import { PlansTable } from '@/components/finance/PlansTable'
import { FeeScheduleDrawer } from '@/components/finance/FeeScheduleDrawer'
import { AdjustFeesDrawer } from '@/components/finance/AdjustFeesDrawer'
import { BOTON_ICONO } from '@/lib/estilos'
import { useFinanzas, ucrDe } from '@/data/finanzasStore'
import {
  PROCEDIMIENTOS, TONO_ESTADO, cantidad, diferenciaPromedio, idNuevo, porcentajeTexto,
  type Arancel, type Estado,
} from '@/data/finanzas'

/* Settings → Billing → Fee Schedules: la lista y el detalle de cada uno (precios por código CDT y los planes que lo
   usan). Ver design-reference/figma/modulos/settings-billing.md. */

const LISTA = '/settings/finance/fee-schedule'
const FILTROS = ['All', 'Active', 'Inactive'] as const

/* Las acciones de un fee schedule, iguales en el kebab de la fila y en el del detalle. */
export function useAccionesArancel() {
  const navigate = useNavigate()
  const { aranceles, planes, guardar, borrar } = useFinanzas()
  const usos = (a: Arancel) => planes.filter((p) => p.arancelId === a.id).length
  return {
    usos,
    porDefecto: (a: Arancel) => {
      guardar('aranceles', { ...a, porDefecto: true, estado: 'Active' })
      aviso.ok(\`\${a.nombre} is now the default fee schedule.\`)
    },
    duplicar: (a: Arancel) => {
      const copia: Arancel = { ...a, id: idNuevo(\`\${a.nombre} copy\`, aranceles.map((x) => x.id)), nombre: \`\${a.nombre} (copy)\`, porDefecto: false, precios: { ...a.precios } }
      guardar('aranceles', copia)
      aviso.ok(\`\${copia.nombre} was created.\`, { label: 'Open', onClick: () => navigate(\`\${LISTA}/\${copia.id}\`) })
    },
    alternar: (a: Arancel) => {
      if (a.porDefecto && a.estado === 'Active') return aviso.error('The default fee schedule must stay active. Set another one as default first.')
      const estado: Estado = a.estado === 'Active' ? 'Inactive' : 'Active'
      guardar('aranceles', { ...a, estado })
      aviso.ok(\`\${a.nombre} is now \${estado.toLowerCase()}.\`)
    },
    /* No se borra el default ni uno en uso: los planes quedarían sin precios. */
    quitar: (a: Arancel, alBorrar?: () => void) => {
      if (a.porDefecto) return aviso.error(\`\${a.nombre} is the default fee schedule. Set another one as default first.\`)
      const n = usos(a)
      if (n) return aviso.error(\`\${a.nombre} is used by \${cantidad(n, 'plan')}. Move them to another fee schedule first.\`)
      const deshacer = borrar('aranceles', a.id)
      alBorrar?.()
      aviso.ok(\`\${a.nombre} was deleted.\`, { label: 'Undo', onClick: deshacer })
    },
  }
}

export function MenuArancel({ a, acciones, alBorrar }: { a: Arancel; acciones: ReturnType<typeof useAccionesArancel>; alBorrar?: () => void }) {
  return (
    <>
      {!a.porDefecto && <DropdownMenuItem onSelect={() => acciones.porDefecto(a)}><Star className="size-4 shrink-0" /> Set as default</DropdownMenuItem>}
      <DropdownMenuItem onSelect={() => acciones.duplicar(a)}><Copy className="size-4 shrink-0" /> Duplicate</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => acciones.alternar(a)}><Power className="size-4 shrink-0" /> {a.estado === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onSelect={() => acciones.quitar(a, alBorrar)}><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
    </>
  )
}

/* \`nuevo\`: /settings/finance/fee-schedule/new abre la lista con el drawer de alta abierto. */
export function SettingsFeeSchedules({ nuevo = false }: { nuevo?: boolean }) {
  const navigate = useNavigate()
  const { aranceles, guardar } = useFinanzas()
  const acciones = useAccionesArancel()
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('All')
  const [drawer, setDrawer] = useState<'nuevo' | Arancel | null>(nuevo ? 'nuevo' : null)
  const cerrar = () => { setDrawer(null); if (nuevo) navigate(LISTA, { replace: true }) }
  const ucr = ucrDe(aranceles)

  const filas = useMemo(
    () => aranceles.filter((a) => (filtro === 'All' || a.estado === filtro) && \`\${a.nombre} \${a.tipo}\`.toLowerCase().includes(q.trim().toLowerCase())),
    [aranceles, q, filtro],
  )

  const columnas: DataTableColumn<Arancel>[] = [
    {
      key: 'nombre', header: 'Name', locked: true,
      cell: (a) => (
        <span className="flex min-w-0 items-center gap-2">
          <Link to={\`\${LISTA}/\${a.id}\`} className="text-dash-blue truncate font-semibold hover:underline">{a.nombre}</Link>
          {a.porDefecto && <Pill tone="info" size="sm">Default</Pill>}
        </span>
      ),
    },
    { key: 'tipo', header: 'Type', width: 110, cell: (a) => a.tipo },
    { key: 'precios', header: 'Procedures', width: 100, align: 'right', cell: (a) => <span className="tabular-nums">{Object.keys(a.precios).length} / {PROCEDIMIENTOS.length}</span> },
    { key: 'ucr', header: 'vs UCR', width: 90, align: 'right', cell: (a) => <span className="tabular-nums">{porcentajeTexto(diferenciaPromedio(a, ucr))}</span> },
    { key: 'planes', header: 'Plans', width: 70, align: 'right', cell: (a) => <span className="tabular-nums">{acciones.usos(a)}</span> },
    { key: 'vigencia', header: 'Effective', width: 110, cell: (a) => <TextCell>{a.vigencia}</TextCell> },
    { key: 'estado', header: 'Status', width: 90, cell: (a) => <Pill tone={TONO_ESTADO[a.estado]}>{a.estado}</Pill> },
  ]

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Fee Schedules"
        bajada="What your office charges for each procedure. Each insurance plan uses one of these."
        accion={<Button onClick={() => setDrawer('nuevo')}><Plus /> New fee schedule</Button>}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search fee schedules" />
        <FilterMenu
          label="Filter by status"
          groups={[{
            type: 'single', title: 'Status', defaultValue: 'All', value: filtro, onChange: (v) => setFiltro(v as typeof filtro),
            options: FILTROS.map((f) => ({ value: f, count: f === 'All' ? aranceles.length : aranceles.filter((a) => a.estado === f).length, tone: f === 'All' ? undefined : TONO_ESTADO[f] })),
          }]}
        />
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={columnas}
          rows={filas}
          rowKey={(a) => a.id}
          rowLabel={(a) => a.nombre}
          itemLabel="fee schedules"
          empty={{ icon: Receipt, title: 'No fee schedules yet', detail: 'Create your office fees first: every plan needs one.' }}
          rowActions={(a) => (
            <>
              <DropdownMenuItem onSelect={() => setDrawer(a)}><Pencil className="size-4 shrink-0" /> Edit details</DropdownMenuItem>
              <MenuArancel a={a} acciones={acciones} />
            </>
          )}
        />
      </div>

      {drawer && (
        <FeeScheduleDrawer
          inicial={drawer === 'nuevo' ? undefined : drawer}
          onClose={cerrar}
          onGuardar={(a) => {
            guardar('aranceles', a)
            if (drawer === 'nuevo') aviso.ok(\`\${a.nombre} was created.\`, { label: 'Open', onClick: () => navigate(\`\${LISTA}/\${a.id}\`) })
            else aviso.ok(\`\${a.nombre} was updated.\`)
          }}
        />
      )}
    </div>
  )
}

/* La tabla de precios: el catálogo CDT entero, con el precio de este fee schedule editable en la celda y la diferencia
   contra el UCR. Los códigos sin precio dicen "Not set". */
export function FeesTable({
  arancel, ucr, onCambiar,
}: {
  arancel: Arancel
  /** El fee schedule de referencia; sin él (o si es este mismo) no hay columnas de comparación. */
  ucr?: Arancel
  onCambiar: (codigo: string, valor: number | undefined) => void
}) {
  const base = ucr && ucr.id !== arancel.id ? ucr : undefined
  const grupos = [...new Set(PROCEDIMIENTOS.map((p) => p.group))]
  type Fila = (typeof PROCEDIMIENTOS)[number]
  const columnas: DataTableColumn<Fila>[] = [
    { key: 'codigo', header: 'Code', width: 64, locked: true, cell: (p) => <span className="font-semibold text-ink">{p.code}</span> },
    { key: 'procedimiento', header: 'Procedure', cell: (p) => <TextCell>{p.label}</TextCell> },
    { key: 'categoria', header: 'Category', width: 170, cell: (p) => <TextCell>{p.group}</TextCell> },
    ...(base ? [{ key: 'ucr', header: 'UCR fee', width: 100, align: 'right' as const, cell: (p: Fila) => (base.precios[p.code] === undefined ? <span className="text-ink-faint">—</span> : <AmountCell value={base.precios[p.code]} />) }] : []),
    {
      key: 'precio', header: 'Fee', width: 120, align: 'right', locked: true,
      cell: (p) => <EditableAmount value={arancel.precios[p.code]} label={\`\${p.code} fee\`} onChange={(v) => onCambiar(p.code, v)} />,
    },
    ...(base ? [{
      key: 'diferencia', header: 'vs UCR', width: 80, align: 'right' as const,
      cell: (p: Fila) => {
        const a = arancel.precios[p.code]
        const b = base.precios[p.code]
        return <span className="text-ink-muted tabular-nums">{a === undefined || !b ? '—' : porcentajeTexto((a - b) / b * 100)}</span>
      },
    }] : []),
  ]
  return (
    <DataTable
      columns={columnas}
      rows={PROCEDIMIENTOS}
      rowKey={(p) => p.code}
      rowLabel={(p) => \`\${p.code} \${p.label}\`}
      itemLabel="procedures"
      search={{ placeholder: 'Search code or procedure', match: (p, q) => \`\${p.code} \${p.label}\`.toLowerCase().includes(q.toLowerCase()) }}
      filter={{ label: 'Category', options: grupos, match: (p, sel) => sel.includes(p.group) }}
      columnPicker
    />
  )
}

const TABS = ['Fees', 'Plans'] as const
type Tab = (typeof TABS)[number]

export function SettingsFeeScheduleDetail() {
  const { feeId } = useParams()
  const navigate = useNavigate()
  const { aranceles, planes, guardar } = useFinanzas()
  const acciones = useAccionesArancel()
  const [tab, setTab] = useState<Tab>('Fees')
  const [drawer, setDrawer] = useState<'editar' | 'ajustar' | null>(null)
  const a = aranceles.find((x) => x.id === feeId)
  if (!a) return <Navigate to={LISTA} replace />

  const ucr = ucrDe(aranceles)
  const susPlanes = planes.filter((p) => p.arancelId === a.id)
  const conPrecio = Object.keys(a.precios).length
  const diferencia = diferenciaPromedio(a, ucr)

  const cambiarPrecio = (codigo: string, valor: number | undefined) => {
    const precios = { ...a.precios }
    if (valor === undefined) delete precios[codigo]
    else precios[codigo] = valor
    guardar('aranceles', { ...a, precios })
    aviso.ok(valor === undefined ? \`\${codigo} no longer has a fee.\` : \`\${codigo} fee updated.\`)
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo={a.nombre}
        etiquetas={<>{a.porDefecto && <Pill tone="info">Default</Pill>}<Pill tone={TONO_ESTADO[a.estado]}>{a.estado}</Pill></>}
        bajada={[a.tipo, \`Effective \${a.vigencia}\`, a.descripcion].filter(Boolean).join(' · ')}
        accion={(
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => setDrawer('editar')}><Pencil /> Edit details</Button>
            <Button onClick={() => setDrawer('ajustar')} disabled={conPrecio === 0}><Percent /> Adjust fees</Button>
            <RowActionsMenu label={a.nombre} className={BOTON_ICONO}>
              <MenuArancel a={a} acciones={acciones} alBorrar={() => navigate(LISTA)} />
            </RowActionsMenu>
          </div>
        )}
      />

      <div className="mt-5">
        <StatStripApilada stats={[
          { label: 'Procedures priced', value: String(conPrecio), nota: \`of \${PROCEDIMIENTOS.length} in the catalog\`, icon: ListChecks },
          { label: 'Average vs UCR', value: porcentajeTexto(diferencia), nota: diferencia === null ? 'This is the base schedule' : \`Compared with \${ucr?.nombre}\`, icon: Scale },
          { label: 'Plans', value: String(susPlanes.length), nota: susPlanes.length ? 'use these fees' : 'Not used by any plan', icon: ShieldCheck },
          { label: 'Effective', value: a.vigencia, nota: a.estado === 'Active' ? 'Active' : 'Inactive', icon: CalendarDays },
        ]} />
      </div>

      <Tabs
        className="mt-5"
        aria-label="Fee schedule sections"
        tabs={[{ value: 'Fees', count: conPrecio }, { value: 'Plans', count: susPlanes.length }]}
        value={tab}
        onChange={setTab}
      />

      <div className="mt-4">
        {tab === 'Fees' && <FeesTable arancel={a} ucr={ucr} onCambiar={cambiarPrecio} />}
        {tab === 'Plans' && (
          <PlansTable
            planes={susPlanes}
            ocultar={['feeSchedule']}
            vacio={{ title: 'No plans use this fee schedule', detail: 'Choose it in a plan, from the carrier’s detail.' }}
          />
        )}
      </div>

      {drawer === 'editar' && (
        <FeeScheduleDrawer inicial={a} onClose={() => setDrawer(null)} onGuardar={(x) => { guardar('aranceles', x); aviso.ok(\`\${x.nombre} was updated.\`) }} />
      )}
      {drawer === 'ajustar' && (
        <AdjustFeesDrawer
          arancel={a}
          onClose={() => setDrawer(null)}
          onGuardar={(precios, n) => { guardar('aranceles', { ...a, precios }); aviso.ok(\`\${cantidad(n, 'fee')} updated.\`) }}
        />
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};