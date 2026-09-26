import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, CirclePlus, Search, CreditCard, PersonStanding, ShieldHalf, Hospital, AArrowUp, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { Pill, type PillTone } from '@/components/ui/pill'
import { SelectField, DateTextField, TextArea, OptionCheckbox, FormFooter } from '@/components/patients/form'
import {
  NewSubscriptionModal, ManageSubscriptionModal, NewDependerModal,
} from '@/components/patients/insurance/modals'
import { PLANES, PLANES_HISTORICOS, SUSCRIPCION, RELACIONES, ORDENES, ELEGIBILIDAD, type PlanPaciente } from '@/data/insurance'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

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
export function FilaDato({ icon: Icon, label, value }: { icon: typeof ShieldHalf; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 shrink-0 text-ink-muted" strokeWidth={1.8} />
      <span className="min-w-0 leading-tight">
        <span className="block text-[11px] text-ink-faint">{label}</span>
        <span className="block truncate text-[13px] text-ink">{value}</span>
      </span>
    </div>
  )
}

export default function Insurance() {
  const { id = 'john-smith' } = useParams()
  const [historial, setHistorial] = useState(false)
  const [planes, setPlanes] = useState(PLANES)
  const [modal, setModal] = useState<'nueva' | 'gestionar' | 'dependiente' | null>(null)
  const [d, setD] = useState({ relacion: '', orden: '', inicio: '', fin: '', elegibilidad: '', verificacion: '', notas: '' })
  const [intentado, setIntentado] = useState(false)
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

  const guardar = () => {
    setIntentado(true)
    if (!d.relacion.trim() || !d.orden.trim() || !d.inicio.trim() || !d.elegibilidad.trim()) return
    aviso.ok('Insurance information saved.')
  }

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* El último tramo del breadcrumb dice "Documents" en una pantalla de
          Insurance. Es del Figma. */}

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith" initials="JS" section="Insurance"
          basePath={`/patients/${id}`} 
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl leading-[1.3] font-semibold text-ink">Patients Plans</h1>
            <Switch on={historial} onChange={setHistorial} label="Show plan history" />
          </div>

          {/* Tabla de planes */}
          <div className="mt-4">
            <DataTable
              columns={COLUMNAS}
              rows={visibles}
              rowKey={(p) => p.id}
              rowLabel={(p) => p.plan}
              reorder={{ onReorder: reordenar, canMove: (p) => planes.some((x) => x.id === p.id) }}
              itemLabel="insurances"
              empty={{ icon: CreditCard, title: 'No plans yet', detail: "Add a subscription to start tracking this patient's coverage." }}
            />
          </div>

          {/* Suscripción + datos del paciente */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <section className="flex flex-col rounded-lg border border-line bg-white p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-ink">Subscription Information</h2>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                Select an existing subscription or create new one.
              </p>

              <span className="mt-4 block text-xs font-medium text-ink">
                Search for an existing subscription<span className="text-required">*</span>
              </span>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                {/* Borde gris como todos los buscadores del sistema; el azul
                    queda para el foco. El frame lo dibuja siempre azul porque
                    lo capturó enfocado. */}
                <input
                  placeholder="Search result"
                  className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setModal('nueva')}
                className="text-dash-blue mt-2 flex items-center gap-1.5 self-end text-[13px] font-semibold hover:underline"
              >
                <CirclePlus className="size-4" /> Add New Subscription
              </button>

              <p className="mt-4 text-sm font-semibold text-ink">Select a subscription</p>
              <div className="mt-3 flex flex-col gap-3">
                <FilaDato icon={PersonStanding} label="Subscriber" value={SUSCRIPCION.subscriber} />
                <FilaDato icon={PersonStanding} label="Subscriber ID" value={SUSCRIPCION.subscriberId} />
                <FilaDato icon={ShieldHalf} label="Carrier" value={SUSCRIPCION.carrier} />
                <FilaDato icon={Hospital} label="Plan" value={SUSCRIPCION.plan} />
                <FilaDato icon={AArrowUp} label="Coverage Period" value={SUSCRIPCION.cobertura} />
                <FilaDato icon={Eye} label="Dependents" value={SUSCRIPCION.dependientes} />
              </div>

              <button
                type="button"
                onClick={() => setModal('gestionar')}
                className="bg-dash-blue hover:bg-dash-blue-hover mt-5 h-9 self-end rounded-md px-5 text-[13px] font-medium text-white transition-colors"
              >
                Manage Subscription
              </button>
            </section>

            <section className="flex flex-col rounded-lg border border-line bg-white p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-ink">Patient Information</h2>

              <SelectField
                className="mt-4" label="Relationship to Subscriber" required options={RELACIONES}
                value={d.relacion} onChange={set('relacion')} error={req('relacion')}
              />

              {/* Caja de sólo lectura con el mismo rótulo que el select de
                  abajo, y con "Cordination" mal escrito. Es del Figma. */}
              <div className="mt-4 flex items-center gap-2.5 rounded-md bg-[#eff4ff] px-3 py-2">
                <CreditCard className="size-4 shrink-0 text-ink-muted" strokeWidth={1.8} />
                <span className="leading-tight">
                  <span className="block text-[11px] text-ink-faint">Cordination Order</span>
                  <span className="block text-[13px] text-ink">Primary</span>
                </span>
              </div>

              <SelectField
                className="mt-4" label="Cordination Order" required options={ORDENES}
                value={d.orden} onChange={set('orden')} error={req('orden')}
              />

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <OptionCheckbox label="Assignment of Benefits" />
                <OptionCheckbox label="Release of Information" />
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
                <FormFooter onCancel={() => setD({ relacion: '', orden: '', inicio: '', fin: '', elegibilidad: '', verificacion: '', notas: '' })} onSave={guardar} />
              </div>
            </section>
          </div>
        </div>
      </div>

      {modal === 'nueva' && <NewSubscriptionModal onClose={() => setModal(null)} />}
      {modal === 'gestionar' && (
        <ManageSubscriptionModal
          onNuevoDependiente={() => setModal('dependiente')}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'dependiente' && <NewDependerModal onClose={() => setModal('gestionar')} />}
    </div>
  )
}
