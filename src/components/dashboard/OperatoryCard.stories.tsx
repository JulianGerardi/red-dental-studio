import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperatoryCard, LineaDelDia, type Operatory, type OperatoryStatus } from './OperatoryCard'
import type { Appointment } from './AppointmentCard'
import { Bloque, Forzar, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

type Args = { status: OperatoryStatus; name: string; provider: string; appointments: number; open: boolean; width: number }

const SALA: Operatory = { name: 'Operatory 2', status: 'Busy', patientsToday: 3, provider: 'Daniel Anderson' }
const T = (name: string, initials: string, time: string, motivo: string, completado = false): Appointment & { completado?: boolean } =>
  ({ name, initials, provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time, motivo, completado })
const TURNOS = [
  T('Ines Bermudez', 'IB', '09:00', 'Consultation', true),
  T('Noah James', 'NJ', '10:00', 'Cleaning', true),
  T('Mara Otero', 'MO', '11:30', 'Check-up'),
  T('Sofia Chen', 'SC', '12:00', 'Cleaning'),
  T('Elias Aguirre', 'EA', '13:15', 'Consultation'),
]
const nada = () => {}

const meta = {
  title: 'Components/Dashboard/OperatoryCard',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Una sala del Dashboard (`@/components/dashboard/OperatoryCard`, diseño del artifact de Julián, 2026-10-19): el nombre, su estado (**Available**, **Busy**, **Unavailable**), cuántos pacientes tiene hoy y el profesional.',
          '',
          '**Es un acordeón:** con `onToggle` la card es un botón (`aria-expanded`) y **tocarla despliega la línea del día de esa sala**: a la izquierda la hora y un punto unidos por una línea (tilde verde si ya se atendió, aro azul si viene), a la derecha el turno con el paciente, el motivo, el profesional y *Complete* o *Upcoming*; los que vienen van resaltados en azul. **No filtra nada de afuera**: la Waiting Room es independiente. Tocar un turno abre la ficha del paciente.',
          '',
          '**"Patients today"** es la cantidad de turnos de la sala (`turnos`), así que coincide con las filas de su línea.',
          '',
          '**Probalo:** en *Playground* cambiá el estado, los textos, la cantidad de turnos y el ancho desde *Controls*; tocá la card para desplegarla.',
        ].join('\n'),
      },
    },
  },
  args: { status: 'Busy', name: 'Operatory 2', provider: 'Daniel Anderson', appointments: 3, open: false, width: 320 },
  argTypes: {
    status: { control: 'inline-radio', options: ['Available', 'Busy', 'Unavailable'], description: 'El estado: el color de la pill.' },
    name: { control: 'text', description: 'Nombre de la sala, el mismo que dicen los turnos. Uno largo se corta con elipsis.' },
    provider: { control: 'text', description: 'Profesional de la sala.' },
    appointments: { control: { type: 'range', min: 0, max: 5 }, description: 'Turnos del día en esta sala: el globo celeste y las filas de la línea.' },
    open: { control: 'boolean', description: 'Arranca desplegada.' },
    width: { control: { type: 'range', min: 240, max: 480, step: 4 }, description: 'Ancho de la card. En el Dashboard, de 250px (1280) a 430px (1920).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

/* El panel blanco donde vive la card en el Dashboard. */
const Panel = ({ children, ancho }: { children: React.ReactNode; ancho?: number }) => (
  <div className={cn(TARJETA_PANEL, 'max-w-full p-4')} style={ancho ? { width: ancho + 32 } : undefined}>{children}</div>
)

function Plegable(a: Args) {
  const [abierta, setAbierta] = useState(a.open)
  return (
    <OperatoryCard
      room={{ name: a.name, status: a.status, patientsToday: a.appointments, provider: a.provider }}
      turnos={TURNOS.slice(0, a.appointments).map((t) => ({ ...t, operatory: a.name }))}
      abierta={abierta} onToggle={() => setAbierta((v) => !v)} onSelect={nada}
    />
  )
}

export const Playground: Story = {
  render: (a) => <Panel ancho={a.width}><Plegable key={`${a.open}-${a.appointments}`} {...a} /></Panel>,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Arriba el nombre, la pill de estado y la flecha; abajo, los pacientes de hoy y el profesional. Desplegada, la línea del día.">
        <Panel ancho={320}><OperatoryCard room={SALA} turnos={TURNOS.slice(0, 3)} abierta onToggle={nada} onSelect={nada} /></Panel>
      </Bloque>
      <TablaPartes partes={[
        ['Name', 'El nombre de la sala, 14px Semibold, el mismo que dicen los turnos ("Operatory 2"); se corta con elipsis si no entra.', 'room.name'],
        ['Status', 'La pill del estado: verde Available, azul Busy, rojo Unavailable.', 'StatusPill'],
        ['Arrow', 'Chevron a la derecha de la pill; gira al desplegar. Sólo si la card es un acordeón.', 'onToggle · aria-expanded'],
        ['Patients today', 'Ícono de calendario y la cantidad de turnos de la sala en el globo celeste.', 'turnos.length'],
        ['Provider', 'Ícono de persona y el profesional; baja de renglón si no entra.', 'room.provider'],
        ['Timeline', 'Hora y punto a la izquierda, unidos por una línea; el turno a la derecha. Tilde verde = Complete, aro azul = Upcoming.', 'LineaDelDia'],
        ['Appointment', 'Iniciales, nombre, motivo, profesional y el estado. Upcoming va con borde y fondo azul; tocarlo abre la ficha.', 'turnos · onSelect'],
        ['Open', 'La card desplegada lleva un anillo azul de 1px.', 'abierta'],
      ]} />
      <Bloque titulo="The timeline on its own" nota="LineaDelDia es lo que se despliega; se puede usar suelta.">
        <Panel ancho={320}><LineaDelDia room={SALA} turnos={TURNOS.slice(0, 3)} onSelect={nada} /></Panel>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="flex flex-wrap gap-6">
        {(['Available', 'Busy', 'Unavailable'] as const).map((s, i) => (
          <Muestra key={s} titulo={s} ancho={344}>
            <Panel><OperatoryCard room={{ ...SALA, name: `Operatory ${i + 1}`, status: s }} turnos={TURNOS.slice(0, i + 1)} onToggle={nada} /></Panel>
          </Muestra>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Open" nota="La línea del día: los que ya se atendieron con tilde verde, los que vienen con aro azul y resaltados.">
          <Panel><OperatoryCard room={SALA} turnos={TURNOS.slice(0, 4)} abierta onToggle={nada} onSelect={nada} /></Panel>
        </Muestra>
        <Muestra titulo="Open, no appointments" nota="Una sala sin turnos dice que no tiene nada hoy.">
          <Panel><OperatoryCard room={{ ...SALA, status: 'Available' }} turnos={[]} abierta onToggle={nada} /></Panel>
        </Muestra>
        <Muestra titulo="Hover" nota="Suma la sombra de las cards.">
          <Forzar selector="button" estado="hover"><Panel><OperatoryCard room={SALA} turnos={TURNOS.slice(0, 3)} onToggle={nada} /></Panel></Forzar>
        </Muestra>
        <Muestra titulo="Keyboard focus" nota="El anillo de foco de la app; Enter o espacio la despliegan.">
          <Forzar selector="button" estado="focus-visible"><Panel><OperatoryCard room={SALA} turnos={TURNOS.slice(0, 3)} onToggle={nada} /></Panel></Forzar>
        </Muestra>
        <Muestra titulo="Static (no accordion)" nota="Sin onToggle es sólo la ficha de la sala, sin flecha ni línea.">
          <Panel><OperatoryCard room={SALA} turnos={TURNOS.slice(0, 3)} /></Panel>
        </Muestra>
        <Muestra titulo="Narrow (250px), long name" nota="El ancho de la columna a 1280px: el nombre se corta con elipsis y el profesional baja de renglón.">
          <Panel ancho={250}><OperatoryCard room={{ ...SALA, name: 'Operatory 12 · Surgery room', status: 'Unavailable' }} turnos={TURNOS.slice(0, 2)} abierta onToggle={nada} onSelect={nada} /></Panel>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

function Medidas() {
  const card = useMedidas(':scope > div > div')
  const nombre = useMedidas(':scope > div > button > span > span')
  return (
    <>
      <div ref={card.ref} className="w-[320px]">
        <div ref={nombre.ref}><OperatoryCard room={SALA} turnos={TURNOS.slice(0, 3)} onToggle={nada} /></div>
      </div>
      <Tabla encabezado={['Part', 'Height', 'Padding', 'Radius', 'Gap', 'Text']} minimo={560}>
        <tr><td className="font-semibold">Card (closed)</td><td className="tabular-nums">{card.m?.alto}</td><td className="tabular-nums">{card.m?.padding}</td><td className="tabular-nums">{card.m?.radio}</td><td className="tabular-nums">{card.m?.gap}</td><td>—</td></tr>
        <tr><td className="font-semibold">Name</td><td>—</td><td>—</td><td>—</td><td>—</td><td className="tabular-nums">{nombre.m?.texto} · {nombre.m?.peso}</td></tr>
      </Tabla>
    </>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Size" nota="Leído de la card dibujada, a 320px.">
        <Medidas />
      </Bloque>
      <Bloque titulo="Timeline">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Time column</td><td className="tabular-nums">44px · 11px Semibold</td></tr>
          <tr><td className="font-semibold">Dot</td><td>16px · <Token nombre="dash-ok-fg" /> filled with check (Complete) · <Token nombre="dash-blue" /> 3px ring (Upcoming)</td></tr>
          <tr><td className="font-semibold">Connector</td><td>1px · <Token nombre="line" /></td></tr>
          <tr><td className="font-semibold">Upcoming card</td><td><Token nombre="info-bg" /> fill · <Token nombre="dash-blue" /> border</td></tr>
          <tr><td className="font-semibold">Complete card</td><td>white · <Token nombre="line-row" /> border</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Card">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Open ring</td><td><Token nombre="dash-blue" /> · 1px</td></tr>
          <tr><td className="font-semibold">Patients today</td><td><Token nombre="dash-count-bg" /> · <Token nombre="dash-blue-hover" /></td></tr>
          <tr><td className="font-semibold">Surface</td><td>white · shadow-inner-card (TARJETA_INTERNA)</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
