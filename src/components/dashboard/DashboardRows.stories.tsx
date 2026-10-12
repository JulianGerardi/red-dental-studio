import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AppointmentRow, ETAPAS, MenuTurno, NextAppointment, NombreTurno, RoomStrip, RoomTile, TaskRow, tonoEspera, tonoVence,
  venceTexto, type EtapaTurno,
} from './DashboardRows'
import { DIA_CARGADO, type EnEspera, type Turno } from './dashboard-data'
import type { Operatory } from './OperatoryCard'
import { BLOCK_STYLE } from '@/components/scheduling/calendar-data'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Una persona del día cargado en cada etapa. */
const TURNO: Turno & EnEspera = { name: 'Emily Clark', initials: 'EC', provider: 'Dr. Emily Chen', operatory: 'Operatory 3', time: '10:45' }
const EN: Record<EtapaTurno, Turno & EnEspera> = {
  upcoming: TURNO,
  waiting: { ...TURNO, espera: 27 },
  'in-chair': { ...TURNO, time: '09:30', enSillon: '09:31' },
  done: { ...TURNO, time: '08:15', completado: true },
}
const TAREA = DIA_CARGADO.tasks[0]!
const SALAS: Operatory[] = [
  { name: 'Operatory 1', status: 'Busy', patientsToday: 8, provider: 'Dr. Elena Martinez', paciente: 'Lucia Vidal' },
  { name: 'Operatory 6', status: 'Available', patientsToday: 0, provider: 'Hygiene' },
  { name: 'Operatory 7', status: 'Unavailable', patientsToday: 0, provider: 'Maintenance' },
]
const ETAPAS_LISTA = Object.keys(ETAPAS) as EtapaTurno[]

/* Una lista de una sola fila, con la caja de ListGroup. */
const Caja = ({ ancho, children }: { ancho?: number; children: React.ReactNode }) => (
  <div className={cn(TARJETA_PANEL, 'max-w-full p-3')} style={ancho ? { width: ancho } : undefined}>
    <ul className="flex flex-col divide-y divide-line-soft rounded-lg bg-white shadow-hairline">{children}</ul>
  </div>
)

type Args = { piece: 'Appointment row' | 'Next appointment' | 'Task row'; stage: EtapaTurno; width: number; waitMinutes: number; dueInDays: number; newPatient: boolean; selected: boolean }

const meta = {
  title: 'Components/Dashboard/Dashboard rows',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las filas del Dashboard con volumen (`@/components/dashboard/DashboardRows`), de la propuesta del 2026-10-12: una fila por turno o tarea en lugar de una card de 190px. Cada fila lleva **la barra del color de su estado en Scheduling** (Booked azul, Check-in verde, In progress violeta, Fulfilled verde claro) y **una sola acción, la que sigue**: Check In → Seat → Check Out. El próximo paciente es la única pieza con el botón azul (`NextAppointment`).',
          '',
          '**Se adaptan al ancho de su lista**, no al de la pantalla (`@container`): angosta en dos renglones; por debajo de 384px los minutos bajan al segundo renglón; desde 768px en columnas, como una tabla. Las salas van en una tira (`RoomStrip`).',
          '',
          '**Probalo:** en *Playground* cambiá la pieza, la etapa y el ancho desde *Controls*; tocá el nombre (abre la ficha rápida en la app) y el kebab.',
        ].join('\n'),
      },
    },
  },
  args: { piece: 'Appointment row', stage: 'waiting', width: 400, waitMinutes: 27, dueInDays: -3, newPatient: false, selected: false },
  argTypes: {
    piece: { control: 'inline-radio', options: ['Appointment row', 'Next appointment', 'Task row'], description: 'Qué pieza se ve.' },
    stage: { control: 'inline-radio', options: ETAPAS_LISTA, description: 'Etapa del turno: color de la barra y acción.' },
    width: { control: { type: 'range', min: 300, max: 1100, step: 10 }, description: 'Ancho de la lista. Menos de 384: minutos abajo. Desde 768: columnas.' },
    waitMinutes: { control: { type: 'range', min: 0, max: 45 }, description: 'Minutos en la sala de espera: ámbar desde 15, rojo desde 25.' },
    dueInDays: { control: { type: 'range', min: -7, max: 14 }, description: 'Días al vencimiento de la tarea; negativo, vencida.' },
    newPatient: { control: 'boolean', description: 'Paciente nuevo: pill violeta "New".' },
    selected: { control: 'boolean', description: 'Con la ficha rápida abierta desde esta fila.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = {
  render: (a) => {
    const appt = { ...EN[a.stage], nuevo: a.newPatient, ...(a.stage === 'waiting' ? { espera: a.waitMinutes } : {}) }
    if (a.piece === 'Next appointment') return <div className={cn(TARJETA_PANEL, 'p-3')} style={{ width: a.width }}><NextAppointment appt={TURNO} activa={a.selected} /></div>
    if (a.piece === 'Task row') return <Caja ancho={a.width}><li><TaskRow task={{ ...TAREA, vence: a.dueInDays }} /></li></Caja>
    return <Caja ancho={a.width}><li><AppointmentRow appt={appt} etapa={a.stage} activa={a.selected} /></li></Caja>
  },
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Appointment row" nota="Angosta (en una columna del tablero) y ancha (la lista a lo ancho de la variante B).">
        <Caja ancho={400}><li><AppointmentRow appt={{ ...EN.waiting, nuevo: true }} etapa="waiting" /></li></Caja>
        <Caja ancho={900}><li><AppointmentRow appt={EN.waiting} etapa="waiting" /></li></Caja>
        <TablaPartes partes={[
          ['State bar', 'Barra de 3px del color del estado del turno en Scheduling: se reconoce el mismo turno en el calendario y en el dashboard.', 'BLOCK_STYLE[estado].bar'],
          ['Time', '13px Semibold con números tabulares: es la columna por la que se lee una agenda.', 'appt.time'],
          ['Name', 'Botón: abre la ficha rápida anclada a la fila. "New" en violeta si es paciente nuevo.', 'NombreTurno'],
          ['Sub line', 'Provider y operatorio en 11px. Ancha: pasan a sus columnas. Muy angosta: los minutos van acá.', '—'],
          ['Minutes', 'En la sala de espera o en el sillón. La espera cambia de color con el umbral.', 'minutosEnEtapa · tonoEspera'],
          ['Action', 'La que sigue, en secondary sm: Check In, Seat o Check Out. Terminado: un check.', 'Button'],
          ['Menu', 'Kebab de las tablas: Edit appointment y Go to appointment.', 'MenuTurno · RowActionsMenu'],
        ]} />
        <div className="flex items-center gap-4">
          <span className="text-[13px]"><NombreTurno appt={TURNO}>Name as a button</NombreTurno></span>
          <MenuTurno nombre={TURNO.name} />
        </div>
      </Bloque>
      <Bloque titulo="Next appointment" nota="El turno en foco: el único con la acción en azul y a lo ancho.">
        <div className={cn(TARJETA_PANEL, 'w-[400px] p-3')}><NextAppointment appt={TURNO} /></div>
      </Bloque>
      <Bloque titulo="Task row" nota="Ícono del tipo en el color de su urgencia, tipo y paciente, vencimiento en palabras y Complete.">
        <Caja ancho={400}><li><TaskRow task={TAREA} /></li></Caja>
      </Bloque>
      <Bloque titulo="Room strip" nota="Las salas en una fila: punto y estado en color, y quién está (o el provider). Con muchas, se desliza de costado.">
        <RoomStrip rooms={DIA_CARGADO.rooms} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Appointment row · stages">
        <Caja ancho={400}>{ETAPAS_LISTA.map((e) => <li key={e}><AppointmentRow appt={EN[e]} etapa={e} /></li>)}</Caja>
        <Caja ancho={900}>{ETAPAS_LISTA.map((e) => <li key={e}><AppointmentRow appt={EN[e]} etapa={e} /></li>)}</Caja>
      </Bloque>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Waiting time" nota="Gris hasta 14 min, ámbar desde 15, rojo desde 25 (umbral a validar con recepción).">
          <Caja>{[6, 18, 27].map((m) => <li key={m}><AppointmentRow appt={{ ...EN.waiting, espera: m }} etapa="waiting" /></li>)}</Caja>
        </Muestra>
        <Muestra titulo="Narrow (under 384px)" nota="Los minutos bajan al segundo renglón para no cortar el nombre.">
          <Caja ancho={340}>{(['waiting', 'in-chair'] as const).map((e) => <li key={e}><AppointmentRow appt={EN[e]} etapa={e} /></li>)}</Caja>
        </Muestra>
        <Muestra titulo="Selected" nota="Con la ficha rápida abierta desde la fila: fondo celeste.">
          <Caja><li><AppointmentRow appt={EN.upcoming} etapa="upcoming" activa /></li></Caja>
        </Muestra>
        <Muestra titulo="Next appointment, selected">
          <div className={cn(TARJETA_PANEL, 'p-3')}><NextAppointment appt={TURNO} activa /></div>
        </Muestra>
        <Muestra titulo="Task row · due" nota="Vencida en rojo, hoy en ámbar, después en gris.">
          <Caja>{[-3, 0, 4].map((v) => <li key={v}><TaskRow task={{ ...TAREA, vence: v }} /></li>)}</Caja>
        </Muestra>
        <Muestra titulo="Room tile · status">
          <div className="flex flex-wrap gap-2">{SALAS.map((r) => <div key={r.name} className="w-[160px]"><RoomTile room={r} /></div>)}</div>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

function MedidasFila() {
  const fila = useMedidas('[data-appt-row]')
  const nombre = useMedidas('[data-appt-row] button span span')
  return (
    <>
      <div ref={fila.ref}>
        <div ref={nombre.ref}><Caja ancho={400}><li><AppointmentRow appt={EN.waiting} etapa="waiting" onSelect={() => {}} /></li></Caja></div>
      </div>
      <Tabla encabezado={['Part', 'Height', 'Padding', 'Text', 'Gap']} minimo={560}>
        <tr><td className="font-semibold">Row</td><td className="tabular-nums">{fila.m?.alto}</td><td className="tabular-nums">{fila.m?.padding}</td><td>—</td><td className="tabular-nums">{fila.m?.gap}</td></tr>
        <tr><td className="font-semibold">Name</td><td>—</td><td>—</td><td className="tabular-nums">{nombre.m?.texto} · {nombre.m?.peso}</td><td>—</td></tr>
      </Tabla>
    </>
  )
}

const tokenDeBarra = (estado: string) => BLOCK_STYLE[estado]!.bar.match(/--color-([\w-]+)/)?.[1] ?? null

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Size" nota="Leído de la fila dibujada. La acción es Button sm (28px); el kebab, el de las tablas (28px).">
        <MedidasFila />
      </Bloque>
      <Bloque titulo="Stage colors" nota="La barra usa los tokens de estado de Scheduling (--color-appt-*-bar en src/index.css).">
        <Tabla encabezado={['Stage', 'Scheduling state', 'Bar', 'Action']} minimo={620}>
          {ETAPAS_LISTA.map((e) => (
            <tr key={e}>
              <td className="font-semibold">{ETAPAS[e].rotulo}</td>
              <td>{ETAPAS[e].estado}</td>
              <td><Token nombre={tokenDeBarra(ETAPAS[e].estado)} /></td>
              <td>{ETAPAS[e].accion ?? '—'}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
      <Bloque titulo="Urgency colors" nota="Espera (tonoEspera) y vencimiento de tareas (tonoVence).">
        <Tabla encabezado={['Case', 'Text', 'Sample']} minimo={560}>
          {[6, 18, 27].map((m) => (
            <tr key={m}><td className="font-semibold">Waiting {m} min</td><td><Token nombre={tonoEspera(m).replace('text-', '')} /></td><td className={cn('font-semibold', tonoEspera(m))}>{m} min</td></tr>
          ))}
          {[-3, 0, 4].map((v) => (
            <tr key={v}><td className="font-semibold">Task due {v}</td><td><Token nombre={tonoVence(v).texto.replace('text-', '')} /></td><td className={cn('font-semibold', tonoVence(v).texto)}>{venceTexto({ ...TAREA, vence: v })}</td></tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
