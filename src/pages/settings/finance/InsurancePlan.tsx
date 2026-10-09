import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Copy, FileSearch, Filter, Plus, Search, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Card } from '@/components/settings/primitives'
import { SearchField, SelectField, control } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EmptyState } from '@/components/ui/empty-state'
import { Pill } from '@/components/ui/pill'
import { Switch } from '@/components/ui/switch'
import { Tabs } from '@/components/ui/tabs'
import { aviso } from '@/components/ui/toaster'
import { MoneyInput } from '@/components/finance/fields'
import { RangesTable, rangoCompleto, rangoVacio } from '@/components/finance/RangesTable'
import { CopyFromDrawer } from '@/components/finance/CopyFromDrawer'
import {
  PlanAddressFields, PlanConfigurationFields, PlanContactFields, PlanGeneralFields, formDePlan, obligatoriosPlan, planDeForm,
} from '@/components/finance/PlanFields'
import { useFormPasos } from '@/lib/useFormPasos'
import { ICONO_SUELTO, TABLA_ENCABEZADO, TABLA_FILA, TABLA_MARCO, TARJETA_INTERNA } from '@/lib/estilos'
import { LOCACIONES } from '@/pages/settings/Locations'
import { rutaPlanes } from '@/pages/settings/finance/Carriers'
import { useFinanzas } from '@/data/finanzasStore'
import {
  CLASES_DEDUCIBLE, FUENTES_PAGO, METODOS_COB, OPCIONES_PROCEDIMIENTO, PROCEDIMIENTOS, TIPOS_COBERTURA, TONO_ESTADO,
  codigoDeOpcion, descripcionDe, type Arancel, type Montos, type PlanSeguro, type TipoCobertura,
} from '@/data/finanzas'

/* Edit Insurance Plan (red.dev): la ficha del plan con siete pestañas, cada una con su Cancel y Save. La pestaña va en
   ?section=, como en red.dev. Cambiar de pestaña con cambios sin guardar pide confirmación. Ver settings-billing.md. */

export const SECCIONES_PLAN = [
  { nombre: 'Information', clave: '' },
  { nombre: 'Coverage Table', clave: 'coverage-table' },
  { nombre: 'Predeterminations', clave: 'predeterminations' },
  { nombre: 'Payment Table', clave: 'payment-table' },
  { nombre: 'Deductibles And Benefits', clave: 'deductibles-and-benefits' },
  { nombre: 'Coordination Of Benefits', clave: 'coordination-of-benefits' },
  { nombre: 'Fee Schedule By Location', clave: 'fee-schedule-by-location' },
] as const

type PropsSeccion = { plan: PlanSeguro; onGuardar: (p: PlanSeguro) => void; onSucio?: (sucio: boolean) => void }

/* Copia local de una parte del plan: avisa si cambió y vuelve a cero al guardar. */
function useBorrador<T>(inicial: T, onSucio?: (sucio: boolean) => void) {
  const [base, setBase] = useState(inicial)
  const [d, setD] = useState(inicial)
  const cambiado = JSON.stringify(d) !== JSON.stringify(base)
  useEffect(() => { onSucio?.(cambiado) }, [cambiado, onSucio])
  return { d, setD, cambiado, guardado: () => setBase(d) }
}

/* Cancel vuelve a la lista de planes; Save, recién con un cambio. */
function pie(cambiado: boolean, onCancelar: () => void, onGuardar: () => void) {
  return (
    <div className="mt-4 flex justify-between gap-3">
      <Button variant="secondary" onClick={onCancelar}>Cancel</Button>
      <Button disabled={!cambiado} onClick={onGuardar}>Save</Button>
    </div>
  )
}

const avisoIncompleto = <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding</Alert>

export function PlanDetail({ plan, onGuardar, onSucio }: PropsSeccion) {
  const navigate = useNavigate()
  const { aranceles } = useFinanzas()
  const [codigo, setCodigo] = useState(plan.telefono.codigo)
  const inicial = formDePlan(plan, aranceles)
  const { d, set, falta, listo } = useFormPasos(inicial, [obligatoriosPlan(codigo).flat()])
  const [intentado, setIntentado] = useState(false)
  const [base, setBase] = useState({ ...inicial, codigo: plan.telefono.codigo })
  const cambiado = JSON.stringify({ ...d, codigo }) !== JSON.stringify(base)
  useEffect(() => { onSucio?.(cambiado) }, [cambiado, onSucio])

  const guardar = () => {
    if (!listo()) { setIntentado(true); return }
    setIntentado(false)
    setBase({ ...d, codigo })
    onGuardar(planDeForm(d, codigo, plan, aranceles))
  }
  const props = { d, set, falta }
  return (
    <div className="flex flex-col gap-4">
      {intentado && avisoIncompleto}
      <Card title="General description"><PlanGeneralFields {...props} /></Card>
      <Card title="Contact Information"><PlanContactFields {...props} codigo={codigo} onCodigo={setCodigo} /></Card>
      <Card title="Address Information"><PlanAddressFields {...props} /></Card>
      <Card title="Configurations"><PlanConfigurationFields {...props} aranceles={aranceles} /></Card>
      {pie(cambiado, () => navigate(rutaPlanes(plan.aseguradoraId)), guardar)}
    </div>
  )
}

export function PlanCoverage({ plan, onGuardar, onSucio }: PropsSeccion) {
  const navigate = useNavigate()
  const { d, setD, cambiado, guardado } = useBorrador(plan.cobertura, onSucio)
  const [intentado, setIntentado] = useState(false)
  const [copiando, setCopiando] = useState(false)
  const [nuevo, setNuevo] = useState<string>()
  const agregarRango = () => {
    const r = rangoVacio()
    setD({ ...d, rangos: [...d.rangos, r] })
    setNuevo(r.id)
    aviso.info('A new range was added at the end. Complete it and Save.')
  }

  const guardar = () => {
    if (!d.rangos.every(rangoCompleto)) { setIntentado(true); return }
    setIntentado(false)
    guardado()
    onGuardar({ ...plan, cobertura: d })
  }
  return (
    <>
      {intentado && <div className="mb-4">{avisoIncompleto}</div>}
      <Card title="Coverage Table">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SelectField label="Type" options={[...TIPOS_COBERTURA]} value={d.tipo} onChange={(v) => setD({ ...d, tipo: v as TipoCobertura })} className="w-full sm:w-[220px]" />
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setCopiando(true)}><Copy /> Copy from</Button>
              <Button onClick={agregarRango}><Plus /> Add Range</Button>
            </div>
          </div>
          <RangesTable tipo={d.tipo} rangos={d.rangos} onChange={(rangos) => setD({ ...d, rangos })} intentado={intentado} nuevo={nuevo} />
        </div>
      </Card>
      {pie(cambiado, () => navigate(rutaPlanes(plan.aseguradoraId)), guardar)}
      {copiando && (
        <CopyFromDrawer
          planId={plan.id}
          onClose={() => setCopiando(false)}
          onCopiar={(o) => { setD({ tipo: o.tipo, rangos: o.rangos }); aviso.info(`Copied from ${o.nombre}. Save to keep it.`) }}
        />
      )}
    </>
  )
}

/* El buscador de una lista de códigos, como los de red.dev ("Search for CDT Code o Description"). */
function buscador(q: string, setQ: (v: string) => void, placeholder: string, Icono = Search) {
  return (
    <span className="relative block w-full sm:max-w-[320px]">
      <Icono className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
      <input aria-label={placeholder} value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} className={cn(control(), 'h-9 pr-3 pl-9')} />
    </span>
  )
}
const coincide = (codigo: string, q: string) => `${codigo} ${descripcionDe(codigo)}`.toLowerCase().includes(q.trim().toLowerCase())

export function PlanPredeterminations({ plan, onGuardar, onSucio }: PropsSeccion) {
  const navigate = useNavigate()
  const { d, setD, cambiado, guardado } = useBorrador(plan.predeterminaciones, onSucio)
  const [q, setQ] = useState('')
  const filas = PROCEDIMIENTOS.filter((p) => coincide(p.code, q))
  return (
    <>
      <Card title="Predetermination">
        <div className="flex flex-col gap-4">
          <p className="text-[13px] text-ink-muted">By selecting procedures from this list, you will be warned to generate a predetermination claim and submit it to the payer while planning the patient's treatment in the Treatment Planner.</p>
          {buscador(q, setQ, 'Search for CDT Code o Description..')}
          <div role="table" aria-label="Predeterminations" className={cn(TABLA_MARCO, 'max-h-[480px] overflow-y-auto')}>
            <div role="row" className={cn('sticky top-0 z-10 grid grid-cols-[90px_80px_1fr] gap-3', TABLA_ENCABEZADO)}>
              <span role="columnheader">Requierd</span><span role="columnheader">Code</span><span role="columnheader">Description</span>
            </div>
            {filas.map((p) => (
              <div key={p.code} role="row" className={cn('grid grid-cols-[90px_80px_1fr] gap-3', TABLA_FILA)}>
                <span role="cell">
                  <Switch
                    aria-label={`${p.code} requires predetermination`} checked={d.includes(p.code)}
                    onCheckedChange={(on) => setD(on ? [...d, p.code] : d.filter((c) => c !== p.code))}
                  />
                </span>
                <span role="cell" className="tabular-nums">{p.code}</span>
                <span role="cell">{p.label}</span>
              </div>
            ))}
            {filas.length === 0 && <p className="py-6 text-center text-ink-muted">No procedures match “{q}”.</p>}
          </div>
        </div>
      </Card>
      {pie(cambiado, () => navigate(rutaPlanes(plan.aseguradoraId)), () => { guardado(); onGuardar({ ...plan, predeterminaciones: d }) })}
    </>
  )
}

export function PlanPaymentTable({ plan, onGuardar, onSucio }: PropsSeccion) {
  const navigate = useNavigate()
  const { d, setD, cambiado, guardado } = useBorrador(plan.tablaPagos, onSucio)
  const [agregar, setAgregar] = useState('')
  const [q, setQ] = useState('')
  const filas = d.filter((f) => coincide(f.codigo, q))
  const elegir = (v: string) => {
    setAgregar(v)
    const codigo = codigoDeOpcion(v)
    if (!OPCIONES_PROCEDIMIENTO.includes(v)) return
    if (!d.some((f) => f.codigo === codigo)) setD([...d, { codigo, valor: 0 }])
    setAgregar('')
  }
  return (
    <>
      <Card title="Payment Table">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SearchField label="Add Procedure" placeholder="Search for CDT Code o Description" options={OPCIONES_PROCEDIMIENTO.filter((o) => !d.some((f) => f.codigo === codigoDeOpcion(o)))} value={agregar} onChange={elegir} className="w-full sm:max-w-[320px]" />
            <label className="flex w-full flex-col gap-2 sm:w-auto">
              <span className="text-xs font-medium text-ink">Filter procedures</span>
              {buscador(q, setQ, 'Filter for CDT Code o Description', Filter)}
            </label>
          </div>
          <div role="table" aria-label="Payment table" className={TABLA_MARCO}>
            <div role="row" className={cn('grid grid-cols-[80px_1fr_130px_32px] gap-3', TABLA_ENCABEZADO)}>
              <span role="columnheader">Code</span><span role="columnheader">Description</span><span role="columnheader" className="text-right">Value</span><span role="columnheader"><span className="sr-only">Actions</span></span>
            </div>
            {filas.length === 0 ? (
              <EmptyState icon={FileSearch} title="No procedures found" detail={d.length ? `No procedures match “${q}”.` : 'Add a new procedure to the payment table'} className="py-10" />
            ) : filas.map((f) => (
              <div key={f.codigo} role="row" className={cn('grid grid-cols-[80px_1fr_130px_32px] gap-3', TABLA_FILA)}>
                <span role="cell" className="tabular-nums">{f.codigo}</span>
                <span role="cell">{descripcionDe(f.codigo)}</span>
                <span role="cell"><MoneyInput label={`${f.codigo} value`} value={f.valor} onChange={(v) => setD(d.map((x) => (x.codigo === f.codigo ? { ...x, valor: v ?? 0 } : x)))} /></span>
                <span role="cell" className="flex justify-end">
                  <button type="button" aria-label={`Remove ${f.codigo}`} onClick={() => setD(d.filter((x) => x.codigo !== f.codigo))} className={cn(ICONO_SUELTO, 'text-dash-bad-fg')}><Trash2 className="size-4" /></button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      {pie(cambiado, () => navigate(rutaPlanes(plan.aseguradoraId)), () => { guardado(); onGuardar({ ...plan, tablaPagos: d }) })}
    </>
  )
}

/* Una fila de montos: Annual Individual, Annual Family y Lifetime. */
function filaMontos(nombre: string, montos: Montos, columnas: readonly string[], onChange: (m: Montos) => void) {
  return (
    <div key={nombre} role="row" className={cn('grid grid-cols-[90px_repeat(3,minmax(0,1fr))] gap-3', TABLA_FILA)}>
      <span role="rowheader">{nombre}</span>
      {montos.map((m, i) => (
        <span key={columnas[i]} role="cell">
          <MoneyInput label={`${nombre} ${columnas[i]}`} placeholder="0.00" value={m || null} onChange={(v) => onChange(montos.map((x, j) => (j === i ? v ?? 0 : x)) as Montos)} className="h-9 text-left" />
        </span>
      ))}
    </div>
  )
}

export function PlanDeductibles({ plan, onGuardar, onSucio }: PropsSeccion) {
  const navigate = useNavigate()
  const { d, setD, cambiado, guardado } = useBorrador({ deducibles: plan.deducibles, beneficios: plan.beneficios }, onSucio)
  const DEDUCIBLES = ['Annual Individual', 'Annual Family', 'Lifetime Individual'] as const
  const BENEFICIOS = ['Annual Individual', 'Annual Family', 'Lifetime Ortho'] as const
  const encabezado = (cols: readonly string[]) => (
    <div role="row" className={cn('grid grid-cols-[90px_repeat(3,minmax(0,1fr))] gap-3', TABLA_ENCABEZADO)}>
      <span role="columnheader"><span className="sr-only">Type</span></span>
      {cols.map((c) => <span key={c} role="columnheader">{c}</span>)}
    </div>
  )
  return (
    <>
      <Card title="Deductibles and Benefits">
        <div className="flex flex-col gap-4 overflow-x-auto">
          <section className={cn(TARJETA_INTERNA, 'flex min-w-[520px] flex-col gap-3 p-4')}>
            <h3 className="text-[13px] font-semibold text-ink">Deductibles</h3>
            <div role="table" aria-label="Deductibles" className={TABLA_MARCO}>
              {encabezado(DEDUCIBLES)}
              {CLASES_DEDUCIBLE.map((k) => filaMontos(k, d.deducibles[k], DEDUCIBLES, (m) => setD({ ...d, deducibles: { ...d.deducibles, [k]: m } })))}
            </div>
          </section>
          <section className={cn(TARJETA_INTERNA, 'flex min-w-[520px] flex-col gap-3 p-4')}>
            <h3 className="text-[13px] font-semibold text-ink">Benefits</h3>
            <div role="table" aria-label="Benefits" className={TABLA_MARCO}>
              {encabezado(BENEFICIOS)}
              {filaMontos('Maximum', d.beneficios, BENEFICIOS, (m) => setD({ ...d, beneficios: m }))}
            </div>
          </section>
        </div>
      </Card>
      {pie(cambiado, () => navigate(rutaPlanes(plan.aseguradoraId)), () => { guardado(); onGuardar({ ...plan, ...d }) })}
    </>
  )
}

export function PlanCoordination({ plan, onGuardar, onSucio }: PropsSeccion) {
  const navigate = useNavigate()
  const { d, setD, cambiado, guardado } = useBorrador(plan.coordinacion, onSucio)
  return (
    <>
      <Card title="Coordination of Benefits">
        <div className="flex flex-col gap-4">
          <p className="text-[13px] text-ink-muted">Choose the method for coordinating benefits between the primary and secondary insurance when this plan is used as the patient's secondary coverage.</p>
          <div role="table" aria-label="Coordination of benefits" className={TABLA_MARCO}>
            <div role="row" className={cn('grid grid-cols-[1fr_minmax(0,240px)] gap-4', TABLA_ENCABEZADO)}>
              <span role="columnheader">Source of Payment for Primary Insurance Plan</span><span role="columnheader">Method for Coordination of Benefits</span>
            </div>
            {FUENTES_PAGO.map((f) => (
              <div key={f} role="row" className={cn('grid grid-cols-[1fr_minmax(0,240px)] gap-4', TABLA_FILA)}>
                <span role="cell">{f}</span>
                <span role="cell"><SelectField hideLabel label={`${f} method`} options={METODOS_COB} value={d[f] ?? 'Traditional'} onChange={(v) => setD({ ...d, [f]: v })} /></span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      {pie(cambiado, () => navigate(rutaPlanes(plan.aseguradoraId)), () => { guardado(); onGuardar({ ...plan, coordinacion: d }) })}
    </>
  )
}

/* "Use the plan default" no está en red.dev: sin esa opción, una locación con fee schedule elegido no se podía vaciar. */
const POR_DEFECTO = 'Use the plan default'

export function PlanFeeByLocation({ plan, onGuardar, onSucio }: PropsSeccion) {
  const navigate = useNavigate()
  const { aranceles } = useFinanzas()
  const { d, setD, cambiado, guardado } = useBorrador(plan.arancelPorLocacion, onSucio)
  const activos = aranceles.filter((a) => a.estado === 'Active')
  const nombre = (id?: string) => aranceles.find((a) => a.id === id)?.nombre ?? ''
  const elegir = (loc: string, v: string) => {
    const { [loc]: _, ...resto } = d
    setD(v === POR_DEFECTO ? resto : { ...resto, [loc]: (activos.find((a: Arancel) => a.nombre === v)?.id ?? '') })
  }
  return (
    <>
      <Card title="Max Allowable Amount Fee Schedule By Location">
        <div className="flex flex-col gap-4">
          <p className="text-[13px] text-ink-muted">Select a fee schedule for a specific location. If none is selected, the default from 'Max Allowable Amount Fee Schedule' will be used.</p>
          <div role="table" aria-label="Fee schedule by location" className={TABLA_MARCO}>
            <div role="row" className={cn('grid grid-cols-[1fr_minmax(0,280px)] gap-4', TABLA_ENCABEZADO)}>
              <span role="columnheader">Location Name</span><span role="columnheader">Max Allowable Amount Fee Schedule by Location</span>
            </div>
            {LOCACIONES.map((l) => (
              <div key={l.id} role="row" className={cn('grid grid-cols-[1fr_minmax(0,280px)] gap-4', TABLA_FILA)}>
                <span role="cell">{l.nombre}</span>
                <span role="cell">
                  <SelectField
                    hideLabel label={`${l.nombre} fee schedule`} placeholder="Select max allowable amount fee schedule"
                    options={[POR_DEFECTO, ...activos.map((a) => a.nombre)]} value={nombre(d[l.id])} onChange={(v) => elegir(l.id, v)}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      {pie(cambiado, () => navigate(rutaPlanes(plan.aseguradoraId)), () => { guardado(); onGuardar({ ...plan, arancelPorLocacion: d }) })}
    </>
  )
}

const PANTALLAS = {
  '': PlanDetail, 'coverage-table': PlanCoverage, predeterminations: PlanPredeterminations, 'payment-table': PlanPaymentTable,
  'deductibles-and-benefits': PlanDeductibles, 'coordination-of-benefits': PlanCoordination, 'fee-schedule-by-location': PlanFeeByLocation,
}

export function SettingsInsurancePlan() {
  const { carrierId = '', planId = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const { planes, aseguradoras, guardar } = useFinanzas()
  const [sucio, setSucio] = useState(false)
  const [pendiente, setPendiente] = useState<string | null>(null)
  const clave = (params.get('section') ?? '') as keyof typeof PANTALLAS
  const seccion = SECCIONES_PLAN.find((s) => s.clave === clave) ?? SECCIONES_PLAN[0]
  const onSucio = useMemo(() => (b: boolean) => setSucio(b), [])

  const p = planes.find((x) => x.id === planId && x.aseguradoraId === carrierId)
  const carrier = aseguradoras.find((a) => a.id === carrierId)
  if (!p || !carrier) return <Navigate to={rutaPlanes(carrierId)} replace />

  const ir = (c: string) => { setSucio(false); setParams(c ? { section: c } : {}, { replace: true }) }
  const Pantalla = PANTALLAS[seccion.clave]

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Edit Insurance Plan"
        etiquetas={<Pill tone={TONO_ESTADO[p.estado]}>{p.estado}</Pill>}
        bajada={`${p.nombre} · ${carrier.nombre} · Group # ${p.grupo}`}
      />
      <Tabs
        className="mt-5" aria-label="Insurance plan sections" value={seccion.nombre}
        tabs={SECCIONES_PLAN.map((s) => s.nombre)}
        onChange={(n) => {
          const c = SECCIONES_PLAN.find((s) => s.nombre === n)?.clave ?? ''
          if (c === seccion.clave) return
          if (sucio) setPendiente(c); else ir(c)
        }}
      />
      <div className="mt-4">
        <Pantalla key={`${p.id}-${seccion.clave}`} plan={p} onSucio={onSucio} onGuardar={(x) => { guardar('planes', x); aviso.ok(`${seccion.nombre} was saved.`) }} />
      </div>

      {pendiente !== null && (
        <ConfirmDialog
          title="Discard your changes?"
          confirmLabel="Discard changes"
          tone="danger"
          onConfirm={() => { ir(pendiente); setPendiente(null) }}
          onCancel={() => setPendiente(null)}
        >
          You changed {seccion.nombre} and didn't save it. Leaving this tab discards those changes.
        </ConfirmDialog>
      )}
    </div>
  )
}

