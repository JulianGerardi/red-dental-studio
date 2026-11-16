import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { useMemo, useState } from 'react'
import {
  ModalShell, SelectField, PersonSearchField, TextArea, chipsPersona, type ChipPersona,
  OptionCheckbox, FieldLabel, FieldError,
} from '@/components/patients/form'
import { DatePicker, formatDMY } from '@/components/ui/date-picker'
import { AppointmentSlotPicker, HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import {
  PlanCard, VisitRow, MoverVisitaDialog, type Plan, type Visita,
} from '@/components/scheduling/TreatmentPlanPicker'
import { aviso } from '@/components/ui/toaster'
import { EMPLEADOS } from '@/data/employees'

/* Figma 4430:61940 "Scheduling — Calendar (New Appointment Modal)".

   Rediseño sobre 3862:220908: las cards "Patient and Scheduling", "Details" y
   "Providers" se fundieron en Patient + Scheduling, y Additional Provider
   perdió el asterisco.

   Desde 2026-10-06 es un drawer con la organización de New Appointment de Confidentally 2.0: paso 1 "Patient and
   Scheduling" en una columna, paso 2 "Link to treatment plan visit" con Additional y las notas. El calendario del día
   (AppointmentSlotPicker) se despliega al costado del drawer cuando se toca la fecha o la hora. Ver
   design-reference/design-system.md, "Pop ups".

   Desde 2026-10-17, una visita que ya está linkeada a otro turno lo muestra en su fila y, al guardar, pregunta si se
   mueve (MoverVisitaDialog). Ver scheduling.md. */

const PACIENTES = ['John Smith', 'Noah James Smith', 'Maria Abril Viola', 'Elias Aguirre']
const PROVIDERS = ['Dr. Elena Martinez', 'Dr. Emily Chen', 'Dr. Salgado', 'Sarah Stone']

/* Julián: en el buscador de Patient faltaba la fecha de nacimiento y el email para desambiguar (antes los traía). No
   hay una ficha única para estos cuatro nombres (son de esta pantalla, no de la tabla de Patients ni de Billing/Ledger,
   que tienen su propio mock de 271), así que es mock propio, con el mismo formato que usa la tabla de Patients
   ("Month D, YYYY" y nombre.apellido@email.com). Ver scheduling.md, 2026-10-19. */
/* El número de paciente va al lado del nombre (los del HTML de ejemplo de Julián, 2026-11-11). */
const DATOS_PACIENTE: Record<string, { numero: string; nacimiento: string; email: string }> = {
  'John Smith': { numero: 'PT-00293', nacimiento: '06/14/1985', email: 'john.smith@email.com' },
  'Noah James Smith': { numero: 'PT-00218', nacimiento: '09/02/2018', email: 'noah.smith@email.com' },
  'Maria Abril Viola': { numero: 'PT-00147', nacimiento: '11/23/1991', email: 'maria.viola@email.com' },
  'Elias Aguirre': { numero: 'PT-00405', nacimiento: '03/05/1979', email: 'elias.aguirre@email.com' },
}
const pacienteNumero = (nombre: string) => DATOS_PACIENTE[nombre]?.numero
const pacienteChips = (nombre: string) => {
  const d = DATOS_PACIENTE[nombre]
  return d && chipsPersona(d.nacimiento, d.email)
}

/* El email del provider sale de la plantilla del consultorio (Settings → Employees), que ya los tiene cargados.
   "Dr. " es sólo el tratamiento que usa esta pantalla; el nombre de abajo es el que figura en Employees. */
/* El provider no es paciente: sin número; su cargo en gris y el email. */
const providerChips = (nombre: string): ChipPersona[] | undefined => {
  const e = EMPLEADOS.find((x) => x.nombre === nombre.replace(/^Dr\\.\\s*/, ''))
  return e && [{ label: 'Role', value: e.cargo, tone: 'neutral' }, { label: 'Email', value: e.email }]
}

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
  /* Ya linkeada a otro turno (cumplido): para usarla en éste hay que moverla. Igual que en el prototipo de Julián. */
  {
    id: 'v2', name: 'Visit 2', total: '$860.00',
    procedimientos: ['D0120 – Periodic oral evaluation', 'D1110 – Prophylaxis – adult'],
    vinculada: { fecha: '09/28/2026', hora: '1:15 PM', estado: 'Fulfilled' },
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
  operatorios,
  onGuardar,
  onClose,
}: {
  titulo?: string
  /** Las salas que se pueden elegir (las activas de la locación); sin esto, las de ejemplo. */
  operatorios?: string[]
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
  const elegida = VISITAS.find((v) => v.id === visita)
  /* La pregunta de mover la visita, abierta sobre el drawer. */
  const [moviendo, setMoviendo] = useState(false)
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
    setD((p) => ({ ...p, date: p.date || '12-03-2025', start: hora, end: HORAS[i + 1] ?? hora }))
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
    if (elegida?.vinculada) setMoviendo(true)
    else terminar()
  }

  const terminar = () => {
    const manejado = onGuardar?.(d)
    if (!manejado) {
      aviso.ok(
        editando
          ? \`Appointment for \${d.patient} updated.\`
          : \`Appointment for \${d.patient} booked at \${d.start}.\`,
      )
    }
    /* Toast aparte: el del turno lo arma a veces la pantalla que abrió el drawer. */
    if (elegida?.vinculada) aviso.ok(\`\${elegida.name} moved from the \${elegida.vinculada.fecha} appointment.\`)
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
      aside={mostrarPanel ? <AppointmentSlotPicker fecha={fecha ? fecha.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : undefined} seleccion={d.start} paciente={d.patient} onPick={elegirFranja} className="h-full rounded-none border-0" /> : undefined}
    >
      {paso === 1 ? (
        <div className="flex flex-col gap-6">
        {/* Una columna, campos de a dos en el orden de CON-4090: Status y Requestor, Reason y Date, Start y End, Operatory.
           Al tocar la fecha o la hora se despliega al costado el calendario del día para elegir la franja. */}
        <DrawerSection title="Patient and Scheduling" description="Complete the details below to schedule the appointment.">
          <PersonSearchField
            label="Patient" required placeholder="Search by name, number, DOB or email" personas={PACIENTES} subtitulo={pacienteNumero} chips={pacienteChips}
            value={d.patient} onChange={set('patient')} error={req('patient')}
          />
          <PersonSearchField
            label="Primary Provider" required placeholder="Search by name, role or email" personas={PROVIDERS} chips={providerChips}
            value={d.primary} onChange={set('primary')} error={req('primary')}
          />
          <PersonSearchField
            label="Additional Provider" placeholder="Search by name, role or email" personas={PROVIDERS} chips={providerChips}
            value={d.additional} onChange={set('additional')}
          />
          {/* Status arriba, con Requestor: de él dependen los obligatorios de abajo (CON-4090; scheduling.md, 2026-11-12). */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Status" required value={d.status} onChange={set('status')} error={req('status')} />
            <SelectField label="Requestor" placeholder="Who is requesting?" value={d.requestor} onChange={set('requestor')} />
          </div>
          {/* Tocar la fecha o una hora despliega el calendario del día al costado; una vez abierto, se queda. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Reason for Visit" value={d.reason} onChange={set('reason')} />
            <div onFocus={() => setTocoHorario(true)} className="flex flex-col gap-2">
              <FieldLabel required>Date</FieldLabel>
              <DatePicker
                value={fecha}
                onChange={(nueva) => { set('date')(formatDMY(nueva)); setTocoHorario(true) }}
                error={!!req('date')}
                className="h-9 w-full"
              />
              <FieldError>{req('date')}</FieldError>
            </div>
          </div>
          <div onFocus={() => setTocoHorario(true)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Start Time" required placeholder="Select" options={HORAS.slice(0, -1)} value={d.start} onChange={set('start')} error={req('start')} />
            <SelectField label="End Time" required placeholder="Select" options={HORAS.slice(1)} value={d.end} onChange={set('end')} error={req('end')} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Operatory" required options={operatorios} value={d.operatory} onChange={set('operatory')} error={req('operatory')} />
          </div>
        </DrawerSection>
        {/* Additional y Notes pasan al paso 1, como red.dev y CON-4090: el paso 2 queda sólo para linkear la visita. */}
        <DrawerSection title="Additional">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <OptionCheckbox label="ASAP" checked={asap} onChange={setAsap} />
            <OptionCheckbox label="Follow-up" defaultChecked={false} />
            <OptionCheckbox label="Premedicate" defaultChecked={false} />
          </div>
          <TextArea label="Notes" placeholder="Add notes" value={d.notes} onChange={set('notes')} />
        </DrawerSection>
        </div>
      ) : (
        /* Paso 2 de 2.0: el link a una visita del plan (opcional). */
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
      )}
      {moviendo && elegida?.vinculada && (
        <MoverVisitaDialog visita={elegida.name} turno={elegida.vinculada} onConfirm={terminar} onCancel={() => setMoviendo(false)} />
      )}
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};