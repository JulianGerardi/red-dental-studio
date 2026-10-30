import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDown, PersonStanding, Clipboard, Pill as PillIcon, ClipboardList, Activity, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Count } from '@/components/ui/count'
import { EmptyState } from '@/components/ui/empty-state'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import { ClinicalPopover } from '@/components/patients/ClinicalPopover'
import { ClinicalItemModal } from '@/components/patients/ClinicalItemModal'
import { ITEMS_INICIALES, type Categoria, type ClinicalItem } from '@/data/clinicalItems'
import { aviso } from '@/components/ui/toaster'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { PendingTaskList } from '@/components/dashboard/PendingTaskList'
import { TASK_KINDS } from '@/components/dashboard/dashboard-data'
import { ShowMore } from '@/components/ui/show-more'
import { EditPatientModal } from '@/pages/patients/EditPatientModal'
import { DATOS_JOHN_SMITH, usePatients } from '@/data/patientsStore'
import { EditContactModal } from '@/pages/patients/EditContactModal'
import { CONTENEDOR_PAGINA, TARJETA_PANEL } from '@/lib/estilos'
import { Tabs } from '@/components/ui/tabs'
import { PatientAppointmentCard, type PatientAppointmentStatus } from '@/components/patients/PatientAppointmentCard'
import { PendingDocuments } from '@/components/patients/PendingDocuments'
import { useMedia } from '@/lib/media'

/* Figma 3646:58836 "Patient Dashboard". */

const CLINICAL: { label: Categoria; icon: LucideIcon }[] = [
  { label: 'Allergies', icon: PersonStanding },
  { label: 'Medical Conditions', icon: Clipboard },
  { label: 'Medication', icon: PillIcon },
  { label: 'Past Surgery and Hospitalization', icon: ClipboardList },
]

/* Repartidas entre los cuatro tipos (antes las 9 eran "Referrals"): así el filtro por tipo tiene algo que filtrar
   (patient-dashboard.md, 2026-10-28). Mismo total que fijó el Show N more del 2026-10-25, sin tocar esa cuenta. */
const TASKS: PendingTask[] = ['Clinical Note', 'Clinical Note', 'Clinical Note', 'Lab Orders', 'Lab Orders', 'Prescriptions', 'Prescriptions', 'Referrals', 'Referrals']
  .map((kind) => ({ kind, state: 'Requested', person: 'Elena Marquez', initials: 'EM', register: 'March 17, 2025', expiration: 'March 15, 2025' }))

/* Cuántos se ven en cada bloque antes de "Show N more" (ui/show-more; patient-dashboard.md, 2026-10-12). */
export const TOPE = { tareas: 3, turnos: 3, turnosColumna: 7 }

const APPTS: { status: PatientAppointmentStatus; cancel?: boolean }[] = [
  { status: 'Booked', cancel: true }, { status: 'Cancelled' }, { status: 'Fulfilled' },
  { status: 'No Show' }, { status: 'No Show' }, { status: 'No Show' }, { status: 'No Show' },
]

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn(TARJETA_PANEL, className)}>{children}</div>
}

/* \`turnos\` sólo lo cambia el design system, para probar la columna con más o menos turnos. */
export default function PatientDetail({ turnos = APPTS.length }: { turnos?: number }) {
  const { id = 'john-smith' } = useParams()
  const { datosDe } = usePatients()
  const appts = Array.from({ length: turnos }, (_, i) => APPTS[i % APPTS.length])
  const navigate = useNavigate()
  const [section, setSection] = useState('Overview')
  const [open, setOpen] = useState<{ label: Categoria; rect: DOMRect } | null>(null)
  /* Los cuatro bloques clínicos viven en estado local: alta, edición y
     borrado se ven al instante en el listado y en el contador de la card. */
  const [items, setItems] = useState(ITEMS_INICIALES)
  const [clinico, setClinico] = useState<{ cat: Categoria; item?: ClinicalItem } | null>(null)

  const guardarItem = (cat: Categoria) => (it: ClinicalItem) =>
    setItems((prev) => {
      const lista = prev[cat]
      const i = lista.findIndex((x) => x.id === it.id)
      return { ...prev, [cat]: i < 0 ? [...lista, it] : lista.map((x) => (x.id === it.id ? it : x)) }
    })

  const borrarItem = (cat: Categoria) => (it: ClinicalItem) => {
    const indice = items[cat].findIndex((x) => x.id === it.id)
    setItems((prev) => ({ ...prev, [cat]: prev[cat].filter((x) => x.id !== it.id) }))
    aviso.ok(\`\${it.name} was removed from \${cat}.\`, {
      label: 'Undo',
      onClick: () => setItems((prev) => ({
        ...prev,
        [cat]: [...prev[cat].slice(0, indice), it, ...prev[cat].slice(indice)],
      })),
    })
  }
  const [modal, setModal] = useState<'contact' | 'edit' | null>(null)
  /* Igual que el Dashboard (dashboard.md, 2026-10-29): tabs por tipo, en vez del filtro. */
  const [tipoTarea, setTipoTarea] = useState('All')
  const tareas = tipoTarea === 'All' ? TASKS : TASKS.filter((t) => t.kind === tipoTarea)
  const [apptTab, setApptTab] = useState<'Next' | 'Next Appointments'>('Next')
  /* Desde lg Appointments es una columna del alto de Pending Task + Pending documents: entran más turnos. */
  const enColumna = useMedia('(min-width: 1024px)')

  return (
    <div className={CONTENEDOR_PAGINA}>

      <PatientBreadcrumb name="John Smith" />
      <div className="flex flex-col gap-5 lg:flex-row">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section={section}
          basePath={\`/patients/\${id}\`}
          onSection={setSection}
          /* El lápiz de General va a la página completa de edición
             (Figma 3640:72713, "Edit Patient (Full Page)"), no a un modal. */
          onEditGeneral={() => navigate('/patients/edit')}
          onEditContact={() => setModal('contact')}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="grid gap-4 lg:grid-cols-2">
            {CLINICAL.map(({ label, icon: Icon }) => {
              const activa = open?.label === label
              return (
                <Card key={label} className={cn(activa && 'border-dash-blue bg-dash-blue')}>
                  <button
                    data-clinical-card
                    onClick={(e) => {
                      /* El rect se toma acá, no dentro del updater: para cuando
                         el updater corre, React ya anuló e.currentTarget. */
                      const rect = (e.currentTarget.closest('div') as HTMLElement).getBoundingClientRect()
                      setOpen((o) => (o?.label === label ? null : { label, rect }))
                    }}
                    aria-expanded={activa}
                    className="flex w-full items-center gap-2.5 px-4 py-3"
                  >
                    <Icon className={cn('size-4 shrink-0', activa ? 'text-white' : 'text-ink')} />
                    <span className={cn('truncate text-[13px] font-semibold', activa ? 'text-white' : 'text-ink')}>
                      {label}
                    </span>
                    <Count active={activa}>{items[label].length}</Count>
                    <ChevronDown
                      className={cn(
                        'ml-auto size-4 shrink-0 transition-transform',
                        activa ? 'rotate-180 text-white' : 'text-ink-muted',
                      )}
                    />
                  </button>
                </Card>
              )
            })}
          </div>

          {/* Izquierda Pending Task y Pending documents; derecha Appointments, del alto de las dos
              (patient-dashboard.md, 2026-10-17). */}
          <div className="grid gap-5 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="flex min-w-0 flex-col gap-5">
              {/* En lugar de la tabla de Insurance (que sigue en su sección): los documentos pendientes a resolver. Van
                  primero y las tareas abajo, con el mismo diseño (Julián, 2026-10-19). Las dos llenan el alto que
                  deja el menú -alto fijo, no se acomoda al total: no salta al cambiar de tab (Julián, 2026-10-29)- y
                  scrollean adentro pasado ese alto (patient-dashboard.md, 2026-10-25). */}
              <Card className="flex flex-1 flex-col p-5">
                <PendingDocuments />
              </Card>

              <Card className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[15px] font-bold text-ink">Pending Task</h2>
                  <Tabs
                    size="sm" aria-label="Filter tasks"
                    tabs={[
                      { value: 'All', count: TASKS.length },
                      ...TASK_KINDS.map((k) => ({ value: k, count: TASKS.filter((t) => t.kind === k).length })),
                    ]}
                    value={tipoTarea} onChange={setTipoTarea}
                  />
                </div>
                <div className="mt-4 flex min-h-0 flex-1 flex-col">
                  {tareas.length === 0 ? (
                    <EmptyState icon={Activity} title="Nothing pending" detail="No pending tasks of this type." className="py-8" />
                  ) : (
                    <PendingTaskList tasks={tareas} limit={TOPE.tareas} enCaja llenarAlto cargarAlScroll />
                  )}
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h2 className="text-[15px] font-bold text-ink">Appointments</h2>
              <Tabs size="sm" fullWidth className="mt-3" aria-label="Appointments" tabs={['Next', 'Next Appointments'] as const} value={apptTab} onChange={setApptTab} />
              <div className="mt-3">
                <ShowMore total={appts.length} limit={enColumna ? TOPE.turnosColumna : TOPE.turnos} label="appointments" className="flex flex-col gap-2">
                  {(n) => appts.slice(0, n).map((a, i) => (
                    <PatientAppointmentCard
                      key={i}
                      name="Maria Abril Viola"
                      initials="av"
                      status={a.status}
                      reason="Routine cleaning appointment"
                      when="12 Mar 2025 · 10:00 - 11:00 AM"
                      place="Los Angeles - 789 N Sunrise Street"
                      onCancel={a.cancel ? () => aviso.warn('Appointment cancelled.') : undefined}
                    />
                  ))}
                </ShowMore>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {open && (
        <ClinicalPopover
          title={open.label}
          anchor={open.rect}
          items={items[open.label]}
          onAdd={() => setClinico({ cat: open.label })}
          onEdit={(it) => setClinico({ cat: open.label, item: it })}
          onDelete={borrarItem(open.label)}
          onClose={() => setOpen(null)}
        />
      )}
      {clinico && (
        <ClinicalItemModal
          categoria={clinico.cat}
          item={clinico.item}
          onGuardar={guardarItem(clinico.cat)}
          onClose={() => setClinico(null)}
        />
      )}

      {modal === 'contact' && <EditContactModal onClose={() => setModal(null)} />}
      {modal === 'edit' && <EditPatientModal id={id} inicial={datosDe(id) ?? DATOS_JOHN_SMITH} onClose={() => setModal(null)} />}
    </div>
  )
}
`})))()}export{n,i as r,r as t};