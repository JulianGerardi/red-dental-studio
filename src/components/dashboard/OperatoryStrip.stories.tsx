import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperatoryStrip, OPERATORY_MIN } from './OperatoryStrip'
import type { Operatory, OperatoryStatus } from './OperatoryCard'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'

/* Salas de ejemplo: los estados del día de la demo, repetidos para tener volumen. */
const ESTADOS: OperatoryStatus[] = ['Available', 'Busy', 'Busy', 'Busy', 'Unavailable', 'Available']
const salas = (n: number): Operatory[] =>
  Array.from({ length: n }, (_, i) => ({ name: `Operatory ${i + 1}`, status: ESTADOS[i % ESTADOS.length]!, patientsToday: (i * 2) % 5, provider: 'Daniel Anderson' }))

type Args = { rooms: number; width: number }

const meta = {
  title: 'Components/Dashboard/Operatory strip',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las salas del Dashboard en **una tira arriba de los turnos** (`@/components/dashboard/OperatoryStrip`, Julián, 2026-10-13): antes ocupaban una columna entera al lado de Appointments y Waiting Room; arriba no le roban ancho a los turnos.',
          '',
          '**Scroll horizontal** (2026-10-19): una sola fila, sin importar cuántas salas haya. Cada card mide al menos 232px y se desliza; la que asoma por el borde avisa que hay más. Con pocas salas se reparten el ancho. Sin salas no se dibuja.',
          '',
          '**Siempre hay una sala elegida** (la primera por defecto): lleva el anillo azul y las demás se apagan. Tocar otra la cambia; no se puede soltar. Appointments y Waiting Room del Dashboard muestran sólo a los de la sala elegida, y el número "Patients today" de cada card es la cantidad de turnos de esa sala (Julián, 2026-10-19). Cada sala toma el color de su estado.',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de salas y el ancho desde *Controls*; tocá una sala y deslizá la tira.',
        ].join('\n'),
      },
    },
  },
  args: { rooms: 8, width: 1000 },
  argTypes: {
    rooms: { control: { type: 'range', min: 0, max: 14 }, description: 'Cuántas salas tiene la clínica.' },
    width: { control: { type: 'range', min: 340, max: 1800, step: 10 }, description: 'Ancho de la tira. 1352 es el del Dashboard a 1440px.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

/* La tira a un ancho dado, sobre el fondo de la página. */
const Pagina = ({ ancho, children }: { ancho: number; children: React.ReactNode }) => (
  <div className="max-w-full rounded-lg bg-page-background p-4" style={{ width: ancho + 32 }}>{children}</div>
)

/* Con la sala elegida en estado, como en el Dashboard: siempre una, la primera al empezar. */
function Elegible({ rooms, inicial }: { rooms: Operatory[]; inicial?: string }) {
  const [elegida, setElegida] = useState(inicial ?? rooms[0]?.name ?? null)
  return <OperatoryStrip rooms={rooms} elegida={elegida} onElegir={setElegida} />
}

export const Playground: Story = {
  render: (a) => <Pagina ancho={a.width}><Elegible key={a.rooms} rooms={salas(a.rooms)} /></Pagina>,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1400px]">
      <Bloque nota="A 1000px entran cuatro y la quinta asoma: se desliza para ver el resto.">
        <Pagina ancho={1000}><Elegible rooms={salas(8)} /></Pagina>
      </Bloque>
      <TablaPartes partes={[
        ['Row', 'Una sola fila con scroll horizontal; cada card mide al menos 232px y, con pocas salas, se reparten el ancho.', 'OperatoryStrip'],
        ['Card', 'La sala, con el color de su estado. "Patients today" es la cantidad de turnos de esa sala.', 'OperatoryCard enPagina'],
        ['Selection', 'Siempre una elegida (anillo azul); las demás al 60%. Tocar otra la cambia y filtra Appointments y Waiting Room.', 'elegida · onElegir'],
        ['Snap', 'Al soltar el deslizamiento, la tira se acomoda en el borde de una card, sin dejarla cortada a la mitad.', 'snap-x'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1400px]">
      <Muestra titulo="All fit" nota="Cuatro salas a 1352px: se reparten el ancho, sin scroll.">
        <Pagina ancho={1352}><Elegible rooms={salas(4)} /></Pagina>
      </Muestra>
      <Muestra titulo="Scrolling" nota="Ocho salas a 1000px: entran cuatro y la quinta asoma por el borde.">
        <Pagina ancho={1000}><Elegible rooms={salas(8)} /></Pagina>
      </Muestra>
      <Muestra titulo="Another one selected" nota="Operatory 3 elegida: anillo azul; las demás al 60% hasta el hover.">
        <Pagina ancho={1352}><Elegible rooms={salas(5)} inicial="Operatory 3" /></Pagina>
      </Muestra>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Tablet (662px)" nota="Dos y media a la vista.">
          <Pagina ancho={662}><Elegible rooms={salas(6)} /></Pagina>
        </Muestra>
        <Muestra titulo="Phone (358px)" nota="Una y un pedazo de la siguiente: el gesto de deslizar se entiende solo.">
          <Pagina ancho={358}><Elegible rooms={salas(6)} /></Pagina>
        </Muestra>
      </div>
      <Muestra titulo="Empty" nota="Sin salas no se dibuja nada.">
        <Pagina ancho={600}><OperatoryStrip rooms={[]} /><p className="text-[12px] text-ink-muted">(nothing drawn)</p></Pagina>
      </Muestra>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Behavior" nota="De OperatoryStrip.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Card min width</td><td className="tabular-nums">{OPERATORY_MIN}px (1fr cuando sobra lugar)</td></tr>
          <tr><td className="font-semibold">Gap</td><td className="tabular-nums">16px, el mismo que entre paneles</td></tr>
          <tr><td className="font-semibold">Scroll</td><td>Horizontal, con snap al borde de la card; no contagia al scroll de la página</td></tr>
          <tr><td className="font-semibold">Room shown</td><td>Siempre una; la primera por defecto</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Per screen" nota="Cuántas salas se ven completas en el Dashboard, con la barra lateral cerrada.">
        <Tabla encabezado={['Screen', 'Strip width', 'Rooms in view']} minimo={480}>
          {[[1920, 1752], [1440, 1352], [1280, 1174], [1024, 918], [768, 662], [390, 358]].map(([pantalla, ancho]) => (
            <tr key={pantalla}><td className="tabular-nums">{pantalla}px</td><td className="tabular-nums">{ancho}px</td><td className="tabular-nums">{Math.max(1, Math.floor((ancho! + 16) / (OPERATORY_MIN + 16)))}</td></tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
