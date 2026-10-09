import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Hash, Landmark, Pencil, Plus, Power, ShieldCheck, Trash2 } from 'lucide-react'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { Card } from '@/components/settings/primitives'
import { OptionCheckbox, SelectField, TextField } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { aviso } from '@/components/ui/toaster'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DataTable, type DataTableColumn } from '@/components/ui/data-table'
import { CarrierDrawer } from '@/components/finance/CarrierDrawer'
import { PlanDrawer } from '@/components/finance/PlanDrawer'
import { LocationNumberDrawer } from '@/components/finance/LocationNumberDrawer'
import { PhoneFields, UnitField } from '@/components/finance/fields'
import { useFinanzas } from '@/data/finanzasStore'
import { FORMATOS_RECLAMO, TONO_ESTADO, cantidad, esNorteamerica, type Aseguradora, type PlanSeguro } from '@/data/finanzas'
import { TABLA_LINK } from '@/lib/estilos'

/* Settings → Billing → Carriers como en red.dev: la lista, Edit Carrier con las pestañas Carrier e Insurance Plans /
   Employers, y los drawers New Carrier, New Insurance Plan y Location Number. Ver figma/modulos/settings-billing.md. */

export const LISTA_CARRIERS = '/settings/finance/carriers'
export const rutaCarrier = (id: string) => \`\${LISTA_CARRIERS}/\${id}/edit\`
export const rutaPlanes = (id: string) => \`\${rutaCarrier(id)}/insurance-plans\`
export const rutaPlan = (carrierId: string, planId: string, seccion?: string) =>
  \`\${rutaPlanes(carrierId)}/\${planId}/edit\${seccion ? \`?section=\${seccion}\` : ''}\`

/* Borrar con Undo. Los planes de un carrier borrado dejan de verse y vuelven con él. */
function useBorrar() {
  const { borrar } = useFinanzas()
  return {
    carrier: (c: Aseguradora, despues?: () => void) => {
      const deshacer = borrar('aseguradoras', c.id)
      despues?.()
      aviso.ok(\`\${c.nombre} was deleted.\`, { label: 'Undo', onClick: deshacer })
    },
    plan: (p: PlanSeguro) => {
      const deshacer = borrar('planes', p.id)
      aviso.ok(\`\${p.nombre} was deleted.\`, { label: 'Undo', onClick: deshacer })
    },
  }
}

export function SettingsCarriers({ nuevo = false }: { nuevo?: boolean }) {
  const navigate = useNavigate()
  const { aseguradoras, planes, guardar } = useFinanzas()
  const borrar = useBorrar()
  const [q, setQ] = useState('')
  const [creando, setCreando] = useState(nuevo)
  const cerrar = () => { setCreando(false); if (nuevo) navigate(LISTA_CARRIERS, { replace: true }) }

  const filas = useMemo(
    () => aseguradoras.filter((c) => \`\${c.nombre} \${c.payerId}\`.toLowerCase().includes(q.trim().toLowerCase())),
    [aseguradoras, q],
  )
  const planesDe = (c: Aseguradora) => planes.filter((p) => p.aseguradoraId === c.id).length

  const columnas: DataTableColumn<Aseguradora>[] = [
    { key: 'nombre', header: 'Carrier Name', locked: true, cell: (c) => <Link to={rutaCarrier(c.id)} className={TABLA_LINK}>{c.nombre}</Link> },
    { key: 'payer', header: 'Payer ID', width: 140, cell: (c) => <span className="tabular-nums">{c.payerId}</span> },
    { key: 'planes', header: 'Group Plans #', width: 140, cell: (c) => <span className="tabular-nums">{planesDe(c)}</span> },
  ]

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Carriers"
        bajada="Manage insurance carriers and their group plans."
        accion={<Button onClick={() => setCreando(true)}><Plus /> New Carrier</Button>}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search carrier by name or payer ID..." />
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={columnas}
          rows={filas}
          rowKey={(c) => c.id}
          rowLabel={(c) => c.nombre}
          itemLabel="carriers"
          onRowClick={(c) => navigate(rutaCarrier(c.id))}
          empty={q ? { icon: Landmark, title: \`No carriers match “\${q}”.\`, detail: 'Search by carrier name or payer ID.' } : { icon: Landmark, title: 'No carriers yet', detail: 'Add the insurance companies you send claims to.' }}
          rowActions={(c) => (
            <>
              <DropdownMenuItem onSelect={() => navigate(rutaCarrier(c.id))}><Pencil className="size-4 shrink-0" /> Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={() => borrar.carrier(c)}><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
            </>
          )}
        />
      </div>

      {creando && (
        <CarrierDrawer
          onClose={cerrar}
          onGuardar={(c) => {
            guardar('aseguradoras', c)
            aviso.ok(\`\${c.nombre} was added. Add its insurance plans next.\`, { label: 'Add plan', onClick: () => navigate(\`\${rutaPlanes(c.id)}/new\`) })
          }}
        />
      )}
    </div>
  )
}

/* La pestaña Carrier: General Information y Contact Information. Nombre y Payer ID no se editan (red.dev). Save se
   habilita con un cambio; sin lo obligatorio, el aviso de arriba y cada campo en rojo. Cancel vuelve a la lista. */
export function CarrierForm({ carrier, onGuardar }: { carrier: Aseguradora; onGuardar: (c: Aseguradora) => void }) {
  const navigate = useNavigate()
  const [d, setD] = useState(carrier)
  const [intentado, setIntentado] = useState(false)
  const [numeros, setNumeros] = useState(false)
  const set = <K extends keyof Aseguradora>(k: K) => (v: Aseguradora[K]) => setD((p) => ({ ...p, [k]: v }))
  const cambiado = JSON.stringify(d) !== JSON.stringify(carrier)

  const faltan = {
    formato: !d.formato, dias: d.diasResolucion <= 0, email: !d.email.trim(),
    area: esNorteamerica(d.telefono.codigo) && !d.telefono.area, numero: !d.telefono.numero,
  }
  const falta = (k: keyof typeof faltan) => (intentado && faltan[k] ? 'This field is required.' : undefined)
  const guardar = () => {
    if (Object.values(faltan).some(Boolean)) { setIntentado(true); return }
    setIntentado(false)
    onGuardar({ ...d, email: d.email.trim(), sitio: d.sitio.trim() })
  }
  const asignados = Object.keys(d.numerosLocacion).length

  return (
    <div className="flex flex-col gap-4">
      {intentado && (
        <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding</Alert>
      )}
      <Card title="General Information">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Carrier Name" required value={d.nombre} disabled />
            <TextField label="Payer ID" required value={d.payerId} disabled />
            <SelectField label="Printed Claim Format" required placeholder="Select a printed claim format" options={FORMATOS_RECLAMO} value={d.formato} onChange={set('formato')} error={falta('formato')} />
            <UnitField label="Expected Period of Insurance Claim Resolution" required unit="days" value={d.diasResolucion} onChange={set('diasResolucion')} error={falta('dias')} />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <OptionCheckbox label="Do not include Dental Diagnostic Codes" checked={d.sinDiagnosticos} onChange={set('sinDiagnosticos')} />
            <OptionCheckbox label="Do not bill Insurance" checked={d.noFacturar} onChange={set('noFacturar')} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={() => setNumeros(true)}><Hash /> Location Number</Button>
            <span className="text-xs text-ink-muted">{asignados ? \`\${cantidad(asignados, 'location')} with a number\` : 'No location numbers yet'}</span>
          </div>
        </div>
      </Card>
      <Card title="Contact Information">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Email" required placeholder="example@example.com" value={d.email} onChange={set('email')} error={falta('email')} />
            <TextField label="Website" placeholder="Introduce your website link" value={d.sitio} onChange={set('sitio')} />
          </div>
          <PhoneFields required value={d.telefono} onChange={set('telefono')} errores={{ area: falta('area'), numero: falta('numero') }} />
        </div>
      </Card>
      <div className="flex justify-between gap-3">
        <Button variant="secondary" onClick={() => navigate(LISTA_CARRIERS)}>Cancel</Button>
        <Button disabled={!cambiado} onClick={guardar}>Save</Button>
      </div>

      {numeros && (
        <LocationNumberDrawer
          numeros={d.numerosLocacion}
          onClose={() => setNumeros(false)}
          onGuardar={(n) => { onGuardar({ ...carrier, numerosLocacion: n }); setD((p) => ({ ...p, numerosLocacion: n })); aviso.ok('Location numbers were saved.') }}
        />
      )}
    </div>
  )
}

/* La pestaña Insurance Plans / Employers: los planes del carrier. Inactive o Active y Delete con Undo. */
export function CarrierPlans({ carrier }: { carrier: Aseguradora }) {
  const navigate = useNavigate()
  const { planes, guardar } = useFinanzas()
  const borrar = useBorrar()
  const [q, setQ] = useState('')
  const filas = planes.filter((p) => p.aseguradoraId === carrier.id && \`\${p.nombre} \${p.grupo}\`.toLowerCase().includes(q.trim().toLowerCase()))

  const columnas: DataTableColumn<PlanSeguro>[] = [
    { key: 'nombre', header: 'Plan/Employer Name', locked: true, cell: (p) => <Link to={rutaPlan(carrier.id, p.id)} className={TABLA_LINK}>{p.nombre}</Link> },
    { key: 'grupo', header: 'Group #', width: 160, cell: (p) => <span className="tabular-nums">{p.grupo}</span> },
    { key: 'estado', header: 'Status', width: 110, cell: (p) => <Pill tone={TONO_ESTADO[p.estado]}>{p.estado}</Pill> },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2"><SettingsSearch value={q} onChange={setQ} placeholder="Search..." /></div>
      <DataTable
        columns={columnas}
        rows={filas}
        rowKey={(p) => p.id}
        rowLabel={(p) => p.nombre}
        itemLabel="plans"
        onRowClick={(p) => navigate(rutaPlan(carrier.id, p.id))}
        empty={q ? { icon: ShieldCheck, title: \`No plans match “\${q}”.\` } : { icon: ShieldCheck, title: 'No insurance plans yet', detail: 'Add the plans and employer groups your patients have with this carrier.' }}
        rowActions={(p) => (
          <>
            <DropdownMenuItem onSelect={() => navigate(rutaPlan(carrier.id, p.id))}><Pencil className="size-4 shrink-0" /> Edit</DropdownMenuItem>
            <DropdownMenuItem
              variant={p.estado === 'Active' ? 'destructive' : 'default'}
              onSelect={() => {
                const estado = p.estado === 'Active' ? 'Inactive' : 'Active'
                guardar('planes', { ...p, estado })
                aviso.ok(\`\${p.nombre} is now \${estado.toLowerCase()}.\`, { label: 'Undo', onClick: () => guardar('planes', p) })
              }}
            >
              <Power className="size-4 shrink-0" /> {p.estado === 'Active' ? 'Inactive' : 'Active'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => borrar.plan(p)}><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
          </>
        )}
      />
    </div>
  )
}

const TABS = ['Information', 'Insurance Plans / Employers'] as const
type Tab = (typeof TABS)[number]

export function SettingsCarrierEdit({ tab, nuevoPlan = false }: { tab: 'carrier' | 'plans'; nuevoPlan?: boolean }) {
  const { carrierId = '' } = useParams()
  const navigate = useNavigate()
  const { aseguradoras, planes, guardar } = useFinanzas()
  const [plan, setPlan] = useState(nuevoPlan)
  /* Guardar navega a la ficha del plan: cerrar el drawer después no tiene que volver a la lista. */
  const guardado = useRef(false)
  const c = aseguradoras.find((x) => x.id === carrierId)
  if (!c) return <Navigate to={LISTA_CARRIERS} replace />

  const actual: Tab = tab === 'carrier' ? 'Information' : 'Insurance Plans / Employers'
  const cerrarPlan = () => { setPlan(false); if (nuevoPlan && !guardado.current) navigate(rutaPlanes(c.id), { replace: true }) }

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Edit Carrier"
        bajada={\`\${c.nombre} · Payer ID \${c.payerId}\`}
        accion={<Button onClick={() => setPlan(true)}><Plus /> New Insurance Plan</Button>}
      />
      <Tabs
        className="mt-5" aria-label="Carrier sections" value={actual}
        tabs={['Information', { value: 'Insurance Plans / Employers', count: planes.filter((p) => p.aseguradoraId === c.id).length }]}
        onChange={(t) => navigate(t === 'Information' ? rutaCarrier(c.id) : rutaPlanes(c.id))}
      />
      <div className="mt-4">
        {tab === 'carrier'
          ? <CarrierForm key={c.id} carrier={c} onGuardar={(x) => { guardar('aseguradoras', x); aviso.ok(\`\${x.nombre} was updated.\`) }} />
          : <CarrierPlans carrier={c} />}
      </div>

      {plan && (
        <PlanDrawer
          aseguradoraId={c.id}
          onClose={cerrarPlan}
          onGuardar={(p) => {
            guardado.current = true
            guardar('planes', p)
            aviso.ok(\`\${p.nombre} was added. Set up its coverage table next.\`)
            navigate(rutaPlan(c.id, p.id, 'coverage-table'))
          }}
        />
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};