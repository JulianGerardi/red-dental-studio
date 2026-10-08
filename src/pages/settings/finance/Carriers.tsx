import { useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Landmark, ListChecks, Plus, Power, Receipt, ShieldCheck, Trash2, Users } from 'lucide-react'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { Card } from '@/components/settings/primitives'
import { SelectField, TextField, FormFooter } from '@/components/patients/form'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { aviso } from '@/components/ui/toaster'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DataTable, PersonCell, type DataTableColumn } from '@/components/ui/data-table'
import { StatStripApilada } from '@/components/dashboard/StatStrip'
import { PlansTable } from '@/components/finance/PlansTable'
import { PlanDrawer } from '@/components/finance/PlanDrawer'
import { CarrierDrawer } from '@/components/finance/CarrierDrawer'
import { BOTON_ICONO } from '@/lib/estilos'
import { useFinanzas } from '@/data/finanzasStore'
import { ESTADOS } from '@/data/location-options'
import { RECLAMOS, TONO_ESTADO, cantidad, type Aseguradora, type Estado, type PlanSeguro } from '@/data/finanzas'

/* Settings → Billing → Carriers: las aseguradoras y, en el detalle de cada una, sus planes (cada plan con su fee schedule
   y su coverage table) y sus datos. Ver design-reference/figma/modulos/settings-billing.md. */

const LISTA = '/settings/finance/carriers'
const FILTROS = ['All', 'Active', 'Inactive'] as const

const iniciales = (nombre: string) => nombre.split(/\s+/).filter((p) => /^[A-Za-z]/.test(p)).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

/* Las acciones de un carrier y de sus planes, iguales en la lista y en el detalle. */
export function useAccionesCarrier() {
  const { planes, guardar, borrar } = useFinanzas()
  return {
    planesDe: (c: Aseguradora) => planes.filter((p) => p.aseguradoraId === c.id),
    alternar: (c: Aseguradora) => {
      const estado: Estado = c.estado === 'Active' ? 'Inactive' : 'Active'
      guardar('aseguradoras', { ...c, estado })
      aviso.ok(`${c.nombre} is now ${estado.toLowerCase()}.`)
    },
    /* Un carrier con planes no se borra: se desactiva. */
    quitar: (c: Aseguradora, alBorrar?: () => void) => {
      const n = planes.filter((p) => p.aseguradoraId === c.id).length
      if (n) return aviso.error(`${c.nombre} has ${cantidad(n, 'plan')}. Delete them or deactivate the carrier instead.`)
      const deshacer = borrar('aseguradoras', c.id)
      alBorrar?.()
      aviso.ok(`${c.nombre} was deleted.`, { label: 'Undo', onClick: deshacer })
    },
    /* Un plan con pacientes suscriptos no se borra: se desactiva. */
    quitarPlan: (p: PlanSeguro) => {
      if (p.suscriptores) return aviso.error(`${cantidad(p.suscriptores, 'patient is', 'patients are')} subscribed to ${p.nombre}. Set it to Inactive instead.`)
      const deshacer = borrar('planes', p.id)
      aviso.ok(`${p.nombre} was deleted.`, { label: 'Undo', onClick: deshacer })
    },
  }
}

export function SettingsCarriers({ nuevo = false }: { nuevo?: boolean }) {
  const navigate = useNavigate()
  const { aseguradoras, guardar } = useFinanzas()
  const acciones = useAccionesCarrier()
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('All')
  const [creando, setCreando] = useState(nuevo)
  const [planPara, setPlanPara] = useState<Aseguradora | null>(null)
  const cerrar = () => { setCreando(false); if (nuevo) navigate(LISTA, { replace: true }) }

  const filas = useMemo(
    () => aseguradoras.filter((c) => (filtro === 'All' || c.estado === filtro) && `${c.nombre} ${c.payerId}`.toLowerCase().includes(q.trim().toLowerCase())),
    [aseguradoras, q, filtro],
  )

  const columnas: DataTableColumn<Aseguradora>[] = [
    { key: 'nombre', header: 'Carrier', locked: true, cell: (c) => <PersonCell name={c.nombre} initials={iniciales(c.nombre)} to={`${LISTA}/${c.id}`} tone="soft" /> },
    { key: 'payer', header: 'Payer ID', width: 90, cell: (c) => <span className="tabular-nums">{c.payerId}</span> },
    { key: 'telefono', header: 'Phone', width: 130, cell: (c) => <span className="tabular-nums">{c.telefono}</span> },
    { key: 'reclamos', header: 'Claims', width: 90, cell: (c) => c.reclamos },
    { key: 'planes', header: 'Plans', width: 70, align: 'right', cell: (c) => <span className="tabular-nums">{acciones.planesDe(c).length}</span> },
    { key: 'suscriptores', header: 'Subscribers', width: 100, align: 'right', cell: (c) => <span className="tabular-nums">{acciones.planesDe(c).reduce((s, p) => s + p.suscriptores, 0)}</span> },
    { key: 'estado', header: 'Status', width: 90, cell: (c) => <Pill tone={TONO_ESTADO[c.estado]}>{c.estado}</Pill> },
  ]

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Carriers"
        bajada="The insurance companies you bill. Each carrier groups the plans your patients have."
        accion={<Button onClick={() => setCreando(true)}><Plus /> New carrier</Button>}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search carriers or payer ID" />
        <FilterMenu
          label="Filter by status"
          groups={[{
            type: 'single', title: 'Status', defaultValue: 'All', value: filtro, onChange: (v) => setFiltro(v as typeof filtro),
            options: FILTROS.map((f) => ({ value: f, count: f === 'All' ? aseguradoras.length : aseguradoras.filter((c) => c.estado === f).length, tone: f === 'All' ? undefined : TONO_ESTADO[f] })),
          }]}
        />
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={columnas}
          rows={filas}
          rowKey={(c) => c.id}
          rowLabel={(c) => c.nombre}
          itemLabel="carriers"
          empty={{ icon: Landmark, title: 'No carriers yet', detail: 'Add the insurance companies you send claims to.' }}
          rowActions={(c) => (
            <>
              <DropdownMenuItem onSelect={() => navigate(`${LISTA}/${c.id}`)}><ShieldCheck className="size-4 shrink-0" /> View plans</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPlanPara(c)} disabled={c.estado === 'Inactive'}><Plus className="size-4 shrink-0" /> New plan</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => acciones.alternar(c)}><Power className="size-4 shrink-0" /> {c.estado === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={() => acciones.quitar(c)}><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
            </>
          )}
        />
      </div>

      {creando && (
        <CarrierDrawer
          onClose={cerrar}
          onGuardar={(c) => {
            guardar('aseguradoras', c)
            aviso.ok(`${c.nombre} was added. Add its plans next.`, { label: 'Add plans', onClick: () => navigate(`${LISTA}/${c.id}`, { state: { nuevoPlan: true } }) })
          }}
        />
      )}
      {planPara && (
        <PlanDrawer
          aseguradoraId={planPara.id}
          onClose={() => setPlanPara(null)}
          onGuardar={(p) => { guardar('planes', p); aviso.ok(`${p.nombre} was added to ${planPara.nombre}.`) }}
        />
      )}
    </div>
  )
}

/* La pestaña Information: los datos del carrier, editables como la ficha de una locación. */
export function CarrierInformation({ carrier, onGuardar }: { carrier: Aseguradora; onGuardar: (c: Aseguradora) => void }) {
  const [d, setD] = useState(carrier)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof Aseguradora) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const falta = (k: keyof Aseguradora) => (intentado && !String(d[k]).trim() ? 'This field is required.' : undefined)
  const obligatorios: (keyof Aseguradora)[] = ['nombre', 'payerId', 'reclamos', 'telefono', 'linea1', 'ciudad', 'estadoUs', 'zip']

  const guardar = () => {
    if (obligatorios.some((k) => !String(d[k]).trim())) { setIntentado(true); return }
    setIntentado(false)
    onGuardar({ ...d, nombre: d.nombre.trim(), payerId: d.payerId.trim().toUpperCase() })
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="General Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Carrier Name" required value={d.nombre} onChange={set('nombre')} error={falta('nombre')} />
          <TextField label="Payer ID" required value={d.payerId} onChange={set('payerId')} error={falta('payerId')} hint="The ID used to send electronic claims." />
          <SelectField label="Claims Submission" required options={[...RECLAMOS]} value={d.reclamos} onChange={set('reclamos')} error={falta('reclamos')} />
        </div>
      </Card>
      <Card title="Contact Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Phone" required placeholder="(800) 000-0000" value={d.telefono} onChange={set('telefono')} error={falta('telefono')} />
          <TextField label="Fax" placeholder="(800) 000-0000" value={d.fax} onChange={set('fax')} />
          <TextField label="Email" placeholder="claims@carrier.com" value={d.email} onChange={set('email')} />
          <TextField label="Website" placeholder="carrier.com" value={d.sitio} onChange={set('sitio')} />
        </div>
      </Card>
      <Card title="Claims Address">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Address Line 1" required placeholder="Street or PO Box" value={d.linea1} onChange={set('linea1')} error={falta('linea1')} />
          <TextField label="Address Line 2" placeholder="Additional info" value={d.linea2} onChange={set('linea2')} />
          <TextField label="City" required value={d.ciudad} onChange={set('ciudad')} error={falta('ciudad')} />
          <SelectField label="State" required options={ESTADOS} value={d.estadoUs} onChange={set('estadoUs')} error={falta('estadoUs')} />
          <TextField label="ZIP Code" required value={d.zip} onChange={set('zip')} error={falta('zip')} />
        </div>
      </Card>
      <div className="flex justify-end">
        <FormFooter onCancel={() => { setD(carrier); setIntentado(false); aviso.info('Changes discarded.') }} onSave={guardar} />
      </div>
    </div>
  )
}

const TABS = ['Plans', 'Information'] as const
type Tab = (typeof TABS)[number]

export function SettingsCarrierDetail() {
  const { carrierId } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { aseguradoras, aranceles, coberturas, guardar } = useFinanzas()
  const acciones = useAccionesCarrier()
  const [tab, setTab] = useState<Tab>('Plans')
  /* "Add plans" desde el aviso de alta llega con el drawer de New Plan abierto. */
  const [plan, setPlan] = useState<'nuevo' | PlanSeguro | null>((state as { nuevoPlan?: boolean } | null)?.nuevoPlan ? 'nuevo' : null)
  const c = aseguradoras.find((x) => x.id === carrierId)
  if (!c) return <Navigate to={LISTA} replace />

  const susPlanes = acciones.planesDe(c)
  const distintos = (k: 'arancelId' | 'coberturaId') => new Set(susPlanes.map((p) => p[k])).size
  const nombres = (ids: string[], lista: { id: string; nombre: string }[]) => ids.map((id) => lista.find((x) => x.id === id)?.nombre).filter(Boolean).join(', ')

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo={c.nombre}
        etiquetas={<Pill tone={TONO_ESTADO[c.estado]}>{c.estado}</Pill>}
        bajada={[`Payer ID ${c.payerId}`, `${c.reclamos} claims`, c.telefono].filter(Boolean).join(' · ')}
        accion={(
          <div className="flex items-center gap-2">
            <Button onClick={() => setPlan('nuevo')} disabled={c.estado === 'Inactive'}><Plus /> New plan</Button>
            <RowActionsMenu label={c.nombre} className={BOTON_ICONO}>
              <DropdownMenuItem onSelect={() => acciones.alternar(c)}><Power className="size-4 shrink-0" /> {c.estado === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={() => acciones.quitar(c, () => navigate(LISTA))}><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
            </RowActionsMenu>
          </div>
        )}
      />

      <div className="mt-5">
        <StatStripApilada stats={[
          { label: 'Plans', value: String(susPlanes.filter((p) => p.estado === 'Active').length), nota: `${susPlanes.length} in total`, icon: ShieldCheck },
          { label: 'Subscribers', value: String(susPlanes.reduce((s, p) => s + p.suscriptores, 0)), nota: 'patients on these plans', icon: Users },
          { label: 'Fee schedules', value: String(distintos('arancelId')), nota: nombres([...new Set(susPlanes.map((p) => p.arancelId))], aranceles) || 'None yet', icon: Receipt },
          { label: 'Coverage tables', value: String(distintos('coberturaId')), nota: nombres([...new Set(susPlanes.map((p) => p.coberturaId))], coberturas) || 'None yet', icon: ListChecks },
        ]} />
      </div>

      <Tabs className="mt-5" aria-label="Carrier sections" tabs={[{ value: 'Plans', count: susPlanes.length }, 'Information']} value={tab} onChange={setTab} />

      <div className="mt-4">
        {tab === 'Plans' && (
          <PlansTable
            planes={susPlanes}
            ocultar={['carrier']}
            onEditar={(p) => setPlan(p)}
            onBorrar={acciones.quitarPlan}
            vacio={{ title: 'No plans yet', detail: c.estado === 'Active' ? 'Add the plans your patients have with this carrier.' : 'Activate the carrier to add plans.' }}
          />
        )}
        {tab === 'Information' && (
          <CarrierInformation key={c.id} carrier={c} onGuardar={(x) => { guardar('aseguradoras', x); aviso.ok(`${x.nombre} was updated.`) }} />
        )}
      </div>

      {plan && (
        <PlanDrawer
          inicial={plan === 'nuevo' ? undefined : plan}
          aseguradoraId={c.id}
          onClose={() => { setPlan(null); if (state) navigate('.', { replace: true, state: null }) }}
          onGuardar={(p) => { guardar('planes', p); aviso.ok(plan === 'nuevo' ? `${p.nombre} was added to ${c.nombre}.` : `${p.nombre} was updated.`) }}
        />
      )}
    </div>
  )
}
