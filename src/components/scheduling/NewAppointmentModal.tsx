import { useMemo, useState } from 'react'
import {
  ModalShell, SectionCard, SelectField, SearchField, TextArea,
  OptionCheckbox, FormFooter, FieldLabel, FieldError,
} from '@/components/patients/form'
import { DatePicker, formatDMY } from '@/components/ui/date-picker'
import { AppointmentSlotPicker, HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import {
  PlanCard, VisitRow, type Plan, type Visita,
} from '@/components/scheduling/TreatmentPlanPicker'
import { aviso } from '@/components/ui/toaster'

/* Figma 4430:61940 "Scheduling — Calendar (New Appointment Modal)".

   Rediseño sobre 3862:220908: las cards "Patient and Scheduling", "Details" y
   "Providers" se fundieron en una sola columna izquierda, y la derecha pasó a
   tener el bloque **Link to treatment plan visit** arriba de "Additional".
   Additional Provider además perdió el asterisco.

   La columna de horarios sigue a la derecha. Ahora es hermana del formulario
   dentro de un mismo frame (757 + 190 = 947), o sea pegada y sin montarse.

   La dispara **ASAP**: es el único checkbox tildado en el frame donde la
   columna aparece. Es una inferencia — ver README.md, Desviaciones. */

const PACIENTES = ['John Smith', 'Noah James Smith', 'Maria Abril Viola', 'Elias Aguirre']
const PROVIDERS = ['Dr. Elena Martinez', 'Dr. Emily Chen', 'Dr. Salgado', 'Sarah Stone']

const PLANES: Plan[] = [
  { id: 'p1', estado: 'Accepted', date: '27, August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy', visitas: 2, procedimientos: 3 },
  { id: 'p2', estado: 'Inprogress', date: '27, August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy', visitas: 2, procedimientos: 3 },
]

const VISITAS: Visita[] = [
  {
    id: 'v1', name: 'Visit 1', total: '$1,270.00',
    procedimientos: [
      'D0120 – Periodic oral evaluation',
      'D1110 – Prophylaxis – adult',
      'D0274 – Bitewings – four radiographic images',
      'D0210 – Intraoral complete series',
      'D2740 – Crown – porcelain/ceramic',
      'D6010 – Surgical placement of implant body',
      'D4341 – Periodontal scaling and root planing',
      'D9310 – Consultation',
    ],
  },
  {
    id: 'v2', name: 'Visit 2', total: '$860.00',
    procedimientos: ['D0120 – Periodic oral evaluation', 'D1110 – Prophylaxis – adult'],
  },
]

const VACIO = {
  patient: '', primary: '', additional: '', requestor: '', reason: '',
  date: '', start: '', end: '', operatory: '', status: '', notes: '',
}

export type DatosTurno = Partial<typeof VACIO>

export function NewAppointmentModal({
  titulo = 'New Appointment',
  inicial,
  onGuardar,
  onClose,
}: {
  titulo?: string
  /** Con datos, el modal edita el turno en vez de crear uno. */
  inicial?: DatosTurno
  /** Recibe los valores al guardar. Si devuelve true, ya mostró su propio
      toast y el modal no muestra el suyo. */
  onGuardar?: (d: typeof VACIO) => boolean | void
  onClose: () => void
}) {
  const editando = !!inicial
  const [d, setD] = useState({ ...VACIO, ...inicial })
  /* La fecha va con el calendario, no con un select de tres opciones fijas:
     sin eso no se puede reprogramar a un día cualquiera. */
  const fecha = useMemo(() => {
    if (!d.date) return null
    const [dd, mm, yyyy] = d.date.split('-').map(Number)
    return Number.isNaN(dd) ? null : new Date(yyyy, mm - 1, dd)
  }, [d.date])
  const [asap, setAsap] = useState(true)
  const [plan, setPlan] = useState('p1')
  const [visita, setVisita] = useState('v1')
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof VACIO) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof VACIO) =>
    intentado && !d[k].trim() ? 'This field is required.' : undefined

  /* Elegir una franja completa la fecha y las dos horas de una. La hora de fin
     sale de la lista, no de sumar 1: así 11 AM cae en 12 PM y no en "12 AM". */
  const elegirFranja = (hora: string) => {
    const i = HORAS.indexOf(hora)
    setD((p) => ({ ...p, date: '12-03-2025', start: hora, end: HORAS[i + 1] ?? hora }))
  }

  /* Additional Provider dejó de ser obligatorio en este frame. */
  const obligatorios: (keyof typeof VACIO)[] =
    ['patient', 'primary', 'date', 'start', 'end', 'operatory', 'status']

  const guardar = () => {
    setIntentado(true)
    if (obligatorios.some((k) => !d[k].trim())) return
    const manejado = onGuardar?.(d)
    if (!manejado) {
      aviso.ok(
        editando
          ? `Appointment for ${d.patient} updated.`
          : `Appointment for ${d.patient} booked at ${d.start}.`,
      )
    }
    onClose()
  }

  return (
    <ModalShell
      title={titulo}
      onClose={onClose}
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
      aside={
        asap ? (
          <AppointmentSlotPicker
            seleccion={d.start}
            paciente={d.patient}
            onPick={elegirFranja}
            className="h-full w-[190px] rounded-l-none border-l-0 shadow-[0_4px_14px_0_rgb(100_100_100/0.25)] lg:h-full max-lg:max-h-[340px] max-lg:w-full max-lg:rounded-xl max-lg:border-l"
          />
        ) : undefined
      }
    >
      {/* minmax(0,…): sin eso una fila ancha de la columna derecha empuja y
          desarma la izquierda. */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.13fr)]">
        <SectionCard title="Patient and Scheduling">
          <p className="-mt-2 text-[11px] text-[#71717a]">
            Complete the details below to schedule the appointment.
          </p>
          <SearchField
            label="Patient" required placeholder="Search by Name" options={PACIENTES}
            value={d.patient} onChange={set('patient')} error={req('patient')}
          />
          <SearchField
            label="Primary Provider" required placeholder="Search by Name" options={PROVIDERS}
            value={d.primary} onChange={set('primary')} error={req('primary')}
          />
          <SearchField
            label="Additional Provider" placeholder="Search by Name" options={PROVIDERS}
            value={d.additional} onChange={set('additional')}
          />
          <SelectField
            label="Requestor" placeholder="Who is requesting?"
            value={d.requestor} onChange={set('requestor')}
          />
          <SelectField label="Reason for Visit" value={d.reason} onChange={set('reason')} />
          {/* El Figma dibuja Date como un select con la fecha 12-03-2025 de
              placeholder; acá es el calendario, que es lo que hace falta para
              reprogramar. Los dos campos de hora sí conservan ese placeholder
              raro del frame. */}
          <div className="flex flex-col gap-2">
            <FieldLabel required>Date</FieldLabel>
            <DatePicker
              value={fecha}
              onChange={(nueva) => set('date')(formatDMY(nueva))}
              placeholder="12-03-2025"
              error={!!req('date')}
              className="h-9 w-full"
            />
            <FieldError>{req('date')}</FieldError>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Start Time" required placeholder="12-03-2025" options={HORAS.slice(0, -1)}
              value={d.start} onChange={set('start')} error={req('start')}
            />
            <SelectField
              label="End Time" required placeholder="12-03-2025" options={HORAS.slice(1)}
              value={d.end} onChange={set('end')} error={req('end')}
            />
          </div>
          <SelectField
            label="Operatory" required value={d.operatory}
            onChange={set('operatory')} error={req('operatory')}
          />
          <SelectField
            label="Status" required value={d.status}
            onChange={set('status')} error={req('status')}
          />
        </SectionCard>

        <div className="flex flex-col gap-6">
          <SectionCard title="Link to treatment plan visit">
            <p className="text-[13px] font-bold text-[#09090b]">Treatment plans</p>
            {PLANES.map((p) => (
              <PlanCard key={p.id} plan={p} on={plan === p.id} onClick={() => setPlan(p.id)} />
            ))}

            <p className="mt-1 text-[13px] font-bold text-[#09090b]">Visit</p>
            {VISITAS.map((v) => (
              <VisitRow key={v.id} visita={v} on={visita === v.id} onClick={() => setVisita(v.id)} />
            ))}
          </SectionCard>

          <SectionCard title="Additional">
            <OptionCheckbox label="ASAP" checked={asap} onChange={setAsap} />
            <OptionCheckbox label="Follow-up" defaultChecked={false} />
            <OptionCheckbox label="Premedicate" defaultChecked={false} />
            <TextArea label="Notes" placeholder="Add notes" value={d.notes} onChange={set('notes')} />
          </SectionCard>
        </div>
      </div>
    </ModalShell>
  )
}
