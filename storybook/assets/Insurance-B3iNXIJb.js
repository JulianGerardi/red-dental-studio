import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, GripVertical, CirclePlus, Search, CreditCard, PersonStanding, ShieldHalf, Hospital, AArrowUp, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { Pagination } from '@/components/patients/ledger/Pagination'
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
   verde e Inactive el rojo — los mismos seis tonos de \`Pill\`. */
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

const COLS = {
  handle: 'w-8',
  order: 'w-[92px]',
  carrier: 'w-[92px]',
  plan: 'w-[124px]',
  subscriber: 'w-[128px]',
  relation: 'w-[92px]',
  coverage: 'w-[148px]',
  priority: 'w-[150px]',
  status: 'w-[92px]',
}

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
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
function FilaDato({ icon: Icon, label, value }: { icon: typeof ShieldHalf; label: string; value: string }) {
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

  /* Las filas llevan grip: se reordenan arrastrando. */
  const arrastrada = useRef<number | null>(null)
  const soltar = (destino: number) => {
    const origen = arrastrada.current
    arrastrada.current = null
    if (origen === null || origen === destino) return
    setPlanes((prev) => {
      const copia = [...prev]
      const [fila] = copia.splice(origen, 1)
      copia.splice(destino, 0, fila)
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
          basePath={\`/patients/\${id}\`} 
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl leading-[1.3] font-semibold text-ink">Patients Plans</h1>
            <Switch on={historial} onChange={setHistorial} label="Show plan history" />
          </div>

          {/* Tabla de planes */}
          <div className="mt-4 overflow-x-auto rounded-lg border border-line-row bg-white">
            <div className="min-w-[960px]">
              <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
                <span className={COLS.handle} />
                <span className={COLS.order}>Order</span>
                <span className={COLS.carrier}>Carrier</span>
                <span className={COLS.plan}>Plan</span>
                <span className={COLS.subscriber}>Subscriber</span>
                <span className={COLS.relation}>Relation</span>
                <span className={COLS.coverage}>Coverage Period</span>
                <span className={COLS.priority}>Priority Period</span>
                <span className={COLS.status}>Status</span>
              </div>

              {visibles.length === 0 ? (
                <EmptyState icon={CreditCard} title="No plans yet" detail="Add a subscription to start tracking this patient's coverage." />
              ) : (
                visibles.map((p, i) => (
                  <div
                    key={p.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => soltar(i)}
                    className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft"
                  >
                    <span
                      draggable
                      onDragStart={() => { arrastrada.current = i }}
                      aria-label={\`Reorder \${p.plan}\`}
                      className={cn(COLS.handle, 'cursor-grab text-ink-faint active:cursor-grabbing')}
                    >
                      <GripVertical className="size-4" />
                    </span>
                    <span className={COLS.order}><Pill tone={ORDEN_TONO}>{p.orden}</Pill></span>
                    <span className={COLS.carrier}>{p.carrier}</span>
                    <span className={COLS.plan}>{p.plan}</span>
                    <span className={COLS.subscriber}>{p.subscriber}</span>
                    <span className={COLS.relation}><Pill tone={RELACION_TONO[p.relacion]}>{p.relacion}</Pill></span>
                    <span className={COLS.coverage}>{p.cobertura}</span>
                    <span className={cn(COLS.priority, 'flex flex-col gap-0.5 leading-tight')}>
                      {p.prioridad.map((t) => <span key={t}>{t}</span>)}
                    </span>
                    <span className={COLS.status}><Pill tone={ESTADO_TONO[p.estado]}>{p.estado}</Pill></span>
                  </div>
                ))
              )}

              {/* El Figma dice "8 of 8" con cuatro filas a la vista; el
                  contador ahora cuenta las que hay. La paginación dibujada
                  no tenía onClick: se usa el componente compartido. */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
                <span className="text-xs font-semibold text-ink-muted">
                  Showing {visibles.length} of {visibles.length} insurances
                </span>
                <Pagination pagina={1} paginas={1} onChange={() => {}} />
              </div>
            </div>
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
`})))()}export{n,i as r,r as t};