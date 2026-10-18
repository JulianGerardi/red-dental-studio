import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { useMemo, useState } from 'react'
import {
  ModalShell, SelectField, SearchField, TextArea,
  OptionCheckbox, FieldLabel, FieldError,
} from '@/components/patients/form'
import { DatePicker, formatDMY } from '@/components/ui/date-picker'
import { AppointmentSlotPicker, HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import {
  PlanCard, VisitRow, type Plan, type Visita,
} from '@/components/scheduling/TreatmentPlanPicker'
import { aviso } from '@/components/ui/toaster'

/* Figma 4430:61940 "Scheduling — Calendar (New Appointment Modal)".

   Rediseño sobre 3862:220908: las cards "Patient and Scheduling", "Details" y
   "Providers" se fundieron en Patient + Scheduling, y Additional Provider
   perdió el asterisco.

   Desde 2026-10-06 es un drawer con la organización de New Appointment de Confidentally 2.0: paso 1 "Patient and
   Scheduling" en una columna, paso 2 "Link to treatment plan visit" con Additional y las notas. El calendario del día
   (AppointmentSlotPicker) se despliega al costado del drawer cuando se toca la fecha o la hora. Ver
   design-reference/design-system.md, "Pop ups". */

const PACIENTES = ['John Smith', 'Noah James Smith', 'Maria Abril Viola', 'Elias Aguirre']
const PROVIDERS = ['Dr. Elena Martinez', 'Dr. Emily Chen', 'Dr. Salgado', 'Sarah Stone']

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
  /* Las tres siguientes siguen el hilo de la Comprehensive Implant Therapy:
     cirugía, pilar y corona. */
  {
    id: 'v3', name: 'Visit 3', total: '$2,480.00',
    procedimientos: [
      'D6010 – Surgical placement of implant body',
      'D6104 – Bone graft at time of implant placement',
      'D0220 – Intraoral periapical – first image',
    ],
  },
  {
    id: 'v4', name: 'Visit 4', total: '$1,340.00',
    procedimientos: [
      'D6056 – Prefabricated abutment',
      'D0140 – Limited oral evaluation – problem focused',
      'D0220 – Intraoral periapical – first image',
    ],
  },
  {
    id: 'v5', name: 'Visit 5', total: '$1,950.00',
    procedimientos: [
      'D6058 – Abutment supported porcelain/ceramic crown',
      'D0220 – Intraoral periapical – first image',
      'D6080 – Implant maintenance procedures',
    ],
  },
]

/* Los conteos de la card del plan salen de la lista de visitas: con números
   escritos a mano, agregar una visita dejaba el plan diciendo "2 Visits". */
const TOTAL_PROCEDIMIENTOS = VISITAS.reduce((a, v) => a + v.procedimientos.length, 0)

const PLANES: Plan[] = [
  { id: 'p1', estado: 'Accepted', date: '27, August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy', visitas: VISITAS.length, procedimientos: TOTAL_PROCEDIMIENTOS },
  { id: 'p2', estado: 'Inprogress', date: '27, August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy', visitas: VISITAS.length, procedimientos: TOTAL_PROCEDIMIENTOS },
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
  /* El calendario del día se despliega al costado cuando se toca la fecha o la hora (sólo en el paso 1). */
  const [tocoHorario, setTocoHorario] = useState(false)
  const [paso, setPaso] = useState<1 | 2>(1)
  const mostrarPanel = paso === 1 && tocoHorario
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

  const continuar = () => {
    setIntentado(true)
    if (obligatorios.some((k) => !d[k].trim())) return
    setPaso(2)
  }

  const guardar = () => {
    setIntentado(true)
    if (obligatorios.some((k) => !d[k].trim())) return
    const manejado = onGuardar?.(d)
    if (!manejado) {
      aviso.ok(
        editando
          ? \`Appointment for \${d.patient} updated.\`
          : \`Appointment for \${d.patient} booked at \${d.start}.\`,
      )
    }
    onClose()
  }

  return (
    <ModalShell
      title={titulo}
      description="Customize the schedule you want to see"
      onClose={onClose}
      width="max-w-[560px]"
      steps={['Patient and Scheduling', 'Link to treatment plan visit']}
      step={paso - 1}
      actions={<DrawerActions step={paso - 1} total={2} onNext={continuar} onBack={() => setPaso(1)} onCancel={onClose} onSave={guardar} />}
      aside={mostrarPanel ? <AppointmentSlotPicker seleccion={d.start} paciente={d.patient} onPick={elegirFranja} className="h-full rounded-none border-0" /> : undefined}
    >
      {paso === 1 ? (
        /* Como New Appointment de Confidentally 2.0: una columna, Requestor y Reason, Start y End, Operatory y Status de a
           dos. Al tocar la fecha o la hora se despliega al costado el calendario del día para elegir la franja. */
        <DrawerSection title="Patient and Scheduling" description="Complete the details below to schedule the appointment.">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Requestor" placeholder="Who is requesting?" value={d.requestor} onChange={set('requestor')} />
            <SelectField label="Reason for Visit" value={d.reason} onChange={set('reason')} />
          </div>
          {/* onFocus burbujea: uno solo alcanza para la fecha y las horas. Una vez abierto, el calendario se queda. */}
          <div onFocus={() => setTocoHorario(true)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* La fecha va en la columna izquierda, del ancho de Start Time (Drawer → Specs → Fields). */}
            <div className="flex flex-col gap-2 sm:col-start-1">
              <FieldLabel required>Date</FieldLabel>
              <DatePicker
                value={fecha}
                onChange={(nueva) => { set('date')(formatDMY(nueva)); setTocoHorario(true) }}
                placeholder="12-03-2025"
                error={!!req('date')}
                className="h-9 w-full"
              />
              <FieldError>{req('date')}</FieldError>
            </div>
            <SelectField label="Start Time" required placeholder="Select" options={HORAS.slice(0, -1)} value={d.start} onChange={set('start')} error={req('start')} className="sm:col-start-1" />
            <SelectField label="End Time" required placeholder="Select" options={HORAS.slice(1)} value={d.end} onChange={set('end')} error={req('end')} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Operatory" required value={d.operatory} onChange={set('operatory')} error={req('operatory')} />
            <SelectField label="Status" required value={d.status} onChange={set('status')} error={req('status')} />
          </div>
        </DrawerSection>
      ) : (
        /* Paso 2 de 2.0: el link a una visita del plan (opcional), Additional y las notas. */
        <div className="flex flex-col gap-6">
          <DrawerSection title="Link to treatment plan visit" description="Optional. Show this only when the appointment should be tied to a planned treatment visit.">
            <div className="flex flex-col gap-2">
              <FieldLabel>Treatment plan</FieldLabel>
              {PLANES.map((p) => <PlanCard key={p.id} plan={p} on={plan === p.id} onClick={() => setPlan(p.id)} />)}
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Visit</FieldLabel>
              {VISITAS.map((v) => <VisitRow key={v.id} visita={v} on={visita === v.id} onClick={() => setVisita(v.id)} />)}
            </div>
          </DrawerSection>
          <DrawerSection title="Additional">
            <div className="flex flex-col gap-2">
              <OptionCheckbox label="ASAP" checked={asap} onChange={setAsap} />
              <OptionCheckbox label="Follow-up" defaultChecked={false} />
              <OptionCheckbox label="Premedicate" defaultChecked={false} />
            </div>
            <TextArea label="Notes" placeholder="Add notes" value={d.notes} onChange={set('notes')} />
          </DrawerSection>
        </div>
      )}
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};