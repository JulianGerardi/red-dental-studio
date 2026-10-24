import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperatoryList } from './OperatoryList'
import type { Operatory, OperatoryStatus } from './OperatoryCard'
import type { Appointment } from './AppointmentCard'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

const ESTADOS: OperatoryStatus[] = ['Available', 'Busy', 'Busy', 'Busy', 'Unavailable', 'Available']
const MOTIVOS = ['Check-up', 'Cleaning', 'Consultation']
const salas = (n: number): Operatory[] =>
  Array.from({ length: n }, (_, i) => ({ name: `Operatory ${i + 1}`, status: ESTADOS[i % ESTADOS.length]!, patientsToday: 0, provider: 'Daniel Anderson' }))
const turnos = (n: number): (Appointment & { completado?: boolean })[] =>
  Array.from({ length: n * 2 }, (_, i) => ({
    name: ['Noah James', 'Mara Otero', 'Ines Bermudez', 'Sofia Chen', 'Elias Aguirre', 'Lena Park'][i % 6]!,
    initials: ['NJ', 'MO', 'IB', 'SC', 'EA', 'LP'][i % 6]!,
    provider: 'Dr. Elena Martinez', operatory: `Operatory ${(i % n) + 1}`, time: `${String(8 + Math.floor(i / n) * 2 + (i % n)).padStart(2, '0')}:00`,
    motivo: MOTIVOS[i % 3], completado: i < n,
  }))

type Args = { rooms: number; width: number }

const meta = {
  title: 'Components/Dashboard/Operatory list',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las salas del Dashboard como **lista de acordeones** (`@/components/dashboard/OperatoryList`, diseño del artifact de Julián, 2026-10-19): es el panel *Rooms*, la tercera de las cuatro columnas. Antes eran una tira horizontal arriba que filtraba la Waiting Room.',
          '',
          '**Cada sala se despliega sola** y puede haber varias abiertas (arrancan cerradas): al tocarla muestra la línea del día de esa sala. **No filtra la Waiting Room**: esa es independiente y tiene su propio *Filter*. El número "Patients today" de cada card es la cantidad de turnos de la sala, así que coincide con su línea.',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de salas y el ancho desde *Controls*; desplegá una o dos salas.',
        ].join('\n'),
      },
    },
  },
  args: { rooms: 6, width: 340 },
  argTypes: {
    rooms: { control: { type: 'range', min: 0, max: 10 }, description: 'Cuántas salas tiene la clínica.' },
    width: { control: { type: 'range', min: 250, max: 480, step: 4 }, description: 'Ancho de la lista. En el Dashboard, 250px a 1280 y 430px a 1920.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

const Panel = ({ ancho, children }: { ancho: number; children: React.ReactNode }) => (
  <div className={cn(TARJETA_PANEL, 'max-w-full p-4')} style={{ width: ancho + 32 }}>{children}</div>
)

export const Playground: Story = {
  render: (a) => <Panel ancho={a.width}><OperatoryList key={a.rooms} rooms={salas(a.rooms)} turnos={turnos(Math.max(1, a.rooms))} onSelect={() => {}} /></Panel>,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Seis salas cerradas: se ve el estado, los turnos y el profesional de todas de un vistazo; tocá una para ver su día.">
        <Panel ancho={340}><OperatoryList rooms={salas(6)} turnos={turnos(6)} onSelect={() => {}} /></Panel>
      </Bloque>
      <TablaPartes partes={[
        ['List', 'Una columna de OperatoryCard con 10px entre una y otra; role group "Rooms".', 'OperatoryList'],
        ['Card', 'Cada sala es un acordeón independiente; puede haber varias abiertas.', 'OperatoryCard onToggle'],
        ['Patients today', 'Los turnos del día de esa sala, calculados de la lista del día.', 'turnos filtrados por sala'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Few rooms" nota="Tres salas.">
          <Panel ancho={340}><OperatoryList rooms={salas(3)} turnos={turnos(3)} onSelect={() => {}} /></Panel>
        </Muestra>
        <Muestra titulo="Many rooms" nota="Diez: el panel del Dashboard scrollea adentro; la página no.">
          <Panel ancho={340}><OperatoryList rooms={salas(10)} turnos={turnos(10)} onSelect={() => {}} /></Panel>
        </Muestra>
        <Muestra titulo="Narrow (250px)" nota="El ancho de la columna a 1280px.">
          <Panel ancho={250}><OperatoryList rooms={salas(3)} turnos={turnos(3)} onSelect={() => {}} /></Panel>
        </Muestra>
        <Muestra titulo="Empty" nota="Sin salas no se dibuja nada.">
          <Panel ancho={340}><OperatoryList rooms={[]} turnos={[]} /><p className="text-[12px] text-ink-muted">(nothing drawn)</p></Panel>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Behavior" nota="De OperatoryList.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Gap</td><td className="tabular-nums">10px</td></tr>
          <tr><td className="font-semibold">Open at start</td><td>Ninguna</td></tr>
          <tr><td className="font-semibold">Several open</td><td>Sí, cada una por su cuenta</td></tr>
          <tr><td className="font-semibold">Effect on other panels</td><td>Ninguno: la Waiting Room es independiente</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
