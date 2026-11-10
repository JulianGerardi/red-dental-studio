import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CirclePlus, CreditCard, PersonStanding, ShieldHalf, Hospital, AArrowUp, Eye, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import { Pill, type PillTone } from '@/components/ui/pill'
import { SelectField, DateTextField, TextArea, OptionCheckbox, FormFooter, PersonSearchField } from '@/components/patients/form'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import {
  NewSubscriptionModal, ManageSubscriptionModal, NewDependerModal,
} from '@/components/patients/insurance/modals'
import {
  PLANES, PLANES_HISTORICOS, SUSCRIPCIONES, RELACIONES, ORDENES, ELEGIBILIDAD, etiquetaSuscripcion,
  type PlanPaciente, type RelacionPlan, type Suscripcion,
} from '@/data/insurance'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA, TARJETA_PANEL } from '@/lib/estilos'

/* Figma 3817:865128 "Insurance", frames 3817:865704 y 3831:897436.

   El breadcrumb del frame termina en "Documents" en azul aunque la pantalla
   sea Insurance, y el título dice "Patients Plans". Se replican tal cual —
   ver modulos/insurance.md, anomalías 60 a 66. */

/* Pills con fondo tintado, como el resto del sistema. Muestreados del frame:
   Primary y Self usan el azul, Child el verde, Spouse el neutro, Active el
   verde e Inactive el rojo — los mismos seis tonos de `Pill`. */
const ORDEN_TONO: PillTone = 'info'
const RELACION_TONO: Record<PlanPaciente['relacion'], PillTone> = {
  Child: 'success',
  Self: 'info',
  Spouse: 'neutral',
  Other: 'neutral',
}
const ESTADO_TONO: Record<PlanPaciente['estado'], PillTone> = {
  Active: 'success',
  Inactive: 'danger',
}

/* La tabla estándar (ui/data-table) con las columnas de planes, con los
   anchos de antes. Los períodos pueden ocupar dos líneas: la fila crece. */
const COLUMNAS: DataTableColumn<PlanPaciente>[] = [
  { key: 'order', header: 'Order', width: 92, cell: (p) => <Pill tone={ORDEN_TONO}>{p.orden}</Pill> },
  { key: 'carrier', header: 'Carrier', width: 92, cell: (p) => <TextCell>{p.carrier}</TextCell> },
  { key: 'plan', header: 'Plan', width: 124, cell: (p) => <TextCell>{p.plan}</TextCell> },
  { key: 'subscriber', header: 'Subscriber', width: 128, cell: (p) => <TextCell>{p.subscriber}</TextCell> },
  { key: 'relation', header: 'Relation', width: 92, cell: (p) => <Pill tone={RELACION_TONO[p.relacion]}>{p.relacion}</Pill> },
  { key: 'coverage', header: 'Coverage Period', width: 148, cell: (p) => <span className="leading-tight">{p.cobertura}</span> },
  { key: 'priority', header: 'Priority Period', width: 150, cell: (p) => <span className="flex flex-col gap-0.5 leading-tight">{p.prioridad.map((t) => <span key={t}>{t}</span>)}</span> },
  { key: 'status', header: 'Status', width: 92, cell: (p) => <Pill tone={ESTADO_TONO[p.estado]}>{p.estado}</Pill> },
]

export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex items-center gap-2 text-[13px] text-ink"
    >
      <span className={cn('flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-dash-blue' : 'bg-line-strong')}>
        <span className={cn('size-3 rounded-full bg-white transition-transform', on && 'translate-x-3')} />
      </span>
      {label}
    </button>
  )
}

/* Fila de dato de la card de suscripción: icono, etiqueta chica y valor. */
export function FilaDato({ icon: Icon, label, value, loading }: { icon: typeof ShieldHalf; label: string; value: string; loading?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 shrink-0 text-ink-muted" strokeWidth={1.8} />
      <span className="min-w-0 leading-tight">
        <span className="block text-[11px] text-ink-faint">{label}</span>
        {loading
          ? <span aria-hidden className="mt-1 block h-3 w-24 animate-pulse rounded bg-surface-muted" />
          : <span className="block truncate text-[13px] text-ink">{value}</span>}
      </span>
    </div>
  )
}

/* Coordination Order no se elige: es el primer orden que ningún plan activo del paciente ocupa (red.dev, video del
   2026-11-06). Con los tres ocupados, queda el último. Ver modulos/insurance.md. */
const ordenSiguiente = (planes: PlanPaciente[]) =>
  ORDENES.find((o) => !planes.some((p) => p.estado === 'Active' && p.orden === o)) ?? ORDENES[ORDENES.length - 1]

const VACIO = { relacion: '', inicio: '', fin: '', elegibilidad: '', verificacion: '', notas: '' }
const fechaLarga = (v: string) => v.replace(/ \/ (\d{2})$/, ' / 20$1').replaceAll(' / ', '/')

export default function Insurance() {
  const { id = 'john-smith' } = useParams()
  const [historial, setHistorial] = useState(false)
  const [planes, setPlanes] = useState(PLANES)
  const [modal, setModal] = useState<'nueva' | 'gestionar' | 'dependiente' | 'borrar' | null>(null)
  const [d, setD] = useState(VACIO)
  const [intentado, setIntentado] = useState(false)
  const [beneficios, setBeneficios] = useState(false)
  const [informacion, setInformacion] = useState(false)

  /* Suscripción: se busca por nombre o Subscriber ID; la card muestra la elegida, o guiones si no hay ninguna. */
  const [suscripciones, setSuscripciones] = useState(SUSCRIPCIONES)
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(false)
  const porEtiqueta = (v: string) => suscripciones.find((s) => etiquetaSuscripcion(s) === v)
  const elegida = porEtiqueta(busqueda)
  const buscar = (v: string) => {
    setBusqueda(v)
    /* Al elegir, un instante de carga mientras llegan carrier, plan y dependientes, como red.dev. */
    if (suscripciones.some((s) => etiquetaSuscripcion(s) === v)) {
      setCargando(true)
      window.setTimeout(() => setCargando(false), 400)
    }
  }
  /* Borrar (CON-3282): con patient insurances que la usan no se puede, y se avisa sin preguntar. */
  const pedirBorrar = () => {
    if (!elegida) return
    if (elegida.enUso) {
      aviso.error({ titulo: 'Failed to delete subscription', texto: 'This subscription cannot be deleted because it has dependent patient insurance records.' })
      return
    }
    setModal('borrar')
  }
  const borrar = () => {
    setSuscripciones((prev) => prev.filter((s) => s.id !== elegida?.id))
    setBusqueda('')
    setModal(null)
    aviso.ok('The subscription has been deleted.')
  }
  const creada = (s: Suscripcion) => {
    setSuscripciones((prev) => [...prev, s])
    setBusqueda(etiquetaSuscripcion(s))
  }
  const orden = ordenSiguiente(planes)
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof d) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  /* Las filas llevan grip: se reordenan arrastrando (o con ↑ ↓). Sólo los
     planes vigentes; los del historial quedan fijos al final. */
  const reordenar = (origen: PlanPaciente, destino: PlanPaciente) => {
    setPlanes((prev) => {
      const copia = prev.filter((p) => p.id !== origen.id)
      const i = copia.findIndex((p) => p.id === destino.id)
      const deOrigen = prev.findIndex((p) => p.id === origen.id)
      const deDestino = prev.findIndex((p) => p.id === destino.id)
      copia.splice(deOrigen < deDestino ? i + 1 : i, 0, origen)
      return copia
    })
    aviso.ok('Plan order updated.')
  }

  /* El switch suma los planes vencidos; no esconde los inactivos vigentes,
     que el frame muestra con el switch apagado. */
  const visibles = historial ? [...planes, ...PLANES_HISTORICOS] : planes

  const limpiar = () => { setD(VACIO); setBusqueda(''); setBeneficios(false); setInformacion(false); setIntentado(false) }
  /* Guardar suma el plan a la tabla con el orden calculado y deja el formulario listo para otro. */
  const guardar = () => {
    setIntentado(true)
    if (!elegida || !d.relacion.trim() || !d.inicio.trim() || !d.elegibilidad.trim()) return
    const cobertura = `${fechaLarga(d.inicio)} - ${d.fin ? fechaLarga(d.fin) : 'Present'}`
    setPlanes((prev) => [...prev, {
      id: `p-${Date.now()}`, orden, carrier: elegida.carrier, plan: elegida.plan, subscriber: elegida.subscriber,
      relacion: d.relacion as RelacionPlan, cobertura, prioridad: [`${orden} ${cobertura}`], estado: elegida.estado,
    }])
    limpiar()
    aviso.ok('Insurance information saved.')
  }

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* El Figma termina el rastro en "Documents" (anomalía 61): acá dice la sección. */}
      <PatientBreadcrumb name="John Smith" section="Insurance" />
      <div className="flex flex-col gap-5 lg:flex-row">
        <PatientSidePanel
          name="John Smith" initials="JS" section="Insurance"
          basePath={`/patients/${id}`} 
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl leading-[1.3] font-semibold text-ink">Patients Plans</h1>
            <Switch on={historial} onChange={setHistorial} label="Show plan history" />
          </div>

          {/* La tabla y los dos paneles llenan el alto que deja el menú y scrollean adentro, como Treatments
              (patient-dashboard.md, 2026-10-30): antes el bloque entero empujaba la página, y el menú scrolleaba con
              él en vez de quedarse del alto de siempre. El absolute saca el bloque del cálculo del alto de la fila:
              lo manda el menú. */}
          <div className="mt-4 lg:relative lg:min-h-[480px] lg:flex-1">
            <div
              tabIndex={0} role="region" aria-label="Insurance"
              className="-m-1 flex flex-col gap-4 overflow-y-auto p-1 focus-visible:outline-2 focus-visible:outline-dash-blue lg:absolute lg:inset-0 lg:m-0 lg:p-1"
            >
              <DataTable
                columns={COLUMNAS}
                rows={visibles}
                rowKey={(p) => p.id}
                rowLabel={(p) => p.plan}
                reorder={{ onReorder: reordenar, canMove: (p) => planes.some((x) => x.id === p.id) }}
                itemLabel="insurances"
                empty={{ icon: CreditCard, title: 'No plans yet', detail: "Add a subscription to start tracking this patient's coverage." }}
              />

              {/* Suscripción + datos del paciente */}
              <div className="grid gap-4 lg:grid-cols-2">
                <section className={cn(TARJETA_PANEL, 'flex flex-col p-4 sm:p-5')}>
                  <h2 className="text-sm font-semibold text-ink">Subscription Information</h2>
                  <p className="mt-0.5 text-[11px] text-ink-muted">
                    Select an existing subscription or create new one.
                  </p>

                  {/* El buscador de personas de toda la app (PersonSearchField): cada resultado, una fila de una sola línea con
                      suscriptor, ID, Carrier y Plan; busca en los cuatro (Julián, 2026-11-06 y 2026-11-10). */}
                  <PersonSearchField
                    className="mt-4" label="Search for an existing subscription" required placeholder="Search by name or ID"
                    personas={suscripciones.map(etiquetaSuscripcion)} value={busqueda} onChange={buscar}
                    nombre={(v) => porEtiqueta(v)?.subscriber ?? v}
                    texto={(v) => { const x = porEtiqueta(v); return x ? `${etiquetaSuscripcion(x)} ${x.carrier} ${x.plan}` : v }}
                    columnaNombre="Subscriber"
                    columnas={(v) => { const x = porEtiqueta(v); return x && [{ label: 'ID', value: x.subscriberId }, { label: 'Carrier', value: x.carrier }, { label: 'Plan', value: x.plan }] }}
                    emptyText="Subscription not found."
                    error={intentado && !elegida ? (busqueda.trim() ? 'Select a subscription from the list.' : 'This field is required.') : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setModal('nueva')}
                    className="text-dash-blue mt-2 flex items-center gap-1.5 self-end text-[13px] font-semibold hover:underline"
                  >
                    <CirclePlus className="size-4" /> Add New Subscription
                  </button>

                  {/* Sin elegir: "Select a subscription" y guiones. Elegida: el plan y su estado. */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-semibold text-ink">{elegida ? elegida.plan : 'Select a subscription'}</p>
                    {elegida && <Pill tone={ESTADO_TONO[elegida.estado]}>{elegida.estado}</Pill>}
                  </div>
                  <div className="mt-3 flex flex-col gap-3" aria-busy={cargando || undefined}>
                    <FilaDato icon={PersonStanding} label="Subscriber" value={elegida?.subscriber ?? '-'} />
                    <FilaDato icon={CreditCard} label="Subscriber ID" value={elegida?.subscriberId ?? '-'} />
                    <FilaDato icon={ShieldHalf} label="Carrier" value={elegida?.carrier ?? '-'} loading={cargando} />
                    <FilaDato icon={Hospital} label="Plan" value={elegida?.plan ?? '-'} loading={cargando} />
                    <FilaDato icon={AArrowUp} label="Coverage Period" value={elegida?.cobertura ?? '-'} />
                    <FilaDato icon={Eye} label="Dependents" value={elegida ? String(elegida.dependientes) : '-'} loading={cargando} />
                  </div>

                  {/* mt-auto: el pie baja al piso de la card, a la altura de Cancel/Save del panel de al lado (Julián,
                      2026-10-30). Sin suscripción elegida, Manage queda deshabilitado y no hay qué borrar. */}
                  <div className="mt-auto flex justify-end gap-2 pt-5">
                    {elegida && (
                      <Button variant="secondary" iconOnly aria-label="Delete subscription" onClick={pedirBorrar} className="text-dash-bad-fg hover:text-dash-bad-fg">
                        <Trash2 />
                      </Button>
                    )}
                    <Button disabled={!elegida || cargando} onClick={() => setModal('gestionar')}>Manage Subscription</Button>
                  </div>
                </section>

                <section className={cn(TARJETA_PANEL, 'flex flex-col p-4 sm:p-5')}>
                  <h2 className="text-sm font-semibold text-ink">Patient Information</h2>

                  <SelectField
                    className="mt-4" label="Relationship to Subscriber" required options={RELACIONES}
                    value={d.relacion} onChange={set('relacion')} error={req('relacion')}
                  />

                  {/* El orden lo calcula el sistema (ordenSiguiente): sólo se muestra. Antes había, además, un select con el
                      mismo rótulo (anomalías 62 y 63); red.dev ya no lo tiene. */}
                  <div className="mt-4 flex items-center gap-2.5 rounded-md bg-[#eff4ff] px-3 py-2">
                    <CreditCard className="size-4 shrink-0 text-ink-muted" strokeWidth={1.8} />
                    <span className="leading-tight">
                      <span className="block text-[11px] text-ink-faint">Coordination Order</span>
                      <span className="block text-[13px] text-ink">{orden}</span>
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <OptionCheckbox label="Assignment of Benefits" checked={beneficios} onChange={setBeneficios} />
                    <OptionCheckbox label="Release of Information" checked={informacion} onChange={setInformacion} />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <DateTextField label="Coverage Start" required value={d.inicio} onChange={set('inicio')} error={req('inicio')} />
                    <DateTextField label="Coverage End" value={d.fin} onChange={set('fin')} />
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <SelectField label="Eligibility" required options={ELEGIBILIDAD} value={d.elegibilidad} onChange={set('elegibilidad')} error={req('elegibilidad')} />
                    <DateTextField label="Verification Date" value={d.verificacion} onChange={set('verificacion')} />
                  </div>
                  <TextArea className="mt-4" label="Notes" placeholder="Add notes" value={d.notas} onChange={set('notas')} />

                  <div className="mt-5 flex justify-end gap-3">
                    <FormFooter onCancel={limpiar} onSave={guardar} />
                  </div>
                </section>
              </div>
              {/* En Mac la barra de scroll no se ve hasta que se scrollea: el degradé avisa que hay más abajo. */}
              <div aria-hidden className="pointer-events-none sticky bottom-0 -mt-10 hidden h-10 bg-gradient-to-t from-page-background to-transparent lg:block" />
            </div>
          </div>
        </div>
      </div>

      {modal === 'nueva' && <NewSubscriptionModal paciente="John Smith" existentes={suscripciones} onCreada={creada} onClose={() => setModal(null)} />}
      {modal === 'borrar' && (
        <ConfirmDialog
          tone="danger" title="Are you sure you want to delete this subscription?" confirmLabel="Confirm"
          onConfirm={borrar} onCancel={() => setModal(null)}
        >
          This action cannot be undone. This will permanently delete this subscription and all associated data.
        </ConfirmDialog>
      )}
      {modal === 'gestionar' && (
        <ManageSubscriptionModal
          suscripcion={elegida}
          onNuevoDependiente={() => setModal('dependiente')}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'dependiente' && <NewDependerModal onClose={() => setModal('gestionar')} />}
    </div>
  )
}
