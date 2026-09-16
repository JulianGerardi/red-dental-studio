import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronDown, PersonStanding, Clipboard, Pill as PillIcon, ClipboardList, MapPin, Clock, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { ClinicalPopover } from '@/components/patients/ClinicalPopover'
import { ClinicalItemModal } from '@/components/patients/ClinicalItemModal'
import { ITEMS_INICIALES, type Categoria, type ClinicalItem } from '@/data/clinicalItems'
import { aviso } from '@/components/ui/toaster'
import { PendingTaskCard, type PendingTask } from '@/components/dashboard/PendingTaskCard'
import { NewPatientModal } from '@/pages/patients/NewPatientModal'
import { EditContactModal } from '@/pages/patients/EditContactModal'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'

/* Figma 3646:58836 "Patient Dashboard". */

const CLINICAL: { label: Categoria; icon: LucideIcon }[] = [
  { label: 'Allergies', icon: PersonStanding },
  { label: 'Medical Conditions', icon: Clipboard },
  { label: 'Medication', icon: PillIcon },
  { label: 'Past Surgery and Hospitalization', icon: ClipboardList },
]

const INSURANCE = [
  { order: 'Primary', carrier: 'AETNA', plan: 'Dental PPO', subscriber: 'Janet Johnson', relation: 'Child', period: 'Annual' },
  { order: 'Secondary', carrier: 'AETNA', plan: 'Dental PPO', subscriber: 'Janet Johnson', relation: 'Child', period: 'Annual' },
]

/* Mismos tonos que la tabla completa de Insurance (src/pages/patients/Insurance.tsx):
   el orden siempre en azul, la relación varía. */
const RELACION_TONO: Record<string, PillTone> = { Child: 'success', Self: 'info', Spouse: 'neutral' }

const TASKS: PendingTask[] = Array.from({ length: 6 }, () => ({
  kind: 'Referrals', state: 'Requested', person: 'Elena Marquez', initials: 'EM',
  register: 'March 17, 2025', expiration: 'March 15, 2025',
}))

type ApptStatus = 'Booked' | 'Cancelled' | 'Fulfilled' | 'No Show'
const APPT_STATUS: Record<ApptStatus, string> = {
  Booked: 'border-[#174596] text-[#174596] bg-[#f0f2ff]',
  Cancelled: 'border-[#b22626] text-[#b22626] bg-[#fff2f2]',
  Fulfilled: 'border-[#1a804d] text-[#1a804d] bg-[#f0fcf5]',
  'No Show': 'border-[#99660d] text-[#99660d] bg-[#fffaf0]',
}
const APPTS: { status: ApptStatus; cancel?: boolean }[] = [
  { status: 'Booked', cancel: true }, { status: 'Cancelled' }, { status: 'Fulfilled' },
  { status: 'No Show' }, { status: 'No Show' }, { status: 'No Show' }, { status: 'No Show' },
]

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-lg border border-[#e4e4e7] bg-white', className)}>{children}</div>
}

export default function PatientDetail() {
  const { id = 'john-smith' } = useParams()
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
    aviso.ok(`${it.name} was removed from ${cat}.`, {
      label: 'Undo',
      onClick: () => setItems((prev) => ({
        ...prev,
        [cat]: [...prev[cat].slice(0, indice), it, ...prev[cat].slice(indice)],
      })),
    })
  }
  const [modal, setModal] = useState<'contact' | 'edit' | null>(null)
  const [taskTab, setTaskTab] = useState<'Pending Task' | 'Activity'>('Pending Task')
  const [apptTab, setApptTab] = useState<'Next' | 'Next Appointments'>('Next')

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section={section}
          basePath={`/patients/${id}`}
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
                    <Icon className={cn('size-4 shrink-0', activa ? 'text-white' : 'text-[#09090b]')} />
                    <span className={cn('truncate text-[13px] font-semibold', activa ? 'text-white' : 'text-[#09090b]')}>
                      {label}
                    </span>
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded text-[11px] font-medium',
                        activa ? 'text-dash-blue bg-[#eff6ff]' : 'bg-dash-count-bg text-dash-blue-hover',
                      )}
                    >
                      {items[label].length}
                    </span>
                    <ChevronDown
                      className={cn(
                        'ml-auto size-4 shrink-0 transition-transform',
                        activa ? 'rotate-180 text-white' : 'text-[#71717a]',
                      )}
                    />
                  </button>
                </Card>
              )
            })}
          </div>

          <Card className="p-5">
            <h2 className="text-[15px] font-bold text-[#09090b]">Insurance</h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-[#e4e4e7]">
              <table className="w-full min-w-[720px] text-xs">
                <thead>
                  <tr className="border-b border-[#e4e4e7] bg-[#f9f9f9] text-[11px] text-[#71717a]">
                    {['Order', 'Carrier', 'Plan', 'Subscriber', 'Relation', 'Coverage Period', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INSURANCE.map((r) => (
                    <tr key={r.order} className="border-b border-[#e4e4e7] text-[13px] last:border-0">
                      <td className="px-4 py-4"><Pill tone="info">{r.order}</Pill></td>
                      <td className="px-4 py-4 text-[#3f3f46]">{r.carrier}</td>
                      <td className="px-4 py-4 text-[#3f3f46]">{r.plan}</td>
                      <td className="px-4 py-4 text-[#3f3f46]">{r.subscriber}</td>
                      <td className="px-4 py-4"><Pill tone={RELACION_TONO[r.relation] ?? 'neutral'}>{r.relation}</Pill></td>
                      <td className="px-4 py-4 text-[#3f3f46]">{r.period}</td>
                      <td className="px-4 py-4">
                        <RowActionsMenu label={`${r.order} insurance plan`}>
                          <DropdownMenuItem asChild>
                            <Link to={`/patients/${id}/insurance`}>View plan</Link>
                          </DropdownMenuItem>
                        </RowActionsMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-[#71717a]">Showing 2 of 5 insurances</span>
                <div className="flex items-center gap-1">
                  {['‹', '1', '2', '3', '›'].map((p) => (
                    <span key={p} className={cn('flex size-7 items-center justify-center rounded-md text-xs font-semibold',
                      p === '1' ? 'bg-dash-blue text-white' : 'text-[#71717a]')}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-bold text-[#09090b]">Pending Task</h2>
                <div className="flex rounded-md bg-[#f1f5f9] p-1">
                  {(['Pending Task', 'Activity'] as const).map((t) => (
                    <button key={t} onClick={() => setTaskTab(t)}
                      className={cn('rounded px-3 py-1 text-xs font-medium',
                        taskTab === t ? 'bg-dash-blue text-white' : 'text-[#64748b]')}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                {TASKS.map((t, i) => <PendingTaskCard key={i} task={t} />)}
              </div>
            </Card>

            <Card className="p-4">
              <h2 className="text-[15px] font-bold text-[#09090b]">Appointments</h2>
              <div className="mt-3 flex rounded-md bg-[#f1f5f9] p-1">
                {(['Next', 'Next Appointments'] as const).map((t) => (
                  <button key={t} onClick={() => setApptTab(t)}
                    className={cn('flex-1 truncate rounded px-1 py-1 text-xs font-medium',
                      apptTab === t ? 'bg-dash-blue text-white' : 'text-[#64748b]')}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {APPTS.map((a, i) => (
                  <div key={i} className="border-dash-blue rounded-md border-l-[3px] bg-white p-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
                    <div className="flex items-start gap-2">
                      <span className="bg-dash-blue-hover flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white">av</span>
                      <span className="min-w-0 flex-1 truncate text-xs font-semibold text-[#09090b]">Maria Abril Viola</span>
                      <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', APPT_STATUS[a.status])}>{a.status}</span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-[#71717a]">Routine cleaning appointment</p>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#71717a]">
                      <Clock className="size-3 shrink-0" /> 12 Mar 2025 · 10:00 - 11:00 AM
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-[#71717a]">
                      <MapPin className="size-3 shrink-0" /> Los Angeles - 789 N Sunrise Street
                    </p>
                    {a.cancel && (
                      <button className="mt-2 ml-auto block rounded-md border border-[#e4e4e7] px-2.5 py-1 text-[11px] font-medium hover:bg-[#fafafa]">
                        Cancel
                      </button>
                    )}
                  </div>
                ))}
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
      {modal === 'edit' && (
        <NewPatientModal title="Edit Patient" forceGuardian onClose={() => setModal(null)} />
      )}
    </div>
  )
}
