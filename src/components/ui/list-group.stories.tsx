import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListGroup, LIST_GROUP_TONES, type ListGroupTone } from './list-group'
import { AppointmentRow, TaskRow } from '@/components/dashboard/DashboardRows'
import { DIA_CARGADO } from '@/components/dashboard/dashboard-data'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Filas de ejemplo: las del día cargado del Dashboard. */
const turnos = (n: number) => DIA_CARGADO.appointments.filter((a) => !a.completado).slice(0, n).map((a, i) => <AppointmentRow key={i} appt={a} />)
const hechos = (n: number) => DIA_CARGADO.appointments.filter((a) => a.completado).slice(0, n).map((a, i) => <AppointmentRow key={i} appt={a} />)
const tareas = (n: number) => DIA_CARGADO.tasks.slice(0, n).map((t, i) => <TaskRow key={i} task={t} />)

type Args = { title: string; tone: ListGroupTone; items: number; collapsible: boolean; limit: number }

const meta = {
  title: 'Elements/List group',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Una lista larga adentro de una card, en grupos (`@/components/ui/list-group`): rótulo en versalitas con la cuenta, las filas en una caja de línea fina y, si hace falta, **plegable** y con **tope** ("Show 12 more"). Es lo que ordena un panel con mucho: en lugar de cuarenta cards una debajo de la otra, grupos con lo que ya dicen los datos (Scheduled y Completed; el tipo de tarea).',
          '',
          '**Cuándo usarlo:** una lista de más de ~6 ítems adentro de un panel. Sin título es sólo la lista (la Waiting Room). Generaliza el agrupado de *Pending documents* (Patient Dashboard).',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de filas, el tope y el tono desde *Controls*; tocá el rótulo si es plegable y "Show N more".',
        ].join('\n'),
      },
    },
  },
  args: { title: 'Scheduled', tone: 'info', items: 8, collapsible: false, limit: 5 },
  argTypes: {
    title: { control: 'text', description: 'El nombre del grupo, en versalitas con la cuenta. Vacío, es sólo la lista.' },
    tone: { control: 'inline-radio', options: Object.keys(LIST_GROUP_TONES), description: 'Color del rótulo: azul para lo que sigue, gris para el resto.' },
    items: { control: { type: 'range', min: 0, max: 20 }, description: 'Cuántas filas tiene. Con 0 el grupo no se dibuja.' },
    collapsible: { control: 'boolean', description: 'El rótulo pliega y despliega el grupo.' },
    limit: { control: { type: 'range', min: 0, max: 12 }, description: 'Cuántas filas se ven antes de "Show N more". 0 = sin tope.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = {
  render: (a) => (
    <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ListGroup key={`${a.collapsible}-${a.limit}`} title={a.title || undefined} tone={a.tone} collapsible={a.collapsible} limit={a.limit || undefined}>
        {turnos(a.items)}
      </ListGroup>
    </div>
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Rótulo arriba, filas en una caja de línea fina (shadow-hairline) separadas por una línea más tenue, y el pie con el tope.">
        <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
          <ListGroup title="Scheduled" tone="info" limit={3}>{turnos(6)}</ListGroup>
        </div>
      </Bloque>
      <TablaPartes partes={[
        ['Label', 'Nombre del grupo y su cuenta, 11px Semibold en versalitas, en el color del tono. Plegable: lleva un chevron y es un botón con aria-expanded. Sin título, no hay rótulo.', 'ListGroup title · tone · collapsible'],
        ['Rows', 'Cada hijo es una fila (un <li>). La caja es blanca con línea de medio pixel; entre filas, line-soft.', 'children'],
        ['Show more', 'Con tope, el resto queda detrás de "Show N more"; abierto, "Show less".', 'limit'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="With limit" nota="Las primeras 3 y el resto detrás de Show N more.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Scheduled" tone="info" limit={3}>{turnos(7)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Collapsed" nota="Completed arranca plegado: ya pasó, se consulta poco.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Completed" collapsible defaultOpen={false}>{hechos(4)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Collapsible, open">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Completed" collapsible>{hechos(2)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="No title" nota="Sólo la lista: la Waiting Room, que ya tiene el título del panel.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup>{turnos(2)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Sticky label in a scrolling panel" nota="Scrolleá: el rótulo de cada grupo queda pegado arriba mientras pasan sus filas.">
          <div className={cn(TARJETA_PANEL, 'h-[300px] overflow-y-auto p-4')}>
            <div className="flex flex-col gap-4">
              <ListGroup title="Clinical Note" sticky>{tareas(3)}</ListGroup>
              <ListGroup title="Lab Orders" sticky>{DIA_CARGADO.tasks.slice(7, 10).map((t, i) => <TaskRow key={i} task={t} />)}</ListGroup>
            </div>
          </div>
        </Muestra>
        <Muestra titulo="Empty" nota="Un grupo sin filas no se dibuja; el panel muestra su EmptyState.">
          <div className={cn(TARJETA_PANEL, 'p-4 text-[12px] text-ink-muted')}>
            <ListGroup title="Completed" />
            (nothing drawn)
          </div>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

function MedidaRotulo() {
  const { ref, m } = useMedidas('p')
  return (
    <>
      <div ref={ref} className="max-w-[400px]"><ListGroup title="Scheduled" tone="info">{turnos(1)}</ListGroup></div>
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
      <Bloque titulo="Size" nota="Leído del rótulo dibujado. Entre el rótulo y la caja, 6px; entre grupos, el gap del panel (16px).">
        <MedidaRotulo />
      </Bloque>
      <Bloque titulo="Tones" nota="De LIST_GROUP_TONES (list-group.tsx) y src/index.css.">
        <Tabla encabezado={['Tone', 'Use', 'Text']} minimo={560}>
          {(Object.keys(LIST_GROUP_TONES) as ListGroupTone[]).map((t) => (
            <tr key={t}>
              <td className="font-semibold">{t}</td>
              <td className="text-ink-medium">{{ default: 'Completed, task types', info: 'Scheduled' }[t]}</td>
              <td><Token nombre={tokensDe(LIST_GROUP_TONES[t]).texto} /></td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
