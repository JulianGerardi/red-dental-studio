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
   "Providers" se fundieron en Patient + Scheduling, y Additional Provider
   perdió el asterisco.

   Julián pidió después separar el modal en dos pasos (no viene del Figma):
   paso 1 es Patient + Scheduling + Additional, paso 2 es el link al treatment
   plan -antes vivían los dos en la misma pantalla, apretados uno al lado del
   otro-. `paso` maneja cuál se ve; "Continue" valida los obligatorios del
   paso 1 antes de dejar pasar al 2.

   La columna de horarios sigue a la derecha del formulario, hermana suya
   dentro de un mismo frame (757 + 190 = 947), pegada y sin montarse. Sólo
   aparece en el paso 1, que es el único con campos de horario.

   La dispara **ASAP**: es el único checkbox tildado en el frame donde la
   columna aparece. Es una inferencia — ver README.md, Desviaciones. */

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
  /* Antes el panel de franjas horarias sólo salía con ASAP tildado -un
     disparador raro para algo que sólo tiene que ver con "mostrame dónde cae
     el turno"-. Ahora sale al tocar cualquier campo de Scheduling (el
     `onFocus` de React burbujea, así que uno solo alcanza para todo el
     grupo), y ASAP lo sigue mostrando también, no lo reemplaza. Sólo aplica
     en el paso 1 -en el 2 no hay campos de horario que lo disparen-. */
  const [tocoHorario, setTocoHorario] = useState(false)
  /* Julián pidió separar el modal en dos pasos: primero paciente/proveedor/
     horario, recién después el link al treatment plan -antes iba todo junto
     en una sola pantalla larga-. */
  const [paso, setPaso] = useState<1 | 2>(1)
  const mostrarPanel = paso === 1 && (asap || tocoHorario)
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
      footer={
        paso === 1 ? (
          <FormFooter onCancel={onClose} onSave={continuar} saveLabel="Continue" />
        ) : (
          <FormFooter onCancel={() => setPaso(1)} onSave={guardar} cancelLabel="Back" />
        )
      }
      aside={
        mostrarPanel ? (
          <AppointmentSlotPicker
            seleccion={d.start}
            paciente={d.patient}
            onPick={elegirFranja}
            className="h-full w-[190px] rounded-l-none border-l-0 shadow-[0_4px_14px_0_rgb(100_100_100/0.25)] lg:h-full max-lg:max-h-[340px] max-lg:w-full max-lg:rounded-xl max-lg:border-l"
          />
        ) : undefined
      }
    >
      <p className="-mt-2 mb-4 text-[10px] font-semibold tracking-wide text-[#71717a] uppercase">
        Step {paso} of 2 — {paso === 1 ? 'Patient & Scheduling' : 'Treatment Plan'}
      </p>

      {paso === 1 ? (
        /* Julián pidió Patient y Scheduling lado a lado -eran la columna
           izquierda entera, apiladas- y Additional abajo de las dos, ocupando
           todo el ancho: así entra toda la info del paso de un vistazo, sin
           tener que bajar por una columna angosta. */
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Patient">
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
            </SectionCard>

            {/* onFocus -no onClick- porque el primer campo suele ser el
                DatePicker, que abre un popover en vez de "clickearse" él
                mismo; onFocus de React burbujea, así que uno solo alcanza para
                todo el grupo. Una vez que aparece, se queda -no tiene sentido
                que el panel entre y salga cada vez que el foco se mueve dentro
                del mismo grupo de campos-. */}
            <div onFocus={() => setTocoHorario(true)}>
            <SectionCard title="Scheduling">
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
            </div>
          </div>

          <SectionCard title="Additional">
            {/* Los tres iban uno debajo del otro -SectionCard los apila por
                default- y hacían bastante scroll para algo que es sólo tres
                casilleros cortos. Van en fila; cada uno en flex-1 para que
                `OptionCheckbox` (que ya es w-full) reparta el ancho parejo. */}
            <div className="flex flex-wrap gap-3">
              <div className="min-w-[160px] flex-1"><OptionCheckbox label="ASAP" checked={asap} onChange={setAsap} /></div>
              <div className="min-w-[160px] flex-1"><OptionCheckbox label="Follow-up" defaultChecked={false} /></div>
              <div className="min-w-[160px] flex-1"><OptionCheckbox label="Premedicate" defaultChecked={false} /></div>
            </div>
            <TextArea label="Notes" placeholder="Add notes" value={d.notes} onChange={set('notes')} />
          </SectionCard>
        </div>
      ) : (
        /* El link a un plan de tratamiento pasó a ser su propio paso -antes
           vivía apretado al lado de Patient/Scheduling-. Llegar acá ya
           implica que el paciente está elegido (es obligatorio en el paso 1),
           así que no hace falta re-chequear d.patient.

           Treatment plans y Visit iban los dos adentro de una sola card, uno
           debajo del otro. Primero se separaron en dos filas, pero Julián
           las quería lado a lado -Treatment a la izquierda, Visit a la
           derecha-, igual que Patient/Scheduling en el paso 1. */
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Treatment plans">
            {PLANES.map((p) => (
              <PlanCard key={p.id} plan={p} on={plan === p.id} onClick={() => setPlan(p.id)} />
            ))}
          </SectionCard>

          <SectionCard title="Visit">
            {VISITAS.map((v) => (
              <VisitRow key={v.id} visita={v} on={visita === v.id} onClick={() => setVisita(v.id)} />
            ))}
          </SectionCard>
        </div>
      )}
    </ModalShell>
  )
}
