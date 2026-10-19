import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentCard, AppointmentCardCompacta, type AccionTurno, type Appointment } from '@/components/dashboard/AppointmentCard'
import { TURNOS_PATIENTS } from '@/components/dashboard/dashboard-data'
import { PatientDetailsPopover } from '@/components/dashboard/PatientDetailsPopover'
import { NewAppointmentModal } from '@/components/scheduling/NewAppointmentModal'
import { PatientAppointmentCard, PATIENT_APPOINTMENT_TONES, type PatientAppointmentStatus } from '@/components/patients/PatientAppointmentCard'
import { SolicitudCard } from '@/pages/Scheduling'
import { SOLICITUDES, type Solicitud } from '@/components/scheduling/requests-data'
import { BARRA_TONOS } from '@/components/scheduling/TarjetaTurno'
import { TurnoCalendario, type FormaTurno } from '@/components/scheduling/TurnoCalendario'
import { AppointmentDetailsDrawer } from '@/components/scheduling/AppointmentDetailsDrawer'
import { HOUR_PX, LEGEND, fmtExacta, type ApptState } from '@/components/scheduling/calendar-data'
import { aviso } from '@/components/ui/toaster'
import { formatDMY } from '@/components/ui/date-picker'
import { HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import { Bloque, Forzar, Lienzo, Tabla, TablaPartes, Token, medidasDe, type Medidas } from './kit'

/* Las cuatro cards de un turno, cada una con su componente real: la del
   Dashboard, la fila de Patients, la del Overview del paciente y el turno del
   calendario de Scheduling. Más la solicitud de turno, que es la misma card
   que la del Overview (TarjetaTurno). */

const CARDS = ['Dashboard', 'Patients list', 'Patient overview', 'Appointment request', 'Scheduling calendar'] as const
type Card = (typeof CARDS)[number]

const FORMAS = { 'Day / Week block': 'bloque', 'Month chip': 'chip', 'Phone day list': 'fila' } as const satisfies Record<string, FormaTurno>
type Forma = keyof typeof FORMAS

/* El ancho que tiene cada una en la app (aprox.), para cuando width es 0. */
const ANCHO: Record<Card | FormaTurno, number> = {
  Dashboard: 360, 'Patients list': 300, 'Patient overview': 248, 'Appointment request': 248, 'Scheduling calendar': 160,
  bloque: 160, chip: 140, fila: 340,
}

const ESTADOS_PACIENTE: PatientAppointmentStatus[] = ['Booked', 'Fulfilled', 'No Show', 'Cancelled']

type Args = {
  card: Card
  name: string
  time: string
  provider: string
  operatory: string
  reason: string
  action: AccionTurno
  status: PatientAppointmentStatus
  cancellable: boolean
  request: 'ASAP' | 'Waiting List'
  waiting: string
  state: ApptState
  shape: Forma
  duration: number
  width: number
}

const inicialesDe = (nombre: string) =>
  nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()
/* "10:30" -> 10.5, la hora decimal con la que trabaja el calendario. */
const horaDecimal = (t: string) => {
  const [h = 10, m = 0] = t.split(':').map(Number)
  return (Number.isFinite(h) ? h : 10) + (Number.isFinite(m) ? m : 0) / 60
}

/* Como en el Dashboard: el modal trabaja con franjas de una hora ("10 AM"). */
const franjaDe = (t: string) => {
  const i = HORAS.findIndex((x) => Number(x.slice(0, 2)) === Math.floor(horaDecimal(t)))
  return i < 0 ? {} : { start: HORAS[i], end: HORAS[i + 1] ?? '' }
}

const meta = {
  title: 'Elements/Appointment cards',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: [
        'components/dashboard/AppointmentCard.tsx',
        'components/patients/PatientAppointmentCard.tsx',
        'components/scheduling/TarjetaTurno.tsx',
        'components/scheduling/TurnoCalendario.tsx',
      ],
      description: {
        component: [
          'Un turno se muestra en cuatro lugares y en cada uno con la card que le sirve a ese lugar. Las cuatro son el mismo turno: mismo paciente, misma hora, mismo estado.',
          '',
          '- **Dashboard** (`AppointmentCard`): la de trabajo del día, en Appointments y Waiting Room. Trae todo para atender sin abrir nada y la acción que sigue.',
          '- **Patients list** (`AppointmentCard compact`): una fila en Today Appointments, al costado de la lista de pacientes. Sólo quién y a qué hora; el kebab abre Edit y Go to appointment.',
          '- **Patient overview** (`PatientAppointmentCard`): los turnos de un paciente, con su estado. Sólo el que todavía se puede cancelar tiene Cancel.',
          '- **Appointment request** (`SolicitudCard`, en el panel *Appointment requests* de Scheduling): un pedido de turno, ASAP o en lista de espera, con Cancel y Schedule. **Es la misma card que Patient overview** (`TarjetaTurno`): barra de 3px a la izquierda y pill del mismo color, avatar, motivo, fecha y lugar, y las acciones abajo a la derecha.',
          '- **Scheduling calendar** (`TurnoCalendario`): el turno en la agenda, del color de su estado. Bloque en Day y Week, chip en Month y fila en el celular.',
          '',
          '**Probalo:** en *Playground* elegí la card con *card* y cambiá paciente, hora y estado. Tocá cada una: abren lo mismo que en la app (la ficha rápida del paciente, el detalle del turno, el modal de edición).',
        ].join('\n'),
      },
    },
  },
  args: {
    card: 'Dashboard', name: 'Noah James', time: '10:00', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2',
    reason: 'Routine cleaning appointment', action: 'Check Out', status: 'Booked', cancellable: true,
    request: 'ASAP', waiting: 'Waiting 4 days',
    state: 'Booked', shape: 'Day / Week block', duration: 1, width: 0,
  },
  argTypes: {
    card: { control: 'select', options: CARDS, description: 'Cuál de las cuatro cards.' },
    name: { control: 'text', description: 'Paciente: las iniciales salen de acá. Probá uno largo: se recorta, no salta de renglón.' },
    time: { control: 'text', description: 'Hora del turno, HH:MM (24 h).' },
    provider: { control: 'text', description: 'Profesional. Dashboard, Patients list y el detalle del calendario.' },
    operatory: { control: 'text', description: 'Sala. Dashboard y el detalle del calendario.' },
    reason: { control: 'text', description: 'Motivo. Patient overview y el detalle del calendario.' },
    action: { control: 'inline-radio', options: ['Check In', 'Check Out', 'Cancel'], description: 'El botón del pie: la acción que sigue. El color la dice: Check In verde, Check Out azul, Cancel rojo.', if: { arg: 'card', eq: 'Dashboard' } },
    status: { control: 'inline-radio', options: ESTADOS_PACIENTE, description: 'Estado del turno: el tono de la pill.', if: { arg: 'card', eq: 'Patient overview' } },
    cancellable: { control: 'boolean', description: 'Si todavía se puede cancelar: muestra Cancel.', if: { arg: 'card', eq: 'Patient overview' } },
    request: { control: 'inline-radio', options: ['ASAP', 'Waiting List'], description: 'Tipo de solicitud: ASAP en rojo, lista de espera en azul (barra y pill).', if: { arg: 'card', eq: 'Appointment request' } },
    waiting: { control: 'text', description: 'Lista de espera: hace cuánto espera. Es el texto de la pill.', if: { arg: 'card', eq: 'Appointment request' } },
    state: { control: 'select', options: LEGEND.map((l) => l.state), description: 'Estado en la agenda: el color del fondo, la barra y la hora.', if: { arg: 'card', eq: 'Scheduling calendar' } },
    shape: { control: 'inline-radio', options: Object.keys(FORMAS), description: 'Bloque en Day y Week, chip en Month, fila en la lista del día del celular.', if: { arg: 'card', eq: 'Scheduling calendar' } },
    duration: { control: { type: 'range', min: 0.25, max: 3, step: 0.25 }, description: 'Duración en horas: el alto del bloque (63px por hora).', if: { arg: 'card', eq: 'Scheduling calendar' } },
    width: { control: { type: 'range', min: 0, max: 560, step: 10 }, description: 'Ancho en px. 0 = el que tiene en la app.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo(a: Args) {
  const [ficha, setFicha] = useState<DOMRect | null>(null)
  const [editando, setEditando] = useState(false)
  const [detalle, setDetalle] = useState<DOMRect | null>(null)
  const forma = FORMAS[a.shape]
  const ancho = a.width || ANCHO[a.card === 'Scheduling calendar' ? forma : a.card]
  const appt: Appointment = { name: a.name, initials: inicialesDe(a.name), provider: a.provider, operatory: a.operatory, time: a.time, accion: a.action }
  const inicio = horaDecimal(a.time)

  if (a.card === 'Dashboard')
    return (
      <div style={{ width: ancho, maxWidth: '100%' }}>
        <AppointmentCard appt={appt} id="demo" activa={!!ficha} onSelect={(_, el) => setFicha(el.getBoundingClientRect())} onEdit={() => setEditando(true)} />
        {ficha && <PatientDetailsPopover name={appt.name} initials={appt.initials} anchor={ficha} onClose={() => setFicha(null)} />}
        {editando && (
          <NewAppointmentModal
            titulo="Edit Appointment"
            inicial={{ patient: a.name, primary: a.provider, operatory: a.operatory, reason: a.reason, status: 'Check-in', date: formatDMY(new Date()), ...franjaDe(a.time) }}
            onClose={() => setEditando(false)}
          />
        )}
      </div>
    )
  if (a.card === 'Patients list')
    return (
      <div style={{ width: ancho, maxWidth: '100%' }}>
        <AppointmentCard appt={appt} compact onEdit={() => setEditando(true)} />
        {editando && (
          <NewAppointmentModal
            titulo="Edit Appointment"
            inicial={{ patient: a.name, primary: a.provider, operatory: a.operatory, reason: a.reason, status: 'Check-in', date: formatDMY(new Date()), ...franjaDe(a.time) }}
            onClose={() => setEditando(false)}
          />
        )}
      </div>
    )
  if (a.card === 'Patient overview')
    return (
      <div style={{ width: ancho, maxWidth: '100%' }}>
        <PatientAppointmentCard
          name={a.name}
          initials={appt.initials}
          status={a.status}
          reason={a.reason}
          when={`12 Mar 2025 · ${fmtExacta(inicio)}`}
          place="Los Angeles - 789 N Sunrise Street"
          onCancel={a.cancellable ? () => aviso.warn('Appointment cancelled.') : undefined}
        />
      </div>
    )
  if (a.card === 'Appointment request') {
    const s: Solicitud = {
      ...SOLICITUDES[0], tipo: a.request, patient: a.name, reason: a.reason,
      start: franjaDe(a.time).start ?? '10 AM', end: franjaDe(a.time).end ?? '11 AM', espera: a.waiting,
    }
    return (
      <div style={{ width: ancho, maxWidth: '100%' }}>
        <SolicitudCard s={s} onCancel={() => aviso.warn(`Request for ${a.name} was cancelled.`)} onSchedule={() => setEditando(true)} />
        {editando && (
          <NewAppointmentModal
            inicial={{ patient: a.name, primary: a.provider, operatory: a.operatory, reason: a.reason, date: s.date, start: s.start, end: s.end }}
            onClose={() => setEditando(false)}
          />
        )}
      </div>
    )
  }
  return (
    <div style={{ width: ancho, maxWidth: '100%' }}>
      <TurnoCalendario
        evento={{ start: inicio, patient: a.name, state: a.state }}
        forma={forma}
        className="w-full"
        style={forma === 'bloque' ? { height: a.duration * HOUR_PX } : undefined}
        onClick={(e) => setDetalle(e.currentTarget.getBoundingClientRect())}
      />
      {detalle && (
        <AppointmentDetailsDrawer
          patient={a.name}
          estado={a.state}
          hora={fmtExacta(inicio)}
          duracion={a.duration}
          fecha={new Date()}
          provider={a.provider}
          room={a.operatory}
          reason={a.reason}
          anchor={detalle}
          onClose={() => setDetalle(null)}
        />
      )}
    </div>
  )
}

/* Elegí la card y cambiá los datos; tocala para ver qué abre. */
export const Playground: Story = { render: (args) => <Demo {...args} /> }

const NOAH: Appointment = { name: 'Noah James', initials: 'NJ', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time: '10:00', accion: 'Check Out' }
const nada = () => {}

/* Cuál va dónde: las cuatro con el mismo turno. */
export const WhichCardWhere: Story = {
  name: 'Which card goes where',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabla encabezado={['Card', 'Where', 'What it shows', 'Click opens']} minimo={960} arriba>
      <tr>
        <td><div className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></div></td>
        <td className="font-semibold">Dashboard<br /><span className="font-normal text-ink-muted">Appointments · Waiting Room</span></td>
        <td className="text-ink-medium">Paciente, profesional, sala, hora y la acción que sigue. TR y CC son los chips del frame de Figma.</td>
        <td className="text-ink-medium">La ficha rápida del paciente. El kebab: editar el turno.</td>
      </tr>
      <tr>
        <td><div className="w-[300px]"><AppointmentCard appt={NOAH} compact /></div></td>
        <td className="font-semibold">Patients<br /><span className="font-normal text-ink-muted">Today Appointments</span></td>
        <td className="text-ink-medium">Paciente, hora y profesional.</td>
        <td className="text-ink-medium">El kebab: Edit abre el modal del turno; Go to appointment lleva a Scheduling.</td>
      </tr>
      <tr>
        <td><div className="w-[300px]"><PatientAppointmentCard name="Noah James" initials="NJ" status="Booked" reason="Routine cleaning appointment" when="12 Mar 2025 · 10:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={nada} /></div></td>
        <td className="font-semibold">Patient overview<br /><span className="font-normal text-ink-muted">Appointments</span></td>
        <td className="text-ink-medium">Estado, motivo, fecha y lugar. El paciente ya se sabe: es su ficha.</td>
        <td className="text-ink-medium">Cancel, si todavía se puede.</td>
      </tr>
      <tr>
        <td><div className="w-[300px]"><SolicitudCard s={SOLICITUDES[0]} onCancel={nada} onSchedule={nada} /></div></td>
        <td className="font-semibold">Scheduling<br /><span className="font-normal text-ink-muted">Appointment requests</span></td>
        <td className="text-ink-medium">Paciente, urgencia (ASAP) o cuánto espera, motivo, fecha pedida y lugar. Misma card que Patient overview.</td>
        <td className="text-ink-medium">Schedule abre New Appointment con lo que pidió el paciente; Cancel la saca de la lista (con Undo).</td>
      </tr>
      <tr>
        <td>
          <div className="flex w-[300px] flex-col gap-2">
            <TurnoCalendario evento={{ start: 10, patient: 'Noah James', state: 'Booked' }} forma="bloque" className="w-40" style={{ height: HOUR_PX }} />
            <TurnoCalendario evento={{ start: 10, patient: 'Noah James', state: 'Booked' }} forma="chip" className="w-36" />
            <TurnoCalendario evento={{ start: 10, patient: 'Noah James', state: 'Booked' }} forma="fila" className="w-full" />
          </div>
        </td>
        <td className="font-semibold">Scheduling<br /><span className="font-normal text-ink-muted">Calendar</span></td>
        <td className="text-ink-medium">Hora y paciente, del color del estado. Bloque en Day y Week, chip en Month, fila en el celular.</td>
        <td className="text-ink-medium">El detalle del turno. Se arrastra para cambiarlo de hora o de día.</td>
      </tr>
    </Tabla>
  ),
}

/* Patient overview y Appointment request: una sola card (TarjetaTurno), parte por parte. */
export const OneCardParts: Story = {
  name: 'Patient overview and request: one card',
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Side by side" nota="Las dos al ancho de la app (248px): la columna Appointments del Patient Dashboard y el panel Appointment requests de Scheduling. Antes la del paciente no tenía la barra y la de la solicitud tenía un punto en vez del avatar, su propia pill y botones de 11px.">
        <div className="flex flex-wrap items-start gap-6">
          <div className="w-[248px]"><PatientAppointmentCard name="Maria Abril Viola" initials="av" status="Booked" reason="Routine cleaning appointment" when="12 Mar 2025 · 10:00 - 11:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={nada} /></div>
          <div className="w-[248px]"><SolicitudCard s={SOLICITUDES[0]} onCancel={nada} onSchedule={nada} /></div>
        </div>
      </Bloque>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Barra', '3px a la izquierda, del color de la pill: el estado o la urgencia se lee de reojo en la lista, como en los bloques del calendario.', 'BARRA_TONOS'],
          ['Superficie', 'La de toda card adentro de un panel: blanca, línea de medio pixel y sombra suave.', 'InnerCard'],
          ['Avatar', 'Iniciales en blanco sobre azul, 24px. Sin iniciales, salen del nombre.', 'Avatar'],
          ['Nombre', '12px Semibold. Si no entra baja a un segundo renglón y recién ahí se recorta (el nombre completo queda en el title).', 'span'],
          ['Pill', 'Estado del turno (Booked, Fulfilled, No Show, Cancelled) o de la solicitud (ASAP, cuánto espera).', 'Pill'],
          ['Motivo, fecha y lugar', '11px gris, un renglón cada uno y recortados: la card no crece en una columna angosta.', 'p'],
          ['Acciones', 'Abajo a la derecha, ui/button sm (28px). Sin acciones no hay pie.', 'Button'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

function Fila({ estado, nota, children }: { estado: string; nota: string; children: ReactNode }) {
  return (
    <tr>
      <td className="font-semibold whitespace-nowrap">{estado}</td>
      <td>{children}</td>
      <td className="text-ink-medium">{nota}</td>
    </tr>
  )
}

export const DashboardStates: Story = {
  name: 'Dashboard card: states',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={760}>
      <Fila estado="Default" nota="Un turno del día, con la acción que sigue.">
        <div className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Hover" nota="Fondo apenas azulado: la card se puede tocar.">
        <Forzar selector=":scope > div" estado="hover" className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></Forzar>
      </Fila>
      <Fila estado="Keyboard focus" nota="Con Tab se llega al paciente; Enter abre su ficha.">
        <Forzar selector="button[aria-expanded]" estado="focus-visible" className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></Forzar>
      </Fila>
      <Fila estado="Selected" nota="Anillo azul mientras la ficha rápida del paciente está abierta: dice de qué card salió.">
        <div className="w-[340px] p-1.5"><AppointmentCard appt={NOAH} activa onSelect={nada} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Menu open" nota="El kebab: Edit appointment abre el modal con los datos de la card.">
        <Forzar selector='button[aria-label^="Actions for"]' estado="click" className="w-[340px] pb-12"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></Forzar>
      </Fila>
      <Fila estado="Check In" nota="El paciente todavía no llegó: la acción que sigue es recibirlo. Verde (Button success).">
        <div className="w-[340px]"><AppointmentCard appt={{ ...NOAH, accion: 'Check In' }} onSelect={nada} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Cancel" nota="Un turno que todavía no llegó: la acción que sigue es cancelarlo. Rojo (Button destructive).">
        <div className="w-[340px]"><AppointmentCard appt={{ ...NOAH, accion: 'Cancel' }} onSelect={nada} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Long name" nota="El nombre se recorta: los chips no bajan de renglón.">
        <div className="w-[340px]"><AppointmentCard appt={{ ...NOAH, name: 'Maria Abril Viola Fernández de la Torre', initials: 'MA' }} onSelect={nada} onEdit={nada} /></div>
      </Fila>
    </Tabla>
  ),
}

const KEBAB = 'button[aria-label^="Actions for"]'

export const PatientsListStates: Story = {
  name: 'Patients list card: states',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={760}>
      <Fila estado="Default" nota="Un turno del día: quién, a qué hora y con quién. La card no se toca; se actúa desde el kebab.">
        <div className="w-[300px]"><AppointmentCardCompacta appt={NOAH} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Kebab hover" nota="El kebab de las tablas (RowActionsMenu): fondo gris al pasar el mouse.">
        <Forzar selector={KEBAB} estado="hover" className="w-[300px]"><AppointmentCardCompacta appt={NOAH} onEdit={nada} /></Forzar>
      </Fila>
      <Fila estado="Menu open" nota="Con Tab se llega al kebab y Enter lo abre. Edit abre el modal Edit Appointment con los datos de la card (guardar avisa y cierra: los turnos del día no cambian acá). Go to appointment lleva a Scheduling.">
        <div className="h-28 w-[300px]"><AppointmentCardCompacta appt={NOAH} onEdit={nada} menuAbierto /></div>
      </Fila>
      <Fila estado="Long name" nota="El nombre se recorta: el kebab no baja de renglón.">
        <div className="w-[300px]"><AppointmentCardCompacta appt={{ ...NOAH, name: 'Maria Abril Viola Fernández de la Torre', initials: 'MA' }} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Ten appointments" nota="Today Appointments muestra los 10 del día, con scroll adentro del panel; sin “View all”.">
        <div className="flex h-72 w-[300px] flex-col gap-3 overflow-y-auto p-1">
          {TURNOS_PATIENTS.map((t, i) => <AppointmentCardCompacta key={i} appt={t} onEdit={nada} />)}
        </div>
      </Fila>
    </Tabla>
  ),
}

const SIGNIFICADO_PACIENTE: Record<PatientAppointmentStatus, string> = {
  Booked: 'Confirmado y por venir: es el único que se puede cancelar.',
  Fulfilled: 'El paciente vino y se atendió.',
  'No Show': 'El paciente no vino.',
  Cancelled: 'Se canceló.',
}

export const PatientOverviewStates: Story = {
  name: 'Patient overview card: states',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabla encabezado={['Status', 'Sample', 'What it means']} minimo={680}>
      {ESTADOS_PACIENTE.map((s) => (
        <Fila key={s} estado={s} nota={SIGNIFICADO_PACIENTE[s]}>
          <div className="w-[248px]">
            <PatientAppointmentCard name="Maria Abril Viola" initials="av" status={s} reason="Routine cleaning appointment" when="12 Mar 2025 · 10:00 - 11:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={s === 'Booked' ? nada : undefined} />
          </div>
        </Fila>
      ))}
      <Fila estado="Long name" nota="El nombre baja a un segundo renglón; si tampoco entra, se recorta. La pill no se mueve.">
        <div className="w-[248px]">
          <PatientAppointmentCard name="Maria Abril Viola Fernández de la Torre" initials="MA" status="Booked" reason="Routine cleaning appointment and full-mouth radiographs" when="12 Mar 2025 · 10:00 - 11:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={nada} />
        </div>
      </Fila>
    </Tabla>
  ),
}

const [ASAP, , ESPERA] = SOLICITUDES

export const RequestStates: Story = {
  name: 'Request card: states',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={680}>
      <Fila estado="ASAP" nota="Quiere el primer lugar libre: barra y pill en rojo.">
        <div className="w-[248px]"><SolicitudCard s={ASAP} onCancel={nada} onSchedule={nada} /></div>
      </Fila>
      <Fila estado="Waiting List" nota="En lista de espera: nada es urgente, barra y pill en azul. La pill dice cuánto espera.">
        <div className="w-[248px]"><SolicitudCard s={ESPERA} onCancel={nada} onSchedule={nada} /></div>
      </Fila>
      <Fila estado="Schedule hover" nota="Schedule es la acción principal (primary sm); Cancel, la secundaria.">
        <Forzar selector="button:last-child" estado="hover" className="w-[248px]"><SolicitudCard s={ASAP} onCancel={nada} onSchedule={nada} /></Forzar>
      </Fila>
      <Fila estado="Keyboard focus" nota="Con Tab se llega a Cancel y a Schedule: el anillo azul de ui/button.">
        <Forzar selector="button:last-child" estado="focus-visible" className="w-[248px] p-1"><SolicitudCard s={ASAP} onCancel={nada} onSchedule={nada} /></Forzar>
      </Fila>
      <Fila estado="Phone" nota="En el celular el panel mide 260 y la card 228: los nombres largos bajan a un segundo renglón.">
        <div className="w-[228px]"><SolicitudCard s={ESPERA} onCancel={nada} onSchedule={nada} /></div>
      </Fila>
    </Tabla>
  ),
}

const SIGNIFICADO_AGENDA: Record<ApptState, string> = {
  Proposed: 'Propuesto al paciente, todavía sin confirmar.',
  'Check-in': 'El paciente llegó y está en la sala de espera.',
  Booked: 'Confirmado.',
  'In progress': 'Se lo está atendiendo.',
  Fulfilled: 'Atendido.',
  'No-show': 'No vino.',
  Cancelled: 'Cancelado: queda en la agenda, en gris.',
}

export const CalendarStates: Story = {
  name: 'Calendar: states and shapes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabla encabezado={['State', 'Day / Week block', 'Month chip', 'Phone day list', 'What it means']} minimo={940}>
      {LEGEND.map(({ state }) => {
        const evento = { start: 10, patient: 'Noah James', state }
        return (
          <tr key={state}>
            <td className="font-semibold whitespace-nowrap">{state}</td>
            <td><TurnoCalendario evento={evento} forma="bloque" className="w-36" style={{ height: HOUR_PX * 0.75 }} /></td>
            <td><TurnoCalendario evento={evento} forma="chip" className="w-32" /></td>
            <td><TurnoCalendario evento={evento} forma="fila" className="w-64" /></td>
            <td className="text-ink-medium">{SIGNIFICADO_AGENDA[state]}</td>
          </tr>
        )
      })}
    </Tabla>
  ),
}

/* Qué se mide y de cuál muestra. */
const MEDIDAS: [string, string, string][] = [
  ['Dashboard · card', 'dash', '[data-appt-card]'],
  ['Dashboard · photo', 'dash', '.size-11'],
  ['Dashboard · field', 'dash', '.bg-dash-field'],
  ['Dashboard · action', 'dash', '[data-appt-card] > button'],
  ['Patients list · row', 'fila', ':scope > div'],
  ['Patient overview · card', 'over', ':scope > div'],
  ['Appointment request · card', 'soli', ':scope > div'],
  ['Calendar · block (1 h)', 'cal', 'button'],
  ['Calendar · chip', 'chip', 'button'],
]

function Medicion() {
  const refs = { dash: useRef<HTMLDivElement>(null), fila: useRef<HTMLDivElement>(null), over: useRef<HTMLDivElement>(null), soli: useRef<HTMLDivElement>(null), cal: useRef<HTMLDivElement>(null), chip: useRef<HTMLDivElement>(null) }
  const [filas, setFilas] = useState<(Medidas | null)[]>([])
  useLayoutEffect(() => {
    setFilas(MEDIDAS.map(([, cual, sel]) => {
      const el = refs[cual as keyof typeof refs].current?.querySelector<HTMLElement>(sel)
      return el ? medidasDe(el) : null
    }))
  }, [])
  return (
    <Lienzo className="max-w-none">
      <div className="flex flex-wrap items-start gap-6">
        <div ref={refs.dash} className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></div>
        <div className="flex flex-col gap-4">
          <div ref={refs.fila} className="w-[300px]"><AppointmentCard appt={NOAH} compact /></div>
          <div ref={refs.over} className="w-[248px]"><PatientAppointmentCard name="Noah James" initials="NJ" status="Booked" reason="Routine cleaning appointment" when="12 Mar 2025 · 10:00 AM" place="Los Angeles - 789 N Sunrise Street" /></div>
          <div ref={refs.soli} className="w-[248px]"><SolicitudCard s={SOLICITUDES[0]} onCancel={nada} onSchedule={nada} /></div>
        </div>
        <div className="flex flex-col gap-4">
          <div ref={refs.cal} className="w-40"><TurnoCalendario evento={{ start: 10, patient: 'Noah James', state: 'Booked' }} forma="bloque" className="w-full" style={{ height: HOUR_PX }} /></div>
          <div ref={refs.chip} className="w-36"><TurnoCalendario evento={{ start: 10, patient: 'Noah James', state: 'Booked' }} forma="chip" className="w-full" /></div>
        </div>
      </div>
      <Bloque titulo="Sizes" nota="Medidas leídas de las muestras de arriba.">
        <Tabla encabezado={['Part', 'Width', 'Height', 'Padding', 'Text', 'Radius']} minimo={640}>
          {MEDIDAS.map(([parte], i) => {
            const m = filas[i]
            return (
              <tr key={parte}>
                <td className="font-semibold whitespace-nowrap">{parte}</td>
                <td className="tabular-nums">{m?.ancho ?? '—'}</td>
                <td className="tabular-nums">{m?.alto ?? '—'}</td>
                <td className="tabular-nums">{m?.padding ?? '—'}</td>
                <td className="tabular-nums">{m ? `${m.texto} · ${m.peso}` : '—'}</td>
                <td className="tabular-nums">{m?.radio ?? '—'}</td>
              </tr>
            )
          })}
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={560}>
          <tr><td className="font-semibold">Dashboard · photo and Check Out</td><td><Token nombre="dash-blue" /> · hover <Token nombre="dash-blue-hover" /></td></tr>
          <tr><td className="font-semibold">Dashboard · Check In</td><td><Token nombre="dash-ok-fg" /> · hover <Token nombre="green-deep" /></td></tr>
          <tr><td className="font-semibold">Dashboard · Cancel</td><td><Token nombre="dash-bad-fg" /> · hover <Token nombre="dash-bad-hover" /></td></tr>
          <tr><td className="font-semibold">Dashboard · fields and time</td><td><Token nombre="dash-field" /></td></tr>
          <tr><td className="font-semibold">Dashboard · selected ring</td><td><Token nombre="dash-ring" /></td></tr>
          <tr><td className="font-semibold">Dashboard · TR / CC chips</td><td><Token nombre="green-soft" /> · <Token nombre="dash-bad-chip" /></td></tr>
          <tr><td className="font-semibold">Patient overview and request · photo</td><td><Token nombre="dash-blue-hover" /></td></tr>
          {ESTADOS_PACIENTE.map((e) => (
            <tr key={e}>
              <td className="font-semibold">Patient overview · {e} bar</td>
              <td><Token nombre={BARRA_TONOS[PATIENT_APPOINTMENT_TONES[e]].replace('border-l-', '')} /> · el borde de la pill {PATIENT_APPOINTMENT_TONES[e]}</td>
            </tr>
          ))}
          <tr><td className="font-semibold">Request · ASAP bar</td><td><Token nombre={BARRA_TONOS.danger.replace('border-l-', '')} /> · el borde de la pill danger</td></tr>
          <tr><td className="font-semibold">Request · Waiting List bar</td><td><Token nombre={BARRA_TONOS.info.replace('border-l-', '')} /> · el borde de la pill info</td></tr>
          {LEGEND.map(({ state }) => {
            const clave = state.toLowerCase().replace(/[^a-z]/g, '')
            return (
              <tr key={state}>
                <td className="font-semibold">Calendar · {state}</td>
                <td><Token nombre={`appt-${clave}-bg`} /> · bar <Token nombre={`appt-${clave}-bar`} /> · time <Token nombre={`appt-${clave}-fg`} /></td>
              </tr>
            )
          })}
        </Tabla>
      </Bloque>
    </Lienzo>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Medicion />,
}
