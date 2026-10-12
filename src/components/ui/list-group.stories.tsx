import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListGroup, LIST_GROUP_TONES, type ListGroupTone } from './list-group'
import { AppointmentRow, TaskRow } from '@/components/dashboard/DashboardRows'
import { DIA_CARGADO } from '@/components/dashboard/dashboard-data'
import { Bloque, Forzar, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Filas de ejemplo: las del día cargado del Dashboard. */
const turnos = (n: number) => DIA_CARGADO.appointments.slice(0, n).map((a, i) => <AppointmentRow key={i} appt={a} />)
const tareas = (n: number) => DIA_CARGADO.tasks.slice(0, n).map((t, i) => <TaskRow key={i} task={t} />)

type Args = { title: string; tone: ListGroupTone; items: number; collapsible: boolean; limit: number }

const meta = {
  title: 'Elements/List group',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Filas en una caja de línea fina adentro de una card (`@/components/ui/list-group`), con rótulo opcional y el tope de *Show more*: se ven las primeras y **"Show N more" abre el resto con scroll**, sin estirar la página. Es lo que usan los turnos, la sala de espera y las tareas del Dashboard y las tareas del Patient Dashboard.',
          '',
          '**Cuándo usarlo:** una lista de filas (no de cards sueltas) que puede crecer. Sin título es sólo la lista, debajo del título del panel. Para cards en grilla o en columna, *Show more* directo.',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de filas, el tope y el tono desde *Controls*; tocá "Show N more" y scrolleá.',
        ].join('\n'),
      },
    },
  },
  args: { title: '', tone: 'default', items: 12, collapsible: false, limit: 5 },
  argTypes: {
    title: { control: 'text', description: 'Nombre del grupo, en versalitas con la cuenta. Vacío, es sólo la lista.' },
    tone: { control: 'inline-radio', options: Object.keys(LIST_GROUP_TONES), description: 'Color del rótulo.' },
    items: { control: { type: 'range', min: 0, max: 30 }, description: 'Cuántas filas tiene. Con 0 no se dibuja.' },
    collapsible: { control: 'boolean', description: 'El rótulo pliega y despliega el grupo (con título).' },
    limit: { control: { type: 'range', min: 0, max: 12 }, description: 'Cuántas filas se ven antes de "Show N more". 0 = sin tope.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = {
  render: (a) => (
    <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ListGroup key={`${a.collapsible}-${a.limit}-${a.items}`} title={a.title || undefined} tone={a.tone} collapsible={a.collapsible} limit={a.limit || undefined} label="appointments">
        {turnos(a.items)}
      </ListGroup>
    </div>
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Rótulo (opcional), filas en una caja de línea fina (shadow-hairline) separadas por una línea más tenue, y Show N more.">
        <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
          <ListGroup title="Appointments" limit={3} label="appointments">{turnos(8)}</ListGroup>
        </div>
      </Bloque>
      <TablaPartes partes={[
        ['Label', 'Opcional. Nombre y cuenta en 11px Semibold versalitas, en el color del tono; plegable con chevron y aria-expanded.', 'title · tone · collapsible'],
        ['Rows', 'Cada hijo es una fila (un <li>). Caja blanca con línea de medio pixel; entre filas, line-soft.', 'children'],
        ['Show more', 'El tope y el scroll de Elements / Show more.', 'limit · maxHeight · label'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="With limit, closed" nota="Las primeras 5 y el botón con cuántas faltan.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup limit={5} label="appointments">{turnos(12)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="With limit, open" nota="Todas, con scroll adentro.">
          <Forzar selector="[data-show-more]" estado="click" className={cn(TARJETA_PANEL, 'p-4')}>
            <ListGroup limit={5} label="appointments">{turnos(12)}</ListGroup>
          </Forzar>
        </Muestra>
        <Muestra titulo="Task rows" nota="Pending Task del Dashboard y del Patient Dashboard.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup limit={3} label="pending tasks">{tareas(6)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="With title, collapsed">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Appointments" collapsible defaultOpen={false}>{turnos(4)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Empty" nota="Sin filas no se dibuja; el panel muestra su EmptyState.">
          <div className={cn(TARJETA_PANEL, 'p-4 text-[12px] text-ink-muted')}><ListGroup title="Appointments" />(nothing drawn)</div>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

function MedidaRotulo() {
  const { ref, m } = useMedidas('p')
  return (
    <>
      <div ref={ref} className="max-w-[400px]"><ListGroup title="Appointments">{turnos(1)}</ListGroup></div>
      <Tabla encabezado={['Part', 'Text', 'Height']} minimo={420}>
        <tr><td className="font-semibold">Label</td><td className="tabular-nums">{m?.texto} · {m?.peso}</td><td className="tabular-nums">{m?.alto}</td></tr>
      </Tabla>
    </>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Size" nota="Leído del rótulo dibujado. Entre el rótulo y la caja, 6px.">
        <MedidaRotulo />
      </Bloque>
      <Bloque titulo="Tones" nota="De LIST_GROUP_TONES (list-group.tsx) y src/index.css.">
        <Tabla encabezado={['Tone', 'Text']} minimo={420}>
          {(Object.keys(LIST_GROUP_TONES) as ListGroupTone[]).map((t) => (
            <tr key={t}><td className="font-semibold">{t}</td><td><Token nombre={tokensDe(LIST_GROUP_TONES[t]).texto} /></td></tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
