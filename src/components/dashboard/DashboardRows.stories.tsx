import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentRow, ChipsTurno, DocYVencida, NombreTurno, TaskRow } from './DashboardRows'
import { DIAS } from './dashboard-data'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Los datos del día de la demo, los mismos de las cards. */
const DIA = DIAS['28-02-2026']!
const TURNO = DIA.appointments[1]!
const CANCEL = DIA.waiting[0]!
const TAREA = DIA.tasks[0]!

/* Una lista como la de ListGroup: cada fila en su card interna. */
const Caja = ({ ancho, children }: { ancho?: number; children: React.ReactNode }) => (
  <div className={cn(TARJETA_PANEL, 'max-w-full p-3')} style={ancho ? { width: ancho } : undefined}>
    <ul className="flex flex-col gap-3 [&>li]:rounded-lg [&>li]:bg-white [&>li]:shadow-inner-card">{children}</ul>
  </div>
)

type Args = { piece: 'Appointment row' | 'Task row'; action: 'Check Out' | 'Cancel'; width: number; selected: boolean }

const meta = {
  title: 'Components/Dashboard/Dashboard rows',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las filas del Dashboard (`@/components/dashboard/DashboardRows`, 2026-10-12): **lo mismo que cada card del Figma, en menos alto**. El turno trae la hora, las iniciales, el nombre, *Check In*, provider y operatorio, los chips **TR** y **CC**, **Check Out** o **Cancel** y el kebab con *Edit appointment*; la tarea trae el tipo, *Requested*, el paciente, el documento, *Expired date*, *Register*, *Expiration date* y **Complete this Task**. No hay datos ni acciones nuevas.',
          '',
          '**Dónde:** Appointments, Waiting Room y Pending Task del Dashboard, y Pending Task del Patient Dashboard, adentro de *List group*: cada fila en su card interna (línea fina y sombra suave, como las salas), con tope y "Show N more" con scroll.',
          '',
          '**Se adaptan al ancho de su lista**, no al de la pantalla (`@container`): en angosto, en renglones (lo que no entra baja a su propio renglón en vez de cortarse); en columnas, como una tabla, desde 768px de lista el turno y desde 1024px la tarea, que tiene más partes.',
          '',
          '**Probalo:** en *Playground* cambiá la pieza, la acción y el ancho desde *Controls*; tocá el nombre, el botón y el kebab: hacen lo mismo que en la card.',
        ].join('\n'),
      },
    },
  },
  args: { piece: 'Appointment row', action: 'Check Out', width: 400, selected: false },
  argTypes: {
    piece: { control: 'inline-radio', options: ['Appointment row', 'Task row'], description: 'Qué fila se ve.' },
    action: { control: 'inline-radio', options: ['Check Out', 'Cancel'], description: 'El botón del turno, el mismo de la card.' },
    width: { control: { type: 'range', min: 300, max: 1200, step: 10 }, description: 'Ancho de la lista: en columnas desde 768px (turno) y 1024px (tarea).' },
    selected: { control: 'boolean', description: 'Con la ficha rápida abierta desde esta fila.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = {
  render: (a) => a.piece === 'Task row'
    ? <Caja ancho={a.width}><li><TaskRow task={TAREA} /></li></Caja>
    : <Caja ancho={a.width}><li><AppointmentRow appt={{ ...TURNO, accion: a.action }} activa={a.selected} onSelect={() => {}} onEdit={() => {}} /></li></Caja>,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    /* La tarea pasa a columnas desde 1024px de lista: el lienzo necesita más que los 960 de siempre. */
    <Lienzo className="max-w-[1200px]">
      <Bloque titulo="Appointment row" nota="Angosta (una columna del Dashboard) y ancha. Lo mismo que AppointmentCard.">
        <Caja ancho={400}><li><AppointmentRow appt={TURNO} onSelect={() => {}} onEdit={() => {}} /></li></Caja>
        <Caja ancho={900}><li><AppointmentRow appt={TURNO} onSelect={() => {}} onEdit={() => {}} /></li></Caja>
        <TablaPartes partes={[
          ['Time box', 'La caja gris de la card (dash-field) con el reloj y la hora en 12px Semibold tabular, del alto de la fila: ancla la fila y es la columna por la que se lee una agenda. Ancha, en una línea.', 'appt.time'],
          ['Initials', 'Las iniciales en el cuadrado azul de la card, a 28px.', 'appt.initials'],
          ['Name', 'Botón: abre la ficha rápida anclada a la fila, como tocar la card.', 'NombreTurno'],
          ['Check In', 'La pill verde de la card.', 'StatusPill'],
          ['Provider · Operatory', 'Los dos campos grises de la card. Angosta, en un renglón; ancha, cada uno en su columna.', 'appt.provider · appt.operatory'],
          ['TR · CC', 'Los chips de la card, a 24px de alto.', 'ChipsTurno'],
          ['Check Out / Cancel', 'El botón del pie de la card, en sm: el mismo texto, la flecha y el mismo aviso.', 'Button · accionTurno'],
          ['Menu', 'El kebab de la card con Edit appointment.', 'MenuCard'],
        ]} />
        <div className="flex items-center gap-4">
          <NombreTurno appt={TURNO} onSelect={() => {}} />
          <ChipsTurno />
        </div>
      </Bloque>
      <Bloque titulo="Task row" nota="Lo mismo que PendingTaskCard, en el mismo orden y cada parte pegada a la que acompaña: el tipo con Requested, el paciente con el documento y Expired date, las fechas; el aire libre va antes del botón. Angosta (Patient Dashboard) y ancha (Pending Task del Dashboard).">
        <Caja ancho={400}><li><TaskRow task={TAREA} /></li></Caja>
        <Caja ancho={1100}><li><TaskRow task={TAREA} /></li></Caja>
        <TablaPartes partes={[
          ['Kind', 'El tipo de tarea en 14px Bold, el título de la card.', 'task.kind'],
          ['Requested', 'El estado con el punto azul.', 'task.state'],
          ['Patient', 'Iniciales en el cuadrado celeste y el nombre, como en la card.', 'task.initials · task.person'],
          ['Document · Expired date', 'El botón rojo del documento y el aviso ámbar de la card.', 'DocYVencida'],
          ['Register · Expiration date', 'Las dos fechas con su rótulo: Register en azul, Expiration date en rojo.', 'task.register · task.expiration'],
          ['Complete this Task', 'El botón de la card, en sm: el mismo texto y el mismo aviso.', 'Button · completarTarea'],
        ]} />
        <DocYVencida />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1200px]">
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Check Out and Cancel" nota="Las dos acciones de la card: el primero de la sala de espera trae Cancel.">
          <Caja><li><AppointmentRow appt={TURNO} /></li><li><AppointmentRow appt={CANCEL} /></li></Caja>
        </Muestra>
        <Muestra titulo="Selected" nota="Con la ficha rápida abierta desde la fila: fondo celeste.">
          <Caja><li><AppointmentRow appt={TURNO} activa onSelect={() => {}} /></li></Caja>
        </Muestra>
        <Muestra titulo="Narrow (340px)" nota="El botón baja a su propio renglón para no cortar provider y operatorio; un nombre largo se corta con elipsis y se lee entero al pasar el mouse.">
          <Caja ancho={340}><li><AppointmentRow appt={TURNO} /></li><li><TaskRow task={TAREA} /></li></Caja>
        </Muestra>
        <div className="md:col-span-2">
          <Muestra titulo="Wide" nota="En columnas, alineadas fila con fila: turnos a 900px, tareas a 1100px.">
            <Caja ancho={900}><li><AppointmentRow appt={TURNO} /></li><li><AppointmentRow appt={CANCEL} /></li></Caja>
            <Caja ancho={1100}><li><TaskRow task={TAREA} /></li><li><TaskRow task={DIA.tasks[2]!} /></li></Caja>
          </Muestra>
        </div>
      </div>
    </Lienzo>
  ),
}

function MedidasFila() {
  const fila = useMedidas('[data-appt-row]')
  const nombre = useMedidas('[data-appt-row] button span')
  return (
    <>
      <div ref={fila.ref}>
        <div ref={nombre.ref}><Caja ancho={400}><li><AppointmentRow appt={TURNO} onSelect={() => {}} /></li></Caja></div>
      </div>
      <Tabla encabezado={['Part', 'Height', 'Padding', 'Text']} minimo={480}>
        <tr><td className="font-semibold">Row</td><td className="tabular-nums">{fila.m?.alto}</td><td className="tabular-nums">{fila.m?.padding}</td><td>—</td></tr>
        <tr><td className="font-semibold">Name</td><td>—</td><td>—</td><td className="tabular-nums">{nombre.m?.texto} · {nombre.m?.peso}</td></tr>
      </Tabla>
    </>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Size" nota="Leído de la fila dibujada (angosta, 400px). El botón es Button sm (28px); el kebab, el de la card (32px). La card de turno mide 190px; la fila, menos de la mitad.">
        <MedidasFila />
      </Bloque>
      <Bloque titulo="Colors" nota="Los mismos tokens que la card de turno y la de tarea (src/index.css).">
        <Tabla encabezado={['Part', 'Fill', 'Text']} minimo={560}>
          <tr><td className="font-semibold">TR chip</td><td><Token nombre="green-soft" /></td><td><Token nombre="dash-ok-fg" /></td></tr>
          <tr><td className="font-semibold">CC chip</td><td><Token nombre="dash-bad-chip" /></td><td><Token nombre="field-error" /></td></tr>
          <tr><td className="font-semibold">Check Out / Cancel</td><td><Token nombre="dash-blue" /></td><td><Token nombre="white" /></td></tr>
          <tr><td className="font-semibold">Selected row</td><td><Token nombre="info-bg" /></td><td>—</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
