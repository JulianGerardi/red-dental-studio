import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShowMore, SHOW_MORE_ALTO } from './show-more'
import { AppointmentRow } from '@/components/dashboard/DashboardRows'
import { OperatoryCard } from '@/components/dashboard/OperatoryCard'
import { DIA_CARGADO } from '@/components/dashboard/dashboard-data'
import { TreatmentCard, PLANS } from '@/pages/patients/Treatments'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Forzar } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Ítems de ejemplo: los turnos del día cargado del Dashboard. */
const TURNOS = DIA_CARGADO.appointments
const filas = (n: number) => (
  <ul className="flex flex-col divide-y divide-line-soft rounded-lg bg-white shadow-hairline">
    {TURNOS.slice(0, n).map((a, i) => <li key={i}><AppointmentRow appt={a} /></li>)}
  </ul>
)

type Args = { total: number; limit: number }

const meta = {
  title: 'Elements/Show more',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'La regla de toda la app para **muchas cards o mucha información** (`@/components/ui/show-more`, Julián, 2026-10-12): se ven los primeros ítems y **"Show N more" abre el resto adentro de un scroll**, sin estirar la página; **"Show less"** vuelve. Así una lista de 35 turnos ocupa lo mismo que una de 5.',
          '',
          '**Dónde se usa:** Appointments, Waiting Room, Rooms y Pending Task del Dashboard; Appointments, Pending Task y Pending documents del Patient Dashboard; Treatments. Con filas en una caja, va adentro de *List group*; con cards (salas, turnos del paciente, planes), directo, con la grilla o la columna en `className`.',
          '',
          '**Cómo se comporta:** si el total no pasa el tope, no hay botón ni scroll. Abierta, la lista crece hasta `min(70vh, 640px)` (nunca menos que cerrada) y después scrollea; un degradé abajo avisa que hay más (en Mac la barra no se ve hasta scrollear) y se va al llegar al final. La zona con scroll se alcanza con Tab y se mueve con las flechas.',
          '',
          '**Probalo:** en *Playground* cambiá el total y el tope desde *Controls*; tocá "Show N more", scrolleá y volvé con "Show less".',
        ].join('\n'),
      },
    },
  },
  args: { total: 20, limit: 5 },
  argTypes: {
    total: { control: { type: 'range', min: 0, max: 35 }, description: 'Cuántos ítems hay.' },
    limit: { control: { type: 'range', min: 1, max: 12 }, description: 'Cuántos se ven cerrado. Si el total no lo pasa, no hay botón.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = {
  render: (a) => (
    <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ShowMore key={`${a.total}-${a.limit}`} total={a.total} limit={a.limit} label="appointments">{filas}</ShowMore>
    </div>
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Cerrada: los primeros ítems y el botón con cuántos faltan. Abierta: la misma lista con scroll, el degradé abajo y Show less.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ShowMore total={12} limit={3} label="appointments">{filas}</ShowMore></div>
          <Forzar selector="[data-show-more]" estado="click" className={cn(TARJETA_PANEL, 'p-4')}>
            <ShowMore total={12} limit={3} label="appointments">{filas}</ShowMore>
          </Forzar>
        </div>
      </Bloque>
      <TablaPartes partes={[
        ['List', 'Los primeros `limit` ítems, dibujados por la función hija. La grilla o la columna van en className.', 'children(cuantos) · className'],
        ['Show N more', 'Link azul de 12px con chevron: dice cuántos faltan. Abierto, Show less. Lleva aria-expanded.', 'button'],
        ['Scroll area', 'Abierta: alto máximo min(70vh, 640px), nunca menos que cerrada; role="region" con nombre y foco con Tab.', 'maxHeight · label'],
        ['Fade', 'Degradé de 32px abajo, del color del fondo (fade), que avisa que hay más; se va al llegar al final.', 'fade'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Closed" nota="Cinco de veinte y el botón.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ShowMore total={20} limit={5} label="appointments">{filas}</ShowMore></div>
        </Muestra>
        <Muestra titulo="Open, scrolling" nota="La lista abierta crece hasta el tope y scrollea; el degradé avisa que sigue.">
          <Forzar selector="[data-show-more]" estado="click" className={cn(TARJETA_PANEL, 'p-4')}>
            <ShowMore total={20} limit={5} label="appointments">{filas}</ShowMore>
          </Forzar>
        </Muestra>
        <Muestra titulo="Fits: no button" nota="Si no pasa el tope, no hay botón ni scroll.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ShowMore total={3} limit={5} label="appointments">{filas}</ShowMore></div>
        </Muestra>
        <Muestra titulo="Empty" nota="Sin ítems no dibuja nada: el panel muestra su EmptyState.">
          <div className={cn(TARJETA_PANEL, 'p-4 text-[12px] text-ink-muted')}><ShowMore total={0} limit={5} label="appointments">{filas}</ShowMore>(nothing drawn)</div>
        </Muestra>
        <Muestra titulo="Cards in a column" nota="Las salas del Dashboard: la card de operatorio, de a seis.">
          <div className={cn(TARJETA_PANEL, 'p-4')}>
            <ShowMore total={8} limit={3} label="rooms" className="flex flex-col gap-3">
              {(n) => [...DIA_CARGADO.rooms, ...DIA_CARGADO.rooms].slice(0, n).map((r, i) => <OperatoryCard key={i} room={r} />)}
            </ShowMore>
          </div>
        </Muestra>
      </div>
      <Muestra titulo="Cards in a grid, on the page" nota="Treatments (en la app, de a cuatro): los primeros planes y el resto con scroll; el degradé va del color de la página.">
        <div className="bg-page-background rounded-lg p-4">
          <ShowMore total={PLANS.length} limit={2} label="treatment plans" fade="from-page-background" className="grid gap-5 lg:grid-cols-2">
            {(n) => PLANS.slice(0, n).map((p, i) => <TreatmentCard key={i} plan={p} />)}
          </ShowMore>
        </div>
      </Muestra>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Behavior" nota="De show-more.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Open height</td><td className="font-mono text-[12px]">max(closed height, {SHOW_MORE_ALTO})</td></tr>
          <tr><td className="font-semibold">Fade</td><td>32px, from the background color (white in a card, page-background on the page) to transparent</td></tr>
          <tr><td className="font-semibold">Button</td><td>12px Medium, dash-blue, chevron 14px; underline on hover</td></tr>
          <tr><td className="font-semibold">Gap list → button</td><td className="tabular-nums">8px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Limits in the app" nota="Cuántos se ven cerrado en cada lugar.">
        <Tabla encabezado={['Screen', 'Block', 'Limit']} minimo={480}>
          <tr><td>Dashboard</td><td>Appointments · Waiting Room · Pending Task</td><td className="tabular-nums">5</td></tr>
          <tr><td>Dashboard</td><td>Rooms</td><td className="tabular-nums">6</td></tr>
          <tr><td>Patient Dashboard</td><td>Pending Task · Appointments</td><td className="tabular-nums">3</td></tr>
          <tr><td>Patient Dashboard</td><td>Pending documents</td><td className="tabular-nums">4</td></tr>
          <tr><td>Treatments</td><td>Treatment plans</td><td className="tabular-nums">4</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
